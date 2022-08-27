/// <reference types="cypress" />
describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/login");
  });

  it("login page can be opened", () => {
    cy.contains("Login").should("be.visible");
  });

  it("user can login", () => {
    cy.get('input[name="email"]').type("test_user@gmail.com");
    cy.get('input[name="password"]').type("Test_password1");
    cy.get('button[type="submit"]').contains("Login").click();
    cy.get("#layout").should("be.visible");
  });

  it("wrong password is checked", () => {
    cy.get('input[name="email"]').type("test_user@gmail.com");
    cy.get('input[name="password"]').type("wrong_password");
    cy.get('button[type="submit"]').contains("Login").click();
    cy.get(".submit-errors").should("contain", "Invalid email or password");
  });

  /* it("user can sign up", () => {
    cy.get("a").contains("Sign up").click();
    cy.get('input[name="email"]').type("test_user@gmail.com");
    cy.get('input[name="name"]').type("test_user");
    cy.get('input[name="password1"]').type("Test_password1");
    cy.get('input[name="password2"]').type("Test_password1");
    cy.get('button[type="submit"]').contains("Sign Up").click();
  }); */
});
