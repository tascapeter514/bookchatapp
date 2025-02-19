
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import AppRoutes from './AppRoutes.tsx'
import UserDataProvider  from './components/common/UserContext.tsx'
import './App.css';



function App() {

  return (
    <BrowserRouter>
     <UserDataProvider>
      <Navbar />
      <AppRoutes  />
      </UserDataProvider>
    </BrowserRouter>


  );
}



export default App;

