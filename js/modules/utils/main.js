define([
    'modules/utils/url',
    'modules/utils/menuhandler',
    'modules/utils/pagetitle',
    'modules/utils/opengraph',
    'modules/utils/tools',
    'modules/utils/containerview'
  ],
  function(Url, MenuHandler, TitleHandler, OpenGraphHandler, Tools, ContainerView) {
    return {
        Url:              Url,
        MenuHandler:      MenuHandler,
        PageTitleHandler: TitleHandler,
        OpenGraphHandler: OpenGraphHandler,
        Tools:            Tools,
        ContainerView:    ContainerView
    }
  }
)
