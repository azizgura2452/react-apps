describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the expression and result correctly', () => {
    cy.get('h3').should('contain.text', '');
    cy.get('h2').should('contain.text', '');
  });

  it('should append numbers and operators to the expression', () => {
    cy.get('button').contains('7').click();
    cy.get('button').contains('+').click();
    cy.get('button').contains('3').click();
    cy.get('button').contains('=').click();
    cy.get('h3').should('contain.text', '7+3');
    cy.get('h2').should('contain.text', '10'); // The expected result of 7 + 3
  });

  it('should handle backspace correctly', () => {
    cy.get('button').contains('7').click();
    cy.get('button').contains('+').click();
    cy.get('button').contains('3').click();
    cy.get('[data-testid="Backspace"]').click() // Press backspace
    cy.get('h3').should('contain.text', '7+'); // Should show '7+'
  });

  it('should clear the expression and result when AC is pressed', () => {
    cy.get('button').contains('7').click();
    cy.get('button').contains('AC').click(); // Press AC to clear
    cy.get('h3').should('contain.text', ''); // Expression should be empty
    cy.get('h2').should('contain.text', ''); // Result should be empty
  });

  it('should toggle between standard and scientific mode', () => {
    cy.get('button').contains('STD').should('exist'); // Ensure initial mode is STD
    cy.get('button').contains('STD').click(); // Toggle to SCI
    cy.get('button').contains('SCI').should('not.exist'); // Ensure switch changes to STD
  });

  it('should display an error when dividing by zero', () => {
    cy.get('button').contains('STD').click(); // Toggle to SCI
    cy.get('button').contains('8').click();
    cy.get('button').contains('÷').click();
    cy.get('button').contains('0').click();
    cy.get('button').contains('=').click();
    cy.get('h2').should('contain.text', 'Cannot divide by zero'); // Check for the error message
  });

  it('should display an error for invalid expressions', () => {
    cy.get('button').contains('STD').click(); // Toggle to SCI
    cy.get('button').contains('-').click();
    cy.get('h2').should('contain.text', 'Invalid Expression'); // Check for the invalid operator error
  });
});
