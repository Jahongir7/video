import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % 3);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid">
      {[0, 1, 2].map((index) => (
        <div key={index} className="video-container">
          <video width="100%" src="./mov_bbb.mp4" controls />
          <div
            className={`overlay ${activeVideo === index ? "swipe" : ""}`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default App;
