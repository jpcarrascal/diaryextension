var requestUsernameString = "Hello! This is the first time you use the Diary. Please enter your username.";
var requestEntryString = "Please complete a diary entry now?"

var browser = window.browser || window.chrome;

var diaryURL = browser.runtime.getManifest().content_scripts[1].matches[0].slice(0, -1);
//let domain = (new URL(matchURL)).host.replace("www.","");
var minTimeToPrompt = 20000; // 20 seconds
//chrome.storage.sync.clear();
window.onload = function() {
    var now = new Date().getTime();
    var today = parseInt(millis2days(now));
    var url = location.protocol + '//' + location.host + location.pathname; // Omit query from URL

    browser.storage.sync.get(["username"], function(result){
        if(!result.username) {
            let username = prompt(requestUsernameString);
            browser.storage.sync.set({username: username}, function() {

            });
        } else {
            browser.storage.sync.get(null, function(result){
                var visited = result[url] || null;
                console.log("Last visit:" + (visited?visited.last:"never") );
                if( visited == null || today > visited.last || true) {
                    diaryPrompt(url, result.username);
                    var obj = {};
                    obj[url] = {last: today};
                    browser.storage.sync.set(obj, function() {
                        console.log("Updating last visited day: " + today);
                    });
                } else {
                    console.log("Already completed diary today...")
                }
            });
        }    
    });


}

function diaryPrompt(url, username) {
    //let sign = prompt("What's your sign?");
    var destination = diaryURL + "?url=" + url +
                    "&username=" + username;
    if ( window.confirm(requestEntryString) )
    {
        window.open(destination, "_blank");
    };
}

function millis2days(millis) {
    return ((((millis/1000)/60)/60)/24)
}