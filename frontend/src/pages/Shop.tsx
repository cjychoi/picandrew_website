import "./Shop.css";
import shopTemp from "../assets/shop_temp.png";

const Shop = () => {
  return (
    <main className="shopMain">
      <img src={shopTemp} alt="Shop preview" className="shopImage" />
      <p className="shopText">Coming soon!</p>
    </main>
  );
};

export default Shop;