Meteor.startup(function () {
  // runs on startup
});

Accounts.onCreateUser(function(options, user) {
  if(Meteor.users.find().fetch().length == 0){
    user.roles = ['admin'];
  }
  return user;
});

if (Meteor.settings.AWS){
  // These values are defined in settings.json
  S3.config = {
      key: Meteor.settings.AWS.accessKeyId,
      secret: Meteor.settings.AWS.secretAccessKey,
      bucket: Meteor.settings.AWS.bucket
  }
  process.env.MAIL_URL=Meteor.settings.email.url;
}
else{
  console.warn ("AWS settings missing, did you run with 'meteor --settings settings.json'?");
}

Meteor.publish(null, function (){
  return Meteor.roles.find({});
});

Meteor.publish("items", function () {
  return Items.find();
});

Meteor.publish("groups", function(){
  return Groups.find();
});
Meteor.publish("announcements", function () {
  return Announcements.find();
});

Meteor.publish("switches", function () {
  return Switches.find();
})


Meteor.methods({
  deleteGroup: function(groupName){
    Groups.remove({name:groupName});
    Items.update({group:groupName}, {$set:{group:"none"}}, {multi:true});
  },
  editGroupVisibility: function(visible, groupName){
    Items.update({group:groupName}, {$set:{visible:visible}}, {multi:true});
  },
  editGroup: function(groupName, _id){
    Items.update(_id, {$set:{group:groupName}});
  },
  editVisibility: function(visible, _id){
    Items.update(_id, {$set:{visible:visible}});
  },
  newGroup: function(name){
    Groups.insert({name:name});
  },
  newItem: function(item){
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }

    //if we're editing an existing item
    if(item._id){
      Items.remove({_id:item._id});
      delete item._id;
    }
    Items.insert(item);
  },

  destroyItem: function(_id) {
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Items.remove({_id:_id});
  },

  newAnnouncement: function(announcement) {
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Announcements.insert(announcement);
  },

  toggleStore: function(state) {
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    if (Switches.findOne()) {
      Switches.update({_id: Switches.findOne()._id}, {state: state, createdAt: new Date()});
    } else {
      Switches.insert({state: state, createdAt: new Date()})
    }
    var state = Switches.findOne().state ? "opened" : "closed"
    console.log("The store has been " + state + " on " + new Date());
  },

  submitOrder: function(order) {
    var text =  "Pre-order Time: " + order.time + "\n" +
                "Name: " + order.firstname + " " + order.lastname + "\n" +
                "Location: " + order.address + " " + order.city + ", " + order.zip + "\n" +
                "Phone: " + order.phone + "\n" +
                "Instructions: " + order.instr + "\n" +
                "Payment Type: " + order.payment + "\n" +
                "Order: \n";
    var cartContents = "";
    for (var i = 0; i < order.cart.length; i++ ) {
      cartContents += order.cart[i].name + " x " + order.cart[i].cartQuantity + " \n ";
      if(order.cart[i].combo){
        _.forEach(order.cart[i].combo, function(n){
          Items.update({name:n}, {$inc:{quantity: -order.cart[i].cartQuantity}});
        });
      }
      else
        Items.update(order.cart[i]._id, {$inc:{quantity: -order.cart[i].cartQuantity}});
    }

    _.forEach(Meteor.users.find().fetch(), function(n){
      if(! n.roles)
        return;

      Email.send({
        from: "omariiobleepbloop@gmail.com",
        to: n.emails[0].address,
        subject: "New Order",
        text: text + cartContents
      });
    })
  }
});
