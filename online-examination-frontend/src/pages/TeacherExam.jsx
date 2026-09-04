import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/teacherExams.css";

export default function TeacherExams(){

  const [exams,setExams] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

  const fetchExams = async () => {

    try {

      const res = await api.get("/exams");

      console.log("ALL EXAMS:", res.data);

      const publicExams = (res.data || []).filter(
        e => e.privateExam !== true
      );

      console.log("PUBLIC EXAMS:", publicExams);

      setExams(publicExams);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  fetchExams();

}, []);

  if(loading){
    return <p style={{padding:"20px"}}>Loading exams...</p>;
  }

  return(

   <div className="teacher-exams-page">

    <div className="teacher-exams-header">
      <h2>Select Exam</h2>
      <p>Click an exam to view leaderboard</p>
    </div>

    {exams.length === 0 ? (
      <div className="no-exams">
        <p>No exams available</p>
      </div>
    ) : (

      <div className="exam-grid">

        {exams.map((exam,index)=>(

          <div
            key={exam._id || exam.id || index}
            className="exam-card"
          >

            <h3>{exam.title}</h3>

            <div className="exam-meta">
              <span>⏱ {exam.duration || 0} mins</span>
              <span>📝 {exam.questions?.length || 0}</span>
            </div>

            <button
              className="view-btn"
              onClick={()=>{
                const id = exam._id || exam.id;
                if(!id){
                  console.error("❌ examId missing:", exam);
                  return;
                }
                navigate(`/teacher/results/${id}`);
              }}
            >
              View Results
            </button>

          </div>

        ))}

      </div>

    )}

   </div>
  );
}