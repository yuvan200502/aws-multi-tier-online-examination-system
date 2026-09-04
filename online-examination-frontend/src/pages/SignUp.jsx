import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import api from "../api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {


  const navigate = useNavigate();

  const location = useLocation();

const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: location.pathname.includes("/admin")
    ? "ADMIN"
    : "STUDENT"
});

  const [error, setError] = useState("");

  // 👁 password visibility states
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const isStrongPassword = (pwd) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  const handleSubmit = async () => {
    console.log(form);

    if(!form.email){
      setError("Email is required");
      return;
    }

    if(form.password !== form.confirmPassword){
      setError("Passwords do not match");
      return;
    }

    if(!isStrongPassword(form.password)){
      setError("Password must contain uppercase, lowercase, number and special character");
      return;
    }

    try{

      await api.post("/auth/send-otp",{
        email: form.email
      });

      navigate("/verify-otp",{ state: form });

    }catch(err){

      console.error("OTP error:", err);

  console.log("Status:", err.response?.status);
  console.log("Response:", err.response?.data);
  console.log(err.response);


  if (err.response?.data) {

    if (typeof err.response.data === "string") {
      setError(err.response.data);
    } else {
      setError(
        err.response.data.message || "Failed to send OTP"
      );
    }

  } else {
    setError("Failed to send OTP");
  }

    }
  };

  const updateField = (field,value) => {

    setForm({
      ...form,
      [field]: value
    });

    if(error){
      setError("");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e)=>updateField("firstName",e.target.value)}
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e)=>updateField("lastName",e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>updateField("email",e.target.value)}
        />

        {/* PASSWORD FIELD */}

        <div className="password-field">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e)=>updateField("password",e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        {/* CONFIRM PASSWORD */}

        <div className="password-field">

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e)=>updateField("confirmPassword",e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        {error && <p className="error">{error}</p>}

        <button onClick={handleSubmit}>
          Continue
        </button>

      </div>

    </div>
  );
}