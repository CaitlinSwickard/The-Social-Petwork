import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function RegisterPage() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    // making sure passwords match
    if(passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value, 
        email: email.current.value, 
        password: password.current.value,
      };
      try{
        const res = await axios.post('/api/auth/registerpage', user);
        // this will direct the user back to the login page after registering
        history.push('/loginpage');
      } catch (err){
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">The Social Pet Work</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on The Social Pet Work.
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
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}