define([
		'jquery',
		'underscore'
	],
	function($, _) {
		// List of API URLs.
		var URLs = {
			books: function() {
				return "/api/books" + '.json';
			},

			book: function(id) {
				return "/api/books/"+ id + '.json';
			},

			questions: function() {
				return "/api/questions" + '.json'
			},

			question: function(id) {
				return "/api/questions/"+ id + '.json';
			},

			favorites: function(id) {
				return "api/users/" + id + "/bookmarks" + '.json';
			}
		}

		// Helper for accessing the URL list. Think of it as something similar
		// to Rails' URL helpers.
		var Url = function(type) {
		  return URLs[type] ?
		    URLs[type].apply(this, [].slice.call(arguments, 1)) :
		    undefined;
		}

		return Url
	}
)
