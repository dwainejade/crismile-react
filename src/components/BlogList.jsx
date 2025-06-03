import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogList.css";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call or file system reading
    const mockPosts = [
      {
        id: "welcome",
        title:
          "Welcome to Cri Smile Games: Our Game Development Journey Begins",
        excerpt:
          "We're excited to share our journey of creating amazing games with you. Join us as we embark on this incredible adventure of building meaningful gaming experiences that bring joy to players worldwide.",
        date: "2025-01-15",
        author: "Cri Smile Games Team",
        tags: ["announcement", "welcome"],
        featured: true,
      },
      {
        id: "development-update-1",
        title: "Development Update #1: Progress on Our First Game",
        excerpt:
          "Here's what we've been working on lately. From concept art to gameplay mechanics, we're making great progress on our debut title and can't wait to share more details with you.",
        date: "2025-01-10",
        author: "Dev Team",
        tags: ["development", "update"],
      },
      {
        id: "behind-the-scenes",
        title: "Behind the Scenes: Our Creative Process and Design Philosophy",
        excerpt:
          "Ever wondered how we come up with our game ideas? Take a peek behind the curtain and see how the magic happens, from initial brainstorming to final implementation.",
        date: "2025-01-05",
        author: "Creative Team",
        tags: ["process", "creativity"],
      },
      {
        id: "team-spotlight",
        title: "Team Spotlight: Meet the Developers Behind Our Games",
        excerpt:
          "Get to know the talented individuals who are bringing our games to life. Each team member brings something unique to our creative process and development workflow.",
        date: "2024-12-28",
        author: "HR Team",
        tags: ["team", "spotlight"],
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

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

        {loading ? (
          <p className="loading-text">Loading posts...</p>
        ) : posts.length === 0 ? (
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
