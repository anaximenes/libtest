define([
    'modules/utils/url',
    'modules/utils/template',
    'modules/utils/menuhandler'
  ],
  function(Url, TemplateManager, MenuHandler) {
    return {
        Url:              Url,
        TemplateManager:  TemplateManager,
        TM:               TemplateManager,
        MenuHandler:      MenuHandler
    }
  }
)
