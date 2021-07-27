const users = require("../auth/auth-model.js");
//const bcrypt = require("bcryptjs");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~LOGIN/REGISTER MIDDLEWARE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Checks to see if the username is already in the DB
const checkForDuplicates = async (req, res, next) => {
    console.log("in the checkForDuplicates")
    try {
      console.log("in the try")
        const username = req.body.username;
        const user = await users.findByUserName(username)
        if (user) {
            return res.status(400).json({
                message: "Username is already taken. Please use another username.",
            })
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}


// Checks if the body has a username and password 
const checkPayload = (req, res, next) => {
  console.log("in the checkPayload")
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json(
            "username and password required"
        )
    } else {
        next()
    }
}


// Checks if the user exists in the DB
const checkUsernameExists = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await users.findByUserName(username)

        if (!user) {
            return res.status(401).send({
              message: "invalid credentials",
          })
        }

        const passwordValid = await bcrypt.compare(req.body.password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        req.user = user
        next()

    } catch (err) {
        next(err)
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~RECIPES MIDDLEWARE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const checkRecipePayload = (req, res, next) => {
    console.log("in the checkPayload")
      const newRecipe = req.body;
      if (!newRecipe.title || !newRecipe.source || !newRecipe.ingredients || !newRecipe.instructions) {
          return res.status(400).json({ message:
              "All fields are required"
            })
      }else if (typeof newRecipe.title !== 'string' ) {
          return res.status(400).json({message: "title of recipe must be a string"})
      } else if ( newRecipe.title.length < 3 || newRecipe.title.length > 100){
          return res.status(400).json({message: "title of recipe must be between 3 and 100"})
      } else {
          next();
      }
  }



  const checkRecipeId = async (req, res, next) => {
      console.log("in the checkRecipeId");
      try{
           const recipeId = req.params.id;
             const recipe = await recipe.getById(recipeId);
             if(!aRecipe){
               res.status(404).json({message: "recipe not found"});
             }else{
             req.recipe = recipe;
               next();
           }
    
         }catch(error){
           res.status(500).json({message: 'Error'})
         }
      
    }

///NEED TO COME BACK TO THIS ONE
// const checkTitleNameUnique = (req, res, next) => {
//     console.log("in the checkTitleNameUnique")
//     const recipeTitle = req.body.title;
//         const returnObject = {
//             title: title
//         }
            
// }







module.exports = {
    checkForDuplicates,
    checkPayload,
    checkUsernameExists,
    checkRecipePayload,
    checkRecipeId,
    checkTitleNameUnique

};