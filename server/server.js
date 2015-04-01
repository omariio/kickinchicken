Meteor.startup(function () {
    // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
  if(Meteor.users.find().fetch().length == 0){
    user.roles = ['admin'];
  }
  return user;
});

if (Meteor.settings.AWS){
  // These values are defined in server/settings.json
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

Meteor.methods({
  editGroup: function(groupName, _id){
    Items.update(_id, {$set:{group:groupName}});
  },
  editPosition: function(position, _id){
    var oldPosition = Items.findOne(_id).position;
    if(position < oldPosition){
      Items.update({
        $and:[
          {position:{$lt:oldPosition}},
          {position:{$gte:position}}
        ]
      }, {$inc:{position:1}}, function(){
        Items.update(_id, {$set:{position:position}});
      });
    }
    else{
      Items.update({
        $and:[
          {position:{$lte:position}},
          {position:{$gt:oldPosition}}
        ]
      }, {$inc:{position:-1}}, function(){
        Items.update(_id, {$set:{position:position}});
      });
    }
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
    item.visible = true;
    item.position = Items.find().count();
    Items.insert(item);
  },
  destroyItem: function(_id) {
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Items.remove({_id:_id});
  },
  submitOrder: function(order) {
    var text =  "Pre-order Time: " + order.time + "\n" +
                "Name: " + order.firstname + " " + order.lastname + "\n" +
                "Location: " + order.address + " " + order.city + ", " + order.zip + "\n" + 
                "Phone: " + order.phone + "\n" +
                "Instructions: " + order.instr + "\n" +
                "Payment Type: " + order.payment + "\n" +
                "Order: \n";
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

