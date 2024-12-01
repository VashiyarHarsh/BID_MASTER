import React, { useState } from 'react';
import styles from './SignupAndLogin.module.css';  // Import the CSS module
import { useNavigate } from 'react-router-dom';

export default function SignupAndLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userName, setuserName] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    // Separate error states for login and signup
    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');
    const [loginFormError, setLoginFormError] = useState('');
    
    const [signupEmailError, setSignupEmailError] = useState('');
    const [signupPasswordError, setSignupPasswordError] = useState('');
    const [signupFormError, setSignupFormError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false); // State for the checkbox
    const [termsError, setTermsError] = useState(''); // State for the error message
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);  // State for handling forgot password view
    const [otpError, setOtpError] = useState('');
    const [emailForForgotPassword, setEmailForForgotPassword] = useState('');
    const [otp, setOtp] = useState(''); 
    const [otpSent, setOtpSent] = useState(false); 
    const [otpSuccess, setOtpSuccess] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');
    const [hh, sethh] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return email.includes('@');
    };


    const handleBackToLogin = () => {
        setPassword('');
        setConfirmPassword('');
        setPasswordChanged(false);
        setIsForgotPassword(false); // If applicable
        setOtpSuccess(false); 
        setChangePasswordVisible(false);
        setOtpSent(false);
        // Reset OTP state if needed
    };
    
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        setSignupEmailError('');
        setSignupPasswordError('');
        setConfirmPasswordError('');
        setSignupFormError('');

        
        if (!validateEmail(email)) {
            setSignupEmailError('Please enter a valid email address');
            return;
        }

        
        if (!email || !password || !confirmPassword || !userName) {
            setSignupFormError('All fields are required');
            return;
        }

        
        if (password !== confirmPassword) {
            setSignupPasswordError('Passwords do not match');
            return;
        }

        // Check if terms and conditions are agreed
        if (!agreeToTerms) {
            setTermsError('You must agree to the terms and conditions');
            return;
        } else {
            setTermsError(''); // Clear error if checkbox is checked
        }


        try {
          const response = await fetch('https://bid-master-backend.vercel.app/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName,fullName,email, password}),
            credentials: 'include', // Include cookies in the request
          });
          console.log(response)
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }
          
          
          navigate('/');
        } catch (err) {
        
            console.log(err);
        }

        console.log('SignUp Form Submitted');
        // Proceed with form submission (API call, etc.)
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginEmailError(''); 
        setLoginPasswordError(''); 
        setLoginFormError('');

        
        if (!validateEmail(email)) {
            setLoginEmailError('Please enter a valid email address');
        } else if (!email || !password) {
            setLoginFormError('Email and Password are required');
        } else { 
            // You can add your login logic here (API call, etc.)

            try {
              
              const response = await fetch('https://bid-master-backend.vercel.app/user/signin', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email, password }),
                //credentials: 'include', // Include cookies in the request
                
              });
              console.log(response);
              if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Login failed');
              }
              const data = await response.json();
              const token = data.token;
        
              // Set the token in localStorage
              localStorage.setItem("token", token);
              // If successful, navigate to the home page or another page

              console.log('Login Form Submitted');

              navigate('/');
            } catch (err) {
            //   setError(err.message);
                console.log(err);
            }
        }

        
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setOtpError(''); // Clear any previous errors
    
        if (!validateEmail(emailForForgotPassword)) {
            setOtpError('Please enter a valid email address');
            return;
        }
    
        try {
            const response = await fetch('https://bid-master-backend.vercel.app/mail/sendotp', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ email: emailForForgotPassword }),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
    
            setOtpSent(true); // Indicate OTP has been sent
            setOtpError('');  // Clear any errors
            console.log('OTP sent successfully');
        } catch (err) {
            console.error(err);
            setOtpError('Failed to send OTP. Please try again.');
        }
    };

    // const handleForgotPassword = async (e) => {
    //     e.preventDefault();
    //     setOtpError(''); // Clear previous OTP error

    //     // Validate email format
    //     if (!validateEmail(emailForForgotPassword)) {
    //         setOtpError('Please enter a valid email address');
    //     } else {

    //         try {
    //           const response = await fetch('http://localhost:5124/mail/sendotp', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({email: emailForForgotPassword}),
    //             credentials: 'include', // Include cookies in the request
    //           });
    //           console.log(response)
    //           if (!response.ok) {
    //             const errorMessage = await response.text();
    //             throw new Error(errorMessage);
    //           }
              
    //           // If successful, navigate to the home page or another page
    //         //   navigate('/Login');

    //         console.log('OTP sent');
    //         setOtpSent(true); // OTP has been sent
    //         // You can add OTP sending logic here (API call, etc.)
    //         setIsForgotPassword(false);  // Close the forgot password modal after submission
             
    //         } catch (err) {
    //         //   setError(err.message);
    //             console.log(err);
    //             setOtpError('An error occurred. Please try again.');
    //         }

            
    //     }
    // };

    // const handleForgotPassword = async (e) => {
    // e.preventDefault();
    // setOtpError('');

    // if (!validateEmail(emailForForgotPassword)) {
    //     setOtpError('Please enter a valid email address');
    // } else {
    //     // Simulate the OTP sending process
    //     setTimeout(() => {
    //         // Simulating successful OTP send by setting otpSent to true
    //         setOtpSent(true); // OTP has been sent
    //         // Reset the error in case of success
    //         setOtpError('');
    //         setIsForgotPassword(false);
    //     }, 500); // Simulate delay
    // }};

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setOtpError(''); // Clear any previous errors
    
        if (!otp || otp.length !== 4) {
            setOtpError('Please enter a valid 4-digit OTP');
            return;
        }
        
        try {
            const response = await fetch('https://bid-master-backend.vercel.app/mail/verifyotp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailForForgotPassword, otp }),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            setOtpSuccess(true); // Indicate OTP is verified
            sethh(true);
            console.log('OTP verified successfully');
        } catch (err) {
            console.error(err);
            setOtpError('Invalid OTP or expired OTP. Please try again.');
        }
    };

    const handleChangePassword = async (e) => {
        console.log('Apun zinda hai');
        e.preventDefault();
        setOtpError(''); // Clear any previous errors
        if (hh) {
            console.log('Apun ko pata hai otp sahi hai');
            try {
                console.log('Changing password...');
                const response = await fetch('https://bid-master-backend.vercel.app/mail/resetpassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailForForgotPassword, newPassword: password }),
            });
            console.log(response.status);
            // if (!response.ok) {
            //     const errorMessage = await response.text();
            //     throw new Error(errorMessage);
            // }
            if (response.status === 200) {
                setPasswordChanged(true);
                alert('Password changed successfully!');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
            //console.log('Password changed successfully');
            
            } catch (error) {
                setErrorMessage(error.response?.data || 'Failed to update password.');
            }
        } else {
            setErrorMessage('Please verify OTP first.');
        }
    }


    // handleChangePassword = async (e) => {
    //     e.preventDefault();
    //     setOtpError(''); // Clear any previous errors
    //     if (isOtpVerified) {
    //         try {
    //             const response = await axios.post('/user/resetpassword', {
    //                 email,
    //                 newPassword,
    //             });
    //             if (response.status === 200) {
    //                 setSuccessMessage('Password updated successfully!');
    //                 setErrorMessage('');
    //             }
    //         } catch (error) {
    //             setErrorMessage(error.response?.data || 'Failed to update password.');
    //         }
    //     } else {
    //         setErrorMessage('Please verify OTP first.');
    //     }
    // }

    // const handleOtpVerification = async (e) => {
    //     e.preventDefault();
    //     setOtpError('');
    //     if (otp === '1234') {  // Simulating OTP validation. Replace with real logic.
    //         setOtpSuccess(true);
    //         setOtpError('');
    //     } else {
    //         setOtpError('Invalid OTP or unregistered user');
    //     }
    // };

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
                            setSignupEmailError(''); 
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
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)} 
                            required
                        />
                        <input 
                            type='text' 
                            placeholder='Fullname' 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)} 
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
                        
                        <div>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-black text-sm">
                                I agree to the terms and conditions 
                                    <a 
                                        href="/TermsAndConditions" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={styles.termsLink}
                                    >
                                     T&C
                                    </a>
                                </label>
                            
                        </div>
                        {termsError && <p className={styles.error}>{termsError}</p>} {/* Display error */}
                        
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
                            <button onClick={handleSendOTP}>Send OTP</button>
                            <button onClick={() => setIsForgotPassword(false)}>Cancel</button>
                        </div>
                    </div>
                )}
                {/* OTP Verification */}
                {otpSent && !otpSuccess && (
                    <div className={styles.otpVerificationContainer}>
                        <h3>Enter OTP</h3>
                        <input 
                            type='text' 
                            placeholder='Enter OTP' 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} 
                            maxLength={4}
                            required
                        />
                        {otpError && <p className={styles.error}>{otpError}</p>}
                        <button onClick={handleVerifyOTP}>Verify OTP</button>
                    </div>
                )}
                {otpSuccess && (
    <div className={`${styles.successMessage} ${otpSuccess ? styles.show : ''}`}>
        <div className={styles.tickAnimation}>✔</div>
        <p>OTP Verified Successfully!</p>
        <button onClick={() => { 
    setChangePasswordVisible(true); 
    setOtpSuccess(false); 
}}>Change Password</button> {/* Change Password Button */}
    </div>
)}

{/* Change Password Form */}
{/* {changePasswordVisible && (
    <div className={styles.changePasswordContainer}>
        <div className={styles.changePasswordForm}>
            <h3>Change Password</h3>
            {!passwordChanged ? (
                <>
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 && (
                        <p className={styles.error}>Passwords do not match</p>
                    )}
                    {password === confirmPassword && password.length > 0 && confirmPassword.length > 0 && (
                        <p className={styles.success}>Passwords match</p>
                    )}
                    <button
                        onClick={() => {
                            if (password === confirmPassword) {
                                setPasswordChanged(true);
                            }
                        }}
                        disabled={password !== confirmPassword || password.length === 0 || confirmPassword.length === 0}
                    >
                        Submit
                    </button>
                </>
            ) : (
                <>
                    <p className={styles.success}>Password Changed Successfully!</p>
                    <button onClick={handleBackToLogin}>Back to Login</button>
                </>
            )}
        </div>
    </div>
)} */}
{/* Change Password Form */}
{changePasswordVisible && (
    <div className={styles.changePasswordContainer}>
        <div className={styles.changePasswordForm}>
            <h3>Change Password</h3>
            {!passwordChanged ? (
                <>
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 && (
                        <p className={styles.error}>Passwords do not match</p>
                    )}
                    {password === confirmPassword && password.length > 0 && confirmPassword.length > 0 && (
                        <p className={styles.success}>Passwords match</p>
                    )}
                    <button 
                        onClick={handleChangePassword} // Use handleChangePassword here
                        disabled={password !== confirmPassword || !password}
                    >
                        Submit
                    </button>
                </>
            ) : (
                <p>Password changed successfully!</p>
            )}
        </div>
    </div>
)}

            </div>
        </div>
    );
}
