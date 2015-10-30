"use strict";

var Dispatcher = require('flux').Dispatcher;
var assign = require("object-assign");

var AppDispatcher = assign(new Dispatcher(), {

  handleCounterAction: function(action) {
    var payload = {
      source: 'COUNTER_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
