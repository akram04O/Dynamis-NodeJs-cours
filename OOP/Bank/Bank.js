class BankAccount {
  constructor(holderName, balance) {
    this.holderName = holderName;
    this.balance = balance;
  }

  checkBalance() {
    return `The balance for ${this.holderName} is $${this.balance}.`;
  }

  deposit(amount) {
    if (amount <= 50) {
      return `The minimum deposit amount is $50.`;
    } else {
      this.balance += amount;
      return `Deposit successful! New balance for ${this.holderName} is $${this.balance}.`;
    }
  }

  withdraw(amount) {
    if (amount > this.balance) {
      return `Your balance is less then ${amount}.`;
    } else if (amount < 50) {
      return `The minimum withdrawal amount is $50.`;
    } else {
      this.balance -= amount;
      return `Withdrawal successful! New balance for ${this.holderName} is $${this.balance}.`;
    }
  }
}

export default BankAccount;

const account = new BankAccount("Khacha Akram", 1000);
console.log(account.checkBalance());
console.log(account.deposit(30));
console.log(account.deposit(100));
console.log(account.withdraw(20));
console.log(account.withdraw(200));
console.log(account.withdraw(1000));
