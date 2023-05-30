import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Nomatch from "./components/Nomatch";
import ItemList from "./pages/item/ItemList";
import ItemDetail from "./pages/item/ItemDetail";
import ItemCreate from "./pages/item/ItemCreate";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ItemList />} />
          <Route path="item">
            <Route index element={<ItemList />} />
            <Route path=":id" element={<ItemDetail />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="create" element={<ItemCreate />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Nomatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
