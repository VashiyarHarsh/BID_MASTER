import React, { useState } from 'react';
import styles from './SignupAndLogin.module.css';  // Import the CSS module

export default function SignupAndLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    
    // Separate error states for login and signup
    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');
    const [loginFormError, setLoginFormError] = useState('');
    
    const [signupEmailError, setSignupEmailError] = useState('');
    const [signupPasswordError, setSignupPasswordError] = useState('');
    const [signupFormError, setSignupFormError] = useState('');
    
    const [isForgotPassword, setIsForgotPassword] = useState(false);  // State for handling forgot password view
    const [otpError, setOtpError] = useState('');
    const [emailForForgotPassword, setEmailForForgotPassword] = useState('');

    const validateEmail = (email) => {
        return email.includes('@');
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setSignupEmailError('');
        setSignupPasswordError('');
        setSignupFormError('');

        // Validate email format
        if (!validateEmail(email)) {
            setSignupEmailError('Please enter a valid email address');
            return;
        }

        // Check if all fields are filled
        if (!email || !password || !confirmPassword || !username) {
            setSignupFormError('All fields are required');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setSignupPasswordError('Passwords do not match');
            return;
        }

        console.log('SignUp Form Submitted');
        // Proceed with form submission (API call, etc.)
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginEmailError(''); // Clear previous email error
        setLoginPasswordError(''); // Clear previous password error
        setLoginFormError('');

        // Validate email format
        if (!validateEmail(email)) {
            setLoginEmailError('Please enter a valid email address');
        } else if (!email || !password) {
            setLoginFormError('Email and Password are required');
        } else {
            console.log('Login Form Submitted');
            // You can add your login logic here (API call, etc.)
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setOtpError(''); // Clear previous OTP error

        // Validate email format
        if (!validateEmail(emailForForgotPassword)) {
            setOtpError('Please enter a valid email address');
        } else {
            console.log('OTP sent');
            // You can add OTP sending logic here (API call, etc.)
            setIsForgotPassword(false);  // Close the forgot password modal after submission
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value && !validateEmail(value)) {
            setLoginEmailError('Please enter a valid email address');
        } else {
            setLoginEmailError('');
        }

        if (value && !validateEmail(value)) {
            setSignupEmailError('Please enter a valid email address');
        } else {
            setSignupEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (confirmPassword && value !== confirmPassword) {
            setSignupPasswordError('Passwords do not match');
        } else {
            setSignupPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (password && value !== password) {
            setSignupPasswordError('Passwords do not match');
        } else {
            setSignupPasswordError('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.formToggle}>
                    <button 
                        className={isLogin ? styles.active : ""} 
                        onClick={() => {
                            setIsLogin(true);
                            setLoginEmailError(''); // Reset login errors when switching to login
                            setLoginPasswordError('');
                            setLoginFormError('');
                        }}
                    >
                        Login
                    </button>
                    <button 
                        className={!isLogin ? styles.active : ""} 
                        onClick={() => {
                            setIsLogin(false);
                            setSignupEmailError(''); // Reset signup errors when switching to signup
                            setSignupPasswordError('');
                            setSignupFormError('');
                        }}
                    >
                        SignUp
                    </button>
                </div>
                
                {isLogin ? (
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            value={email}
                            onChange={handleEmailChange} 
                            required
                        />
                        {loginEmailError && <p className={styles.error}>{loginEmailError}</p>}
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        {loginFormError && <p className={styles.error}>{loginFormError}</p>}
                        <button onClick={handleLogin}>Login</button>
                        <p>Don't have an account? <a href='#' onClick={() => setIsLogin(false)}>Sign Up</a></p>
                        <p><a href='#' onClick={() => setIsForgotPassword(true)}>Forgot Password?</a></p> {/* Forgot Password Link */}
                    </div>
                ) : (
                    <div className={styles.form}>
                        <h2>Sign Up</h2>
                        <input 
                            type='text' 
                            placeholder='Username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                        {signupFormError && <p className={styles.error}>{signupFormError}</p>}
                        <input 
                            type='email' 
                            placeholder='Email' 
                            value={email}
                            onChange={handleEmailChange} 
                            required
                        />
                        {signupEmailError && <p className={styles.error}>{signupEmailError}</p>}
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={handlePasswordChange} 
                            required
                        />
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange} 
                            required
                        />
                        {signupPasswordError && <p className={styles.error}>{signupPasswordError}</p>}
                        <button onClick={handleSignUp} disabled={password !== confirmPassword}>SignUp</button>
                    </div>
                )}

                {/* Forgot Password Modal */}
                {isForgotPassword && (
                    <div className={styles.forgotPasswordContainer}>
                        <div className={styles.forgotPasswordForm}>
                            <h3>Forgot Password</h3>
                            <input 
                                type='email' 
                                placeholder='Enter your email' 
                                value={emailForForgotPassword}
                                onChange={(e) => setEmailForForgotPassword(e.target.value)} 
                                required
                            />
                            {otpError && <p className={styles.error}>{otpError}</p>}
                            <button onClick={handleForgotPassword}>Send OTP</button>
                            <button onClick={() => setIsForgotPassword(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
