module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: true,
    debug:     true,
    browsers:  ['Chrome', 'Firefox'],

    files: [
      'spec/spec_helper.js',

      'spec/fixtures/*.html',

      'lib/*.css',
      'lib/*.js',

      'spec/**/*.js'
    ],

    frameworks:    ['fixture', 'jasmine'],
    logLevel:      config.LOG_ERROR,
    port:          9876,
    preprocessors: { '**/*.html': ['html2js'] },
    reporters:     ['dots'],
    singleRun:     true
  });
};
