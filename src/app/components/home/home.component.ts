import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showStoreSubmenu = false;

  constructor(public router: Router) {}

  toggleStoreSubmenu() {
    this.showStoreSubmenu = !this.showStoreSubmenu;
  }

  navigateToStore() {
    this.showStoreSubmenu = true;
  }

  navigateToClientes() {
    this.router.navigate(['/store/clientes']);
  }

  navigateToPagamentos() {
    this.router.navigate(['/store/pagamentos']);
  }

  navigateToPessoal() {
    this.router.navigate(['/pessoal']);
  }

  isHomePage(): boolean {
    return this.router.url === '/home' || this.router.url === '/';
  }
}
