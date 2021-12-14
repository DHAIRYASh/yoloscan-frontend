
import React, { useEffect, useRef, useState, useCallback } from "react";
import config from "./config.js";
import axios from 'axios'

export const Contact = (props) => {
  
  const webcamRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [img, setImg] = useState(null);
  const [prediction, setPrediction] = useState([]);

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
  //     setImg(message.output);
  //     setPrediction(message.prediction);
  //   };
  // }, [isPaused]);

  function sendMessage(msg) {
    console.log('Testing');
  }

  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: "environment", // Can be "environment" or "user"
  // };

  // const capture = useCallback(() => {
  //   const capturedImg = webcamRef.current.getScreenshot();
  //   // setCapturedImg(capturedImg);
  //   console.log(capturedImg);
  //   sendMessage(capturedImg);
  // }, [webcamRef]); 

  
const imageupload= async ()=>{
  var content = document.getElementById('url')
  let formData = new FormData(); 

  formData.append('file', content.files[0]);  

  console.log(content.files[0]);
   const result = await axios.post('http://127.0.0.1:5000/upload/',formData)
   console.log(result.data);
   setPrediction(result.data.prediction)
   setImg(result.data.image)
}
  

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Paste any link!!!</h2>
                <p>
                  This section allows you to paste any link from web to use the yolov5 object detection on any desired image. 
                </p>
              </div>
              <form name='sentMessage' >
                <div className='form-group'>
                  <input
                        type='file'
                        multiple='multiple'
                        id='url'
                        name='url'
                        className='form-control'
                        placeholder='URL'
                        required
                        >
                          </input>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
              </form>
              <button onClick={imageupload} className='btn btn-custom btn-lg'>Submit</button>
              {img ?<div> <img id='output-image' alt='image' src={`data:image/png;base64,${img}`}/></div>: ''}
<p>
  <h3>{prediction && prediction}</h3>
</p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}
