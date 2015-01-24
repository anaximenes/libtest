define([
		'jquery',
		'underscore'
	],
	function($, _) {
		var root = "http://beta.reslib.org/api/"
		var URLs = {
			books: function() {
				return root + "books/";
			},

			book: function(id) {
				return root + "books/" + id;
			},

			bookReviews: function(id) {
				return root + "books/" + id + "/reviews/";
			},

			bookQuestions: function(id) {
				return root + "books/" + id + "/questions/";
			},

			bookQuestion: function(id, question) {
				return root + "books/" + id + "/questions" + question;
			},

			questions: function() {
				return root + "questions/";
			},

			userQuestions: function(id) {
				return root + "users/" + id + "/questions/"
			},

			userReviews: function(id) {
				return root + "users/" + id + "/reviews/"
			},

			question: function(id) {
				return root + "questions/" + id;
			},

			favorites: function(id) {
				return root + "users/" + id + "/favorites/";
			},

			booksFavorites: function(id) {
				return root + "users/" + id + "/favorites/";
			},

			booksRecent: function(id) {
				return root + "users/" + id + "/recent/";
			},

			questionsFavorites: function(id) {
				// return root + "users/" + id + "/questions";
			},

			session: function() {
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
