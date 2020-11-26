const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipedb', {
  useNewUrlParser: true
});


// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  /*
title: String,
description: String,
path: String,
*/
  category: String,
  name: String,
  author: String,
  img: String,
  ingredients: Array,
  procedure: String,

});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    category: req.body.category,
    name: req.body.name,
    author: req.body.author,
    img: req.body.img,
    ingredients: req.body.ingredients,
    procedure: req.body.procedure
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//deletes an item from the database (my code)
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.put('/api/items/:id', async (req, res) => {
  try {
    let myItem = await Item.findOne({
      _id: req.params.id
    });
    //console.log(myItem.title)
    //console.log(req.body.title);

    myItem.category = req.body.category;
    myItem.name = req.body.name;
    myItem.author = req.body.author;
    myItem.img = req.body.img;
    myItem.ingredients = req.body.ingredients;
    myItem.procedure = req.body.procedure;

    myItem.save();
    //myItem.title = req.params.String;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
