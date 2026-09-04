import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/courses.css";

export default function Courses() {

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = (localStorage.getItem("role") || "").toUpperCase();

  useEffect(() => {

    const fetchExams = async () => {
      try {
        const res = await api.get("/exams");

        const examList = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        console.log("ALL EXAMS:", examList);

        // 🔥 show only public exams
        const publicExams = examList.filter(
          e => e.privateExam !== true
        );

        setExams(publicExams);

      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();

  }, []);

  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="courses-page">
        <p>Loading exams...</p>
      </div>
    );
  }

  return (
  <div className="courses-page">

    <div className="courses-container">

      {/* HEADER */}
      <div className="courses-header">
        <h2>📚 Available Exams</h2>
        <p>Select an exam to view details</p>
      </div>

      {/* NO DATA */}
      {exams.length === 0 && (
        <div className="no-exams">
          <p>No public exams available</p>
        </div>
      )}

      {/* GRID */}
      <div className="exam-grid">

        {exams.map((exam) => {
          const examId = exam.id;

          return (
            <div className="exam-card" key={examId}>

              {/* TITLE */}
              <div className="exam-card-top">
                <h3>{exam.title}</h3>
              </div>

              {/* INFO */}
              <div className="exam-info">
                <div>
                  <span>⏱ Duration</span>
                  <strong>{exam.duration ?? 0} mins</strong>
                </div>

                <div>
                  <span>📝 Questions</span>
                  <strong>{exam.questions?.length ?? 0}</strong>
                </div>

                <div>
                  <span>📅 Date</span>
                  <strong>{exam.examDate || "N/A"}</strong>
                </div>
              </div>

              {/* BUTTON */}
              <button
                className="view-btn"
                
                onClick={() => {
                  console.log("Clicked");
                  console.log("examId:", examId);
                  console.log("exam:", exam);
                  console.log("role:", role);
                  if (!examId) return alert("❌ Exam ID missing");

                  if (exam.examDate && exam.startTime && exam.endTime) {
                    const now = new Date();
                    const examStart = new Date(`${exam.examDate}T${exam.startTime}`);
                    const examEnd = new Date(`${exam.examDate}T${exam.endTime}`);

                    if (now < examStart) return alert("⏳ Exam not started yet");
                    if (now > examEnd) return alert("❌ Exam already ended");
                  }

                  if (role === "ADMIN") {
                    navigate(`/teacher/results/${examId}`);
                  } else {
                    navigate(`/exam/details/${examId}`, { state: exam });
                  }
                }}
              >
                View Details →
              </button>

            </div>
          );
        })}

      </div>

    </div>

  </div>
);
}