// var Store = require("store");
// var Dispatcher = require("dispacter");
// var Views = require("views");
// var Actions = require("actions");

requirejs(["store", "action", "dispatcher", "views"], function (Store, Action, Dispatcher, views) {
	console.log("hello -- why does this happen twice");
});