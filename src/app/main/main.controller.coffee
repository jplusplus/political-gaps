angular.module 'politicalGaps'
  .controller 'MainController', (summary, countries, legislatures, $state, $stateParams, legislature_id, $scope)->
    'ngInject'
    new class MainController
      # Private attributes
      _countryAlpha2: []
      _difficultyLevel: []
      _term: []
      __legislatures: []
      # Public attributes
      summary: summary
      legislatures: legislatures
      legislature: legislature_id * 1
      topic: $stateParams.topic
      administrativeLevels: [
        'National',
        'Regional',
        'Local'
      ]
      # Public methods
      uiOnParamsChanged: (changedParams, transition)=>
        @topic = changedParams.topic
      resetCountryAlpha2: =>
        @_countryAlpha2 = []
        # Re-Build the legislatures list
        do @buildFilteredLegislatures
      resetDifficultyLevel: =>
        @_difficultyLevel = []
        # Re-Build the legislatures list
        do @buildFilteredLegislatures
      resetTerm: =>
        @_term = []
        # Re-Build the legislatures list
        do @buildFilteredLegislatures
      hasCountryAlpha2: =>
        @_countryAlpha2.length
      hasDifficultyLevel: =>
        @_difficultyLevel.length
      hasTerm: =>
        @_term.length
      getCountryAlpha2: =>
        @_countryAlpha2
      getDifficultyLevel: =>
        @_difficultyLevel
      getTerm: =>
        @_term
      isCountryAlpha2: (val)=>
        @_countryAlpha2.indexOf(val) > -1
      isDifficultyLevel: (val)=>
        @_difficultyLevel.indexOf(val) > -1
      isTerm: (val)=>
        @_term.indexOf(val) > -1
      matchCountryAlpha2: (val)=>
        _.some @getFilteredLegislatures(), (l)-> l.country.alpha2 is val
      matchDifficultyLevel: (val)=>
        _.some @getFilteredLegislatures(), difficulty_level: val
      matchTerm: (val)=>
        _.some @getFilteredLegislatures(), term: val
      toggleCountryAlpha2: (val)=>
        @toggleFrom @_countryAlpha2, val
      toggleDifficultyLevel: (val)=>
        @toggleFrom @_difficultyLevel, val
      toggleTerm: (val)=>
        @toggleFrom @_term, val
      toggleFrom: (arr, val)=>
        # Find the element
        index = arr.indexOf val
        # Remove or add it if needed
        if index is -1 then arr.push(val) else arr.splice(index, 1)
        # Rebuild the legislatures list
        do @buildFilteredLegislatures
      isFiltered: (legislature)=>
        filter = yes
        # Should we filter this legislature, with country code?
        filter and= not @hasCountryAlpha2() or @isCountryAlpha2(legislature.country.alpha2)
        # With difficulty_level?
        filter and= not @hasDifficultyLevel() or @isDifficultyLevel(legislature.difficulty_level)
        # With term ?
        filter and= not @hasTerm() or @isTerm(legislature.term)
        # Return the filter
        filter
      buildFilteredLegislatures: =>
        @__legislatures = _.filter legislatures, @isFiltered
      getFilteredLegislatures: =>
        @__legislatures
      buildFilters: =>
        # Values for the list
        @countries = _.chain(legislatures).map('country').uniq().sortBy((c)-> c.name).value()
        @difficultyLevels = _.chain(legislatures).map('difficulty_level').uniq().sort().value()
        @terms = _.chain(legislatures).map('term').uniq().sort().reverse().value()
        # Build the legislatures list
        do @buildFilteredLegislatures
      constructor: ->
        # Initial build of filters
        do @buildFilters
        # Whatch for change on legislature selection
        $scope.$watch 'main.legislature', (id, old)->
          if id isnt old
            $state.go 'main', legislature_id_eq: id
