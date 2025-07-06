export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
  createdAt: Date;
}

export interface MonthlyBalance {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactions: Transaction[];
}

export interface Category {
  id: string;
  name: string;
  color?: string;
} 