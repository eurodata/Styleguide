import { websocket } from './communication.js';
import { GDCellDragHandler, GDDragHandler, GDRubberbandDragHandler } from './drag-handler.js';
import { handlesForCell } from './handlesforcell.js';
import { CPColor, GDScreen, GDLookAndFeel, GDModelObject, GDMouseClickEventType, GDProject, GDTriangleCellType, GDVectorCellType } from './model.js';
import { GDEditModeScreenAnimator, GDScreenAnimator } from './screen-animator.js';
import { cssClassName, cssClassNameForCell, GDCSSGenerator, removeTextSpan } from './styling.js';
import { GDFigureDragTool, GDHandleDragTool, GDInplaceRunTool, GDNativeSelectionTool, GDRunTool, GDSelectionRectTool, GDSelectionTool, GDTextTool, GDVectorTool } from './tools.js';
import { currentContainerStateIdentifier, globalBoundsOfElement, sizeHighlightCell } from './utils.js';





export function AlignmentLine(json) {
    this.start = json["start"];
    this.end = json["end"];
    this.color = new CPColor(json["color"]);
}

AlignmentLine.prototype.domElement = function() {
    var e = document.createElement("div");
    var horizontal = this.start.y == this.end.y;

    e.style.position = "absolute";
    e.style.pointerEvents = "none";
    e.style.top = this.start.y + "px";
    e.style.left = this.start.x + "px";
    if (horizontal) {
        e.style.borderTop = "1px dotted " + this.color.toString();
        e.style.width = this.end.x - this.start.x + "px";
        e.style.height = "2px";
    } else {
        e.style.borderLeft= "1px dotted " + this.color.toString();
        e.style.height= this.end.y - this.start.y + "px";
        e.style.width = "2px";
    }
    return e;

}


function positionHandle(handle) {
    var ownerRect = globalBoundsOfElement(handle.owner); //handle.owner.getBoundingClientRect(); 

    var p = {};
    
    var keyPath = handle.atHandle.keyPath();
    var delta = 3; 

    switch (keyPath) {
        case "topLeft": p = {x: ownerRect.left - delta, y: ownerRect.top - delta}; break;
        case "topCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top - delta}; break;
        case "topRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top - delta}; break;
        case "rightCenter": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break;
        case "bottomRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height - delta}; break;
        case "bottomCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top + ownerRect.height - delta} ; break;
        case "bottomLeft": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height - delta}; break;
        case "leftCenter": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break; 
    }

    handle.style.left = p.x + "px";
    handle.style.top = p.y + "px";
}

function handleCursor(keyPath) {
    switch (keyPath) {
        case "topLeft": 
        case "bottomRight": return "nwse-resize"; 
        case "topCenter": 
        case "bottomCenter": return "ns-resize"; 
        case "rightCenter": 
        case "leftCenter": return "ew-resize"; 
        case "bottomLeft":
        case "topRight": return "nesw-resize"; 
    }

    return "pointer";
}



// mmmhm, this one updates the position of the highlight-divs, will have to see
// if there is a better way (5% CPU for Antetype doing nothing o_O ) 
function selectionUpdater() {
    if (window.Antetype == undefined) 
        return;
    Antetype._highlightDivs.forEach(function(highlight) {
        var rect = globalBoundsOfElement(highlight.figure.DOMElement);
        sizeHighlightCell(highlight, rect);
    });

    if (Antetype.handles) {
        Antetype.handles.forEach( h => h.positionElement() );
    }
    Antetype.handleElements.forEach(function(handle) {
        positionHandle(handle);
    });

    if (Antetype._highlightDivs.length > 0) {
        window.requestAnimationFrame(selectionUpdater);
    }
}
export let Antetype = null;

/**
 * top-level object for the whole in-browser antetype. 
 */
export class AntetypeWeb {
    /**
     * builds a new AntetypeWeb-object
     * @param {HTMLElement} screenElement the element which will be used for rendering the screen, optional if not used: `<body>` is used
     */
    constructor(screenElement) {
        this.commands = [];
        this.converters = {};
        this.screenElement = screenElement; 
        if (!this.screenElement) {
            this.screenElement = document.createElement("div");
            document.body.appendChild(this.screenElement);
        }
        this.selectionTool = new GDSelectionTool(this);

        if (this.runsInAntetype)
            this.runTool = new GDInplaceRunTool(this);
        else 
            this.runTool = new GDRunTool(this);

        this.textTool = new GDTextTool(this);
        this.vectorTool = new GDVectorTool(this);
        this.figureDragTool = new GDFigureDragTool(this);
        this.handleDragTool = new GDHandleDragTool(this);
        this.selectionRectTool = new GDSelectionRectTool(this);
        this.setCurrentTool(this.runsInAntetype ? this.selectionTool : this.runTool );
        this._nativeMouseSelection = false;
        this._highlightDivs = [];
        this._selectedObjects = [];         // like GDSelectionController selectedObjects
        this.handleElements = []; 
        this.handles = [];
        this.guides = [];

        this._listeners = {};
        this.addEventListeners();

        this.addFundamentalCommands();

        this._project = null; 
        this._currentScreen = null;

        // called on screenchange: 
        this.onScreenChange = null;

        // debugging: 
        this.commandsLog = [];
        this.recordCommands = false;

        this._currentDragHandler = null;
        this._dragHandlers = [new GDRubberbandDragHandler(this), new GDDragHandler(this) ];

        this._showHandles = true;
        this.placeHolder = null;

        this._targetRectDiv = null;
        this._possibleTargetRect = null;

        this._asyncCommandExecuting = false;
        this._asyncCommandQueue = [];
        this._asyncTimoutID = null;

        this._fontStyleSheet = null;
        this._usedFonts = {};

        this.highlightColor = null;

        this._cssGenerator = new GDCSSGenerator();

        this._cachedScreens = new Map();

        Object.seal(this);
    }

    /**
        the current visible Screen 
        @returns {GDScreen}
    */
    get currentScreen() {
        return this._currentScreen;
    }

    /**
     * sets the current screen
     * @param {GDScreen} s the new screen
     */
    set currentScreen(s) {
        this._currentScreen = s;
        if (this.onScreenChange != null)
            this.onScreenChange();
    }

    /**
        the project of this prototype. {@link GDProject}
        @returns {GDProject}
    */
    get project() {
        return this._project;
    }

    set project(p) {
        this._project = p;
    }

    get nativeMouseSelection() {
        return this._nativeMouseSelection;
    }

    set nativeMouseSelection(useNative) {
        this._nativeMouseSelection = useNative;
        const usesSelectionTool = this.currentTool == this.selectionTool;
        if (useNative) {
            this.selectionTool = new GDNativeSelectionTool(this);
            this._dragHandlers.unshift(new GDCellDragHandler(this));
        } else {
            this.selectionTool = new GDSelectionTool(this);
        }
        if (usesSelectionTool) {
            this.currentTool = this.selectionTool;
        }
    }

    get serverDocumentName() {
        return location.href.split("/")[3]; //FIXME
    }

    loadProjectFromJSON(json) {
        this._project = new GDProject(json, null);
        this.project.at = this;
        this.buildStyleSheet(); 
    }

    changeScreenFromJSON(json) {
        const screen = GDModelObject.fromJSONObjectInProject(json, this.project);
        this.currentScreen = screen;
        this.rebuildRenderObjects(screen);
    }

    /**
     *  Normally our CSS-generation is divided into widget- and instance-css. 
     *  But unfortunately sometimes we need to know the container to generate
     *  the right css. For root-instance-cells the container is not known on 
     *  creation, only when the instance is inserted in the screen. (or a state
     *  change). 
     *
     *  FIXME: 
     *      *   currently this method is called on numerous places after changing
     *          the hierarchy, can we make it automatic? 
     *      *   tests are missing
     *
     */
    executeFinalWidgetLayoutPass(figure) {
        const containerState = currentContainerStateIdentifier(figure, figure.activeStateIdentifier);
        this._cssGenerator.executeFinalWidgetLayoutPass(figure, containerState);
    }

    updateTriangleCell(figure, stateIdentifier) {
        if(figure.valueForKeyInStateWithIdentifier("cellType", stateIdentifier) == GDTriangleCellType) {
            // trigger display properties method
            if (stateIdentifier != undefined) {
                var state = this.project.stateWithIdentifier(stateIdentifier);
               this.cellSetPropertyInState(figure, "rotationAngle", figure.valueForKeyInStateWithIdentifier("rotationAngle", stateIdentifier), state);
            } else {
                this.cellSetProperty(figure, "rotationAngle", figure.valueForKeyInStateWithIdentifier("rotationAngle", stateIdentifier));
            }
        }
    }

    updateVectorCell(cell) {
        if(cell.firstChild.nodeName.toLowerCase() == 'svg') {
            const svg = cell.figure.svgInStateWithIdentifier(cell.figure.activeStateIdentifier);
            const xmlParser = new DOMParser();
            const svgObject = xmlParser.parseFromString(svg, "text/xml");
            this.replaceCanvasOrSVGWithSVG(cell, svgObject.rootElement);
        }
        else if(cell.firstChild.nodeName.toLowerCase() == 'canvas') {
            this.vectorTool.updateVectorCellContent();
        }
    }

    addFundamentalCommands() {
        this.registerCommand("macro", function(json, at) {
            var commands = json["commands"];
            for (var i=0; i<commands.length; i++) {
                var c = commands[i];
                at.runCommand(c);
            }
        });

        // for testing, synchronous variant of "loadProject"
        this.registerCommand("loadProjectSynchronous", function(json, at) {
            at.loadProjectFromJSON(json);
        });


        
        this.registerCommand("loadProject", function(json, at) {
            let request = new XMLHttpRequest();
            request.open("GET", "/proxy/object-with-id?document="+ at.serverDocumentName + "&id=" + json);
            request.onreadystatechange = function () {
                  if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        let json = JSON.parse(request.response);
                        at.loadProjectFromJSON(json);
                        at.asyncCommandExecuting = false;
                   }
            };
            at.asyncCommandExecuting = true;
            request.send();
        });

        this.registerCommand("loadLibrary", function(json, at) {
            at._currentLookAndFeel = new GDLookAndFeel(json["lookAndFeel"], at.project);
            at.buildStyleSheet(); 
            var resourcesJSON = json["resources"];
            var resources = {};
            for (var i=0; i<resourcesJSON.length; i++) {
                var resourceJSON = resourcesJSON[i];
                var resource = GDModelObject.fromJSONObjectInProject(resourceJSON, at.project);
                resources[resource.identifier] = resource;
            }
            at.project.resources = resources;
        });
    }  

    buildStyleSheet() {
        const defaultStyleSheetElement = document.createElement("style");
        document.head.appendChild(defaultStyleSheetElement);
        const defaultStyleSheet = defaultStyleSheetElement.sheet;

        const breakPointStyleSheetElement = document.createElement("style");
        document.head.appendChild(breakPointStyleSheetElement);
        const breakPointStyleSheet = breakPointStyleSheetElement.sheet;

        const fontStyleSheetElement = document.createElement("style");
        document.head.appendChild(fontStyleSheetElement);
        this._fontStyleSheet = fontStyleSheetElement.sheet;

        const lookAndFeel = this.project.currentLookAndFeel;
        lookAndFeel.populateCSS(defaultStyleSheet, breakPointStyleSheet, this);
    }


    addUsedFont(font) {
        if (this._usedFonts[font.fontName] != undefined)
            return;

        if (font.fontCSS != undefined && font.fontCSS != "") {
            this._fontStyleSheet.insertRule(font.fontCSS,0);
        }
        this._usedFonts[font.fontName] = font;
    }


    /**
        here we add "Global" eventListeners which mainly forward to the current tool. 
        For Interaction we have to handle some events differently (which don't bubble, 
        up). Those are added in GDEventHandler.updateEventListeners

        {@link GDEventHandler#updateEventListeners}
    */
    addEventListeners() {
        var at = this;
        
        at._mouseDown = false; 
        var container = document;
        container.addEventListener("click", function(e) {
            at.currentTool.mouseClick(e);
        }, false);
        container.addEventListener("dblclick", function(e) {
            at.currentTool.mouseDoubleClick(e);
        }, false);
        container.addEventListener("mousedown", function(e) {
            if (e.button == 0) { // right click to show web inspector in at, FIXME, we need to handle those too
                at._mouseDown = true;
            }
            at.currentTool.mouseDown(e);
        }, false);
        container.addEventListener("mouseup", function(e) {
            at._mouseDown = false;
            at.currentTool.mouseUp(e);
        }, false);
        container.addEventListener("mousemove", function(e) {
            if (at._mouseDown) {
                at.currentTool.mouseDragged(e);
            } else {
                at.currentTool.mouseMove(e);
            }
        }, false);


        container.addEventListener("contextmenu", function(e) {
            at.currentTool.contextMenu(e);
        }, false);
        window.addEventListener("keydown", function(e) {
            at.currentTool.keyDown(e);
            e.stopImmediatePropagation();
        }, false);
        window.addEventListener("keypress", function(e) {
            at.currentTool.keyPress(e);
        }, false);

        window.addEventListener("keyup", function(e) {
            at.currentTool.keyUp(e);
            e.stopImmediatePropagation();
        }, false);


        // drag-and-drop. Unfortunately the API looks similar to the AppKit-API, but as always
        // the devil is in the details. 
        document.addEventListener("dragenter", function(e) {
            if (!at._currentDragHandler) {
                at._currentDragHandler = at._dragHandlers.find( d => d.possibleDragOperations(e) != GDDragHandler.NSDragOperationNone);
            }
            if (at._currentDragHandler) {
                at._currentDragHandler.dragEnter(e);
            }
            at.log("dragenter: " + JSON.stringify(e));
        }, false);
        document.addEventListener("dragover", function(e) {
            if (at._currentDragHandler) {
                at._currentDragHandler.dragOver(e); 
            }
            at.log("dragover: " + JSON.stringify(e));
        }, false);

        document.addEventListener("dragleave", function(e) {
            if (at._currentDragHandler) {
                at._currentDragHandler.dragLeave(e); 
            }
            at.log("dragleave: " + JSON.stringify(e));
        }, false);


        document.addEventListener("dragexit", function(e) {
            if (at._currentDragHandler) {
                at._currentDragHandler.dragExit(e); 
            }
            at.log("dragexit: " + JSON.stringify(e));
        }, false);

        document.addEventListener("drop", function(e) {
            if (at._currentDragHandler) {
                at._currentDragHandler.drop(e);
                at._currentDragHandler = null;
            }
            at.log("drop: " + JSON.stringify(e));
        }, false);

        container.addEventListener("touchstart", e => at.currentTool.touchStart(e)); 
        container.addEventListener("touchend", e => at.currentTool.touchEnd(e)); 
        container.addEventListener("touchenter", e => at.currentTool.touchEnter(e)); 
        container.addEventListener("touchleave", e => at.currentTool.touchLeave(e)); 
        container.addEventListener("touchmove", e => at.currentTool.touchMove(e)); 

        this.addEventListener("loadscreen", () => this.currentTool.screenDidChange(this.currentScreen) );
        this.addEventListener("unloadscreen", () => this.currentTool.screenWillChange() );
    }

    /**
        if the prototype is running inside Antetype (true)  or in the browser (false)
    */
    get runsInAntetype() {
        return window.navigator.userAgent.indexOf("Antetype") != -1;
    }


    getElementById(webID) {
        let e = document.getElementById(webID);
        if (e) return e;

        for (let [ , screen] of this._cachedScreens) {
            let e = screen.DOMElement.querySelector(`#${webID}`);

            if (e) return e;
        }

        return null;
    }

    get screenElement() {
        return this._screenElement;
    }

    set screenElement(c) {
        this._screenElement = c;
    }

    /**
        go to the next screen in the protoype. (jumps to the first if, the current screen is the last screen)

         Currently only usable in the exported WebViewer
    */
    gotoNextScreen() {
        var index = this.project.orderedScreens.indexOf(this.currentScreen);
        index++;
        if (index >= this.project.orderedScreens.length) {
            index = 0;
        }

        this.gotoScreen(this.project.orderedScreens[index]);
    }

    /**
        go to the previous screen in the protoype. (jumps to the last one, 
         if the current screen is the first screen)

         Currently only usable in the exported WebViewer
    */
    gotoPreviousScreen() {
        var index = this.project.orderedScreens.indexOf(this.currentScreen);
        index--;
        if (index < 0) {
            index = this.project.orderedScreens.length-1;
        }

        this.gotoScreen(this.project.orderedScreens[index]);
    }

    /**
        display the screen with the given index. 
    */
    gotoScreenWithIndex(i) {
        var screen = this.project.orderedScreens[i];
        this.gotoScreen(screen);
    }

    /**
        Displays the given Screen 's'. 
        @param {GDScreen} s
    */
    gotoScreen(s) {
        this.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});
        if (s.DOMElement == undefined) {
            s.createStyleSheets();
            s.DOMElement = this.buildDOMForCell(s);
        } 

        // mmmhmm, sometimes the spinner is visible, before showing the screen
        // remove it:
        const loaderContainer = s.DOMElement.querySelector("#loader-container");
        if (loaderContainer) {
            loaderContainer.remove();
        }

        if (this.screenElement.parentNode) {
            s.insertStyleSheets();
            this.screenElement.parentNode.replaceChild(s.DOMElement, this.screenElement);
        }
        this.screenElement = s.DOMElement;
        this.currentScreen = s;
        this.executeFinalWidgetLayoutPass(s);
        this.dispatchEvent({type: 'loadscreen', defaultPrevented: false});
    }


    /**
        like gotoScreen, but using a transition. 

        @param {GDScreen} screen
        @param {int} transition
        @param {float} duration (in seconds)
    */
    gotoScreenWithTransition(screen, transition, duration) {
        const animator = new GDScreenAnimator(this, transition, duration);
        animator.gotoScreenWithTransition(screen);
    }

    gotoScreenWithIDEditMode(i) {
        this.send("gotoScreenWithID/" + i);
    }

    gotoScreenWithIDEditModeWithTransition(i, transition, duration) {
        const animator = new GDEditModeScreenAnimator(this, transition, duration);
        animator.gotoScreenWithID(i);
    }
    get screenNames() {
        return this.project.orderedScreens.map(function(s) { return s.name; });
    }

    get currentScreenIndex() {
        return this.project.orderedScreens.indexOf(this.currentScreen);
    }

    setCurrentTool(newTool) {
        // Start RunTool/SelectionTool Toggle
        if(this.currentTool != undefined) {
            if(this.handleElements == undefined) {
                this.handleElements = [];
            }

            if(this._highlightDivs == undefined) {
                this._highlightDivs= [];
            }
        
            if (newTool.isRunTool()) {
                this.hideHandles();
                this.selectFigures([]);
            } else if(this.currentTool.isRunTool() && !newTool.isRunTool()) {
                this.showHandles();
            }
        }
        // End RunTool/SelectionTool Toggle

        if (newTool == this.currentTool)  {
            return;
        }

        if (this.currentTool)  {
            this.currentTool.deactivate();
        }

        this.currentTool = newTool;
        newTool.activate();
    }

    registerCommand(name, f) {
       this.commands[name] = f;
    }

    /**
        true if async-commands are in the queue. 
    */
    get asyncCommandExecuting() {
        return this._asyncCommandExecuting;
    }

    /**
        starts or ends async command-processing. If true commands executed with runCommand are 
        stored in a queue and executed after calling asyncCommandExecuting = false. 
    */
    set asyncCommandExecuting(asyncFlag) {
        this._asyncCommandExecuting = asyncFlag;
        if (asyncFlag) {
            if (this._asyncTimoutID == null) {
                this._asyncTimoutID = window.setTimeout(() => { 
                    const loaderDiv = document.createElement("div");
                    loaderDiv.id = 'loader-container';
                    loaderDiv.className = 'loader-container';
                    loaderDiv.innerHTML = '<div class="loader"><img src="static/spinner.svg">  </div> ';
                    document.body.appendChild(loaderDiv);

                    window.clearTimeout(this._asyncTimoutID);
                    this._asyncTimoutID = null;
                }, 500);
            }
        } else {
            const loaderContainer = document.getElementById("loader-container");
            if (loaderContainer) {
                loaderContainer.remove();
            }
            var count = 0;
            for(var i = 0; i < this._asyncCommandQueue.length; i++) {
                const json = this._asyncCommandQueue[i];
                this._runCommand(json);
                count++;
                if(this._asyncCommandExecuting) {
                    break;
                }
            }
            this._asyncCommandQueue.splice(0, count);
            count = 0;

            if (this._asyncTimoutID) {
                window.clearTimeout(this._asyncTimoutID);
                this._asyncTimoutID = null;
            }
        }     
    }

    /**
        runs a command send from Antetype. Commands are registered using registerCommand
    */
    runCommand(json) {
        if (!this.asyncCommandExecuting) {
            this._runCommand(json);
            return;
        }

        this._asyncCommandQueue.push(json);
    }
    
    _runCommand(json) {
        var name = json["command"];
        var f = this.commands[name];
        if (f === undefined)  {
            throw "no command '" + name + "' defined!";
        }
        var parameters = json["parameters"];
        this.log("command: " + name);

        if (this.recordCommands) {
            this.commandsLog.push(json);
        }
        f(parameters, this);
    }

    editTextOfFigure(f) {
        if (f.isScreen) {
            return;
        }
        this.setCurrentTool(this.textTool);
        this.textTool.editTextOfFigure(f);
    }

    editVectorOfFigure(f) {
        if (f.isScreen) {
            return;
        }
        this.setCurrentTool(this.vectorTool);
        this.vectorTool.editVectorOfFigure(f);
    }

    restoreSelectionTool() {
        this.setCurrentTool(this.selectionTool);
    }

    startDrag(e) {
        this.setCurrentTool(this.figureDragTool);
        this.currentTool.startDrag(e);
    }

    hideHandlesTemporarily() {
        this._highlightDivs.forEach(h => h.style.display = "none");
        this.handleElements.forEach(h => h.style.display = "none");
    }

    showHandlesTemporarily() {
        this._highlightDivs.forEach(h => h.style.display = "block");
        this.handleElements.forEach(h => h.style.display = "block");
    }


    showHandles() {
        this._showHandles = true;
        this.updateHandles();
        this.updateHighlightDivs();
    }

    hideHandles() {
        this._showHandles = false;
        for (var i=0; i<this.handleElements.length; i++) {
            var h = this.handleElements[i];
            h.parentElement.removeChild(h);
        }
        this.handleElements = [];

        this._highlightDivs.forEach(function(h) {h.style.display = "none"});
    }

    handleFromATHandle(atHandle) {
        var handle = document.createElement("div");
        handle.className = "handle";
        handle.atHandle = atHandle;
        var owner = this.getElementById(atHandle.ownerWebID());
        handle.owner = owner;
        handle.style.cursor = handleCursor(atHandle.keyPath());
        positionHandle(handle);
        return handle;
    }

    updateHandles() {
        if (this.nativeMouseSelection) return;
        for (let i=0; i<this.handleElements.length; i++) {
            var h = this.handleElements[i];
            if(h.parentElement != null) {
                h.parentElement.removeChild(h);
            }

        }
        this.handleElements = [];

        if (!this._showHandles) {
            return;
        }
        if (window.workingAreaView) {
            if (this.selectedObjects.length > 1) 
                return;

            var atHandles = window.workingAreaView.screenChangeManager().handles();
            for (let i=0; i<atHandles.length; i++) {
                var atHandle = atHandles[i];
                if (atHandle.isActive()) {
                    var handle = this.handleFromATHandle(atHandle);
                    document.body.appendChild(handle);
                    this.handleElements.push(handle);
                     
                }
            }
        }
    }

    updateHighlightDivs() {
        if(this._highlightDivs != undefined) {
            for (let i=0; i<this._highlightDivs.length; i++) {
                let h = this._highlightDivs[i];
                if(h.parentElement != null) {
                    h.parentElement.removeChild(h);
                }
            }
        }

        this._highlightDivs = [];

        if (!this._showHandles) {
            return;
        }

        
        if (!this.runsInAntetype) {  // only in AT
            return;
        }

        for (let i=0; i<this._selectedObjects.length; i++) {
            const figure = this._selectedObjects[i];
            if (figure.isScreen) {
                return;
            }

            const r = globalBoundsOfElement(figure.DOMElement); 
            const highlight = document.createElement("div");
            highlight.className = "highlightrect";
            if(this.highlightColor !== null) { // Always null on High Sierra and earlier (uses css highlight color instead)
                highlight.style.borderColor = this.highlightColor.toString();
            }
            sizeHighlightCell(highlight, r);
            highlight.figure = figure;
            document.body.appendChild(highlight);
            this._highlightDivs.push(highlight);
        }

        if (this._highlightDivs.length > 0) 
            window.requestAnimationFrame(selectionUpdater);
    }

    handlesForSelectiion() {
        if (!this.nativeMouseSelection) {
            return [];
        }

        if (this.selectedFigures.length != 1) {
            return [];
        }
        const cell = this.selectedFigures[0];

        return handlesForCell(cell);
    }

    selectFigures(figures) {
        this.handles.forEach( h => h.remove() );
        this._selectedObjects = figures;
        if (this.currentTool.isRunTool()) {
            return;
        }
        this.updateHighlightDivs();

        this.handles = this.handlesForSelectiion();
        this.handles.forEach( h => {
            let element = h.createElement();
            this.screenElement.appendChild(element);
            //document.body.appendChild(element);
            h.positionElement();
        }); 
    }

    updateGuideLines(lines) {
        for (let i=0; i<this.guides.length; i++) {
            var h = this.guides[i];
            h.parentElement.removeChild(h);
        }
        this.guides= [];

        for (let i=0; i<lines.length; i++) {
            var line = lines[i];
            var element = line.domElement();
            document.body.appendChild(element);
            this.guides.push(element);
        }
        
    }

    get selectedObjects() {
        return this._selectedObjects;
    }

    get selectedFigures() {
        return this.selectedObjects.filter( o => !o.isScreen);
    }

    send(o) {
        if (this.runsInAntetype && window.serverDocument != undefined) {
            var path = "/handler/0/" + o;
            window.serverDocument.handleCommandPath(path);
        } else if (typeof websocket != "undefined" && websocket.readyState == WebSocket.OPEN) {
            websocket.send(o);
        }
    }


    log(message) {
        console.log(message);

    /*    if (this.runsInAntetype && window.webViewController != undefined) {
            window.webViewController.log(message);
        }     */
    }

    // live-layout, placeholders:
    removePlaceholder() {
        if (this.placeHolder) {
            var oldPlaceHolder = this.placeHolder;
            oldPlaceHolder.style.width = "0px";
            oldPlaceHolder.style.height = "0px";
            oldPlaceHolder.addEventListener("transitionend", function() {
                if (oldPlaceHolder.parentElement) {
                    oldPlaceHolder.parentElement.removeChild(oldPlaceHolder);
                }
            });
       }
    }


    insertPlaceholder(containerID, index, startSize, endSize) {
        if (this.placeHolder) {
            var oldContainer = this.placeHolder.parentElement;
            var newContainer = document.getElementById(containerID);
            if (oldContainer == newContainer) {
                if (this.placeHolder.index < index) {
                    index = index +1;
                }
            }
        }
        this.removePlaceholder();
        

        var container = this.getElementById(containerID);

        var p = document.createElement("div");
        p.style.width = startSize.width + "px"; 
        p.style.height = startSize.height + "px";
        p.style.display= "flex";
        p.style.flex = "0 0 auto";

        if (index >= container.childNodes.length) {
            container.appendChild(p);
        } else {
            container.insertBefore(p, container.childNodes[index]); 
        }
        p.style.transition = "all 0.2s linear";
        window.setTimeout(function() {
            p.style.width = endSize.width + "px";
            p.style.height = endSize.height + "px";
        }, 1);

        this.placeHolder = p;
        this.placeHolder.index = index;
    }

    setPossibleTargetRect(x,y,w,h) {
        if (this._targetRectDiv == null) {
            this._targetRectDiv = document.createElement("div");
            this._targetRectDiv.className = "highlightrect";
            document.body.appendChild(this._targetRectDiv);

        }
        var r = {"top": y, "left": x, "width": w, "height": h};
        this._possibleTargetRect = r;
        sizeHighlightCell(this._targetRectDiv,r)
    }

    get possibleTargetRect() {
        return this._possibleTargetRect;
    }

    blinkPossibleTargetRect() {
        // TODO blink
    }
    

    moveFigures(figures, container, index) {
        figures.forEach( f => {
            f.container.removeComponent(f);
            f.DOMElement.parentElement.removeChild(f.DOMElement);

            container.insertComponent(f, index);
            const insertAtEnd = container.orderedComponents.length == 0 || index >= container.orderedComponents.length-1;
            if (insertAtEnd) {
                container.DOMElement.appendChild(f.DOMElement);
            } else {
                const nextSibling = container.orderedComponents[index+1];
                const n = nextSibling.DOMElement;
                container.DOMElement.insertBefore(f.DOMElement, n);
            }

            // #351 make sure styles are updated after move. Do we need more? 
            let figureStyle = f.cssStyleForStateIdentifier(f.activeStateIdentifier);
            const containerState = currentContainerStateIdentifier(f,f.activeStateIdentifier);
            this._cssGenerator.updateDimensionProperties(figureStyle, f, f.activeStateIdentifier, containerState);

        });
    }

    assureTextSpan(cell) {
        var domElement = cell.DOMElement;
        if (domElement.textSpan != undefined) {
            return domElement.textSpan;
        }

        var span = document.createElement("span");
        if (domElement.hasChildNodes()) {
            domElement.insertBefore(span, domElement.childNodes[0]);
        } else {
            domElement.appendChild(span);
        }
        domElement.textSpan = span;
        span.figure = cell;

        var textContentSpan = document.createElement("span");
        span.appendChild(textContentSpan);
        span.contentSpan = textContentSpan;

        this._cssGenerator.textSpanStyling(cell);


        return span;
    }


    updateText(cell) {
        var activeStateId = cell.activeStateIdentifier;
        var text = cell.valueForKeyInStateWithIdentifier("textString", activeStateId);
        var isEditable = cell.valueForKeyInStateWithIdentifier("isEditableText", activeStateId);
        if ((text == undefined || text.length == 0) && !isEditable) {
            removeTextSpan(cell);
            return;
        }
        
        var span = this.assureTextSpan(cell);
        if (this.currentTool.isRunTool()) {
            span.contentSpan.contentEditable = isEditable ? true : false;
            if (isEditable) {
                span.contentSpan.style.webkitUserSelect = "text";
                span.contentSpan.style.minWidth = "1px";
                span.contentSpan.style.cursor = "text";
                span.contentSpan.style.width = "100%";
                span.contentSpan.style.pointerEvents= "auto";
            }
        }
        span.contentSpan.innerHTML = text;
        this._cssGenerator.textSpanStyling(cell);
    }

    updateEmbedHTML(cell) {
        const html = cell.valueForKeyInStateWithIdentifier("embedHTML", cell.activeStateIdentifier);
        if (html != null) {
            if (cell.DOMElement.textSpan == undefined && cell.orderedComponents.length == 0) {
                cell.DOMElement.innerHTML= html;
            }
        }
    }


    /**
        Antetype uses a rather complex mapping from Widget/Cell/State to CSS class names. 
        If you don't have the Antetype-Cell-Object (often after cloning HTML Elements) but 
        want to change the state, you can use this method to return the proper className. 
        In all other circumstances use {@link changeStateOfCell} which makes sure the 
        Antetype-Objects and DOM-Objects are in sync. 

        @param {GDWidgetInstanceRootCell} cell the cell to use
        @param {GDState} state
        @returns {String} the class name
    */
    cssClassNameForRootCellInState(cell, state) {
        let className = cssClassName(cell.definitionIdentifier, state.identifier, this.project);
        className += " " + cell.objectID + state.cssSelector(); 
        return className;
    }


    /**
       Change the active state of the cell. 
       @param {GDWidgetInstanceCell} cell - The cell 
       @param {GDState} state - The new State
       @param {string} cssTransition - The transition used
    */
    changeStateOfCell(cell, state, cssTransition) {
        cell = cell.rootInstanceCell;
        if (cell.isBasicCell) {
            return;
        }

        if (state.isPseudoState) {
            return;
        }

        if (cell.activeStateIdentifier == state.identifier) {
            return;
        }

        cell.activeStateIdentifier = state.identifier;
        const DOMElement = cell.DOMElement;

        if (DOMElement == undefined) {
            // Issue #160 if not rendered yet don't try to change the missing DOM-elements
            return;
        }
        cell.widgetComponents.forEach((c) => {
            c.DOMElement.style.transition = cssTransition;
            this.updateText(c);
            this.updateEmbedHTML(c);
        });

        DOMElement.className = this.cssClassNameForRootCellInState(cell, state);

        // #1024, in Christinas file a state-change does not work if the active-state
        // is not the state of the breakpoint. The only difference between building
        // (where it works) and state-changing is building the cell-properties. 
        // therefor we rebuild all styles for the child-cells. 
        // This is slow, but currently I do not find a better way. (Only for documents
        // with breakpoints)
        if (this.project.designBreakPoints.length > 0) {
            cell.deepOrderedComponents.forEach( c => this.cellProperties( c.DOMElement, c) );
        } else {
            this.executeFinalWidgetLayoutPass(cell);  
        }
    }


    populateCellPropertiesInState(style, cell, stateId) {
        const containerState = currentContainerStateIdentifier(cell, stateId);
        this._cssGenerator.populateCellPropertiesInState(style, cell, stateId, containerState);

        if (this._cssGenerator.hasTextProperty(cell, stateId)) {
            this.addUsedFont(cell.valueForKeyInStateWithIdentifier("textFont", stateId));
        }
    }


    /**
     * build the instance-style-rules for the given cell. 
     *
     * (Since #752 we build styles for each state, regardless of it has overwritten
     * properties or not. Maybe we should check for :active? or does it even matter
     * performance wise?)
     *
     * @param domElement {HTMLElement} the DOM for the cell
     * @param cell {GDWidgetInstanceCell} the AT-cell 
     */
    cellProperties(domElement, cell) {
        for (let i=0; i<cell.widget.states.length; i++) {
            const state = cell.widget.states[i];
            const stateId = state.identifier; 
            const style = cell.cssStyleForStateIdentifier(stateId);
            this.populateCellPropertiesInState(style, cell, stateId); 
        }

        if (this.currentTool.isRunTool()) {
            if (cell.hasActionsOfEventType(GDMouseClickEventType)) {
                domElement.style.cursor = "pointer";
            }
        }

        // #730 we need to set the background attributes to the html-style:
        if (cell.isScreen) {
            let htmlStyle = cell.htmlCSSStyle;
            this._cssGenerator.populateScreenBackgroundPropertiesInState(htmlStyle, cell, cell.activeStateIdentifier);
        }
    }


    /**
        sets the value for the given property in cell and active state 
        This also updates the HTML/CSS. 
        @param figure {GDWidgetInstanceCell} the cell
        @param key {String} the property name (see documentation)
        @param value {Object} the value of the property
        @param state {GDState} the state, if omitted use active state
    */
    cellSetProperty(figure, key, value, state) {
        if (state == undefined) state = figure.activeState;
        this.cellSetPropertyInState(figure, key, value, state);
    }

    /**
        sets the value for the given property in cell and state. 
        This also updates the HTML/CSS. 
        @param figure {GDWidgetInstanceCell} the cell
        @param key {String} the property name (see documentation)
        @param value {Object} the value of the property
        @param state {GDState} the state
    */
    cellSetPropertyInState(figure, key, value, state) {
        const stateIdentifier = state.identifier;
        figure.setValueForKeyInStateWithIdentifier(value, key,stateIdentifier );
        const style = figure.cssStyleForStateIdentifier(stateIdentifier);
        
        if (style != undefined) { 
            // mmhm, should we throw or should we go? 
            this.updateStyleProperty(style, figure, key, stateIdentifier);
        }

        // #730 we need to set the background attributes to the html-style:
        if (figure.isScreen && this._cssGenerator.isBackgroundProperty(key)) {
            const htmlStyle = figure.htmlCSSStyle;
            this._cssGenerator.updateScreenBackgroundProperty(htmlStyle, figure, key, stateIdentifier);
        }
    }

    
    /**
     * Inserts the given cell in the container at position "index". Also handles the DOM/CSS-generation.
     * 
     * @param {GDWidgetInstenceCell} container 
     * @param {GDWidgetInstanceCell} cell 
     * @param {Number} index 
     */
    cellInsertComponent(container, cell, index) {
        const insertAtEnd = index >= container.orderedComponents.length;
        container.insertComponent(cell, index);
        cell.container = container;
        const containerNode = container.DOMElement;
        const newCellNode = this.buildDOMForCell(cell);
        if (insertAtEnd) {
            containerNode.appendChild(newCellNode);
        } else {
            const nextSibling = container.orderedComponents[index+1];
            const n = nextSibling.DOMElement;
            containerNode.insertBefore(newCellNode, n);
        }
    
        this.cellProperties(newCellNode, cell); // why do we need this the second time here?
        this.executeFinalWidgetLayoutPass(cell);
    }

    // called while building the css for the widgets. (GDLookAndFeel>>populateCSSForLookNode)
    // speedup instead of calling updateStyleProperty for all property names. 
    updateStyles(style, figure, state) {
        const containerState = currentContainerStateIdentifier(figure, state);
        this._cssGenerator.updateStyles(style, figure, state, containerState);
        this.addUsedFont(figure.valueForKeyInStateWithIdentifier("textFont", state));
    }

    updateStyleProperty(style, figure, key, state) {
        const containerState = currentContainerStateIdentifier(figure, state);
        this._cssGenerator.updateStyleProperty(style, figure, key, state, containerState);

        if (this._cssGenerator.propertyAffectsText(key, figure, state)) {
            var cellIsCell = figure.name !== undefined; //FIXME
            if (cellIsCell && state == figure.activeStateIdentifier)
                this.updateText(figure);
            this.addUsedFont(figure.valueForKeyInStateWithIdentifier("textFont", state));
        }
    }

    createScreenElement() {
        if (this.screenElement == document.body) 
            return document.createElement("body");

        return document.createElement("div");
    }

    domElementFromCell(cell) {
        const newCellNode = cell.isScreen ? this.createScreenElement() : document.createElement("cell");
        newCellNode.figure = cell;
        cell.DOMElement = newCellNode;

        newCellNode.id = cell.objectID;

        newCellNode.className = cssClassNameForCell(cell, this.project);


        this.updateText(cell);

        const cellType = cell.valueForKeyInStateWithIdentifier("cellType", cell.activeStateIdentifier);

        if(cellType == GDVectorCellType) {
            const svgContent = cell.svgInStateWithIdentifier(cell.activeStateIdentifier);
            newCellNode.innerHTML = svgContent;
        }

        cell.updateEventListeners(this);

        return newCellNode;
    }

    buildDOMForCell(cell) {
        var domElement = this.domElementFromCell(cell);
        this.cellProperties(domElement, cell);
        
        // Vector cells need an additional pass because properties like backgroundColor are set after the first path
        var cellType = cell.valueForKeyInStateWithIdentifier("cellType", cell.activeStateIdentifier);
        if(cellType == GDVectorCellType) {
            domElement = this.domElementFromCell(cell);
        }

        let embedHTML = cell.valueForKeyInStateWithIdentifier("embedHTML", cell.activeStateIdentifier);
        if (embedHTML != null) {
            if (domElement.textSpan == undefined) {
                domElement.innerHTML = embedHTML;
            }
        }

        for (var i=0; i<cell.orderedComponents.length; i++) {
            var c = cell.orderedComponents[i];
            var childDom = this.buildDOMForCell(c);
            domElement.appendChild(childDom);
        }

        return domElement;
    }


    rebuildRenderObjects(screen) {
        this.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});
        this.currentScreen.cleanupStyles();     // #606 remove old styles ... 
        screen.createStyleSheets();
        const newScreenDOMElement = this.buildDOMForCell(screen);
        
        if (this.screenElement.parentNode) {
            this.screenElement.parentElement.replaceChild(newScreenDOMElement, this.screenElement);
        }
        this.currentScreen = screen;
        this.screenElement = newScreenDOMElement;
        // This step is necessary for the correct widget layout within a container 
        this.executeFinalWidgetLayoutPass(newScreenDOMElement.figure);
        this.dispatchEvent({type: 'loadscreen', defaultPrevented: false});

        this._cachedScreens.set(screen.objectID, screen);
        this.send("restoreSelectionAfterReload");   
    }

    cachedScreenWithObjectID(objectID) {
        return this._cachedScreens.get(objectID);
    }

    deleteCachedScreenWithObjectID(objectID) {
        this._cachedScreens.delete(objectID);
    }

    replaceSVGWithCanvas(domElement) {
        if(domElement.firstChild.nodeName.toLowerCase() == 'svg') {
            var canvas = document.createElement('canvas');
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.cursor = "crosshair";
            domElement.replaceChild(canvas, domElement.firstChild);
        }
    }
    
    replaceCanvasOrSVGWithSVG(domElement, savedStateSVG) {
        if(domElement.firstChild.nodeName.toLowerCase() == 'canvas' || domElement.firstChild.nodeName.toLowerCase() == 'svg') {
            domElement.replaceChild(savedStateSVG, domElement.firstChild);
        }
    }

    enablePseudoStates() {
        this.project.currentLookAndFeel.enablePseudoStates();
        this.currentScreen.enablePseudoStates();
        for (let [ , screen] of this._cachedScreens) {
            screen.enablePseudoStates();
        }
    }

    disablePseudoStates() {
        this.currentScreen.disablePseudoStates();
        this.project.currentLookAndFeel.disablePseudoStates();
        for (let [ , screen] of this._cachedScreens) {
            screen.disablePseudoStates();
        }
    }

    updateStateAnimation(states, animate, duration, curve) {
        for (var i=0; i<states.length; i++) {
            var state = states[i];
            state.setAutoAnimation(animate, duration, curve);
        }
    }


    // project is set, html and css in the browser, now connect the pieces:
    connectObjects() {
        this.project.currentLookAndFeel.connectObjects();
        this.project.connectObjects();

        this.currentScreen.deepOrderedComponents.forEach(cell =>  cell.connectObjects(this));
        this.currentTool.activate(); // the generated elements don't se the cursor to pointer. Without cursor:pointer iOS Safari does not fire events... 


        // not really necessary, but does not harm either ... 
        const fontStyleElement = document.createElement("style");
        document.head.appendChild(fontStyleElement);
        this._fontStyleSheet = fontStyleElement.sheet;

    }

    // hacky di hack: If we are in edit-mode change all manually selected pseudo states
    // to normal, and back after export. 
    get exportHTMLString() {
        let result = "";
        let changedElements = [];

        const  iterator = document.createNodeIterator(this.screenElement, NodeFilter.SHOW_ELEMENT, function(e) { 
                    if(e.className.includes === undefined) {
                        return false
                    } else {
                        return e.figure !== undefined && e.className.includes("_") || e.className.includes("animated");
                    }
                });
        let e = null;
        while ((e = iterator.nextNode()) != null) {
            let c = e.className;
            c = c.replace("_hover", "");
            c = c.replace("_active", "");
            c = c.replace("_focus-within", "");
            if (c.includes("animated")) {       // if we used the IPP in Antetype an GDEffectAction might
                                                // leave its animation className intact. If this is the 
                                                // the case the animation will start immediately for the
                                                // first screen. #557
                c = cssClassNameForCell(e.figure, this.project);
            }
            e.className = c;
            changedElements.push(e);
        }


        // remove handles and selection rects: 
        for (let i=0; i<this.handleElements.length; i++) {
            const h = this.handleElements[i];
            h.parentElement.removeChild(h);
        }
        this.handleElements = [];

        for (let i=0; i<this._highlightDivs.length; i++) {
            const h = this._highlightDivs[i];
            h.parentElement.removeChild(h);
        }
        result = this.screenElement.outerHTML;

        for (let i=0; i<changedElements.length; i++) {
            const domElement = changedElements[i];
            const rootCell = domElement.figure.rootInstanceCell;
            this.changeStateOfCell(rootCell, rootCell.activeState, "");
        }

        // show handles and selection rects again:
        this.updateHandles();
        this._highlightDivs.forEach(function(s) { document.body.appendChild(s); });

        return result;

    }

    get styleSheetString() {
        var result = "";
        var changeCSS = !this.currentTool.isRunTool();
        if (changeCSS) {
            this.enablePseudoStates();
        }
        
        result = this.project.currentLookAndFeel.cssStyleSheet.cssText 
        + '\n\n' + this.currentScreen.cssStyleSheet.cssText 
        + '\n\n' + this.project.currentLookAndFeel.breakPointStyleSheet.cssText
        + '\n\n' + this.currentScreen.breakPointStyleSheet.cssText; 

        if (changeCSS) {
            this.disablePseudoStates();
        }
        return result;
    }

    exportStyleSheetString(styleSheet) {
        var result = "";
        var changeCSS = !this.currentTool.isRunTool();
        if (changeCSS) {
            this.enablePseudoStates();
        }
        
        result = styleSheet.cssText;

        if (changeCSS) {
            this.disablePseudoStates();
        }
        return result;
    }

    updateDesignBreakPoint(breakPoint, name, width) {
        this.project.updateDesignBreakPoint(breakPoint, name, width);
        this.currentScreen.updateDesignBreakPoint(breakPoint);
        for (let [ , screen] of this._cachedScreens) {
            screen.updateDesignBreakPoint(breakPoint);
        }
    }

    addDesignBreakPoint(breakPoint) {
        this.project.addDesignBreakPoint(breakPoint);
        this.currentScreen.insertBreakPoint(breakPoint);
        for (let [ , screen] of this._cachedScreens) {
            screen.insertBreakPoint(breakPoint);
        }
    }

    deleteDesignBreakPoint(breakPoint) {
        this.currentScreen.deleteDesignBreakPoint(breakPoint);
        for (let [ , screen] of this._cachedScreens) {
            screen.deleteDesignBreakPoint(breakPoint);
        }
        this.project.deleteDesignBreakPoint(breakPoint);
    }

    get fontStyleSheetString() {
        let s = "";
        for (let f in this._usedFonts) {
            let fontCSS = this._usedFonts[f].fontCSS;
            if (fontCSS) {
                s += this._usedFonts[f].fontCSS + "\n";
            }
        }
        return s;
    }

    /**
        EventTarget-API. callback wird aufgerufen, wenn das event aufgetreten ist. 
        Derzeit definiert sind: `loadscreen` (wird aufgerufen, wenn ein neuer 
        Screen geladen ist) und `unloadscreen` (wird aufgerufen, wenn der alte 
        screen noch aktiv ist, aber gleich ein neuer geladen wird). 

        @param {String} type - loadscreen oder unloadscreen 
        @param {Function} callback - wird aufgerufen, wenn das Event eingetreten ist
    */
    addEventListener(type, callback) {
        if (!(type in this._listeners)) {
            this._listeners[type] = [];
        }
        this._listeners[type].push(callback);
    }

    /**
        löscht den callback für das event "type"
        @param type {String} type of event
        @param callback {Function} callback für das Event
    */
    removeEventListener(type, callback) {
        if (!(type in this._listeners)) {
            return;
        }
        var stack = this._listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback){
                stack.splice(i, 1);
                return;
            }
        }
    }

    dispatchEvent(event) {
        if (!(event.type in this._listeners)) {
            return true;
        }
        var stack = this._listeners[event.type].slice();

        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
        return !event.defaultPrevented;
    }
}


/**
    USed in the exported web viewer. Once we finish #69 not sure if we need this one...
*/
export class AntetypeWebViewer extends AntetypeWeb {
    addUsedFont() {
        // do nothing, since we already have the fonts. 
    }

}

export function initializeAntetype(screenElement) {
    Antetype = new AntetypeWeb(screenElement);
    window.Antetype = Antetype;
}

export function initializeAntetypeViewer() {
    Antetype = new AntetypeWebViewer(document.body);
    window.Antetype = Antetype;
}

// WKWebView-fake-object
// currently we use WebView but we want to switch to WKWebView, furthermore debugging
// is broken in the WebView since 10.15.4. Therefor we make ist possible to use WKWebView
// using a compile-time-switch. Since the Cocoa <-> JavaScript-communication is quiet 
// different we add here some fake-objects to mimique the old one: 
if (window.navigator.userAgent.indexOf("Antetype") != -1 && window.webkit && window.serverDocument == undefined) {
    window.serverDocument = {
        handleCommandPath: (s) => {
            window.webkit.messageHandlers.serverDocument.postMessage({"command": "handleCommandPath", "parameters": s});
        }
    }

//    window.workingAreaView = { }
    //    window.webViewController = {}
}
