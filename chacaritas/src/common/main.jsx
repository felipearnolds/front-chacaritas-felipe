import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '../auth/AuthContext'
import './index.css'
import Routing from './Routing'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>   
  </StrictMode>,
)
