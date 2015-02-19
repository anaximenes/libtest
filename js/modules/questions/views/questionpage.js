define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/questions/views/card',
    'modules/menu/main',
    'modules/utils/containerview',
    'modules/post/main'
  ],
  function($, _, Backbone, Url, CardView, Menu, ContainerView, Post) {
    var QuestionPage = ContainerView.extend({
      initialize: function(model, bottom) {
        var card = new CardView({ 'model': model });

        model.fetch({
          success: function() {
            Backbone.trigger('question:fetched', model);
          }
        })

        //------------------------------------------------------------------------------

        var menu = Menu.add('sub', [
            {page: 'questionAnswers', title: 'Answers', path: '/questions/' + model.id + '/'},
        ])

        //------------------------------------------------------------------------------

        var postForm = new Post.AnswerPostView({
          id: model.id,
          collection: bottom.collection,
          show: true
        });

        //------------------------------------------------------------------------------

        ContainerView.prototype.initialize.call(this, [card, menu, postForm, bottom])

      }
    })

    return QuestionPage
  }
)
