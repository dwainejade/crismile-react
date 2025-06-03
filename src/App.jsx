import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import "./App.css";

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <BlogList />
            </motion.div>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <BlogPost />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(() => {
    // Check sessionStorage for animation state
    return sessionStorage.getItem("animationComplete") === "true";
  });

  useEffect(() => {
    if (!assetsLoaded || animationComplete) return;
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      sessionStorage.setItem("animationComplete", "true");
    }, 3000);
    return () => clearTimeout(timer);
  }, [assetsLoaded, animationComplete]);

  return (
    <Router>
      <div className="App">
        <AnimatedRoutes
          animationComplete={animationComplete}
          setAssetsLoaded={setAssetsLoaded}
        />
      </div>
    </Router>
  );
}

export default App;
