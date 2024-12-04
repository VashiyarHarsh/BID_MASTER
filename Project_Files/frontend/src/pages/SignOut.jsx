import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./SignOut.css";

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        alert("Signed out successfully!");
        navigate('/'); // Redirect to sign-in page after sign out
    };

    return (
        <div>
            <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;