Template.admin.helpers({
	storeState: function(openNow) {
		if (openNow) {
			return "Close"
		} else {
			return "Open"
		}
	}
})

Template.admin.events({
	"click #toggleStore": function(event) {

		Meteor.call("toggleStore", !event.target.value);
		return false;
	}
});