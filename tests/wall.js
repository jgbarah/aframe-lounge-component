/*
 * Cypress tests for wall component
 */
describe('Wall component', () => {

  beforeEach(() => {
    cy.visit('/tests/index.html');
  });

  it('Creation', () => {
    cy.get('a-scene').then(scene => {
      let wall = Cypress.$('<a-entity lounge-wall></a-entity>');
      Cypress.$(scene).append(wall);
    });
    assert.exists(cy.get('a-entity[lounge-wall]'));
    cy.get('a-entity[lounge-wall]').invoke('attr', 'lounge-wall')
      .should('nested.include',{'width': 10})
      .should('nested.include',{'depth': 0.3})
  });

});

describe('Wall component examples (screenshot)', () => {

  ['index', 'position', 'opacity'].forEach((example) => {
    it(`Screenshot (${example})`, () => {
      cy.visit('/examples/wall/' + example + '.html');
      cy.wait(3000);
      cy.screenshot(example);
    });
  });
});
