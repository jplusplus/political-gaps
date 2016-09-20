angular.module 'politicalGaps'
  .directive 'mainChart', (topics)->
    'ngInject'
    scope:
      mainChart: '='
      topic: '='
    link: (scope, el, attrs)->
      # Declare and instanciate the MainChart class
      new class MainChart
        # Private attributes
        _groups: {}
        # Public attributes
        summary: scope.mainChart.global
        el: d3.select el[0]
        # Public methods
        width: =>
          @_width  = @_width or do => @getSizes()[0]
        height: =>
          @_height = @_height or do => @getSizes()[1]
        getSizes: =>
          [ angular.element(el).width(), angular.element(el).height() ]
        force: =>
          @_force = @_force or do =>
            d3.forceSimulation()
              .force "charge", d3.forceManyBody().strength(-1)
              .force "x", d3.forceX (d)=> d().forceX()
              .force "y", d3.forceY (d)=> d().forceY()
              .on("tick", @forceTicked)
        datum: =>
          # Create an empty datum of people if it doesn't exist
          @_datum = @_datum or do =>
            for i in [0..@summary.total-1]
              # Every element of the datum is a function that might return
              # different property according to the context
              @buildPerson i
        scaleX: =>
          # X range bounds
          min = @width()/@groups().length * .5
          max = @width() - min
          # Return a function
          d3.scaleLinear().range([0, 1]).range [min, max]
        # Closure function to create a person
        buildPerson: (i)=>
          # The scoped function return a different value
          # according to the context (type of chart)
          =>
            group = @groupFrom i
            # Return an object
            group: group
            # Node id
            id: i
            forceY: =>
              @height() / 2
            forceX: =>
              unless group?
                # Last position when no group exists
                return @scaleX()(1)
              # Find the index of this group
              index = @groups().indexOf @groupFrom(i)
              # Return a value within range
              @scaleX() index / ( @groups().length - 1 )
            class: =>
              # Array of classes
              k = ["main__chart__people__node" , "main__chart__people__node"]
              # Does this point belong to a group
              if group?
                # Find the index of this group
                index = @groups().indexOf @groupFrom(i)
                # Add a class for this group
                k.push "main__chart__people__node--#{slug group.toLowerCase()}"
                k.push "main__chart__people__node--#{index}"
              # No group...
              else
                # Add a special class when no group (= no data)
                k.push "main__chart__people__node--no-data"
              # Transform the array of classes in strinng
              k.join " "
        groups: (topic=scope.topic)=>
          @_groups[topic] = @_groups[topic] or do =>
            groups = _.chain( @summary[topic] )
              .keys()
              .filter (d)=> @count(d) > 0
              .sortBy (d)=> topics[topic].groups[d]?.order or @summary[topic][d]
              .value()
            groups.push('No data') if @countNoData() > 0
            groups
        # Find the group for a given id
        groupFrom: (i, topic=scope.topic)=>
          memo = 0
          # Group to find
          group = null
          # Get the number of element
          _.each @groups(topic), (key)=>
            # Save the group if the index is bigger than the group number
            group = key if i >= memo and i < memo + @summary[topic][key]
            # Add the number of element to the previous number
            memo += @summary[topic][key]
          # Return the group (can be null)
          group
        startSimulation: =>
          @nodes = @people.selectAll '.main__chart__people__node'
            # Update nodes data
            .data @datum(), (d)-> d().id
            .attr "class", (d)-> d().class()
          # Enter the data and create nodes
          nodeEnter = @nodes.enter()
              .append "circle"
              .attr "r", 3
              .attr "class", (d)-> d().class()
          # Merge with the old @nodes subset
          @nodes = nodeEnter.merge @nodes
          # Start force layout simmulation
          @force().nodes @datum()
          @force().alphaTarget(2).restart()
        createLegend: =>
          # Virtually select groups
          groups = @legend.selectAll('.main__chart__legend__group').data @groups()
          groups.enter()
            .append 'div'
            .attr 'class', 'main__chart__legend__group'
            .merge groups
              .html (d)=>
                [
                  topics[scope.topic].groups[d]?.label or d
                  Math.round(1000 * @count(d)/@summary.total)/10 + '%'
                ].join "<br />"
          # Remove old node
          groups.exit().remove()
        count: (group)=>
          @summary[scope.topic][group] or @countNoData()
        countNoData: =>
          @summary.total - @countWithData()
        countWithData: =>
          _.chain( @summary[scope.topic] ).values().sum().value()
        forceTicked: =>
          @nodes.attr "transform", (d)-> "translate(" + d.x + ", " + d.y + ")"
        constructor: ->
          # Create SVG element
          @svg = @el.append("svg")
          @legend = @el.append("div").attr "class", "main__chart__legend"
          # Create people group
          @people = @svg.append("g").attr("class", "main__chart__people")
          # Start force layout simulation
          scope.$watch 'topic', => @startSimulation() and @createLegend()
