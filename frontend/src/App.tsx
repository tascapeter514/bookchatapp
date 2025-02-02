
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { FormEvent, FC } from 'react';
import { HandleLogin } from './types.ts'
import { returnErrors } from './messages.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import AuthRequired from './components/common/authRequired.tsx'
import './App.css';

function App() {

  

    // REPEATS SIGN UP FORM LOGIC
  const handleLogin: HandleLogin = async (formData) => {
    try {
      const data = Object.fromEntries(formData);

      const response = fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await (await response).json()
    console.log('Response:', result)

    } catch (err: any) {
      returnErrors(err.response.data, err.response.status)

    }
  };



  
  return (
    <BrowserRouter>
      <Navbar></Navbar>
     
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/book/:id' element={<Bookpage />} />
        <Route path='/login' element={<Login login={handleLogin} />}></Route>
        <Route element={<AuthRequired />}>
            <Route path='/userDashboard' element={<UserDashboard />}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>


  );
}



export default App;

