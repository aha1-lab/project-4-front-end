import {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authContext } from '../context/AuthContext'
import { jwtDecode } from "jwt-decode";

function Login() {
      const [formData, setFormData] = useState({
          username:"",
          password:""
      })

      const {validateToken} = useContext(authContext)
      const navigate = useNavigate()

      function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      e.preventDefault()
      try{
          const response = await axios.post(`http://127.0.0.1:5000/users/sign-in`,formData)
          // console.log("AAAA ",response.data)
          localStorage.setItem("token",response.data.token)
          const decoded = jwtDecode(response.data.token)
          // console.log("Decoded JWT: ", decoded)
          const userInfo = {
            username: decoded.payload.username,
            id: decoded.payload.id,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          validateToken()
          navigate("/")

      }
      catch(err){
          console.log(err)
      }
  }


  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
         type="text"
         name='username'
         id='username'
         value={formData.username}
         onChange={handleChange}
          />

        <label htmlFor="password">Password:</label>
        <input
         type="password"
         name='password'
         id='password'
         value={formData.password}
         onChange={handleChange}
          />

          <button>Submit</button>
      </form>
    </div>
  )
}

export default Login