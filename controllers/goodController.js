const getGoodController = async(req,res) => {
    try{
        const data = req.
        console.log(data);
        return await res.status(201).json({Data : result});
    }catch(err){
        console.error(err);
        return await res.status(err.statusCode || 400).json({ message : err.message});
    }
}

module.exports = {
    getGoodController
}