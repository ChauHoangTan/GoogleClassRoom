const express = require("express");
const router = express.Router();
const { verify } = require("../Middlewares/verifyToken.js");
const { generateToken } = require("../Middlewares/verifyToken.js");
const User = require("../Models/UserModel.js");
const bcrypt = require("bcryptjs");

// @desc Register user
// @route POST /api/users/register
router.post("/register", async (req, res) => {
  const { userName, firstName, lastName, password, image } = req.body;
  try {
    const userExists = await User.findOne({ userName });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      userName,
      firstName,
      lastName,
      password: hashedPassword,
      image,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dob: user.dob,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// desc Login user
// @route POST api/user/login
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        res.status(200).json({
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          isAdmin: user.isAdmin,
          phone: user.phone,
          dob: user.dob,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid password");
      }
    } else {
      res.status(400);
      throw new Error("Invalid userName");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update user profile
// @route PUT/api/users/profile
router.put("/profile", verify, async (req, res) => {
  const { userName, firstName, lastName, image, phone, email, dob } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.userName = userName || user.userName;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.image = image || user.image;
      user.phone = phone || user.phone;
      user.dob = dob || user.dob;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        userName: updatedUser.userName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone,
        dob: updatedUser.dob,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Change user password
// @route PUT /api/users/password
router.put("/password", verify, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (user && checkPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password changed! " });
    } else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
