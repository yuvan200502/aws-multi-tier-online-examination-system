import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/examDetails.css";

export default function ExamDetails() {

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [exam, setExam] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  /* ================= FETCH IF STATE MISSING ================= */
  useEffect(() => {

    if (!exam && id) {

      setLoading(true);

      api.get(`/exams/${id}`)
        .then(res => {
          console.log("FETCHED EXAM:", res.data);
          setExam(res.data);
        })
        .catch(err => {
          console.error("Exam fetch failed", err);
        })
        .finally(() => setLoading(false));
    }

  }, [exam, id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="exam-details-page">
        <p>Loading exam...</p>
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!exam) {
    return (
      <div className="exam-details-page">
        <h2>Exam not found ❌</h2>
        <button onClick={() => navigate("/courses")}>
          Back to Courses
        </button>
      </div>
    );
  }

  /* ================= SAFE EXAM ID ================= */
  const examId = exam._id || exam.id;

  /* ================= FINAL UI ================= */
  return (

    <div className="exam-details-page">

      <div className="exam-details-card">

        {/* LEFT */}
        <div className="exam-left">

          <h1>{exam.title}</h1>

          {exam.courseName && (
            <p className="course-name">{exam.courseName}</p>
          )}

          <div className="meta">

            <div>
              <span>⏱ Duration</span>
              <strong>{exam.duration ?? 0} Minutes</strong>
            </div>

            <div>
              <span>📝 Questions</span>
              <strong>{exam.questions?.length ?? 0}</strong>
            </div>

            <div>
              <span>📌 Type</span>
              <strong>Online Exam</strong>
            </div>

          </div>

          <button
            className="start-btn"
            onClick={() => setOpen(true)}
          >
            Start Exam
          </button>

        </div>

        {/* RIGHT */}
        <div className="exam-right">

          <h3 className="warning-title">⚠️ Important Instructions</h3>

          <ul className="instruction-list">

            <li>⏸️ Exam once started cannot be paused.</li>
            <li>🔄 Do not refresh or close the browser.</li>
            <li>📵 Tab switching is monitored.</li>
            <li>🚫 3 violations → auto submission.</li>
            <li>⏱️ Auto submit when time ends.</li>

          </ul>

        </div>

      </div>

      {/* ================= MODAL ================= */}
{open && (

  <div className="modal-overlay">
<div className="modal-box">

  <h2>🚀 Start Exam?</h2>

  <p className="modal-subtext">
    Once you start the exam, the timer will begin immediately and cannot be paused.
  </p>

  <label className="checkbox">

    <input
      type="checkbox"
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
    />

    <h4>
      I have read the instructions and I am ready to begin.
    </h4>

  </label>

  <div className="modal-actions">

    <button
      className="back-btn"
      onClick={() => setOpen(false)}
    >
      Cancel
    </button>

    <button
      className="primary"
      disabled={!agree}
      onClick={() => {

        if (!examId) {
          alert("Exam ID missing ❌");
          return;
        }

        document.documentElement
          .requestFullscreen()
          .catch(() => console.log("Fullscreen blocked"));

        navigate(`/exam/take/${examId}`, {
          state: exam
        });

      }}
    >
      Start Exam →
    </button>

  </div>

</div>

  </div>
)}


  </div>
)}
