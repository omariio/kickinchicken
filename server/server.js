Meteor.startup(function () {
    // code to run on server at startup
});

// The first admin account must be hard-coded.
Roles.addUsersToRoles("E4XwwALmQyycdN5u7" , ['admin']);

Meteor.publish(null, function (){ 
  return Meteor.roles.find({});
})
