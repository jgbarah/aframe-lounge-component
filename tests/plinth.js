/*
 * Cypress tests for plinth component
 */
describe('Plinth component', () => {

  beforeEach(() => {
    cy.visit('/tests/index.html');
  });

  it('Creation', () => {
    cy.get('a-scene').then(scene => {
      let plinth = Cypress.$('<a-entity lounge-plinth></a-entity>');
      Cypress.$(scene).append(plinth);
    });
    assert.exists(cy.get('a-entity[lounge-plinth]'));
    cy.get('a-entity[lounge-plinth]').invoke('attr', 'lounge-plinth')
      .should('nested.include',{'width': 1})
      .should('nested.include',{'depth': 1})
      .should('nested.include',{'height': .5})
  });

});

describe('Plinth component examples (screenshot)', () => {

  ['index'].forEach((example) => {
    it(`Screenshot (${example})`, () => {
      cy.visit('/examples/plinth/' + example + '.html');
      cy.wait(3000);
      cy.screenshot(example);
    });
  });
});
