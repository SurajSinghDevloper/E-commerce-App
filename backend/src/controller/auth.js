const uuid = require('uuid');
const jwt = require('jsonwebtoken');
//import user model
const User = require('../models/user');

exports.signup = async (req, res) => {

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber
    } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      userName: uuid.v4(),
      password,
      role: 'user',
      contactNumber
    });
    const savedUser = await _user.save();
    if (savedUser)
      res.status(200).json({
        message: "User Data saved successfully"
      });
  } catch (error) {
    res.status(400).json({
      message: `Error while saving data: ${error.message}`
    });
  }
}

// exports.signin = (req, res)=>{
//   User.findOne({email:req.body.email})
//   .exec((error, user)=>{
//     if(error) return res.status(400).json(error);
//     if(user) {
//       if(user.authenticate(req.body.password)){
//         const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: '1h'});
//         const { firstName, lastName, email, role, contactNumber, fullName} = user;
//         res.status(200).json({
//           token,
//           user:{
//             firstName, lastName, email, role, contactNumber, fullName
//           }
//         })
//       }else{
//         return res.status(400).json({message:"Invalid Credential"})
//       }
//     }else{
//       return res.status(400).json({message:"Something went wrong, Try again!"});
//     }
//   })

// }


// exports.signin = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     console.log(user, 'from line 71 controller/auth.js');
//     if (!user) {
//       return res.status(400).json({ message: "Something went wrong, Try again!" });
//     }

//     const isPasswordMatch = await user.authenticate(req.body.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({ message: "Invalid Credential" });
//     }
//     if (!user.role === 'user') {
//       return res.status(400).json({ message: "Unauthorized access" });
//     }

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     const { _id, firstName, lastName, email, role, fullName, contactNumber } = user;

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

exports.signin = async (req, res) => {
  try {
    // Verify that the email and password are provided in the request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "User Does Not Exist" });
    }

    const isPasswordMatch = await user.authenticate(req.body.password);

    // Check if the password matches
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user's role is not 'admin'
    if (user.role !== 'admin') {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { _id, firstName, lastName, email, role, fullName, contactNumber } = user;

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




