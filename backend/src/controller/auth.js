const uuid = require('uuid');
const jwt = require('jsonwebtoken');
//import user model
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Extract the necessary data from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber
    } = req.body;

    // Create a new User instance with the extracted data
    const _user = new User({
      firstName,
      lastName,
      email,
      userName: uuid.v4(),
      password,
      role: 'user',
      contactNumber
    });

    // Save the user to the database
    const savedUser = await _user.save();

    // Return a success response if the user is successfully saved
    if (savedUser) {
      res.status(200).json({
        message: "User data saved successfully"
      });
    }
  } catch (error) {
    // Return an error response if there's an error during the process
    res.status(400).json({
      message: `Error while saving data: ${error.message}`
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // Verify that the email and password are provided in the request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user with the provided email
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Verify if the provided password matches the user's password
    const isPasswordMatch = await user.authenticate(req.body.password);

    // Check if the password matches
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user's role is not 'admin'
    if (user.role !== 'user') {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    // Generate a JSON Web Token (JWT) with user's ID and role
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

    // Extract relevant user data to include in the response
    const { _id, firstName, lastName, email, role, fullName, contactNumber } = user;

    // Return the JWT and user data in the response
    res.status(200).json({
      token,
      user: {
        _id,
        firstName,
        lastName,
        email,
        role,
        fullName,
        contactNumber
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// exports.signin = async (req, res) => {
//   try {
//     // Verify that the email and password are provided in the request body
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email: req.body.email });

//     // Check if the user exists
//     if (!user) {
//       return res.status(400).json({ message: "User Does Not Exist" });
//     }

//     const isPasswordMatch = await user.authenticate(req.body.password);

//     // Check if the password matches
//     if (!isPasswordMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Check if the user's role is not 'admin'
//     let role = 'user';
//     if (user.role && user.role === 'admin') {
//       role = 'admin';
//     }

//     const token = jwt.sign({ _id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "2h" });

//     const { _id, firstName, lastName, email, fullName, contactNumber } = user;

//     res.status(200).json({
//       token,
//       user: {
//         _id,
//         firstName,
//         lastName,
//         email,
//         role,
//         fullName,
//         contactNumber
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




