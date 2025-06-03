import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function Blog() {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, load the sample post. In the future, you can list and select posts.
    fetch("/src/posts/welcome.md")
      .then((res) => res.text())
      .then((text) => {
        setPostContent(text);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9fb",
        padding: "3rem 1rem",
        fontFamily: "Dongle, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 4px 24px rgba(30,144,255,0.08)",
          padding: "2.5rem 2rem 3rem 2rem",
          border: "1px solid #e3e8f0",
        }}
      >
        <h1
          style={{
            fontFamily: "NicoMoji, sans-serif",
            color: "#1e90ff",
            fontSize: "2.7rem",
            marginBottom: "0.5rem",
            letterSpacing: 1.5,
            textAlign: "center",
          }}
        >
          Blog
        </h1>
        {loading ? (
          <p
            style={{
              textAlign: "center",
              color: "#aaa",
              fontSize: "1.3rem",
            }}
          >
            Loading post...
          </p>
        ) : (
          <div
            style={{
              maxWidth: 700,
              margin: "2rem auto 0 auto",
              color: "#222",
              fontSize: "1.35rem",
              lineHeight: 1.7,
              background: "#f7faff",
              borderRadius: 12,
              padding: "2rem 1.5rem",
              boxShadow: "0 2px 8px rgba(30,144,255,0.04)",
            }}
            className="blog-post-content"
          >
            <ReactMarkdown
              components={{
                h1: (props) => (
                  <h1
                    style={{
                      color: "#1e90ff",
                      fontSize: "2.2rem",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2
                    style={{
                      color: "#1e90ff",
                      fontSize: "1.7rem",
                      marginTop: "1.5rem",
                      marginBottom: "0.8rem",
                    }}
                    {...props}
                  />
                ),
                p: (props) => <p style={{ margin: "1.1rem 0" }} {...props} />,
                li: (props) => (
                  <li
                    style={{
                      margin: "0.5rem 0",
                      paddingLeft: "0.2rem",
                    }}
                    {...props}
                  />
                ),
                code: (props) => (
                  <code
                    style={{
                      background: "#e3e8f0",
                      borderRadius: 4,
                      padding: "0.2em 0.4em",
                      fontSize: "1.1em",
                    }}
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    style={{
                      paddingLeft: "1.5em",
                      margin: "1rem 0",
                    }}
                    {...props}
                  />
                ),
                blockquote: (props) => (
                  <blockquote
                    style={{
                      borderLeft: "4px solid #1e90ff",
                      background: "#eaf6ff",
                      margin: "1.5rem 0",
                      padding: "1rem 1.5rem",
                      borderRadius: 8,
                      color: "#444",
                    }}
                    {...props}
                  />
                ),
                a: (props) => (
                  <a
                    style={{
                      color: "#1e90ff",
                      textDecoration: "underline",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {postContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
