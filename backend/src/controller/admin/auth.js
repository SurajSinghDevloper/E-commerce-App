const uuid = require('uuid');
const jwt = require('jsonwebtoken');
//import user model
const User = require('../../models/user');

exports.signup = async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                message: "Admin already exists"
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
            role: 'admin',
            contactNumber
        });
        const savedUser = await _user.save();
        if (savedUser)
            res.status(200).json({
                message: "Admin Data saved successfully"
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
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log("🚀 ~ file: auth.js:69 ~ exports.signin= ~ user:", user.role);

        if (!user) {
            return res.status(400).json({ message: "Something went wrong, Try again!" });
        }

        const isPasswordMatch = await user.authenticate(req.body.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Credential" });
        }

        if (user.role !== 'admin') {
            console.log("🚀 ~ file: auth.js:82 ~ exports.signin= ~ user.role:", user.role);
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

