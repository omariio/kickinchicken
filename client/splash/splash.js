Template.splash.helpers({

	openNow: function() {
		var d = new Date;
		var minutes = d.getMinutes()
		var hoursAsMinutes = (d.getHours() * 60);
		var timeNow = hoursAsMinutes + minutes;

		var timeOpen = 1260; // time in minutes since midnight
		var timeClosed = 120; // time in minutes since midnight

		var openNow = (timeOpen < timeNow || timeNow < timeClosed);
		return openNow;
	}

});