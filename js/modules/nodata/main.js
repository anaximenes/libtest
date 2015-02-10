define([
    'jquery',
    'underscore',
    'backbone',
    'modules/nodata/views/nofavorites',
    'modules/nodata/views/norecent'
  ],
  function($, _, Backbone, Favorites, Recent) {
    return {
      'FavoritesView': Favorites,
      'RecentView': Recent
    }
  }
)
