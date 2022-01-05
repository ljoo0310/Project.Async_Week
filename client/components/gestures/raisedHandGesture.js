// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

// Define Gesture Description
const raisedHandGesture = new GestureDescription('raised_hand');

// All fingers
Finger.all.forEach(finger => {
  raisedHandGesture.addCurl(finger, FingerCurl.NoCurl, 1.0); // straight out
  raisedHandGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9); // allowing some curved fingers
  if (0 < finger && finger < 4 ) raisedHandGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0); // all vertical for 3 mid fingers
  else raisedHandGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0) // may be diagonal for thumb and pinky
})

// Thumb
raisedHandGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0) // diagonal

// Pinky
raisedHandGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0) // diagonal

export default raisedHandGesture;
