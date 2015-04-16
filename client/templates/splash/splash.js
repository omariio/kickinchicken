Template.splash.helpers({
	announcement: function() {
		return Announcements.find({}, {sort:{createdAt:-1}, limit: 1}).fetch();
	}
});