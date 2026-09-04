import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/PrivateExams.css";

export default function PrivateExams(){

  const [exams,setExams] = useState([]);
  const [loading,setLoading] = useState(true);

  const [showModal,setShowModal] = useState(false);
  const [password,setPassword] = useState("");
  const [selectedExam,setSelectedExam] = useState(null);

  const navigate = useNavigate();
  const role = (localStorage.getItem("role") || "").toUpperCase();

  useEffect(()=>{

    const fetchExams = async()=>{

      try{

        const res = await api.get("/exams");

        console.log("ALL EXAMS:", res.data);

        // 🔒 PRIVATE ONLY
        const privateExams = (res.data || []).filter(
          e => e.privateExam === true
        );

        setExams(privateExams);

      }catch(err){
        console.error(err);
      }finally{
        setLoading(false);
      }

    };

    fetchExams();

  },[]);

  // 🔐 PASSWORD CHECK
  const checkPassword = async () => {

    const examId = selectedExam?._id || selectedExam?.id;

    if (!examId) {
      alert("Exam not selected ❌");
      return;
    }

    try {

      const res = await api.post(
        `/exams/validate?examId=${examId}&password=${password}`
      );

      if (!res.data) {
        alert("Wrong password ❌");
        return;
      }

      if (role === "ADMIN") {
        navigate(`/teacher/results/${examId}`);
      } else {
        navigate(`/exam/take/${examId}`, {
          state: selectedExam
        });
      }

    } catch (err) {
      console.error(err);
    }
  };

  if(loading){
    return <h2>Loading...</h2>;
  }

  return(

    <div className="private-container">

      <h2 className="private-title">Private Exams 🔒</h2>

      {exams.length === 0 && (
        <p>No private exams available</p>
      )}

      <div className="private-grid">

        {exams.map((exam)=>(
          <div key={exam._id || exam.id} className="private-card">

            <h3>{exam.title} 🔒</h3>

            <button
              className="enter-btn"
              onClick={()=>{
                setSelectedExam(exam);
                setPassword("");
                setShowModal(true);
              }}
            >
              Enter Exam
            </button>

          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {showModal && selectedExam && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h3>Enter Password 🔒</h3>

            <p>{selectedExam.title}</p>

            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter Password"
            />

            <button onClick={checkPassword}>
              Unlock
            </button>

          </div>

        </div>
      )}

    </div>
  );
}