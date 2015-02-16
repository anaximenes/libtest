define([
    'modules/utils/url',
    'modules/utils/menuhandler',
    'modules/utils/pagetitle',
    'modules/utils/opengraph',
    'modules/utils/tools'
  ],
  function(Url, MenuHandler, TitleHandler, OpenGraphHandler, Tools) {
    return {
        Url:              Url,
        MenuHandler:      MenuHandler,
        PageTitleHandler: TitleHandler,
        OpenGraphHandler: OpenGraphHandler,
        Tools:            Tools
    }
  }
)
