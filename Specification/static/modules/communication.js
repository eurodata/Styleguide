// eslint-disable-next-line no-unused-vars
import { Antetype, AntetypeWeb } from './viewer.js';
var websocket;
      
export function websocket_init() {
    var name = window.location.pathname.split("/")[1];
    var host = window.location.host;
    var wsURL = "ws://" +  host + "/websocket/" + name;

    websocket = new WebSocket(wsURL);
    websocket.onopen = function(evt) { onOpen(evt) }; 
    websocket.onclose = function(evt) { onClose(evt) }; 
    websocket.onmessage = function(evt) { onMessage(evt) }; 
    websocket.onerror = function(evt) { onError(evt) }; 

    window.websocket = websocket;

}

function onOpen() { 
}

function onClose() { 
}  

function onMessage(evt) { 
     var data = evt.data;
     if (data === undefined || data.length == 0)
          return;
    var json = JSON.parse(evt.data);

    Antetype.runCommand(json);

}

function onError(evt) {
    console.log("websocket, ERROR " + evt.data);
}

/**
 * encapsulates the communication to Antetype. 
 */
export class GDCommunication {
    /**
     * @param {Window} win
     * @param {AntetypeWeb} at 
     */
    constructor(win, at) {
        this._at = at;
        this._window = win;
    }

    /**
     * Form like the command here (see runCommand/registerCommand):
     * 
     * {command: "command-name", parameters: {…paramters-object…}}
     * @param {commandName} String  
     * @param {parameters} the parameters for the command
     */
     sendCommand(commandName, parameters) {
        // this._at.log("sendCommand: " + commandName);
        const command = {"command": commandName, "parameters": parameters};
        const window = this._window;
        if (this._at.runsInAntetype) {
            if (window.serverDocument != undefined && window.serverDocument.runCommand) {
                window.serverDocument.runCommand(command);  // WebView
            } else if (window.parent.webkit 
                && window.parent.webkit.messageHandlers 
                && window.parent.webkit.messageHandlers.serverDocument 
                && window.parent.webkit.messageHandlers.serverDocument.postMessage ) {
                window.parent.webkit.messageHandlers.serverDocument.postMessage(command); //WKWebView
            }
        } else {
            const options = { 
                method: 'POST', 
                body: JSON.stringify(command) , 
                headers:  {
                    'Content-Type': 'application/json'
                }  
            };
            window.fetch(`/proxy/command/${this._at.serverDocumentName}`, options);
        }
    }

    /**
     * sends a file to Antetype
     * 
     * @param {String} name the filename
     * @param {String} mimeType the mime type of the file 
     * @param {ArrayBuffer} content of the file 
     */
    sendFile(name, mimeType, content) {
        const encodedName = encodeURIComponent(name);
        window.fetch(`/proxy/sendfile/${this._at.serverDocumentName}/${encodedName}`, {
            method: 'POST',
            body: content, 
            headers: {
                'Content-Type': mimeType
            }
        });
    }
}