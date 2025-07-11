import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  clientes = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999', status: 'Ativo' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 88888-8888', status: 'Ativo' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', telefone: '(11) 77777-7777', status: 'Inativo' }
  ];

  adicionarCliente() {
    // Lógica para adicionar novo cliente
    console.log('Adicionar novo cliente');
  }

  editarCliente(cliente: any) {
    // Lógica para editar cliente
    console.log('Editar cliente:', cliente);
  }

  excluirCliente(cliente: any) {
    // Lógica para excluir cliente
    console.log('Excluir cliente:', cliente);
  }
}
