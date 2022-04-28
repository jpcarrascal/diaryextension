//if( key.indexOf("domestika.org") > -1 )
console.log("I'm 1her")
var minTimeToPrompt = 20000; // 10 seconds
var diaryURL = "http://www.jpcarrascal.com";
var browser = window.browser || window.chrome;
//chrome.storage.sync.clear();
window.onload = function() {
    var now = new Date().getTime();
    var url = location.protocol + '//' + location.host + location.pathname; // Omit query from URL
    if( url.indexOf("domestika.org") > -1 ) {
        console.log("I'm there")
        browser.storage.sync.get(null, function(result){
            var visited = result[url] || null;
            console.log("Last visit:" + (visited?visited.last:"never") );
            if(visited == null || (now - visited.last > minTimeToPrompt) ) {
                diaryPrompt(url, now);
                var obj = {};
                obj[url] = {last: now};
                browser.storage.sync.set(obj, function() {
                    console.log("Updating last visited time: " + now);
                });
            } else {
                console.log("Too little time has passed...")
            }
        });

/*
        switch(window.location.href) {
            case "https://www.domestika.org/":
                if(Math.random() > 0.5)
                    console.log("Pagina principal");
                break;
            case "https://www.domestika.org/es/courses":
                console.log("Pagina de cursos");
                break;
            default:
                break;
        }
*/
    } 
}

function diaryPrompt(url, timestamp) {
    //let sign = prompt("What's your sign?");
    var destination = diaryURL + "?url=" + url + "&timestamp=" + timestamp;
    if ( window.confirm("Do you want to complete a diary entry now?") )
    {
        window.open(destination, "_blank");
    };
}