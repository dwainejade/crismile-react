import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import Blog from "./components/Blog";
import "./App.css";

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!assetsLoaded) return;
    const timer = setTimeout(() => setAnimationComplete(true), 3000);
    return () => clearTimeout(timer);
  }, [assetsLoaded]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection
                onAssetsLoaded={() => setAssetsLoaded(true)}
                animationComplete={animationComplete}
              />
              <MainContent isVisible={animationComplete} />
            </>
          }
        />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
