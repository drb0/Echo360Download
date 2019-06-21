//background.js

var urls;

//filter for unique array entries
const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

function sendToPopup() {
    //connect to port for communication with popup.html
    var port = chrome.extension.connect({
        name: "videoURLChannel"
    });
    port.postMessage(urls);
}

//declare popup visible on echo360 websites
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostContains: 'echo360'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
    });

//listens for urls from content.js and adds unique ones to the url list
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {  
    urls = [request].filter(unique);
    sendResponse();
})

