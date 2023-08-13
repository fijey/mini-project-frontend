describe('Register Component', () => {
  beforeEach(() => {
      cy.visit('/register'); // Pastikan rute halaman register benar
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

  // it('should show an error message for empty form submission', () => {
  //     cy.contains('button', 'Register').click();
  //     cy.get('.toast-error').should('contain', 'Please fill in all fields');
  // });

  // it('should successfully register with valid data', () => {
  //     // Mock a successful API response
  //     cy.intercept('POST', '/register', {
  //         statusCode: 201,
  //         body: {
  //             message: 'Registration successful',
  //         },
  //     });

  //     cy.contains('label', 'Email').siblings('input').type('test@example.com');
  //     cy.contains('label', 'Name').siblings('input').type('Test User');
  //     cy.contains('label', 'Username').siblings('input').type('testuser');
  //     cy.contains('label', 'Password').siblings('input').type('password123');
  //     cy.contains('button', 'Register').click();

  //     // Verify redirection to the login page
  //     cy.url().should('include', '/');
  //     // Verify success message
  //     cy.get('.toast-success').should('contain', 'Registration Successful');
  // });

  // it('should handle registration failure', () => {
  //     // Mock a failed API response
  //     cy.intercept('POST', '/register', {
  //         statusCode: 400,
  //         body: {
  //             message: 'Invalid registration data',
  //         },
  //     });

  //     cy.contains('label', 'Email').siblings('input').type('invalid@example.com');
  //     cy.contains('label', 'Name').siblings('input').type('Invalid User');
  //     cy.contains('label', 'Username').siblings('input').type('invaliduser');
  //     cy.contains('label', 'Password').siblings('input').type('weakpassword');
  //     cy.contains('button', 'Register').click();

  //     // Verify error message
  //     cy.get('.toast-error').should('contain', 'Invalid registration data');
  // });
});
