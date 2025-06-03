import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./Blog.css"; // Reuse the existing blog post styles

function BlogPost() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");
  const [postMeta, setPostMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock post metadata - replace with actual API call
        const mockPostMeta = {
          welcome: {
            title: "Welcome to Cri Smile Games!",
            date: "2025-01-15",
            tags: ["announcement", "welcome"],
            author: "Cri Smile Games Team",
          },
          "development-update-1": {
            title: "Development Update #1",
            date: "2025-01-10",
            tags: ["development", "update"],
            author: "Dev Team",
          },
          "behind-the-scenes": {
            title: "Behind the Scenes: Our Creative Process",
            date: "2025-01-05",
            tags: ["process", "creativity"],
            author: "Creative Team",
          },
          "team-spotlight": {
            title: "Team Spotlight: Meet Our Developers",
            date: "2024-12-28",
            tags: ["team", "spotlight"],
            author: "HR Team",
          },
        };

        const meta = mockPostMeta[id];
        if (!meta) {
          setError("Post not found");
          setLoading(false);
          return;
        }

        setPostMeta(meta);

        // Try to load the actual markdown file
        try {
          const response = await fetch(`/src/posts/${id}.md`);
          if (!response.ok) {
            throw new Error("Post file not found");
          }
          const content = await response.text();
          setPostContent(content);
        } catch (fetchError) {
          // Fallback content if file doesn't exist
          const fallbackContent = `# ${meta.title}

Thank you for your interest in this post! We're currently working on bringing you quality content.

This post will cover exciting topics related to our game development journey. Stay tuned for updates!

## What to Expect

- Behind-the-scenes insights
- Development progress updates  
- Team insights and stories
- Technical deep-dives

## Stay Connected

Make sure to subscribe to our newsletter to get notified when new posts are published.

---

*Published on ${new Date(meta.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}*`;

          setPostContent(fallbackContent);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load post");
        setLoading(false);
        console.error("Error loading post:", err);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="blog-wrapper">
          <p className="loading-text">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !postMeta) {
    return (
      <div className="blog-container">
        <div className="blog-wrapper">
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h2
              style={{
                color: "#1e90ff",
                fontSize: "2.2rem",
                marginBottom: "1rem",
              }}
            >
              Post Not Found
            </h2>
            <p
              style={{
                fontSize: "1.4rem",
                color: "#6e3d0c",
                marginBottom: "2rem",
              }}
            >
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              style={{
                color: "#1e90ff",
                fontSize: "1.3rem",
                textDecoration: "none",
                border: "2px solid #1e90ff",
                padding: "0.8rem 1.5rem",
                borderRadius: "25px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#1e90ff";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#1e90ff";
              }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-wrapper">
        {/* Back to blog link */}
        <div style={{ marginBottom: "2rem" }}>
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <div className="post-header">
          <div className="post-meta-top">CRI SMILE GAMES</div>

          <h1 className="post-title">{postMeta.title}</h1>

          <div className="post-meta">
            <span className="blog-post-date">{formatDate(postMeta.date)}</span>
            {postMeta.author && (
              <span className="post-author">{postMeta.author}</span>
            )}
          </div>

          {postMeta.tags && postMeta.tags.length > 0 && (
            <div className="post-tags">
              {postMeta.tags.map((tag) => (
                <span key={tag} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post content */}
        <div className="blog-post-content">
          <ReactMarkdown>{postContent}</ReactMarkdown>
        </div>

        {/* Post footer */}
        {/* <div className="post-footer">
          <p>
            Thanks for reading! Stay tuned for more updates from our game
            development journey.
          </p>

          <Link to="/blog" className="back-to-all-posts">
            ← Back to All Posts
          </Link>
        </div> */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "2px solid rgba(30, 144, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.3rem",
              color: "#6e3d0c",
              marginBottom: "1.5rem",
            }}
          >
            Thanks for reading! Stay tuned for more updates from our game
            development journey.
          </p>

          <Link
            to="/blog"
            style={{
              color: "#1e90ff",
              fontSize: "1.3rem",
              textDecoration: "none",
              border: "2px solid #1e90ff",
              padding: "0.8rem 1.5rem",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#1e90ff";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#1e90ff";
            }}
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
