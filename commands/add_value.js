/*\
title: $:/plugins/sbruce/fitness/commands/addvalue.js
type: application/javascript
module-type: widget

Action widget that reads a value from the tiddler and adds a value.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var AddValueWidget = function(parseTreeNode, options) {
	this.initialise(parseTreeNode, options);
};

AddValueWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
AddValueWidget.prototype.render = function(parent, nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
AddValueWidget.prototype.execute = function() {
	this.actionTiddler = this.getAttribute("$tiddler");
	this.actionValue = this.getAttribute("$value");
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
AddValueWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$tiddler"] || changedAttributes["$value"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
AddValueWidget.prototype.invokeAction = function(triggeringWidget,event) {
	var self = this;

	var tiddler = this.wiki.getTiddler(this.actionTiddler);
	if (!tiddler) {
		// If the tiddler doesn't exist, set its initial value to 0
		var currentValue = 0;
	} else {
		var currentValue = Number(tiddler.fields.text);
		if (isNaN(currentValue)) {
			// If the tiddler doesn't contain just a number, abort
			return false;
		}
	}
	var addValue = Number(this.actionValue);
	if (isNaN(addValue)) {
		return false;
	}

	var newValue = currentValue + addValue;

	this.wiki.setText(this.actionTiddler,false, false, String(newValue));

	return true; // Action was invoked
};

exports["action-addvalue"] = AddValueWidget;

})();
