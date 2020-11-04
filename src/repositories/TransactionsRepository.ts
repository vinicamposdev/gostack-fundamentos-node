import Transaction from '../models/Transaction';

import { Balance } from '../dtos/Balance';

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(data: Transaction[]): Balance {
    const income = data
      .filter(t => t.type === 'income')
      .reduce((a, i) => {
        return i.value + a;
      }, 0);

    const outcome = data
      .filter(t => t.type === 'outcome')
      .reduce((a, i) => {
        return i.value + a;
      }, 0);
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(data: Omit<Transaction, 'id'>): Transaction {
    return this.getBalance(
      ((): Transaction[] => {
        this.transactions.push(new Transaction(data));
        return this.transactions;
      })(),
    ).total >= 0
      ? this.transactions[this.transactions.length - 1]
      : (() => {
          throw new Error("You don't have money to do that");
        })();
  }
}

export default TransactionsRepository;
