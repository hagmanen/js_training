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
	var router = new Router();

	var User = Backbone.Model.extend({
		urlRoot: '/users'
	});

	var Join = Backbone.View.extend({
		el: '.page',
		render: function() {
			var template = _.template(JoinTemplate, {});
			this.$el.html(template);
		},
		events: {
			'click .join': 'joinGame',
			'click .watch': 'watchGame'
		},
		joinGame: function() {
			var user = new User();
			user.save({}, {
				success: function(user) {
					console.log(user);
				}
			});
		},
		watchGame: function() {
			router.navigate('board', {trigger:true});
		}
	});
	var join = new Join();

	router.on('route:home', function() {
		join.render();
	});

	Backbone.history.start();
});
