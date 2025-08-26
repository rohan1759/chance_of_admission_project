import React, { useState } from 'react';
import './App.css';   // Import CSS here

function App() {
  const [form, setForm] = useState({
    GRE_Score: 320,
    TOEFL_Score: 110,
    University_Rating: 3,
    SOP: 3.5,
    LOR: 3.0,
    CGPA: 8.5,
    Research: 1
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setResult(data);
  }

  return (
    <div className="container">
      <h2 className="title">Chance of Admission Predictor</h2>
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(form).map(k => (
          <div key={k} className="form-group">
            <label className="label">{k}:</label>
            <input 
              name={k} 
              value={form[k]} 
              onChange={handleChange} 
              className="input"
            />
          </div>
        ))}
        <button type="submit" className="btn">Predict</button>
      </form>

      {result && (
        <div className="result">
          {result.error ? (
            <div className="error">Error: {result.error}</div>
          ) : (
            <div className="success">
              Predicted Chance of Admission: 
              <strong> {(result.chance_of_admit*100).toFixed(2)}%</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
