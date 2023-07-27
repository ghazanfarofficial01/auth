const express = require('express');
const bannerRouter = express.Router();
const Banner = require('../models/banners');

//banner post route
bannerRouter.post('/admin/banner', async (req, res) => {
    try{
    const {bannerName, imageURL = "", description = ""} = req.body;
    let banner = new Banner({
        bannerName,
        imageURL,
        description
    });

    banner = await banner.save()
    res.status(200).json(banner);
} catch(e){
    res.status(500).json({error:e.message})
}
})

bannerRouter.get('/admin/banner', async (req,res)=>{
    try{
    const banners = await Banner.find({})
    res.status(200).json(banners)
    } catch(e){
        res.status(500).json({error:e.message})
    }
})

module.exports = bannerRouter