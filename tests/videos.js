/*
 * Cypress tests for collider component
 */

describe('Collider component examples (screenshot)', () => {

  beforeEach(() => {
    cy.clearViewport();
    cy.wait(3000);
  });

  // Tests with 🎥 emoji will be recorded as a gif file
  ['wall'].forEach((example) => {
    it(`Video 🎥 (${example})`, () => {
      cy.visit('/examples/collider/' + example + '.html');
      cy.wait(3000);
    });
  });
});
