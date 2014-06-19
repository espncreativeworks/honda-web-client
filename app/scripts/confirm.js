/*global define*/
define(['require', 'jquery', 'loglevel', './members'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , members = require('members')
    , legalOptinIsValid = function ($optin){
      return $optin.is(':checked');
    }
    , legalOptinRender = function ($optin){
      if ($optin.hasClass('optin-invalid')){
        $optin.parents('.form-group').first().addClass('has-warning has-feedback');
      } else {
        $optin.parents('.form-group').first().removeClass('has-warning has-feedback');
      }
    }
    , tptOptinRender = function ($optin){
      var $addressFromGroup = $optin.parents('form').first().find('#address').parents('.form-group').first();
      if ($optin.hasClass('optin-invalid') && $optin.is(':checked')){
        $optin.parents('.form-group').first().addClass('has-warning has-feedback');
        $addressFromGroup.addClass('has-warning has-feedback');
      } else {
        $optin.parents('.form-group').first().removeClass('has-warning has-feedback');
        $addressFromGroup.removeClass('has-warning has-feedback');
      }
    }
    , tptOptinIsValid = function ($optin){
      var isValid, needsAddress;
      isValid = true;
      needsAddress = $optin.hasClass('needs-address');
      if ($optin.is(':checked') && needsAddress){
        isValid = false;
      }
      log.info('tpt ' + (isValid ? 'is' : 'is not') + ' valid.');
      return isValid;
    }
    , optinValidation = {
      'ESPNPromo_Honda_060214_legal': {
        isValid: legalOptinIsValid,
        render: legalOptinRender
      },
      'ESPNPromo_Honda_060214_tpt': {
        isValid: tptOptinIsValid,
        render: tptOptinRender
      }
    }
    , optinIsValid = function (_optin){
      return optinValidation[_optin.attr('name')].isValid(_optin);
    }
    , optinRender = function (_optin){
      return optinValidation[_optin.attr('name')].render(_optin);
    }
    , onconfirmsubmit = function(e){
      var valids = [], valid, $optins;
      valid = true;
      $optins = $(e.target).find('input[type="checkbox"].optin');
      $optins.each(function(i, optin){
        var $optin = $(optin);
        if (optinIsValid($optin)){
          $optin.removeClass('optin-invalid');
          valids.push($optin);
        } else {
          $optin.addClass('optin-invalid');
        }
        optinRender($optin);
      });
      if (valids.length < $optins.toArray().length){
        log.info('valids.length = %s; $optins.length = %s', valids.length, $optins.length);
        log.info(valids);
        log.info($optins);
        valid = false;
      }
      return valid;
    }, onaddressupdated = function (e){
      var member = e.member;
      log.info(member);
      $('#address-text').text(member.address);
    }, onoptinchange = function(e){
      var $optin = $(e.target);
      if (optinIsValid($optin)){
        $optin.removeClass('optin-invalid');
      } else {
        $optin.addClass('optin-invalid');
      }
      optinRender($optin);
    }, oncboxcleanup = function(){
      var $optin = $('input[type="checkbox"][name="ESPNPromo_Honda_060214_tpt"]').first();
      if (!optinIsValid($optin)){
        members.fetch('data/member', function(err, data){
          var member;
          if (err){
            return log.error(err);
          }
          member = data;
          if ('address' in data && data.address !== null && data.address !== '' && data.address.trim().toLowerCase() !== 'n/a'){
            $optin.removeClass('needs-address');
            $(document).trigger({
              type: 'address-updated',
              member: member
            });
            if (optinIsValid($optin)){
              $optin.removeClass('optin-invalid');
            }
            optinRender($optin);
          }
        });
      }
    };

  exports.init = function (){
    var $form;
    if ($('body').hasClass('authentication')){
      $(document).on('cbox_cleanup', oncboxcleanup);
      $(document).on('address-updated', onaddressupdated);
      $form = $('.authentication-container form').first();
      $form.on('submit', onconfirmsubmit);
      $form.on('change', 'input[type="checkbox"].optin', onoptinchange);
      $form.find('.form-control-feedback[data-toggle="popover"]').popover({ trigger: 'hover touchstart' });
    }
    log.info('confirm.js initialized');
  };

  return exports;
});
