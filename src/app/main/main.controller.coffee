angular.module 'politicalGaps'
  .controller 'MainController', (summary, legislatures, $state, $stateParams, legislature_id, $scope)->
    'ngInject'
    new class MainController
      summary: summary
      legislatures: legislatures
      legislature: legislature_id * 1
      topic: $stateParams.topic
      uiOnParamsChanged: (changedParams, transition)=>
        @topic = changedParams.topic
      constructor: ->
        $scope.$watch 'main.legislature', (id, old)->
          if id isnt old
            $state.go 'main', legislature_id_eq: id
