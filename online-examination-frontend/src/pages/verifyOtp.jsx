import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function VerifyOtp(){

  const [otp,setOtp] = useState("");
  const [timeLeft,setTimeLeft] = useState(300); // 5 minutes
  const [error,setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

 const form = location.state;

useEffect(() => {

  if (!form) {
  alert("Signup session expired.");

  navigate("/login/student"); // illa landing page "/"
}

},[form,navigate]);

  // Countdown timer
  useEffect(()=>{

    if(timeLeft <= 0) return;

    const timer = setInterval(()=>{
      setTimeLeft((prev)=>prev - 1);
    },1000);

    return ()=>clearInterval(timer);

  },[timeLeft]);

  const formatTime = () => {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const verify = async ()=>{
    console.log(form);

    if(!otp){
      setError("Please enter OTP");
      return;
    }

    try{

      await api.post("/auth/verify-otp",{
        email: form.email,
        otp
      });

      await api.post("/auth/register",{
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  password: form.password,
  role: form.role
      });

      alert("Account created successfully");

      if (form.role === "ADMIN") {
  navigate("/login/admin");
} else {
  navigate("/login/student");
}

    }catch(err){

      console.error(err);
      setError("Invalid OTP");
    }
  };

  const resendOtp = async () => {

    try{

      await api.post("/auth/send-otp",{
        email: form.email
      });

      setTimeLeft(300);

      alert("OTP resent");

    }catch(err){
      alert("Failed to resend OTP");
    }
  };

  return(

    <div className="auth-container">

      <div className="auth-card otp-card">

        <h2>Email Verification</h2>

        <p className="otp-info">
          Enter the OTP sent to <b>{form.email}</b>
        </p>

        <input
          className="otp-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value.replace(/\D/g,""))}
          maxLength={6}
        />

        <p className="timer">
          OTP expires in <span>{formatTime()}</span>
        </p>

        {error && <p className="error">{error}</p>}

        <button className="verify-btn" onClick={verify}>
          Verify OTP
        </button>

        {timeLeft === 0 && (
          <p className="resend">
            OTP expired? 
            <span onClick={resendOtp}> Resend OTP</span>
          </p>
        )}

      </div>

    </div>
  )
}