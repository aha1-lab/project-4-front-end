import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";


function App() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };



  return (
    <div className={`App ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Container className="py-4">
        <div className="container-fluid">
          <Navbar toggleTheme={toggleTheme} darkMode={darkMode}/>
          <div className="row">
            <div className="col-auto col-sm-2 p-0">
              {/* <Sidebar /> */}
            </div>
            <div className="col">
              <main className="p-3">
                
                <Routes>
                  <Route path="/" element={<Homepage/>} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/create" element={<CreateProject/>}/>
                  <Route path="/ProjectList" element={<ProjectList/>}/>
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Container>
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
    </div>
    </div>
  );

}

export default App;
