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
    game_list = ["Rock", "Paper", "Scissors"]
    for i in range(rounds):
        player1_choice = rand.choice(game_list)
        player2_choice = rand.choice(game_list)
        
        print(f"Round {i + 1}:")
        print(f"Player 1 chooses {player1_choice}")
        print(f"Player 2 chooses {player2_choice}")
        
        result = determine_winner(player1_choice, player2_choice)
        print(result)
        print("\n")  # Add a new line for better readability between rounds

if __name__ == "__main__":
    print("Rock Paper Scissors Game\n\n")
    no_of_times = int(input("Enter the Number of Times You Want to Play the Game: "))
    play_game(no_of_times)
