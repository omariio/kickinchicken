Meteor.subscribe("items");
Meteor.subscribe("groups");
Meteor.subscribe("announcements");

Meteor.startup(function () {
    // code to run on server at startup
    if(!Session.get("cart")){
      Session.set("cart", []);
    }
});

UI.registerHelper("openNow", function() {
	// returns true if the users local time falls in the hours that the
	// store is open: 9pm PST to 2AM PST. Time is in minutes
	var d = new Date;
	var timeNow = (d.getHours() * 60) + d.getMinutes; // adds the current minutes to hour
	var timeOpen = 1260; // time in minutes from midnight for open
	var timeClosed = 120; // time in minutes from midnight for closed

	return (timeOpen < timeNow || timeNow < timeClosed);
});