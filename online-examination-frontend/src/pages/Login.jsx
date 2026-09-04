import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const goStudent = () => navigate("/login/student");
  const goTeacher = () => navigate("/login/admin");

  return (
    <div className="landing-page">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">

        <div className="logo">
          📝 <span>Online Examination System</span>
        </div>

        <ul className="nav-links">
          <li>
            <button onClick={() => navigate("/how-it-works")}>
              How it Works
            </button>
          </li>

          <li>
            <button onClick={() => navigate("/features")}>
                Features
            </button>
          </li>

          <li>
            <button onClick={() => navigate("/contact")}>
              Contact
            </button>
          </li>
        </ul>

        <div className="nav-actions">

          <button
            className="student-key"
            onClick={goStudent}
          >
            Student Login →
          </button>

          <button
            className="teacher-login"
            onClick={goTeacher}
          >
            Teacher Sign In
          </button>

        </div>

      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">

        <div className="hero-left">

          <h1>
            Simply Powerful <br />
            <span>Online Exams</span>
          </h1>

          <p>
            Create, conduct and evaluate secure online examinations
            with real-time monitoring, automatic evaluation and
            professional workflows.
          </p>

          <div className="hero-buttons">

            <button
              className="primary"
              onClick={goStudent}
            >
              Student Login
            </button>

            <button
              className="secondary"
              onClick={goTeacher}
            >
              Teacher Login
            </button>

          </div>

          <div className="hero-features">
            <span>✔ Secure</span>
            <span>✔ Timed</span>
            <span>✔ Professional</span>
          </div>

        </div>

        <div className="hero-right">

          <div className="mock-card">

            <h3>Exam Dashboard</h3>

            <p>
              Live Monitoring • Auto Evaluation
            </p>

            <div className="mock-line"></div>
            <div className="mock-line short"></div>
            <div className="mock-line"></div>

          </div>

        </div>

      </section>
      <section className="stats-section">

  <div className="stat-card">
    <h2>1000+</h2>
    <p>Students</p>
  </div>

  <div className="stat-card">
    <h2>500+</h2>
    <p>Exams Conducted</p>
  </div>

  <div className="stat-card">
    <h2>50+</h2>
    <p>Teachers</p>
  </div>

  <div className="stat-card">
    <h2>98%</h2>
    <p>Accuracy</p>
  </div>

</section>
<section className="why-section">

  <h2>Why Choose Our Platform?</h2>

  <div className="why-grid">

    <div className="why-card">
      🔒 Secure Authentication
    </div>

    <div className="why-card">
      ⚡ Auto Evaluation
    </div>

    <div className="why-card">
      📊 Instant Results
    </div>

    <div className="why-card">
      🚫 Anti-Cheat System
    </div>

    <div className="why-card">
      ⏱ Timed Examinations
    </div>

    <div className="why-card">
      🌐 Access Anywhere
    </div>

  </div>

</section>
<section className="tech-section">

  <h2>Technologies Used</h2>

  <div className="tech-grid">

    <div className="tech-card">
      <h3>Frontend</h3>
      <p>React.js, CSS</p>
    </div>

    <div className="tech-card">
      <h3>Backend</h3>
      <p>Spring Boot, Java</p>
    </div>

    <div className="tech-card">
      <h3>Database</h3>
      <p>MongoDB</p>
    </div>

    <div className="tech-card">
      <h3>Security</h3>
      <p>JWT, OTP Verification</p>
    </div>

  </div>

</section>
<footer className="footer">

  <h3>Online Examination System</h3>

  <p>
    Built with React, Spring Boot and MongoDB
  </p>

  <span>
    © 2026 All Rights Reserved
  </span>

</footer>

    </div>
  );
}