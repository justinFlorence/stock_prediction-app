from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime, timedelta

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# If you need to handle CORS (Cross-Origin Resource Sharing)
# from flask_cors import CORS
# CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Input validation
    symbol = data.get('symbol')
    timeframe = data.get('timeframe')

    if not symbol or not timeframe:
        return jsonify({'error': 'Symbol and timeframe are required.'}), 400

    if timeframe not in ['1h', '1d']:
        return jsonify({'error': 'Invalid timeframe. Choose "1h" or "1d".'}), 400

    try:
        # Fetch historical stock data
        df = fetch_stock_data(symbol, timeframe)

        if df.empty:
            return jsonify({'error': 'No data found for the given symbol.'}), 404

        # Apply ARIMA model
        predicted_price = arima_predict(df, timeframe)

        return jsonify({'price': predicted_price}), 200

    except Exception as e:
        # Log the exception (in real applications, consider logging to a file)
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during prediction.'}), 500

def fetch_stock_data(symbol, timeframe):
    # Determine the period and interval based on timeframe
    if timeframe == '1h':
        period = '1d'
        interval = '1m'
    elif timeframe == '1d':
        period = '1mo'
        interval = '30m'

    # Fetch data using yfinance
    df = yf.download(tickers=symbol, period=period, interval=interval)

    return df

def arima_predict(df, timeframe):
    # Use the 'Close' price for prediction
    close_prices = df['Close']

    # Difference the data to make it stationary
    differenced = close_prices.diff().dropna()

    # Fit the ARIMA model (p=5, d=1, q=0) as an example
    model = ARIMA(differenced, order=(5, 0, 0))
    model_fit = model.fit()

    # Determine the number of steps to forecast
    if timeframe == '1h':
        steps = 60  # Assuming 1-minute intervals for 1 hour
    elif timeframe == '1d':
        steps = 13  # Assuming 30-minute intervals for 1 day (6.5 hours trading)

    # Forecast future prices
    forecast_diff = model_fit.forecast(steps=steps)
    last_close = close_prices.iloc[-1]
    forecast = last_close + forecast_diff.cumsum()

    # Return the last predicted price
    predicted_price = forecast.iloc[-1]

    return predicted_price

if __name__ == '__main__':
    app.run(debug=True)
