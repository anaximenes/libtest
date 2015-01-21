define([
		'jquery',
		'underscore'
	],
	function($, _) {
		// List of API URLs.
		var root = "http://beta.reslib.org/api/"
		var URLs = {
			books: function() {
				return root + "books/";
			},

			book: function(id) {
				return root + "books/" + id;
				// return "/api/books/"+ id + '.json';
			},

			bookReviews: function(id) {
				console.log(id)
				return root + "books/" + id + "/reviews";
				// return "/api/books/"+ id + '.json';
			},

			bookQuestions: function(id) {
				return root + "books/" + id + "/questions";
				// return "/api/books/"+ id + '.json';
			},

			bookQuestion: function(id, question) {
				return root + "books/" + id + "/questions" + question;
				// return "/api/books/"+ id + '.json';
			},

			questions: function() {
				return root + "questions/";
				// return "/api/questions" + '.json'
			},

			question: function(id) {
				return root + "questions/" + id;
				// return "/api/questions/"+ id + '.json';
			},

			favorites: function(id) {
				return root + "users/" + id + "/favorites";
				// return "api/users/" + id + "/bookmarks" + '.json';
			},

			booksFavorites: function(id) {
				return root + "users/" + id + "/favorites";
				// return "api/users/" + id + "/bookmarks" + '.json';
			},

			booksRecent: function(id) {
				return root + "users/" + id + "/recent";
				// return "api/users/" + id + "/bookmarks" + '.json';
			},

			questionsFavorites: function(id) {
				// return root + "users/" + id + "/questions";
				// return "api/users/" + id + "/bookmarks" + '.json';
			},

			// bookComments: function(book) {
			// 	return root + "books/" + book + "/questions";
			// },

			// bookComment: function(book, comment) {
			// 	return root + "books/" + book + "/questions/" + comment;
			// },

			signin: function() {
				return root + 'session'
			}

		}

		var Url = function(type) {
		  return URLs[type] ?
		    URLs[type].apply(this, [].slice.call(arguments, 1)) :
		    undefined;
		}

		return Url
	}
)
