const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createTokenForUser } = require('../utils/authentication');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Buyer", "Seller", "Admin"],
        default: "Buyer",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // profileImageURL: {
    //     type: String,
    //     required: true,
    //     default: "/images/default-profile-image.jpg",
    // },
    salt: { 
        type: String,
        //required: true,
    },
    DOB: {
        type: Date,
        required: false,
    },
    phoneNo: {
        type: Number,
        required: false,
    },
    // soldItems: {
    //     type: [mongoose.Schema.Types.ObjectId],
    // },
    // boughtItems: {
    //     type: [mongoose.Schema.Types.ObjectId],
    // }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = randomBytes(8).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    user.password = hashedPassword;
    user.salt = salt;
    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User Not Found');
    
    const userProvidedHash = createHmac('sha256', user.salt)
                            .update(password)
                            .digest('hex');
    if (user.password !== userProvidedHash) throw new Error('Incorrect Password');
    
    const token = createTokenForUser(user);
    return token;
});

const User = new mongoose.model("User",userSchema)

module.exports = User;