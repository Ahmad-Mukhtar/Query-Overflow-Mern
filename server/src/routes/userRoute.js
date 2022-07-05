const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

const userController = require("../controllers/userController");

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);

router.get("/get-profile", authenticateToken, userController.getUserProfile);
router.post("/edit-profile", authenticateToken, userController.editProfile);

// router.get(
//   "/v1/auth/google",
//   passport.authenticate("google", {
//     session: false,
//     scope: ["profile", "email"],
//   })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   userController.loginWithGoogle
// );

// router.post("/login", authController.loginWithGoogle);

module.exports = router;
