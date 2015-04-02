Template.admin.helpers({
    storeState: function(openNow) {
    if (openNow) {
      return "Close"
    } else {
      return "Open"
    }
  },
  status: function(){
    var groupItems = Items.find({group:this.group.name}).fetch();
    var count = 0;
    _.forEach(groupItems, function(n){
      if(n.visible)
        count++;
    });
    if(count == 0)
      return "all items in " + this.group.name + " are hidden.";
    else if (count == groupItems.length)
      return "all items in " + this.group.name + " are visible.";
    else
      return "some items in " + this.group.name + " are visible.";
  },
  isGroupVisible: function(){
    var groupItems = Items.find({group:this.group.name}).fetch();
    var allVisible = true;
    _.forEach(groupItems, function(n){
      if (! n.visible)
        allVisible = false;
    });
    if(allVisible)
      return "checked";
    else{
      return "";
    }
  },
  creatingGroup: function(){
    return !! Session.get("creatingGroup");
  },
  groups: function(){
    var self = this;
    return _.map(Groups.find().fetch(), function(n){ return {target:self.group, group:n}});
  }
});

Template.admin.events({
  'click #button-new-group': function(event){
    Session.set("creatingGroup", true);
  },
  'click #button-new-group-submit': function(event){
    Meteor.call("newGroup", $("#text-group-name").val());
    Session.set("creatingGroup", false);
  },
  'click .delete-group': function(event){
    Meteor.call("deleteGroup", this.group.name);
  },
  'change .checkbox-group-visible': function(event){
    Meteor.call("editGroupVisibility", event.target.checked, this.group.name);
  },
  'click #toggleStore': function(event) {
    Meteor.call("toggleStore", !event.target.value);
    return false;
  }
});