try {
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);

    VODchatParentObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName == 'LI') {
                    //alert('li');

                    var messageParent = node.getElementsByClassName('qa-mod-message')[0];
                    var messageSpan = messageParent.getElementsByTagName('span')[0];
                    var m = messageSpan.innerHTML.toLowerCase();

                    var colored = false;

                    if (checkColor == true) {
                        var messageColor = messageParent.getAttribute('style');

                        if (messageColor != null && messageColor != "") {
                            if (messageParent.getAttribute('style').indexOf("color") != -1) {
                                messageSpan.innerHTML = "[필터링: 색깔 채팅]";
                                messageSpan.style.color = "black";
                                messageSpan.style.fontStyle = "italic";
                                messageSpan.style.fontWeight = "bold";
                                colored = true;

                                if (checkLog == true) {
                                    console.log("Destroy ChatNode " + node.id + " : " + m);
                                }
                            }
                        }
                    }

                    if (!colored) {
                        for (var i = 0; i < filterList.length; i++) {  
                            if (m.indexOf(filterList[i]) != -1) {                            
                                
                                if (checkLog == true) {
                                    console.log("Destroy ChatNode " + node.id + " : " + m);
                                }
                                
                                if (checkFilter == true) {
                                    messageSpan.innerHTML = "[필터링: 금지어]";
                                    messageSpan.style.color = "black";
                                    messageSpan.style.fontStyle = "italic";
                                    messageSpan.style.fontWeight = "bold";
                                } else {
                                    node.remove();
                                }                                       
                                
                                continue;
                            }
                        }
                    }
                }
            })
        })
    });

    LIVEchatParentObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName == 'DIV') {
                    
                    var message = node.lastChild;
                    var m = node.lastChild.innerText;

                    var colored = false;

                    if (checkColor == true) {
                        var messageColor = node.getAttribute('style');

                        if (messageColor != null && messageColor != "") {
                            if (node.getAttribute('style').indexOf("color") != -1) {
                                message.innerHTML = "[필터링: 색깔 채팅]";
                                message.style.color = "black";
                                message.style.fontStyle = "italic";
                                message.style.fontWeight = "bold";
                                colored = true;

                                if (checkLog == true) {
                                    console.log("Destroy ChatNode " + node.id + " : " + m);
                                }
                            }
                        }
                    }

                    if (!colored) {
                        for (var i = 0; i < filterList.length; i++) {  
                            if (m.indexOf(filterList[i]) != -1) {                            
                                
                                if (checkLog == true) {
                                    console.log("Destroy ChatNode " + node.id + " : " + m);
                                }
                                
                                if (checkFilter == true) {
                                    message.innerHTML = "[필터링: 금지어]";
                                    message.style.color = "black";
                                    message.style.fontStyle = "italic";
                                    message.style.fontWeight = "bold";
                                } else {
                                    node.remove();
                                }                                       
                                
                                continue;
                            }
                        }
                    }
                }
            })
        })
    });

    chatParentObserverConfig = {attributes: true, childList: true, characterData: true, subtree: true};

    live = document.getElementsByClassName('chat-list__lines');
    vod = document.getElementsByClassName('video-chat__message-list-wrapper');

    if (live.length > 0) {
        LIVEchatParentObserver.observe(live[0], chatParentObserverConfig);
    } else if (vod.length > 0) {
        VODchatParentObserver.observe(vod[0], chatParentObserverConfig);
    } else {
        alert('채팅이 최소 한 개라도 있어야 합니다.');
    }

    
} catch (error) {
    alert(error);
}