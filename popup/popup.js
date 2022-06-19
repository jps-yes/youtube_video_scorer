let button = document.getElementById("GetScoresButton");
button.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, gotTab); 
});

function gotTab(tab) {
    let tabId = tab[0].id;
    chrome.tabs.sendMessage(tabId, {txt: "getScores"});
}

// section 2 -------
document.addEventListener('DOMContentLoaded', documentEvents  , false);
function myAction(input) { 
    console.log("input value is : " + input.value);
    chrome.storage.local.set({'apiKey': input.value});
}

function documentEvents() {    
  document.getElementById('ok_btn').addEventListener('click', 
    function() { myAction(document.getElementById('name_textbox'));
  });

}

chrome.storage.local.get('apiKey', function(result) {
    if (result.apiKey) {
        document.getElementById('name_textbox').value = result.apiKey;
    }
}
);