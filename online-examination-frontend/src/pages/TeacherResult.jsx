import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/results.css";

export default function TeacherResults() {

  const { id: examId } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!examId || examId === "undefined") {
      console.error("❌ Invalid examId:", examId);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {

        console.log("📌 FETCHING RESULTS FOR:", examId);

        // 🔥 DIRECTLY FETCH RESULTS (no need to fetch exam again)
        const res = await api.get(`/results/exam/${examId}`);

        console.log("✅ RESULTS:", res.data);

        setResults(Array.isArray(res.data) ? res.data : []);

      } catch (err) {
        console.error("❌ ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

  }, [examId]);

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="results-container">
        <h2>Loading results...</h2>
      </div>
    );
  }

  // ❌ NO DATA
  if (!results.length) {
    return (
      <div className="results-container">
        <h2>No results found</h2>
      </div>
    );
  }

  return (

    <div className="results-container">

      <h2>🏆 Exam Leaderboard</h2>

      <table className="results-table">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Email</th>
            <th>Score</th>
            <th>Warnings</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>

          {results.map((r, index) => {

            // 🔥 SAFE EMAIL
            const email = r.studentEmail || "N/A";
            console.log("URL PARAM ID:", examId);


            const percentage =
              r.total ? Math.round((r.score / r.total) * 100) : 0;

            return (

              <tr
                key={r.id || index}
                className={r.malpractice ? "malpractice-row" : ""}
                onClick={() => {
                  if (!email || email === "N/A") return;

                  navigate(`/teacher/analysis/${examId}/${email}`, {
                    state: r
                  });
                }}
              >

                <td>{index + 1}</td>

                <td>{r.studentName || "N/A"}</td>

                <td>{email}</td>

                <td>
                  {r.score}/{r.total}
                  <span className="percentage"> ({percentage}%)</span>
                </td>

                <td>{r.warnings ?? 0}</td>

                <td>
                  {r.malpractice ? (
                    <span className="status-bad">🚫 Malpractice</span>
                  ) : (
                    <span className="status-good">✅ Clean</span>
                  )}
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (!email || email === "N/A") return;

                      navigate(`/teacher/analysis/${examId}/${email}`, {
                        state: r
                      });
                    }}
                  >
                    View
                  </button>
                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}