import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import EmailForm from "./EmailForm";
import CloudCanvas from "./CloudCanvas";

function MainContent({ isVisible }) {
  const mainContentRef = useRef(null);
  const descriptionRef = useRef(null);
  const signupSectionRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const mainContent = mainContentRef.current;
    const description = descriptionRef.current;
    const signupSection = signupSectionRef.current;

    // Set initial states for content animations
    gsap.set([description, signupSection], {
      opacity: 0,
      y: 50,
    });

    // Animate content section up and fade in elements
    const tl = gsap.timeline();

    tl
      // slide content section up
      .to(mainContent, {
        y: "0%",
        duration: 1,
        ease: "power2.out",
      })

      // Staggered fade-up animation for content elements
      .to(
        [description, signupSection],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.3,
        },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  return (
    <section className="main-content-section" ref={mainContentRef}>
      <div className="spacer"></div>

      <CloudCanvas />

      <div className="main-container">
        <div className="main-content">
          <p className="description" ref={descriptionRef}>
            Exciting times are ahead at{" "}
            <b className="company-name">Cri Smile Games</b>. Our dedicated team
            is working tirelessly to bring you our first original game, and we
            can't wait to share it with you in the coming months. Stay tuned for
            updates, sneak peeks, and more as we embark on this incredible
            journey together. Thank you for your support!
          </p>

          <div className="signup-section" ref={signupSectionRef}>
            <h2 className="signup-title">
              Subscribe to our email list to be taken along the ebbs and flows
              of our journey.
            </h2>

            <EmailForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainContent;
