
var background = chrome.extension.getBackgroundPage();
var urls = [];

//communication with background
chrome.runtime.onConnect.addListener(function(port) {
    port.name === "videoURLChannel";
    port.onMessage.addListener(function(msg) {
        urls = msg[0].content;
        //console.log(msg);
        //console.log(urls);
        document.getElementById("button1").innerText = "Download video.";
        populateDropdown();
    });
  });

//send message here from background.js
background.sendToPopup();



document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('button1').onclick = doDownload;

});

function doDownload(){
    var dropdown = document.getElementById("dropdown");
    var selectedVideo = dropdown.options[dropdown.selectedIndex].value;
    
    chrome.downloads.download({url: urls[selectedVideo]});
}

function populateDropdown(){
    var select = document.getElementById("dropdown")

    //generate links for videos
    for (i = 0; i < urls.length; ++i) {
        var newopt = document.createElement("option");
        newopt.text = "Video " + (i + 1);
        newopt.value = i;
        select.add(newopt);
    }
}

