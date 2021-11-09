import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LabelIcon from '@mui/icons-material/Label';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {Cancel} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import { useForm } from "../../utils/hooks";


export default function Share() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    // create a new post
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
  //   // this uploads local photos to the new post and the form data entered
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/api/upload", data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  //   // reload page after new post
  //   try {
  //     await axios.post("/api/posts", newPost);
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  };

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ""
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: QUERY_POSTS,
      });
      proxy.writeQuery({
        query: QUERY_POSTS,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) { 
      return err;
    },
  });

  function createPostCallback(){
    createPost();
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" 
          src={
            user?.profilePicture 
            ? PF + user.profilePicture
            : PF + "pet/dogcat.jpg"}
          alt="" />
          <input
            placeholder={"What's on your mind " + user?.username + "?"}
            className="shareInput"
            ref={desc}
            onChange={onChange}
            name="body"
          />
        </div>
        <hr className="shareHr"/>
        {/* to show image while creating a post before it is posted */}
         {file && (
          <div className="imag">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
         
          </div>
        )}
        <form className="shareBottom" onSubmit={onSubmit}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input 
                    style={{display: "none"}}
                    type="file" 
                    id="file" 
                    accept=".png,.jpeg,.jpg" 
                    onChange={(e) => setFile(e.target.files[0])}
                      />
                </label>
                <div className="shareOption">
                    <LabelIcon htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <LocationOnIcon  htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <InsertEmoticonIcon htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
