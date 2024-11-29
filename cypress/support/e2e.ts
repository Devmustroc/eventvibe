import './commands'
import '@testing-library/cypress/add-commands'

// Désactiver les erreurs non pertinentes des tests
Cypress.on('uncaught:exception', (err, runnable) => {
    // Retourner false empêche Cypress d'échouer le test
    return false
})