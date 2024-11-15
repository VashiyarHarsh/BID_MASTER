import React from "react";
import "./Home.css";

export const Home = () =>{
    return(
        
        <div className="app">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container flex-row">
            <div className="text-content">
              <h1 className="title">
                Bid and Sell Items with <br />
                <span className="highlight">BidMaster</span>
              </h1>
              <p className="description">
                BidMaster is a service where participants bid for products or services via the Internet. Explore our platform for secure, convenient bidding.
              </p>
             
            </div>
            <div className="image-content" id="img1">
              <img
                src="/Images/hero section.jpg"
                alt="Auction Illustration"
                className="image-rounded"
              />
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="features-section">
          <div className="container text-center">
            <h2 className="subtitle highlight">A User-Friendly Website</h2>
            <div className="features-grid">
              <div className="feature-item">
                <img
                  src="/Images/Lock security protection flat vector.png"
                  alt="Security Icon"
                  className="icon"
                />
                <h3 className="feature-title highlight1">Security</h3>
                <p className="feature-description">
                  Our sellers are thoroughly verified. You can rest assured knowing that your personal and financial details are safe and secure.
                </p>
              </div>
              <div className="feature-item">
                <img
                  src="https://img.icons8.com/?size=100&id=59850&format=png&color=000000"
                  alt="Availability Icon"
                  className="icon"
                />
                <h3 className="feature-title highlight1">Availability</h3>
                <p className="feature-description">
                  Bid or sell 24/7 from the comfort of your home or anywhere with Internet access. Our platform is always up and running.
                </p>
              </div>
              <div className="feature-item">
                <img
                  src="https://img.icons8.com/?size=100&id=5ga7mCYU4EgW&format=png&color=000000"
                  alt="Flexibility Icon"
                  className="icon"
                />
                <h3 className="feature-title highlight1">Flexibility</h3>
                <p className="feature-description">
                  Managing your listings and bids has never been easier. Stay updated on your activity and enjoy the smooth user experience.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Create Profile Section */}
        <section className="profile-section">
          <div className="container flex-row">
            <div className="text-content">
              <h2 className="subtitle highlight">Create a Lot</h2>
              <p className="description">
                To start selling, simply create a new lot in "ADD PRODUCT" page by entering valid information such as the item name, category, and starting price. The more detailed your lot information, the better chances you have of getting bids. Our intuitive platform will guide you through the entire process, ensuring a seamless experience.
              </p>
              
            </div>
            <div className="image-content" id="img2">
              <img
                src="/Images/Auction 07.jpg"
                alt="Create Lot Illustration"
                className="image-rounded"
              />
            </div>
          </div>
        </section>
  
        {/* Make a Bid Section */}
        <section className="bid-section">
          <div className="container flex-row">
            <div className="image-content" id="img3">
              <img
                src="/Images/Auction 03.jpg"
                alt="Make a Bid Illustration"
                className="image-rounded"
              />
            </div>
            <div className="text-content">
              <h2 className="subtitle highlight">Make a bid</h2>
              <p className="description">
                Customers will see the product details, and if interested in a product, they can place a bid. A valid identity proof is required to complete the bidding process.
              </p>
            </div>
          </div>
        </section>
  
      </div>
        
    );
};

// export default Home

