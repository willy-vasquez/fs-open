const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  return response.json(users);
});

router.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 3)
    return response
      .status(400)
      .json({
        error: `password is shorter than the minimum allowed length (3)`,
      });

  const saltRounds = 10;
  const pwdCryp = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: pwdCryp,
  });

  const saved = await user.save();
  response.status(201).json(saved);
});

module.exports = router;
