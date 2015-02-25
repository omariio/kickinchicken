
Meteor.subscribe("items");

Meteor.startup(function () {
    // code to run on server at startup
    //console.log("started");
    if(!Session.get("cart"))
      Session.set("cart", {});
});
