import "../styles/HowItWorks.css";
export default function HowItWorks() {
  return (
    <div className="how-page">

      <div className="hero-section">
        <h1>How Our Online Examination System Works</h1>
        <p>
          A complete digital examination platform designed to simplify
          assessment, improve efficiency, and deliver secure testing
          experiences for both students and educators.
        </p>
      </div>

      <div className="timeline">

        <div className="step-card">
          <h2>1️⃣ User Registration</h2>
          <p>
            Students and teachers can create accounts using their
            email addresses. OTP verification ensures authenticity
            and prevents unauthorized registrations.
          </p>
        </div>

        <div className="step-card">
          <h2>2️⃣ Secure Authentication</h2>
          <p>
            JWT-based authentication protects user accounts and
            ensures secure access to examination resources.
          </p>
        </div>

        <div className="step-card">
          <h2>3️⃣ Exam Creation</h2>
          <p>
            Teachers can create examinations, add questions,
            define time limits, assign marks, and configure
            public or private access settings.
          </p>
        </div>

        <div className="step-card">
          <h2>4️⃣ Question Management</h2>
          <p>
            Multiple-choice questions can be organized efficiently.
            Administrators can update, edit, and manage question banks
            anytime.
          </p>
        </div>

        <div className="step-card">
          <h2>5️⃣ Exam Participation</h2>
          <p>
            Students can browse available examinations, enter private
            exam passwords if required, and begin tests through a
            user-friendly interface.
          </p>
        </div>

        <div className="step-card">
          <h2>6️⃣ Real-Time Assessment</h2>
          <p>
            The system records answers instantly and supports timed
            examinations for a professional testing environment.
          </p>
        </div>

        <div className="step-card">
          <h2>7️⃣ Automatic Evaluation</h2>
          <p>
            Submitted answers are automatically evaluated, reducing
            manual effort and improving accuracy.
          </p>
        </div>

        <div className="step-card">
          <h2>8️⃣ Instant Results</h2>
          <p>
            Students receive immediate score reports while teachers
            can monitor performance and analyze results efficiently.
          </p>
        </div>

      </div>

      <div className="benefits-section">

        <h2>Why Choose Our Platform?</h2>

        <div className="benefit-grid">

          <div className="benefit-card">
            🔒 Secure Authentication
          </div>

          <div className="benefit-card">
            ⚡ Fast Performance
          </div>

          <div className="benefit-card">
            📊 Instant Results
          </div>

          <div className="benefit-card">
            📚 Easy Exam Management
          </div>

          <div className="benefit-card">
            🌐 Accessible Anywhere
          </div>

          <div className="benefit-card">
            🎯 User Friendly Interface
          </div>

        </div>

      </div>

    </div>
  );
}