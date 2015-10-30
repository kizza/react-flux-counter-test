var AppDispatcher = require('../dispatcher/AppDispatcher');
var CounterConstants = require('../constants/CounterConstants');

var EventEmitter = require('events').EventEmitter;
var assign = require("object-assign");
var CHANGE_EVENT = 'change';
var _total = 0;


var CounterStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getTotal:function(){
    return _total;
  },

  reset:function(){
    _total = 0;
  }

});


CounterStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case CounterConstants.INCREMENT:
      _total += 1;
      CounterStore.emitChange();
      break;

    case CounterConstants.DECREMENT:
      _total -= 1;
      CounterStore.emitChange();
      break;
  }
});

module.exports = CounterStore;
