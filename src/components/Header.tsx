import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border border-red-500">
      <div className="flex justify-evenly">
        <Link to={"/"}>Home</Link>
        <Link to={"#"}>product</Link>
        <Link to={"#"}>Cart</Link>
        <Link to={"#"}>Admin</Link>
      </div>
    </header>
  );
};

export default Header;
