
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
  }
});

Template.menu.events({
  'click .up': function(event){
    //var id = event.target.id.replace("item-", "");
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