const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

// login;
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be more than 3 character's").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Please fill the form correctly",
        erros: errors.array(),
      });
    }

    const { email, password } = req.body;

    const data = {
      user: {
        id: `${email}${password}#1000001`,
        email: email,
        password: password,
      },
    };
    const authToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

    //   creating secure cookie with refresh token
    res.cookie("jwtToken", authToken, {
      httpOnly: true, // only accessbile by browser
      secure: true, //https
      sameSite: "none", //cross-browser
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days validity of a refresh token. 1000ms=1s 1s*60= 1min, 1min*60=1hr, 1hr*24=1d, 1*7=7d
    });

    return res.status(200).json({ authToken, email });
  }
);

// refrsh jwt token
router.get("/refresh", async (req, res) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return res.status(401).json({ message: "Please login again" });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);

    const { email } = decodedToken.user;

    res.status(200).json({ user: { email, authToken: jwtToken } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "The issue is from our side, please try again in some time",
    });
  }
});

// logout user
router.post("/logout", async (req, res) => {
  res.clearCookie("jwtToken");
  res.status(200).json({ message: "User Logged Out" });
});

module.exports = router;
