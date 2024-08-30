import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Components/AdminPage';
import TeacherPage from './Components/TeacherPage';
import StudentPage from './Components/StudentPage';
import SignInPage from './Components/SignInPage';
import TeacherDashboard from './Components/TeacherDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard/:registerNumber" element={<TeacherDashboard />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/student" element={<StudentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
