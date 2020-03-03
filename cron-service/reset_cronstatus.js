const Model = require('../db');


let reset = async () =>{
    cronupdate = await Model.Categories.update({cron_status:false})
}

module.exports = reset