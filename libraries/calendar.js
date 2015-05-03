/*\
title: $:/plugins/sbruce/fitness/libraries/calendar.js
type: application/javascript
module-type: library

Calendar tools

\*/
(function(){

	"use strict";

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

	var findStartOfWeek = function(date, day) {
		var startOfWeek = new Date(date);
		if (day == 'sunday') {
			var i = 0;
		}
		if (day == 'monday') {
			var i = 1;
		}

		if (startOfWeek.getDay() == i) {
			return startOfWeek;
		}
		// If today is Sunday and the start of the week is monday
		if (startOfWeek.getDay() == 0 && day == 'monday') {
			startOfWeek.setDate(startOfWeek.getDate() - 6);
			return startOfWeek;
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

	var printShortDay = function(date) {
		switch (date.getDay()) {
			case 0: return "Sun";
			case 1: return "Mon";
			case 2: return "Tue";
			case 3: return "Wed";
			case 4: return "Thu";
			case 5: return "Fri";
			case 6: return "Sat";
			case 7: return "Sun";
			default: return "";
		}
	}

	exports.calendar = {
		nextDay: nextDay,
		splitDate: splitDate,
		findStartOfWeek: findStartOfWeek,
		dateToDateString: dateToDateString,
		getWeek: getWeek,
		compareDate: compareDate,
		printShortDay: printShortDay
	};

})();
