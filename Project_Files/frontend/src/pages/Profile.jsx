import React from "react";
import "./Profile.css";

const Profile = () => {
  

  return (
    <div>
      <div className="profile-page">
        <div className="header">
          <h1>PROFILE </h1>
          <p>
            <strong>Username:</strong>ABC
          </p>
          <p>
            <strong>Email:</strong>abc@gmail.com
          </p>
        </div>
        <div className="cards-container">
          {/* Seller Card */}
          <div className="card seller-card">
            <h2>As Seller</h2>
            <div className="row">
              <span>
                <strong>Product Sold:</strong> Item 1
              </span>
              <span>
                <strong>Base Price:</strong> $100
              </span>
              <span>
                <strong>Sold Price:</strong> $150
              </span>
            </div>
            <div className="row">
              <span>
                <strong>Product Sold:</strong> Item 2
              </span>
              <span>
                <strong>Base Price:</strong> $200
              </span>
              <span>
                <strong>Sold Price:</strong> $250
              </span>
            </div>
          </div>
          {/* Buyer Card */}
          <div className="card buyer-card">
            <h2>As Buyer</h2>
            <div className="row">
              <span>
                <strong>Product Purchased:</strong> Item A
              </span>
              <span>
                <strong>Price:</strong> $120
              </span>
            </div>
            <div className="row">
              <span>
                <strong>Product Purchased:</strong> Item B
              </span>
              <span>
                <strong>Price:</strong> $180
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
