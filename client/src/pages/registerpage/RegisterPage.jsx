import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./register.css";
import { AuthContext } from "../../context/auth";
import { useForm } from "../../utils/hooks";
import {Link} from "react-router-dom";

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
    <div className="registerWrapper">
    <div className="registerBox">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <div className="register">
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
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm password"
          placeholder="Confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        </div>
        <Button type="submit" primary>
          Create Account
        </Button>
        <Link to="/loginpage">
        <Button type="submit" positive>
          Already Registered? Log in
        </Button>
        </Link>
      </Form>
      </div>  
    </div>
  )
}

export default Register;