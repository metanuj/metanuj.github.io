/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

var videoElement = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');
var selectors = [videoSelect];

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
    console.log("deviceInfo.deviceId : " + deviceInfo.deviceId)
     if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
      return n.value === values[selectorIndex];
    })) {
      select.value = values[selectorIndex].reverse();
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

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  //var audioSource = audioInputSelect.value;
  var videoSource = videoSelect.value;
  var constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  //console.log("constraints" + videoSource);
  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(handleError);
}


//audioInputSelect.onchange = start;
//audioOutputSelect.onchange = changeAudioDestination;
videoSelect.onchange = start;
var ff = document.getElementById("loadVideo");
ff.addEventListener('click', function() {
  var element = document.getElementById('videoSource');
  var event = new Event('change');
  element.dispatchEvent(event);
  //alert("click");
});

//start();

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}