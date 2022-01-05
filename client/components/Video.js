//// IMPORTS ////
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { drawHand } from "../utilities";

//// HAND GESTURES ////
import thumbsUpGesture from "./gestures/thumbsUpGesture";
import thumbsDownGesture from "./gestures/thumbsDownGesture";
import raisedHandGesture from "./gestures/raisedHandGesture";
import raisedFistGesture from "./gestures/raisedFistGesture";

//// EMOJI IMAGES ////
const thumbs_up = "../assets/thumbs_up.png" // defaults at public folder
const thumbs_down = "../assets/thumbs_down.png"
const raised_hand = "../assets/raised_hand.png"
const raised_fist = "../assets/raised_fist.png"

const Video = () => {
  // Webcam
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Emojis
  const [emoji, setEmoji] = useState(null);
  const images = {
    thumbs_up: thumbs_up,
    thumbs_down: thumbs_down,
    raised_hand: raised_hand,
    raised_fist: raised_fist,
  };

  // Handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    // console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      // Handle gestures
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          thumbsUpGesture,
          thumbsDownGesture,
          raisedHandGesture,
          raisedFistGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          console.log(gesture.gestures[maxConfidence].name);
          setEmoji(gesture.gestures[maxConfidence].name);
        }
      } else {
        setEmoji();
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose()
  },[]);

  return (
    <div className="Video">
      <header className="Video-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        {emoji !== null ? (
          <img
            alt=""
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 550,
              // bottom: 500,
              right: 0,
              // textAlign: "center",
              // height: 100,
            }}
          />
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default Video;