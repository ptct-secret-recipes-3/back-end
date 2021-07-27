const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const bcrypt = require('bcryptjs');
//const session = require('express-session');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipes/recipes-router');

const server = express();

// const sessionConfig = {
//     name: 'session',
//     secret: 'pass',
//     cookie: {
//       maxAge: 1000 * 30,
//       secure: false,  //true: would be for production
//       httpOnly: true,
//     },
//     resave: false,
//     saveUninitialized: false
//   };

server.use(helmet());
server.use(cors());
server.use(express.json());
//server.use(session(sessionConfig));
//server.use(bcrypt());

server.use('/api/auth', authRouter);
server.use('/api/recipes', recipesRouter)

server.get("/", (req, res) => {  //TESTED - SUCCESS
    console.log("I'm in the server get request")
    res.json({ api: "up" });
  });

module.exports = server;