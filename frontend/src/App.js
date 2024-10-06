import React from 'react';
import CompanyCard from './components/CompanyCard';
import './styles.css';

const companies = [
  { name: 'Apple Inc.', ticker: 'AAPL' },
  { name: 'Microsoft Corporation', ticker: 'MSFT' },
  { name: 'Amazon.com, Inc.', ticker: 'AMZN' },
  { name: 'Alphabet Inc.', ticker: 'GOOGL' },
  { name: 'Facebook, Inc.', ticker: 'FB' },
  // Add more companies as needed...
];

function App() {
  return (
    <div className="App">
      <h1>Stock Price Predictor</h1>
      <div className="company-list">
        {companies.map((company) => (
          <CompanyCard key={company.ticker} company={company} />
        ))}
      </div>
    </div>
  );
}

export default App;
