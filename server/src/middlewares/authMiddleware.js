const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({ error: "no token given" });
    }

    const authorizedData = jwt.verify(token, process.env.JWT_KEY);

    req.user = authorizedData;

    return next();
  } catch (err) {
    return res.status(500).json({ error: "invalid request" });
  }
};

module.exports = authenticateToken;
