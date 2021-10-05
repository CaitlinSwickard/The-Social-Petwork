import "./profilepage.css";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function ProfilePage() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={`${PF}post/pet16.jpg`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={`${PF}pet/pet1.jpg`}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Doggie Doo</h4>
                <span className="profileInfoDesc">Hello my Furriends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}