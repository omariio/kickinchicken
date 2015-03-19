
Meteor.subscribe("items");

Meteor.startup(function () {
    // code to run on server at startup
    if(!Session.get("cart")){
      Session.set("cart", []);
    }
});

UI.registerHelper("openNow", function() {
	// this returns true if the users local time (in minutes) falls in the
	// hours (also in minutes) that the store is open: 9pm PST to 2AM PST.
	var d = new Date;
	var minutes = d.getMinutes()
	var hoursAsMinutes = (d.getHours() * 60); // converts current hour to minutes
	var timeNow = hoursAsMinutes + minutes; // adds the current minutes to hour

	var timeOpen = 1260; // time in minutes since midnight for open
	var timeClosed = 120; // time in minutes since midnight for closed

	var open = (timeOpen < timeNow || timeNow < timeClosed);
	return false;
});