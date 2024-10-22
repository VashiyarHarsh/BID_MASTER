import { NavLink } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            {/* Correct the component name to NavLink */}
            <NavLink to="/"><p>BIDMASTER</p></NavLink>
          </div>

          <nav>
            <ul>
              <li><NavLink to="/">HOME</NavLink></li>
              <li><NavLink to="/BidLive">BID LIVE</NavLink></li>
              <li><NavLink to="/AddProduct">ADD PRODUCT</NavLink></li>
              <li><NavLink to="/Login">LOGIN</NavLink></li>
              
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
