Meteor.startup(function () {
    // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
  if(Meteor.users.find().fetch().length == 0){
    user.roles = ['admin'];
  }
  return user;
});

process.env.MAIL_URL="smtp://omariiobleepbloop%40gmail.com:asdfasdf666@smtp.gmail.com:465/"; 


Meteor.publish(null, function (){ 
  return Meteor.roles.find({});
});

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
  },
  editItem: function(item, _id){
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Items.remove({_id: _id});
    Items.insert(item);
  },
  submitOrder: function(order) {
    var text = "Name: " + order.firstname + " " + order.lastname + "\n" + "Location: " +
     order.address + " " + order.city + ", " + order.zip + "\n" + "Phone: " + order.phone + 
     "\n" + "Instructions: " + order.instr + "\nPayment Type: " + order.payment + "\nOrder: \n";
    var cartcontents = "";
    for (var i = 0; i < order.cart.length; i++ ) {
      cartcontents += order.cart[i].name + " x " + order.cart[i].cartQuantity + " \n ";
    }

    console.log(text + cartcontents);
    /* Email.send({
      from: "omariiobleepbloop@gmail.com",
      to: "omariiobleepbloop@gmail.com",
      subject: "New Order",
      text: text + cartcontents
    }); */
  },
});

