describe("App E2E", () => {
    it("should have a form", () => {
        cy.visit("/");

        cy.get("input").should('have.value', "");
    
    });

        it("should have a class", () => {
        cy.visit("/");

        cy.get("div").should('have.class', "converter");
    });

        it("should have a converter", () => {
        cy.visit("/");

        cy.get('[data-app="true"]').should('have.class', "v-application");
    });
})