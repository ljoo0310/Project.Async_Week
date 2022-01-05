// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

// Define Gesture Description
const thumbsDownGesture = new GestureDescription('thumbs_down');

// Thumb
thumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl) // straight out
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft); // though doesn't need to be 90 deg down
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight); // though doesn't need to be 90 deg down
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 0.5); // pointing down


// Remaining fingers
Finger.all.slice(1).forEach(finger => {
  thumbsDownGesture.addCurl(finger, FingerCurl.FullCurl); // all curled
  thumbsDownGesture.addDirection(finger, FingerDirection.HorizontalLeft, 0.9); // all horizontal
  thumbsDownGesture.addDirection(finger, FingerDirection.HorizontalRight, 0.9);
  thumbsDownGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5); // with some tilt
  thumbsDownGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.5);
})

export default thumbsDownGesture;
