import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { authContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Form, Button, Alert } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });



  const [errorStatus, setErrorStatus] = useState();

  const { validateToken } = useContext(authContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/users/sign-in`,
        formData
      );
      // console.log("AAAA ",response.data)
      localStorage.setItem("token", response.data.token);
      const decoded = jwtDecode(response.data.token);
      // console.log("Decoded JWT: ", decoded)
      const userInfo = {
        username: decoded.payload.username,
        id: decoded.payload.id,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      validateToken();
      navigate("/");
    } catch (err) {
      setErrorStatus(err.response.data.error);
      console.log(err.response.data.error);
    }
  }

  return (
    <div>
      {errorStatus && (
        <Alert variant="danger" dismissible>
          {errorStatus}
        </Alert>
      )}
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username" className="mt-3">
            Username
          </Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className=" mt-3">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
