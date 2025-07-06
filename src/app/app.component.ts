import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinancialDashboardComponent } from './components/financial-dashboard/financial-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FinancialDashboardComponent],
  template: `
    <app-financial-dashboard></app-financial-dashboard>
  `,
  styles: []
})
export class AppComponent {
  title = 'finance';
}
