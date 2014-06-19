require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    loglevel: '../bower_components/loglevel/lib/loglevel',
    hammer: '../bower_components/hammerjs/hammer',
    uri: '../bower_components/uri.js/src/',
    moment: '../bower_components/moment/moment',
    mimer: '../bower_components/mimer/dist/mimer.min',
    bootstrap: 'vendor/bootstrap',
    transloadit: 'vendor/transloadit',
    fastclick: 'vendor/fastclick',
    plugins: '//a.espncdn.com/combiner/c?js=plugins/json2.r3.js,plugins/teacrypt.js,plugins/jquery.metadata.js,plugins/jquery.bgiframe.js,plugins/jquery.easing.1.3.js,plugins/jquery.hoverIntent.js,plugins/jquery.tinysort.r4.js,plugins/jquery.pubsub.r5.js,plugins/ba-debug-0.4.js,analytics/sOmni.js,analytics/analytics.js,analytics/externalnielsen.js',
    espn: '//a.espncdn.com/combiner/c?js=espn.core.duo.r55.js,espn.storage.r6.js,registration/espn.overlay.stub.r3-18.js,registration/staticLogin.u13.r2.js,espn.l10n.r12.js,espn.p13n.r16.js&development=true&minify=false',
    webfontloader: '//ajax.googleapis.com/ajax/libs/webfont/1.5.3/webfont',
    facebook: '//connect.facebook.net/en_US/all',
    'google-analytics': '//www.google-analytics.com/analytics'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    transloadit: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    webfontloader: {
      exports: 'WebFont'
    },
    plugins: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    espn: {
      deps: ['jquery', 'plugins'],
      exports: 'espn'
    },
    facebook: {
      exports: 'FB'
    },
    'google-analytics': {
      exports: 'ga'
    }
  }
});

require(['app', './fonts', 'jquery', 'loglevel', 'google-analytics', 'bootstrap', 'plugins', 'espn'], function(app, fonts, $, log, ga) {
  'use strict';

  log.setLevel(log.levels.TRACE);

  fonts.init();

  ga('create', 'UA-38720475-8', 'go.com');
  ga('require', 'displayfeatures');
  ga('require', 'linkid', 'linkid.js');
  ga('send', 'pageview');

  $(document).ready(function(){
    app.init();
  });

});
