define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/join.html",
	"text!templates/board.html"
], function($, _, Backbone, JoinTemplate, BoardTemplate) {
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'board': 'board'
		}
	});
	var router = new Router();

	var User = Backbone.Model.extend({
		urlRoot: '/users'
	});
	var user = null;

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
			var that = this;
			this.user = new User();
			this.user.save({}, {
				success: function(user) {
					that.user = user
					router.navigate('board', {trigger:true});
				}
			});
		},
		watchGame: function() {
			router.navigate('board', {trigger:true});
		}
	});
	var join = new Join();
	var Board = Backbone.View.extend({
		el: '.page',
		render: function() {
			var template = _.template(BoardTemplate, {user: this.user});
			this.$el.html(template);
		}
	});
	var board = new Board();

	router.on('route:home', function() {
		join.render();
	});
	router.on('route:board', function() {
		board.render();
	});

	Backbone.history.start();
});
