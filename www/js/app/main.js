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
	var Board = Backbone.Model.extend({
		urlRoot: '/board'
	});

	var Join = Backbone.View.extend({
		el: '.page',
		render: function() {
			var template = _.template(JoinTemplate);
			this.$el.html(template());
		},
		events: {
			'click .join': 'joinGame',
			'click .watch': 'watchGame',
			'click .nuke': 'nukeGame'
		},
		joinGame: function() {
			var that = this;
			user = new User();
			user.save({}, {
				success: function(u) {
					user = u
					router.navigate('board', {trigger:true});
				}
			});
		},
		watchGame: function() {
			router.navigate('board', {trigger:true});
		},
		nukeGame: function() {
			$.ajax({
				url: '/nuke',
				type: 'delete'
			}).done();
		}
	});
	var join = new Join();
	var BoardView = Backbone.View.extend({
		el: '.page',
		render: function() {
			var that = this;
			var board = new Board();
			board.fetch({
				success: function(board) {
					var template = _.template(BoardTemplate);
					that.$el.html(template({user: user, board: board}));
				}
			});
		}
	});
	var boardView = new BoardView();

	router.on('route:home', function() {
		join.render();
	});
	router.on('route:board', function() {
		boardView.render();
	});

	Backbone.history.start();
});
