define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/models/item',
    'text!/templates/menu-item.html'
  ],
  function($, _, Backbone, MenuItem, Template) {
    var MenuItemView = Backbone.View.extend({
      className: 'menu-item-li',
      menu: '',

      events: {
        'click': 'click'
      },

      click: function() {
        Backbone.trigger('menu:click', {page: this.model.get('page'), menu: this.model.collection.menu})
      },

      render: function() {
        var text = this.model.get('title')

        //to be FIXED !!!!
        if (!this.model.get('full')) {
          text = text.slice(0, 40) + (text.length > 40 ? '..."' : '')
        }

        this.$el.html(_.template(Template)({
          'title': text,
          'href': this.model.get('path'),
          'id': this.model.collection.menu + '-menu-' + this.model.get('page'),
          'tagTitle': this.model.get('tagTitle')
        }))
        this.$('a').addClass(this.classes || '')
        this.$el.addClass((this.model.get('toRight') ? 'menu-right' : ''))

        return this
      },

      activateMenu: function(options) {
        if (options.menu != this.model.collection.menu) return

        if (this.model.get('page') === options.page) {
          this.$('a').addClass('active')
        } else {
          this.$('a').removeClass('active')
        }
      },

      addBadge: function(options) {
        // experimental feature
        var that = this
        if (options.menu != this.model.collection.menu) return
        if (!options.count) return

        if (this.model.get('page') === options.page) {
          this.model.set('title', this.model.get('title') + ' <span class="badge">' + options.count + '</span>')
        }
      },

      initialize: function(options) {
        options = options || {}
        this.classes = options.classes || ''
        if (this.model.get('class')) this.classes = this.classes + ' ' + this.model.get('class')

        var that = this
        this.listenTo(Backbone, 'menu:activate', this.activateMenu)
        this.listenTo(Backbone, 'menu:addBadge', this.addBadge)
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return MenuItemView
  }
)
