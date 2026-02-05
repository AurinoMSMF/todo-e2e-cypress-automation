# 🧪 Automação de Testes E2E com Cypress — React To-Do (Fluxo Crítico Automatizado)

Projeto de **automação de testes End-to-End (E2E)** utilizando **Cypress**, aplicado sobre uma aplicação React de To-Do.

O objetivo deste projeto é demonstrar habilidades práticas em **QA Automation**, cobrindo o **fluxo crítico real da aplicação**, respeitando o escopo funcional existente.

---

## 🔗 Aplicação testada

- **URL:** https://react-to-do-five-rho.vercel.app

---

## 🎯 Objetivo dos testes

### Automatizar cenários E2E essenciais para validar que a aplicação:

- Permite criar tarefas
- Exibe corretamente tarefas criadas
- Permite visualizar detalhes de uma tarefa
- Permite marcar uma tarefa como concluída
- Permite excluir tarefas
- Mantém comportamento esperado durante a navegação

---

## 🧪 Escopo dos testes automatizados

### Funcionalidades cobertas

- **Create** — criação de tarefas
- **Read** — listagem e visualização de detalhes
- **Delete** — exclusão de tarefas
- **Fluxo crítico E2E**:
  > Criar tarefa → Visualizar detalhes → Concluir tarefa → Excluir tarefa

### Fora do escopo

- ❌ Autenticação/login (não existe na aplicação)
- ❌ Edição textual de tarefas (fora do escopo funcional)

> ⚠️ Apesar de não existir edição textual, a aplicação permite **mudança de estado da tarefa (concluir)**, que foi validada via automação.

---

## 🛠️ Ferramentas e tecnologias

- **Cypress** — automação de testes E2E
- **JavaScript**
- **Node.js / npm**

---

## 📁 Estrutura do projeto

```text
cypress/
 └── e2e/
     └── task.cy.js
cypress.config.js
package.json
README.md
```

## ▶️ Como executar os testes

### Pré-requisitos

- Node.js instalado

- npm instalado

### Instalação das dependências

`npm install`

### Executar testes em modo interativo (UI do Cypress)

`npm run test:e2e:open`

### Executar testes em modo headless

`npm run test:e2e:headless`

## 🔄 Integração Contínua (CI)

Este projeto possui pipeline de **Integração Contínua** configurada com **GitHub Actions**.

A cada push no repositório, os testes E2E são executados automaticamente contra a aplicação publicada na Vercel, validando o fluxo crítico E2E em ambiente real.

### Pipeline

- Instala dependências
- Executa testes Cypress em modo headless
- Testa a aplicação publicada na Vercel

## 🧠 Boas práticas aplicadas

- Utilização de seletores dedicados (`data-test`) para maior estabilidade dos testes
- Organização dos testes seguindo o padrão Arrange / Act / Assert
- Cenários projetados para execução independente
- Dados de teste gerados dinamicamente para evitar dependência de estado
- Validação explícita de navegação e estado da aplicação
- Preferência por sincronização nativa do Cypress, evitando waits artificiais
