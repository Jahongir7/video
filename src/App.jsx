import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const App = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const timings = [10000, 10000, 10000]; // durations for each video in milliseconds

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
    <div className="grid">
      {videoRefs.map((ref, index) => (
        <div key={index} className="video-container">
          <video ref={ref} src="./mov_bbb.mp4" controls />
          <div
            className={`overlay ${activeVideo === index ? "swipe" : ""}`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default App;
