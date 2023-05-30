import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between py-4 px-2">
      <div className="text-xl font-bold">PLUGO ASSIGNMENT</div>
      <div className="flex justify-evenly w-1/2 text-center">
        <Link to={"/"} className="hover:font-bold hover:bg-gray-50 min-w-fit w-20">Home</Link>
        <Link to={"/item"} className="hover:font-bold hover:bg-gray-50 min-w-fit w-20">Product</Link>
        <Link to={"/cart"} className="hover:font-bold hover:bg-gray-50 min-w-fit w-20">Cart</Link>
        <Link to={"/admin"} className="hover:font-bold hover:bg-gray-50 min-w-fit w-20">Admin</Link>
      </div>
    </header>
  );
};

export default Header;
