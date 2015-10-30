"use strict";

jest.dontMock('../../stores/CounterStore');
jest.dontMock('object-assign');

describe('CounterStore', function() {

  var CounterConstants = require('../../constants/CounterConstants');
  var actionIncrementTotal = {
    source: 'COUNTER_ACTION',
    action: {
      type: CounterConstants.INCREMENT
    }
  };
  var actionDecrementTotal = {
    source: 'COUNTER_ACTION',
    action: {
      type: CounterConstants.DECREMENT
    }
  };

  var AppDispatcher;
  var CounterStore;
  var callback;

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    CounterStore = require('../../stores/CounterStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialise with total of 0', function() {
    var total = CounterStore.getTotal();
    expect(total).toEqual(0);
  });

  it('should increment with increment action', function() {
    callback(actionIncrementTotal);
    var total = CounterStore.getTotal();
    expect(total).toEqual(1);
  });

  it('should decrement with decrement action', function() {
    callback(actionDecrementTotal);
    var total = CounterStore.getTotal();
    expect(total).toEqual(-1);
  });

});