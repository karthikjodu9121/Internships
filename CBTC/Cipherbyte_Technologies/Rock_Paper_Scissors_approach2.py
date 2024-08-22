import random as rand

def determine_winner(player1_choice, player2_choice):
    if player1_choice == player2_choice:
        return "It's a tie! Both players chose the same."

    if (player1_choice == "Rock" and player2_choice == "Paper"):
        return "Paper covers Rock: Player 2 wins the round"
    elif (player1_choice == "Paper" and player2_choice == "Rock"):
        return "Paper covers Rock: Player 1 wins the round"
    elif (player1_choice == "Rock" and player2_choice == "Scissors"):
        return "Rock breaks Scissors: Player 1 wins the round"
    elif (player1_choice == "Scissors" and player2_choice == "Rock"):
        return "Rock breaks Scissors: Player 2 wins the round"
    elif (player1_choice == "Scissors" and player2_choice == "Paper"):
        return "Scissors cut Paper: Player 1 wins the round"
    elif (player1_choice == "Paper" and player2_choice == "Scissors"):
        return "Scissors cut Paper: Player 2 wins the round"

def play_game(rounds):
    valid_choices = ["Rock", "Paper", "Scissors"]
    
    for i in range(rounds):
        print(f"Round {i + 1}:")
        
        # Get player 1's choice
        while True:
            player1_choice = input("Player 1, enter your choice (Rock, Paper, or Scissors): ")
            if player1_choice in valid_choices:
                break
            else:
                print("Invalid choice. Please choose Rock, Paper, or Scissors.")
        
        # Get player 2's choice
        while True:
            player2_choice = input("Player 2, enter your choice (Rock, Paper, or Scissors): ")
            if player2_choice in valid_choices:
                break
            else:
                print("Invalid choice. Please choose Rock, Paper, or Scissors.")
        
        print(f"Player 1 chooses {player1_choice}")
        print(f"Player 2 chooses {player2_choice}")
        
        result = determine_winner(player1_choice, player2_choice)
        print(result)
        print("\n")  # Add a new line for better readability between rounds

if __name__ == "__main__":
    print("Rock Paper Scissors Game\n\n")
    no_of_times = int(input("Enter the number of times you want to play the game: "))
    play_game(no_of_times)
