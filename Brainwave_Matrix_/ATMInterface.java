import java.util.Scanner;

public class ATMInterface {
    private double balance;
    private int userID;
    private int userPIN;

    public ATMInterface(int userID, int userPIN) {
        this.userID = userID;
        this.userPIN = userPIN;
        this.balance = 0.0; // Initial balance
    }

    public boolean authenticateUser(int enteredID, int enteredPIN) {
        return this.userID == enteredID && this.userPIN == enteredPIN;
    }

    public void checkBalance() {
        System.out.println("Your current balance is: $" + balance);
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("You have successfully deposited $" + amount);
            checkBalance();
        } else {
            System.out.println("Invalid deposit amount. Please enter a positive number.");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("You have successfully withdrawn $" + amount);
            checkBalance();
        } else if (amount <= 0) {
            System.out.println("Invalid withdrawal amount. Please enter a positive number.");
        } else {
            System.out.println("Insufficient funds. Your current balance is $" + balance);
        }
    }

    private static void showMenu() {
        System.out.println("\nATM Menu:");
        System.out.println("1. Check Balance");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Exit");
    }

    public static void main(String[] args) {
        final int INITIAL_USER_ID = 12345;
        final int INITIAL_USER_PIN = 6789;

        Scanner scanner = new Scanner(System.in);
        ATM myATM = new ATM(INITIAL_USER_ID, INITIAL_USER_PIN); // Example userID and PIN

        System.out.print("Enter your user ID: ");
        while (!scanner.hasNextInt()) {
            System.out.print("Invalid input. Please enter your user ID: ");
            scanner.next(); // Clear invalid input
        }
        int enteredID = scanner.nextInt();

        System.out.print("Enter your PIN: ");
        while (!scanner.hasNextInt()) {
            System.out.print("Invalid input. Please enter your PIN: ");
            scanner.next(); // Clear invalid input
        }
        int enteredPIN = scanner.nextInt();

        if (myATM.authenticateUser(enteredID, enteredPIN)) {
            System.out.println("Welcome to the ATM!");

            boolean running = true;
            while (running) {
                showMenu();
                System.out.print("Choose an option: ");
                while (!scanner.hasNextInt()) {
                    System.out.print("Invalid input. Please choose an option: ");
                    scanner.next(); // Clear invalid input
                }
                int choice = scanner.nextInt();

                switch (choice) {
                    case 1:
                        myATM.checkBalance();
                        break;
                    case 2:
                        System.out.print("Enter the deposit amount: ");
                        while (!scanner.hasNextDouble()) {
                            System.out.print("Invalid input. Please enter the deposit amount: ");
                            scanner.next(); // Clear invalid input
                        }
                        double depositAmount = scanner.nextDouble();
                        myATM.deposit(depositAmount);
                        break;
                    case 3:
                        System.out.print("Enter the withdrawal amount: ");
                        while (!scanner.hasNextDouble()) {
                            System.out.print("Invalid input. Please enter the withdrawal amount: ");
                            scanner.next(); // Clear invalid input
                        }
                        double withdrawAmount = scanner.nextDouble();
                        myATM.withdraw(withdrawAmount);
                        break;
                    case 4:
                        System.out.println("Thank you for using the ATM. Goodbye!");
                        running = false;
                        break;
                    default:
                        System.out.println("Invalid choice. Please try again.");
                        break;
                }
            }
        } else {
            System.out.println("Authentication failed. Please check your user ID and PIN.");
        }
        scanner.close();
    }
}
