declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): void;
        createEvent(eventData: any): void;
    }
}

// Commande de connexion
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/')
    cy.get('[data-cy="login-button"]').click()
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
})

// Commande de création d'événement
Cypress.Commands.add('createEvent', (eventData: any) => {
    cy.get('[data-cy="create-event-button"]').click()
    cy.get('input[name="title"]').type(eventData.title)
    cy.get('textarea[name="description"]').type(eventData.description)
    cy.get('input[name="price"]').type(eventData.price.toString())
    cy.get('input[name="startDate"]').type(eventData.startDate)
    cy.get('input[name="endDate"]').type(eventData.endDate)
    cy.get('button[type="submit"]').click()
})