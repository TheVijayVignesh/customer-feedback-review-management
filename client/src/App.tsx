import  { type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/auth/LoginPage';
import AdminDashboard from './components/admin-dashboard/AdminDashboard';
import TraineeDashboard from './components/trainee-dashboard/TraineeDashboard';
import StudentDashboard from './components/student-review/StudentDashboard';
import FeedbackForm from './components/student-review/FeedbackForm';
import SentimentDashboard from "./pages/SentimentDashboard";
import ResponsePage from './components/response/ResponsePage';
import NotFound from './components/NotFound';

const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: string }) => {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('userRole');

  if (!token || userRole !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard/>
          </ProtectedRoute>
        } />

        <Route path="/trainee-dashboard" element={
          <ProtectedRoute allowedRole="TRAINEE">
            <TraineeDashboard />
          </ProtectedRoute>
        } />

        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRole="TRAINEE"><StudentDashboard /></ProtectedRoute>
        } />
        
        <Route path="/trainee-dashboard/feedback/:courseId" element={
          <ProtectedRoute allowedRole="TRAINEE"><FeedbackForm /></ProtectedRoute>
        } />
          
        <Route path="/admin-dashboard/sentiment-dashboard" element={
          <ProtectedRoute allowedRole="ADMIN"><SentimentDashboard /></ProtectedRoute>
        } />

        {/* Keeping response page route accessible like before, or protect it accordingly */}
        <Route path="/response" element={<ResponsePage />} />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
