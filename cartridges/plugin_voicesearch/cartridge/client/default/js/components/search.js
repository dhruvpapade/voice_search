'use strict';

var search = require('base/components/search');
var downloadTimer;
var SpeechRecognition;
var recognition;

function countdown() {
  var timeleft = 10;
  downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      window.location.href = $('#redirecturl').val();
    } else {
      $('.countdown').html(timeleft + 's');
    }
    timeleft -= 1;
  }, 1000);
}

function runSpeechRecognition() {
  $('.speechrecognition').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function () {
      $('.action').html('<small>listening, please speak...</small>');
    };

    recognition.onspeechend = function () {
      $('.action').html('<small>stopped listening, hope you are done...</small>');
      recognition.stop();
    };

    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      $('input.search-field').val(transcript).trigger('focus');
      clearInterval(downloadTimer);
      countdown();
    };

    // start recognition
    recognition.start();
  });
}

module.exports = $.extend({}, search, { runSpeechRecognition: runSpeechRecognition });
