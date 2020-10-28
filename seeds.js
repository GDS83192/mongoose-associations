const mongoose = require('mongoose');

const Food = require('./models/food');
const Ingredient = require('./models/ingredient');

const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(
    mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('the connection with mongod is established');
    }
);

async function seed() {
    // CREATE TWO INGREDIENTS
    const cheddar = await Ingredient.create({
        name: 'cheddar cheese',
        origin: 'Wisconson',
    });

    const dough = await Ingredient.create({
        name: 'dough',
        origin: 'Iowa',
    });

    // CREATE A NEW FOOD
    const cheesyQuiche = new Food({
        name: 'Quiche',
        ingredients: [],
    });

    // // PUSH THE INGREDIENTS ONTO THE FOOD'S
    // // INGREDIENTS ARRAY
    cheesyQuiche.ingredients.push(dough);
    cheesyQuiche.ingredients.push(cheddar); // associated!
    cheesyQuiche.save(function(err, savedCheesyQuiche) {
        if (err) {
            console.log(err);
        } else {
            console.log('cheesyQuiche food is ', savedCheesyQuiche);
        }
    });
}

seed();