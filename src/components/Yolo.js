import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import config from "./config.js";
import axios  from "axios";
const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
`;


export default function Viewer() {
  const webcamRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [prediction, setPrediction] = useState("");

  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  // useEffect(() => {
  //   const client_id = Date.now();
  //   const url = `${config.WS_SERVER}/${client_id}`;
  //   console.log(url);
  //   ws.current = new WebSocket(url);
  //   ws.current.onopen = () => console.log("ws opened");
  //   ws.current.onclose = () => console.log("ws closed");

  //   return () => {
  //     ws.current.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!ws.current) return;

  //   ws.current.onmessage = (event) => {
  //     if (isPaused) return;
  //     const message = JSON.parse(event.data);
  //     // console.log(message);
  //     setCapturedImg(message.output);
  //     setPrediction(message.prediction);
  //   };
  // }, [isPaused]);

  // function sendMessage(msg) {
  //   if (!ws.current) return;

  //   ws.current.send(msg);
  // }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment", // Can be "environment" or "user"
  };

  const capture = async () => {
    var capturedImg = webcamRef.current.getScreenshot();
    // setCapturedImg(capturedImg);
    
    capturedImg=capturedImg.replace('data:image/jpeg;base64,','')
    // capturedImg = capturedImg.replaceAll('/','%2F')
    console.log(capturedImg)
    const result = await axios.post(`http://127.0.0.1:5000/webcam/`,{webcam:capturedImg})
    console.log(result.data)
    setPrediction(result.data)
  }

  return (
    <Wrapper>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="50%"
        videoConstraints={videoConstraints}
        mirrored={true}
      />
      <p>
        <div id='Yolo'>
        <button onClick={capture} className='btn btn-custom btn-lg'>
        Capture
        </button>
        </div>
      </p>
      {prediction ?<div> <img id='output-image' alt='image' src={`data:image/png;base64,${prediction}`}/></div>: ''}


    </Wrapper>
  );
}