const Model = require('../db');
const puppeteer = require('puppeteer');
const flipkart = require('../config')
const asyncfunc = require('async')
const cheerio=require('cheerio')

const fetchData = async () => {    
    async function retriveData(details) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({ width: 1366, height: 700 });
        url = details.url
        for (i = 0; i < 1; i++) {
            console.log(url + `&page=${i}`);
            await page.goto(flipkart.base_url + url + `&page=${i}`, { waitUntil: ['load', 'domcontentloaded'] });
            const selectors = await page.$$('._1UoZlX');
            for (let tr of selectors) {
                const trText = await page.evaluateHandle(pagevalue => {
                    return {
                        actualprice: pagevalue.querySelector('._1vC4OE._2rQ-NK').innerText,
                        title: pagevalue.querySelector('._3wU53n').innerText,
                        rating: pagevalue.querySelector('.hGSR34').innerText,   
                        description : pagevalue.querySelector('._3ULzGw').innerHTML                 
                    }
                }, tr);
                let item = await trText.jsonValue();
                console.log(item.description);
                let $ = cheerio.load(item.description)
                let detail = [];
                $('.vfw0gD li').each((i,elem)=>{
                    console.log("GOING in");
                    detail.push($(this).text())
                })
                console.log(detail);
                try {
                    await Model.Categories_data.create({
                        rating : item.rating,
                        actualprice : item.actualprice,
                        titles : item.title,
                        category_id : details.id
                    })
                }
                catch (error) {
                    console.log(error);
                }
            }
        
        }
        categoriesData = await Model.Categories.update({cron_status:true},{where: {id : details.id}})
        setTimeout(async () => { await browser.close(); }, 5000);
    }
    let Queue = asyncfunc.queue((task,callback)=>{
        retriveData(task).then((val)=>{
            callback(null)
        }).catch((error)=>{
            callback(error,null)
        })

        

    })
    Queue.drain = ()=>{
        console.log("ended");
        
    }
    let categoriesData = await Model.Categories.findAll({limit: 2})
    categoriesData.forEach(element => {
        Queue.push(element,(error,resp)=>{
            console.log(error);
        })

    });
    
}

module.exports = fetchData