import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import { UserProvider } from './context/AuthContext.jsx'
// import 'bootstrap/dist/css/bootstrap.css'
// import './styles/bootstrap-superhero.css'
// import './styles/bootstrap-sketchy.css'
// import './styles/bootstrap-brite.css'
// import './styles/bootstrap-vapor.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)