import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
// import{AddProduct} from "./pages/AddProduct";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        
        
      </Routes>
      <Footer />
      
    </BrowserRouter>
  );
};

export default App;
