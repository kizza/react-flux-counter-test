"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CounterConstants = require('../constants/CounterConstants');

module.exports = {

  incrementTotal: function() {
    AppDispatcher.handleCounterAction({
      type: CounterConstants.INCREMENT
    });
  },

  decrementTotal: function() {
    AppDispatcher.handleCounterAction({
      type: CounterConstants.DECREMENT
    });
  }

};

