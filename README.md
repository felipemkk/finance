# Acompanhamento Financeiro

Este projeto é um sistema de acompanhamento financeiro pessoal desenvolvido em Angular 17. Ele permite o controle de receitas, despesas, categorias e detalhamento mensal, com visual moderno e responsivo.

## Funcionalidades
- Lista de todos os meses do ano com valores de fechamento
- Detalhamento diário de entradas e saídas
- Saldo final do dia e do mês
- Inclusão de receitas e despesas
- Sistema de categorias para despesas (com criação de novas categorias)
- Abertura automática no mês atual
- Interface moderna e responsiva
- Dados persistidos no navegador (localStorage)

## Pré-requisitos
- Node.js (versão 18 ou superior recomendada)
- npm (geralmente já vem com o Node.js)

## Instalação
1. Clone o repositório ou baixe os arquivos do projeto:
   ```bash
   git clone <url-do-repositorio>
   cd finance
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como rodar o projeto em modo desenvolvimento
Execute o comando abaixo e acesse [http://localhost:4200](http://localhost:4200) no navegador:
```bash
npm start
```

## Como buildar para produção
Gere os arquivos otimizados para deploy com:
```bash
npm run build
```
Os arquivos finais ficarão na pasta `dist/`.

## Como rodar testes
O projeto já vem preparado para testes unitários com o Karma:
```bash
npm test
```

## Estrutura dos principais diretórios
- `src/app/components/` — Componentes da interface
- `src/app/services/` — Serviços de dados e lógica de negócio
- `src/app/models/` — Modelos de dados (interfaces)

## Observações
- Todos os dados são salvos localmente no navegador (localStorage)
- O projeto é totalmente responsivo e pode ser usado em desktop ou mobile
- Para dúvidas ou sugestões, abra uma issue ou entre em contato

---

Desenvolvido com ❤️ usando Angular 17
