const express = require('express');
const router = express.Router();
const UserModel = require('../auth/models/users-model');
const basicAuth = require('../auth/middleware/basic');
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await UserModel.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

// Signin route with basic authentication
router.post('/signin', basicAuth, async (req, res, next) => {
  const authenticatedUser = req.user;
  res.status(200).json(authenticatedUser);
});

module.exports = router;
