const express = require('express');
const router = express.Router();
const UserModel = require('./models/users-model');
const bcrypt = require('bcrypt');
const { handleSignIn, handleSignUp } = require('../controllers/auth-controller');

// Signup route
router.post('/signup', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await UserModel.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send('Error Creating User');
  }
});

// Signin route
router.post('/signin', async (req, res, next) => {
  handleSignIn(req, res, next);
});

module.exports = router;
