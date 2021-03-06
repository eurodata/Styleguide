import { Antetype, initializeAntetype } from './modules/viewer.js';


// for WKWebView:
if (!window.exporter 
    && window.webkit 
    && window.webkit.messageHandlers 
    && window.webkit.messageHandlers.exportController
    && window.webkit.messageHandlers.exportController.postMessage) {
    window.exporter = { message: (message) => window.webkit.messageHandlers.exportController.postMessage(message) };
}

function init_export() {
    initializeAntetype(document.body);

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

    if (window.exporter && window.exporter.message) {
        window.exporter.message("AntetypeLoaded");
    }

}

window.addEventListener("load", init_export, false);
