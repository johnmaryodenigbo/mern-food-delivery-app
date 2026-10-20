import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-6">
      <NavLink to="/">
        <img alt="MongoDB logo" className="h-10" src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg" />
      </NavLink>

      <NavLink className="inline-flex items-center rounded-md border px-3 h-9 text-sm font-medium hover:bg-slate-100" to="/create">
        Create Employee
      </NavLink>
    </nav>
  );
}