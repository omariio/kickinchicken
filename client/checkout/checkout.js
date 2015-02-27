Template.checkout.helpers({
  cartItems: function(){
    var cart = Session.get("cart");
    _.filter(cart, function(i){
      return (i.cartQuantity && i.cartQuantity != 0)
    });
    return cart;
  },
  total: function() {
    var items = Template.menu.__helpers[" cartItems"]()
    var total = 0;
    _.forEach(items, function(item){
      total += parseFloat(item.price) * item.cartQuantity;
    });
    return total;
  },
  totalWithTax: function() {
    var total = Template.menu.__helpers[" total"]()
    return (total * 1.075).toFixed(2);
  }
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