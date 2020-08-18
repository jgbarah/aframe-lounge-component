/*
 * Cypress tests for floor component
 */
describe('Floor component', () => {

  beforeEach(() => {
    cy.visit('/tests/index.html');
  });

  it('Creation', () => {
    cy.get('a-scene').then(scene => {
      let floor = Cypress.$('<a-entity lounge-floor></a-entity>');
      Cypress.$(scene).append(floor);
    });
    assert.exists(cy.get('a-entity[lounge-floor]'));
    cy.get('a-entity[lounge-floor]').invoke('attr', 'lounge-floor')
      .should('nested.include',{'width': 10})
      .should('nested.include',{'depth': 7})
  });

});

describe('Floor component examples (screenshot)', () => {

  ['index', 'textured'].forEach((example) => {
    it(`Screenshot (${example})`, () => {
      cy.visit('/examples/floor/' + example + '.html');
      cy.wait(3000);
      cy.screenshot(example);
    });
  });
});
