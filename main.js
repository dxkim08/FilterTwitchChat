document.addEventListener('DOMContentLoaded', function() {
    //데이터 불러오기
    //var wordList = JSON.parse(localStorage.getItem("wordList"));
    var filterCheck = JSON.parse(localStorage.getItem("filterCheck"));
    var logCheck = JSON.parse(localStorage.getItem("logCheck"));
    var startCheck = JSON.parse(localStorage.getItem("startCheck"));

    var wordList = [];
    
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

            if (wordList.indexOf(temp) == -1) {
                wordList.push(temp);
            } else {
                console.log("중복 단어입니다 : " + temp);
            }
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
    
    wordList = JSON.parse(localStorage.getItem("wordList"));
    
    if (wordList == null) {
        wordList = [];
    }
    
    //wordList 불러오기
    for (var i = 0; i < wordList.length; i++) {
        var ul = document.getElementById("wordList");

        //새 리스트 항목 생성
        var li = document.createElement("li");
        var bt = document.createElement("button");

        bt.setAttribute("class", "btn btn-danger pull-right");
        bt.setAttribute("type", "button");
        bt.addEventListener('click', deleteListItem);
        
        var sp = document.createElement("span");
        sp.setAttribute("class", "glyphicon glyphicon-trash");
        sp.setAttribute("aria-hidden", "true");

        li.innerHTML = wordList[i];
        li.setAttribute("class", "list-group-item clearfix wordItem");

        bt.appendChild(sp);
        li.appendChild(bt);
        ul.appendChild(li);
    }
    
    //필터링 시작
    var startBtn = document.getElementById('filterStartBtn');    
    
    startBtn.addEventListener('click', function() {
        var wordListLength = $("#wordList li").length;
        console.log(wordListLength);

        $("#wordList li").each(function(i) {
            var temp =  $(this).contents().filter(function() { 
                            return this.nodeType == 3; 
                        })[0].nodeValue;

            if (wordList.indexOf(temp) == -1) {
                wordList.push(temp);
            } else {
                console.log("중복 단어입니다 : " + temp);
            }
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
        
        alert("필터링을 시작합니다.\n제대로 작동하지 않으면 새로고침 후 다시 실행해주세요.");
    });
    
    //단어 추가
    var wordAddBtn = document.getElementById('wordAddBtn');    
    wordAddBtn.addEventListener('click', function() {
        var inputText = document.getElementById("wordInput");
    
        if (inputText.value == "" || inputText.value == null) {
            alert("단어를 입력해주십시오.");
            return false;
        }
        
        if (wordList.indexOf(inputText.value) != -1) {
            alert("이미 존재하는 단어입니다 : " + inputText.value);
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

        wordList.push(inputText.value);
        inputText.value = "";
    });
});

function deleteListItem() {
   $(this).closest("li").remove();
}