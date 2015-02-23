
Template.menu.helpers({
  items: function(){
    return Items.find().fetch();
  }
});