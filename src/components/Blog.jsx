import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Blog.css";

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
    <div className="blog-container">
      <div className="blog-wrapper">
        <h1 className="blog-title">Blog</h1>

        {loading ? (
          <p className="loading-text">Loading post...</p>
        ) : (
          <div className="blog-post-content">
            <ReactMarkdown>{postContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
