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
  },

  tax: function() {
  	var total = Template.menu.__helpers[" total"]()
  	var totalTax = Template.menu.__helpers[" totalWithTax"]()
  	return (totalTax - total).toFixed(2);
  },

  totalItem: function(quantity, price) {
  	return (quantity * price);
  },
  currentTime: function() {
    var d = new Date;
    return d.toLocalTimeString();
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
      payment:document.getElementById("paytype").value,
      time:document.getElementById("time").value
    };

    //FIXME, eventually the Meteor.call should return a callback that should
    //be part of the success criteria, but right now I think the form causes a
    //redirect before the callback happens.
    if(isEnough())
      Session.set("success", true);
    else
      Session.set("success", false);
		Session.set("cart",[]);
		Meteor.call("submitOrder", order);
	}
});