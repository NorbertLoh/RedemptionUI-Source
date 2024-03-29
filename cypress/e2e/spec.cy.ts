import config from "../../src/config";
import * as Cypress from 'cypress';


describe("Test invalid staff file", () => {
  it("tests adding invalid staff", () => {
    // arrange
    cy.viewport(965, 748);
    cy.visit(config.BASE_URL);

    // act
    cy.get("#file").selectFile('../redemption-ui/cypress/wrong.csv', {force: true});
    
    // assert
    cy.get("span:nth-of-type(2)").should('have.text', 'Invalid Data!!');
  });
});

describe("Test correct staff file", () => {
  it("tests adding staff", () => {
    // arrange
    cy.viewport(965, 748);
    cy.visit(config.BASE_URL);

    // act
    cy.get("#file").selectFile('../redemption-ui/cypress/staff-id-to-team-mapping-long.csv', {force: true});
    
    // assert
    cy.get("span:nth-of-type(2)").should('have.text', 'Staff updated successfully!!');
  });
});

describe("Add new event", () => {
  it("tests addnewevent", () => {
    // arrange
    cy.viewport(965, 748);
    cy.visit(config.BASE_URL);
    cy.get(":nth-child(2) > .ant-btn").click();
    cy.get("#Add_New_Event_event_name").click();

    // act
    cy.get("#Add_New_Event_event_name").type("Christmas!");
    cy.get("div.ant-modal-body span").click();

    // assert
    cy.get('.ant-table-tbody > :nth-child(1) > :nth-child(1)').should('have.text', 'Christmas!');
  });
});

describe("Should say redeemed", () => {
  it("tests add redemption", () => {
    // arrange
    cy.viewport(965, 748);
    cy.visit(config.BASE_URL);
    cy.get(":nth-child(1) > :nth-child(3) > .ant-row > .anticon > svg > path").click();
    cy.get("#Add\\ New\\ Event_staff_pass_id").click();

    // act
    cy.get("#Add\\ New\\ Event_staff_pass_id").type("BOSS_009QX26MBQLT");
    cy.get(".ant-btn > span").click();

    // assert
    cy.get(".ant-message-custom-content > :nth-child(2)").should('have.text', 'Team GRYFFINDOR redeemed successfully!!');
    cy.get("td:nth-of-type(1)").should('have.text', 'GRYFFINDOR');
  });
});

describe("Should say already redeemed", () => {
  it("tests add redemption", () => {
    // arrange
    cy.viewport(965, 748);
    cy.visit(config.BASE_URL);
    cy.get(":nth-child(1) > :nth-child(3) > .ant-row > .anticon > svg > path").click();
    cy.get("#Add\\ New\\ Event_staff_pass_id").click();

    // act
    cy.get("#Add\\ New\\ Event_staff_pass_id").type("BOSS_009QX26MBQLT");
    cy.get(".ant-btn > span").click();

    // assert
    cy.get(".ant-message-notice-content").should('have.text', 'Team GRYFFINDOR already redeemed!!');
  });
});
