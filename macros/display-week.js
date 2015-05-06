/*\
title: $:/plugins/sbruce/fitness/display-week.js
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
		{name: "offset", default: "0"},
		{name: "sow", default: "monday"}
	];

	exports.run = function(dateString, template, offset, sow) {
		if (dateString.length < 8) {
			return;
		}
		var parsedDate = calendar.splitDate(dateString);
		var year = parsedDate[0];
		var month = parsedDate[1];
		var day = parsedDate[2];
		var today = new Date(year + "/" + month + "/" + day);
		var startOfWeek = calendar.findStartOfWeek(today, sow);
		// Apply the offset, if any
		startOfWeek.setDate(startOfWeek.getDate() + (Number(offset) * 7));

		var result = "<$set name=\"week\" value=" + calendar.getWeek(startOfWeek) + ">\n";
		result = result + "{{$:/plugins/sbruce/fitness/templates/WeekSummaryBox}}\n";


		result = result + "<table class=\"calendar-table\">\n"

		var curDay = new Date(startOfWeek);
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
		var curDay = new Date(startOfWeek)
		for (var i = 0; i < 7; i++) {
			result = result + "<td><$list filter='[workout_date[" + calendar.dateToDateString(curDay) + "]!has[draft.of]]'>{{||" + template + "}}</$list></td>\n"
			curDay = calendar.nextDay(curDay);
		}

		result = result + "</tr></table>\n";
		return result;
	};

})();
