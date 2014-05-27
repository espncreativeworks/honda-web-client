/*global define */
define(['require', 'jquery', 'loglevel', './utils/human-readable'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , humanReadable = require('utils/human-readable')
    , updateProgress = function ($el, completed){
      var _completed = Math.floor((completed * 100), 10);
      $el.css({ width: _completed.toString() + '%' });
    }
    , getThumbnailAtFrame = function ($video, $canvas, frame, cb){
      var video, canvas;
      video = $video.get(0);
      canvas = $canvas.get(0);

      $video.one('loadeddata', function(){
        video.volume = 0;
        canvas.width = $video.width();
        canvas.height = $video.height();
      });

      $video.one('canplaythrough', function(){
        if (frame <= video.duration){
          video.currentTime = frame;
        } else {
          video.currentTime = 0;
        }
        video.play();
        video.pause();

        var context, dataUrl;
        context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, $video.width(), $video.height());
        dataUrl = canvas.toDataURL();
        log.info(dataUrl);
        log.info('video: ', video.width, 'x', video.height);
        log.info('$video: ', $video.width(), 'x', $video.height());
        log.info('canvas: ', canvas.width, 'x', canvas.height);
        cb(null, dataUrl);
      });

    }
    , onselectvideo = function (){
      $(this).prev('input[type="file"]').trigger('click');
    }
    , onfilechange = function (e){
      var _input, _file, _fileReader, $feedbackContainer, $thumbnail, $message, $progress, _loaded, _minLoaded, $video, $canvas;
      _loaded = 0;
      _minLoaded = 0.02;
      _input = e.originalEvent.target;
      _file = _input.files[0];
      _fileReader = new FileReader();
      $feedbackContainer = $('.feedback-container').first();
      $thumbnail = $feedbackContainer.find('.thumbnail-placeholder').first();
      $message = $feedbackContainer.find('.message').first();
      $progress = $feedbackContainer.find('.progress').first();
      $video = $('<video>', { 'class': 'tmp', preload: 'auto' });
      $canvas = $('<canvas>', { 'class': 'tmp' });
      $('.hide-target').append($video).append($canvas);

      _fileReader.onloadstart = function (){
        $feedbackContainer.removeClass('has-message has-file-info').addClass('has-progress');
        updateProgress($progress, _minLoaded);
      };

      _fileReader.onprogress = function (evt){
        if (evt.lengthComputable){
          _loaded = evt.loaded / evt.total;
          if (_loaded < 100){
            updateProgress($progress, _loaded);
          }
        }
      };

      _fileReader.onerror = function (){
        $feedbackContainer.removeClass('has-progress has-file-info').addClass('has-message');
        $message.text('An error occured. Please try again');
      };

      _fileReader.onabort = function (){
        $feedbackContainer.removeClass('has-progress has-file-info').addClass('has-message');
        $message.text('Operation aborted. Please try again');
      };

      _fileReader.onload = function (){
        var _url, _mimeType, $fileInfo, _thumbnailURL, $source;
        _url = _fileReader.result;
        _mimeType = _file.type;
        //log.info(_file);
        $source = $('<source>', { src: _url, type: _mimeType });
        $video.append($source);
        getThumbnailAtFrame($video, $canvas, 1, function (err, url){
          if (err){
            log.error(err);
            return;
          }
          _thumbnailURL = url;
          $thumbnail.css({ backgroundImage: 'url(' + _thumbnailURL + ')' });
        });
        $fileInfo = $feedbackContainer.find('.file-info');
        $fileInfo.find('#file-name').text(_file.name);
        $fileInfo.find('#file-size').text(humanReadable.fromBytes(_file.size));
        $feedbackContainer.removeClass('has-progress has-message').addClass('has-file-info');
        updateProgress($progress, 0);
      };

      _fileReader.onloadend = function (){
        updateProgress($progress, 0);
      };

      _fileReader.readAsDataURL(_file);

    };

  exports.init = function(){
    if ($('body').hasClass('upload')){
      $('[data-control-action="select-video"]').on('click', onselectvideo);
      $('input[type="file"][name="video-file"]').on('change', onfilechange);
      $('input[type="file"][name="video-file"]').on('mouseenter', function(){
        $(this).next('.btn').addClass('hover');
      });
      $('input[type="file"][name="video-file"]').on('mouseleave', function(){
        $(this).next('.btn').removeClass('hover');
      });
      $('input[type="file"][name="video-file"]').on('focusin', function(){
        $(this).next('.btn').addClass('focus');
      });
      $('input[type="file"][name="video-file"]').on('focusout', function(){
        $(this).next('.btn').removeClass('focus');
      });
      $('input[type="file"][name="video-file"]').on('mousedown', function(){
        $(this).next('.btn').addClass('active');
      });
      $('input[type="file"][name="video-file"]').on('mouseup', function(){
        $(this).next('.btn').removeClass('active');
      });
    }

    log.info('upload.js initialized');
  };

  return exports;
});
