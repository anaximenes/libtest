### Installation

    npm install
    bower install
    git submodule update --init --recursive

Run debug server.
If you use nginx please configure it as described in Gruntfile.js rules section.
`grunt server`


### Modules

#### Pageable collection
Currently supports only infinite presentation and is most likely to be replaced by
[backbone-paginator](github.com/backbone-paginator/backbone.paginator)
or similar.

Consists of:

* paged collection
* paged view

##### *Paged collection usage:*

    var MyCollection = PagedCollection.extend({
        model: MyBackboneModel,
        url: function () {
            return my_collection_url;
        },

        //your methods,

        initialize: function (options) {
            PagedCollection.prototype.initialize.call(this, options);
            //your init code
        }
    })

##### *Provided methods:*

*    `isOnLastPage()`
*   `thereIsMore()`
*    `loadMore()` - loads next page to collection
*    `updateAll()` - fetches all pages currently present in collection
*    `fetchPage(i)` - fetch page i


##### *Paged view usage:*

    var MyView = PagedView.extend({
      model: MyBackboneModel,

      initialize: function(options) {
        this.collection = myPagedCollectionInstance
        this.ItemView = MyListItemView //one that renders single model

        PagedView.prototype.initialize.call(this, options)
      }
    })


#### Contaier
Displays views one after another, removing them on remove(). No more no less.

##### *Usage:*

    var MyView = ContainerView.extend({
      initialize: function() {
        var viewA = new Backbone.View()
        var viewB = new Backbone.View()

        ContainerView.prototype.initialize.call(this, [viewA, viewB])
      }
    })


#### Framed view
Displays collection with `ListEndView` appended at the end (with *"loading..."* message).

##### *Usage:*

    var MyFramedView = FramedView.extend({
      initialize: function(options) {
        this.Collection = MyBackboneCollection
        this.ListView = MyListView // one that renders MyBackboneCollection
        this.url = function() {
          return myUrl
        }

        FramedView.prototype.initialize.call(this, options)
      }
    })



-----------

#### Books, Questions, Reviews, Answers, Comments
Each of this modules basically consists of this almost identical files:

*  model, sometimes providing `present()` method that returns JSON object fot `_.template()`
*  collection inhereted from **pageable**
*  views:
    *  item view
    *  list view inhereted from **pageable**
    *  card view
* `main.js` file that returns object containig all classes provided by module like
    `BookModule.FramedView`, `BookModule.PagedCollection`, ...


#### Menu
Provides `get()` and `add()` methods:

*  `get(menu)`: returns view object that renders one of available menus
    which currently are:
    -  header - *books, questions, [last book], [last question]*
    -  books - *all, favorites, recent, [search]*
    -  book - *description, edit, read*
    -  questions - *all, [search]*
*  `add(menu, pages)`: creates MenuView object called `menu`, containig `pages`

Can be extended at any time by throwing event: `Backbone.trigger('menu:extend', menu_obj)`.

    menu_obj: {
        menu: menu name,
        page: page_obj
    }
    page_obj: {
        page: menu item id,
        title: menu item title,
        path: href of menu item's <a>,
        [full: display full title if true / truncate otherwise]
    }

if Menu already has item with the same id (determined by `page` field) they will be merged.



#### Menu handler
Activates necessary menu items on each page.


### Logic
There is single router in the app that only calls (most of the time)
`Controller.view()` with appropriate parameters.

`Controller.view(page, options)` in it's turn calls
`Controller[page](options)` that should return single view
which will be rendered by Controller and inserted in `$('#page')`

each Controller method is responsible for creating menus that page needs
when
`Controller.view` only triggers event `'page:rendered'` for Menu Handler to activate menus.


