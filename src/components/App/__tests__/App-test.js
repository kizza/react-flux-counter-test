/** @jsx react.DOM */
"use strict";

jest.autoMockOff();

describe('App', function() {
  var react  = require('react/addons');
  var App = require('../index');
  var Counter = require('../../Counter/index');
  var TestUtils = react.addons.TestUtils;
  var findByType = TestUtils.findRenderedComponentWithType;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var findByTag = TestUtils.findRenderedDOMComponentWithTag;
  var scryByType = TestUtils.scryRenderedComponentsWithType;
  var simulateClick = TestUtils.Simulate.click;
  var simulateSubmit = TestUtils.Simulate.submit;
  var CounterStore = require('../../../stores/CounterStore');
  var component;
  
  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<App/>);
    CounterStore.reset();
  });

  it('should render the App header', function() {
    var header = findByTag(component, 'h1');
    expect(header.getDOMNode().textContent).toBe('Counter App');
  });

  it('should initially have total of 0', function() {
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

  it('should start with 0 counters', function() {
    var counters = scryByType(component, Counter);
    expect(counters.length).toBe(0);
  });

  it('should be able to create a counter by name', function() {
    var counterName = findByTag(component, 'input');
    counterName.getDOMNode().value = 'Custom name';
    var form = findByTag(component, 'form');
    simulateSubmit(form);
    var counter = findByType(component, Counter);
    expect(counter.getDOMNode().textContent).toContain('Custom name');
  });

  it('should increment total from single child counter', function() {
    component.createNewCounter('Test counter');
    var counter = findByType(component, Counter);
    simulateClick(findByClass(counter, 'increment').getDOMNode());
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 1');
  });

  it('should increment total from multiple child counters', function() {
    component.createNewCounter('Test counter 1');
    component.createNewCounter('Test counter 2');

    var counters = scryByType(component, Counter);
    simulateClick(findByClass(counters[0], 'increment').getDOMNode());
    simulateClick(findByClass(counters[1], 'increment').getDOMNode());

    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 2');
  });

  it('should decrement total from single child counter', function() {
    component.createNewCounter('Test counter');
    var counter = findByType(component, Counter);
    simulateClick(findByClass(counter, 'increment').getDOMNode());
    simulateClick(findByClass(counter, 'decrement').getDOMNode());
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

  it('should decrement total from multiple child counters', function() {
    component.createNewCounter('Test counter 1')
    component.createNewCounter('Test counter 2');
    var counters = scryByType(component, Counter);
    var totalLabel = findByTag(component, 'h2');

    // Set incremented state
    simulateClick(findByClass(counters[0], 'increment').getDOMNode());
    simulateClick(findByClass(counters[1], 'increment').getDOMNode());
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 2');

    // Decrement state
    simulateClick(findByClass(counters[0], 'decrement').getDOMNode());
    simulateClick(findByClass(counters[1], 'decrement').getDOMNode());
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

});
