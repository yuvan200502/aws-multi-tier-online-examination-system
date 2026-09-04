import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/analysis.css";

export default function ResultAnalysis(){

  const { examId, email } = useParams();

  const [data,setData] = useState(null);

  useEffect(()=>{

    const fetchData = async()=>{

      try{
        const res = await api.get(
          `/results/analysis/${examId}/${email}`
        );

        setData(res.data);

      }catch(err){
        console.error(err);
      }

    };

    fetchData();

  },[examId,email]);

  if(!data) return <h2>Loading...</h2>;

  const { result, questions } = data;

  // 🔥 FIX: convert JSON string → object
  let answers = {};

  try {
    answers = result?.answersString
      ? JSON.parse(result.answersString)
      : {};
  } catch (e) {
    console.error("❌ Failed to parse answersString");
  }

  return(

    <div className="analysis-container">

      <h2>📊 Student Exam Analysis</h2>

      {questions.map((q,index)=>{

        const studentAnswer = answers?.[q.id]; // ✅ FIXED
        const correctAnswer = q.correct;

        return(

          <div key={q.id} className="analysis-card">

            <h3>{index+1}. {q.question}</h3>

            {["A","B","C","D"].map(opt=>{

              const optionText = q[`option${opt}`];

              let className = "option";

              // 🟢 correct
              if(opt === correctAnswer){
                className += " correct";
              }

              // 🔴 wrong selected
              if(opt === studentAnswer && opt !== correctAnswer){
                className += " wrong";
              }

              // 🔵 selected correct
              if(opt === studentAnswer && opt === correctAnswer){
                className += " selected-correct";
              }

              return(
                <div key={opt} className={className}>
                  {opt}. {optionText}
                </div>
              );

            })}

            {/* 🔥 EXTRA INFO */}
            <p className="answer-info">
              Your Answer: <strong>{studentAnswer || "Not Answered"}</strong>
            </p>

            <p className="answer-info">
              Correct Answer: <strong>{correctAnswer}</strong>
            </p>

          </div>

        );

      })}

    </div>
  );
}