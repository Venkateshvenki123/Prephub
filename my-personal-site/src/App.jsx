import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Home from "./Pages/Home";
import InterviewPrep from "./Pages/InterviewPrep";
import Internship from "./Pages/Internship";
import Notes from "./Pages/Notes";
import About from "./Pages/About";
import Jobs from "./Pages/Jobs";
import FreeCourses from "./pages/FreeCourses";
import AdminCourses from "./pages/AdminCourses";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/internships" element={<Internship />} />
          <Route path="/free-courses" element={<FreeCourses />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <Chatbot />
    </div>
  );
}

export default App;