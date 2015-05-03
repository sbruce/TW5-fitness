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

  /* Split a workout dateString: 20150401 into a [year, month, day] array
	*/
	var splitDate = function(dateString) {
		var year = dateString.substr(0,4);
		var month = dateString.substr(4,2);
		var day = dateString.substr(6,2);
		return [year, month, day];
	}

  /* TODO: change to findStartOfWeek
		 Add an option to select the start of the week (Sun or Mon)
	*/
	var findStartOfWeek = function(date, day) {
		var startOfWeek = new Date(date);
		if (day == 'startOfWeek') {
			var i = 0;
		}
		if (day == 'monday') {
			var i = 1;
		}
		for (;i < date.getDay(); i++) {
			startOfWeek.setDate(startOfWeek.getDate() - 1);
		}
		return startOfWeek;
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

	var getWeek = function(date) {
        var onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

	var compareDate = function(d1, d2) {
		if (d1.getYear() == d2.getYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()) {
			return true;
		} else {
			return false;
		}
	}

	exports.run = function(dateString, template, offset) {
		if (dateString.length < 8) {
			return;
		}
		var parsedDate = splitDate(dateString);
		var year = parsedDate[0];
		var month = parsedDate[1];
		var day = parsedDate[2];
		var today = new Date(year + "/" + month + "/" + day);
		var startOfWeek = findStartOfWeek(today, 'monday');
		// Apply the offset, if any
		startOfWeek.setDate(startOfWeek.getDate() + (Number(offset) * 7));

		var result = "Week: " + getWeek(startOfWeek) + "\n\n";
		result = result + "<table class=\"calendar-table\">\n"

		var curDay = new Date(startOfWeek);
		// Display the header
		result = result + "<tr>\n"
		for (var i = 0; i < 7; i++) {
			if (compareDate(curDay, today) == true) {
				result = result + "<th class=\"date_today\">";
			} else {
				result = result + "<th>";
			}
			result = result + curDay.getMonth() + "/" + curDay.getDate() + "</th>\n";
			curDay = nextDay(curDay);
		}
		result = result + "</tr>\n";
		// Start of the data row
		result = result + "<tr>\n";
		var curDay = new Date(startOfWeek)
		for (var i = 0; i < 7; i++) {
			result = result + "<td><$list filter='[workout_date[" + dateToDateString(curDay) + "]!has[draft.of]]'>{{||" + template + "}}</$list></td>\n"
			curDay = nextDay(curDay);
		}

		result = result + "</tr></table>\n";
		return result;
	};

})();
