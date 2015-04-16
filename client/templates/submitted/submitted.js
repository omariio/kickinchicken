Template.submitted.helpers({
	success: function() {
		var status = Session.get("success");
		if (status) {
			return true;
		} else {
			return false;
		}
	}
});