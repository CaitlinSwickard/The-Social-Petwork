import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";


export default function Navbar(){

    const { user, logout } = useContext(AuthContext);

    console.log(user);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: 'none'}}>
                <span className="logo">PetSocial</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="Search for new Furriends" className="searchInput"/>
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <PetsIcon/>
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem">
                        <ChatIcon/>
                        <span className="navbarIconBadge">2</span>
                    </div>
                    <div className="navbarIconItem">
                        <NotificationsIcon/>
                        <span className="navbarIconBadge">1</span>
                    </div>
                </div>
                <div className="navbarlinks">
                    {user ? (
                        <div>
                            <div>
                                <Link to={`/profile/${user.username}`}>
                                    <img src={
                                        user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "pet/noAvatar.png"
                                    } 
                                    alt="" 
                                    className="navbarImg" 
                                    />
                                </Link>
                            </div>
                            <br />
                            <div>
                                <Link to="/" style={{textDecoration: 'none'}} onClick={logout}>
                                    Logout
                                </Link>
                            </div> 
                        </div>
                    ) : (
                        <div>
                            <div>
                                <Link to="/loginpage" style={{textDecoration: 'none'}} onClick={logout}>
                                    Login
                                </Link>
                            </div>
                            <div>
                                <Link to="/registerpage" style={{textDecoration: 'none'}}>
                                    Register
                                </Link> 
                            </div>
                        </div>
   
                    )}
                </div>
            </div>
        </div>
    );
}