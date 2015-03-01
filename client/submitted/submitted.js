Template.submitted.helpers({
	success: function() {
		var status = Session.get("success");
		if (status == "true") {
			return true;
		} else {
			return false;
		}
	}
});