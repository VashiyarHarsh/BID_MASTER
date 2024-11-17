import React, { useEffect } from 'react';
import styles from './SignupAndLogin.module.css';

const SignupAndLogin = () => {
    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        const activateRegister = () => container.classList.add(styles.active);
        const deactivateRegister = () => container.classList.remove(styles.active);

        registerBtn.addEventListener('click', activateRegister);
        loginBtn.addEventListener('click', deactivateRegister);

        return () => {
            registerBtn.removeEventListener('click', activateRegister);
            loginBtn.removeEventListener('click', deactivateRegister);
        };
    }, []);

    return (
        <div className={styles.container} id="container">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            <title>Modern Login Page</title>

            <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                <form>
                    {/* <h1>Create Account</h1> */}
                    <div className={styles['social-icons']}>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f" /></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="number" placeholder="Phone Number" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button className={styles.butt1}>Sign Up</button>
                </form>
            </div>

            <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                <form>
                    <h1>Sign In</h1>
                    <div className={styles['social-icons']}>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f" /></a>
                    </div>
                    <span>or use your email and password</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forgot Your Password?</a>
                    <button className={styles.butt2}>Sign In</button>
                </form>
            </div>

            <div className={styles['toggle-container']}>
                <div className={styles.toggle}>
                    <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                    <h1>Hello, Bidder!</h1>
                    <p>Register with your personal details to use all of the site’s features</p>
                        <button className={styles.hidden} id="login">Sign In</button>
                    </div>
                    <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                        
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site’s features</p>
                        <button className={styles.hidden} id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupAndLogin;
