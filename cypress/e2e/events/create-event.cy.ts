describe('Event Creation', () => {
  it('should create a new event', () => {
    // Visit the create event page with failOnStatusCode set to false
    cy.visit('/events/create', { failOnStatusCode: false });

    // Increase the timeout to wait for the element to appear
    cy.get('[data-cy="create-event-button"]', { timeout: 10000 }).should('be.visible').click();

    // Add additional steps to fill out the event creation form and submit
    cy.get('[data-cy="event-title-input"]').type('New Event');
    cy.get('[data-cy="event-description-input"]').type('This is a description for the new event.');
    cy.get('[data-cy="event-date-input"]').type('2024-12-31');
    cy.get('[data-cy="event-location-input"]').type('New York');
    cy.get('[data-cy="submit-event-button"]').click();

    // Verify that the event was created successfully
    cy.contains('Event created successfully').should('be.visible');
  });
});