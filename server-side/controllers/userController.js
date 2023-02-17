const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../models/User');

/**
 * @desc Get user
 * @route GET /user/:id
 */
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'User id is required' });

  const user = await User.findById(id).select('-password').exec();

  if (!user) return res.status(400).json({ message: 'User is not exists' });

  res.json(user);
});

/**
 * @desc Create user
 * @route POST /user
 */
const createUser = asyncHandler(async (req, res) => {
  const { userId, password, confirmPassword } = req.body;

  // Validate request
  if (!userId || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: 'Password and confirm password should be same' });
  }

  // Check duplicates
  const duplicate = await User.findOne({ userId }).lean().exec();

  if (duplicate) {
    return res.status(400).json({ message: 'User id is already exists' });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({ userId, password: hashedPwd });

  if (!user) {
    return res.status(400).json({ message: 'Invalid user data recieved' });
  }

  res.json(user);
});

/**
 * @desc Update user
 * @route PATCH /user
 */
const updateUser = asyncHandler(async (req, res) => {
  const { id, salutation, firstName, lastName, email } = req.body;

  // Validate request
  if (!id || !salutation || !firstName || !lastName || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: 'User is not exists' });
  }

  user.salutation = salutation;
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  const updatedUser = await user.save();

  if (!updatedUser) {
    return res.status(400).json({ message: 'Invalid user data recieved' });
  }

  res.json(updatedUser);
});

module.exports = { getUser, createUser, updateUser };
