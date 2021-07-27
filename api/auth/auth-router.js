const router = require('express').Router();
const { JWT_SECRET } = require("../secrets/index.js"); // importing the secret we made with jsonwebtoken library
const bcrypt = require('bcryptjs'); //for hashing 
const jwt = require('jsonwebtoken');
//const { default: jwtDecode } = require("jwt-decode"); //find where I'm creating this?
const { checkForDuplicates,
  checkPayload,
  checkUsernameExists
} = require('../middleware/middleware.js'); //importing our middleware restricted

const user = require("./auth-model.js"); //Importing our users data from our model folder, where it's importing it from our dbconfig
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//REGISTER ENDPOINT  -- FAIL
router.post('/register', checkPayload, checkForDuplicates, (req, res) => {
  console.log("in the router.post/register");
  let users = req.body;

  // bcrypting the password before saving
  const rounds = process.env.BCRYPT_ROUNDS || 8; 
  const hash = bcrypt.hashSync(users.password, rounds);

  // never save the plain text password in the db
  users.password = hash

  user.add(users)
    .then(saved => {
      console.log("saved: ", saved)
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error: ${err}`
      })
    }); 
});

   

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//LOGIN ENDPOINT
  router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
    
        console.log("starting /login");
    let { username, password } = req.body;
        //console.log("username: ", username)
        //console.log("password ", password)
    user.findByUserName(username) 
      .then((users) => {
          // console.log("user.username", user.username);
          // console.log("user.password", user.password);
        if (users && bcrypt.compareSync(password, users.password)) {
          console.log("credentials are correct")
          const token = makeToken(users) //see below for the makeToken function we create
            res.status(200).json({
                message: "welcome, Bill Bryson",
                token: token
            });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch((err) => {
        res.status(500).json(err)
      });
    });

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//TOKEN FUNCTION FOR THE POST REQUEST
      function makeToken(users){
        const payload = {
          subject:users.id,
          username:users.username
        }
        const options = {
          expiresIn: "500s"
        }
        return jwt.sign(payload, JWT_SECRET, options)
      }
      
     

module.exports = router;