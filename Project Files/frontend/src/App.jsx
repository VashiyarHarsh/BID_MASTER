import {Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import AddProducts from "./pages/AddProducts";
import {ViewProducts} from "./pages/ViewProducts";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "./App.css"
import UserProfile from "./pages/UserProfile"
import SignupAndLogin from "./pages/SignupAndLogin"
import LiveAuctionPage from './pages/LiveAuctionPage';
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignInCustom"
import SignOut from "./pages/SignOut"
import Custom from "./pages/Custom"

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
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignOut" element={<SignOut/>}/>
        <Route element={<ProtectedRoute/>}>
         <Route path="/AddProducts" element={<AddProducts />} />
         <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/BidLive" element={<LiveAuctionPage productImage="https://via.placeholder.com/300" initialPrice={4000} />} />
        </Route>
      </Routes>
      <Footer />

  </div>
  );
};

export default App;
