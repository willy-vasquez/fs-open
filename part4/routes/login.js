const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isPwdCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !isPwdCorrect)
    return response.status(401).json({ error: 'invalid username or password' });

  const webToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(webToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token, username, name: user.name });
});

module.exports = router;
