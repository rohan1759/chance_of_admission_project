# train.py - trains a regression model for Chance of Admission
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

DATA_PATH = os.path.join('..', 'data', 'admission_data.csv')
MODEL_PATH = os.path.join('..', 'models', 'admission_model.pkl')

if __name__ == '__main__':
    df = pd.read_csv(DATA_PATH)
    df = df.rename(columns=lambda c: c.strip())
    if 'Serial No.' in df.columns:
        df = df.drop(columns=['Serial No.'])
    df.columns = [c.replace(' ', '_').replace("'", '').replace('.', '') for c in df.columns]
    X = df.drop(columns=[col for col in df.columns if 'Chance' in col])
    y = df[[col for col in df.columns if 'Chance' in col][0]]
    X = X.fillna(X.mean())
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    mse = mean_squared_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    print(f"Test MSE: {mse:.4f}, R2: {r2:.4f}")
    os.makedirs(os.path.join('..', 'models'), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")
