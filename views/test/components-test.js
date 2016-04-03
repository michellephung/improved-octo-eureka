var TestDom = require('../../test-config/testdom')
  ('<html><body><div id="app"></div></body></html>');
var TestUtils = require('react-addons-test-utils');
var React = require('react');
var ReactDOM = require('react-dom');
var assert = require('assert');

var Parent;
var Components;

describe('Components', function () {
  beforeEach(function () {
    Parent = document.createElement('div');
    Components = require('../components');
  });

  it('should show start word', function () {
    var input = TestUtils.renderIntoDocument(
      <Components.StartPlayingWordInput
        word = "a"
        wordMax = {10} />, Parent
    );

    var inputNode = ReactDOM.findDOMNode(input);

    assert.equal(inputNode.value, undefined);
    
    inputNode.value = 'giraffe';
    TestUtils.Simulate.change(inputNode);
    //TestUtils.Simulate.keyDown(inputNode, {key: "Enter", keyCode: 13, which: 13});

    assert.equal(inputNode.value, 'giraffe');
    assert.equal(input.props.wordMax, 10);
  });

  it('should show start btn after typing', function () {

  });
});