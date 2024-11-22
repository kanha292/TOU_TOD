import joblib
import json

# Load the model
model = joblib.load("tariff_model.pkl")

# Export feature importances for reference
model_data = {
    "estimators": [tree.tree_ for tree in model.estimators_],
    "feature_importances": model.feature_importances_.tolist(),
    "n_features": model.n_features_in_,
}

# Save the model data as JSON
with open("tariff_model.json", "w") as f:
    json.dump(model_data, f)
