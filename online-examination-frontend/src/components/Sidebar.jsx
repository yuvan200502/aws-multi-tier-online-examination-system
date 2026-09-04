import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ open }) {

  const navigate = useNavigate();
  const role = (localStorage.getItem("role") || "").toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>

      <ul>

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>

        {/* ✅ STUDENT RESULTS */}
        {role !== "ADMIN" && (
          <li>
            <NavLink to="/results">Results</NavLink>
          </li>
        )}
        {role === "ADMIN" && (
          <li>
            <NavLink to="/teacher/exams">Results</NavLink>
          </li>
        )}

        {/* ✅ ADMIN PANEL */}
        {role === "ADMIN" && (
          <li>
            <NavLink to="/admin">Admin Panel</NavLink>
          </li>
        )}
        
        <li>
            <NavLink to="/private-exams">Private Exams 🔒</NavLink>
        </li>
       
        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        <li>
          <button onClick={handleLogout}>
            Sign Out
          </button>
        </li>

      </ul>

    </aside>
  );
}