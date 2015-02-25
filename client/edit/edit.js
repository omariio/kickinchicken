
Template.edit.helpers({
  item: function(){
    return Items.findOne({_id:Router.current().params._id});
  }
});

Template.edit.events({
  '#click edit-item-submit': function(){
    var item = {
      name: document.getElementById("new-item-name").value,
      description: document.getElementById("new-item-description").value,
      price: document.getElementById("new-item-price").value,
      group: document.getElementById("new-item-group").value
    }
    Meteor.call("editItem", item, Router.current().params._id);
    Router.go("/menu");
  }
})

