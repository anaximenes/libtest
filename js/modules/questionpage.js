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
            Backbone.trigger('menu:extend', {
                page: 'question',
                title: '"' + model.get('title') + '"',
                path: '#!/questions/' + questionId + '/',
                menu: 'header'
            })
          }
        })

        //------------------------------------------------------------------------------

        var menu = Menu.add('sub', [
            {page: 'questionAnswers', title: 'Answers', path: '#!/questions/' + questionId + '/'},
        ])

        //------------------------------------------------------------------------------

        var collection = new Answers.PagedCollection([], {
          questionId: questionId,
          url: function() {
            return Url('answers', questionId)
          }
        })

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
