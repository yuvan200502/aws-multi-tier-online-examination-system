import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/results.css";
import "../styles/StudentResults.css";

export default function StudentResults() {

  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const email = localStorage.getItem("userEmail");

        const res = await api.get(
          `/results/student/all/${email}`   // ✅ correct API
        );

        setResults(res.data);

      } catch (err) {
        console.error("Failed to load results:", err);
      }

    };

    fetchResults();

  }, []);

  return (

  <div className="student-results-page">

    <h2 className="student-results-title">Your Results</h2>

    <div className="result-grid">

      {results.map((r, index) => {

        const percentage = Math.round((r.score / r.total) * 100);
        const passed = percentage >= 50;

        return (

          <div
            key={r._id || index}
            className="result-card"
            onClick={() =>
              navigate(`/exam/analysis/${r.examId}`, {
                state: r
              })
            }
          >

            <h3>{r.examTitle}</h3>

            <p className="result-score">
              Score: {r.score} / {r.total}
            </p>

            <span className={`result-badge ${passed ? "pass" : "fail"}`}>
              {passed ? "PASS ✅" : "FAIL ❌"}
            </span>

          </div>

        );

      })}

    </div>

  </div>

);

}