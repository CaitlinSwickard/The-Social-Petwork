import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

function AuthRoute({ component: Component, ...rest }){
  const { user } = useContext(AuthContext);
  // const { type } = rest;
  
  // if (type === "guest" && user) {
  //   return <Redirect to="/feedpage" />
  // } else if (type === "private" && !user) {
  //   return <Redirect to="/loginpage" />
  // } else if (type === "guest" && !user) {
  //   return <Redirect to="/loginpage" />
  // }

  // return <Route {...rest} />;

  return (
    <Route
      {...rest}
      render={props => 
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default AuthRoute;