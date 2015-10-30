/** @jsx react.DOM */
"use strict";

var react     = require('react');
var CounterActionCreators = require('../../actions/CounterActionCreators');

module.exports = react.createClass({
  displayName: 'Counter',

  propTypes: {
    label: react.PropTypes.string
  },

  getInitialState: function() {
    return {
      label: this.props.label,
      value: 0
    };
  },

  incrementCount: function(){
    this.setState({
      value: this.state.value + 1
    });
    CounterActionCreators.incrementTotal();
  },

  decrementCount: function(){
    if (this.state.value > 0) {
      this.setState({
        value: this.state.value - 1
      });
      CounterActionCreators.decrementTotal();
    }
  },

  render: function() {
    return <div className="Counter">
          <span>{this.state.label}: {this.state.value}</span>
          <button onClick={this.incrementCount} className="increment">+</button> 
          <button onClick={this.decrementCount} className="decrement">-</button>
        </div>;
  },
});
