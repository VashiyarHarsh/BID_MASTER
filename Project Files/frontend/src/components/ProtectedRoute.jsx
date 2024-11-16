import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Ensure you import jwtDecode

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null
    const [redirecting, setRedirecting] = useState(false);
    const navigate = useNavigate();
    const token = Cookies.get("token");

    useEffect(() => {
        if (!token) {
            setRedirecting(true);
            const timer = setTimeout(() => {
                navigate("/Login", { replace: true });
            }, 1000);

            return () => clearTimeout(timer);
        }

        try {
            const decodedToken = jwtDecode(token);
            // Add any token expiration check here if needed
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false); // Token is invalid or expired
            navigate("/Login", { replace: true });
        }
    }, [token, navigate]);

    if (isAuthenticated === null || redirecting) {
        return (
            <div>
                <h1 style={{ color: 'red' }}>Please log in first.</h1>
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;