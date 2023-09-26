const base64 = require('base-64');
const UserModel = require('../models/users-model');

module.exports = async (req, res, next) => {
  try {
    // Check if the 'Authorization' header is present
    if (!req.headers.authorization) {
      throw new Error('Authorization header is missing');
    }

    // Extract and decode the credentials from the 'Authorization' header
    const authHeader = req.headers.authorization.split(' ');
    if (authHeader[0].toLowerCase() !== 'basic') {
      throw new Error('Invalid authorization method');
    }

    const credentials = base64.decode(authHeader[1]);
    const [username, password] = credentials.split(':');

    // Find the user in the database by username
    const user = await UserModel.findOne({ username });

    // Check if the user exists and the password matches
    if (!user || !user.comparePassword(password)) {
      throw new Error('Invalid username or password');
    }

    // Attach the user object to the request for later use
    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
