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
		{name: "dateString"},
		{name: "template", default: "$:/plugins/sbruce/fitness/calendar-template"},
		{name: "offset", default: "0"}
	];

	var nextDay = function(date) {
		var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	};

	var splitDate = function(dateString) {
		var year = dateString.substr(0,4);
		var month = dateString.substr(4,2);
		var day = dateString.substr(6,2);
		return [year, month, day];
	}

	var findSunday = function(date) {
		var sunday = new Date(date);
		for (var i = 0; i < date.getDay(); i++) {
			sunday.setDate(sunday.getDate() - 1);
		}
		return sunday;
	}

	var dateToDateString = function(dateInput) {
		var month = dateInput.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		var date = dateInput.getDate();
		if (date < 10) {
			date = "0" + date;
		}
		return dateInput.getFullYear() + month + date;
	}

	exports.run = function(dateString, template, offset) {
		if (dateString.length < 8) {
			return;
		}
		var parsedDate = splitDate(dateString);
		var year = parsedDate[0];
		var month = parsedDate[1];
		var day = parsedDate[2];
		var result = "|";
		var today = new Date(year + "/" + month + "/" + day);
		var sunday = findSunday(today);

		// Apply the offset, if any
		sunday.setDate(sunday.getDate() + (Number(offset) * 7));

		var curDay = new Date(sunday);
		// Display the header
		for (var i = 0; i < 7; i++) {
			result = result + curDay.getMonth() + "/" + curDay.getDate() + "|";
			curDay = nextDay(curDay);
		}
		result = result + "\n|";
		var curDay = new Date(sunday)
		for (var i = 0; i < 7; i++) {
			result = result + "<$list filter='[workout_date[" + dateToDateString(curDay) + "]]'>{{||" + template + "}}</$list>|";
			curDay = nextDay(curDay);
		}

		result = result + "\n";
		return result;
	};

})();
