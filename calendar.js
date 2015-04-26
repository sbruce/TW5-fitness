/*\
title: $:/plugins/sbruce/fitness/calendar.js
type: application/javascript
module-type: library

Calendar tools

\*/
(function(){

	"use strict";

	var nextDay = function(year, month, day) {
		var tomorrow = new Date(year, month, day);
		tomorrow.setDate(tomorrow.getDate() + 1);
		return [tomorrow.getYear(), tomorrow.getMonth(), tomorrow.getDate()];
	};


	exports.calendar = {
		nextDay: nextDay
	};

})();