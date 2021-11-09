import "./navbar.css";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PetsIcon from "@mui/icons-material/Pets";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  menuIconContainer: {
    marginLeft: "auto", // theme.spacing (2),
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  const { user, logout } = useContext(AuthContext);

  console.log(user);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const drawerWidth = 240;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List className="listItems">
        <Link
          id="link"
          to="/"
          style={{ textDecoration: "none", marginLeft: "5vw", paddingBottom: "3vw"}}
        >
          Paws
        </Link>
        <Link
          id="link"
          to="/messenger"
          style={{ textDecoration: "none", marginLeft: "5vw", paddingBottom: "3vw" }}
        >
          Messenger
        </Link>
        <Link
          id="link"
          to="/"
          style={{ textDecoration: "none", marginLeft: "5vw", paddingBottom: "3vw" }}
        >
          Notifications
        </Link>
        <Link
          id="link"
          to="/loginpage"
          style={{ textDecoration: "none", marginLeft: "5vw", paddingBottom: "3vw" }}
          onClick={logout}
        >
          Logout
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {/* Hamburger Menu */}
        <Box  sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar 
            // color="primary" //transparent
            position="fixed" //absolute
            sx={{
              // height: { sm: `calc(49% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            {/* <Typography variant="h4" noWrap component="div">
          The Social Petwork
          </Typography> */}
            {user ? (
              <div>
                <Link
                  to={`/profile/${user.username}`}
                  style={{ marginLeft: "1.5rem"}}
                >
                  <img
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "pet/dogcat.jpg"
                    }
                    alt="profile-picture"
                    className="navbarImg"
                  />
                </Link>
                <span className="userName">{user.username} </span>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span className="logo">The Social Petwork</span>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
            {/* <div className="navbarLeft">
      </div> */}
            <div className="navbarIcons">
              <div className="navbarIconItem">
                <PetsIcon />
                <span className="navbarIconBadge">1</span>
              </div>
              <div className="navbarIconItem">
                <Link style={{ color: "white" }} to="/messenger">
                  <ChatIcon />
                </Link>
                <span className="navbarIconBadge">2</span>
              </div>
              <div className="navbarIconItem">
                <NotificationsIcon />
                <span className="navbarIconBadge">1</span>
              </div>
              <div className="navbarlinks">
                {user ? (
                  <div>
                    <div>
                      <Link
                        id="link"
                        to="/loginpage"
                        style={{
                          textDecoration: "underline",
                          marginRight: "2vw",
                          color: "white",
                        }}
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <Link
                        to="/loginpage"
                        style={{ textDecoration: "underline", color: "white" }}
                        onClick={logout}
                      >
                        Login
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/registerpage"
                        style={{ textDecoration: "underline", color: "white" }}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Toolbar className={classes.menuIconContainer}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start" //false
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              anchor="right"
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
    </div>
  );
}
