/*\
title: $:/plugins/sbruce/fitness/macros/display-week.js
type: application/javascript
module-type: macro

Display the workouts for the next seven days

\*/
(function(){

	"use strict";

	var calendar = require("$:/plugins/sbruce/fitness/libraries/calendar.js").calendar;

	exports.name = "displayWeek";

	exports.params = [
		{name: "dateString"},
		{name: "template", default: "$:/plugins/sbruce/fitness/calendar-template"},
		{name: "sow", default: "monday"}
	];

	exports.run = function(dateString, template, sow) {
		if (dateString.length < 8) {
			return;
		}
		var split_date = calendar.splitDate(dateString);
		var year = split_date[0];
		var month = split_date[1];
		var day = split_date[2];
		var date = new Date(year + "/" + month + "/" + day);
		var today = new Date();
		var start_of_week = calendar.findStartOfWeek(date, sow);

		var result = "<$set name=\"week\" value=" + calendar.getWeek(start_of_week) + ">\n";
		result = result + "{{$:/plugins/sbruce/fitness/templates/WeekSummaryBox}}\n";

		result = result + "<table class=\"calendar-table\">\n"

		var curDay = new Date(start_of_week);
		// Display the header
		result = result + "<tr>\n"
		for (var i = 0; i < 7; i++) {
			if (calendar.compareDate(curDay, today) == true) {
				result = result + "<th class=\"date_today\">";
			} else {
				result = result + "<th>";
			}
			result = result + calendar.printShortDay(curDay) + " " + (Number(curDay.getMonth()) + 1) + "/" + curDay.getDate();
			result = result + "<$set name=\"workout_date\" value=\"" + calendar.dateToDateString(curDay)  + "\">{{$/plugins/sbruce/fitness/ui/buttons/add-workout-button}}</$set>"
			result = result + "</th>\n";
			curDay = calendar.nextDay(curDay);
		}
		result = result + "</tr>\n";
		// Start of the data row
		result = result + "<tr>\n";
		var curDay = new Date(start_of_week)
		for (var i = 0; i < 7; i++) {
			result = result + "<td><$list filter='[workout_date[" + calendar.dateToDateString(curDay) + "]!has[draft.of]]'>{{||" + template + "}}</$list></td>\n"
			curDay = calendar.nextDay(curDay);
		}

		result = result + "</tr></table>\n";
		return result;
	};

})();
