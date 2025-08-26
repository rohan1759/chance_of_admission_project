import React, { useState } from 'react';

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
    <div style={{maxWidth:600, margin:'40px auto', fontFamily:'Arial, sans-serif'}}>
      <h2>Chance of Admission Predictor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map(k => (
          <div key={k} style={{marginBottom:10}}>
            <label>{k}: </label>
            <input name={k} value={form[k]} onChange={handleChange} />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div style={{marginTop:20}}>
          {result.error ? (
            <div style={{color:'red'}}>Error: {result.error}</div>
          ) : (
            <div>Predicted Chance of Admission: <strong>{(result.chance_of_admit*100).toFixed(2)}%</strong></div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;