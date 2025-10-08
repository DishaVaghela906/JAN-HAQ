import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Laws from './pages/Laws';
import Schemes from './pages/Schemes';
import ComplaintGenerator from './pages/ComplaintGenerator';
import Departments from './pages/Departments';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import About from './pages/About';
import Contact from './pages/Contact';
import ProblemSolver from './pages/ProblemSolver'; // new page import
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar visible on all pages */}
        <Navbar />

        {/* Main page content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/laws" element={<Laws />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/complaint-generator" element={<ComplaintGenerator />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/problem-solver" element={<ProblemSolver />} /> {/* new route */}
          </Routes>
        </main>

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
