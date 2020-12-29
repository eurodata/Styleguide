"use strict";
/*
    This file is used in the exported web-viewer. It builds the global Antetype-object
    and communicates with its parent frame.
*/

import { gdPostViewerMessage}  from './modules/utils.js' ;
import { Antetype, initializeAntetypeViewer }  from './modules/viewer.js' ;
import { GDProject, GDModelObject } from './modules/model.js';
import { GDSpecTool } from './modules/spec_tool.js';


gdPostViewerMessage('startLoadProject');

// communication between the main frame an the iframe of the real viewer
// needs postMessage, direct JavaScript-Access is not possible if the
// prototype is opened from the filesystem:
window.addEventListener("message", function(e) {
    switch (e.data.command) {
        case  "gotoNextScreen": Antetype.gotoNextScreen(); break;
        case  "gotoPreviousScreen": Antetype.gotoPreviousScreen(); break;
        case "gotoScreenWithIndex": {
            let index = e.data.parameters;
            let screen = Antetype.project.orderedScreens[index];
            Antetype.gotoScreen(screen);
        }
        break;
        case "showInteractions":
            Antetype.currentTool.keyDown({key: "Alt"});
            break;

        case "hideInteractions":
            Antetype.currentTool.keyUp({key: "Alt"});
            break;

    }

});

/**
 * Extract the size information from an antetype screen
 * @param {Object} currentScreen this should be an antetype screen
 */
function extractScreenSizeInformation(currentScreen) {
  return {
    width: currentScreen.valueForKeyInStateWithIdentifier('width', currentScreen.activeStateIdentifier),
    maxWidth: currentScreen.valueForKeyInStateWithIdentifier('maximumWidth', currentScreen.activeStateIdentifier),
    minWidth: currentScreen.valueForKeyInStateWithIdentifier('minimumWidth', currentScreen.activeStateIdentifier),
    height: currentScreen.valueForKeyInStateWithIdentifier('height', currentScreen.activeStateIdentifier),
    maxHeight: currentScreen.valueForKeyInStateWithIdentifier('maximumHeight', currentScreen.activeStateIdentifier),
    minHeight: currentScreen.valueForKeyInStateWithIdentifier('minimumHeight', currentScreen.activeStateIdentifier)
  }
}

// send the command-object to the parent frame
function sendToParentWindow(command) {
    window.parent.postMessage(command, "*");
}

window.addEventListener("load", function() {
    // create the Antetype-object. window.projectJSON already contains the data of the project (minus the screens)
    // window.screenJSON contains an array of the serialized screens

    initializeAntetypeViewer();
    let antetype = Antetype;

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
        sendToParentWindow({command: "updateIFrame", parameters: extractScreenSizeInformation(antetype.currentScreen)});
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



// just like the normal tools, but for specification
let specTool = null;


// since we have to cross frames (and have to work without web server) we send
// messages between the frames. This are the messages which are called by the main frame.
window.addEventListener("message", e => {
    if (specTool == null) {
        specTool = new GDSpecTool(Antetype);
    }
    switch (e.data.command) {
        case "enableSpecTool": Antetype.setCurrentTool(specTool);
            break;

        case "disableSpecTool": Antetype.setCurrentTool(Antetype.runTool);
            break;

        case "selectParent": specTool.selectContainer();
            break;

        case "selectFirstChild": specTool.selectFirstChild();
            break;

        case "selectPreviousSibling": specTool.selectPreviousSibling();
            break;

        case "selectNextSibling": specTool.selectNextSibling();
            break;

    }

});
