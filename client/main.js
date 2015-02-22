
Handlebars.registerHelper('isAdmin', function () {
    var user = Meteor.user();
    return (user && user.roles);
});
