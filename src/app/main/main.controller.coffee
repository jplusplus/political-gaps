angular.module 'politicalGaps'
  .controller 'MainController', (countries, legislatures)->
    'ngInject'
    new class MainController
      # Private attributes
      _countryAlpha2: []
      _difficultyLevel: []
      _term: []
      _legislatures: []
      # Public attributes
      legislatures: legislatures
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
        _.filter @getFilteredLegislatures(), (l)-> l.country.alpha2 is val
      matchDifficultyLevel: (val)=>
        _.filter @getFilteredLegislatures(), difficulty_level: val
      matchTerm: (val)=>
        _.filter @getFilteredLegislatures(), term: val
      someCountryAlpha2: (val)=>
        _.some @getFilteredLegislatures(), (l)-> l.country.alpha2 is val
      someDifficultyLevel: (val)=>
        _.some @getFilteredLegislatures(), difficulty_level: val
      someTerm: (val)=>
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
        @_legislatures = _.filter legislatures, @isFiltered
        @_legislatures = _.orderBy @_legislatures, (l)-> -1*l.completion
      getFilteredLegislatures: =>
        @_legislatures
      isRecentTerm: (term)=>
        @getEndYearDelta(term) <= 0
      isOldTerm: (term)=>
        @getEndYearDelta(term) > 0 and @getEndYearDelta(term) <= 30
      isHistoricalTerm: (term)=>
        @getEndYearDelta(term) > 30
      getTermEndYear: (term)->
        1 * term.split('-')[1]
      getCurrentYear: ->
        (new Date).getFullYear()
      getEndYearDelta: (term)=>
        @getCurrentYear() - @getTermEndYear(term)
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
