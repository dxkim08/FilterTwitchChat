if (typeof wordList !== 'undefined') {
    chatParent = document.getElementsByClassName("chat-lines")[0];

    chatParentObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
               if (node.tagName == "LI") {
                    try {
                        var messageParent = node.getElementsByClassName('message')[0];
                        var message = messageParent.innerHTML;

                        for (var i = 0; i < wordList.length; i++) {
                            if (message.indexOf(wordList[i]) != -1) {
                                if (logCheck == true) {
                                    console.log("Destroy ChatNode " + node.id + " : " + message);
                                }
                                
                                if (filterCheck == true) {
                                    messageParent.innerHTML = "<필터링 된 채팅입니다.>";
                                    messageParent.style.color = "red";
                                    messageParnet.style.fontStyle = "italic";
                                    messageParent.style.fontWeight = "bold";
                                } else {
                                    node.remove();
                                }                                                          
                                
                                break;
                            }
                        }
                    } catch (e) {
                        //console.log(e);
                    }
               }
            });
        });
    });

    chatParentObserverConfig = {attributes: true, childList: true, characterData: true, subtree: true};
    chatParentObserver.observe(document.body, chatParentObserverConfig);
}