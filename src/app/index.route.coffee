angular.module 'politicalGaps'
  .config ($stateProvider, $urlRouterProvider) ->
    'ngInject'
    $urlRouterProvider.otherwise '/'
    # Home state
    $stateProvider
      .state 'main',
        url: '/'
        templateUrl: 'app/main/main.html'
        controller: 'MainController'
        controllerAs: 'main'
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
      # Home state
      $stateProvider
        .state 'main.chart',
          url: ':legislature_id_eq'
          templateUrl: 'app/main/chart/chart.html'
          controller: 'MainChartController'
          controllerAs: 'chart'
          params:
            topic:
              dynamic: yes
              value: 'gender'
          resolve:
            legislature_id: ($stateParams)->
              'ngInject'
              1 * $stateParams.legislature_id_eq
            legislature: (legislatures, legislature_id)->
              'ngInject'
              _.find(legislatures, { id: legislature_id });
            summary: ($http, legislature_id)->
              'ngInject'
              $http.get('data/summary-' + legislature_id + '.json').then (r)-> r.data
