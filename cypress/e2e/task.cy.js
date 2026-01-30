const baseURL = "react-to-do-five-rho.vercel.app";
const taskTitle = `Test task ${Date.now()}`;
const taskDescription = `${"Lorem dolor sit amet"}`;

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

const createTestTask = () => {
  cy.get("[data-test='task-title-input']").type(taskTitle);
  cy.get("[data-test='task-description-textarea']").type(taskDescription);
  cy.get("[data-test='task-creation-button']").click();
};

describe("Teste E2E React-to-do", () => {
  it("Realiza a criação de uma tarefa", () => {
    // Arrange
    cy.visit(baseURL);

    // Act
    createTestTask();

    // Assert
    cy.get(selectors.taskList)
      .should("be.visible")
      .and("have.descendants", "li");
    cy.get(selectors.testTask).contains(taskTitle).should("exist");
  });

  it("Permite a visualização dos detalhes de uma tarefa e retorno a página principal", () => {
    // Arrange
    cy.visit(baseURL);
    createTestTask();

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

    cy.location("hostname").should("eq", baseURL);
    cy.location("pathname").should("eq", "/task-details");
    cy.location("search").should("eq", `?${searchParams.toString()}`);
    cy.get(selectors.taskDetailsTitle).contains(taskTitle).should("exist");

    cy.get(selectors.taskDetailsDescription)
      .contains(taskDescription)
      .should("exist");

    cy.get(selectors.taskDetailsGoBackButton).should("be.visible").click();

    cy.location("hostname").should("eq", baseURL);
  });

  it("Conclui a tarefa ao clicar sobre o título", () => {
    // Arrange
    cy.visit(baseURL);
    createTestTask();

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
  });

  it("Exclui a tarefa", () => {
    // Arrange
    cy.visit(baseURL);
    createTestTask();

    // Act
    cy.get(selectors.testTask).contains(taskTitle).should("exist");
    cy.contains(selectors.testTask, taskTitle)
      .find(selectors.taskDeletionButton)
      .should("be.visible")
      .click();

    // Assert
    cy.contains(selectors.testTask, taskTitle).should("not.exist");
  });
});
