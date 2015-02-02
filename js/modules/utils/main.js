define([
    'modules/utils/url',
    'modules/utils/menuhandler',
    'modules/utils/pagetitle'
  ],
  function(Url, MenuHandler, TitleHandler) {
    return {
        Url:              Url,
        MenuHandler:      MenuHandler,
        PageTitleHandler: TitleHandler
    }
  }
)
