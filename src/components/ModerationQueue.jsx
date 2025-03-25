import React, { useEffect, useState } from "react";
import "./ModerationQueue.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const ModerationQueue = () => {
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [unflaggedPosts, setUnflaggedPosts] = useState([]);

  const getUnflaggedClass = (score) => {
    if (score <= 40) return "green"; // Clean
    if (score <= 70) return "yellow"; // Borderline hateful
    return "red"; // Severely hateful
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://backend-14zy.onrender.com/flagged");
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

  return (
    <div className="moderation-queue">
      <h1>Moderation Queue</h1>

      <h2>Flagged Posts</h2>
      {flaggedPosts.length === 0 ? (
        <p>No flagged posts available.</p>
      ) : (
        <div className="card-container">
          {flaggedPosts.map((post, index) => (
            <div key={index} className="card flagged">
              <div className="post-details">
                <h3>{post.label}</h3>
                <p>{post.text}</p>
                <p>Score: {post.score.toFixed(2)}</p>
                <p>Status: <span className="status flagged">Explicit hate speech flagged by MetaHateBERT</span></p>
                <p>Timestamp: {post.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Unflagged Posts</h2>
      {unflaggedPosts.length === 0 ? (
        <p>No unflagged posts available.</p>
      ) : (
        <div className="card-container">
          {unflaggedPosts.map((post, index) => {
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
      )}
    </div>
  );
};

export default ModerationQueue;
