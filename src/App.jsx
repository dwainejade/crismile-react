import { useState } from "react";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import "./App.css";

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="App">
      <HeroSection onAnimationComplete={() => setAnimationComplete(true)} />
      <MainContent isVisible={animationComplete} />
    </div>
  );
}

export default App;
