Router.route('/', function () {
  this.render('splash');
});

Router.route("/menu", function () {
  this.render("menu");
});

Router.route("/new", function () {
  this.render("new");
});

Router.route("/edit/:_id", function () {
  this.render("edit");
});

Router.route("/admin", function () {
  this.render("admin");
})

Router.configure({
  layoutTemplate: 'layout'
});