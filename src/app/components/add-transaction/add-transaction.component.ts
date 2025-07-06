import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/transaction.model';
import { FinancialService } from '../../services/financial.service';

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

  constructor(private financialService: FinancialService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.financialService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (!this.description || this.amount <= 0) {
      return;
    }

    const transactionData = {
      date: new Date(this.date),
      description: this.description,
      amount: this.amount,
      type: this.type,
      category: this.type === 'expense' ? this.category : undefined
    };

    this.financialService.addTransaction(transactionData);
    this.resetForm();
    this.transactionAdded.emit();
  }

  onCancel(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  addNewCategory(): void {
    if (this.newCategoryName.trim()) {
      this.financialService.addCategory({
        name: this.newCategoryName.trim(),
        color: this.getRandomColor()
      });
      this.newCategoryName = '';
      this.showNewCategoryInput = false;
      this.loadCategories();
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