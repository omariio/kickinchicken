
Meteor.subscribe("items");

Meteor.startup(function () {
    // code to run on server at startup
    if(!Session.get("cart")){
      Session.set("cart", []);
    }
});
