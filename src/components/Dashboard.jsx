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
  const [selectedSubreddit, setSelectedSubreddit] = useState("confessions");

  const fetchPosts = async (subreddit) => {
    setSelectedSubreddit(subreddit);
    setLoading(true);

    const maxRetries = 3;  // Retry up to 3 times
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await fetch(`https://civitas-backend.onrender.com/api/fetch-reddit?subreddit=${subreddit}&limit=5`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Reddit posts: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);
        break;  // Exit the loop if successful
      } catch (error) {
        console.error(`Error fetching posts (attempt ${attempt + 1}):`, error);
        attempt++;

        // Wait before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }

    setLoading(false);
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
          <button
            className={`poll-type-btn ${selectedSubreddit === "confessions" ? "selected" : ""}`}
            onClick={() => fetchPosts("confessions")}
          >
            <Menu size={16} /> r/confessions
          </button>
          <button
            className={`poll-type-btn ${selectedSubreddit === "india" ? "selected" : ""}`}
            onClick={() => fetchPosts("india")}
          >
            <Smile size={16} /> r/india
          </button>
          <button
            className={`poll-type-btn ${selectedSubreddit === "technology" ? "selected" : ""}`}
            onClick={() => fetchPosts("technology")}
          >
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