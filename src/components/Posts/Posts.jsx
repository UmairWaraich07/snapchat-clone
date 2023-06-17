import React from "react";
import "./Posts.css";
import { Avatar } from "@mui/material";
import TimeAgo from "react-timeago";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { useDispatch } from "react-redux";
import { resetSelectedImage, setSelectedImage } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";

const Posts = ({ id, imageUrl, profilePic, read, timestamp, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openPost = () => {
    if (!read) {
      dispatch(resetSelectedImage());
      dispatch(setSelectedImage(imageUrl));

      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );

      navigate("/chats/view");
    }
  };

  return (
    <div className="posts" onClick={openPost}>
      <Avatar src={profilePic} className="posts__avatar" />
      <div className="posts__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <TimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="posts__readIcon" />}
    </div>
  );
};

export default Posts;
