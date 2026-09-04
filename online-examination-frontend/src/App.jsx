import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/verifyOtp";
import Courses from "./pages/Courses";
import ExamDetails from "./pages/ExamDetails";
import ExamPage from "./pages/ExamPage";
import ExamSubmitted from "./pages/ExamSubmitted";
import TeacherExams from "./pages/TeacherExam";
import StudentResults from "./pages/StudentResults";   // ✅ CORRECT
import ResultAnalysis from "./pages/ResultAnalysis";   // ✅ CORRECT
import PrivateExams from "./pages/PrivateExams";
import TeacherResults from "./pages/TeacherResult";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>

          <Route path="/" element={<Login />} />
          <Route path="/login/student" element={<SignIn />} />
          <Route path="/login/admin" element={<SignIn />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup/student" element={<SignUp />} />
          <Route path="/signup/admin" element={<SignUp />} /> 
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

        </Route>


        {/* PRIVATE ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>

            <Route path="/courses" element={<Courses />} />

            <Route path="/exam/details/:id" element={<ExamDetails />} />

            <Route path="/exam/take/:id" element={<ExamPage />} />

            <Route path="/exam/submitted/:examId" element={<ExamSubmitted />} />

            {/* ✅ STUDENT */}
            <Route path="/results" element={<StudentResults />} />
            <Route path="/teacher/analysis/:examId/:email" element={<ResultAnalysis />} />

            {/* ✅ TEACHER */}
            <Route path="/teacher/results/:id" element={<TeacherResults />} />

            <Route path="/teacher/exams" element={<TeacherExams />} />
            <Route path="/private-exams" element={<PrivateExams />} />

            {/* ✅ ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminPanel/>
                </ProtectedRoute>
              }
            />

          </Route>
        </Route>


        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;