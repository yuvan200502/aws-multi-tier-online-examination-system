import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px" }}>
      <h2>About Online Examination System</h2>

      <p>
        This platform allows students to take secure online exams
        with automatic evaluation and real-time monitoring.
      </p>

      <p>
        Teachers can create exams, manage questions, and review
        results efficiently through the admin panel.
      </p>

      <h3>Features</h3>
      <ul>
        <li>Timed online exams</li>
        <li>Automatic result calculation</li>
        <li>Anti-cheating monitoring</li>
        <li>Question navigation palette</li>
      </ul>

      <button onClick={() => navigate("/courses")}>
        Back to Courses
      </button>
    </div>
  );
}