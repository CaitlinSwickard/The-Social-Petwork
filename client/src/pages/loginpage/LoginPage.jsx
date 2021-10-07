// import "./login.css";
// import { useRef, useContext } from "react";
// import {loginCall } from "../../apiCalls";
// import { AuthContext } from "../../context/AuthContext";
// import { CircularProgress } from "@material-ui/core";

// export default function LoginPage() {
// const email = useRef();
// const password = useRef();
// const { user, isFetching, error, dispatch } = useContext(AuthContext);

// const handleClick = (e) => {
//   e.preventDefault();
//   loginCall(
//     { email: email.current.value, password: password.current.value }, 
//     dispatch);
// }
// // console.log(user);

//   return (
//     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h3 className="loginLogo">The Social Pet Work</h3>
//           <span className="loginDesc">
//             No Hoomans. Animals ONLY!! We ruuuleee!
//           </span>
//         </div>
//         <div className="loginRight">
//         <form className="loginBox" onSubmit={handleClick}>
//             <input
//               placeholder="Email"
//               type="email"
//               required
//               className="loginInput"
//               ref={email}
//             />
//             <input
//               placeholder="Password"
//               type="password"
//               required
//               minLength="6"
//               className="loginInput"
//               ref={password}
//             />
//             <button className="loginButton" type="submit" disabled={isFetching}>
//               {isFetching ? (
//                 <CircularProgress color="white" size="20px" />
//               ) : (
//                 "Log In"
//               )}
//             </button>
//             <span className="loginForgot">Forgot Password?</span>
//             <button className="loginRegisterButton">
//               {isFetching ? (
//                 <CircularProgress color="white" size="20px" />
//               ) : (
//                 "Create a New Account"
//               )}
//             </button>
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

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Login(props) {
  const context = useContext(AuthContext);
  
  const [errors, setErrors] = useState({});
  
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}){
      context.login(userData);
      props.history.push("/");
    },
    onError(err){
      console.log("ERR: ", err);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  function loginUserCallback(){
    loginUser();
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">The Social PetWork</h3>
          <span className="loginDesc">
            No Hoomans. Animals ONLY!! We ruuuleee!
          </span>
        </div>
        <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login;