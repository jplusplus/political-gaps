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
          countries: ($http)->
            'ngInject'
            $http.get('data/countries.json').then (r)-> r.data
          legislatures: ($http, countries)->
            'ngInject'
            $http.get('data/legislatures.json').then (r)->
              for legislature in r.data
                legislature.end_date   = new Date legislature.end_date
                legislature.start_date = new Date legislature.start_date
                # Find country
                legislature.country = _.find countries, alpha2: legislature.country
                # Build term word using the two dates
                legislature.term = "#{legislature.start_date.getFullYear()}-#{legislature.end_date.getFullYear()}"
                # Build display name
                legislature.display_name = legislature.name
                legislature.display_name += ' - '
                legislature.display_name += 'Completion rate: '
                legislature.display_name += ~~(legislature.completion * 1000)/10
                legislature.display_name += '%'
              r.data
          legislature_id: ($stateParams, legislatures)->
            'ngInject'
            $stateParams.legislature_id_eq || legislatures[0].id
          summary: ($http, legislature_id)->
            'ngInject'
            $http.get('data/summary-' + legislature_id + '.json').then (r)-> r.data
