import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Category,
  MonthlyBalance,
  Transaction,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  private transactions = new BehaviorSubject<Transaction[]>([]);
  private categories = new BehaviorSubject<Category[]>([]);

  constructor() {
    this.loadFromLocalStorage();
    this.initializeDefaultCategories();
  }

  // Métodos para transações
  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): void {
    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateId(),
      createdAt: new Date(),
    };

    const currentTransactions = this.transactions.value;
    this.transactions.next([...currentTransactions, newTransaction]);
    this.saveToLocalStorage();
  }

  deleteTransaction(id: string): void {
    const currentTransactions = this.transactions.value;
    this.transactions.next(currentTransactions.filter((t) => t.id !== id));
    this.saveToLocalStorage();
  }

  // Métodos para categorias
  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  addCategory(category: Omit<Category, 'id'>): void {
    const newCategory: Category = {
      ...category,
      id: this.generateId(),
    };

    const currentCategories = this.categories.value;
    this.categories.next([...currentCategories, newCategory]);
    this.saveToLocalStorage();
  }

  // Métodos para cálculos mensais
  getMonthlyBalance(month: number, year: number): MonthlyBalance {
    const monthTransactions = this.transactions.value.filter(
      (t) => t.date.getMonth() === month && t.date.getFullYear() === year
    );

    const totalIncome = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      year,
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      transactions: monthTransactions.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      ),
    };
  }

  getYearlyBalances(year: number): MonthlyBalance[] {
    const balances: MonthlyBalance[] = [];
    for (let month = 0; month < 12; month++) {
      balances.push(this.getMonthlyBalance(month, year));
    }
    return balances;
  }

  // Métodos auxiliares
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initializeDefaultCategories(): void {
    const defaultCategories: Category[] = [
      { id: '1', name: 'Alimentação', color: '#FF6B6B' },
      { id: '2', name: 'Transporte', color: '#4ECDC4' },
      { id: '3', name: 'Moradia', color: '#45B7D1' },
      { id: '4', name: 'Saúde', color: '#96CEB4' },
      { id: '5', name: 'Educação', color: '#FFEAA7' },
      { id: '6', name: 'Lazer', color: '#DDA0DD' },
      { id: '7', name: 'Vestuário', color: '#98D8C8' },
      { id: '8', name: 'Outros', color: '#F7DC6F' },
    ];

    if (this.categories.value.length === 0) {
      this.categories.next(defaultCategories);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(
      'finance_transactions',
      JSON.stringify(this.transactions.value)
    );
    localStorage.setItem(
      'finance_categories',
      JSON.stringify(this.categories.value)
    );
  }

  private loadFromLocalStorage(): void {
    const savedTransactions = localStorage.getItem('finance_transactions');
    const savedCategories = localStorage.getItem('finance_categories');

    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions).map((t: any) => ({
        ...t,
        date: new Date(t.date),
        createdAt: new Date(t.createdAt),
      }));
      this.transactions.next(transactions);
    }

    if (savedCategories) {
      this.categories.next(JSON.parse(savedCategories));
    }
  }
}
