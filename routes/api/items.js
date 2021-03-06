// where are the api routes will go
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// create routes
// @route   GET api/items (GET request to api/items)
// @desc    Get all Items
// @access  Public
router.get("/", (req, res) => {
  // when url is http://localhost:5000/api/items and we have a GET request from the frontend, it will trigger its the call (router.get()) and will return the data in json format sorted by date added decresing
  // when at /api/items, get all data from DB and display it as json
  Item.find() // returns a Promise ; get all items in DB
    .sort({ date: -1 }) // sort by the date descending (so we put -1; if want ascending put 1)
    .then((items) => res.json(items)); // GET data from database and return in json format on port 5000
});

// @route   POST api/items ; POST request
// @desc    Create An Item
// @access  Private
// adding auth to arg of POST request to protect it (need to be logged into account to add item)
router.post("/", auth, (req, res) => {
  // want to add an Item to the database
  const newItem = new Item({
    // an instance of the model is called a Document
    // accessing the data from the POST request from frontend function addItem from itemActions.js
    name: req.body.name, // date will be automatically inserted
  });

  // save newItem to the database MongoDB (promise based)
  newItem
    .save()
    .then((item) => res.json(item)) // returns the new item added
    .catch((err) => console.log(err)); // display item saved in json on webpage
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ sucess: true })))
    .catch((err) => res.status(404).json({ sucess: false })); // sending a 404 response for failure of finding id
});

// export router to be able to use it in other files
module.exports = router;

//mvc architecture : model view controller
// controller: backend
// view: frontend
