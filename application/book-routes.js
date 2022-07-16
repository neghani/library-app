const express = require("express");
const Book = require("../models/book-model");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

router.get("/", async (req, res) => {
  try {
    const response = await Book.find({});
    
    res.render("home", { data: response });
  } catch (error) {
    req.flash("fail", error.message);
    res.redirect("/books");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const response = await Book.deleteOne({ id });
    req.flash("success", `Record deleted.`);
    res.redirect("/books");
  } catch (error) {
    req.flash("fail", error.message);
    res.redirect("/books");
  }
  // res.render("home", { data: response });
});

router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const data = await Book.findOne({ id });

    res.render("edit-book", {
      data,
    });
  } catch (error) {
    req.flash("fail", error.message);
    res.redirect("/books");
  }
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params["id"];
  const paylod = req.body;
  console.log(req.body);
  const response = await Book.updateOne({ id }, paylod);
  console.log(response);
  req.flash("success", `Record updated successfully.`);
  res.redirect("/books");
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newBook = new Book({ ...req.body, id: uuidv4() });
    const response = await newBook.save();
    req.flash("success", `Created book.`);
    res.redirect("/books");
  } catch (error) {
    req.flash("fail", error.message);
    res.redirect("/books");
  }
});
router.get("/add-book", (req, res) => {
  res.render("add-book");
});
module.exports = router;
