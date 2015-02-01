define([
    'modules/utils/url',
    'modules/utils/template',
    'modules/utils/menuhandler',
    'modules/utils/pagetitle'
  ],
  function(Url, TemplateManager, MenuHandler, TitleHandler) {
    return {
        Url:              Url,
        TemplateManager:  TemplateManager,
        TM:               TemplateManager,
        MenuHandler:      MenuHandler,
        PageTitleHandler: TitleHandler
    }
  }
)
