Template.checkout.helpers({


});

Template.checkout.events({
	'submit #submit-order': function (event) {
		var cart = Session.get("cart");
		var order = {
			cart:cart,
			firstname:document.getElementById("firstname").value,
			lastname:document.getElementById("lastname").value,
			address:document.getElementById("address").value,
			city:document.getElementById("city").value,
			zip:document.getElementById("zip").value,
			instr:document.getElementById("instr").value,
			phone:document.getElementById("phone").value,	
		};
		Meteor.call("submitOrder", order);
	}
});