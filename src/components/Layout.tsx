import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen border border-blue-500">
      <div>
        <Header />
        <main className="py-4 px-6 border border-emerald-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
