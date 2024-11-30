import "./ViewProducts.css";
import VerifyButton from "../components/VerifyButton";
import AuctionApp from "./ViewProducts-card";

export const ViewProducts = () => {
  return (
    <div className="app">
      <AuctionApp />
      <VerifyButton />
    </div>
  );
};
