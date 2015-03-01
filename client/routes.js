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
});

Router.route("/contact", function () {
  this.render("contact");
});

Router.route("/checkout", function() {
	this.render("checkout");
});

Router.route("/submitted", function() {
	this.render("submitted");
});

Router.configure({
  layoutTemplate: 'layout'
});