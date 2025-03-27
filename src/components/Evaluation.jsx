import React, { useState } from "react";
import "./Evaluation.css";
import { ClipLoader } from "react-spinners";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Trash } from 'lucide-react'; // Import the Trash icon

ChartJS.register(ArcElement, Tooltip, Legend);

const Evaluation = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setLoading(true);

    try {
      const res = await fetch("https://civitas-backend.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (score) => {
    const chartData = {
      labels: ["Score", "Remaining"],
      datasets: [
        {
          data: [score, 100 - score],
          backgroundColor: ["#4caf50", "#e0e0e0"],
          hoverBackgroundColor: ["#45a049", "#d6d6d6"],
        },
      ],
    };

    return (
      <div className="chart-container">
        <Doughnut
          data={chartData}
          options={{
            cutout: "80%",
            plugins: {
              tooltip: { enabled: false },
              legend: { display: false },
            },
          }}
        />
        <div className="chart-label">{score.toFixed(0)}%</div>
      </div>
    );
  };

  const getGeminiColor = (score) => {
    if (score >= 70) return "#ff4d4d"; // Red for highly hateful
    if (score >= 40) return "#ffc107"; // Yellow for moderately hateful
    return "#4caf50"; // Green for clean
  };

  return (
    <div className="evaluation-container">
      <header className="evaluation-header">
        <h1 className="evaluation-title gradient-title">Evaluation</h1>
      </header>

      <form onSubmit={handleSubmit} className="evaluation-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze"
          rows="4"
          className="evaluation-textarea"
        />
        <button type="submit" className="evaluation-button" disabled={loading}>
          {loading ? <ClipLoader color="#4a90e2" size={20} /> : "Analyze"}
        </button>
      </form>

      {response && (
        <div className="result-cards-container">
          {/* Flagged Post */}
          {response.label === "LABEL_1" ? (
            <div className="card flagged-card" style={{ textAlign: "center", padding: "20px" }}>
              <h2 className="card-title">🚩 Flagged Post</h2>
              <p>This post was flagged by MetaHateBERT for hate speech.</p>
              <div className="score-section" style={{ display: "flex", justifyContent: "center" }}>
                {renderChart(response.score)}
              </div>
            </div>
          ) : (
            // Gemini Analysis
            response.gemini_sentiment && (
              <div
                className="card sentiment-card"
                style={{
                  backgroundColor: getGeminiColor(response.gemini_score),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Trash className="trash-icon" /> {/* Add trash icon here */}
                <h2 className="card-title" style={{ textAlign: "center" }}>
                  ✨ Gemini Sentiment Analysis
                </h2>
                <div
                  className="sentiment-content"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Sentiment:</strong> {String(response.gemini_sentiment.sentiment)}
                  </p>
                  {renderChart(response.gemini_score)}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {error && <p className="evaluation-error">{error}</p>}
    </div>
  );
};

export default Evaluation;