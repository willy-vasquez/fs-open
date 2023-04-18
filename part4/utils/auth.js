const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  let auth = request.get('authorization');
  if (auth && auth.startsWith('bearer')) {
    auth = auth.replace('bearer ', '');
    const decodedToken = jwt.verify(auth, process.env.JWT_SECRET);
    if (!decodedToken.id)
      return response.status(401).json({ error: 'invalid token' });
    request.user = decodedToken;
    next();
  } else
    return response
      .status(401)
      .json({ errors: [{ msg: 'Debe iniciar sesión' }] });
};
