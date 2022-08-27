/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

describe("Create and delete a trip", () => {
  beforeEach(() => {
    cy.login("test_user@gmail.com", "Test_password1");
  });

  it("user can create a trip", () => {
    cy.get('.icon.logo [data-icon="plus"]').click();
    cy.get('.custom-modal-content [name="title"]').type("Test trip name");
    cy.get(".DayPickerInput > input").first().click();
    cy.get(".DayPicker-Day").contains("1").click();
    cy.get(".DayPickerInput > input").last().click();
    cy.get(".DayPicker-Day").contains("15").click();
    cy.get('.custom-modal-content [name="description"]').type(
      "This is a test description"
    );
    cy.get('.custom-modal-content button[type="submit"]').click();
    cy.get(".trip-header-container > h2").contains("Test trip name");
  });

  it("user can add a location", () => {
    cy.get("#trip-list-container h3").last().contains("Test trip name").click();
    cy.get('.icon.logo [data-icon="map-marker-alt"]').click();
    cy.get("h2").contains("Create a new location in Test trip name");
    cy.get(".location-name input").type("Test location name");
    cy.get('button[type="submit"]').contains("Save").click();
    cy.get("#location-list-container span")
      .last()
      .contains("Test location name");
  });

  it("user can delete a trip", () => {
    cy.get("#trip-list-container h3").last().contains("Test trip name").click();
    cy.get('.icon.logo [data-icon="trash"]').click();
    cy.get("button").contains("Confirm").click();
    cy.get("#location-list-container span")
      .contains("Test location name")
      .should("not.exist");
  });
});
