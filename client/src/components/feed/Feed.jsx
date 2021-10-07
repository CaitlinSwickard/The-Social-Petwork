import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import PostCard from "../PostCard";
import axios from "axios";
// import { Posts } from "../../dummyData";
import { AuthContext } from "../../context/auth";
import { QUERY_POSTS } from "../../utils/queries";

function Feed() {
// const [posts,setPosts] = useState([]);
  // const {user} = useContext(AuthContext);
  const { user } = useContext(AuthContext);

// useEffect(()=> {

  // const fetchPosts = async() => {
  //   const res = user.username 
  //     ? await axios.get('/api/posts/profile/' + user.username)
  //     : await axios.get('/api/posts/timeline/' + user._id);
  //     // this sorts the posts in order from new first
  //     setPosts(
  //       res.data.sort((p1, p2) => {
  //         return new Date(p2.createdAt) - new Date(p1.createdAt);
  //       })
  //     );
  //   };
  //   fetchPosts();
  // }, [user.username, user._id]);

  const { loading, error, data } = useQuery(QUERY_POSTS);
  const allData = useQuery(QUERY_POSTS);

  console.log("All data: ", allData);
  console.log("User: ", user);
  console.log("ENV: ", process.env.REACT_APP_SECRET_KEY);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <h1>TEST</h1>
        {/* {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data.getPosts && data.getPosts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))
        )} */}
      </div>
    </div>
  )
}

export default Feed;