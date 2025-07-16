import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthlyBalance } from '../../../models/transaction.model';
import { TransactionsService } from '../../../services/transactions.service';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { MonthDetailComponent } from '../month-detail/month-detail.component';

@Component({
  selector: 'app-financial-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MonthDetailComponent,
    AddTransactionComponent,
  ],
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.scss'],
})
export class FinancialDashboardComponent implements OnInit {
  monthlyBalances: MonthlyBalance[] = [];
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  expandedMonth: number | null = null;
  showAddTransaction = false;
  transactionType: 'income' | 'expense' = 'income';
  loading = false;
  error = '';
  hideEmptyMonths = false;

  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadYearlyData();
    // Expandir o mês atual automaticamente
    this.expandedMonth = this.currentMonth;
  }

  loadYearlyData(): void {
    this.loading = true;
    this.error = '';

    this.transactionsService.getYearlyBalances(this.currentYear).subscribe({
      next: (data) => {
        this.monthlyBalances = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados financeiros:', error);
        this.error = 'Erro ao carregar dados financeiros. Tente novamente.';
        this.loading = false;
        // Criar dados vazios para exibição
        this.createEmptyMonthlyBalances();
      },
    });
  }

  createEmptyMonthlyBalances(): void {
    this.monthlyBalances = [];
    for (let month = 0; month < 12; month++) {
      this.monthlyBalances.push({
        month,
        year: this.currentYear,
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        transactions: [],
      });
    }
  }

  toggleMonthDetail(month: number): void {
    this.expandedMonth = this.expandedMonth === month ? null : month;
  }

  showAddTransactionModal(type: 'income' | 'expense'): void {
    this.transactionType = type;
    this.showAddTransaction = true;
  }

  onTransactionAdded(): void {
    this.loadYearlyData();
    this.showAddTransaction = false;
  }

  onCloseModal(): void {
    this.showAddTransaction = false;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  getBalanceClass(balance: number): string {
    return balance >= 0 ? 'positive' : 'negative';
  }

  // Verificar se o mês deve ser desabilitado
  isMonthDisabled(monthIndex: number): boolean {
    if (!this.hideEmptyMonths) return false;

    const balance = this.monthlyBalances[monthIndex];
    const hasTransactions =
      balance && (balance.totalIncome > 0 || balance.totalExpenses > 0);
    const isCurrentOrFutureMonth = monthIndex >= this.currentMonth;

    return !hasTransactions && !isCurrentOrFutureMonth;
  }

  // Verificar se o mês tem transações
  hasTransactions(monthIndex: number): boolean {
    const balance = this.monthlyBalances[monthIndex];
    return balance && (balance.totalIncome > 0 || balance.totalExpenses > 0);
  }
}
