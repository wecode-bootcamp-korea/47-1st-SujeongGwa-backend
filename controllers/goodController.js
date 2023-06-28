const goodService = require("../services/goodService.js")

const goodController = async(req,res)=>{
    try{
        const data = req.params.categoryid;
        console.log(data);
        return res.status(201).json({message : "SUCCESS"});
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    goodController
}