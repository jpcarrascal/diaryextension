var diaryURL = "http://www.jpcarrascal.com";
var browser = window.browser || window.chrome;
//var matchURL = browser.runtime.getManifest().content_scripts[0].matches;
//let domain = (new URL(matchURL)).host.replace("www.","");
var minTimeToPrompt = 20000; // 20 seconds
//chrome.storage.sync.clear();
window.onload = function() {
    var now = new Date().getTime();
    var url = location.protocol + '//' + location.host + location.pathname; // Omit query from URL

    browser.storage.sync.get(["username"], function(result){
        if(!result.username) {
            let username = prompt("This is the first time you use the Diary. Please enter your username.");
            browser.storage.sync.set({username: username}, function() {

            });
        } else {
            browser.storage.sync.get(null, function(result){
                var visited = result[url] || null;
                console.log("Last visit:" + (visited?visited.last:"never") );
                if(visited == null || (now - visited.last > minTimeToPrompt) ) {
                    diaryPrompt(url, now, result.username);
                    var obj = {};
                    obj[url] = {last: now};
                    browser.storage.sync.set(obj, function() {
                        console.log("Updating last visited time: " + now);
                    });
                } else {
                    console.log("Too little time has passed...")
                }
            });
        }    
    });


}

function diaryPrompt(url, timestamp, username) {
    //let sign = prompt("What's your sign?");
    var destination = diaryURL + "?url=" + url +
                    "&timestamp=" + timestamp +
                    "&username=" + username;
    if ( window.confirm("Do you want to complete a diary entry now?") )
    {
        window.open(destination, "_blank");
    };
}
