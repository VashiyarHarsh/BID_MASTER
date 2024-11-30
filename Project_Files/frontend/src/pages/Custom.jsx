import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
// productName: { type: String, required: [true, "PLEASE ENTER PRODUCT NAME"] },
// productDescription: { type: String, required: [true, "PLEASE ENTER DESCRIPTION AN ITEM"] },
// dimensions: { type: String, required: [false, "PLEASE ENTER DIMENSION"] },
// weight: { type: Number, required: [false, "PLEASE ENTER WEIGHT"] },
// yearOfManufacture: { type: Number, required: [false, "PLEASE ENTER MANUFACTURING DATE"] },
// manufacturer: { type: String, required: [false, "PLEASE ENTER MANUFCTURER NAME"] },
// reservePrice: { type: Number, default: 0 },
// finalPrice: { type: Number, default: 0 },
// certifications: { type: [String], // Array of image URLs or file paths required: true, },
// productImagesURL: { type: [String], // Array of image URLs or file paths required: true },
// category: { type: String, required: [true, "PLEASE SELECT CATEGORY"] },
// subCategory:{ type: String, required: [true, "PLEASE SELECT SUBCATEGORY"] },
// createdAt: { type: Date, default: Date.now() },
// productStatus: { type: String, enum: ["unverified", "verified", "sold"], default: "unverified" },
// seller: { type: mongoose.Schema.ObjectId, ref: 'User' }
// bids: [{ bidder: { type: mongoose.Schema.ObjectId, ref: 'USER' }, bid: Number, time: Date }]
//   useEffect(() => {
//     const checkAdmin = () => {
//       try {
//         const token = Cookies.get('token');
//         if (token) {
//           const decoded = jwtDecode(token);
//           if(decoded.role.includes('Admin')){
//             console.log('Admin');
//           }
//           else{
//             console.log('Not Admin');
//           }
//           return decoded.role.includes('Admin');
//         }
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//     setIsAdmin(checkAdmin());
//     console.log(isAdmin);
//   }, []);
useEffect(() => {
    const fetchProducts = async () => {
      try {
        //const url = isAdmin ? 'http://localhost:5124/api/form/unverified' : 'http://localhost:5124/api/form/';
        //const response = await fetch(url);
        const response = await fetch('http://localhost:5124/api/form/unverified', {
            method: 'GET',
            //body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        //console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // console.log(products);
  }, []);

  const handleVerifyProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5124/api/form/verify/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to verify product');
      }
      //setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      setError(error.message);
    }
    // console.log(productId);
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5124/api/form/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to remove product');
      }
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      setError(error.message);
    }
    // console.log(productId);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  //console.log(products);
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Product List</h1>
      <div style={styles.cardContainer}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img
              src={product.productImagesURL?.[0] || 'https://via.placeholder.com/150'}
              alt={product.productName}
              style={styles.image}
            />
            <h2 style={styles.productName}>{product.productName}</h2>
            <p style={styles.description}>{product.productDescription}</p>
            <p style={styles.price}>Reserve Price: ${product.reservePrice}</p>
            {isAdmin && (
              <div style={styles.adminControls}>
                <button style={styles.button} onClick={() => handleVerifyProduct(product._id)}>Verify</button>
                <button style={styles.button} onClick={() => handleRemoveProduct(product._id)}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: '10px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  productName: {
    fontSize: '1.2rem',
    margin: '10px 0',
    color: '#444',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    padding: '0 10px',
    margin: '10px 0',
  },
  price: {
    fontSize: '1rem',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  adminControls: {
    marginTop: '10px',
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
    fontSize: '0.9rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Products;