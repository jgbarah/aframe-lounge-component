/*
 * Cypress tests for staydown component
 */
describe('Staydown component', () => {

  beforeEach(() => {
    cy.visit('/tests/index.html');
  });

  it('Creation', () => {
    cy.get('a-scene').then(scene => {
      let lounge = Cypress.$('<a-entity lounge></a-entity>');
      Cypress.$(scene).append(lounge);
      let staydown = Cypress.$('<a-entity lounge-plinth lounge-staydown></a-entity>');
      Cypress.$(lounge).append(staydown);
    });
    assert.exists(cy.get('a-entity[lounge]'));
    assert.exists(cy.get('a-entity[lounge-plinth]'));
    assert.exists(cy.get('a-entity[lounge-staydown]'));
    cy.get('a-entity[lounge-staydown]')
      .invoke('prop', 'object3D')
      .should('nested.include', {'position.y': -1.75});
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
