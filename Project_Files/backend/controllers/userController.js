const User = require('../models/users_db');

const { uploadOnCloudinary } = require("../utils/cloudinary");

const handleUserSignUp = async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    const profileImageFile = req.file;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("Email already in use!");

        let profileImageURL = null;

        if (profileImageFile) {
            const uploadResult = await uploadOnCloudinary(profileImageFile.path);
            profileImageURL = uploadResult ? uploadResult.url : null;
        }

        const newUser = await User.create({ fullName, userName, email, password, profileImageURL });
        return res.status(201).send(newUser);
    } 
    catch (err) {
        return res.status(500).send("Internal Server Error: " + err.message);
    }
};

const handleUserSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).send("Invalid email or password");
    }
};

module.exports = {
    handleUserSignUp,
    handleUserSignIn
};