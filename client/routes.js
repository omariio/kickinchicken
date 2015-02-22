Router.route('/', function () {
  this.render('splash');
});

Router.route("/menu", function () {
  this.render("menu");
});

Router.configure({
  layoutTemplate: 'layout'
});