import React, { useState } from "react";
import ViewProductsCard from "./ViewProducts-card";
import "./ViewProducts.css";
import DarkSideImage from "./Dark_Side_of_the_Moon.png";
import FMac from "./FMacRumours.png";

const categories = [
  "Collectibles",
  "Art & Antiques",
  "Jewellery & Watches",
  "Furniture",
  "Wine & Spirits",
  "Books & Musical Instruments"
];

const subcategories = {
  "Collectibles": ["Coins & Currency", "Stamps", "Sports Memorabilia", "Comics & Trading Cards"],
  "Art & Antiques": ["Paintings", "Sculptures", "Art Pieces"],
  "Jewellery & Watches": ["Fine Jewellery", "Gemstones", "Luxury Watches", "Vintage Watches"],
  "Furniture": ["Vintage Furniture", "Designer Furniture", "Rugs-Carpets"],
  "Wine & Spirits": ["Fine Wine", "Rare Whiskeys", "Vintage Spirits", "Champagne"],
  "Books & Musical Instruments": ["Vintage Records", "Manuscripts"]
};

const ViewProducts = () => {
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    { 
      id: 1, 
      name: "Pink Floyd - The Dark Side Moon", 
      startingBid: 100.0, 
      expiryDate: "February 28, 2025", 
      image: DarkSideImage, 
     
    },
    { 
      id: 2, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: FMac,
      
    },
    { 
      id: 3, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 200.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
      
    },
    { 
      id: 4, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 10.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
       
    },
    { 
      id: 5, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
       
    },

    { 
      id: 6, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
       
    },
    { 
      id: 7, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
      
    },
    { 
      id: 8, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
      
    },
    { 
      id: 9, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
      
    },
    { 
      id: 10, 
      name: "Rumours Remaster - Fleet", 
      startingBid: 55.0, 
      expiryDate: "February 28, 2025", 
      image: "./images/Fleetwood_Rumours.png", 
      
    }

    // Add more products here
  ];

  const resetFilters = () => {
    setFilter("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setPriceRange([0, 1000]);
    setSortOption("");
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
  
    if (index === 0 && newRange[0] >= newRange[1]) {
      newRange[0] = newRange[1] - 10; // Prevent overlap
    } else if (index === 1 && newRange[1] <= newRange[0]) {
      newRange[1] = newRange[0] + 10; // Prevent overlap
    }
  
    setPriceRange(newRange);
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
    .filter((product) => !selectedCategory || product.category === selectedCategory)
    .filter((product) => !selectedSubcategory || product.subcategory === selectedSubcategory)
    .filter((product) => product.startingBid >= priceRange[0] && product.startingBid <= priceRange[1])
    .sort((a, b) => {
      if (sortOption === "Price : high to low") return b.startingBid - a.startingBid;
      if (sortOption === "Price : low to high") return a.startingBid - b.startingBid;
      return 0;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOption === "Price : high to low") {
        return b.startingBid - a.startingBid;
      }
      if (sortOption === "Price : low to high") {
        return a.startingBid - b.startingBid;
      }
      if (sortOption === "Recently added") {
        // Use the timer logic to calculate time left
        const getTimeLeft = (expiryDate) => {
          const savedEndTime = localStorage.getItem(`auction_${expiryDate}`);
          if (savedEndTime) {
            return new Date(savedEndTime).getTime() - Date.now();
          }
          return new Date(expiryDate).getTime() - Date.now();
        };
    
        const aTimeLeft = getTimeLeft(a.expiryDate);
        const bTimeLeft = getTimeLeft(b.expiryDate);
    
        return aTimeLeft - bTimeLeft; // Larger remaining time comes first
      }
     return 0;
    });
    

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`view-products ${isModalOpen ? 'modal-open' : ''}`}>
      {/* Filter Box Section */}
      <div className="filter-box">
        <h4>Filters</h4>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <p>Filter your search</p>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {selectedCategory && (
          <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
            <option value="">Select Subcategory</option>
            {subcategories[selectedCategory].map((subcategory) => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        )}
        <p>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
        <div className="range-slider">
          <div
            className="highlight"
            style={{
              left: `${(priceRange[0] / 1000) * 100}%`,
              width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`,
            }}
          ></div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="slider-min"
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="slider-max"
          />
        </div>

        <p>Sort by:</p>
        <div>
          <label>
            <input
              type="checkbox"
              value="Recently added"
              checked={sortOption === "Recently added"}
              onChange={(e) => setSortOption(e.target.value)}
            /> Recently added
          </label>
          <label>
            <input
              type="checkbox"
              value="Price : high to low"
              checked={sortOption === "Price : high to low"}
              onChange={(e) => setSortOption(e.target.value)}
            /> Price: high to low
          </label>
          <label>
            <input
              type="checkbox"
              value="Price : low to high"
              checked={sortOption === "Price : low to high"}
              onChange={(e) => setSortOption(e.target.value)}
            /> Price: low to high
          </label>
        </div>
        <button onClick={resetFilters} className="reset-button">Remove Filters</button>
      </div>

      {/* Product Grid Section */}
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ViewProductsCard key={product.id} product={product} />
        ))}
      </div>

      {/* Modal for product details */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <h3>Product Details</h3>
            {/* Modal content goes here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
