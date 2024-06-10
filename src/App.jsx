import { useState, useEffect, useRef } from "react";
import "./index.css";
import video1 from "/1.mp4";
import video2 from "/2.mp4";
import video3 from "/3.mp4";

const App = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const timings = [13500, 13500, 13500]; // durations for each video in milliseconds
  const videoSources = [video1, video2, video3]; // video sources

  useEffect(() => {
    let currentVideo = 0;

    const playNextVideo = () => {
      // Pause and reset the current video
      if (videoRefs[currentVideo].current) {
        videoRefs[currentVideo].current.pause();
        videoRefs[currentVideo].current.currentTime = 0;
      }

      // Move to the next video
      currentVideo = (currentVideo + 1) % videoRefs.length;

      // Play the next video
      if (videoRefs[currentVideo].current) {
        videoRefs[currentVideo].current.play();
        setActiveVideo(currentVideo);
      }

      // Set the timeout for the next video
      setTimeout(playNextVideo, timings[currentVideo]);
    };

    // Start the first video
    playNextVideo();

    // Cleanup timeouts on unmount
    return () => {
      videoRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, []);

  return (
    <div className="video-container">
      {/* {videoRefs.map((ref, index) => (
        <div key={index} className="video-container">
          <video ref={ref} src={videoSources[index]} />
          <div
            className={`overlay ${activeVideo === index ? "swipe" : ""}`}
            style={{
              background:
                activeVideo === index
                  ? "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
                  : "rgba(0, 0, 0, 1)",
            }}
          ></div>
        </div>
      ))} */}
      <video src={video1} controls></video>
    </div>
  );
};

export default App;
