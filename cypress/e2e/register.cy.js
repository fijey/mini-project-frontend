describe('Register Component', () => {
  beforeEach(() => {
      cy.visit('/register');
  });

  it('should display the registration form', () => {
      cy.get('.card-header').should('contain', 'Register To Have Access');
      cy.get('form').should('exist');
      cy.contains('label', 'Email').siblings('input').should('exist');
      cy.contains('label', 'Name').siblings('input').should('exist');
      cy.contains('label', 'Username').siblings('input').should('exist');
      cy.contains('label', 'Password').siblings('input').should('exist');
      cy.contains('button', 'Register').should('exist');
  });

});
