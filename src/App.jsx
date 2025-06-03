import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
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
      <HeroSection onAssetsLoaded={() => setAssetsLoaded(true)} />
      <MainContent isVisible={animationComplete} />
    </div>
  );
}

export default App;
