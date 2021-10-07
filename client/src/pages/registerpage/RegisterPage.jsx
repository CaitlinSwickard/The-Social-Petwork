import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';

// export default function RegisterPage() {

//   const username = useRef();
//   const email = useRef();
//   const password = useRef();
//   const passwordAgain = useRef();
//   const history = useHistory();

//   const handleClick = async (e) => {
//     e.preventDefault();
//     // making sure passwords match
//     if(passwordAgain.current.value !== password.current.value){
//       password.current.setCustomValidity("Passwords don't match");
//     } else {
//       const user = {
//         username: username.current.value, 
//         email: email.current.value, 
//         password: password.current.value,
//       };
//       try{
//         const res = await axios.post('/api/auth/registerpage', user);
//         // this will direct the user back to the login page after registering
//         history.push('/loginpage');
//       } catch (err){
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h3 className="loginLogo">The Social Pet Work</h3>
//           <span className="loginDesc">
//             Connect with friends and the world around you on The Social Pet Work.
//           </span>
//         </div>
//         <div className="loginRight">
//           <form className="loginBox" onSubmit={handleClick}>
//             <input
//               placeholder="Username"
//               required
//               ref={username}
//               className="loginInput"
//             />
//             <input
//               placeholder="Email"
//               required
//               ref={email}
//               className="loginInput"
//               type="email"
//             />
//             <input
//               placeholder="Password"
//               required
//               ref={password}
//               className="loginInput"
//               type="password"
//               minLength="6"
//             />
//             <input
//               placeholder="Password Again"
//               required
//               ref={passwordAgain}
//               className="loginInput"
//               type="password"
//             />
//             <button className="loginButton" type="submit">
//               Sign Up
//             </button>
//             <button className="loginRegisterButton">Log into Account</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../utils/hooks";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData}}){
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err){
      console.log("ERR: ", err);
      // setErrors(err);
    },
    variables: values
  });

  function registerUser(){
    addUser();
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">The Social PetWork</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on The Social PetWork.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            {/* <span className="or">or</span> */}
            <Link to="/loginpage">
            <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;