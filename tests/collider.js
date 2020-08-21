/*
 * Cypress tests for collider component
 */
describe('Collider component', () => {

  beforeEach(() => {
    cy.visit('/tests/index.html');
  });

  it('Creation', () => {
    // Set up scene to test
    cy.get('a-scene').then(scene => {
      let wall = Cypress.$('<a-entity lounge-wall></a-entity>');
      Cypress.$(scene).append(wall);
      let collider = Cypress.$('<a-entity position="0 0 1" geometry="primitive: box" lounge-collider animation="property: position; to: 0 0 -2;"></a-entity>');
      Cypress.$(scene).append(collider);
    });
    // Test entities existence
    assert.exists(cy.get('a-entity[lounge-wall]'));
    assert.exists(cy.get('a-entity[lounge-collider]'));
    // Test event is fired
    let result = {};
    cy.get('a-entity[lounge-wall]').then(($wall) => {
//      console.log($wall.get(0));
      $wall.on('hitstart', function () {
        result.e = 1;
      });
    });
    cy.wrap(result).should(result => expect(result.e).not.to.be.undefined);
  });

});

describe('Collider component examples (screenshot)', () => {

  ['wall'].forEach((example) => {
    it(`Screenshot (${example})`, () => {
      cy.visit('/examples/collider/' + example + '.html');
      cy.wait(3000);
      cy.screenshot(example);
    });
  });
});
