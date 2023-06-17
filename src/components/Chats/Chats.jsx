import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import db from "../../firebase";
import Posts from "../Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { resetCameraImage } from "../../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../features/modalSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const capture = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          title="Click to log out"
          src={user?.photoUrl}
          className="chats__avatar tooltip"
          onClick={() => dispatch(openModal())}
        />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon />
      </div>

      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { imageUrl, profilePic, read, timestamp, username },
          }) => (
            <Posts
              key={id}
              id={id}
              imageUrl={imageUrl}
              profilePic={profilePic}
              read={read}
              timestamp={timestamp}
              username={username}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className="chats__radio"
        fontSize="large"
        onClick={capture}
      />
    </div>
  );
};

export default Chats;
