import { AlignmentLine } from './viewer.js';
import { GDModelObject, GDState,  GDVectorCellType, GDMouseClickEventType, CPColor } from './model.js';
import { sizeHighlightCell, globalBoundsOfElement } from './utils.js';


export function addCommands(antetype) {
    
    antetype.registerCommand("changeScreen", function(json,at) {   
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
    antetype.registerCommand("changeScreenSynchronous", function(json,at) {
        at.changeScreenFromJSON(json);
    });
    
    
    antetype.registerCommand("addCell", function(json,at) {
        const index = json["index"];
        const containerID = json["container"];
        const cellJSON = json["cell"];
        const cell = GDModelObject.fromJSONObjectInProject(cellJSON, antetype.project);
        const containerNode = document.getElementById(containerID) || at.screenElement;
        const containerFigure = containerNode.figure;


        at.cellInsertComponent(containerFigure, cell, index);

        //at.updateTriangleCell(cell, cell.activeStateIdentifier);
    });
    
    
    antetype.registerCommand("removeCell", function(json) {
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
    antetype.registerCommand("addWidget", function(json, at) {
        var widget = GDModelObject.fromJSONObjectInProject(json["widget"], at.project);
        at.project.addWidget(widget);
        
        var lookNodes = json["lookNodes"];
        
        for(var i = 0; i < lookNodes.length; i++) {
            var currentLookNode = lookNodes[i];
            at.project.currentLookAndFeel.updateLookNode(currentLookNode["definitionIdentifier"], currentLookNode["definitionDictionary"], at);
        }
    });
    
    antetype.registerCommand("removeWidget", function(json, at)  {
        const widget = at.project.widgetWithIdentifier(json["widgetIdentifier"]);
        at.project.removeWidget(widget);
    });
    
    
    antetype.registerCommand("addState", function(json, at) {
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
    
    });
    
    antetype.registerCommand("updateStateProperties", function(json,at) {
        var state = at.project.stateWithIdentifier(json["state"]);
    
        var lookNodes = json["lookNodes"];
        for (var i=0; i<lookNodes.length; i++) {
            var l =  lookNodes[i];
            var definition = l["definition"];
            var stateIdentifier = state.identifier;
            at.project.currentLookAndFeel.addStateLookNode(definition, stateIdentifier, l["lookNode"], at);
        }
    });
    
    antetype.registerCommand("deleteStates", function(json, at) {
        const stateIdentifiers = json["stateIdentifiers"];
        let states = [];
        for (let i=0; i<stateIdentifiers.length; i++) {
            const state = at.project.stateWithIdentifier(stateIdentifiers[i]);
            states.push(state);
        }
        at.project.deleteStates(states);
    });
    
    antetype.registerCommand("updateStateAnimation", function(json, at) {
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
    
    
    antetype.registerCommand("gotoScreenWithTransition", function(json, at) {
        const screenId = json["screenID"];
        const duration = json["duration"];
        const transition = json["transition"];
    
        at.gotoScreenWithIDEditModeWithTransition(screenId, transition, duration); 
    });
    
    antetype.registerCommand("rebuildRenderObjects", function(json, at) {
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
    
    
    
    antetype.registerCommand("gotoScreenWithId", function(json, at) {
        const screenObjectID = json["screenID"];
        const cachedScreen = at.cachedScreenWithObjectID(screenObjectID);
        if (cachedScreen) {
            at.gotoScreen(cachedScreen);
        } else {
            let request = new XMLHttpRequest();
            request.open("GET", "/proxy/fetchobject?document=" + at.serverDocumentName + "&entity=GDFigure&id="+screenObjectID);
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
        }
    
    });
    
    antetype.registerCommand("deleteCachedScreen", function(json, at) {
        const screenID = json["screenID"];
        at.deleteCachedScreenWithObjectID(screenID);
    });
    
    antetype.registerCommand("startCommandRecording", function(json, at) {
        at.recordCommands = true;
    });
    
    antetype.registerCommand("stopCommandRecording", function(json, at) {
        at.recordCommands = false;
    });
    
    
    antetype.registerCommand("rebuildRenderObjectsForFigures", function(json, at) {
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
            const oldDomElement = at.getElementById(figureId);
    
            if (oldDomElement != null ) {
                const oldFigure = oldDomElement.figure;
                oldFigure.cleanupStyles();
            }
        });
    
        // build new DOM/CSS and replace the old ones: 
        newFigures.forEach( newFigure => {
            const figureId = newFigure.objectID;
            const oldDomElement = at.getElementById(figureId);
    
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
    
    
    antetype.registerCommand("moveFigures", function(json, at) {
        const index = json["index"];
        const figureIDs = json["figures"];
    
        const container = at.getElementById(json["container"]).figure;
        let figures = figureIDs.map( i => at.getElementById(i).figure );
    
        at.moveFigures(figures, container, index);
    });
    
    
    antetype.registerCommand("changeProperty", function(json,at) {
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
    
    antetype.registerCommand("changeCustomCSS", function(json,at) {
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
    
    antetype.registerCommand("changeEmbedHTML", function(json,at) {
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
    
    
    
    antetype.registerCommand("updateLookAndFeelProperty", function(json, at) {
        var name = json["name"];
        var definitionIdentifier = json["definition"];
        var value = json["value"];
        var state = json["state"];
        at.project.currentLookAndFeel.setValueForKey(value, name, definitionIdentifier, state);
    });
    
    
    antetype.registerCommand("updateResource", function(json, at) {
        var resource = GDModelObject.fromJSONObjectInProject(json["resource"], at.project);
        at.project.resources[resource.identifier] = resource;
    }); 
    
    antetype.registerCommand("removeResource", function(json, at) {
        const identifier = json["identifier"];
        const resource = at.project.resources[identifier];
        at.project.removeResource(resource);
    });
    
    antetype.registerCommand("updateCellInteractions", function(json, at) {
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
    
    antetype.registerCommand("changeTool", function(json, at) {
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
    
    antetype.registerCommand("didEnterInplacePresentationMode", function(_json, at) {
        if (!at.runsInAntetype) {
            return; // live-preview is always in presentation mode
        }
    
        at.currentTool.startPresentationMode();
    
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
    
    antetype.registerCommand("willExitInplacePresentationMode", function(_json, at) {
        if (!at.runsInAntetype) {
            return; // live-preview is always in presentation mode
        }
    
        // remove the visited screens from the cache:
        at.currentTool.stopPresentationMode();
    });
    
    antetype.registerCommand("changeState", function(json, at) {
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
    
    
    
    antetype.registerCommand("selectionDidChange", function(json, at) {
        var ids = json;
        var selection = [];
        for (var i=0; i<ids.length; i++) {
            var nextId = ids[i];
            var domElement = document.getElementById(nextId);
            if (domElement) {
                var figure = domElement.figure;
                if (figure) {
                    selection.push(figure);
                }
            }
        }
        at.selectFigures(selection);
    });
    
    
    antetype.registerCommand("editTextOfFigure", function(json, at) {
        if (!at.runsInAntetype)
            return;
        const webID =  json["webID"];
        const element = document.getElementById(webID);
        if (element && element.figure != undefined) {
            const figure = element.figure;
            at.editTextOfFigure(figure);
        }
    });
    
    antetype.registerCommand("editVectorOfFigure", function(json, at) {
        if (!at.runsInAntetype)
            return;
        var webID =  json["webID"];
        const element = document.getElementById(webID);
        if (element && element.figure != undefined) {
            const figure = element.figure;
            at.editVectorOfFigure(figure);
        }
    });
    
    antetype.registerCommand("updateHandles", function(json, at) {
        at.updateHandles();
    });
    
    antetype.registerCommand("hideHandles", function(json, at) {
        at.hideHandles();
    });
    
    antetype.registerCommand("showHandles", function(json, at) {
        at.showHandles();
    });
        
    
    antetype.registerCommand("updateGuides", function(json, at) {
        var lines = [];
        for (var i=0; i<json.length; i++) {
            var lineJSON = json[i];
            var line = new AlignmentLine(lineJSON);
            lines.push(line);
        }
        at.updateGuideLines(lines);
    });
    
    
    antetype.registerCommand("updateLiveLayouterPlaceholder", function(json, at) {
        var placeHolder = json["placeHolder"];
        at.insertPlaceholder(placeHolder["containerID"], placeHolder["index"], placeHolder["startSize"], placeHolder["endSize"]);
    });
    
    
    antetype.registerCommand("removePlaceholder", function(json, at) {
        at.removePlaceholder();
    });
    
    antetype.registerCommand("setPossibleTargetRect", function(json, at) {
        var x = json["x"];
        var y = json["y"];
        var w = json["width"];
        var h = json["height"];
        at.setPossibleTargetRect(x,y,w,h);
    });
    
    antetype.registerCommand("addDesignBreakPoint", function(json, at) {
        var breakPoint = GDModelObject.fromJSONObjectInProject(json["breakPoint"], at.project);
        at.addDesignBreakPoint(breakPoint);
    });
    
    antetype.registerCommand("updateDesignBreakPoint", function(json, at) {
        var updatedBreakPoint = GDModelObject.fromJSONObjectInProject(json["breakPoint"], at.project);
        var originalBreakPoint = at.project.designBreakPointWithObjectID(updatedBreakPoint.objectID);
        at.updateDesignBreakPoint(originalBreakPoint, updatedBreakPoint.breakPointName, updatedBreakPoint.breakPointMaxWidth);
    });
    
    antetype.registerCommand("deleteDesignBreakPoint", function(json, at) {
        var name = json["breakPointName"];
        var breakPoint = at.project.designBreakPointWithName(name);
        at.deleteDesignBreakPoint(breakPoint);
    });
    
    antetype.registerCommand("removeInstancePropertyInState", function(json, at) {
        var cell = at.getElementById(json["webID"]);
        var state = at.project.stateWithIdentifier(json["state"]);
        var propertyName = json["name"];
    
        cell.figure.setValueForKeyInStateWithIdentifier(undefined, propertyName, state.identifier);
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
    
    antetype.registerCommand("finishLoadProject", function() {
        gdPostViewerMessage('finishLoadProject');
    });
    
    antetype.registerCommand("startLoadProject", function() {
        gdPostViewerMessage('startLoadProject');
    });
    
    antetype.registerCommand("changeHighlightColor", function(json,at) {
        at.highlightColor = CPColor.fromJSON(json["value"]);
    });
    
    
    
    antetype.registerCommand("updateUIColor", function(json, at) {
        let colorIdentifier = json["colorIdentifier"];
        let color = at.project.colorWithIdentifier(colorIdentifier);
        let colorValue = CPColor.fromJSON(json["colorValue"]);
        at.project.updateColor(color, colorValue);
    });
    
    antetype.registerCommand("addUIColor", function(json,at) {
        let newColor = GDModelObject.fromJSONObjectInProject(json, at.project);
        at.project.currentLookAndFeel.addColor(newColor);
    });
    
    antetype.registerCommand("removeUIColor", function(json, at) {
        let colorIdentifier = json["colorIdentifier"];
        let color = at.project.colorWithIdentifier(colorIdentifier);
        at.project.currentLookAndFeel.deleteColor(color);
    });
    
    antetype.registerCommand("useNativeMouseHandling", function(json, at) {
        let flag = json["value"];
        at.nativeMouseSelection = flag;
    });

    let highlightDivs;
    let highlightTimeoutID;
    antetype.registerCommand("highlightCells", function(json, at) {
        if (highlightDivs) {
            highlightDivs.forEach( d => d.remove());
        }
        if (highlightTimeoutID) {
            window.clearTimeout(highlightTimeoutID);
        }

        highlightDivs = [];

        const cellIDs = json["cells"];
    
        cellIDs.forEach( cellID => {
            const cellElement = at.getElementById(cellID);
            if (cellElement && cellElement.figure) { 
                const cell = cellElement.figure;
                let element = document.createElement("div");
                element.className = "rubberbandrect";
                document.body.appendChild(element);
                highlightDivs.push(element);
                let b = globalBoundsOfElement(cell.DOMElement);
                sizeHighlightCell(element, b);
            }
        });

        highlightTimeoutID = window.setTimeout(() => highlightDivs.forEach( d => d.remove() ), 3000);
    }); 

    antetype.registerCommand("removeHighlightCells", function(json,at) {
        if (highlightTimeoutID) {
            window.clearTimeout(highlightTimeoutID);
        }

        if (highlightDivs) {
            highlightDivs.forEach( d => d.remove());
        }

        highlightDivs = [];
    });
}

