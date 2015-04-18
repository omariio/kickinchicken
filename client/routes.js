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
  this.render("new");
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

Router.route("/calendar", function() {
  this.render("calendar");
});

Router.route("/announcement", function() {
	this.render("announcement");
});

Router.route("/map", function() {
  this.render("map");
});

Router.configure({
  layoutTemplate: 'layout'
});