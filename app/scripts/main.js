require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    loglevel: '../bower_components/loglevel/lib/loglevel',
    hammer: '../bower_components/hammerjs/hammer',
    uri: '../bower_components/uri.js/src',
    bootstrap: 'vendor/bootstrap',
    fastclick: 'vendor/fastclick',
    webfontloader: '//ajax.googleapis.com/ajax/libs/webfont/1.5.3/webfont'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    webfontloader: {
      exports: 'WebFont'
    }
  }
});

require(['app', './fonts', 'jquery', 'loglevel', 'bootstrap'], function(app, fonts, $, log) {
  'use strict';

  log.setLevel(log.levels.TRACE);

  fonts.init();

  $(document).ready(function(){
    app.init();
  });

});
