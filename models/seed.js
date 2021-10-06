
const mongoose = require("./connection");
const Animal = require("./animals")

mongoose.connection.on("open", () => {

    const startAnimals = [
        { species: "Gorilla", extinct: false, location: "Central Africa", lifeExpectancy: 35},
        { species: "Honey Badger", extinct: false, location: "Western Asia and Africa", lifeExpectancy: 24},
        { species: "Dog", extinct: false, location: "Around the globe", lifeExpectancy: 12},
        { species: "Jaguar", extinct: false, location: "South and Central America", lifeExpectancy: 15},
        { species: "Koala", extinct: false, location: "Australia", lifeExpectancy: 14},
        { species: "Grizzly Bear", extinct: false, location: "South and Western Canada/North-west America", lifeExpectancy: 30},
        { species: "Megalodon", extinct: true, location: "Every continent except Antarctica", lifeExpectancy: 88},
      ]

  Animal.deleteMany({}, (err, data) => {

    Animal.create(startAnimals, (err, data) => {
      
      console.log("--------FRUITS CREATED----------");
      console.log(data);
      console.log("--------FRUITS CREATED----------");


      mongoose.connection.close();
    });
  });


});