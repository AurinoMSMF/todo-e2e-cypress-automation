let taskTitle;
let taskDescription;

const selectors = {
  taskList: "[data-test='tasks-list']",
  testTask: "[data-test='task-item']",
  taskTitleButton: "[data-test='task-title-button']",
  taskDeletionButton: "[data-test='task-deletion-button']",
  taskDetailsButton: "[data-test='task-details-button']",
  taskDetailsTitle: "[data-test='task-details-title']",
  taskDetailsDescription: "[data-test='task-details-description']",
  taskDetailsGoBackButton: "[data-test='task-details-goback-button']",
};

const createTestTaskViaUI = () => {
  const timestamp = Date.now();
  taskTitle = `Test task ${timestamp}`;
  taskDescription = `Lorem dolor sit amet ${timestamp}`;
  cy.get("[data-test='task-title-input']").type(taskTitle);
  cy.get("[data-test='task-description-textarea']").type(taskDescription);
  cy.get("[data-test='task-creation-button']").click();
};

const createTaskAsPrecondition = () => {
  createTestTaskViaUI();
};

describe("Criação de tarefa", () => {
  beforeEach(() => {
    // Arrange
    cy.visit("/");
  });

  it("Realiza a criação de uma tarefa", () => {
    // Act
    createTestTaskViaUI();

    // Assert
    cy.get(selectors.taskList)
      .should("be.visible")
      .and("have.descendants", "li");
    cy.get(selectors.testTask).contains(taskTitle).should("exist");

    cy.screenshot("tarefa_criada");
  });
});

describe("Com tarefa existente", () => {
  beforeEach(() => {
    // Arrange
    cy.visit("/");
    createTaskAsPrecondition();
  });

  it("Permite a visualização dos detalhes de uma tarefa e retorno a página principal", () => {
    // Act
    cy.get(selectors.testTask).contains(taskTitle).should("exist");
    cy.contains(selectors.testTask, taskTitle)
      .find(selectors.taskDetailsButton)
      .should("be.visible")
      .click();

    // Assert
    const searchParams = new URLSearchParams();
    searchParams.set("title", taskTitle);
    searchParams.set("description", taskDescription);

    cy.location("pathname").should("eq", "/task-details");
    cy.location("search").should("eq", `?${searchParams.toString()}`);
    cy.get(selectors.taskDetailsTitle).contains(taskTitle).should("exist");

    cy.get(selectors.taskDetailsDescription)
      .contains(taskDescription)
      .should("exist");

    cy.screenshot("detalhes_da_tarefa");

    cy.get(selectors.taskDetailsGoBackButton).should("be.visible").click();

    cy.location("pathname").should("eq", "/");

    cy.screenshot("retorno_pagina_principal");
  });

  it("Conclui a tarefa ao clicar sobre o título", () => {
    // Act
    cy.get(selectors.testTask).contains(taskTitle).should("exist");
    cy.contains(selectors.testTask, taskTitle)
      .find(selectors.taskTitleButton)
      .should("be.visible")
      .click();

    // Assert
    cy.contains(selectors.testTask, taskTitle)
      .find(selectors.taskTitleButton)
      .should("have.class", "line-through");

    cy.screenshot("tarefa_concluida");
  });

  it("Exclui a tarefa", () => {
    // Act
    cy.get(selectors.testTask).contains(taskTitle).should("exist");
    cy.contains(selectors.testTask, taskTitle)
      .find(selectors.taskDeletionButton)
      .should("be.visible")
      .click();

    // Assert
    cy.contains(selectors.testTask, taskTitle).should("not.exist");

    cy.screenshot("tarefa_excluida");
  });
});
