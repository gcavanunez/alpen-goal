import { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Dashboard from './Dashboard';  // You'll create this component
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [userData, setUserData] = useState(null);  // Add this to store user data

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUserData = (user: any) => {
    localStorage.setItem('jwt', user.token);
    setUserData(user);
    setIsLoggedIn(true);
  };

  return (
    <>
      <h1>Alpen Goal - Reaching your Career Summit</h1>
      {isLoggedIn ?
        <Dashboard userData={userData} /> :
        showSignUp ?
          <SignUpForm switchToSignIn={() => setShowSignUp(false)} /> :
          <SignInForm switchToSignUp={() => setShowSignUp(true)} onUserData={handleUserData} />
      }
    </>
  )
}

export default App;
