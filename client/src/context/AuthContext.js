import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducers';

const INITIAL_STATE = {
  user: 
    null,
    // _id: "615c959c623529f321c14da7",
    // username: "john",
    // email: "john@gmail.com",
    // profilePicture: "pet/pet1/jpg",
    // coverPicture: "",
    // isAdmin: false,
    // followers: [],
    // following: [],
  
  isFetching: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}>
        {children}

    </AuthContext.Provider>
  )
}