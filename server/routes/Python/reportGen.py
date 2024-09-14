import pandas as pd
import matplotlib.pyplot as plt
import sys
import json

def load_data(file_path):
    # Load the CSV file into a pandas DataFrame
    df = pd.read_csv(file_path)
    # Convert 'date' column to datetime for further analysis
    df['date'] = pd.to_datetime(df['date'])
    return df

def filter_player_data(df, player_name):
    # Filter the DataFrame to only include rows where the scorer is the player of interest
    player_data = df[df['scorer'] == player_name]
    return player_data

def calculate_player_statistics(player_data, df):
    # Total goals
    total_goals = len(player_data)

    # Total own goals (if any)
    own_goals = len(player_data[player_data['own_goal'] == 1])

    # Total penalty goals
    penalty_goals = len(player_data[player_data['penalty'] == 1])

    # Goals in home matches
    home_goals = len(player_data[player_data['team'] == player_data['home_team']])

    # Goals in away matches
    away_goals = total_goals - home_goals

    # Count of goals scored against different teams
    goals_against_teams = player_data['away_team'].value_counts().to_dict()

    # Goals in matches where the team won
    goals_in_wins = len(player_data[player_data['is_winner'] == 1])

    # Goals in matches where the team lost
    goals_in_losses = len(player_data[player_data['is_winner'] == 0])

    # Goals by date (trend over time)
    goals_by_date = player_data.groupby('date').size()

    return {
        'total_goals': total_goals,
        'own_goals': own_goals,
        'penalty_goals': penalty_goals,
        'home_goals': home_goals,
        'away_goals': away_goals,
        'goals_against_teams': goals_against_teams,
        'goals_in_wins': goals_in_wins,
        'goals_in_losses': goals_in_losses,
        'goals_by_date': goals_by_date
    }

def plot_goals_over_time(goals_by_date, player_name):
    # Plot the player's goal trend over time using the Timestamp index
    plt.figure(figsize=(10, 6))
    pd.Series(goals_by_date).plot(kind='line', marker='o', linestyle='-', color='b')
    plt.title(f'Goals over time for {player_name}')
    plt.xlabel('Date')
    plt.ylabel('Goals')
    plt.grid(True)

    # Save the plot as an image (PNG format)
    image_filename = "plot.png"
    plt.savefig(image_filename, format='png')

def main():
    # Get the player name from the command-line arguments
    if len(sys.argv) < 2:
        print("Please provide a player's name as a command-line argument.")
        sys.exit(1)
    player_name = sys.argv[1]

    # Define the file path
    file_path = 'goalscorers_with_winner.csv'  # Replace with the path to your CSV file

    # Step 1: Load the data
    df = load_data(file_path)

    # Step 2: Filter data for the specific player
    player_data = filter_player_data(df, player_name)

    # Step 3: Calculate statistics for the player
    stats = calculate_player_statistics(player_data, df)

    # Step 4: Plot goals over time
    plot_goals_over_time(stats['goals_by_date'], player_name)

    # Step 5: Convert the 'goals_by_date' to a dictionary with formatted string dates for JSON output
    stats['goals_by_date'] = {date.strftime('%Y-%m-%d'): count for date, count in stats['goals_by_date'].items()}

    # Step 6: Output the statistics in JSON format
    json_output = json.dumps(stats, indent=4)  # Convert stats dictionary to JSON string
    print(json_output)  # Print JSON output to console

# Run the main function
if __name__ == "__main__":
    main()
