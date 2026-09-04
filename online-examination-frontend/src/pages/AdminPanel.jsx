import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/api";
import { v4 as uuid } from "uuid";
import "../styles/admin.css";

export default function AdminPanel() {

  const role = (localStorage.getItem("role") || "").toUpperCase();
  const navigate = useNavigate();

  if (role !== "ADMIN") {
    return <Navigate to="/courses" replace />;
  }

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([]);

  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ➕ Add question
  const addQuestion = () => {
    const newQuestion = {
      id: uuid(),
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correct: ""
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  // ✏️ Update question
  const updateQuestion = (index, field, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 🚀 Publish exam
  const publishExam = async () => {

    if (!title.trim()) {
      alert("Please enter exam title");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    if (isPrivate && !password.trim()) {
      alert("Enter password for private exam");
      return;
    }

    try {

      const payload = {
        title,
        duration: Number(duration),
        questions,
        privateExam: isPrivate,   // 🔥 THIS LINE IMPORTANT
        password: isPrivate ? password : null,
        examDate,
        startTime,
        endTime
        
      };

      console.log("PAYLOAD:", payload);

      await api.post("/exams/create", payload);

      alert("Exam Published Successfully ✅");

      // reset
      setTitle("");
      setDuration(30);
      setQuestions([]);
      setIsPrivate(false);
      setPassword("");

    } catch (error) {
      console.error("Publish error:", error);
      alert("Failed to publish exam");
    }
  };

  return (

    <div className="admin-container">

      <h2 className="admin-title">
        🛠 Admin Panel – Create Exam
      </h2>

      <div className="form-row">

        <input
          className="input"
          placeholder="Exam Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
        />
        <input
          type="date"
          value={examDate}
          onChange={(e)=>setExamDate(e.target.value)}
        />

        <input
          type="time"
          value={startTime}
          onChange={(e)=>setStartTime(e.target.value)}
        />

        <input
          type="time"
          value={endTime}
          onChange={(e)=>setEndTime(e.target.value)}
        />

      </div>

      {/* 🔒 PRIVATE OPTION */}
      <div style={{marginTop:"10px"}}>

        <div className="toggle-row">

          <span>Public</span>

          <div
            className={`toggle-switch ${isPrivate ? "active" : ""}`}
            onClick={() => setIsPrivate(!isPrivate)}
          >
            <div className="toggle-circle"></div>
          </div>

          <span>Private 🔒</span>

        </div>

        {isPrivate && (
          <input
            className="input"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{marginTop:"10px"}}
          />
        )}

      </div>

      <button
        className="btn btn-add"
        onClick={addQuestion}
      >
        ➕ Add Question
      </button>
      <button
        className="btn btn-private"
        onClick={() => setIsPrivate(true)}
      >
        🔒 Create Private Exam
      </button>

      {questions.map((q,i)=>(

        <div key={q.id} className="card">

          <div className="card-title">
            Question {i+1}
          </div>

          <input className="input" placeholder="Question"
            value={q.question}
            onChange={(e)=>updateQuestion(i,"question",e.target.value)}
          />

          <input className="input" placeholder="Option A"
            value={q.optionA}
            onChange={(e)=>updateQuestion(i,"optionA",e.target.value)}
          />

          <input className="input" placeholder="Option B"
            value={q.optionB}
            onChange={(e)=>updateQuestion(i,"optionB",e.target.value)}
          />

          <input className="input" placeholder="Option C"
            value={q.optionC}
            onChange={(e)=>updateQuestion(i,"optionC",e.target.value)}
          />

          <input className="input" placeholder="Option D"
            value={q.optionD}
            onChange={(e)=>updateQuestion(i,"optionD",e.target.value)}
          />

          <select className="select"
            value={q.correct}
            onChange={(e)=>updateQuestion(i,"correct",e.target.value)}
          >
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

        </div>
      ))}

      {questions.length > 0 && (
        <button
          className="btn btn-publish"
          onClick={publishExam}
        >
          🚀 Publish Exam
        </button>
      )}

    </div>
  );
}