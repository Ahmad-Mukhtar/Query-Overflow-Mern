const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      userId: user._id,
      password: user.password,
    },
    process.env.JWT_KEY,
    { expiresIn: "14d" }
  );
};
