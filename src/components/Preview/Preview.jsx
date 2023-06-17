import React, { useEffect } from "react";
import "./Preview.css";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../../features/cameraSlice";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import db, { storage } from "../../firebase";

const Preview = () => {
  const { cameraImage } = useSelector((store) => store.camera);
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();

    const storageRef = ref(storage, `posts/${id}`);
    uploadString(storageRef, cameraImage, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        db.collection("posts").add({
          imageUrl: downloadURL,
          username: user?.displayName,
          read: false,
          timestamp: firebase.firestore.Timestamp.now(),
          profilePic: user?.photoUrl,
        });
      });
    });
    navigate("/chats");
  };

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <img src={cameraImage} alt="" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>

      <div className="preview__footer" onClick={sendPost}>
        <h4>Send Now</h4>
        <SendIcon className="preview__send" />
      </div>
    </div>
  );
};

export default Preview;
