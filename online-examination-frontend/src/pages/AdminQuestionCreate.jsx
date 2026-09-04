import { useState } from "react";

export default function AdminQuestionCreate() {
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { q: "", options: ["", "", "", ""], correct: "" }
    ]);
  };

  const updateQuestion = (index, value) => {
    const copy = [...questions];
    copy[index].q = value;
    setQuestions(copy);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const copy = [...questions];
    copy[qIndex].options[optIndex] = value;
    setQuestions(copy);
  };

  const updateCorrect = (index, value) => {
    const copy = [...questions];
    copy[index].correct = value;
    setQuestions(copy);
  };

  const saveExam = async () => {
    if (!examTitle.trim()) {
      alert("Enter exam title");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ examTitle, questions })
      });

      if (!res.ok) {
        throw new Error("Failed to save exam");
      }

      alert("Exam created successfully");

      setExamTitle("");
      setQuestions([]);

    } catch (err) {
      console.error(err);
      alert("Error saving exam");
    }
  };

  return (
    <div className="admin-card">

      <h2>Create Exam</h2>

      <input
        placeholder="Exam Title"
        value={examTitle}
        onChange={(e) => setExamTitle(e.target.value)}
      />

      {questions.map((q, index) => (
        <div key={index} className="question-box">

          <input
            placeholder={`Question ${index + 1}`}
            value={q.q}
            onChange={(e) =>
              updateQuestion(index, e.target.value)
            }
          />

          {q.options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) =>
                updateOption(index, i, e.target.value)
              }
            />
          ))}

          <select
            value={q.correct}
            onChange={(e) =>
              updateCorrect(index, e.target.value)
            }
          >
            <option value="">Select Correct Answer</option>
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
          </select>

        </div>
      ))}

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={saveExam}>Save Exam</button>

    </div>
  );
}