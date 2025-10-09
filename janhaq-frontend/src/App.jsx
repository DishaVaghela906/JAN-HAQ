
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout'; // Import our new layout
import ProtectedRoute from './components/ProtectedRoute';

// Import all page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Laws from './pages/Laws';
import Schemes from './pages/Schemes';
import ProblemSolver from './pages/ProblemSolver';
import About from './pages/About';
import Contact from './pages/Contact';
// ... import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: Pages that use the MainLayout (Navbar + Footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="laws" element={<Laws />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="problem-solver" element={<ProblemSolver />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* Add other pages that need the layout here */}
        </Route>
        
        {/* Route 2: Standalone pages (no Navbar/Footer from layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route 3: Protected pages that also use the MainLayout */}
        <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                {/* Add other protected pages here */}
            </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
