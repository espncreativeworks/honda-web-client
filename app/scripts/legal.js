/*global define */
define(['require', 'jquery', 'loglevel', 'uri/URI'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , URI = require('uri/URI')
    , updateTab;

  updateTab = function(target){
    $('.legal-container .nav-tabs-honda [data-target="#' + target + '"]').tab('show');
  };

  exports.init = function(){
    var url, params;

    if ($('body').hasClass('legal')){
      url = new URI();
      params = url.search(true);
      updateTab(params.tab);
    }

    log.info('legal.js initialized');
  };

  return exports;
});
