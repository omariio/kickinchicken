
Template.menu.rendered = function(){
  // if not the admin
  if(!Meteor.user() || !Meteor.user().roles)
    return;

  Deps.autorun(function(){
    var items = Items.find().fetch();
    _.forEach(items, function(n){
      document.getElementById("visible-checkbox-" + n._id).checked = n.visible;
    });
  });
};

Template.menu.helpers({
  creatingGroup: function(){
    return !! Session.get("creatingGroup");
  },
  groups: function(){
    return Groups.find().fetch();
  },
  items: function(){
    if(Meteor.user() && Meteor.user().roles)
      return Items.find().fetch();
    else
      return Items.find({visible:true}).fetch();
  },
  quantity: function(_id) {
    var cart = Session.get("cart");
    var q = _.find(cart, function(i){
      return i._id == _id;
    });
    if(q)
      return q.cartQuantity;
    else
      return 0;
  },
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
  disableButton: function() {
    var cart = Session.get("cart");
    return cart && cart.length != 0;
  },
  multPrice: function(quantity, price){
    return quantity * price;
  }
});

Template.menu.events({
  'click .menu-item-up': function(event){
    var id = event.target.id.replace("item-", "");
    var cart = Session.get("cart");
    var item = _.find(cart, function(i){
      return i._id == id;
    });

    if(!item){
      if(!cart)
        cart = [];

      item = Items.findOne({_id: id});
      cart.push(item);
    }

    if(!item.cartQuantity){
      item.cartQuantity = 0;
    }
    item.cartQuantity++;

    Session.set("cart", cart);
  },
  'click .menu-item-down': function(event){
    var id = event.target.id.replace("item-", "");
    var cart = Session.get("cart");
    var item = _.find(cart, function(i){
      return i._id == id;
    });

    if(!item)
      return;

    item.cartQuantity--;
    if(item.cartQuantity <= 0){
      cart = _.filter(cart, function(n){
        return n.cartQuantity > 0;
      });
    }

    Session.set("cart", cart);
  },
  'click #current_cart': function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $("#cart-wrapper").offset().top
    }, 600);
  },
  'click #button-new-group': function(event){
    Session.set("creatingGroup", true);
  },
  'click #button-new-group-submit': function(event){
    Meteor.call("newGroup", $("#text-group-name").val());
    Session.set("creatingGroup", false);
  },
  'click .delete':function(event) {
    Meteor.call('destroyItem', this._id); // is there a safer way to do this?

    // Best effort, we don't really care about the result.
    S3.delete(this.imageUrl);
  },
  'change .visible-checkbox': function(event){
    Meteor.call("editVisibility", event.target.checked, event.target.id);
  }
});
