import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import Blog from "./components/Blog";
import "./App.css";
import { useState, useEffect } from "react";

function AnimatedRoutes({ animationComplete, setAssetsLoaded }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HeroSection
                onAssetsLoaded={() => setAssetsLoaded(true)}
                animationComplete={animationComplete}
              />
              <MainContent isVisible={animationComplete} />
            </motion.div>
          }
        />
        <Route
          path="/blog"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Blog />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

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
      <AnimatedRoutes
        animationComplete={animationComplete}
        setAssetsLoaded={setAssetsLoaded}
      />
    </div>
  );
}

export default App;
