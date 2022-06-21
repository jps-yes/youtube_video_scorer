let button = document.getElementById("GetScoresButton");
button.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, gotTab); 
});

function gotTab(tab) {
    let tabId = tab[0].id;
    chrome.tabs.sendMessage(tabId, {txt: "getScores"});
}

// section 2 -------
function saveApiKey() { 
    let input = document.getElementById('api_input').value;
    chrome.storage.local.set({"apiKey": input});
}

let apiButton = document.getElementById("api_submit");
apiButton.addEventListener("click", function() {
    saveApiKey();
});

chrome.storage.local.get('apiKey', function(result) {
    if (result.apiKey) {
        document.getElementById('api_input').value = result.apiKey;
    }
}
);