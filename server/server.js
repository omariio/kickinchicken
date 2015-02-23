Meteor.startup(function () {
    // code to run on server at startup
});

// The first admin account must be hard-coded.
Roles.addUsersToRoles("E4XwwALmQyycdN5u7" , ['admin']);

Meteor.publish(null, function (){ 
  return Meteor.roles.find({});
})

Meteor.publish("items", function () {
  return Items.find();
});

Meteor.methods({
  newItem: function(item){
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Items.insert(item);
  }

});

