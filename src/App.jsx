import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";


function App() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [searchName, setSearchName] = useState("")

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
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
