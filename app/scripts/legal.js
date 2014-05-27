/*global define */
define(['require', 'jquery', 'loglevel', 'uri/URI'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , URI = require('uri/URI')
    , updateTab;

  updateTab = function(target){
    $('.legal-container .nav-tabs [data-target="' + target + '"]').tab('show');
  };

  exports.init = function(){
    var url;

    if ($('body').hasClass('legal')){
      url = new URI(document.location.href);
      updateTab(url.hash());
    }

    log.info('running legal.js');
  };

  return exports;
});
