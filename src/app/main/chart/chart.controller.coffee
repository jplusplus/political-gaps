angular.module 'politicalGaps'
  .controller 'MainChartController', (summary, legislature, $stateParams, $scope)->
    'ngInject'
    new class MainChartController
      # Public attributes
      summary: summary
      legislature: legislature
      topic: $stateParams.topic
      # Public methods
      uiOnParamsChanged: (changedParams, transition)=>
        @topic = changedParams.topic
