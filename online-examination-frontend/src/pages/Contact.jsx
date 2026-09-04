import "../styles/Contact.css";
import { useState } from "react";
import api from "../api/api";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {

  e.preventDefault();
  // Empty field validation
if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
  alert("⚠️ Please fill all the fields.");
  return;
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(form.email)) {
  alert("⚠️ Please enter a valid email address.");
  return;
}

// Message length validation
if (form.message.trim().length < 10) {
  alert("⚠️ Message should contain at least 10 characters.");
  return;
}

  setLoading(true);

  try {

    await api.post("/contact", form);

    alert("✅ Thank you! Your message has been sent successfully.");

    setForm({
      name: "",
      email: "",
      message: ""
    });

  } catch (err) {

    alert("❌ Failed to send message.");

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="contact-page">

      <div className="contact-container">

        <div className="contact-left">

          <h1>Contact Us</h1>

          <p>
            Have questions, feedback, or need assistance?
            Send us a message and we'll get back to you soon.
          </p>

          <form
  className="contact-form"
  onSubmit={handleSubmit}
>

            <input
  type="text"
  required
  placeholder="Name"
  value={form.name}
  onChange={(e) =>
    setForm({
      ...form,
      name: e.target.value
    })
  }
/>

            <input
  type="email"
  required
  placeholder="Email"
  value={form.email}
  onChange={(e) =>
    setForm({
      ...form,
      email: e.target.value
    })
  }
/>

            <textarea
  required
  placeholder="Message"
  value={form.message}
  onChange={(e) =>
    setForm({
      ...form,
      message: e.target.value
    })
  }
/>

            <button
  type="submit"
  disabled={loading}
>
  {loading ? "Sending..." : "Send Message"}
</button>

          </form>

        </div>

        <div className="contact-right">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Contact Illustration"
          />

        </div>

      </div>

    </div>
  );
}