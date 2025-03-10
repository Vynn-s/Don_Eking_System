const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json({ status: 'success', message: 'Account Created Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred. Please try again.' });
  }
};