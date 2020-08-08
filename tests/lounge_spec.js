describe('Lounge component', () => {

  beforeEach(() => {
    cy.visit('/tests/index.html');
  });

  it('Creation', () => {
    cy.get('a-scene').then(scene => {
      let lounge = Cypress.$('<a-entity lounge></a-entity>');
      Cypress.$(scene).append(lounge);
    });
    assert.exists(cy.get('a-entity[lounge]'));
    cy.get('a-entity[lounge]').invoke('attr', 'lounge')
      .should('nested.include',{'width': 10})
      .should('nested.include',{'depth': 7})
  });

  it('Attributes (width, depth)', () => {
    cy.get('a-scene').then(scene => {
      let lounge = Cypress.$('<a-entity lounge="width: 7, depth: 7"></a-entity>');
      Cypress.$(scene).append(lounge);
    });
    cy.get('a-entity[lounge]').invoke('attr', 'lounge')
      .should('nested.include',{'width': 7})
      .should('nested.include',{'depth': 7})
  });
});

describe('Lounge component examples', () => {

  it('Basic', () => {
    cy.visit('/examples/basic/index.html');
    assert.exists(cy.get('a-entity[lounge]'));
    assert.exists(cy.get('a-entity[lounge-floor]'));
    assert.exists(cy.get('a-entity[lounge-wall__north]'));
    assert.exists(cy.get('a-entity[lounge-wall__east]'));
    assert.exists(cy.get('a-entity[lounge-wall__south]'));
    assert.exists(cy.get('a-entity[lounge-wall__west]'));
  });
});
