import React from "react";

function Blog() {
  return (
    <div
      style={{ minHeight: "100vh", background: "#fff", padding: "3rem 1rem" }}
    >
      <h1
        style={{
          fontFamily: "NicoMoji, sans-serif",
          color: "#1e90ff",
          fontSize: "2.5rem",
        }}
      >
        Blog
      </h1>
      <p
        style={{
          fontSize: "1.3rem",
          color: "#6e3d0c",
          maxWidth: 700,
          margin: "2rem auto",
        }}
      >
        Welcome to our blog! Stay tuned for updates, stories, and
        behind-the-scenes insights from Cri Smile Games.
      </p>
      {/* Add blog posts here as you grow! */}
    </div>
  );
}

export default Blog;
