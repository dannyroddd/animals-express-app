
const express = require("express")
const Animal = require("../models/animals")

const router = express.Router()


// index route
router.get("/", async (req, res) => {
    const animals = await Animal.find({});
    res.render("animals/index.ejs", { animals });
  });

  // edit route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})

//update route
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        res.redirect("/animals")
    })
})

// new route
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

// create route
router.post("/", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.create(req.body, (err, animal) => { 
        res.redirect("/animals")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animal) => {
        res.redirect("/animals")
    })
})

  // show route
router.get("/:id", (req, res) => { 
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
       res.render("animals/show.ejs", {animal})
    })
})

module.exports = router