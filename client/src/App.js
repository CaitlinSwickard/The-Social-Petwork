// import React from 'react';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import Home from './pages/Home';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import FeedPage from './pages/feedpage/FeedPage';
// import Messenger from './pages/messenger/Messenger';
// import ProfilePage from './pages/profilepage/ProfilePage';
// import LoginPage from './pages/loginpage/LoginPage';
// import RegisterPage from './pages/registerpage/RegisterPage';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// const { user } = useContext(AuthContext)

// function App() {

//   const { user } = useContext(AuthContext)
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <div className="flex-column justify-flex-start min-100-vh">
//           {/* <Header /> */}
//           <div className="container">
//             <Route exact path="/">
//               <Home />
//             </Route>
//             <Route exact path="/login">
//               <Login />
//             </Route>
//             <Route exact path="/signup">
//               <Signup />
//             </Route>
//             <Route exact path="/me">
//               <Profile />
//             </Route>
//             <Route exact path="/profiles/:profileId">
//               <Profile />
//             </Route>
//             {/* these are all the pages we added outside the boiler plate */}
//             <Route exact path="/feedpage">
//               {user ? <FeedPage /> : <RegisterPage />}
//             </Route>
//             <Route exact path="/messenger">
//               <Messenger />
//             </Route>
//             <Route exact path="/profilepage">
//               <ProfilePage />
//             </Route>
//             <Route exact path="/loginpage">
//               {user ? <Redirect to='/feedpage' /> : <LoginPage />}
//             </Route>
//             <Route exact path="/registerpage">
//               <RegisterPage />
//             </Route>
//           </div>
//           {/* <Footer /> */}
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;


import FeedPage from "./pages/feedpage/FeedPage";
import Login from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import Register from "./pages/registerpage/RegisterPage";
import Messenger from './pages/messenger/Messenger';
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import "semantic-ui-css/semantic.min.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        {/* <Switch>
          <Route exact path="/">
            {user ? <FeedPage /> : <RegisterPage />}
          </Route>
          <Route path="/loginpage">
            {user ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="/registerpage">
            {user ? <Redirect to="/" /> : <RegisterPage />}
            <RegisterPage />
          </Route>
          <Route path="/profile/:username">
            <ProfilePage />
          </Route>
          <Route path="/messenger">
            <Messenger />
          </Route>
        </Switch> */}
        <Navbar />
        <Route exact path="/" component={FeedPage} />
        <AuthRoute exact path="/loginpage" component={Login} />
        <AuthRoute exact path="/registerpage" component={Register} />
      </Router>
    </AuthProvider>
  );
}

export default App;