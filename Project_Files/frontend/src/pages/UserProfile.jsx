import { useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  //Data to be fetched from database
  const [auctionHistory] = useState([
    { id: 1, item: "Vintage Watch", status: "Won", price: "$250", date: "2024-03-15", type: "purchase" },
    { id: 2, item: "Art Piece", status: "Lost", price: "$180", date: "2024-03-10", type: "purchase" },
    { id: 3, item: "Collectible Card", status: "Active", price: "$120", date: "2024-03-20", type: "purchase" },
  ]);
  //Data to be fetched.............
  const [itemsSold] = useState([
    { id: 4, item: "Antique Lamp", price: "$350", date: "2024-04-02", status: "Sold", type: "sale" },
    { id: 5, item: "Luxury Bag", price: "$1200", date: "2024-04-05", status: "Sold", type: "sale" },
    { id: 6, item: "Classic Guitar", price: "$500", date: "2024-04-12", status: "Sold", type: "sale" },
    { id: 7, item: "Rare Book", price: "$85", date: "2024-04-20", status: "Sold", type: "sale" }
  ]);

  const styles = {
    pageBackground: {
      background: 'linear-gradient(135deg, #ffddc1, #fad0c4, #fcb69f)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    },
    container: {
      maxWidth: '1000px',
      width: '90%',
      padding: '30px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      padding: '20px',
      backgroundColor: '#3a3f51',
      color: 'white',
      borderRadius: '12px',
      marginBottom: '25px',
      fontSize: '1.5em',
      textAlign: 'center'
    },
    profileDetails: {
      marginBottom: '30px',
      textAlign: 'center',
      fontSize: '1em',
      color: '#666'
    },
    label: {
      display: 'block',
      fontSize: '1em',
      color: '#666',
      marginBottom: '10px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '1em',
      borderRadius: '6px',
      border: '1px solid #ccc',
      marginTop: '8px'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px'
    },
    historySection: {
      textAlign: 'left'
    },
    historyTitle: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1em',
      color: '#444'
    },
    th: {
      backgroundColor: '#4a4e69',
      color: 'white',
      padding: '12px',
      textAlign: 'center',
      borderBottom: '2px solid #ddd'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #ddd',
      textAlign: 'center'
    },
    status: {
      padding: '5px 10px',
      borderRadius: '8px',
      fontWeight: 'bold'
    },
    wonStatus: { backgroundColor: '#e1f8e1', color: '#2d6a2d' },
    lostStatus: { backgroundColor: '#ffe6e6', color: '#d9534f' },
    activeStatus: { backgroundColor: '#fdf5e6', color: '#f0ad4e' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderStatus = (status) => {
    const style =
      status === 'Won' ? styles.wonStatus :
      status === 'Lost' ? styles.lostStatus :
      styles.activeStatus;
    return <span style={{ ...styles.status, ...style }}>{status}</span>;
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Profile Details with Input Fields */}
        <div style={styles.header}>
       
          <label style={styles.label}>
            Name:
            <input 
              type="text" 
              name="Username" 
              value={userData.name} 
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Email:
            <input 
              type="email" 
              name="email" 
              value={userData.email} 
              onChange={handleInputChange} 
              style={styles.input}
            />
          </label>
         
        </div>

        {/* Main Content - Auction History and Item Sold */}
        <div style={styles.mainContent}>
          {/* Auction History Section */}
          <div style={styles.historySection}>
            <h2 style={styles.historyTitle}>Auction History (Buyer)</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {auctionHistory.map((auction) => (
                  <tr key={auction.id}>
                    <td style={styles.td}>{auction.item}</td>
                    <td style={styles.td}>{renderStatus(auction.status)}</td>
                    <td style={styles.td}>{auction.price}</td>
                    <td style={styles.td}>{auction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Item Sold Section */}
          <div style={styles.historySection}>
            <h2 style={styles.historyTitle}>Item Sold (Seller)</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Date Sold</th>
                </tr>
              </thead>
              <tbody>
                {itemsSold.map((soldItem) => (
                  <tr key={soldItem.id}>
                    <td style={styles.td}>{soldItem.item}</td>
                    <td style={styles.td}>{soldItem.price}</td>
                    <td style={styles.td}>{soldItem.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
