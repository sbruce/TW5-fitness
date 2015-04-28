/*\
title: $:/plugins/sbruce/fitness/display-week.js
type: application/javascript
module-type: macro

Display the workouts for the next seven days

\*/
(function(){

	"use strict";

	exports.name = "displayWeek";

	exports.params = [
		{name: "year"},
		{name: "month"},
		{name: "day"},
		{name: "template", default: "$:/plugins/sbruce/fitness/calendar-template"}
	];

	var nextDay = function(date) {
		var tomorrow = new Date(date.getYear(), date.getMonth(), date.getDate());
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	};


	exports.run = function(year, month, day, template) {
		var result = "|";
		var today = new Date(year, month, day);
		// Display the header
		for (var i = 0; i < 7; i++) {
			result = result + today.getMonth() + "/" + today.getDate() + "|";
			today = nextDay(today);
		}
		result = result + "\n|";
		var today = new Date(year, month, day);
		for (var i = 0; i < 7; i++) {
			result = result + "<$list filter=\"[tag[Workout]year[" + year + "]day[" + today.getDate() + "]]\">{{||" + template + "}}</$list>|";
			today = nextDay(today);
		}

		result = result + "\n";
		return result;
	};

})();
