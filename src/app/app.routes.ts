import { Routes } from '@angular/router';
import { FinancialDashboardComponent } from './components/Finanças/financial-dashboard/financial-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/StoreFL/clientes/clientes.component';
import { PagamentosComponent } from './components/StoreFL/pagamentos/pagamentos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'store/clientes', component: ClientesComponent },
  { path: 'store/pagamentos', component: PagamentosComponent },
  { path: 'pessoal', component: FinancialDashboardComponent },
  { path: '**', redirectTo: 'home' }
];
