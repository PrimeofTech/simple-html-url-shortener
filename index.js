var endpoint = "https://www.jsonstore.io/6119ce85f3bbf044ea6bbdfe600c34add131a6de73932c1fc2bf4ce8cc38bee3";

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.assign = data;
        }

    });
}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

$(function () {
    $.getJSON(endpoint, function (data) {
        data = data['result']
        $('#currents').html('');
        var table = '<table><thead><tr><th>URL Code</th><th>URL</th></tr></thead><tbody>';
        jQuery.each(data, function(h, u) {
            table += '<tr>';
            table += `<td onclick="copy('#` + h +  `')"><span>#` + h + `</span></a></td>`;
            table += '<td>' + u + '</td>';
            // table += '<tr><td>#' + h + '</td><td>' + u + '</td></tr>';
            table += '</tr>';
        });
        table += `</tbody></table><small>(Click the URL Code to copy the link to your clipboard!)</small>`;
        $('#currents').append(table);
    });
});

function copy(h) {
    simplecopy(document.location.href + '?redir' + h);
}