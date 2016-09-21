angular.module 'politicalGaps'
  .config ($stateProvider, $urlRouterProvider) ->
    'ngInject'
    $urlRouterProvider.otherwise '/'
    # Home state
    $stateProvider
      .state 'main',
        url: '/:legislature_id_eq'
        templateUrl: 'app/main/main.html'
        controller: 'MainController'
        controllerAs: 'main'
        params:
          legislature_id_eq:
            value: null
          topic:
            dynamic: yes
            value: 'gender'
        resolve:
          legislatures: (Restangular)->
            'ngInject'
            Restangular.all('legislatures').withHttpConfig(cache: yes).getList(limit: 300)
          legislature_id: ($stateParams, legislatures)->
            'ngInject'
            $stateParams.legislature_id_eq || legislatures[0].id
          summary: (Restangular, legislature_id)->
            'ngInject'
            Restangular.one('mandatures').one('summary').get legislature_id_eq: legislature_id, topic: 'all'
