import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import api from "../api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {

  const navigate = useNavigate(); 
  const location = useLocation();
  const { login } = useAuth();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const [showPassword,setShowPassword] = useState(false);

  const role = location.pathname.includes("admin") ? "admin" : "student";

const handleLogin = async () => {

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    setError("Please enter email and password");
    return;
  }

  try {

    const res = await api.post("/auth/login", {
      email: trimmedEmail,
      password: trimmedPassword
    });

    console.log("LOGIN RESPONSE:", res.data);

    const token = res.data.token;
    const role = res.data.role;

    // store authentication data
    localStorage.setItem("token", token);
    localStorage.setItem("role", res.data.role.toUpperCase());
    localStorage.setItem("userEmail", trimmedEmail);
    localStorage.setItem("userName", trimmedEmail.split("@")[0]);

    login(role);

    // redirect based on role
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/courses");
    }

  } catch (err) {
    console.error(err);
    setError("Invalid email or password");
  }
};

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>{role === "admin" ? "Teacher Sign In" : "Student Sign In"}</h2>

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
            if(error) setError("");
          }}
        />

        {/* PASSWORD FIELD */}

        <div className="password-field">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value);
              if(error) setError("");
            }}
          />

          <span
            className="eye-icon"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>
          Sign In
        </button>

        <p className="switch">
          Don’t have an account?{" "}
          <span
  onClick={() =>
    navigate(role === "admin" ? "/signup/admin" : "/signup/student")
  }
>
  Sign Up
</span>     
        </p>

      </div>

    </div>
  );
}