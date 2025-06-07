import "./Socials.css";
import linkedinIcon from "../assets/icons/linkedin.svg";
import youtubeIcon from "../assets/icons/youtube.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import blueskyIcon from "../assets/icons/bluesky.svg";
import tiktokIcon from "../assets/icons/tiktok.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const socials = [
  {
    href: "https://www.linkedin.com/company/crismilegames",
    icon: linkedinIcon,
    label: "LinkedIn",
    aria: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61576743031967",
    icon: facebookIcon,
    label: "Facebook",
    aria: "Facebook",
  },
  {
    href: "https://www.youtube.com/@CriSmileGame",
    icon: youtubeIcon,
    label: "YouTube",
    aria: "YouTube",
  },
  {
    href: "https://x.com/CriSmileGames",
    icon: twitterIcon,
    label: "X",
    aria: "X (Twitter)",
  },
  {
    href: "https://bsky.app/profile/crismilegames.bsky.social",
    icon: blueskyIcon,
    label: "Bluesky",
    aria: "BlueSky",
  },
  {
    href: "https://www.tiktok.com/@crismile_games",
    icon: tiktokIcon,
    label: "TikTok",
    aria: "TikTok",
  },
  {
    href: "https://www.instagram.com/crismilegames/",
    icon: instagramIcon,
    label: "Instagram",
    aria: "Instagram",
  },
];

function Socials() {
  const socialsRef = useRef(null);

  useEffect(() => {
    const links = socialsRef.current?.querySelectorAll(".socials-link");
    if (links && links.length > 0) {
      gsap.set(links, { opacity: 0, y: 40 });
      gsap.to(links, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power4.out",
        delay: 1.1,
      });
    }
  }, []);

  return (
    <div className="socials-section" ref={socialsRef}>
      {socials.map(({ href, icon, label, aria }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={aria}
          className="socials-link"
        >
          <img className="socials-icon" src={icon} alt={label} />
          <span className="socials-label">{label}</span>
        </a>
      ))}
    </div>
  );
}

export default Socials;
