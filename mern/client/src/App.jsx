import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  );
}