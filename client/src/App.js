
import FeedPage from "./pages/feedpage/FeedPage";
import Login from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import Register from "./pages/registerpage/RegisterPage";
import Messenger from './pages/messenger/Messenger';
// import Navbar from "./components/navbar/Navbar";
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
        <Switch>
          {/* <Route exact path="/">
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
          </Route> */}
          <Route path="/messenger">
         
          </Route>
        </Switch>
        {/* <Navbar/> */}
        
        <Route exact path="/" component={FeedPage} />
        <Route exact path="/messenger" component={Messenger} />
        <AuthRoute exact path="/loginpage" component={Login} />
        <AuthRoute exact path="/registerpage" component={Register} />
      </Router>
    </AuthProvider>
  );
}

export default App;