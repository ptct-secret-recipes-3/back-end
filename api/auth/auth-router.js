const router = require('express').Router();
const { JWT_SECRET } = require("../secrets/index.js"); // importing the secret we made with jsonwebtoken library
const bcrypt = require('bcryptjs'); //for hashing 
const jwt = require('jsonwebtoken');
//const { default: jwtDecode } = require("jwt-decode"); //find where I'm creating this?
const { checkForDuplicates,
  checkPayload,
  checkUsernameExists, } = require('../middleware/middleware.js'); //importing our middleware restricted

const users = require("./auth-model.js"); //Importing our users data from our model folder, where it's importing it from our dbconfig
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//REGISTER ENDPOINT
router.post('/register', checkPayload, checkForDuplicates, (req, res) => {
  let user = req.body;

  // bcrypting the password before saving
  const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
  const hash = bcrypt.hashSync(user.password, rounds);

  // never save the plain text password in the db
  user.password = hash

  users.add(user)
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
    users.findByUserName(username) 
      .then((user) => {
          // console.log("user.username", user.username);
          // console.log("user.password", user.password);
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log("credentials are correct")
          const token = makeToken(user) //see below for the makeToken function we create
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
      function makeToken(user){
        const payload = {
          subject:user.id,
          username:user.username
        }
        const options = {
          expiresIn: "500s"
        }
        return jwt.sign(payload, JWT_SECRET, options)
      }
      
     

module.exports = router;