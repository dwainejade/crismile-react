import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { githubBlogService } from "../services/githubBlogService";
import "./BlogList.css";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await githubBlogService.getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to load blog posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="blog-list-wrapper">
          <div className="blog-list-header">
            <h1 className="blog-list-title">Our Blog</h1>
            <p className="blog-list-subtitle">
              Follow our game development journey and latest updates
            </p>
          </div>
          <p className="loading-text">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="blog-list-container">
        <div className="blog-list-wrapper">
          <div className="blog-list-header">
            <h1 className="blog-list-title">Our Blog</h1>
            <p className="blog-list-subtitle">
              Follow our game development journey and latest updates
            </p>
          </div>
          <div className="no-posts-message">
            <p>{error}</p>
            <p>
              Please check back later or contact us if the problem persists.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderPostCard = (post, index) => (
    <Link
      to={`/blog/${post.id}`}
      className={`blog-post-card ${post.featured ? "featured" : ""}`}
      key={post.id}
    >
      <div className="blog-post-meta-top">CRI SMILE GAMES</div>

      <h2 className="blog-post-title">{post.title}</h2>
      <p className="blog-post-excerpt">{post.excerpt}</p>

      <div className="blog-post-meta">
        <span className="blog-post-date">{formatDate(post.date)}</span>
        {post.author && <span className="blog-post-author">{post.author}</span>}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="blog-post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="blog-post-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );

  return (
    <div className="blog-list-container">
      <div className="blog-list-wrapper">
        <div className="blog-list-header">
          <h1 className="blog-list-title">Our Blog</h1>
          <p className="blog-list-subtitle">
            Follow our game development journey and latest updates
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "2rem",
              color: "#856404",
            }}
          >
            <p>
              <strong>Note:</strong> Using cached blog posts. {error}
            </p>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="no-posts-message">
            <p>No blog posts available yet. Check back soon for updates!</p>
          </div>
        ) : (
          <div className="blog-posts-grid">
            {posts.map((post, index) => renderPostCard(post, index))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
