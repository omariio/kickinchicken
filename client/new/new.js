Template.new.events({
  'click #new-item-submit': function() {
    var item = {
      name: document.getElementById("new-item-name").value,
      description: document.getElementById("new-item-description").value,
      price: document.getElementById("new-item-price").value,
      group: document.getElementById("new-item-group").value
    }
    Meteor.call("newItem", item);
    Router.go("/menu");
  }
})