const jwt = require("jsonwebtoken");
const web3 = require("web3");
const { isAddress } = require("web3-validator");
const secretKey = process.env.SECRET_KEY;

const verifyAddress = (signature, address, message) => {
  const recoverAddress = web3.eth.accounts.recover(message, signature);
  console.log("Recovered Address:", recoverAddress);
  return recoverAddress === address;
};
const createAuthToken = (req, res) => {
  const { signature, address, message } = req.body;
  if (!isAddress(address)) {
      return res.status(400).json({ error: 'Invalid address' });
   }
  if (!verifyAddress(signature, address, message)) {
    return res.status(401).json({ error: "Address verification failed" });
  }
  const token = jwt.sign({ address }, secretKey, { expiresIn: "7h" });
  return res.status(200).json({ token });
};

// Function to decode and verify a JWT
const decodeAuthToken = (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Need Token to decode" });
    }
    const decodedToken = jwt.verify(token, secretKey);
    res.json({ decodedToken });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { createAuthToken, decodeAuthToken };
