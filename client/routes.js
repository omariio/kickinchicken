Router.route('/', function () {
  this.render('splash');
});

Router.route("/menu", function () {
  this.render("menu");
});

Router.route("/new", function () {
  this.render("new");
});

Router.configure({
  layoutTemplate: 'layout'
});