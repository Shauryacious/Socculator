import joblib
import numpy as np
import pandas as pd
import warnings
import shap
import argparse

# Function to apply custom rounding logic
def custom_round(value):
    fractional_part = value - np.floor(value)
    if fractional_part >= 0.5:
        return np.ceil(value)
    else:
        return np.floor(value)


# Function to predict number of goals for a player based on input parameters
def predict_goals(model, player_name, player_team, opponent_team, is_winner, label_encoder_team, label_encoder_player,
                  stats, explainer):
    warnings.filterwarnings("ignore")
    player_encoded = label_encoder_player.transform([player_name])[0]
    player_team_encoded = label_encoder_team.transform([player_team])[0]
    opponent_team_encoded = label_encoder_team.transform([opponent_team])[0]
    features = [[player_encoded, player_team_encoded, opponent_team_encoded, is_winner]]

    # Predict using the model
    predicted_goals = model.predict(features)

    # Generate SHAP values
    shap_values = explainer.shap_values(features)[0]

    # Generate textual explanation
    explanation = generate_textual_explanation(player_name, player_team, opponent_team, is_winner, predicted_goals[0],
                                               stats, shap_values, features)

    # Handle edge case where player has never played against the opponent team
    if 'Not enough data' in explanation:
        return 0, explanation

    if predicted_goals < 1.25:
        return 0, explanation

    warnings.filterwarnings("ignore")
    return custom_round(predicted_goals[0]), explanation


# Function to generate a human-friendly explanation based on player statistics and SHAP values
# Function to generate a human-friendly explanation based on player statistics and SHAP values
def generate_textual_explanation(player_name, player_team, opponent_team, is_winner, predicted_goals, stats,
                                 shap_values, features):
    if predicted_goals < 1.25:
        predicted_goals = 0
    else:
        predicted_goals = custom_round(predicted_goals)

    # Get player statistics for the specific team and opponent
    player_stats = stats[stats['scorer'] == player_name]
    player_team_stats = player_stats[player_stats['team'] == player_team]
    player_vs_opponent_stats = player_team_stats[(player_team_stats['home_team'] == opponent_team) |
                                                 (player_team_stats['away_team'] == opponent_team)]

    # Check if player has never played against this opponent
    if player_vs_opponent_stats.empty:
        return f"Not enough data: {player_name} has never played against {opponent_team}. Predicted scoring potential: 0"

    # Calculate statistics
    player_matches_in_wins = player_team_stats[player_team_stats['is_winner'] == 1][['date', 'home_team', 'away_team']].drop_duplicates().shape[0]
    player_matches_in_losses = player_team_stats[player_team_stats['is_winner'] == 0][['date', 'home_team', 'away_team']].drop_duplicates().shape[0]
    avg_goals_in_wins = player_team_stats[player_team_stats['is_winner'] == 1].shape[0] / player_matches_in_wins if player_matches_in_wins > 0 else 0
    avg_goals_in_losses = player_team_stats[player_team_stats['is_winner'] == 0].shape[0] / player_matches_in_losses if player_matches_in_losses > 0 else 0

    # SHAP values for human-friendly explanation
    team_shap = shap_values[1]
    opponent_shap = shap_values[2]
    winner_shap = shap_values[3]

    # Translate SHAP values into human-understandable terms
    team_shap_contribution = f"Playing for {player_team} enhances {player_name}'s scoring potential, adding {abs(team_shap):.2f} to their expected performance. This reflects how their team's overall strength positively impacts their game."
    opponent_shap_contribution = f"{opponent_team}'s strong defense lowers {player_name}'s expected impact by {abs(opponent_shap):.2f}. This shows how tough defenses can affect scoring potential."
    winner_shap_contribution = f"The outcome of the match affects {player_name}'s performance potential. If {player_name}'s team wins, it boosts their expected impact by {abs(winner_shap):.2f}. Conversely, if they lose, it might reduce their scoring potential."

    # Prepare explanation based on winning status and SHAP contributions
    if is_winner:
        player_goals = custom_round(avg_goals_in_wins)

        if player_goals > predicted_goals:
            explanation = (
                f"Based on {player_name}'s recent performances with {player_team}, "
                f"{player_name} generally scores {player_goals} goals in wins. "
                f"Given {opponent_team}'s strong defense, the model predicts a scoring potential of {predicted_goals:.2f} for this match.\n"
                f"{team_shap_contribution}\n{opponent_shap_contribution}\n{winner_shap_contribution}"
            )
        else:
            explanation = (
                f"Based on {player_name}'s recent performances with {player_team}, "
                f"{player_name} generally scores {player_goals} goals in wins. "
                f"Considering {player_name}'s aggressive playstyle, the model predicts a scoring potential of {predicted_goals:.2f} for this match.\n"
                f"{team_shap_contribution}\n{opponent_shap_contribution}\n{winner_shap_contribution}"
            )
    else:
        player_goals = custom_round(avg_goals_in_losses)

        if player_goals > predicted_goals:
            explanation = (
                f"Reviewing {player_name}'s recent matches with {player_team}, "
                f"{player_name} generally scores {player_goals} goals in losses. "
                f"Due to {opponent_team}'s solid defense, the model predicts a scoring potential of {predicted_goals:.2f} for this match.\n"
                f"{team_shap_contribution}\n{opponent_shap_contribution}\n{winner_shap_contribution}"
            )
        else:
            explanation = (
                f"Reviewing {player_name}'s recent matches with {player_team}, "
                f"{player_name} generally scores {player_goals} goals in losses. "
                f"Given {player_name}'s historical data, the model predicts a scoring potential of {predicted_goals:.2f} for this match.\n"
                f"{team_shap_contribution}\n{opponent_shap_contribution}\n{winner_shap_contribution}"
            )

    return explanation



# Main function to handle command-line arguments and perform prediction
if __name__ == "__main__":
    # Argument parser setup
    parser = argparse.ArgumentParser(description="Predict the number of goals scored by a player using a trained model")
    parser.add_argument('model_name', type=str, help='The name of the model to load (without .joblib)')
    parser.add_argument('player_name', type=str, help='The name of the player for prediction')
    parser.add_argument('player_team', type=str, help='The name of the player\'s team')
    parser.add_argument('opponent_team', type=str, help='The name of the opponent team')
    parser.add_argument('is_winner', type=int, help='Whether the player\'s team won (1 for yes, 0 for no)')
    args = parser.parse_args()

    # Load the model and encoders dynamically
    model_file = args.model_name + '.joblib'
    model = joblib.load(model_file)
    label_encoder_team = joblib.load('label_encoder_team.joblib')
    label_encoder_player = joblib.load('label_encoder_player.joblib')
    stats = pd.read_csv('goalscorers_with_winner.csv')

    # Initialize SHAP explainer
    explainer = shap.TreeExplainer(joblib.load("xgboost_model.joblib"))

    # Perform prediction
    predicted_goals, explanation = predict_goals(model, args.player_name, args.player_team, args.opponent_team,
                                                 args.is_winner, label_encoder_team, label_encoder_player, stats,
                                                 explainer)

    if args.player_team == args.opponent_team:
        predicted_goals = 0
        explanation = "Both Playing and Opponent team can't be the same."

    # Ignore warnings
    warnings.filterwarnings("ignore")

    # Print the results
    print(f"Predicted goals: {predicted_goals}")
    print(f"Explanation: {explanation}")
