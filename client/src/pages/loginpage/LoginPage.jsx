
import "./login.css";
import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Link} from "react-router-dom";
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
    <div className="loginWrapper">
    <div className="form-container">
    <div className="loginLeft">
          <h3 className="loginLogo">The Social Petwork</h3>
          <span className="loginDesc">
            Connect with Furriends and the world around you on PetSocial.
          </span>
        </div>
        <div className="loginRight">
        <div className="loginBox">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
        <Link to="/registerpage" >
        <Button type="submit" positive>
          Create An Account
        </Button>
        </Link>
      </Form>
      </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}

export default Login;