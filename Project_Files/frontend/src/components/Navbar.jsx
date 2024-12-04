import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/" className="logo-link">
          
  <span className="bidmaster">B</span>
  <span className="bidmaster id-highlight">iD</span>
  <span className="bidmaster">Master</span>


          </NavLink>
        </div>
        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/ViewProducts" activeClassName="active">Products</NavLink></li>
            <li><NavLink to="/AddProducts" activeClassName="active">Add Product</NavLink></li>
            <li><NavLink to="/Login" activeClassName="active">Sign In</NavLink></li>
            <li><NavLink to="/Profile" activeClassName="active">Profile</NavLink></li>
            <li><NavLink to="/SignOut" activeClassName="active">Sign Out</NavLink></li>
            
            
          </ul>
        </nav>
      </div>
    </header>
  );
};
