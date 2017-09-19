var state=false;
chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
    if(message=="get"){
        sendResponse(state?"on":"off");
    }
    else if(message=="stop"){
        state=false;
        sendResponse("stop");
    }
    else if(message=="start"){
        state=true;
        sendResponse("start");
    }
    else if(message=="getStorage"){
        sendResponse(localStorage);
    }
}); 
