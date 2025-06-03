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
        onAnimationComplete();
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
