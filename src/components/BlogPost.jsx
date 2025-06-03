import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { githubBlogService } from "../services/githubBlogService";
import "./Blog.css";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPost = await githubBlogService.getPostById(id);

        if (!fetchedPost) {
          setError("Post not found");
        } else {
          setPost(fetchedPost);
        }
      } catch (err) {
        setError("Failed to load post");
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
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
          <div style={{ marginBottom: "2rem" }}>
            <Link to="/blog" className="back-to-blog">
              ← Back to Blog
            </Link>
          </div>
          <p className="loading-text">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-container">
        <div className="blog-wrapper">
          <div style={{ marginBottom: "2rem" }}>
            <Link to="/blog" className="back-to-blog">
              ← Back to Blog
            </Link>
          </div>

          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h2
              style={{
                color: "#1e90ff",
                fontSize: "2.2rem",
                marginBottom: "1rem",
              }}
            >
              {error === "Post not found"
                ? "Post Not Found"
                : "Error Loading Post"}
            </h2>
            <p
              style={{
                fontSize: "1.4rem",
                color: "#5f6368",
                marginBottom: "2rem",
              }}
            >
              {error === "Post not found"
                ? "The blog post you're looking for doesn't exist or has been moved."
                : "There was an error loading this post. Please try again later."}
            </p>
            <Link to="/blog" className="back-to-all-posts">
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
        <div style={{ marginBottom: "2rem" }}>
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </div>

        <div className="post-header">
          <div className="post-meta-top">CRI SMILE GAMES</div>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="blog-post-date">{formatDate(post.date)}</span>
            {post.author && <span className="post-author">{post.author}</span>}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="blog-post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="post-footer">
          <p>
            Thanks for reading! Stay tuned for more updates from our game
            development journey.
          </p>

          <Link to="/blog" className="back-to-all-posts">
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
