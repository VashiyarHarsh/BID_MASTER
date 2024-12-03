import React, { useState, useEffect } from "react";
import CountdownTimer from "../components/Timer"; // Adjust the import path if necessary
import "./ViewProducts.css";

const ViewProductsCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [hoveredAmount, setHoveredAmount] = useState(null);
  const [currentBid, setCurrentBid] = useState(() => {
    // Retrieve the stored bid from localStorage if it exists
    const savedBid = localStorage.getItem(`currentBid_${product.id}`);
    return savedBid ? parseFloat(savedBid) : product.startingBid;
  });
  const [pendingBid, setPendingBid] = useState(null);
  const [totalBidAmount, setTotalBidAmount] = useState(() => {
    // Retrieve the total bid amount if available
    const savedTotalBid = localStorage.getItem(`totalBid_${product.id}`);
    return savedTotalBid ? parseFloat(savedTotalBid) : 0;
  });

  // Store the current bid and total bid amount in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`currentBid_${product.id}`, currentBid);
    localStorage.setItem(`totalBid_${product.id}`, totalBidAmount);
  }, [currentBid, totalBidAmount, product.id]);

  const handleIncrement = (incrementFactor) => {
    const newBid = currentBid + currentBid * incrementFactor;
    setPendingBid(newBid);
    setShowBidModal(true);
  };

  const confirmBid = () => {
    if (pendingBid > currentBid) {
      setCurrentBid(pendingBid);
      setTotalBidAmount(totalBidAmount + pendingBid); // Add to total bid amount
      setShowBidModal(false);
      setConfirmationMessage(true);
    }
  };

  return (
    <>
      {/* Product Card */}
      <div className="product-card" onClick={() => setShowModal(true)}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Starting bid: ₹{product.startingBid.toFixed(2)}</p>
        <p>Current bid: ₹{currentBid.toFixed(2)}</p>
        <p>Expires on: {product.endTime}</p>

        {/* Add Countdown Timer here */}
        <CountdownTimer auctionId={product.id} initialDays={30} /> {/* Example: 30 days duration */}

        <button className="bid-button">Bid Now</button>
      </div>

      {/* Modal to show product details */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>

            <div className="modal-body">
              {/* Image Section */}
              <div className="modal-image-container">
                <img src={product.image} alt={product.name} className="modal-image" />
              </div>

              {/* Content Section */}
              <div className="modal-info">
                <h2>{product.name}</h2>
                <p>Starting Bid: ₹{product.startingBid.toFixed(2)}</p>
                <p>Current Bid: ₹{currentBid.toFixed(2)}</p>
                <p>Total Bid Amount: ₹{totalBidAmount.toFixed(2)}</p> {/* Display total bid amount */}

                {/* Increment Buttons */}
                <div className="increment-buttons">
                  {[{ label: "+1/8", factor: 0.125 }, { label: "+1/4", factor: 0.25 }, { label: "+1/2", factor: 0.5 }, { label: "+Full", factor: 1 }].map(
                    (btn, idx) => (
                      <button
                        key={idx}
                        onMouseEnter={() =>
                          setHoveredAmount(currentBid + currentBid * btn.factor)
                        }
                        onMouseLeave={() => setHoveredAmount(null)}
                        onClick={() => handleIncrement(btn.factor)}
                      >
                        {btn.label}
                      </button>
                    )
                  )}
                </div>

                {/* Display next bid amount */}
                <div className="bid-amount-display">
                  <p>
                    To bid: {hoveredAmount !== null ? `₹${hoveredAmount.toFixed(2)}` : " "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Confirmation Modal */}
      {showBidModal && (
        <div className="bid-modal">
          <div className="bid-modal-content">
            <p>Do you want to place a bid of ₹{pendingBid.toFixed(2)}?</p>
            <button onClick={confirmBid}>Confirm Bid</button>
            <button onClick={() => setShowBidModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="bid-modal">
          <div className="success-message">
            <p>Bid placed successfully! Your current bid is ₹{currentBid.toFixed(2)}.</p>
            <button
              onClick={() => {
                setConfirmationMessage(false);
                setShowModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProductsCard;
