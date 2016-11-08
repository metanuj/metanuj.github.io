
'use strict';

var videoElement = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');
var selectors = [videoSelect];
var shootEnabled = false;
function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  var values = selectors.map(function(select) {
    return select.value;
  });
  selectors.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (var i = deviceInfos.length-1; i >= 0 ; i--) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
     if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } //else {
      //console.log('Some other kind of source/device: ', deviceInfo);
  //  }
  }
  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
      return n.value === values[selectorIndex];
    })) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}
function stopStream(stream) {
    console.log('stop called');
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
}
function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  //var audioSource = audioInputSelect.value;
  shootEnabled = true;
  var videoSource = videoSelect.value;
 // var constraints = {
    //audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    //video: {deviceId: videoSource ? {exact: videoSource} : undefined}
 // };
 var constraints = { audio: true, video: { width: 1280, height: 720 } };
  //console.log("constraints" + videoSource);
  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(handleError);
}
videoSelect.onchange = start;


//start();

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

$(document).ready(function(){
  $("#loadVideo").on("click",function(){
    $('body').append("<div class='video-overlay'></div>");
    $(".video-popup-container").fadeIn();
    $("#videoSource").trigger('change');
  });
  // js for buttons
  $('#shootButton').on("click", function(){
    
    drawCanvas();
    stopStream(stream);
    if(!shootEnabled){
      return false;
    }
    togglePane();
    return false;
  });
  
  $('#cancel-videoPopup').on("click", function(){
    $('#canvas').remove();
    videoReset();
    start();
    togglePane();
    return false;
  });
  
  $('#capturePhoto').on("click", function(){
    getCanImage();
    $('#canvas').remove();
    $(".video-overlay").remove();
    $(".video-popup-container").fadeOut();
    videoReset();
    togglePane();
    
    return false;
  });

  function togglePane(){
    var visible = $('.video-popup-container #buttons .buttonPane:visible:first');
    var hidden = $('.video-popup-container #buttons .buttonPane:hidden:first');
    
    visible.fadeOut('fast',function(){
      hidden.show();
    });
  }
  function drawCanvas(){
    var video_id= document.getElementById("video");
    $('#video').after("<canvas id='canvas' width='260' height='195'></canvas>");
    var vid_height = $('#video').height();
    var vid_width = $('#video').width();
    $('#video').css({
      "visibility" : "hidden",
      "height" : 0,
      "width" :0
    });
    $('#canvas').width(vid_width).height(vid_height);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(video_id, 0, 0, vid_width, vid_height);
  }
  function getCanImage(){
    var img = new Image();
    img.src = canvas.toDataURL();
    $('#image-container').html(img);
  }
  function videoReset(){
    $('#video').css({
      "visibility" : "visible",
      "height" : "195px",
      "width" :"260px"
    });
  }
});