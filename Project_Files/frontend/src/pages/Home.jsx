import React from "react";
import "./Home.css";

export const Home = () => {
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
              Explore detailed product listings, place bids on your favorite items, and start bidding today! 
              Welcome to our online auction platform where users can view rare products, bid on, and purchase unique items across 
              categories such as Collectibles, Art & Antiques, Jewelry & Watches, Furniture & Home Decor, 
              Books & Manuscripts, Wine & Spirits, and Musical Instruments.
              </p>
             
            </div>
            <div className="image-content" id="img1">
              <img
                src="/src/img/img1_auction.jpg"
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
                  Our sellers are thoroughly verified. You can rest assured knowing that your personal details are safe and secure.
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
                Bidders may place their bid whenever it is most convenient for them.Keep track of your activities and take pleasure in the seamless user experience.
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
                To start selling, simply create a new lot in "ADD PRODUCT" page by entering valid information such as the item name, category, and starting price.... The more detailed your lot information, the better chances you have of getting bids. Our intuitive platform will guide you through the entire process, ensuring a seamless experience.
                
                {/* <p>To start selling, simply head to the "ADD PRODUCT" page and create a new lot by entering all the necessary details, such as the item name, category, starting price, and a clear description of the product. The more information you provide, such as high-quality images, item condition, and specific features, the better your chances of attracting potential buyers. A well-detailed listing helps buyers make informed decisions, increasing the likelihood of receiving bids.
Our user-friendly platform is designed to guide you step-by-step through the entire listing process, ensuring that you don't miss any key details. From setting up your auction to tracking bids in real-time, we make it easy for you to manage your items and maximize your success in the countdown auction.</p> */}
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
              On our platform, customers can easily browse a wide range of products with detailed descriptions, specifications, and images, helping you make informed decisions. If a product catches your interest, you can place a bid, setting your own price and competing with other buyers. The more competitive your bid, the higher your chances of winning.
              </p>
            </div>
          </div>
        </section>
  
      </div>
        
    );
};

// export default Home

