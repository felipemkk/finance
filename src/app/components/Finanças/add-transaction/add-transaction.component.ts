import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/transaction.model';
import { TransactionsService, ApiTransaction } from '../../../services/transactions.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  @Input() type: 'income' | 'expense' = 'income';
  @Input() visible = false;
  @Output() transactionAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  description = '';
  amount = 0;
  date = new Date().toISOString().split('T')[0];
  category = '';
  newCategoryName = '';
  showNewCategoryInput = false;
  categories: Category[] = [];
  loading = false;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    // Por enquanto, vamos usar categorias padrão
    this.categories = [
      { id: '1', name: 'Alimentação', color: '#FF6B6B' },
      { id: '2', name: 'Transporte', color: '#4ECDC4' },
      { id: '3', name: 'Moradia', color: '#45B7D1' },
      { id: '4', name: 'Saúde', color: '#96CEB4' },
      { id: '5', name: 'Educação', color: '#FFEAA7' },
      { id: '6', name: 'Lazer', color: '#DDA0DD' },
      { id: '7', name: 'Vestuário', color: '#98D8C8' },
      { id: '8', name: 'Outros', color: '#F7DC6F' }
    ];
  }

  onSubmit(): void {
    if (!this.description || this.amount <= 0) {
      return;
    }

    this.loading = true;

    const transactionData: ApiTransaction = {
      type: this.type,
      amount: this.amount,
      description: this.description,
      transaction_date: this.date,
      category: this.type === 'expense' ? this.category : undefined
    };

    this.transactionsService.criarTransaction(transactionData).subscribe({
      next: (response) => {
        console.log('Transação criada com sucesso:', response);
        this.resetForm();
        this.transactionAdded.emit();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao criar transação:', error);
        this.loading = false;
        // Você pode adicionar um toast ou alert aqui para mostrar o erro
      }
    });
  }

  onCancel(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  addNewCategory(): void {
    if (this.newCategoryName.trim()) {
      // Por enquanto, vamos apenas adicionar à lista local
      const newCategory: Category = {
        id: Date.now().toString(),
        name: this.newCategoryName.trim(),
        color: this.getRandomColor()
      };
      
      this.categories.push(newCategory);
      this.newCategoryName = '';
      this.showNewCategoryInput = false;
    }
  }

  toggleNewCategoryInput(): void {
    this.showNewCategoryInput = !this.showNewCategoryInput;
    if (this.showNewCategoryInput) {
      this.category = '';
    }
  }

  private resetForm(): void {
    this.description = '';
    this.amount = 0;
    this.date = new Date().toISOString().split('T')[0];
    this.category = '';
    this.newCategoryName = '';
    this.showNewCategoryInput = false;
  }

  private getRandomColor(): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
      '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
