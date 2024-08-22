def get(secret_number, guess):
    correct_pos = 0 
    correct_dig = 0
    
    for i in range(len(secret_number)):
        if guess[i] == secret_number[i]:
            correct_pos += 1
        elif guess[i] in secret_number:
            correct_dig += 1
    
    return correct_dig, correct_pos
    
    
def play(secret_number):
    attempts = 0
    
    while True:
        guess = input("Enter your guess: ")
        attempts += 1
        
        if guess == secret_number:
            print(f'Congrats, you have guessed the number in {attempts} attempts')
            return attempts
        
        correct_dig, correct_pos = get(secret_number, guess)
        print(f"Hint: {correct_pos} digits are correct and in the right position.")
        print(f"{correct_dig} digits are correct but in the wrong position.")
  

def mastermind():
    print("Hey!! Welcome to the MasterMind Game\n\n")
    
    # Player 1's turn to set the number
    print("Player 1: Enter your multi-digit secret number: ")
    p1_secret = input("Enter number: ")
    
    # Player 2 guesses Player 1's number
    print("Player 2: Try to guess Player 1's secret number")
    p1_attempts = play(p1_secret)
    
    # Player 2's turn to set the number
    print("Player 2: Enter your multi-digit secret number: ")
    p2_secret = input("Enter number: ")
    
    # Player 1 guesses Player 2's number
    print("Player 1: Try to guess Player 2's secret number")
    p2_attempts = play(p2_secret)

    # Determine the winner
    if p1_attempts < p2_attempts:
        print("Player 1 is crowned MasterMind!")
    elif p1_attempts > p2_attempts:
        print("Player 2 is crowned MasterMind!")
    else:
        print("It's a tie! Both players are MasterMinds!")
        
if __name__ == "__main__":
    mastermind()