const router = require('express').Router();
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');


// INDEX
router.get('/', (req, res) => {
    Food.find({}, (error, allFoods) => {
        res.render('foods/index.ejs', {
            foods: allFoods,

        });
    });
});

router.get('/new', async(req, res) => {
    let allIngredients = await Ingredient.find({});
    res.render('foods/new.ejs', { ingredients: allIngredients });
});

router.get('/:id', async(req, res) => {
    let allIngredients = await Ingredient.find({});

    let foundFood = await Food.findById(req.params.id).populate({
        path: 'ingredients',
        options: {
            sort: {
                ['name']: 1
            }
        },
    });

    res.render('foods/show.ejs', {
        food: foundFood,
        ingredients: allIngredients,
    });
});

router.post('/', async(req, res) => {
    console.log(req.body);
    let food = await Food.create(req.body);
    res.redirect(`/foods/${food.id}`);
});

router.put('/:foodId/ingredients', async(req, res) => {
    let foundFood = await Food.findByIdAndUpdate(
        req.params.foodId, {
            $push: {
                ingredients: req.body.ingredients,
            },
        }, { new: true, upsert: true }
    );
    console.log(foundFood);
    res.redirect(`/foods/${foundFood.id}`);
});

module.exports = router;