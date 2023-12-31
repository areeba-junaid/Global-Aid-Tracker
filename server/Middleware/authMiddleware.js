
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
 console.log("Verifying  token .....");
  if (!token) {
    return res.status(401).json({ error: 'Need Token to verify' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
