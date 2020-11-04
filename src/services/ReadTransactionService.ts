import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { Balance } from '../dtos/Balance';

interface IGetTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): IGetTransactions {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance(transactions);

    return { transactions, balance };
  }
}

export default CreateTransactionService;
