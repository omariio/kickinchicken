
Template.menu.helpers({
  maybeRed: function(){
    var cart = Session.get("cart");
    var self = this;
    var item = _.find(cart, function(n){
      return self._id == n._id;
    });
    if(!item)
      return "";
    var result = tooMuch(item, cart);
    if(result)
      return "red"
    return "";
  },
  tooMuch: function(){
    var cart = Session.get("cart");
    return tooMuch(this, cart);
  },
  fQuantity: function(){
    if(this.combo)
      return "combo";
    else
      return this.quantity;
  },
  quantityAlert: function(){
    var quantity = dynamicQuantity(this);
    if(quantity <= 10)
      return "Only " + quantity + " left!"
    else
      return ""
  },
  isSelectedGroup: function(){
    if(this.group.name == this.target)
      return "selected";
    else
      return "";
  },
  isSelectedPosition: function(){
    if(this.position == this.target)
      return "selected";
    else
      return "";
  },
  isVisible: function(){
    if(this.visible)
      return "checked";
    else
      return "";
  },
  positions: function(){
    var self = this;
    return _.map(_.range(Items.find().count()), function(n){return {target:self.position, position:n}});
  },
  items: function(){
    if(Meteor.user() && Meteor.user().roles)
      return Items.find({}, {sort:{position:1}}).fetch();
    else
      return Items.find({visible:true}, {sort:{position:1}}).fetch();
  },
  quantityCalc: function(_id) {
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
    cart = _.filter(cart, function(i){
      return (i.cartQuantity != 0)
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
  cart: function() {
    var cart = Session.get("cart");
    return cart && cart.length != 0;
  },
  multPrice: function(quantity, price){
    return quantity * price;
  },
  groups: function(){
    var self = this;
    return _.map(Groups.find().fetch(), function(n){ return {target:self.group, group:n}});
  },
  noItems: function() {
    var i = Items.find({}, {sort:{position:1}}).fetch();
    if (i.length == 0) {
      return true;
    } else {return false;}
  },
});

Template.menu.events({
  'click .menu-item-up': function(event){
    var cart = Session.get("cart");
    var self = this;
    var item = _.find(cart, function(n){
      return n._id == self._id;
    });
    if(!item){
      item = this;
      item.cartQuantity = 0;
      item.trueQuantity = 0;
      cart.push(item);
    }

    item.cartQuantity++;

    if(item.combo){
      _.forEach(item.combo, function(n){
        var comboItem = _.find(cart, function(i){
          return n == i.name;
        });
        if(!comboItem){
          comboItem = Items.findOne({name:n});
          comboItem.trueQuantity = 0;
          comboItem.cartQuantity = 0;
          cart.push(comboItem)
        }
        comboItem.trueQuantity++;
      });
    }
    else{
      item.trueQuantity++;
    }

    Session.set("cart", cart);
  },
  'click .menu-item-down': function(event){
    var cart = Session.get("cart");
    var self = this;
    var item = _.find(cart, function(n){
      return n._id == self._id;
    });
    if(!item || item.cartQuantity == 0)
      return;

    item.cartQuantity--;

    if(item.combo){
      _.forEach(item.combo, function(n){
        var comboItem = _.find(cart, function(i){
          return n == i.name;
        });
        if(!comboItem){
          comboItem = Items.findOne({name:n});
          comboItem.trueQuantity = 0;
          comboItem.cartQuantity = 0;
          cart.push(comboItem)
        }
        comboItem.trueQuantity--;
      });
    }
    else{
      item.trueQuantity--;
    }

    Session.set("cart", cart);
  },
  'click #current_cart': function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $("#cart-wrapper").offset().top
    }, 600);
  },
  'click .delete':function(event) {
    Meteor.call('destroyItem', this._id); // is there a safer way to do this?

    // Best effort, we don't really care about the result.
    S3.delete(this.imageUrl);
  },
  'change .visible-checkbox': function(event){
    Meteor.call("editVisibility", event.target.checked, this._id);
  },
  'change .select-item-position': function(event){
    var numPosition = Number.parseInt(event.target.value);
    Meteor.call("editPosition", numPosition, this._id);
  },
  'change .select-item-group': function(event){
    Meteor.call("editGroup", event.target.value, this._id);
  },
  'click #clear':function(event){
    Session.set("cart", []);
  }
});

var tooMuch = function(item, cart){
  if(item.combo){
    var result = false;
    _.forEach(item.combo, function(n){
      var cartItem = _.find(cart, function(i){
        return i.name == n;
      });
      if(!cartItem){
        console.log("this shouldn't happen");
        Session.set("cart", []);
      }
      var databaseItem = Items.findOne(cartItem._id);
      //if database hasn't loaded
      if(!databaseItem)
        return
      if(cartItem.trueQuantity > databaseItem.quantity)
        result = true;
    });
    return result;
  }
  else{
    var databaseItem = Items.findOne(item._id);
    //if database hasn't loaded
    if(!databaseItem)
      return false;
    return item.trueQuantity > databaseItem.quantity;
  }

}

var dynamicQuantity = function(item){
  var result = undefined;
  if(item.combo){
    _.forEach(item.combo, function(n){
      var i = Items.findOne({name:n});
      if(!result)
        result = i.quantity;

      result = Math.min(result, i.quantity);
    });
  }
  else
    result = item.quantity;

  return result;
}
