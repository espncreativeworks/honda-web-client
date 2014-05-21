require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    bootstrap: 'vendor/bootstrap',
    loglevel: '../bower_components/loglevel/lib/loglevel',
    fastclick: 'vendor/fastclick'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});

require(['app', 'jquery', 'loglevel', 'bootstrap'], function(app, $, log) {
  'use strict';
  
  log.setLevel(log.levels.TRACE);

  $(document).ready(function(){
    app.init();
  });

});
