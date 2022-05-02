window.onload = function() {
    console.log("Diary...")
    var username = findGetParameter("username");
    var url = findGetParameter("url");
    if(username) setInput("DIARY-USERNAME", username);
    if(url) setInput("DIARY-URL", url);
}

// From: https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function setInput(param, value) {
    elem = document.querySelector('div[data-params*="'+param+'"]');
    elem.style.display = "none";
    var data = elem.getAttribute("data-params");
    var m;
    var r = /\d+/g;
    var numbers = [];
    i = 0;
    while ((m = r.exec(data)) != null) {
        numbers[i] = m[0];
        i++;
    }
    try {
        document.querySelector('input[name="entry.' + numbers[2] + '"]').value = value;
    }
    catch (e) {
        console.log("Hidden input element does not exist");
    }

}