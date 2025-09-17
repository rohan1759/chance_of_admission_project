import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    GRE_Score: 320,
    TOEFL_Score: 110,
    University_Rating: 3,
    SOP: 3.5,
    LOR: 3.0,
    CGPA: 8.5,
    Research: 1,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Server not responding" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="college-app">
      {/* Simple College Header */}
      <header className="college-header">
        <div className="header-container">
          <div className="college-logo">
            <span className="logo-icon">🎓</span>
            <h1>College Admission Predictor</h1>
          </div>
          <div className="header-info">
            <span>Powered by Machine Learning</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h2>Predict Your Admission Chances</h2>
            <p>Enter your academic details to get an estimate of your admission probability</p>
          </section>

          {/* Form and Results Container */}
          <div className="prediction-container">
            {/* Input Form */}
            <div className="form-section">
              <h3>Academic Information</h3>
              <form onSubmit={handleSubmit} className="admission-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label>GRE Score (260-340)</label>
                    <input
                      name="GRE_Score"
                      value={form.GRE_Score}
                      onChange={handleChange}
                      type="number"
                      className="form-input"
                      min="0"
                      max="340"
                    />
                  </div>

                  <div className="input-group">
                    <label>TOEFL Score (0-120)</label>
                    <input
                      name="TOEFL_Score"
                      value={form.TOEFL_Score}
                      onChange={handleChange}
                      type="number"
                      className="form-input"
                      min="0"
                      max="120"
                    />
                  </div>

                  <div className="input-group">
                    <label>University Rating</label>
                    <select
                      name="University_Rating"
                      value={form.University_Rating}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="1">1 - Basic</option>
                      <option value="2">2 - Good</option>
                      <option value="3">3 - Very Good</option>
                      <option value="4">4 - Excellent</option>
                      <option value="5">5 - Outstanding</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>CGPA (0-10)</label>
                    <input
                      name="CGPA"
                      value={form.CGPA}
                      onChange={handleChange}
                      type="number"
                      step="0.1"
                      className="form-input"
                      min="0"
                      max="10"
                    />
                  </div>

                  <div className="input-group">
                    <label>Statement of Purpose Rating</label>
                    <select
                      name="SOP"
                      value={form.SOP}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="1">1 - Poor</option>
                      <option value="1.5">1.5 - Below Average</option>
                      <option value="2">2 - Average</option>
                      <option value="2.5">2.5 - Above Average</option>
                      <option value="3">3 - Good</option>
                      <option value="3.5">3.5 - Very Good</option>
                      <option value="4">4 - Excellent</option>
                      <option value="4.5">4.5 - Outstanding</option>
                      <option value="5">5 - Perfect</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Letter of Recommendation Rating</label>
                    <select
                      name="LOR"
                      value={form.LOR}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="1">1 - Poor</option>
                      <option value="1.5">1.5 - Below Average</option>
                      <option value="2">2 - Average</option>
                      <option value="2.5">2.5 - Above Average</option>
                      <option value="3">3 - Good</option>
                      <option value="3.5">3.5 - Very Good</option>
                      <option value="4">4 - Excellent</option>
                      <option value="4.5">4.5 - Outstanding</option>
                      <option value="5">5 - Perfect</option>
                    </select>
                  </div>
                </div>

                <div className="research-section">
                  <label>Research Experience</label>
                  <div className="radio-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="Research"
                        value="0"
                        checked={form.Research == 0}
                        onChange={handleChange}
                      />
                      <span>No Research Experience</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="Research"
                        value="1"
                        checked={form.Research == 1}
                        onChange={handleChange}
                      />
                      <span>Has Research Experience</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="loading"></span>
                      Calculating...
                    </>
                  ) : (
                    "Predict Admission Chance"
                  )}
                </button>
              </form>
            </div>

            {/* Results Section */}
            {result && (
              <div className="results-section">
                {result.error ? (
                  <div className="error-message">
                    <h4>Error</h4>
                    <p>{result.error}</p>
                  </div>
                ) : (
                  <div className="success-result">
                    <h4>Your Admission Probability</h4>
                    <div className="probability-display">
                      <div className="probability-number">
                        {(result.chance_of_admit * 100).toFixed(1)}%
                      </div>
                      <div className="probability-bar">
                        <div 
                          className="probability-fill"
                          style={{ width: `${(result.chance_of_admit * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="recommendation">
                      <p>
                        {result.chance_of_admit >= 0.8 ? "🎉 Excellent! You have very strong admission chances." :
                         result.chance_of_admit >= 0.6 ? "✅ Good prospects! Apply to multiple universities." :
                         result.chance_of_admit >= 0.4 ? "📚 Fair chances. Consider improving test scores." :
                         "💪 Keep working! Focus on strengthening your profile."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="college-footer">
        <p>&copy; 2024 College Admission Predictor - Helping students achieve their dreams</p>
      </footer>
    </div>
  );
}

export default App;
