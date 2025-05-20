import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import setTheme from "./setTheme";


const ThemeSelector = () => {

  const handleSelect= (event)=>{
    console.log(event);
    setTheme(event);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="outline-info"
        id="dropdown-basic"
      >
        Select Theme
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="bootstrap-superhero">Superhero</Dropdown.Item>
        <Dropdown.Item eventKey="bootstrap-sketchy">Sketchy</Dropdown.Item>
        <Dropdown.Item eventKey="bootstrap-brite">Brite</Dropdown.Item>
        <Dropdown.Item eventKey="bootstrap-vapor">Vapor</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ThemeSelector;
