(function(){angular.module("politicalGaps",["ngAnimate","ngTouch","ngSanitize","ngMessages","ngAria","restangular","ui.router","ui.bootstrap"])}).call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};angular.module("politicalGaps").directive("mainChart",["topics",function(e){"ngInject";return{restrict:"A",scope:{summary:"=",topic:"="},link:function(i,r,n){var s;return new(s=function(){function n(){this.forceTicked=t(this.forceTicked,this),this.countWithData=t(this.countWithData,this),this.countNoData=t(this.countNoData,this),this.count=t(this.count,this),this.createLegend=t(this.createLegend,this),this.startSimulation=t(this.startSimulation,this),this.groupFrom=t(this.groupFrom,this),this.groups=t(this.groups,this),this.buildPerson=t(this.buildPerson,this),this.scaleX=t(this.scaleX,this),this.datum=t(this.datum,this),this.force=t(this.force,this),this.getSizes=t(this.getSizes,this),this.height=t(this.height,this),this.width=t(this.width,this),this.svg=this.el.append("svg"),this.legend=this.el.append("div").attr("class","main__chart__legend"),this.people=this.svg.append("g").attr("class","main__chart__people"),i.$watch("topic",function(t){return function(){return t.startSimulation()&&t.createLegend()}}(this))}return n.prototype._groups={},n.prototype.summary=i.summary.global,n.prototype.el=d3.select(r[0]),n.prototype.width=function(){return this._width=this._width||function(t){return function(){return t.getSizes()[0]}}(this)()},n.prototype.height=function(){return this._height=this._height||function(t){return function(){return t.getSizes()[1]}}(this)()},n.prototype.getSizes=function(){return[angular.element(r).width(),angular.element(r).height()]},n.prototype.force=function(){return this._force=this._force||function(t){return function(){return d3.forceSimulation().force("charge",d3.forceManyBody().strength(-1)).force("x",d3.forceX(function(t){return t().forceX()})).force("y",d3.forceY(function(t){return t().forceY()})).on("tick",t.forceTicked)}}(this)()},n.prototype.datum=function(){return this._datum=this._datum||function(t){return function(){var e,i,r,n;for(n=[],e=i=0,r=t.summary.total-1;r>=0?r>=i:i>=r;e=r>=0?++i:--i)n.push(t.buildPerson(e));return n}}(this)()},n.prototype.scaleX=function(){var t,e;return e=this.width()/this.groups().length*.5,t=this.width()-e,d3.scaleLinear().range([0,1]).range([e,t])},n.prototype.buildPerson=function(t){return function(e){return function(){var i;return i=e.groupFrom(t),{group:i,id:t,forceY:function(){return e.height()/2},forceX:function(){var r;return null==i?e.scaleX()(1):(r=e.groups().indexOf(e.groupFrom(t)),e.scaleX()(r/(e.groups().length-1)))},"class":function(){var r,n;return n=["main__chart__people__node","main__chart__people__node"],null!=i?(r=e.groups().indexOf(e.groupFrom(t)),n.push("main__chart__people__node--"+slug(i.toLowerCase())),n.push("main__chart__people__node--"+r)):n.push("main__chart__people__node--no-data"),n.join(" ")}}}}(this)},n.prototype.groups=function(t){return null==t&&(t=i.topic),this._groups[t]=this._groups[t]||function(i){return function(){var r;return r=_.chain(i.summary[t]).keys().filter(function(t){return i.count(t)>0}).sortBy(function(r){var n,s;return null!=(null!=(n=e[t].groups[r])?n.order:void 0)?null!=(s=e[t].groups[r])?s.order:void 0:i.summary[t][r]}).value(),i.countNoData()>0&&r.push("No data"),r}}(this)()},n.prototype.groupFrom=function(t,e){var r,n;return null==e&&(e=i.topic),n=0,r=null,_.each(this.groups(e),function(i){return function(s){return t>=n&&t<n+i.summary[e][s]&&(r=s),n+=i.summary[e][s]}}(this)),r},n.prototype.startSimulation=function(){var t;return this.nodes=this.people.selectAll(".main__chart__people__node").data(this.datum(),function(t){return t().id}).attr("class",function(t){return t()["class"]()}),t=this.nodes.enter().append("circle").attr("r",3).attr("class",function(t){return t()["class"]()}),this.nodes=t.merge(this.nodes),this.force().nodes(this.datum()),this.force().alphaTarget(2).restart()},n.prototype.createLegend=function(){var t;return t=this.legend.selectAll(".main__chart__legend__group").data(this.groups()),t.enter().append("div").attr("class","main__chart__legend__group").merge(t).html(function(t){return function(r){var n;return["<div>"+((null!=(n=e[i.topic].groups[r])?n.label:void 0)||r)+"</div>",Math.round(1e4*t.count(r)/t.summary.total)/100+"%"].join("")}}(this)),t.exit().remove()},n.prototype.count=function(t){return this.summary[i.topic][t]||this.countNoData()},n.prototype.countNoData=function(){return this.summary.total-this.countWithData()},n.prototype.countWithData=function(){return _.chain(this.summary[i.topic]).values().sum().value()},n.prototype.forceTicked=function(){return this.nodes.attr("transform",function(t){return"translate("+t.x+", "+t.y+")"})},n}())}}}])}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};angular.module("politicalGaps").controller("MainChartController",["summary","legislature","$stateParams","$scope",function(e,i,r,n){"ngInject";var s;return new(s=function(){function n(){this.uiOnParamsChanged=t(this.uiOnParamsChanged,this)}return n.prototype.summary=e,n.prototype.legislature=i,n.prototype.topic=r.topic,n.prototype.uiOnParamsChanged=function(t,e){return this.topic=t.topic},n}())}])}.call(this),function(){angular.module("politicalGaps").directive("sticky",["$window",function(t){return{restrict:"AC",link:function(t,e){return null==document.documentMode?angular.element(e).addClass("sticky").Stickyfill():void 0}}}])}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};angular.module("politicalGaps").controller("MainController",["countries","legislatures",function(e,i){"ngInject";var r;return new(r=function(){function e(){this.buildFilters=t(this.buildFilters,this),this.getEndYearDelta=t(this.getEndYearDelta,this),this.isHistoricalTerm=t(this.isHistoricalTerm,this),this.isOldTerm=t(this.isOldTerm,this),this.isRecentTerm=t(this.isRecentTerm,this),this.showTerm=t(this.showTerm,this),this.getFilteredLegislatures=t(this.getFilteredLegislatures,this),this.buildFilteredLegislatures=t(this.buildFilteredLegislatures,this),this.isFiltered=t(this.isFiltered,this),this.toggleFrom=t(this.toggleFrom,this),this.toggleTerm=t(this.toggleTerm,this),this.toggleDifficultyLevel=t(this.toggleDifficultyLevel,this),this.toggleCountryAlpha2=t(this.toggleCountryAlpha2,this),this.someTerm=t(this.someTerm,this),this.someDifficultyLevel=t(this.someDifficultyLevel,this),this.someCountryAlpha2=t(this.someCountryAlpha2,this),this.matchTerm=t(this.matchTerm,this),this.matchDifficultyLevel=t(this.matchDifficultyLevel,this),this.matchCountryAlpha2=t(this.matchCountryAlpha2,this),this.isTerm=t(this.isTerm,this),this.isDifficultyLevel=t(this.isDifficultyLevel,this),this.isCountryAlpha2=t(this.isCountryAlpha2,this),this.getTerm=t(this.getTerm,this),this.getDifficultyLevel=t(this.getDifficultyLevel,this),this.getCountryAlpha2=t(this.getCountryAlpha2,this),this.hasTerm=t(this.hasTerm,this),this.hasDifficultyLevel=t(this.hasDifficultyLevel,this),this.hasCountryAlpha2=t(this.hasCountryAlpha2,this),this.resetTerm=t(this.resetTerm,this),this.resetDifficultyLevel=t(this.resetDifficultyLevel,this),this.resetCountryAlpha2=t(this.resetCountryAlpha2,this),this.uiOnParamsChanged=t(this.uiOnParamsChanged,this),this.buildFilters()}return e.prototype._countryAlpha2=[],e.prototype._difficultyLevel=[],e.prototype._term=[],e.prototype._legislatures=[],e.prototype.legislatures=i,e.prototype.administrativeLevels=["National","Regional","Local"],e.prototype.uiOnParamsChanged=function(t,e){return this.topic=t.topic},e.prototype.resetCountryAlpha2=function(){return this._countryAlpha2=[],this.buildFilteredLegislatures()},e.prototype.resetDifficultyLevel=function(){return this._difficultyLevel=[],this.buildFilteredLegislatures()},e.prototype.resetTerm=function(){return this._term=[],this.buildFilteredLegislatures()},e.prototype.hasCountryAlpha2=function(){return this._countryAlpha2.length},e.prototype.hasDifficultyLevel=function(){return this._difficultyLevel.length},e.prototype.hasTerm=function(){return this._term.length},e.prototype.getCountryAlpha2=function(){return this._countryAlpha2},e.prototype.getDifficultyLevel=function(){return this._difficultyLevel},e.prototype.getTerm=function(){return this._term},e.prototype.isCountryAlpha2=function(t){return this._countryAlpha2.indexOf(t)>-1},e.prototype.isDifficultyLevel=function(t){return this._difficultyLevel.indexOf(t)>-1},e.prototype.isTerm=function(t){return this._term.indexOf(t)>-1},e.prototype.matchCountryAlpha2=function(t){return _.filter(this.getFilteredLegislatures(),function(e){return e.country.alpha2===t})},e.prototype.matchDifficultyLevel=function(t){return _.filter(this.getFilteredLegislatures(),{difficulty_level:t})},e.prototype.matchTerm=function(t){return _.filter(this.getFilteredLegislatures(),{term:t})},e.prototype.someCountryAlpha2=function(t){return _.some(this.getFilteredLegislatures(),function(e){return e.country.alpha2===t})},e.prototype.someDifficultyLevel=function(t){return _.some(this.getFilteredLegislatures(),{difficulty_level:t})},e.prototype.someTerm=function(t){return _.some(this.getFilteredLegislatures(),{term:t})},e.prototype.toggleCountryAlpha2=function(t){return this.toggleFrom(this._countryAlpha2,t)},e.prototype.toggleDifficultyLevel=function(t){return this.toggleFrom(this._difficultyLevel,t)},e.prototype.toggleTerm=function(t){return this.toggleFrom(this._term,t)},e.prototype.toggleFrom=function(t,e){var i;return i=t.indexOf(e),-1===i?t.push(e):t.splice(i,1),this.buildFilteredLegislatures()},e.prototype.isFiltered=function(t){var e;return e=!0,e&&(e=!this.hasCountryAlpha2()||this.isCountryAlpha2(t.country.alpha2)),e&&(e=!this.hasDifficultyLevel()||this.isDifficultyLevel(t.difficulty_level)),e&&(e=!this.hasTerm()||this.isTerm(t.term)),e},e.prototype.buildFilteredLegislatures=function(){return this._legislatures=_.filter(i,this.isFiltered),this._legislatures=_.orderBy(this._legislatures,function(t){return-1*t.completion})},e.prototype.getFilteredLegislatures=function(){return this._legislatures},e.prototype.showTerm=function(t){return!this.hasTerm()||this.someTerm(t)},e.prototype.isRecentTerm=function(t){return this.getEndYearDelta(t)<=0},e.prototype.isOldTerm=function(t){return this.getEndYearDelta(t)>0&&this.getEndYearDelta(t)<=30},e.prototype.isHistoricalTerm=function(t){return this.getEndYearDelta(t)>30},e.prototype.getTermEndYear=function(t){return 1*t.split("-")[1]},e.prototype.getCurrentYear=function(){return(new Date).getFullYear()},e.prototype.getEndYearDelta=function(t){return this.getCurrentYear()-this.getTermEndYear(t)},e.prototype.buildFilters=function(){return this.countries=_.chain(i).map("country").uniq().sortBy(function(t){return t.name}).value(),this.difficultyLevels=_.chain(i).map("difficulty_level").uniq().sort().value(),this.terms=_.chain(i).map("term").uniq().sort().reverse().value(),this.buildFilteredLegislatures()},e}())}])}.call(this),function(){angular.module("politicalGaps").run(["$log",function(t){"ngInject";return t.debug("runBlock end")}])}.call(this),function(){angular.module("politicalGaps").config(["$stateProvider","$urlRouterProvider",function(t,e){"ngInject";return e.otherwise("/"),t.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main",resolve:{countries:["$http",function(t){return t.get("data/countries.json").then(function(t){return t.data})}],legislatures:["$http","countries",function(t,e){return t.get("data/legislatures.json").then(function(t){var i,r,n,s;for(s=t.data,i=0,n=s.length;n>i;i++)r=s[i],r.end_date=new Date(r.end_date),r.start_date=new Date(r.start_date),r.country=_.find(e,{alpha2:r.country}),r.term=r.start_date.getFullYear()+"-"+r.end_date.getFullYear(),r.display_name=r.name,r.display_name+=" - ",r.display_name+="Completion rate: ",r.display_name+=~~(1e3*r.completion)/10,r.display_name+="%";return t.data})}]}}),t.state("main.chart",{url:":legislature_id_eq",templateUrl:"app/main/chart/chart.html",controller:"MainChartController",controllerAs:"chart",params:{topic:{dynamic:!0,value:"gender"}},resolve:{legislature_id:["$stateParams",function(t){return 1*t.legislature_id_eq}],legislature:["legislatures","legislature_id",function(t,e){return _.find(t,{id:e})}],summary:["$http","legislature_id",function(t,e){return t.get("data/summary-"+e+".json").then(function(t){return t.data})}]}})}])}.call(this),function(){angular.module("politicalGaps").constant("topics",{gender:{groups:{male:{label:"Male"},female:{label:"Female"},other:{label:"Other"}}},age_range:{groups:{"bellow-30":{label:"Under 30",order:0},"30-40":{label:"30 to 40",order:1},"40-50":{label:"40 to 50",order:2},"50-60":{label:"50 to 60",order:3},"60-70":{label:"60 to 70",order:4},"over-70":{label:"Over 70",order:5}}},political_leaning:{groups:{"Left wing":{},"Center-left (social democrat)":{},Green:{},"Center (liberal)":{},Conservative:{},"Far-right":{},Other:{}}},profession_category:{groups:{"Armed forces":{},"Private sector professional":{},"Civil servant":{},Farmer:{},"Journalist, public relations":{},Lawyer:{},"Manual worker, craftsman/woman":{},"Medical doctor, dentist, optician":{},Miner:{},Teacher:{},"University professor":{},Student:{},"No occupation":{},Other:{}}}})}.call(this),function(){angular.module("politicalGaps").config(["$logProvider","RestangularProvider",function(t,e){"ngInject";return t.debugEnabled(!0),e.setBaseUrl("http://www.jquestapp.com/political-gaps/api/v1/"),e.setRestangularFields({selfLink:"@id"})}])}.call(this),angular.module("politicalGaps").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class=main><form class=main__elastic ng-show="\'main\' | isState"><div class=main__elastic__introduction><div class=container><h1>Political Gaps</h1><p class=lead>PoliticalGaps is the first investigation on <a href=http://www.jquestapp.com target=_blank>jQuest</a>, a platform for journalism schools that lets journalism students in Europe learn datajournalism, connect with one another and investigate collaboratively.</p><p class=lead>We are investigating the representativity of elected officials in assemblies all over Europe. The data you see here is live. The database will grow more complete as the academic year continues.</p></div></div><div class=main__elastic__filters><div class=container><div class=row><div class=col-xs-4><div class=main__elastic__filters__card><h4 class=main__elastic__filters__title><button class="btn btn-link btn-sm pull-xs-right" ng-click=main.resetCountryAlpha2() ng-if=main.hasCountryAlpha2()>All</button> Country</h4><ul class="list-unstyled main__elastic__list main__elastic__list--country"><li ng-repeat="country in ::main.countries"><a class="btn-block main__elastic__list__item" ng-click=main.toggleCountryAlpha2(country.alpha2) ng-class="{\n                            \'main__elastic__list__item--active\': main.isCountryAlpha2(country.alpha2),\n                            \'main__elastic__list__item--reduced\': !main.someCountryAlpha2(country.alpha2)\n                          }"><span class="tag pull-xs-right">{{ main.matchCountryAlpha2(country.alpha2).length }} </span>{{ country.name }}</a></li></ul></div></div><div class=col-xs-4><div class=main__elastic__filters__card><h4 class=main__elastic__filters__title><button class="btn btn-link btn-sm pull-xs-right" ng-click=main.resetDifficultyLevel() ng-if=main.hasDifficultyLevel()>All</button> Administrative level</h4><ul class="list-unstyled main__elastic__list main__elastic__list--administrative-level"><li ng-repeat="difficultyLevel in ::main.difficultyLevels"><a class="btn-block main__elastic__list__item" ng-click=main.toggleDifficultyLevel(difficultyLevel) ng-class="{\n                            \'main__elastic__list__item--active\': main.isDifficultyLevel(difficultyLevel),\n                            \'main__elastic__list__item--reduced\': !main.someDifficultyLevel(difficultyLevel)\n                          }"><span class="tag pull-xs-right">{{ main.matchDifficultyLevel(difficultyLevel).length }} </span>{{ main.administrativeLevels[difficultyLevel - 1] }}</a></li></ul></div></div><div class=col-xs-4><div class=main__elastic__filters__card><h4 class=main__elastic__filters__title><button class="btn btn-link btn-sm pull-xs-right" ng-click=main.resetTerm() ng-if=main.hasTerm()>All</button> Term</h4><ul class="list-unstyled main__elastic__list main__elastic__list--term"><li ng-repeat="term in main.terms | filter:main.isRecentTerm | filter:main.showTerm"><div class=main__elastic__list__title ng-if=$first>Recent</div><a class="btn-block main__elastic__list__item" ng-click=main.toggleTerm(term) ng-class="{\n                            \'main__elastic__list__item--active\': main.isTerm(term)\n                          }"><span class="tag pull-xs-right">{{ main.matchTerm(term).length }} </span>{{ term }}</a></li><li ng-repeat="term in main.terms | filter:main.isOldTerm | filter:main.showTerm"><div class=main__elastic__list__title ng-if=$first>Old</div><a class="btn-block main__elastic__list__item" ng-click=main.toggleTerm(term) ng-class="{\n                            \'main__elastic__list__item--active\': main.isTerm(term)\n                          }"><span class="tag pull-xs-right">{{ main.matchTerm(term).length }} </span>{{ term }}</a></li><li ng-repeat="term in main.terms | filter:main.isHistoricalTerm | filter:main.showTerm"><div class=main__elastic__list__title ng-if=$first>Historical</div><a class="btn-block main__elastic__list__item" ng-click=main.toggleTerm(term) ng-class="{\n                            \'main__elastic__list__item--active\': main.isTerm(term)\n                          }"><span class="tag pull-xs-right">{{ main.matchTerm(term).length }} </span>{{ term }}</a></li></ul></div></div></div></div><div class=main__elastic__filters__alert><div class=container><i class="fa fa-filter"></i> There is {{ main.getFilteredLegislatures().length }} results that match with your filters.</div></div></div><div class=container><ul class=list-unstyled><li ng-repeat="legislature in main.getFilteredLegislatures()" class=main__elastic__card><div class=pull-xs-right><button class="btn btn-link btn-outline" ui-sref="main.chart({ legislature_id_eq: legislature.id })">Visualize representativity</button></div><h5>{{ legislature.name_english }}</h5><p>{{ legislature.country.name }} - {{ legislature.term }} - Completed at {{ legislature.completion * 100 | number:0 }}%</p><div class=main__elastic__card__progress><div class=main__elastic__card__progress__bar ng-style="{ width: legislature.completion * 100 + \'%\' }"></div></div></li></ul></div></form><div ui-view></div></div>'),t.put("app/main/chart/chart.html",'<div class="text-center main__heading"><a class=main__heading__filters ui-sref=main><i class="fa fa-caret-down fa-fw"></i> See the representativity of another assembly</a><div class=main__heading__title><h3>{{ chart.legislature.name_english }}</h3><p class="lead m-b-0">{{ chart.legislature.country.name }} - {{ chart.legislature.term }} - Completed at {{ chart.legislature.completion * 100 | number:0 }}%</p></div><ul class="nav nav-pills main__heading__tabs"><li class=nav-item><a class=nav-link ui-sref="main.chart({topic: \'gender\'})" ui-sref-active=active>Gender</a></li><li class=nav-item><a class=nav-link ui-sref="main.chart({topic: \'age_range\'})" ui-sref-active=active>Age</a></li><li class=nav-item><a class=nav-link ui-sref="main.chart({topic: \'profession_category\'})" ui-sref-active=active>Occupation</a></li><li class=nav-item><a class=nav-link ui-sref="main.chart({topic: \'political_leaning\'})" ui-sref-active=active>Political leaning</a></li></ul></div><div class="main__chart main__chart--{{ chart.topic }}" main-chart summary=chart.summary topic=chart.topic></div>')}]);
//# sourceMappingURL=../maps/scripts/app-df3ee6651b.js.map