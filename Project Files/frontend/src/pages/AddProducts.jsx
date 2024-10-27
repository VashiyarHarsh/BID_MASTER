import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProducts = () => {  
  const { register, handleSubmit, reset } = useForm();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const categories = ["Collectibles", "Art and Antiques", "Jewellery and Watches", "Furniture", "Wine and Spirits", "Books and Musical Instruments"];
  const subCategories = {
   Collectibles: ["Coins and Currency", "Stamps", "Sports Memorabilia"],
   "Art and Antiques": ["Paintings", "Sculptures", "Art Pieces"],
   "Jewellery and Watches": ["Fine Jewellery", "Gemstones", "Luxury Watches", "Vintage Watches"],
   Furniture: ["Vintage Furniture", "Designer Furniture", "Rugs/Carpets"],
   "Wine and Spirits": ["Fine Wine", "Rare Whiskeys", "Vintage Spirits", "Champagne"],
   "Books and Musical Instruments": ["Vintage Records", "Manuscripts"]
  };

  const onSubmit = (data) => {
    console.log(data);
    reset(); 
  };
  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #c2b280",
    borderRadius: "8px",
    backgroundColor: "#f9f5e5",
    fontFamily: "'Garamond', serif",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  };

  const labelStyle = {
    display: "block",
    margin: "10px 0 5px",
    fontWeight: "bold",
    color: "#3e2723",
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "96.5%",
    padding: "10px",
    border: "1px solid #c2b280",
    borderRadius: "4px",
    backgroundColor: "#fff",
    marginBottom: "15px",
  };

  const buttonStyle = {
    backgroundColor: "#c2b280",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    backgroundColor: "#d6c48e",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <div>
        <label style={labelStyle}>Product Name</label>
        <input style={inputStyle} {...register("productName", { required: true })} />
      </div>

      <div>
        <label style={labelStyle}>Category</label>
        <select
          style={inputStyle}
          {...register("category", { required: true })}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {category && (
        <div>
          <label style={labelStyle}>Sub Category</label>
          <select style={inputStyle} {...register("subCategory", { required: true })}>
            <option value="">Select Sub Category</option>
            {subCategories[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

<div>
        <label style={labelStyle}>Product Description</label>
        <textarea style={{ ...inputStyle, height: "100px" }} {...register("description", { required: true })}></textarea>
      </div>

      <div>
        <label style={labelStyle}>Minimum Price</label>
        <input type="number" style={inputStyle} {...register("price", { required: true })} />
      </div>

      <div>
        <label style={labelStyle}>Dimensions</label>
        <input style={inputStyle} {...register("dimensions", { required: true })} />
      </div>


      <div>
        <label style={labelStyle}>Weight</label>
        <input type="number" style={inputStyle} {...register("weight", { required: true })} />
      </div>

      <div>
        <label style={labelStyle}>Brand/Manufacturer</label>
        <input style={inputStyle} {...register("brand", { required: true })} />
      </div>

      <div>
        <label style={labelStyle}>Country of Origin</label>
        <input style={inputStyle} {...register("origin", { required: true })} />
      </div>

      <div>
  <label style={labelStyle}>Certification </label>
  <input 
    type="file" 
    style={inputStyle} 
    {...register("certification", { required: true })} 
    accept=".pdf" // Specify accepted file types
  />
  <small style={{ color: "#6b6b6b" }}>Upload a PDF document. </small>
</div>

<div>
  <label style={labelStyle}>Photos</label>
  <input 
    type="file" 
    style={inputStyle} 
    {...register("photos", { required: true })} 
    multiple 
    accept="image/*" // Specify that any image format is accepted
  />
 
</div>

      <button type="submit" style={buttonStyle} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}>
        Add Product
      </button>
    </form>
  );
};

export default AddProducts;
