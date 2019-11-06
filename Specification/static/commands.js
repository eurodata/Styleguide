"use strict"

/*
commands send by Antetype either via WebSocket (for the viewers), or directly
in case of the embedded webview. 

for each command: 
parameters: json: the json send by Antetype (currently not really always the same, 
normally a dictionary). The second parameter (at) denotes the AntetypeWeb-object

*/

var Antetype = null;
function init() {
//mmhmmm for testing: 
if (document.getElementById("TestScreen")) {
    Antetype = new AntetypeWeb(document.getElementById("TestScreen"));
} else {
    Antetype = new AntetypeWeb(document.body);
}



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

// for testing, synchronous variant of "changeScreen"
Antetype.registerCommand("changeScreenSynchronous", function(json,at) {
    at.changeScreenFromJSON(json);
});


Antetype.registerCommand("addCell", function(json,at) {
    const index = json["index"];
    const containerID = json["container"];
    const cellJSON = json["cell"];
    const cell = GDModelObject.fromJSONObjectInProject(cellJSON, Antetype.project);
    const containerNode = document.getElementById(containerID) || at.screenElement;
    const containerFigure = containerNode.figure;
    const insertAtEnd = index >= containerFigure.orderedComponents.length;
    containerFigure.insertComponent(cell, index);
    cell.container = containerFigure;

    const newCellNode = at.buildDOMForCell(cell);
    if (insertAtEnd) {
        containerNode.appendChild(newCellNode);
    } else {
        const nextSibling = containerFigure.orderedComponents[index+1];
        const n = nextSibling.DOMElement;
        containerNode.insertBefore(newCellNode, n);
    }

    at.cellProperties(newCellNode, cell); // why do we need this the second time here?
    at.executeFinalWidgetLayoutPass(cell);
    //at.updateTriangleCell(cell, cell.activeStateIdentifier);
});


Antetype.registerCommand("removeCell", function(json, at) {
    const containerId = json["container"];
    const index = json["index"];
    const containerDOMElement = document.getElementById(containerId);
    const containerFigure = containerDOMElement.figure;

    const cell = containerFigure.orderedComponents[index];
    const childDOMElement = cell.DOMElement;

    cell.cleanupStyles();
    containerDOMElement.removeChild(childDOMElement);
    containerFigure.removeComponentAtIndex(index);
});

//FIXME: lookNode-handling is confusing. Add a real object?
Antetype.registerCommand("addWidget", function(json, at) {
    var widget = GDModelObject.fromJSONObjectInProject(json["widget"], at.project);
    at.project.addWidget(widget);
    
    var lookNodes = json["lookNodes"];
    
    for(var i = 0; i < lookNodes.length; i++) {
        var currentLookNode = lookNodes[i];
        at.project.currentLookAndFeel.updateLookNode(currentLookNode["definitionIdentifier"], currentLookNode["definitionDictionary"], at);
    }
});


Antetype.registerCommand("addState", function(json, at) {
    const state = GDModelObject.fromJSONObjectInProject(json["state"], at.project);
    const widget = at.project.widgetWithIdentifier(json["widgetIdentifier"]);
    widget.addState(state);   

    const lookNodes = json["lookNodes"];
    for (let i=0; i<lookNodes.length; i++) {
        const l =  lookNodes[i];
        const definitionIdentifier = l["definition"];
        const stateIdentifier = state.identifier;
        at.project.currentLookAndFeel.addStateLookNode(definitionIdentifier, stateIdentifier, l["lookNode"], at);
    }

    if (!at.runsInAntetype) {
        if (state.type == GDState.GDFocusStateType) {
            widget.instances.forEach( i => { if (i.DOMElement) i.DOMElement.tabIndex = 0 } );
        }
    }
});

Antetype.registerCommand("updateStateProperties", function(json,at) {
    var state = at.project.stateWithIdentifier(json["state"]);

    var lookNodes = json["lookNodes"];
    for (var i=0; i<lookNodes.length; i++) {
        var l =  lookNodes[i];
        var definition = l["definition"];
        var stateIdentifier = state.identifier;
        at.project.currentLookAndFeel.addStateLookNode(definition, stateIdentifier, l["lookNode"], at);
    }
});

Antetype.registerCommand("deleteStates", function(json, at) {
    const stateIdentifiers = json["stateIdentifiers"];
    let states = [];
    for (let i=0; i<stateIdentifiers.length; i++) {
        const state = at.project.stateWithIdentifier(stateIdentifiers[i]);
        states.push(state);
    }
    at.project.deleteStates(states);
});

Antetype.registerCommand("updateStateAnimation", function(json, at) {
    const animate = json["animate"];
    const curve = json["animationCurve"];
    const duration = json["animationDuration"];
    const stateIdentifiers = json["stateIdentifiers"];
    let states = [];
    for (let i=0; i<stateIdentifiers.length; i++) {
        const state = at.project.stateWithIdentifier(stateIdentifiers[i]);
        states.push(state);
    }

    at.updateStateAnimation(states, animate, duration, curve);
});


Antetype.registerCommand("gotoScreenWithTransition", function(json, at) {
    const screenId = json["screenID"];
    const duration = json["duration"];
    const transition = json["transition"];

    at.gotoScreenWithIDEditModeWithTransition(screenId, transition, duration); 
});

Antetype.registerCommand("rebuildRenderObjects", function(json, at) {
    let request = new XMLHttpRequest();
    const screenID = json["figures"][0];
    request.open("GET", "/proxy/fetchobject?document=" + at.serverDocumentName + "&entity=GDFigure&id="+screenID);
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE && request.status === 200) {
            let json = JSON.parse(request.response);

            var screen = GDModelObject.fromJSONObjectInProject(json, at.project);
            at.rebuildRenderObjects(screen);

            at.asyncCommandExecuting = false;
        }

    }
    at.asyncCommandExecuting = true;
    request.send();
});

Antetype.registerCommand("startCommandRecording", function(json, at) {
    at.recordCommands = true;
});

Antetype.registerCommand("stopCommandRecording", function(json, at) {
    at.recordCommands = false;
});


Antetype.registerCommand("rebuildRenderObjectsForFigures", function(json, at) {
    const figuresData = json["figures"];

    let newFigures = [];

    for (let i=0; i<figuresData.length; i++) {
        const figureJson = figuresData[i];
        const newFigure = GDModelObject.fromJSONObjectInProject(figureJson, at.project);
        newFigures.push(newFigure);
    }


    // Issue #175 clean up all at once, before building new styles:
    // if we do it in one loop (clean + build) we remove styles if we
    // nest cells. 
    newFigures.forEach( f => {
        const figureId = f.objectID;
        const oldDomElement = document.getElementById(figureId);

        if (oldDomElement != null ) {
            const oldFigure = oldDomElement.figure;
            oldFigure.cleanupStyles();
        }
    });

    // build new DOM/CSS and replace the old ones: 
    newFigures.forEach( newFigure => {
        const figureId = newFigure.objectID;
        const oldDomElement = document.getElementById(figureId);

        if (oldDomElement != null ) {
            const oldFigure = oldDomElement.figure;

            const container = oldFigure.container;
            const index = container.orderedComponents.indexOf(oldFigure);
            container.removeComponentAtIndex(index);
            container.insertComponent(newFigure, index);
            var newDomElement = at.buildDOMForCell(newFigure);

            oldDomElement.parentNode.replaceChild(newDomElement, oldDomElement);
            at.executeFinalWidgetLayoutPass(newFigure);
        }
    });
    at.send("restoreSelectionAfterReload");
});


Antetype.registerCommand("moveFigures", function(json, at) {
    const index = json["index"];
    const figureIDs = json["figures"];

    const container = at.getElementById(json["container"]).figure;
    let figures = figureIDs.map( i => at.getElementById(i).figure );

    at.moveFigures(figures, container, index);
});


Antetype.registerCommand("changeProperty", function(json,at) {
    var objectId = json["objectId"];
    var cell = at.getElementById(objectId);
    if (cell == null) {
        at.log("could not find domElement with id " + objectId);
        return;
    }
    var value = json["value"];
    var key = json["key"];
    var stateIdentifier = json["state"];
    var figure = cell.figure;
    if (stateIdentifier != undefined) {
        var state = at.project.stateWithIdentifier(stateIdentifier);
        at.cellSetPropertyInState(figure, key, value, state);
    } else {
        at.cellSetProperty(figure, key, value);
    }

    if((key == "vectorContent" || 
        key == "backgroundPainterType" || 
        key == "backgroundColor" || 
        key == "borderTopColor" || 
        key == "borderTopWidth") && 
        cell.figure.valueForKeyInStateWithIdentifier("cellType", stateIdentifier) == GDVectorCellType) {
        at.updateVectorCell(cell);
    }

    //at.updateTriangleCell(figure, stateIdentifier);
});

Antetype.registerCommand("changeCustomCSS", function(json,at) {
    const objectId = json["objectId"];
    const cell = at.getElementById(objectId);
    if (cell == null) {
        at.log("could not find domElement with id " + objectId);
        return;
    }
    const value = json["value"];
    const stateIdentifier = json["state"];
    const figure = cell.figure;

    figure.setValueForKeyInStateWithIdentifier(value, "customCSS", stateIdentifier);
    const style = figure.cssStyleForStateIdentifier(stateIdentifier);
    
    // remove old styles
    for (let i=style.length; i--;) {
        let name = style[i];
        style.removeProperty(name);
    }
    at.populateCellPropertiesInState(style, figure, stateIdentifier);
});

Antetype.registerCommand("changeEmbedHTML", function(json,at) {
    const objectId = json["objectId"];
    const cell = at.getElementById(objectId);
    if (cell == null) {
        at.log("could not find domElement with id " + objectId);
        return;
    }
    const value = json["value"];
    const stateIdentifier = json["state"];
    const figure = cell.figure;
    
    if (figure.activeStateIdentifier == stateIdentifier) {
        cell.innerHTML = value;
    }
});



Antetype.registerCommand("updateLookAndFeelProperty", function(json, at) {
    var name = json["name"];
    var definitionIdentifier = json["definition"];
    var value = json["value"];
    var state = json["state"];
    at.project.currentLookAndFeel.setValueForKey(value, name, definitionIdentifier, state);
});


Antetype.registerCommand("updateResource", function(json, at) {
    var resource = GDModelObject.fromJSONObjectInProject(json["resource"], at.project);
    at.project.resources[resource.identifier] = resource;
}); 

Antetype.registerCommand("updateCellInteractions", function(json, at) {
    var webID = json["webID"];
    var e = [];
    var eventHandlersJSON = json["eventHandlers"];
    for (var i=0; i<eventHandlersJSON.length; i++) {
        var handlerJSON = eventHandlersJSON[i];
        var eventHandler = GDModelObject.fromJSONObjectInProject(handlerJSON, at.project);
        e.push(eventHandler);
    }

    var domElement = document.getElementById(webID);
    if (domElement == null) {
        return;
    }

    var cell = domElement.figure;

    if (cell == undefined) {
        return;
    }
    cell.setEventHandlers(e);
    cell.updateEventListeners(at);
    if (at.currentTool.isRunTool()) {
        if (cell.hasActionsOfEventType(GDMouseClickEventType)) {
            domElement.style.cursor = "pointer";
        } else {
            domElement.style.cursor = "";
        }
    }
});

Antetype.registerCommand("changeTool", function(json, at) {
    if (!at.runsInAntetype) 
        return; // currently runmode only 
    var toolClassName = json["className"];
    switch (toolClassName) {
        case "GDRunTool": at.setCurrentTool(at.runTool); break;
        case "GDSelectionTool": at.setCurrentTool(at.selectionTool); break;
        case "GDTextTool" : at.setCurrentTool(at.textTool); break;
        case "GDVectorTool" : at.setCurrentTool(at.vectorTool); break;
        case "GDFigureDragTool" : at.setCurrentTool(at.figureDragTool); break;
        case "GDHandleDragTool" : at.setCurrentTool(at.handleDragTool); break;
        case "GDSelectionRectTool" : at.setCurrentTool(at.selectionRectTool); break;
        default: 
            at.log("changeTool: with unknown tool: " +toolClassName);
    }
});

Antetype.registerCommand("didEnterInplacePresentationMode", function(json, at) {
    if (!at.runsInAntetype) {
        return; // live-preview is always in presentation mode
    }

    // #267 editable-text + active pseudo states:
    at.currentScreen.deepOrderedComponents.forEach( c => {
        if (c.valueForKeyInStateWithIdentifier("isEditableText", c.activeStateIdentifier)) {
            at.updateText(c);
        }

        if (c.isRootInstanceCell && c.activeState.isPseudoState) {
            let normalState = c.widget.states.find( s => s.type == GDState.GDNormalStateType );
            at.changeStateOfCell(c, normalState, "");
        }
    });
    at.currentTool.screenDidChange(at.currentScreen); // execute load-actions
});

Antetype.registerCommand("changeState", function(json, at) {
    const webID = json["webID"];
    const stateIdentifier = json["stateIdentifier"];

    const DOMElement = document.getElementById(webID); 
    if (DOMElement) {
        const figure = DOMElement.figure;
        const rootCell = figure.rootInstanceCell;

        const state = at.project.stateWithIdentifier(stateIdentifier);

        at.changeStateOfCell(rootCell, state, "");
    }
});



Antetype.registerCommand("selectionDidChange", function(json, at) {
    var ids = json;
    var selection = [];
    for (var i=0; i<ids.length; i++) {
        var nextId = ids[i];
        var domElement = document.getElementById(nextId);
        if (domElement) {
            var figure = domElement.figure;
            selection.push(figure);
        }
    }
    at.selectFigures(selection);
});


Antetype.registerCommand("editTextOfFigure", function(json, at) {
    if (!at.runsInAntetype)
        return;
    var webID =  json["webID"];
    var figure = document.getElementById(webID).figure;
    at.editTextOfFigure(figure);
});

Antetype.registerCommand("editVectorOfFigure", function(json, at) {
    if (!at.runsInAntetype)
        return;
    var webID =  json["webID"];
    var figure = document.getElementById(webID).figure;
    at.editVectorOfFigure(figure);
});

Antetype.registerCommand("updateHandles", function(json, at) {
    at.updateHandles();
});

Antetype.registerCommand("hideHandles", function(json, at) {
    at.hideHandles();
});

Antetype.registerCommand("showHandles", function(json, at) {
    at.showHandles();
});
    

Antetype.registerCommand("updateGuides", function(json, at) {
    var lines = [];
    for (var i=0; i<json.length; i++) {
        var lineJSON = json[i];
        var line = new AlignmentLine(lineJSON);
        lines.push(line);
    }
    at.updateGuides(lines);
});


Antetype.registerCommand("updateLiveLayouterPlaceholder", function(json, at) {
    var placeHolder = json["placeHolder"];
    at.insertPlaceholder(placeHolder["containerID"], placeHolder["index"], placeHolder["startSize"], placeHolder["endSize"]);
});


Antetype.registerCommand("removePlaceholder", function(json, at) {
    at.removePlaceholder();
});

Antetype.registerCommand("setPossibleTargetRect", function(json, at) {
    var x = json["x"];
    var y = json["y"];
    var w = json["width"];
    var h = json["height"];
    at.setPossibleTargetRect(x,y,w,h);
});

Antetype.registerCommand("addDesignBreakPoint", function(json, at) {
    var breakPoint = GDModelObject.fromJSONObjectInProject(json["breakPoint"], at.project);
    at.project.addDesignBreakPoint(breakPoint);
});

Antetype.registerCommand("updateDesignBreakPoint", function(json, at) {
    var updatedBreakPoint = GDModelObject.fromJSONObjectInProject(json["breakPoint"], at.project);
    var originalBreakPoint = at.project.designBreakPointWithObjectID(updatedBreakPoint.objectID);
    at.project.updateDesignBreakPoint(originalBreakPoint, updatedBreakPoint.breakPointName, updatedBreakPoint.breakPointMaxWidth);
});

Antetype.registerCommand("deleteDesignBreakPoint", function(json, at) {
    var name = json["breakPointName"];
    var breakPoint = at.project.designBreakPointWithName(name);
    at.project.deleteDesignBreakPoint(breakPoint);
});

Antetype.registerCommand("removeInstancePropertyInState", function(json, at) {
    var cell = at.getElementById(json["webID"]);
    var state = at.project.stateWithIdentifier(json["state"]);
    var propertyName = json["name"];

    cell.figure.setValueForKeyInStateWithIdentifier(undefined, propertyName, state.identifier);
});


Antetype.registerCommand("changeCellID", function(json, at) {
    var oldID = json["oldID"];
    var newID = json["newID"];

    var figure = at.getElementById(oldID);
    at.changeIDOfCell(figure, newID);
});


/*
 * for Viewers, initial loading sends 'startLoadProject' and 'finishLoadProject' for the
 * initial project load
 */
function gdPostViewerMessage(msg) {
    // WKWebView (iOS Viewer)
    if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.antetypeFinishedLoadingHandler && window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage) {
        window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage(msg)
    }

    // internal (Antetype WebView): 
    if (window.serverDocument && window.serverDocument.postMessage) {
        window.serverDocument.postMessage(msg);
    }
}

Antetype.registerCommand("finishLoadProject", function(json, at) {
    gdPostViewerMessage('finishLoadProject');
});

Antetype.registerCommand("startLoadProject", function(json, at) {
    gdPostViewerMessage('startLoadProject');
});

Antetype.registerCommand("changeHighlightColor", function(json,at) {
    at.highlightColor = CPColor.fromJSON(json["value"]);
});

if (Antetype.runsInAntetype) {
    Antetype.send("hello");
} else {
    gdPostViewerMessage('startLoadProject');
    websocket_init();
    if (window.websocket)  {
/*        if (websocket.readyState == websocket.OPEN) {
            websocket.send("hello");
        } else {
            websocket.addEventListener("open", function(e) { 
                websocket.send("hello");
            });
        }*/


        let spinnerTimout = window.setTimeout( () => {
                document.body.innerHTML += '<div id="viewer_loader" class="loader-container-live-preview" >  <div class="loader"><img src="static/spinner.svg">  </div>  </div> ';
                window.clearTimeout(spinnerTimout);
                spinnerTimout = null;
        }, 500);

        let loadProjectRequest = new XMLHttpRequest();
        loadProjectRequest.open("GET", "/proxy/project.json?document="+ Antetype.serverDocumentName);
        loadProjectRequest.responseType = "json";
        loadProjectRequest.onreadystatechange = function () {
              if(loadProjectRequest.readyState === XMLHttpRequest.DONE && loadProjectRequest.status === 200) {
                    let json = loadProjectRequest.response; // JSON.parse(loadProjectRequest.response);
                    Antetype.project = new GDProject(json, null);
                    Antetype.project.at = Antetype;



                    let loadScreenRequest = new XMLHttpRequest();
                    loadScreenRequest.open("GET", "/proxy/fetchobject?document=" + Antetype.serverDocumentName + "&entity=GDFigure&id="+document.body.id);
                    loadScreenRequest.responseType = "json";
                    loadScreenRequest.onreadystatechange = function () {
                          if (loadScreenRequest.readyState === XMLHttpRequest.DONE && loadScreenRequest.status === 200) {
                                let json = loadScreenRequest.response;// JSON.parse(loadScreenRequest.response);
                                let screen = GDModelObject.fromJSONObjectInProject(json, Antetype.project);
                                Antetype.currentScreen = screen;
                                Antetype.connectObjects();
                                Antetype.currentTool.screenDidChange(Antetype.currentScreen);

                                if (spinnerTimout) {
                                    window.clearTimeout(spinnerTimout);
                                    spinnerTimout = null;
                                }

                                let spinnerContainer = document.getElementById("viewer_loader");
                                if (spinnerContainer) {
                                    spinnerContainer.parentNode.removeChild(spinnerContainer);
                                }

                           }
                    };
                    loadScreenRequest.send();
               }
        };
        loadProjectRequest.send();




    }
}

}



window.addEventListener("load", init, false);
