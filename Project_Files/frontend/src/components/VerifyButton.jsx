import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const VerifyButton = ({ productId, productStatus, onStatusUpdate }) => {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.role.includes("Admin"));
            } catch (err) {
                console.error("Error decoding token:", err);
            }
        }
    }, []);

    const handleVerify = async () => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(`/api/form/verify/${productId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const updatedProduct = await response.json();
                alert("Product status updated successfully!");
                onStatusUpdate(updatedProduct); 
            } else {
                const error = await response.text();
                alert(`Failed to verify product: ${error}`);
            }
        } catch (error) {
            console.error("Error verifying product:", error);
            alert("An error occurred while verifying the product.");
        }
    };

    if (!isAdmin || productStatus === "verified") return null;

    return (
        <button onClick={handleVerify} style={{padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer",}}>
            Verify Product
        </button>
    );
};

export default VerifyButton;