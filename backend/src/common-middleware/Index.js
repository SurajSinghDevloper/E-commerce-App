const jwt = require('jsonwebtoken')

exports.requireSignin = (req, res, next) => {
    //to check the user is login or not via token
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();

}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        console.log("🚀 ~ file: Index.js:23 ~ req.user.role:", req.user.role);
        return res.status(400).json({ message: 'User Access denied' });
    }
    next();
}


exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        console.log("🚀 ~ file: Index.js:23 ~ req.user.role:", req.user.role);
        return res.status(400).json({ message: 'Admin Access denied' });
    }
    next();
}
