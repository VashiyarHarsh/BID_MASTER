const nodemailer = require('nodemailer');

const otpStorage = {};

const generateOTP = () => {
    return `${Math.floor(1000 + Math.random() * 9000)}`;
};

const sendMail = async (req, res) => {
    try {
        const otp = generateOTP(); 
        const otpExpiration = Date.now() + 4 * 60 * 1000; 

        const { email } = req.body;
        
        otpStorage[email] = { otp, otpExpiration };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'maadhavvashiyar@gmail.com', 
                pass: 'unqqjndfxgwayvyp', 
            },
        });

        const mailOptions = {
            from: '"HV" <maadhavvashiyar@gmail.com>', 
            to: email, 
            subject: 'Your Password Reset Code', 
            text: `Your OTP is ${otp}. It is valid for 2 minutes.`, 
            html: `<b>Your OTP is ${otp}</b>. It is valid for 2 minutes.`, 
        };

        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        throw error;
    }
};

const verifyOTP = (email, otp) => {
    const storedOTP = otpStorage[email];
    if (!storedOTP) {
        return { valid: false, message: 'No OTP found for this email.' };
    }

    const { otp: storedOtpCode, otpExpiration } = storedOTP;
    if (Date.now() > otpExpiration) {
        return { valid: false, message: 'OTP has expired.' };
    }

    if (storedOtpCode === otp) {
        return { valid: true, message: 'OTP is valid.' };
    } 
    else {
        return { valid: false, message: 'OTP is incorrect.' };
    }
};

module.exports = { sendMail, verifyOTP };