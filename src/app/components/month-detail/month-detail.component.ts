import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MonthlyBalance, Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-month-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-detail.component.html',
  styleUrls: ['./month-detail.component.scss']
})
export class MonthDetailComponent {
  @Input() monthlyBalance!: MonthlyBalance;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  getTransactionClass(transaction: Transaction): string {
    return transaction.type === 'income' ? 'income' : 'expense';
  }

  getBalanceClass(balance: number): string {
    return balance >= 0 ? 'positive' : 'negative';
  }

  getDailyBalance(transactions: Transaction[], targetDate: Date): number {
    const dayTransactions = transactions.filter(t => 
      t.date.getDate() === targetDate.getDate() &&
      t.date.getMonth() === targetDate.getMonth() &&
      t.date.getFullYear() === targetDate.getFullYear()
    );

    return dayTransactions.reduce((balance, t) => {
      return t.type === 'income' ? balance + t.amount : balance - t.amount;
    }, 0);
  }

  getGroupedTransactions(): { date: Date; transactions: Transaction[]; balance: number }[] {
    const grouped = new Map<string, Transaction[]>();
    
    this.monthlyBalance.transactions.forEach(transaction => {
      const dateKey = transaction.date.toDateString();
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(transaction);
    });

    return Array.from(grouped.entries())
      .map(([dateKey, transactions]) => {
        const date = new Date(dateKey);
        const balance = this.getDailyBalance(this.monthlyBalance.transactions, date);
        return { date, transactions, balance };
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
} 