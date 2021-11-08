require('dotenv').config;
//Instantiate Express, Cors, helmet, express-session, connect-session-knex,express for nodeJS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const { auth, requiresAuth } = require('express-openid-connect');
const server = express();

//Import routes from the router file here
const userRouter = require('../routes/userRouter');

// Config for the auth function coming from express-openid-connect
// https://github.com/auth0/express-openid-connect

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

//All routes will use the following express packages
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(auth(config));
// server.use(session(sessionOptions));

//Insert routes for routers here
server.use('/api/users', userRouter);

//This is what is shown from the backend when you go to the localhost:5000/
server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = server;
