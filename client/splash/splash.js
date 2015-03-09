Template.splash.helpers({

	openNow: function() {
		var d = new Date;
		var minutes = d.getMinutes()
		var hoursAsMinutes = (d.getHours() * 60); // converts current hour to minutes
		var timeNow = hoursAsMinutes + minutes; // adds the current minutes to hour

		var timeOpen = 1260; // time in minutes since midnight for open
		var timeClosed = 120; // time in minutes since midnight for closed

		var openNow = (timeOpen < timeNow || timeNow < timeClosed);
		return openNow;
	}

});