# Flask API for predictions
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'models', 'admission_model.pkl'))
model = None

def load_model():
    global model
    if model is None:
        model = joblib.load(MODEL_PATH)
    return model

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [
        data.get('GRE_Score'),
        data.get('TOEFL_Score'),
        data.get('University_Rating'),
        data.get('SOP'),
        data.get('LOR'),
        data.get('CGPA'),
        data.get('Research')
    ]
    try:
        arr = np.array(features, dtype=float).reshape(1, -1)
    except Exception as e:
        return jsonify({'error': 'Invalid input format', 'details': str(e)}), 400

    m = load_model()
    pred = m.predict(arr)[0]
    pred = float(max(0.0, min(1.0, pred)))
    return jsonify({'chance_of_admit': pred})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
