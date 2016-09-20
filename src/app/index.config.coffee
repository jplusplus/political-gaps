angular.module 'politicalGaps'
  .config ($logProvider, RestangularProvider)->
    'ngInject'
    # Enable log
    $logProvider.debugEnabled true
    # Set API root
    RestangularProvider.setBaseUrl 'http://staging.jquestapp.com/political-gaps/api/v1/'
    RestangularProvider.setRestangularFields selfLink: '@id'
