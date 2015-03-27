Template.new.events({
  'click #new-item-submit': function() {
    var files = document.getElementById("new-item-picture").files;

    if(!files[0])
      return;

    S3.upload({files:files} ,function(err, data){
      if(err){
        console.log("an error has occurred");
        console.log(err);
      }
      else{
        var item = {
          name: document.getElementById("new-item-name").value,
          description: document.getElementById("new-item-description").value,
          price: document.getElementById("new-item-price").value,
          group: document.getElementById("new-item-group").value,
          imageUrl:data.url
        }

        Meteor.call("newItem", item);
        Router.go("/menu");
      }
    });
  }
})