define([
	"jquery",
	"underscore",
	"backbone",
], function($, _, Backbone) {
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home'
		}
	});

	var router = new Router();
	router.on('route:home', function() {
		console.log('Here I am');
		$('body').append('<p>Im using jquery!</p>');
	});

	Backbone.history.start();
});
