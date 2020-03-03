const Model = require('./db');
const request = require('request');


request('https://www.flipkart.com/lc/getData?dataSourceId=websiteNavigationMenuDS_1.0&t=26372552', async function (error, response, body) {
  body = JSON.parse(response.body)
  for await (let main_categories of Object.keys(body.navData)) {
    if (main_categories != "offer-zone") {
      for await (let data of Object.keys(body.navData[main_categories])) {
        if (data == "tabs") {
          await body.navData[main_categories][data][0].columns.forEach((value, index) => {
            value.forEach(async (finalData) => {
              if (finalData.type !== "heading") {
                let dataExist = await Model.Categories.findAll({})
                if (dataExist.length) {
                  console.log("Data exist");
                } else {
                  try {
                    await Model.Categories.create({
                      mainCategory: main_categories,
                      subCategory: finalData.title,
                      url: finalData.url
                    })
                  }
                  catch (error) {
                    console.log("Unable to create categories data");
                  }

                }
              }
            })
          })
        }
      }
    }

  }

})

