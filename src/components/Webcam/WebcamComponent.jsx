import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import "./WebcamComponent.css";

const videoConstraints = {
  width: 250,
  height: 402,
  facingMode: "user",
};

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imgSrc));
    navigate("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamComponent">
      <Webcam
        mirrored={true}
        audio={false}
        width={videoConstraints.width}
        height={videoConstraints.height}
        videoConstraints={videoConstraints}
        minScreenshotHeight={videoConstraints.height}
        minScreenshotWidth={videoConstraints.width}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
      />

      <RadioButtonUncheckedIcon
        fontSize="large"
        onClick={capture}
        className="webcamComponent__capture"
      />
    </div>
  );
};

export default WebcamComponent;
