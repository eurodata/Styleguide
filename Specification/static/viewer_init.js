"use strict";
/*
    This file is used in the exported web-viewer. It builds the global Antetype-object
    and communicates with its parent frame.
*/

gdPostViewerMessage('startLoadProject');

// communication between the main frame an the iframe of the real viewer
// needs postMessage, direct JavaScript-Access is not possible if the 
// prototype is opened from the filesystem:
window.addEventListener("message", function(e) {
    switch (e.data.command) {
        case  "gotoNextScreen": Antetype.gotoNextScreen(); break;
        case  "gotoPreviousScreen": Antetype.gotoPreviousScreen(); break;
        case "gotoScreenWithIndex": 
            let index = e.data.parameters;
            let screen = Antetype.project.orderedScreens[index];
            Antetype.gotoScreen(screen);
        break;
        case "showInteractions": 
            Antetype.currentTool.keyDown({key: "Alt"});
            break;

        case "hideInteractions": 
            Antetype.currentTool.keyUp({key: "Alt"});
            break;

    }

});

// send the command-object to the parent frame
function sendToParentWindow(command) {
    window.parent.postMessage(command, "*");
}

window.addEventListener("load", function() {
    // create the Antetype-object. window.projectJSON already contains the data of the project (minus the screens)
    // window.screenJSON contains an array of the serialized screens 
    var antetype = new AntetypeWebViewer(document.body);
    window.Antetype = antetype;
    
    antetype.project = new GDProject(projectJSON,null);
    antetype.project.at = antetype;
    for (var i=0;i<screenJSON.length; i++) {
        var s = GDModelObject.fromJSONObjectInProject(screenJSON[i], antetype.project);
        antetype.project.addScreen(s);
    }

    // send the screen names and prototype tile to the parent frame (to build the screen-menu)
    sendToParentWindow({command: "buildScreens", parameters: Antetype.project.orderedScreens.map(s => s.name)});

    displayName = displayName.replace(".atype", "");
    sendToParentWindow({command: "setTitle", parameters: displayName});
    document.title = displayName;
    
    // select the right screen
    antetype.currentScreen = antetype.project.orderedScreens[currentScreenIndex];

    // makes sure the prerendered screen has all the JavaScript-relationships set:
    antetype.connectObjects();


    // if the screen is changed make sure the parent-frame (or iOS-viewer) get the current screen index
    var screenChangeFunction = function() { 
        gdPostViewerMessage("didChangeScreen", {"currentScreenIndex": antetype.currentScreenIndex});
        sendToParentWindow({command: "selectScreenWithIndex", parameters: antetype.currentScreenIndex});
    };

    antetype.onScreenChange = screenChangeFunction;
    screenChangeFunction();


    var finishParams = { screenNames: antetype.screenNames, currentScreenIndex: antetype.currentScreenIndex };
    gdPostViewerMessage('finishLoadProject', finishParams);


    // "t" toggles the toolbar:
    window.addEventListener("keypress", function(e) {
        if (e.key === "t") {
            sendToParentWindow({command: "toggleToolbar"})
        }
    });

    // execute load actions for first screen: 
    antetype.currentTool.screenDidChange(antetype.currentScreen);

});



