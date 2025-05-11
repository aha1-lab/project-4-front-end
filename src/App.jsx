import './App.css'
import {Routes ,Route} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import ProjectList from "./pages/ProjectList";

function App() {

  return (
    <>
      <h2>Project Lists</h2>

    {/* <Navbar/> */}
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/ProjectList" element={<ProjectList/>}/>
    </Routes>
    </>
  )
}

export default App
