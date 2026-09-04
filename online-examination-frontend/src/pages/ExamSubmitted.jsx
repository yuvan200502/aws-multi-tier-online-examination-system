import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/results.css";
import { useParams } from "react-router-dom";

export default function ExamSubmitted() {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);

  useEffect(()=>{

  const fetchResult = async ()=>{

    try{

      const email = localStorage.getItem("userEmail");

      const res = await api.get(`/results/student/${examId}?email=${email}`);

      setResult(res.data);

    }catch(err){

      console.error("Result fetch failed",err);
      setError(true);

    }finally{

      setLoading(false);

    }

  };

  fetchResult();

},[examId]);

  if(loading){
    return <h2>Loading result...</h2>;
  }

  if(error){
    return (
      <div className="result-wrapper">
        <h2>Result not found</h2>
        <button onClick={()=>navigate("/courses")} >
          Back to Courses
        </button>
      </div>
    );
  }

  const total = result.total ?? 0;
  const score = result.score ?? 0;

  const percentage =
    total > 0 ? Math.round((score/total)*100) : 0;

  const passed = percentage >= 50;

  return(

    <div className="result-wrapper">

      <div className="result-card">

        <div className="result-score-circle">
          {percentage}%
        </div>

        <h2>Exam Submitted Successfully 🎉</h2>

        <p className={passed ? "pass":"fail"}>
          {passed ? "PASS ✅":"FAIL ❌"}
        </p>

        <div className="result-stats">

          <div>
            <strong>{total}</strong>
            <span>Total</span>
          </div>

          <div>
            <strong>{score}</strong>
            <span>Correct</span>
          </div>

        </div>

        <button onClick={()=>navigate("/courses")}>
          Back to Courses
        </button>

      </div>

    </div>

  );

}