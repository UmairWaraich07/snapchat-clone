import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Chats from "./components/Chats/Chats";
import PostView from "./components/PostView/PostView";
import Preview from "./components/Preview/Preview";
import WebcamComponent from "./components/Webcam/WebcamComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, signout } from "./features/userSlice";
import Modal from "./components/Modal/Modal";

function App() {
  const { user } = useSelector((store) => store.user);
  const { isModal } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //if user logged in
        dispatch(
          login({
            displayName: userAuth.displayName,
            email: userAuth.email,
            photoUrl: userAuth.photoURL,
            id: userAuth.uid,
          })
        );
      } else {
        //if user logged out
        dispatch(signout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app__body smartphone">
            <div className="app__background content">
              <Routes>
                <Route path="chats/view" element={<PostView />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/" element={<WebcamComponent />} />
                <Route exact path="/preview" element={<Preview />} />
              </Routes>
            </div>
          </div>
        )}
        {isModal && <Modal />}
      </Router>
    </div>
  );
}

export default App;
