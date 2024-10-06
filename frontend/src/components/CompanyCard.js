import React, { useState } from 'react';

function CompanyCard({ company }) {
  const [timeframe, setTimeframe] = useState('1h');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const predictStock = () => {
    setLoading(true);
    setPrediction('');

    const requestData = {
      symbol: company.ticker,
      timeframe: timeframe,
    };

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include credentials if needed
        // 'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Check if the response is OK
        if (!response.ok) {
          // Check if the response is JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json().then((error) => {
              throw new Error(error.error || 'An error occurred.');
            });
          } else {
            throw new Error(`Server Error ${response.status}: ${response.statusText}`);
          }
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setPrediction(`Predicted Price: $${parseFloat(data.price).toFixed(2)}`);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
        setPrediction(`Error: ${error.message}`);
      });
  };

  return (
    <div className="company-card">
      <h2>{`${company.name} (${company.ticker})`}</h2>
      <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
        <option value="1h">1 Hour</option>
        <option value="1d">1 Day</option>
      </select>
      <button onClick={predictStock} disabled={loading}>
        {loading ? 'Predicting...' : 'Predict Price'}
      </button>
      {prediction && <div className="prediction-result">{prediction}</div>}
    </div>
  );
}

export default CompanyCard;
