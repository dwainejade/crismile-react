const GITHUB_CONFIG = {
  owner: "dwainejade",
  repo: "cri-smile-blog-content",
  branch: "main",
  postsPath: "posts",
};

export const githubBlogService = {
  // Get all posts metadata from index.json
  async getAllPosts() {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/posts/index.json`
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch posts index:",
          response.status,
          response.statusText
        );
        // Return fallback data if GitHub is down or repo doesn't exist yet
        return this.getFallbackPosts();
      }

      const data = await response.json();

      // Sort by date (newest first) and ensure proper format
      return data.posts
        .map((post) => ({
          ...post,
          date: new Date(post.date).toISOString(), // Ensure consistent date format
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      console.error("Error fetching posts from GitHub:", error);
      // Return fallback data on error
      return this.getFallbackPosts();
    }
  },

  // Get single post content by ID
  async getPostById(postId) {
    try {
      // First get the post metadata from the index
      const posts = await this.getAllPosts();
      const postMeta = posts.find((post) => post.id === postId);

      if (!postMeta) {
        console.error(`Post with ID "${postId}" not found in index`);
        return null;
      }

      // Then fetch the markdown content
      const response = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/posts/${postId}.md`
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch post content for "${postId}":`,
          response.status
        );
        return null;
      }

      const content = await response.text();

      return {
        ...postMeta,
        content,
      };
    } catch (error) {
      console.error(`Error fetching post "${postId}":`, error);
      return null;
    }
  },

  // Fallback posts data (used when GitHub is unreachable)
  getFallbackPosts() {
    return [
      {
        id: "welcome-to-cri-smile",
        title:
          "Welcome to Cri Smile Games: Our Game Development Journey Begins",
        excerpt:
          "We're excited to share our journey of creating amazing games with you. Join us as we embark on this incredible adventure of building meaningful gaming experiences that bring joy to players worldwide.",
        author: "Cri Smile Games Team",
        date: "2025-01-15",
        tags: ["announcement", "welcome"],
        featured: true,
      },
      {
        id: "development-update-1",
        title: "Development Update #1: Progress on Our First Game",
        excerpt:
          "Here's what we've been working on lately. From concept art to gameplay mechanics, we're making great progress on our debut title and can't wait to share more details with you.",
        author: "Dev Team",
        date: "2025-01-10",
        tags: ["development", "update"],
        featured: false,
      },
    ];
  },
};

// Configuration helper - you can call this to update the config
export const updateGitHubConfig = (newConfig) => {
  Object.assign(GITHUB_CONFIG, newConfig);
};
