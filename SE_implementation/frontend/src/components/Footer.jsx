import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.section}>
                <h3>Address</h3>
                <p>123 Main Street</p>
                <p>City, State, ZIP</p>
            </div>
            <div style={styles.section}>
                <h3>Contact Info</h3>
                <p>Email: contact@example.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
            <div style={styles.section}>
                <h3>Connect with Us</h3>
                <div style={styles.icons}>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                        <FaLinkedin size={30} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                        <FaTwitter size={30} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        color: 'black',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        backgroundColor: '#f1f1f1',
    },
    section: {
        flex: 1,
        textAlign: 'center',
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    icon: {
        color: '#000',
        textDecoration: 'none',
    },
};

export default Footer;