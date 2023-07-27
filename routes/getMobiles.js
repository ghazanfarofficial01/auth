const express = require("express");
const MobilesRouter = express.Router();
const Mobile = require("../models/mobile");
const Brands = require("../models/brands");
//to fetch best condtion mobiles
MobilesRouter.get("/api/get-mobiles-best-condition", async (req, res) => {
  try {
    const products = await Mobile.find({ condition: { $gt: 4 } });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// to fetch gaming mobiles
MobilesRouter.get("/api/get-mobiles-gaming", async (req, res) => {
  try {
    const products = await Mobile.find({ category: "gaming" });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
//to fetch mobiles under RS 7000
MobilesRouter.get("/api/get-mobiles-budget", async (req, res) => {
  try {
    const products = await Mobile.find({ price: { $lte: 7000 } });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//to fetch premium mobiles
MobilesRouter.get("/api/get-mobiles-premium", async (req, res) => {
  try {
    const products = await Mobile.find({ price: { $gte: 16000 } });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//to fetch mobile brands
MobilesRouter.get("/api/brands", async (req, res) => {
  try {
    const brands = await Brands.find({});
    res.json(brands);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//route to post a new mobile
MobilesRouter.post("/admin/mobile/new", async (req, res) => {
  //const {brand,pictures,modelName,price,originalPrice,discount_percentage,description = "",condition,rating,unitsSold,inStock,category,RAM,storage,Battery,front_camera,rear_camera,display,warrenty,color,in_the_box} = req.body;
  try {
    let newMobile = new Mobile(req.body);
    newMobile = await newMobile.save();
    console.log(newMobile);
    res.status(201).send("success");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get a single mobile details
MobilesRouter.get("/api/mobile", async (req, res) => {
  try {
    const id = req.query.id;

    const mobile = await Mobile.findById(id);

    res.status(200).json(mobile);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//delete a mobile route
MobilesRouter.delete("/admin/mobile/delete", async (req, res) => {
  try {
    const id = req.query.id;
    
    const mobile = await Mobile.findByIdAndDelete(id);
   
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = MobilesRouter;
