# Stock Prediction App

A full-stack application that predicts stock prices using an ARIMA model, providing forecasts for either 1 hour or 1 day into the future. This project is divided into two components: a Flask-based backend for handling predictions and a React-based frontend for user interaction.

---

## Features

- Predict stock prices for user-specified companies and timeframes (`1h` or `1d`).
- Fetches historical stock data using Yahoo Finance's API via the `yfinance` library.
- Implements ARIMA time series forecasting for accurate predictions.
- User-friendly React interface to browse companies and view predictions in real time.

---

## Project Structure

```
stock_prediction-app/
├── backend/
│   ├── app.py             # Flask app with prediction logic
│   ├── requirements.txt   # Backend dependencies
├── frontend/
│   ├── App.js             # Main React application
│   ├── components/
│   │   └── CompanyCard.js # Card component to display company info
│   ├── styles.css         # Frontend styles
├── README.md              # Project documentation
```

---

## Backend

The backend is responsible for fetching stock data, applying the ARIMA model, and returning predictions. It is built using Flask and integrates with Yahoo Finance's API.

### Key Features

- **Prediction Endpoint (`POST /predict`)**:
  - Accepts a JSON payload containing:
    - `symbol`: The stock ticker symbol (e.g., `AAPL` for Apple Inc.).
    - `timeframe`: The prediction timeframe (`1h` for one hour or `1d` for one day).
  - Returns a predicted stock price.

- **Error Handling**:
  - Validates input parameters.
  - Returns meaningful error messages for invalid requests or missing data.

### Technologies Used

- **Flask**: Lightweight web framework for Python.
- **yFinance**: Library for fetching historical stock data.
- **Statsmodels**: Implements the ARIMA model for time series analysis.

### Example Request

#### Request

```json
POST /predict
{
  "symbol": "AAPL",
  "timeframe": "1h"
}
```

#### Response

```json
{
  "price": 152.34
}
```

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```
4. The backend will run on `http://127.0.0.1:5000`.

---

## Frontend

The frontend is a React application designed to provide a seamless user interface for interacting with the stock prediction app.

### Features

- Displays a list of popular companies.
- Allows users to select a company and request a prediction for `1h` or `1d`.
- Dynamic updates of predicted stock prices.

### Components

- **`CompanyCard.js`**: Displays information about a company and provides buttons to request predictions.
- **`App.js`**: Main application file that renders the list of companies and integrates components.

### Technologies Used

- **React**: Frontend library for building user interfaces.
- **CSS**: For styling the application.

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The application will run on `http://localhost:3000`.

---

## Getting Started

### Prerequisites

- Python 3.7 or later
- Node.js and npm
- Virtual environment (optional but recommended)

### Running the Full Application

1. Start the backend:
   ```bash
   cd backend
   python app.py
   ```
2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

---

## Future Improvements

- **Enhanced Models**:
  - Experiment with alternative machine learning models for better accuracy.
- **Additional Features**:
  - Include visualizations of historical data and predictions.
- **Deployment**:
  - Deploy the application on cloud services like AWS or Heroku for public use.
- **Authentication**:
  - Add user authentication for saving preferences and personalized predictions.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the application.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- **Yahoo Finance** for providing stock data.
- **Statsmodels** for making time series analysis accessible.
- Open-source contributors for libraries and frameworks used in this project.
```

This README is structured to give a clear overview of the project, its functionality, and how to run it. Let me know if you’d like to refine or expand any specific sections!
