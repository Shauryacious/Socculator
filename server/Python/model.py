import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error
import joblib

# Load the CSV
file_path = 'goalscorers_with_winner.csv'
df = pd.read_csv(file_path)

# Create a new column to count the number of goals scored by each player in each match
df['goals'] = df.groupby(['date', 'team', 'scorer'])['scorer'].transform('count')

# Drop rows where the 'goals' column is NaN
df = df.dropna(subset=['goals'])

# Encode categorical columns (team names and player name) into numerical values
label_encoder_team = LabelEncoder()
label_encoder_player = LabelEncoder()

df['team_encoded'] = label_encoder_team.fit_transform(df['team'])
df['opponent_team'] = df.apply(lambda row: row['away_team'] if row['team'] == row['home_team'] else row['home_team'], axis=1)
df['opponent_team_encoded'] = label_encoder_team.fit_transform(df['opponent_team'])
df['player_encoded'] = label_encoder_player.fit_transform(df['scorer'])

# Features: player name, player's team, opponent team, and whether their team won
X = df[['player_encoded', 'team_encoded', 'opponent_team_encoded', 'is_winner']]

# Target: number of goals scored by the player
y = df['goals']

# Split the dataset into training and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Support Vector Regression model
model = SVR(kernel='rbf', C=1.0, epsilon=0.1)
model.fit(X_train, y_train)

# Evaluate the model performance
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"SVR Mean Squared Error: {mse}")

# Export the model and the label encoders
joblib.dump(model, 'svr_model.joblib')
joblib.dump(label_encoder_team, 'label_encoder_team.joblib')
joblib.dump(label_encoder_player, 'label_encoder_player.joblib')

print("Model and encoders saved successfully!")
