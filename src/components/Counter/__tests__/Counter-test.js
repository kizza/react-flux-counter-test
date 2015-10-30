/** @jsx react.DOM */
"use strict";

jest.dontMock('../index');
jest.dontMock('object-assign');
    
describe('Counter', function() {
  var react  = require('react/addons');
  var TestUtils = react.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var findByTag = TestUtils.findRenderedDOMComponentWithTag;
  var simulateClick = TestUtils.Simulate.click;
  var CounterActionCreators = require('../../../actions/CounterActionCreators');
  var Counter = require('../index');
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<Counter label="Test" />);
  });

  it('should render with initial value of 0', function() {
    var label = findByTag(component, 'span');
    expect(label.getDOMNode().textContent).toBe('Test: 0');
  });

  it('should increment when "+" button pressed', function() {
    var incrementButton = findByClass(component, 'increment');
    var label = findByTag(component, 'span');
    simulateClick(incrementButton.getDOMNode());
    expect(label.getDOMNode().textContent).toBe('Test: 1');
  });

  it('should not decrement below 0', function() {
    var decrementButton = findByClass(component, 'decrement');
    var label = findByTag(component, 'span');
    simulateClick(decrementButton.getDOMNode());
    expect(label.getDOMNode().textContent).toBe('Test: 0');
  });

  it('should decrement to 0 after incrementing first', function() {
    var incrementButton = findByClass(component, 'increment');
    var decrementButton = findByClass(component, 'decrement');
    var label = findByTag(component, 'span');
    simulateClick(incrementButton.getDOMNode());
    simulateClick(decrementButton.getDOMNode());
    expect(label.getDOMNode().textContent).toBe('Test: 0');
  });

  it('should run callback increment action when incremented', function() {
    CounterActionCreators.incrementTotal = jest.genMockFunction();
    var incrementButton = findByClass(component, 'increment');
    simulateClick(incrementButton.getDOMNode());
    expect(CounterActionCreators.incrementTotal.mock.calls.length).toBe(1);
  });

  it('should not run decrement action when decremented at 0', function() {
    CounterActionCreators.decrementTotal = jest.genMockFunction();
    var decrementButton = findByClass(component, 'decrement');
    simulateClick(decrementButton.getDOMNode());
    expect(CounterActionCreators.decrementTotal.mock.calls.length).toBe(0);
  });

  it('should run decrement action function when decremented after incrementing first', function() {
    CounterActionCreators.decrementTotal = jest.genMockFunction();
    var incrementButton = findByClass(component, 'increment');
    var decrementButton = findByClass(component, 'decrement');
    simulateClick(incrementButton.getDOMNode());
    simulateClick(decrementButton.getDOMNode());
    expect(CounterActionCreators.decrementTotal.mock.calls.length).toBe(1);
  });

});