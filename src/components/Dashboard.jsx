import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Menu, Smile, Hash, ArrowUp, ArrowDown } from "lucide-react";
import { ClipLoader } from "react-spinners";

// HTML entity decoding function
const decodeEntities = (str) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (subreddit) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/fetch-reddit?subreddit=${subreddit}&limit=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch Reddit posts");
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts("confessions");
  }, []);

  return (
    <div className="poll-form">
      <div className="form-header">
        <h3>Civitas Dashboard</h3>
      </div>

      <div className="form-section">
        <label className="custom-font">Latest Subreddit Posts</label>
        <div className="poll-type-options">
          <button className="poll-type-btn" onClick={() => fetchPosts("confessions")}>
            <Menu size={16} /> r/confessions
          </button>
          <button className="poll-type-btn" onClick={() => fetchPosts("india")}>
            <Smile size={16} /> r/india
          </button>
          <button className="poll-type-btn" onClick={() => fetchPosts("technology")}>
            <Hash size={16} /> r/technology
          </button>
        </div>
      </div>

      <div className="form-section">
        <h4 className="custom-font">Latest Posts</h4>
        {loading ? (
          <div className="loading-container">
            <ClipLoader color="#4a90e2" size={50} />
          </div>
        ) : (
          posts.length > 0 ? (
            <div className="options-list">
              {posts.map((post, index) => (
                <div key={index} className="post custom-font">
                  <div className="post-header">
                    <h4>{decodeEntities(post.title)}</h4>  {/* Decoded title */}
                  </div>
                  <div className="post-content">
                    <p>{decodeEntities(post.text)}</p>  {/* Decoded content */}
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="read-more">
                      Read more
                    </a>
                  </div>
                  <div className="post-footer">
                    <div className="vote-count">
                      <ArrowUp size={16} className="upvote-icon" />
                      <span className="upvotes">{post.upvotes}</span>
                      <ArrowDown size={16} className="downvote-icon" />
                      <span className="downvotes">{post.downvotes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-posts-message custom-font">
              <p>No posts available.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;