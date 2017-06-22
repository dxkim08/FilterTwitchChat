chatParent = document.getElementsByClassName("chat-lines")[0];

chatParentObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
           if (node.tagName == "LI") {
                var messageParent = node.getElementsByClassName('message')[0];
                var message = messageParent.innerHTML;

                for (var i = 0; i < wordList.length; i++) {
                    if (message.indexOf(wordList[i]) != -1) {
                        node.remove();
                        //console.log("Destroy ChatNode " + node.id + " : " + message);
                    }
                }
           }
        });
    });
});

chatParentObserverConfig = {attributes: true, childList: true, characterData: true, subtree: true};
chatParentObserver.observe(document.body, chatParentObserverConfig);