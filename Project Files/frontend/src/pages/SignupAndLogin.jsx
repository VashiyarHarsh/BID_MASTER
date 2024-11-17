import React, { useState } from 'react';
import styles from './SignupAndLogin.module.css';  // Import the CSS module

export default function SignupAndLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');

    const validateEmail = (email) => {
        return email.includes('@');
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setFormError('');

        // Validate email format
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // Check if all fields are filled
        if (!email || !password || !confirmPassword || !username) {
            setFormError('All fields are required');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        console.log('Form Submitted');
        // Proceed with form submission (API call, etc.)
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setEmailError(''); // Clear previous email error

        // Validate email format
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else if (!email || !password) {
            setFormError('Email and Password are required');
        } else {
            console.log('Login Submitted');
            // You can add your login logic here (API call, etc.)
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (confirmPassword && value !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (password && value !== password) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.formToggle}>
                    <button 
                        className={isLogin ? styles.active : ""} 
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={!isLogin ? styles.active : ""} 
                        onClick={() => setIsLogin(false)}
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
                        {emailError && <p className={styles.error}>{emailError}</p>}
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        {formError && <p className={styles.error}>{formError}</p>}
                        <button onClick={handleLogin}>Login</button>
                        <p>Don't have an account? <a href='#' onClick={() => setIsLogin(false)}>Sign Up</a></p>
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
                        {formError && <p className={styles.error}>{formError}</p>}
                        <input 
                            type='email' 
                            placeholder='Email' 
                            value={email}
                            onChange={handleEmailChange} 
                            required
                        />
                        {emailError && <p className={styles.error}>{emailError}</p>}
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
                        {passwordError && <p className={styles.error}>{passwordError}</p>}
                        <button onClick={handleSignUp} disabled={password !== confirmPassword}>SignUp</button>
                    </div>
                )}
            </div>
        </div>
    );
}
