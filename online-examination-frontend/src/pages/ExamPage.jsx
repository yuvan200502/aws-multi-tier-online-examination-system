import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/exam.css";

export default function ExamPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const role = (localStorage.getItem("role") || "").toUpperCase();
  const userEmail = localStorage.getItem("userEmail");

  const [examData, setExamData] = useState(location.state || null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [warnings, setWarnings] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submitLock = useRef(false);
  const warningLock = useRef(false);

  const exam = examData;
  const examId = exam?._id || exam?.id;

  /* ================= FORMAT TIME (FIXED POSITION) ================= */
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!examData && id) {
      api.get(`/exams/${id}`)
        .then(res => setExamData(res.data))
        .catch(console.error);
    }
  }, [id, examData]);

  /* ================= BLOCK ADMIN ================= */
  useEffect(() => {
    if (role === "ADMIN") {
      alert("Teachers cannot attend exam ❌");
      navigate("/teacher/exams");
    }
  }, []);

  if (!exam) return <h2>Loading exam...</h2>;

  /* ================= RANDOM ================= */
  useEffect(() => {
    if (!exam.questions) return;

    const shuffled = [...exam.questions]
      .sort(() => Math.random() - 0.5)
      .map(q => ({
        ...q,
        questionId: q.id || q._id,
        options: [
          { key: "A", value: q.optionA },
          { key: "B", value: q.optionB },
          { key: "C", value: q.optionC },
          { key: "D", value: q.optionD }
        ].sort(() => Math.random() - 0.5)
      }));

    setQuestions(shuffled);
    setTimeLeft(exam.duration * 60);

  }, [exam]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          submitExam(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  /* ================= WARNING ================= */
  const triggerWarning = (msg) => {

    if (warningLock.current) return;

    warningLock.current = true;

    setWarnings(prev => {

      const newCount = prev + 1;

      alert(`${msg} (${newCount}/3)`);

      if (newCount >= 3) {
        alert("Auto submitting exam ❌");
        submitExam(true);
      }

      return newCount;
    });

    setTimeout(() => {
      warningLock.current = false;
    }, 2000);
  };

  /* ================= SECURITY ================= */

  useEffect(() => {
    const blur = () => triggerWarning("Tab switched ⚠️");
    window.addEventListener("blur", blur);
    return () => window.removeEventListener("blur", blur);
  }, []);

  useEffect(() => {
    const block = e => e.preventDefault();
    document.addEventListener("copy", block);
    document.addEventListener("paste", block);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
    };
  }, []);

  useEffect(() => {
    const disable = e => e.preventDefault();
    document.addEventListener("contextmenu", disable);
    return () => document.removeEventListener("contextmenu", disable);
  }, []);

  useEffect(() => {
    const check = () => {
      if (!document.fullscreenElement) {
        triggerWarning("Exited fullscreen ❌");
      }
    };
    document.addEventListener("fullscreenchange", check);
    return () => document.removeEventListener("fullscreenchange", check);
  }, []);

  useEffect(() => {
    const detect = e => {
      if (e.key === "PrintScreen") {
        triggerWarning("Screenshot detected 📸");
      }
    };
    window.addEventListener("keydown", detect);
    return () => window.removeEventListener("keydown", detect);
  }, []);

  /* ================= SUBMIT ================= */
  const submitExam = async (auto = false) => {

  if (!exam) return;

  const examId = exam?._id || exam?.id;

  if (!examId) {
    alert("Exam ID missing ❌");
    return;
  }

  // 🔥 STEP 1: CREATE cleanedAnswers FIRST
  const cleanedAnswers = {};

  Object.keys(answers).forEach(key => {
    cleanedAnswers[key] = String(answers[key]);
  });

  console.log("CLEANED ANSWERS:", cleanedAnswers);

  // 🔥 STEP 2: THEN CREATE PAYLOAD
  const payload = {
    examId,
    studentName: localStorage.getItem("userName"),
    studentEmail: localStorage.getItem("userEmail"),
    answers: cleanedAnswers,
    warnings,
    autoSubmitted: auto
  };

  console.log("FINAL PAYLOAD:", payload);

  try {
    await api.post("/results/submit", payload);
    navigate(`/exam/submitted/${examId}`);
  } catch (err) {

  console.error("FULL ERROR:", err);

  let msg = "Submission failed ❌";

  if (err.response?.data) {
    if (typeof err.response.data === "string") {
      msg = err.response.data;
    } else if (err.response.data.message) {
      msg = err.response.data.message;
    } else {
      msg = JSON.stringify(err.response.data);
    }
  }

  alert(msg);
}
};
  const q = questions[current];

  if (!q) return <h2>Loading questions...</h2>;

  return (

  <div className="exam-container">

    {/* WATERMARK */}
    <div className="watermark">
      {userEmail}
    </div>

    {/* HEADER */}
    <div className="exam-header">

      <h2>{exam.title}</h2>

      <div className={timeLeft <= 300 ? "timer danger" : "timer"}>
        ⏳ {formatTime()}
      </div>

    </div>

    {/* WARNINGS */}
    <p>
      Warnings: {warnings}/3
    </p>

    {/* MAIN BODY */}
    <div className="exam-body">

      {/* QUESTION CARD */}
      <div className="question-card">

        <h3>
          {current + 1}. {q.question}
        </h3>

        {/* OPTIONS */}
        {q.options.map(opt => {

          const selected =
            answers[q.questionId] === opt.key;

          return (

            <label
              key={opt.key}
              className={
                selected
                  ? "option selected"
                  : "option"
              }
            >

              <input
                type="radio"
                checked={selected}
                onChange={() =>
                  setAnswers(prev => ({
                    ...prev,
                    [q.questionId]: String(opt.key)
                  }))
                }
              />

              <span className="option-label">
                {opt.key}.
              </span>

              {opt.value}

            </label>

          );

        })}

        {/* FOOTER */}
        <div className="exam-footer">

          {/* PREVIOUS */}
          <button
            disabled={current === 0}
            onClick={() =>
              setCurrent(c => c - 1)
            }
          >
            ← Previous
          </button>

          {/* NEXT / SUBMIT */}
          {current < questions.length - 1 ? (

            <button
              className="primary"
              onClick={() =>
                setCurrent(c => c + 1)
              }
            >
              Next →
            </button>

          ) : (

            <button
              className="submit-btn"
              onClick={() =>
                submitExam(false)
              }
            >
              Submit Exam
            </button>

          )}

        </div>

      </div>

      {/* QUESTION PALETTE */}
      <div className="palette">

        <h4>Questions</h4>

        <div className="palette-grid">

          {questions.map((question, index) => {

            const answered =
              answers[question.questionId];

            return (

              <button
                key={index}
                className={`
                  palette-btn
                  ${answered ? "answered" : ""}
                  ${current === index ? "active" : ""}
                `}
                onClick={() =>
                  setCurrent(index)
                }
              >
                {index + 1}
              </button>

            );

          })}

        </div>

      </div>

    </div>

  </div>

);
}