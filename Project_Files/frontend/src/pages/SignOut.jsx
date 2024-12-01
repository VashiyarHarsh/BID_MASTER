import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        alert("Signed out successfully!");
        navigate('/signin'); // Redirect to sign-in page after sign out
    };

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;