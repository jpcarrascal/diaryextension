/*
  CONFIGURATION:
  Configure the following parameters accoding to your needs:
*/
var requestUsernameString = "Hello! This is the first time you use the Diary. Please enter your username.";
var requestEntryString = "Hi! Do you want to complete your diary entry for today?"
var secondsBeforePrompt = 5;
/*
  No need to make changes below.
*/

var browser = window.msBrowser || window.browser || window.chrome;
var diaryURL = browser.runtime.getManifest().content_scripts[1].matches[0].slice(0, -1);
//chrome.storage.sync.clear();
window.onload = function() {
    var now = new Date().getTime();
    var today = parseInt(millis2days(now));
    var url = location.href;

    browser.storage.sync.get(["username"], function(result){
        if(!result.username) {
            console.log("First session, prompting for username");
            let username = prompt(requestUsernameString);
            browser.storage.sync.set({username: username}, function() {
                console.log("Username saved: " + username)
            });
        } else {
            browser.storage.sync.get(null, function(result){
                console.log(result)
                var visited = result[url] || null;
                console.log("Last day: " + (visited?(visited.last==today?"today":visited.last):"never") );
                console.log("Last time: " + (visited?visited.time:"never") );
                if( visited == null || today > visited.last) {
                    setTimeout(() => {
                        var addedEntry = diaryPrompt(url, result.username);
                        var obj = {};
                        obj[url] = {last: today, time: now, addedEntry: addedEntry};
                        browser.storage.sync.set(obj, function() {
                            console.log("Updating last visited day: " + today);
                        });
                    }, secondsBeforePrompt*1000);
                } else {
                    console.log("Already prompted for entry today...")
                }
            });
        }    
    });


}


window.onpagehide = event => {
    if (event.persisted) { //the page isn't being discarded, so it can be reused later
    }
    console.log("Page closed...");
}


function diaryPrompt(url, username) {
    //let sign = prompt("What's your sign?");
    var destination = diaryURL + "?url=" + url + "&username=" + username;
    var addEntryNow = window.confirm(requestEntryString);
    if ( addEntryNow )
    {
        console.log("Adding entry...");
        window.open(destination, "_blank");
    } else {
        console.log("Skipped entry...");
    }
    return addEntryNow;
}

function millis2days(millis) {
    return ((((millis/1000)/60)/60)/24)
}