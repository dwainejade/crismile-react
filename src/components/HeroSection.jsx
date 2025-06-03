import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function HeroSection({ onAnimationComplete, onAssetsLoaded }) {
  const logoVideoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);

  // Mobile detection function
  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    // Initial setup
    document.body.classList.add("lock-scroll");

    const logoVideo = logoVideoRef.current;
    const heroSection = heroSectionRef.current;
    const heroContent = heroContentRef.current;

    // Set initial states
    gsap.set(logoVideo, { opacity: 1, scale: 1 });

    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("lock-scroll");
      },
    });

    tl
      // Phase 1: Wait for logo video to play
      .to({}, { duration: 3 })

      .to(
        logoVideo,
        {
          scale: 0.8,
          ease: "power1.inOut",
          duration: 1,
        },
        "transform"
      )

      // move logo to top of screen
      .to(
        heroContent,
        {
          top: 0,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "<"
      )

      .to(
        heroSection,
        {
          height: isMobile() ? "20vh" : "40vh",
          duration: 0.5,
          ease: "power1.inOut",
        },
        "<"
      );

    // Handle window resize
    const handleResize = () => {
      if (isMobile() && heroSection) {
        gsap.set(heroSection, { height: "20vh" });
      } else {
        gsap.set(heroSection, { height: "40vh" });
      }
    };

    // Handle tab visibility change to keep video on last frame
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && logoVideoRef.current) {
        const video = logoVideoRef.current;
        // If video is not ended, seek to end and pause
        if (video.readyState >= 2) {
          if (!video.ended) {
            video.currentTime = video.duration;
            video.pause();
          }
        } else {
          // If video not loaded yet, wait for it to load
          const onLoaded = () => {
            video.currentTime = video.duration;
            video.pause();
            video.removeEventListener("loadeddata", onLoaded);
          };
          video.addEventListener("loadeddata", onLoaded);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      tl.kill();
    };
  }, [onAnimationComplete]);

  return (
    <section className="hero-section" ref={heroSectionRef}>
      {/* Navigation Bar */}
      <nav
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "flex-end",
          padding: "1.2rem 2rem",
          zIndex: 10,
        }}
      >
        <a
          href="/blog"
          style={{
            color: "#1e90ff",
            fontFamily: "NicoMoji, sans-serif",
            fontWeight: 700,
            fontSize: "1.4rem",
            textDecoration: "none",
            background: "#fff",
            borderRadius: "20px",
            padding: "0.4rem 1.2rem",
            boxShadow: "0 2px 8px rgba(30,144,255,0.08)",
            transition: "background 0.2s",
          }}
          target="_self"
          rel="noopener noreferrer"
          as={undefined}
          onClick={(e) => {
            e.preventDefault();
            window.location.pathname = "/blog";
          }}
        >
          Blog
        </a>
      </nav>
      <div className="hero-content" ref={heroContentRef}>
        <div className="logo-container">
          <video
            ref={logoVideoRef}
            className="logo-video"
            muted
            autoPlay
            playsInline
            onEnded={(e) => e.target.pause()}
            onLoadedData={onAssetsLoaded}
          >
            <source
              src="./assets/videos/logo_animation.mp4"
              type="video/mp4;codecs=hvc1"
            />
            <source
              src="./assets/videos/logo_animation.webm"
              type="video/webm"
            />
          </video>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
