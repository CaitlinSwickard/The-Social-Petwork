import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function Navbar(){
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <span className="logo">PetSocial</span>
            </div>
            <div className="navbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="Search for new Furriends" className="searchInput"/>
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarlinks">
                    <span className="navbarLink">Homepage</span>
                    <span className="navbarLink">Timeline</span>
                </div>
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
                <img src="/assets/pet/pet1.jpg" alt="" className="navbarImg" />
            </div>
        </div>
    );
}