import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthlyBalance } from '../../models/transaction.model';
import { FinancialService } from '../../services/financial.service';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { MonthDetailComponent } from '../month-detail/month-detail.component';

@Component({
  selector: 'app-financial-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MonthDetailComponent, AddTransactionComponent],
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.scss']
})
export class FinancialDashboardComponent implements OnInit {
  monthlyBalances: MonthlyBalance[] = [];
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  expandedMonth: number | null = null;
  showAddTransaction = false;
  transactionType: 'income' | 'expense' = 'income';

  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private financialService: FinancialService) {}

  ngOnInit(): void {
    this.loadYearlyData();
    // Expandir o mês atual automaticamente
    this.expandedMonth = this.currentMonth;
  }

  loadYearlyData(): void {
    this.monthlyBalances = this.financialService.getYearlyBalances(this.currentYear);
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
      currency: 'BRL'
    }).format(value);
  }

  getBalanceClass(balance: number): string {
    return balance >= 0 ? 'positive' : 'negative';
  }
}
