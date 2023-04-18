const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('initial setup in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', password: passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    await User.deleteMany({});

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const algo = await api.post('/api/users').send(newUser).expect(201);

    const result = await api
      .post('/api/users')
      .send({ ...newUser })
      .expect(400);

    expect(result.body.error).toContain('expected `username` to be unique');
  });

  test('creation fails with if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('minimum allowed length');
  });

  test('creation fails with if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'pa',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('minimum allowed length');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
