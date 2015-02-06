define([
    'modules/utils/url',
    'modules/utils/menuhandler',
    'modules/utils/pagetitle',
    'modules/utils/opengraph'
  ],
  function(Url, MenuHandler, TitleHandler, OpenGraphHandler) {
    return {
        Url:              Url,
        MenuHandler:      MenuHandler,
        PageTitleHandler: TitleHandler,
        OpenGraphHandler: OpenGraphHandler
    }
  }
)
