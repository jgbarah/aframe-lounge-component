/*
 * Cypress tests for lounge component
 */
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

describe('Lounge component examples (index)', () => {

  beforeEach(() => {
    cy.visit('/examples/basic/index.html');
  });

  it('Basic', () => {
    assert.exists(cy.get('a-entity[lounge]'));
    assert.exists(cy.get('a-entity[lounge-floor]'));
    assert.exists(cy.get('a-entity[lounge-ceiling]'));
    assert.exists(cy.get('a-entity[lounge-wall__north]'));
    assert.exists(cy.get('a-entity[lounge-wall__east]'));
    assert.exists(cy.get('a-entity[lounge-wall__south]'));
    assert.exists(cy.get('a-entity[lounge-wall__west]'));
  });

  it('Screenshot', () => {
    cy.wait(1000);
    cy.screenshot('index');
  });

});

describe('Lounge component examples (creative)', () => {

  beforeEach(() => {
    cy.visit('/examples/basic/creative.html');
  });

  it('Basic', () => {
    assert.exists(cy.get('a-entity[lounge]'));
    assert.exists(cy.get('a-entity[lounge-floor]'));
    assert.exists(cy.get('a-entity[lounge-wall__north]'));
    assert.exists(cy.get('a-entity[lounge-wall__east]'));
    assert.exists(cy.get('a-entity[lounge-wall__south]'));
    assert.exists(cy.get('a-entity[lounge-wall__west]'));
  });

  it('Screenshot', () => {
    cy.wait(2000);
    cy.screenshot('creative');
  });

});

describe('Lounge component examples (open)', () => {

  beforeEach(() => {
    cy.visit('/examples/basic/open.html');
  });

  it('Basic', () => {
    assert.exists(cy.get('a-entity[lounge]'));
    assert.exists(cy.get('a-entity[lounge-floor]'));
    assert.exists(cy.get('a-entity[lounge-wall__east]'));
    assert.exists(cy.get('a-entity[lounge-wall__south]'));
    assert.exists(cy.get('a-entity[lounge-wall__west]'));
  });

  it('Screenshot', () => {
    cy.wait(3000);
    cy.screenshot('open');
  });

});

describe('Lounge component examples (barrier)', () => {

  beforeEach(() => {
    cy.visit('/examples/basic/barrier.html');
  });

  it('Basic', () => {
    assert.exists(cy.get('a-entity[lounge]'));
    assert.exists(cy.get('a-entity[lounge-floor]'));
    assert.exists(cy.get('a-entity[lounge-wall__east]'));
    assert.exists(cy.get('a-entity[lounge-wall__south]'));
    assert.exists(cy.get('a-entity[lounge-wall__west]'));
  });

  it('Screenshot', () => {
    cy.wait(3000);
    cy.screenshot('barrier');
  });

});
