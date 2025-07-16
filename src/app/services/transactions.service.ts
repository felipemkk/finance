import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction, MonthlyBalance } from '../models/transaction.model';

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

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = 'http://192.168.15.33:3000/api/transactions';

  constructor(private http: HttpClient) {}

  // Buscar todas as transações
  getTransactions(): Observable<ApiTransaction[]> {
    return this.http.get<ApiTransaction[]>(this.apiUrl);
  }

  // Buscar transação por ID
  getTransaction(id: number): Observable<ApiTransaction> {
    return this.http.get<ApiTransaction>(`${this.apiUrl}/${id}`);
  }

  // Criar nova transação
  criarTransaction(transaction: ApiTransaction): Observable<ApiTransaction> {
    return this.http.post<ApiTransaction>(this.apiUrl, transaction);
  }

  // Atualizar transação
  atualizarTransaction(
    id: number,
    transaction: ApiTransaction
  ): Observable<ApiTransaction> {
    return this.http.put<ApiTransaction>(`${this.apiUrl}/${id}`, transaction);
  }

  // Excluir transação
  excluirTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Buscar transações por tipo
  getTransactionsByType(type: 'income' | 'expense'): Observable<ApiTransaction[]> {
    return this.http.get<ApiTransaction[]>(`${this.apiUrl}/type/${type}`);
  }

  // Buscar transações por mês/ano
  getTransactionsByMonth(
    month: number,
    year: number
  ): Observable<ApiTransaction[]> {
    return this.http.get<ApiTransaction[]>(
      `${this.apiUrl}/month/${year}/${month}`
    );
  }

  // Calcular saldo mensal
  getMonthlyBalance(month: number, year: number): Observable<MonthlyBalance> {
    return this.http.get<MonthlyBalance>(
      `${this.apiUrl}/balance/${year}/${month}`
    );
  }

  // Calcular saldos anuais
  getYearlyBalances(year: number): Observable<MonthlyBalance[]> {
    return this.http.get<MonthlyBalance[]>(`${this.apiUrl}/yearly/${year}`);
  }
}
