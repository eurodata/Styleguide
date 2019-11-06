"use strict";
var Antetype = null;
function init_export() {
    Antetype = new AntetypeWeb(document.body);

    Antetype.registerCommand("finishLoading", function(json, at) {
        window.exporter.message("finishLoading");
    });

    Antetype.registerCommand("changeScreen", function(json,at) {   
        let request = new XMLHttpRequest();
        request.open("GET", "/proxy/fetchobject?document=" + at.serverDocumentName + "&entity=GDFigure&id="+json.screenID);
        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE && request.status === 200) {
                const json = JSON.parse(request.response);
                at.changeScreenFromJSON(json);
                at.asyncCommandExecuting = false;
            }
        }
        at.asyncCommandExecuting = true;
        request.send();
    });

}

window.addEventListener("load", init_export, false);
