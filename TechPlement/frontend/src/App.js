import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegistrationForm';
import QuizTaker from './pages/QuizTaker';
import TakeQuiz from './components/Quiz/TakeQuiz';
import QuizCreator from './pages/QuizCreator';
import Quizzes from './components/Quiz/CreateQuiz';
import QuizResults from './components/Quiz/QuizResults';
import AttemptTest from './components/Quiz/AttemptTest';
import Profile from './pages/Profile';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedRole = localStorage.getItem('role');
    
    if (storedIsLoggedIn && storedRole) {
      setIsLoggedIn(storedIsLoggedIn);
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Clear token on logout
  };

  const handleLogin = (loggedInRole) => {
    setIsLoggedIn(true);
    setRole(loggedInRole);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('role', loggedInRole);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} role={role} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login">
          <LoginPage setIsLoggedIn={handleLogin} />
        </Route>
        <Route path="/register" component={RegisterPage} />
        {isLoggedIn && role === 'taker' && (
          <>
            <Route path="/quiztaker" component={QuizTaker} />
            <Route path="/take-quiz/:quizId" component={TakeQuiz} />
            {/* <Route path="/user-results" component={UserResults} /> */}
            <Route path="/profile" component={Profile} />
            <Route path="/quiz-history" component={QuizResults} />

          </>
        )}
        {isLoggedIn && role === 'creator' && (
          <>
            <Route path="/quizcreator" component={QuizCreator} />
            <Route path="/create-quiz" component={Quizzes} />
            <Route path="/profile" component={Profile} />
            <Route path="/attempt-test" component={AttemptTest} />

          </>
        )}
        <Redirect to={isLoggedIn ? (role === 'creator' ? '/quizcreator' : '/quiztaker') : '/login'} />
      </Switch>
    </Router>
  );
};

export default App;
