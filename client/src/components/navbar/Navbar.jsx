import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/feedpage" style={{textDecoration: 'none'}}>
                <span className="logo">PetSocial</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input placeholder="Search for new Furriends" className="searchInput" />
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarlinks">
                    <span className="navbarLink">Homepage</span>
                    <span className="navbarLink">Timeline</span>
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <PetsIcon />
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem">
                        <Link to ="/messenger"  >
                            <ChatIcon />
                        </Link>
                        <span className="navbarIconBadge">2</span>
                    </div>
                    <div className="navbarIconItem">
                        <NotificationsIcon />
                        <span className="navbarIconBadge">1</span>
                    </div>
                </div>
                {/* <Link to={`/profile/${user.username}`}>
                <img src={
                    user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "pet/noAvatar.png"
                } 
                alt="" 
                className="navbarImg" 
                />
                </Link> */}
            </div>
        </div>
    );
}