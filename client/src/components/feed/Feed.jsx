import { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
// import { Posts } from "../../dummyData";
import { AuthContext } from "../../context/AuthContext";


export default function Feed({username}) {
const [posts,setPosts] = useState([]);
const {user} = useContext(AuthContext);

useEffect(()=> {
  const fetchPosts = async() => {
    const res = username 
      ? await axios.get('/api/posts/profile/' + username)
      : await axios.get('/api/posts/timeline/' + user._id);
      // this sorts the posts in order from new first
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* setting so you can only create a new post while on your own profile page */}
      {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}