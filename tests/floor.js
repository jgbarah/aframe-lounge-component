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

describe('Floor component examples (index)', () => {

  beforeEach(() => {
    cy.visit('/examples/floor/index.html');
  });

  it('Screenshot', () => {
    cy.wait(1000);
    cy.screenshot('index');
  });

});

describe('Floor component examples (textured)', () => {

  beforeEach(() => {
    cy.visit('/examples/floor/textured.html');
  });

  it('Screenshot', () => {
    cy.wait(1000);
    cy.screenshot('textured');
  });

});
