/*content.js - Echo360 Downloader
simple script to grab video URLs using jquery and push them to extension
Jesse Bate 2019 */


//run when page is loaded
$(document).ready(function () {
    if (document.title.includes("Classroom")) {
        var videoClasses = $('video')
        var videoURLs = [];


        $.each(videoClasses, function(key, value){
            var url = String($(this).attr("src"))
            //console.log(url);
            videoURLs.push(url);
        })

        chrome.runtime.sendMessage({content: videoURLs}, function(response) {
            if(response) {
                //we wont do anything
            } else {
                
            }
        });
    }
});

