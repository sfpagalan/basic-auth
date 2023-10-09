const supergoose = require('supergoose');
const { server } = require('../src/server');
const { sequelize } = require('../auth/models');
const request = supergoose(server);

describe('Authentication Server', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  // Test user signup functionality
  it('should create a new user on POST /signup', async () => {
    const newUser = {
      username: 'roronoazoro',
      password: 'imherefortheplot',
      email: 'zoro@example.com',
      fullname: 'Roronoa Zoro',
      role: 'user',
    };

    const response = await request.post('/auth/signup').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.username).toBe(newUser.username);
  });

  // Test user signin functionality
  it('should sign in a user on POST /signin', async () => {
    const userCredentials = {
      username: 'roronoazoro',
      password: 'imherefortheplot',
    };

    const response = await request
      .post('/auth/signin')
      .auth(userCredentials.username, userCredentials.password);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.username).toBe(userCredentials.username);
  });

  // Test invalid login credentials
  it('should return 403 for invalid login on POST /signin', async () => {
    const invalidCredentials = {
      username: 'roronoazoro',
      password: 'wrongpassword',
    };

    const response = await request
      .post('/auth/signin')
      .auth(invalidCredentials.username, invalidCredentials.password);

    expect(response.status).toBe(403);
    expect(response.text).toBe('Invalid Login');
  });
});
