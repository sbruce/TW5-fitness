/*\
title: $:/plugins/sbruce/fitness/display-training-calendar.js
type: application/javascript
module-type: macro

Displays a list of training weeks. Defaults to 4 weeks.

\*/
(function(){
  "use strict";

  var calendar = require("$:/plugins/sbruce/fitness/libraries/calendar.js").calendar;

  exports.name = "displayTrainingCalendar";

  exports.params = [
    {name: "startingDate"},
    {name: "template", default: "$:/plugins/sbruce/fitness/calendar-template"},
    {name: "offset", default: "0"},
    {name: "weeksToDisplay", default: "4"},
    {name: "sow", default: "monday"}
  ];

  exports.run = function(startingDate, template, offset, weeksToDisplay, sow) {
    var parsedDate = calendar.splitDate(startingDate);
		var year = parsedDate[0];
		var month = parsedDate[1];
		var day = parsedDate[2];
		var today = new Date(year + "/" + month + "/" + day);
		var startOfWeek = calendar.findStartOfWeek(today, sow);
    // Apply the offset, if any
		startOfWeek.setDate(startOfWeek.getDate() + (Number(offset) * 7));

    var result = "";


    for (var i = 0; i < Number(weeksToDisplay); i++) {
      result = result + "<$macrocall $name=\"displayWeek\" dateString=" + calendar.dateToDateString(startOfWeek) + " template=\"$:/plugins/sbruce/fitness/templates/calendar-template\" sow={{$:/config/fitness/start-of-week}}/>\n\n";
      startOfWeek.setDate(startOfWeek.getDate() + 7);
    }

    return result;
  };

})();
