
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import AppRoutes from './AppRoutes.tsx'
import './App.css';



function App() {




  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false
    } else {
      return true
    }
  }


  



  

  return (
    <BrowserRouter>
      <Navbar auth={isAuthenticated}></Navbar>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </BrowserRouter>


  );
}



export default App;

