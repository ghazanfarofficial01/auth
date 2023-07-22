const express = require('express')
const MobilesRouter = express.Router();
const Mobile = require('../models/mobile')

//to fetch best condtion mobiles
MobilesRouter.get('/api/get-mobiles-best-conditions', async (req, res) => {
    try{
    const products = await Mobile.find({condition:{$gt:4}})
    res.json(products);
    }catch (e) {
        res.status(500).json({ error: e.message });
      }
})

module.exports = MobilesRouter;