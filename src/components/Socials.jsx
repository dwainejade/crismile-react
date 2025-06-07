import linkedinIcon from "../assets/icons/linkedin.svg";
import youtubeIcon from "../assets/icons/youtube.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import blueskyIcon from "../assets/icons/bluesky.svg";
import tiktokIcon from "../assets/icons/tiktok.svg";
import instagramIcon from "../assets/icons/instagram.svg";

// LinkedIn- https://www.linkedin.com/company/crismilegames/?viewAsMember=true
// Youtube-  https://www.youtube.com/channel/UCYzCcubuP60FxOf4ZRmP9Sg
// Facebook- https://www.facebook.com/profile.php?id=61576743031967
// X - https://x.com/CriSmileGames
// Bluesky- https://bsky.app/profile/crismilegames.bsky.social
// TikTok- https://www.tiktok.com/@crismile_games
// Instagram- https://www.instagram.com/crismilegames/

function Socials() {
  return (
    <div
      className="socials-section"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginBottom: "2rem",
      }}
    >
      <a
        href="https://www.linkedin.com/company/crismilegames"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <img src={linkedinIcon} alt="LinkedIn" width={40} height={40} />
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61576743031967"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <img src={facebookIcon} alt="Facebook" width={40} height={40} />
      </a>
      <a
        href="https://www.youtube.com/@CriSmileGame"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
      >
        <img src={youtubeIcon} alt="YouTube" width={40} height={40} />
      </a>
      <a
        href="https://x.com/CriSmileGames"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
      >
        <img src={twitterIcon} alt="X (Twitter)" width={40} height={40} />
      </a>
      <a
        href="https://bsky.app/profile/crismilegames.bsky.social"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="BlueSky"
      >
        <img src={blueskyIcon} alt="BlueSky" width={40} height={40} />
      </a>
      <a
        href="https://www.tiktok.com/@crismile_games"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <img src={tiktokIcon} alt="TikTok" width={40} height={40} />
      </a>

      <a
        href="https://www.instagram.com/crismilegames/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <img src={instagramIcon} alt="Instagram" width={40} height={40} />
      </a>
    </div>
  );
}

export default Socials;
