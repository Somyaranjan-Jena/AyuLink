import pandas as pd
from sklearn.linear_model import LinearRegression
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- 1. Train the Model ---
# Load the dataset
data = pd.read_csv('quality_data.csv')
X = data[['soil_ph', 'rainfall_mm', 'sunlight_hours']]
y = data['quality_score']

# Create and train a simple Linear Regression model
model = LinearRegression()
model.fit(X, y)
print("✅ AI Model trained successfully!")

# --- 2. Create the API ---
app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    input_data = request.json
    df = pd.DataFrame(input_data, index=[0])

    # Make a prediction
    prediction = model.predict(df)

    # Return the prediction as a JSON response
    return jsonify({'quality_score': round(prediction[0], 2)})

if __name__ == '__main__':
    # Run the Flask server on port 5000
    app.run(port=5000)