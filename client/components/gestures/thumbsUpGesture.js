// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

// Define Gesture Description
const thumbsUpGesture = new GestureDescription('thumbs_up');

// Thumb
thumbsUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl) // straight out
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);

// Remaining fingers
Finger.all.slice(1).forEach(finger => {
  thumbsUpGesture.addCurl(finger, FingerCurl.FullCurl); // all curled
  thumbsUpGesture.addDirection(finger, FingerDirection.HorizontalLeft, 0.9); // all horizontal
  thumbsUpGesture.addDirection(finger, FingerDirection.HorizontalRight, 0.9);
  thumbsUpGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5); // with some tilt
  thumbsUpGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.5);
})

export default thumbsUpGesture;
