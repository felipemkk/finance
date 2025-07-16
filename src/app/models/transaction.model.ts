// Interface para uso interno (frontend)
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
  createdAt: Date;
}

// Interface para compatibilidade com a API do backend
export interface ApiTransaction {
  id?: number;
  user_id?: number;
  type: 'income' | 'expense';
  category?: string;
  amount: number;
  description?: string;
  transaction_date: string;
  created_at?: string;
}

// Interface para dados locais (financial.service)
export interface LocalMonthlyBalance {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactions: Transaction[];
}

// Interface para dados da API
export interface MonthlyBalance {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactions: ApiTransaction[];
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}
