angular.module 'politicalGaps'
  .config ($logProvider, RestangularProvider)->
    'ngInject'
    # Enable log
    $logProvider.debugEnabled true
    # Set API root
    RestangularProvider.setBaseUrl 'http://www.jquestapp.com/political-gaps/api/v1/'
    RestangularProvider.setRestangularFields selfLink: '@id'
