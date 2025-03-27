import React, { useEffect, useState } from "react";
import { SortAsc, SortDesc, Trash2 } from "lucide-react"; // Import icons
import "./ModerationQueue.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const ModerationQueue = () => {
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [unflaggedPosts, setUnflaggedPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isFlaggedCollapsed, setIsFlaggedCollapsed] = useState(false);
  const [isUnflaggedCollapsed, setIsUnflaggedCollapsed] = useState(false);

  const getUnflaggedClass = (score) => {
    if (score <= 40) return "green"; // Clean
    if (score <= 70) return "yellow"; // Borderline hateful
    return "red"; // Severely hateful
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://civitas-backend.onrender.com/flagged");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // Separate flagged and unflagged posts
        const flagged = data.filter(post => post.action === "flagged");
        const unflagged = data.filter(post => post.action === "send_to_gemini");

        setFlaggedPosts(flagged);
        setUnflaggedPosts(unflagged);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const getChartData = (score) => {
    const data = [score, 100 - score];
    const backgroundColor = score <= 40
      ? ['green', 'white']
      : score <= 70
      ? ['#d4a017', 'white'] // Darker yellow for better visibility
      : ['red', 'white'];
    return {
      labels: ['Score', 'Remaining'],
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        borderWidth: 0,
        hoverBorderWidth: 0,
      }],
    };
  };

  const sortPosts = (posts) => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const deletePost = async (postId) => {
    // Optimistically update the UI
    setFlaggedPosts((prev) => prev.filter((post) => post.post_id !== postId));
    setUnflaggedPosts((prev) => prev.filter((post) => post.post_id !== postId));

    try {
      const response = await fetch(`https://civitas-backend.onrender.com/flagged/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      // Revert the UI changes if the API call fails
      await fetchPosts(); // Re-fetch posts to restore the correct state
    }
  };

  const openConfirmModal = (postId) => {
    setPostToDelete(postId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setPostToDelete(null);
  };

  const handleDelete = async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
      closeConfirmModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showConfirmModal) {
        if (event.key === "Enter") {
          handleDelete(); // Confirm deletion on Enter key press
        } else if (event.key === "Escape") {
          closeConfirmModal(); // Close modal on Escape key press
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [showConfirmModal, postToDelete]);

  return (
    <div className="moderation-queue">
      <h1>Moderation Queue</h1>

      <div className="header-container">
        <div className="sort-container">
          <button
            className="sort-button"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? <SortAsc size={20} /> : <SortDesc size={20} />}
            <span className="sort-text">Sort by Time</span>
          </button>
        </div>
      </div>

      <div className="collapsible-box">
        <h2 onClick={() => setIsFlaggedCollapsed(!isFlaggedCollapsed)} className="collapsible-header">
          Flagged Posts {isFlaggedCollapsed ? "▼" : "▲"}
        </h2>
        {!isFlaggedCollapsed && (
          flaggedPosts.length === 0 ? (
            <p className="empty-message">No flagged posts available.</p>
          ) : (
            <div className="card-container">
              {sortPosts(flaggedPosts).map((post, index) => (
                <div key={index} className="card flagged">
                  <div className="post-details">
                    <Trash2
                      className="trash-icon"
                      size={16}
                      onClick={() => openConfirmModal(post.post_id)} // Open custom modal
                    />
                    <h3>{post.label}</h3>
                    <p>{post.text}</p>
                    <p>Score: {post.score.toFixed(2)}</p>
                    <p>Status: <span className="status flagged">Explicit hate speech flagged by MetaHateBERT</span></p>
                    <p>Timestamp: {post.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <div className="collapsible-box">
        <h2 onClick={() => setIsUnflaggedCollapsed(!isUnflaggedCollapsed)} className="collapsible-header">
          Unflagged Posts {isUnflaggedCollapsed ? "▼" : "▲"}
        </h2>
        {!isUnflaggedCollapsed && (
          unflaggedPosts.length === 0 ? (
            <p className="empty-message">No unflagged posts available.</p>
          ) : (
            <div className="card-container">
              {sortPosts(unflaggedPosts).map((post, index) => {
                const score = post.gemini_sentiment?.score || 0;
                const sentimentClass = getUnflaggedClass(score);
                const statusText =
                  score <= 40
                    ? "Positive sentiment"
                    : score <= 70
                    ? "Neutral sentiment"
                    : "Negative sentiment";
                return (
                  <div key={index} className={`card unflagged ${sentimentClass}`}>
                    <div className="card-content">
                      <div className="post-details">
                        <Trash2
                          className="trash-icon"
                          size={16}
                          onClick={() => openConfirmModal(post.post_id)} // Open custom modal
                        />
                        <h3>Sentiment: {post.gemini_sentiment?.sentiment || "N/A"}</h3>
                        <p>{post.text}</p>
                        <p>Status: <span className={`status ${sentimentClass}`}>{statusText}</span></p>
                        <p>Timestamp: {post.timestamp}</p>
                      </div>
                      <div className="chart-container">
                        <Doughnut
                          data={getChartData(score)}
                          options={{
                            responsive: true,
                            cutout: '80%', // Reduce the size of the donut chart
                            plugins: { legend: { display: false } }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleDelete}>Delete</button>
              <button className="cancel-button" onClick={closeConfirmModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerationQueue;
