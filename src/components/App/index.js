/** @jsx react.DOM */
"use strict";

var react     = require('react');
var Counter = require('./../Counter');
var CounterStore = require('../../stores/CounterStore');

function getAppState() {
  return {
    total: CounterStore.getTotal()
  };
}

module.exports = react.createClass({
  displayName: 'App',

  getInitialState: function() {
    return {
      counters:[],
      total: 0
    };
  },

  componentDidMount: function() {
    CounterStore.addChangeListener(this.onTotalChange);
  },

  componentWillUnmount: function() {
    CounterStore.removeChangeListener(this.onTotalChange);
  },

  onTotalChange: function() {
    this.setState(getAppState());
  },

  formCallback: function(e) {
    e.preventDefault();
    var input = this.refs.counterName.getDOMNode();
    var counterName = input.value.trim();
    input.value = '';
    this.createNewCounter(counterName);
  },

  createNewCounter:function(counterName){
    if (!counterName){
      alert('Please enter a counter name');
      return false;
    }
    var counters = this.state.counters;
    counters.push({
      'id': 'counter-'+counters.length,
      'label': counterName
    });
    this.setState({counters: counters});
    return counters;
  },

  render: function() {
    var counters = this.state.counters;
    return <div className="App">
        <h1>Counter App</h1>
        <h2>Total: {this.state.total}</h2>
        <p id="counters">
        {
          counters.map(function(result) {
            return (
              <Counter key={result.id} label={result.label} />
            )}, this)
        }  
        </p> 
        <form onSubmit={this.formCallback}>
          <p>New counter <input type="text" placeholder="Counter Name" ref="counterName" />
          <button type="submit">Add</button></p>
        </form>
      </div>;
  },
});
