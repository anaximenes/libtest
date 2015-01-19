define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/questions/main',
		'modules/answers/main',
		'modules/menu/main',
		'modules/utils/containerview'
	],
	function($, _, Backbone, Url, Questions, Answers, Menu, ContainerView) {
		var QuestionPage = ContainerView.extend({
			initialize: function(questionId) {
				var model = new Questions.Model({'id': questionId})
				var card = new Questions.CardView({'model': model})
				
				model.fetch({
					success: function() {
						Backbone.trigger('menu:additional', {
													page: 'question',
													model: model,
													path: '#!/questions/' + questionId + '/',
													menu: 'header'
												})
					}
				})

				//------------------------------------------------------------------------------

				var menu = new Menu.View({
					collection: new Menu.Items([
							new Menu.Item({name: 'answers', path: '#!/questions/' + questionId + '/'}),
							new Menu.Item({name: 'postAnswer'})
						], {
							menu: 'sub'
						}
					),
				})
				Backbone.trigger('menu:activate', {menu: 'sub', page: 'answers'})

				//------------------------------------------------------------------------------

				var collection = new Answers.PagedCollection([], {
					questionId: questionId
				})
				var answers = new Answers.FramedListView({
									collection: collection,
									listType: 'questionAnswers'
								})

				//------------------------------------------------------------------------------

				var Caller = Backbone.View.extend({
					initialize: function() {
						Backbone.trigger('menu:activate', {menu: 'sub', page: 'answers'})
					}
				})
				var caller = new Caller()

				//------------------------------------------------------------------------------
				
				ContainerView.prototype.initialize.call(this, [card, menu, answers, caller])
				
			}
		})

		return QuestionPage
	}
)
