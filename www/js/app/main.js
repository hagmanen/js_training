define([
	"jquery",
	"underscore",
	"backbone",
	"socket",
	"text!templates/join.html",
	"text!templates/board.html"
], function($, _, Backbone, io, JoinTemplate, BoardTemplate) {
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
			user = new User();
			user.save({}, {
				success: function(user) {
					sessionStorage.setItem("user_id", user.id);
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
		events: {
			'click .mark': 'clickMark'
		},
		clickMark : function(ev) {
			var that = this;
			$.ajax({
				url: '/board/' + ev.currentTarget.id,
				type: 'put',
				dataType: 'json',
				data: { user_id: that.user.id },
				success: function(board) {
					that.compileTemplate(new Board(board));
				}
			});
		},
		user: null,
		compileTemplate: function(board) {
			var that = this;
			var template = _.template(BoardTemplate);
			this.$el.html(template({user: this.user, board: board}));
			if(board.get('turn') != this.user.color) {
				var notification = io(document.location.href + '/notification');
				notification.on('moved', function() {
					console.log('Hello');
					var board = new Board();
					board.fetch({
						success: function(board) {
							that.compileTemplate(board);
						}
					});
				});
			}
				
		},
		render: function() {
			var that = this;
			var board = new Board();
			this.user = new User({id: sessionStorage.getItem("user_id")});
			this.user.fetch({
				success: function() {
					board.fetch({
						success: function(board) {
							that.compileTemplate(board);
						}
					});
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
