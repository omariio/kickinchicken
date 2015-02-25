
Template.menu.helpers({
  items: function(){
    return Items.find().fetch();
  },
  quantity: function(_id) {
    var cart = Session.get("cart");
    var q = cart["item-" + _id];
    if(q)
      return q;
    else
      return 0;
  },
  cartItems: function(){
    var cart = Session.get("cart");
    // _.forEach(Session.get("cart"), function(item){
    //   //var id = item.id.replace("item-", "");
    //   console.log(item);

    // })
    for (var key in cart) {
      var id = key.replace("item-", "");
      console.log(id);
    }

    return [];
  }
});

Template.menu.events({
  'click .up': function(event){
    var id = event.target.id;
    var cart = Session.get("cart");
    if(!cart[id]){
      cart[id] = 0;
    }
    cart[id]++;

    Session.set("cart", cart);
  },
  'click .down': function(event){
    var id = event.target.id;
    var cart = Session.get("cart");
    if(!cart[id]){
      cart[id] = 0;
    }

    if(cart[id] > 0)
      cart[id]--;

    Session.set("cart", cart);

  }
})