import React, { useState } from "react";
import "./Evaluation.css";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

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
      const res = await fetch("http://127.0.0.1:8000/analyze", {
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
          {loading ? <ClipLoader color="#4a90e2" size={50} /> : "Analyze"}
        </button>
      </form>

      {loading && (
        <div className="loading-container">
          <ClipLoader color="#4a90e2" size={50} /> {/* Replace spinner */}
          <p>Analyzing...</p>
        </div>
      )}

      {response && (
        <div className="evaluation-card">
          <h2 className="result-title">Analysis Result</h2>
          {console.log(response)}
          {response.label === "LABEL_1" ? (
            <div className="flagged-section">
              <h3>Post Flagged</h3>
              <p>This post was flagged by MetaHateBERT for hate speech.</p>
              <div className="meta-score-details">
                <p><strong>Score:</strong> {String(response.score)}</p>
              </div>
            </div>
          ) : (
            response.gemini_sentiment && (
              <div className="sentiment-details">
                <p>
                  <strong>Sentiment:</strong> {String(response.gemini_sentiment.sentiment)}
                </p>
                <p>
                  <strong>Score:</strong> {String(response.gemini_score)}
                </p>
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
