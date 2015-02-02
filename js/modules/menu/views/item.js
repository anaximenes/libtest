define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/models/item'
  ],
  function($, _, Backbone, MenuItem) {
    var MenuItemView = Backbone.View.extend({
      tagName: 'div',
      menu: '',

      attributes: function() {
        return {
          style: 'display: inline-block',
        }
      },

      events: {
        'click': 'click'
      },

      click: function() {
        Backbone.trigger('menu:click', {page: this.model.get('page'), menu: this.model.collection.menu})
      },

      render: function() {
        var html = '<a id="<%=id%>" class="<%= classes %>" href="<%= href %>" > <%= title %> </a>'
        var text = this.model.get('title')

        
        //to be FIXED !!!!
        if (!this.model.get('full')) {
          text = text.slice(0, 40) + (text.length > 40 ? '..."' : '')
        }
        
        this.$el.html(_.template(html)({
          'title': text, 
          'href': this.model.get('path'), 
          'id': this.model.collection.menu + '-menu-' + this.model.get('page'),
          'classes': 'menu-item' + (this.classes ? ' ' + this.classes : '')
        }))
        return this
      },

      activateMenu: function(options) {
        var that = this
        if (options.menu != this.model.collection.menu) return

        if (this.model.get('page') === options.page) {
          $('#' +  that.model.collection.menu + '-menu-' + options.page).addClass('active')
        } else {
          $('#' + that.model.collection.menu + '-menu-' + that.model.get('page')).removeClass('active')
        }
      },

      addBadge: function(options) {
        var that = this
        if (options.menu != this.model.collection.menu) return
        if (!options.count) return

        if (this.model.get('page') === options.page) {
          this.model.set('title', this.model.get('title') + ' <span class="badge">' + options.count + '</span>')
        }
      },

      initialize: function(options) {
        var that = this
        options = options || {}
        this.classes = ''
        if (options.classes) this.classes = options.classes
        if (this.model.get('class')) this.classes = this.classes + ' ' + this.model.get('class')

        if (options.menu) this.menu = options.menu

        this.listenTo(Backbone, 'menu:activate', this.activateMenu)
        this.listenTo(Backbone, 'menu:addBadge', this.addBadge)
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return MenuItemView
  }
)
