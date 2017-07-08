export class Transaction {
  constructor(
    public date: number[],
    public type: string,
    public amount: number,
    public categoryCode: number,
    public kind?: string,
  ) {}
}

export const TransactionType = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
}

export const TransactionKind = {
  1: 'Bills & Direct Debits',
  2: 'Saving goal payments',
  3: 'Loan payoff',
}
