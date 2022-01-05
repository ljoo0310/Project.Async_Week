// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

// Define Gesture Description
const raisedFistGesture = new GestureDescription('raised_fist');

// All fingers
Finger.all.slice(1).forEach(finger => { // exluding thumb
  raisedFistGesture.addCurl(finger, FingerCurl.FullCurl, 1.0); // completely curled
  raisedFistGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  raisedFistGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
})

// Thumb
raisedFistGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0); // not completely curled
raisedFistGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0) // straight up

export default raisedFistGesture;
