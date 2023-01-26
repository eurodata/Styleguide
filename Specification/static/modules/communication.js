
import { Antetype } from './viewer.js';
export var websocket;
      
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

