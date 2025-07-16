import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamentos.component.html',
  styleUrl: './pagamentos.component.scss',
})
export class PagamentosComponent {
  pagamentos = [
    {
      id: 1,
      cliente: 'João Silva',
      valor: 150.0,
      data: '2024-01-15',
      metodo: 'Cartão de Crédito',
      status: 'Pago',
    },
    {
      id: 2,
      cliente: 'Maria Santos',
      valor: 89.9,
      data: '2024-01-14',
      metodo: 'PIX',
      status: 'Pago',
    },
    {
      id: 3,
      cliente: 'Pedro Costa',
      valor: 200.0,
      data: '2024-01-20',
      metodo: 'Boleto',
      status: 'Pendente',
    },
    {
      id: 4,
      cliente: 'Ana Oliveira',
      valor: 75.5,
      data: '2024-01-13',
      metodo: 'Dinheiro',
      status: 'Pago',
    },
  ];

  metodosPagamento = [
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX',
    'Boleto',
    'Dinheiro',
  ];
  statusPagamento = ['Pago', 'Pendente', 'Cancelado', 'Estornado'];

  adicionarPagamento() {
    // Lógica para adicionar novo pagamento
    console.log('Adicionar novo pagamento');
  }

  editarPagamento(pagamento: any) {
    // Lógica para editar pagamento
    console.log('Editar pagamento:', pagamento);
  }

  excluirPagamento(pagamento: any) {
    // Lógica para excluir pagamento
    console.log('Excluir pagamento:', pagamento);
  }

  getTotalPagamentos() {
    return this.pagamentos
      .filter((p) => p.status === 'Pago')
      .reduce((total, p) => total + p.valor, 0);
  }

  getTotalPendente() {
    return this.pagamentos
      .filter((p) => p.status === 'Pendente')
      .reduce((total, p) => total + p.valor, 0);
  }
}
