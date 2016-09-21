var _       = require('lodash');
var async   = require('async');
var fs      = require('fs');
var gulp    = require('gulp');
var path    = require('path');
var request = require('request');
var conf    = require('./conf');
// Require gulp plugins
var $       = require('gulp-load-plugins')({ pattern: ['gulp-*'] });

const API_BASE          = 'http://www.jquestapp.com'

const COUNTRIES_URL     = API_BASE + '/api/v1/countries?limit=300';
const COUNTRIES_DIR     = path.join(conf.paths.src, '/data');
const COUNTRIES_PATH    = path.join(COUNTRIES_DIR, '/countries.json');

const LEGISLATURES_URL  = API_BASE + '/political-gaps/api/v1/legislatures?limit=300';
const LEGISLATURES_DIR  = path.join(conf.paths.src, '/data');
const LEGISLATURES_PATH = path.join(LEGISLATURES_DIR, '/legislatures.json');

const SUMMARIES_URL     = API_BASE + '/political-gaps/api/v1/mandatures/summary';
const SUMMARIES_DIR     = path.join(conf.paths.src, '/data');

const COMPLETION_TOPICS = ['political_leaning', 'gender', 'profession_category', 'age_range'];

gulp.task('prefetch:countries', function(){
  // Download the legislatures file
  return request(COUNTRIES_URL).pipe(fs.createWriteStream(COUNTRIES_PATH))
});

gulp.task('prefetch:legislatures', function(){
  // Download the legislatures file
  return request(LEGISLATURES_URL).pipe(fs.createWriteStream(LEGISLATURES_PATH))
});

gulp.task('prefetch:summaries', ['prefetch:legislatures'], function(end){
  // Load the legislatures file as JSON
  var legislatures = require(path.join('..', LEGISLATURES_PATH));
  // Load all legislature summaries
  async.eachSeries(legislatures, function(legislature, next) {
    // Build query parameters
    var qs = { topic: 'all', legislature_id_eq: legislature.id };
    // Start the request !
    request({ url: SUMMARIES_URL, qs: qs }, function(err, resp, summary) {
      // Build path
      let summary_path = path.join(SUMMARIES_DIR, '/summary-' + legislature.id + '.json');
      // Output the action
      $.util.log('Saving', $.util.colors.magenta(summary_path));
      // Write the file then continue
      fs.writeFile(summary_path, summary, next);
    })
  }, end);
});


gulp.task('prefetch:completion', ['prefetch:summaries'], function(done){
  var json_path = path.join('..', LEGISLATURES_PATH);
  // Load the json
  var legislatures = require(json_path);
  // Iterate over every legislature
  legislatures.forEach(function(legislature) {
    // Build path to the summary
    let summary_path = path.join('..', SUMMARIES_DIR, '/summary-' + legislature.id + '.json');
    // Load the summary
    let summary = require(summary_path).global
    // Calculate the complete for each topic
    COMPLETION_TOPICS.forEach(function(topic, i) {
      // Completion percentage for this topic
      topic_completion = _.chain(summary[topic]).values().sum().value() / summary.total
      if(i === 0) {
        legislature.completion = topic_completion
      } else {
        legislature.completion += topic_completion
        legislature.completion /= 2
      }
    })
  });
  fs.writeFile(LEGISLATURES_PATH, JSON.stringify(legislatures), done);
});


gulp.task('prefetch', ['prefetch:countries', 'prefetch:completion']);
