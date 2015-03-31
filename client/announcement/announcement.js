Template.announcement.events({
  "click #new-announcement-submit": function (event) {
    event.preventDefault();

    var announcement ={
      body: document.getElementById("new-announcement").value,
      createdAt: new Date()
    }

    Meteor.call("newAnnouncement", announcement);

    Router.go('/');

    return false
  }
});