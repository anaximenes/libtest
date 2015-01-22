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
				
				var that = this
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
							new Menu.Item({page: 'questionAnswers', path: '#!/questions/' + questionId + '/'}),
							// new Menu.Item({name: 'postAnswer'})
						], {
							menu: 'sub'
						}
					),
				})

				//------------------------------------------------------------------------------

				console.log(model.answers)
				var collection = new Answers.PagedCollection([], {
					questionId: questionId,
					url: function() {
						return 'http://beta.reslib.org/api/questions/' + this.questionId + '/answers/'
					}
				})
				// console.log(collection)

				var answers = new Answers.FramedListView({
									collection: collection,
									listType: 'questionAnswers'
								})

				//------------------------------------------------------------------------------
				
				ContainerView.prototype.initialize.call(this, [card, menu, answers])
				
			}
		})

		return QuestionPage
	}
)
