import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserDataProvider  from './components/common/Context/UserContext/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </StrictMode>,
)
