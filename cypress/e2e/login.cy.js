describe('Login Component', () => {
  beforeEach(() => {
      cy.visit('/login'); // Pastikan rute halaman login benar
  });

  it('should display the login form', () => {
      cy.get('.card-header').should('contain', 'Login To Access');
      cy.get('form').should('exist');
      cy.contains('label', 'Email').siblings('input').should('exist');
      cy.contains('label', 'Password').siblings('input').should('exist');
      cy.contains('button', 'Login').should('exist');
  });


  it('should show an error message for invalid credentials', () => {
      cy.contains('label', 'Email').siblings('input').type('invalid@example.com');
      cy.contains('label', 'Password').siblings('input').type('wrongpassword');
      cy.contains('button', 'Login').click();
      cy.get('div[role="alert"]').should('contain', 'Unauthorized');

  });

});
