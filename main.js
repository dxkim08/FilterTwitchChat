document.addEventListener('DOMContentLoaded', function() {
    //데이터 불러오기
    var wordList = JSON.parse(localStorage.getItem("wordList"));
    var filterCheck = JSON.parse(localStorage.getItem("filterCheck"));
    var logCheck = JSON.parse(localStorage.getItem("logCheck"));
    var startCheck = JSON.parse(localStorage.getItem("startCheck"));
    
    if (wordList == null) {
        wordList = [];
    }
    
    if (filterCheck == true) {
        document.getElementById("filterCheck").checked = true;
    }
    
    if (logCheck == true) {
        document.getElementById("logCheck").checked = true;
    }
    
    if (startCheck == true) {
        document.getElementById("startCheck").checked = true;
        
        var wordListLength = $("#wordList li").length;
        console.log(wordListLength);

        $("#wordList li").each(function(i) {
            var temp =  $(this).contents().filter(function() { 
                            return this.nodeType == 3; 
                        })[0].nodeValue;

            wordList.push(temp);
        });

        //데이터 저장
        localStorage.removeItem("wordList");
        localStorage.removeItem("filterCheck");
        localStorage.removeItem("logCheck");
        localStorage.removeItem("startCheck");

        localStorage.setItem("wordList", JSON.stringify(wordList));
        localStorage.setItem("filterCheck", document.getElementById("filterCheck").checked);
        localStorage.setItem("logCheck", document.getElementById("logCheck").checked);
        localStorage.setItem("startCheck", document.getElementById("startCheck").checked);

        //실행
        chrome.tabs.executeScript(null, {code: 'var filterCheck = ' + JSON.stringify(filterCheck) + '; var logCheck = ' + JSON.stringify(logCheck) + '; var wordList = ' + JSON.stringify(wordList)}, function() {
            chrome.tabs.executeScript(null, {file: "filter.js"});
        });

        var status = document.getElementById('status');
        status.innerHTML = "필터링 사용중입니다.<br>종료하려면 새로고침 해주세요.";
    }
    
    for (var i = 0; i < wordList.length; i++) {
        var ul = document.getElementById("wordList");

        //새 리스트 항목 생성
        var li = document.createElement("li");
        var bt = document.createElement("button");

        bt.setAttribute("class", "btn btn-danger pull-right");
        bt.setAttribute("type", "button");
        bt.addEventListener('click', deleteListItem);
        bt.innerHTML = "X";

        li.innerHTML = wordList[i];
        li.setAttribute("class", "list-group-item clearfix wordItem");

        li.appendChild(bt);
        ul.appendChild(li);
    }
    
    //필터링 시작
    wordList = [];
    var startBtn = document.getElementById('filterStartBtn');    
    
    startBtn.addEventListener('click', function() {
        var wordListLength = $("#wordList li").length;
        console.log(wordListLength);

        $("#wordList li").each(function(i) {
            var temp =  $(this).contents().filter(function() { 
                            return this.nodeType == 3; 
                        })[0].nodeValue;

            wordList.push(temp);
        });

        //데이터 저장
        localStorage.removeItem("wordList");
        localStorage.removeItem("filterCheck");
        localStorage.removeItem("logCheck");
        localStorage.removeItem("startCheck");

        localStorage.setItem("wordList", JSON.stringify(wordList));
        localStorage.setItem("filterCheck", document.getElementById("filterCheck").checked);
        localStorage.setItem("logCheck", document.getElementById("logCheck").checked);
        localStorage.setItem("startCheck", document.getElementById("startCheck").checked);

        //실행
        chrome.tabs.executeScript(null, {code: 'var filterCheck = ' + JSON.stringify(filterCheck) + '; var logCheck = ' + JSON.stringify(logCheck) + '; var wordList = ' + JSON.stringify(wordList)}, function() {
            chrome.tabs.executeScript(null, {file: "filter.js"});
        });

        var status = document.getElementById('status');
        status.innerHTML = "필터링 사용중입니다.<br>종료하려면 새로고침 해주세요.";
    });
    
    //단어 추가
    var wordAddBtn = document.getElementById('wordAddBtn');    
    wordAddBtn.addEventListener('click', function() {
        var inputText = document.getElementById("wordInput");
    
        if (inputText.value == "" || inputText.value == null) {
            alert("단어를 입력해주십시오.");
            return false;
        }

        //리스트 가져오기 
        var ul = document.getElementById("wordList");

        //새 리스트 항목 생성
        var li = document.createElement("li");
        var bt = document.createElement("button");
        var sp = document.createElement("span");
        
        bt.setAttribute("class", "btn btn-danger pull-right");
        bt.setAttribute("type", "button");
        bt.addEventListener('click', deleteListItem);
        //bt.innerHTML = "X";

        li.innerHTML = inputText.value;
        li.setAttribute("class", "list-group-item clearfix wordItem");

        sp.setAttribute("class", "glyphicon glyphicon-trash");
        sp.setAttribute("aria-hidden", "true");

        bt.appendChild(sp);
        li.appendChild(bt);
        ul.appendChild(li);    

        inputText.value = "";
    });
});

function deleteListItem() {
   $(this).closest("li").remove();
}