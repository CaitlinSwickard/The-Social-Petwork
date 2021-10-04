// import { useEffect, useState } from 'react';
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";
// import axios from 'axios';

export default function Feed() {

// const [posts,setPosts] =useState([]);

// useEffect(() => {
//   // console.log("feed rendered");
//   const fetchPosts = async () => {
//     const res = await axios.get("/timeline/add user id# here");
//     setPosts(res.data)
//     console.log(res);
//   }
//   fetchPosts();
// },[]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}