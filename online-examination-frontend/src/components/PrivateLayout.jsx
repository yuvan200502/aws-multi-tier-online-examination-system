import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

export default function PrivateLayout() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className="app-layout">

      <header className="header">
        <span className="menu-icon" onClick={toggleMenu}>
          ☰
        </span>

        <h3>Online Examination System</h3>
      </header>

      {/* Pass setOpen so sidebar can close itself */}
      <Sidebar open={open} setOpen={setOpen} />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}