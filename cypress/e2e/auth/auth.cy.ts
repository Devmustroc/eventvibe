describe('Authentication', () => {
  it('should open login modal', () => {
    // Visit the login page with failOnStatusCode set to false
    cy.visit('/login', { failOnStatusCode: false });

    // Increase the timeout to wait for the element to appear
    cy.get('[data-cy="login-button"]', { timeout: 10000 }).should('be.visible').click();

    // Verify that the login modal is opened
    cy.get('[data-cy="login-modal"]').should('be.visible');
  });

  it('should login successfully', () => {
    // Visit the login page with failOnStatusCode set to false
    cy.visit('/login', { failOnStatusCode: false });

    // Increase the timeout to wait for the element to appear
    cy.get('[data-cy="login-button"]', { timeout: 10000 }).should('be.visible').click();

    // Fill out the login form and submit
    cy.get('[data-cy="email-input"]').type('user@example.com');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="submit-login-button"]').click();

    // Verify that the user is logged in successfully
    cy.contains('Welcome, user!').should('be.visible');
  });
});