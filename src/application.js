/** @jsx react.DOM */
"use strict";

var react  = require('react');
var App = require('./components/App');

react.renderComponent(
  App(),
  document.body
);
