import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load the data
df = pd.read_csv("tariff_data.csv")
df["Time_Block_Start"] = df["Time_Block"].str.split("-").str[0]
df["Time_Block_Hour"] = df["Time_Block_Start"].str.split(":").str[0].astype(int)

# Features and target
X = df[["Time_Block_Hour"]]
y = df["Tariff"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "tariff_model.pkl")
