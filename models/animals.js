const mongoose = require("./connection")

//Animal Schema
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

const Animal = model("Animal", animalSchema)

module.exports = Animal