/*\
title: $:/plugins/sbruce/fitness/config-week.js
type: application/javascript
module-type: macro

Macro to configure a week

\*/
(function(){

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	var WEEK_CONFIG = "$:/config/fitness-week-config";

	var calendar = require("$:/plugins/sbruce/fitness/libraries/calendar.js").calendar;

	exports.name = "weekConfig";

	exports.params = [
		{name: "startDate", default: ""}
	];

	exports.run = function(startDate) {
		if (startDate == "") {
			var date = new Date();
		} else {
			var parsedDate = calendar.splitDate(startDate);
			var year = parsedDate[0];
			var month = parsedDate[1];
			var day = parsedDate[2];
			var date = new Date(year + "/" + month + "/" + day);
		}
		var startOfWeek = calendar.findStartOfWeek(date, "monday");
		var startingWeek = calendar.getWeek(date);
		var result = "|!Week|!Training Phase|\n";

		for (var week = startingWeek;week < 53; week++) {
			result = result + "|Week " + week + " (" + (startOfWeek.getMonth() + 1) + "/" + startOfWeek.getDate() + ")|<$select tiddler='" + WEEK_CONFIG + "' index='" + date.getFullYear() + week + "' default='$:/plugins/sbruce/training/phases/Undefined'>";
			result = result + "<option value=''> </option>";
			result = result + "<$list filter='[all[shadows+tiddlers]field:fitness_type[training_phase]!title[$:/plugins/sbruce/training/phases/Undefined]]'>";
			result = result + "<option value={{!!title}}><$view field='name'/></option></$list></$select>|\n";
			startOfWeek.setDate(startOfWeek.getDate() + 7);
		}
		return result;
	};

})();
