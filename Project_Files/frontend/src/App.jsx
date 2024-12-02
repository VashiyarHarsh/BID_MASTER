import {Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import AddProducts from "./pages/AddProducts";
import {ViewProducts} from "./pages/ViewProducts";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "./App.css"
import SignupAndLogin from "./pages/SignupAndLogin"
import LiveAuctionPage from './pages/LiveAuctionPage';
import ProtectedRoute from "./components/ProtectedRoute";
import SignOut from "./pages/SignOut"
import Custom from "./pages/Custom"
import TermsAndConditions from "./pages/TermsAndConditions";
import Profile from "./pages/Profile"

const App = () => {
  return (

  <div>
    {/* Global ToastContainer */}
    <ToastContainer
        position="bottom-center"
        autoClose={4200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Custom" element={<Custom/>}/>
        <Route path="/ViewProducts" element={<ViewProducts />} />
        <Route path="/Login" element={<SignupAndLogin/>}/>
        <Route path="/SignOut" element={<SignOut/>}/>
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/AddProducts" element={<AddProducts />} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/BidLive" element={<LiveAuctionPage productImage="https://via.placeholder.com/300" initialPrice={4000} />} />
        </Route>
      </Routes>
      <Footer />

  </div>
  );
};

export default App;
