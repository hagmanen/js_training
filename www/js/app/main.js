define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/join.html"
], function($, _, Backbone, JoinTemplate) {
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home'
		}
	});

	var Join = Backbone.View.extend({
		el: '.page',
		render: function() {
			var template = _.template(JoinTemplate, {});
			this.$el.html(template);
		}
	});
	var join = new Join();

	var router = new Router();
	router.on('route:home', function() {
		join.render();
	});

	Backbone.history.start();
});
