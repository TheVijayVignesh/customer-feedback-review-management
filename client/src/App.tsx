import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
//import StudentDashboard from './components/student-review/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<LoginPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;