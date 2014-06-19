/*global define, espn*/
define(['require', 'jquery', 'loglevel'], function (require){
  'use strict';
  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , fetch = function(_url, next){
      var member = null;
      $.ajax({
        url: _url,
        type: 'GET',
        dataType: 'json',
        success: function (data){
          member = data;
          return next(null, member);
        },
        error: function (jqXHR, textStatus, errorThrown){
          return next(textStatus);
        }
      });
    }, init = function(){
      $('[data-control-action="logout"]').on('click', function(){
        espn.memberservices.logout();
      });
      log.info('members.js initialized');
    };

    exports.init = init;
    exports.fetch = fetch;
    return exports;
});
