import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const App = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const timings = [10000, 10000, 10000]; // durations for each video in milliseconds

    const playNextVideo = (index) => {
      const prevIndex = index === 0 ? videoRefs.length - 1 : index - 1;
      if (index > 0) {
        videoRefs[prevIndex].current.pause();
        videoRefs[prevIndex].current.currentTime = 0;
      }

      videoRefs[index].current.play();
      setActiveVideo(index);
    };

    const intervals = [];
    const totalDuration = timings.reduce((a, b) => a + b, 0);

    let accumulatedTime = 0;
    for (let i = 0; i < videoRefs.length; i++) {
      intervals.push(setTimeout(() => playNextVideo(i), accumulatedTime));
      accumulatedTime += timings[i];
    }

    intervals.push(
      setTimeout(() => {
        setActiveVideo(0);
        playNextVideo(0);
      }, totalDuration)
    );

    return () => intervals.forEach(clearTimeout);
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
