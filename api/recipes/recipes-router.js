const express = require('express');
const recipe = require('./recipes-model.js');
const router = express.Router();

const { checkRecipeId, checkRecipePayload } = require('../middleware/middleware.js')


// - [x] `[GET] /api/recipes` X  ---SUCCESS
router.get('/', (req, res) => {
    recipe.getAll(req.query)
        .then(recipeArray => {
            res.status(200).json(recipeArray)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error recieving recipe data'});
        });
})

// - [x] `[GET] /api/recipes/:id` - X  --SUCCESS
router.get('/:id', checkRecipeId, (req, res) => {
    recipe.getById(id)
        .then(recipeId => {
            res.status(200).json(recipeId)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error finding specific recipe'});
        });
});

// - [x] `[POST] /api/recipes` -X  ---SUCCESS
router.post('/', checkRecipePayload, (req, res) => {
    recipe.create(recipe)
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not add recipe'})
        })
});

// - [x] `[PUT] /api/recipes/:id` - X ---SUCESS
router.put('/:id', checkRecipeId, checkRecipePayload, (req, res) => {
    recipe.updateById(id, changes)
        .then(aRecipe => {
            res.status(200).json(aRecipe);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Could not update recipe id'})
        })
});

// - [x] `[DELETE] /api/recipes/:id`-X ---SUCCESS
router.delete('/:id', checkRecipeId, (req, res) => {
    recipe.removeById(id)
        .then(() => {
            res.status(200).json(recipe)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: 'Error removing this project'});
        });
});


module.exports = router;