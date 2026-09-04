import "../styles/Features.css";

export default function Features() {
  return (
    <div className="features-page">

      <div className="features-hero">
        <h1>Powerful Features</h1>
        <p>
          Everything you need to conduct secure, efficient and
          professional online examinations.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">
          <h2>🔐 Secure Login</h2>
          <p>
            JWT authentication and OTP verification ensure secure access.
          </p>
        </div>

        <div className="feature-card">
          <h2>📝 Exam Creation</h2>
          <p>
            Teachers can create and manage examinations easily.
          </p>
        </div>

        <div className="feature-card">
          <h2>⏱ Timed Exams</h2>
          <p>
            Automatic countdown timer for controlled examinations.
          </p>
        </div>

        <div className="feature-card">
          <h2>🔒 Private Exams</h2>
          <p>
            Password-protected examinations for restricted access.
          </p>
        </div>

        <div className="feature-card">
          <h2>🤖 Auto Evaluation</h2>
          <p>
            Instant score calculation and automatic result generation.
          </p>
        </div>

        <div className="feature-card">
          <h2>📊 Result Analytics</h2>
          <p>
            Detailed performance reports and score analysis.
          </p>
        </div>

        <div className="feature-card">
          <h2>🚫 Anti-Cheat Protection</h2>
          <p>
            Tab switching and focus loss detection during exams.
          </p>
        </div>

        <div className="feature-card">
          <h2>🌐 Anywhere Access</h2>
          <p>
            Access exams from any device with internet connectivity.
          </p>
        </div>

      </div>

    </div>
  );
}