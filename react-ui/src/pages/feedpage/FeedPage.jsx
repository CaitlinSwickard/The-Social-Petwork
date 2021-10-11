import "./feedpage.css"
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";

export default function FeedPage() {
  return (
    <>
      <div className="homeContainer">
      <Leftbar />
      <Feed />
      <Rightbar />
      </div>
    </>
  );
}
