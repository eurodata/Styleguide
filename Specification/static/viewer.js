"use strict";

/*
    All the rest. Simplified Antytpe. Main object is window.Antetype (AntetypeWeb), 
    which is the top-level object. 

    Tools do mainly simply forward to Antetype (apart from GDRunTool which has to run 
    only in the viewer). 

*/


/*
    a event target is not necessarily the element we are interested in Antetype 
    (for example a Antetype-cell might consists of multiple DOM-Element). 
    This function return the id of the toplevel-Antetype-cell 
*/
function targetIDFromEventTarget(target) {
    if (!target) {
        return undefined;
    }

    let targetID = undefined;

    // if target is not an Antetype cell go up until we find one. Currently used in text or vector. 
    if(target.nodeName.toLowerCase() != "cell") {
        let targetElement = target.parentElement;
        while(targetElement != null && targetElement.nodeName.toLowerCase() != "cell") {
            targetElement = targetElement.parentElement;
        }

        if (targetElement) {
            targetID = targetElement.id;
        }
    } else {
        targetID = target.id; 
    }

    return targetID;
}

/*
    We transfer DOM-Events into Antetype (used in the various webKeyDown, webMouseDown-etc. 
    methods in GDTool. 
*/
function transferEvent(e) {
    var targetID = targetIDFromEventTarget(e.target);
    var handle;
    if (e.target) {
        if (e.target.atHandle) {
            var atHandle = e.target.atHandle;
            handle = {"ownerID": atHandle.ownerWebID(), "keyPath": atHandle.keyPath()};
        }
    }

    var d = {"shiftKey" : e.shiftKey, "ctrlKey": e.ctrlKey, "altKey": e.altKey, "metaKey": e.metaKey, 
            "target": targetID, "handle": handle, "screenX": e.screenX, "screenY": e.screenY, 
            "clientX": e.clientX, "clientY": e.clientY, "offsetX": e.offsetX, "offsetY": e.offsetY};

    if (e.dataTransfer) {
        var data = {};
        for (var i=0; i<e.dataTransfer.types.length; i++) {
            var type = e.dataTransfer.types[i];
            var typeData = e.dataTransfer.getData(type);
            data[type] = typeData;
            data["effectAllowed"] = e.dataTransfer.effectAllowed;
            data["dropEffect"] = e.dataTransfer.dropEffect;
        }
        d["dataTransfer"] = {"data" : data};
    }

    return d;
}

// we use contentEditable for editing, but only want <br> as newlines in our text
// this function tries to convert the mixture of <div> and <br>'s from the contentEditable-edit-span
// to our format. Quiet a mess, but I don't see a pattern when Safari decides to use a <div> or a <br>
function stringFromContentEditable(element) {
    if (element == undefined) 
        return "";

    let newText = element.innerHTML;

    if (newText == "<br>") {
        return "";
    }

    newText = newText.replace(/<div><br><\/div>/g, "<br>");     // #552 a single return in the first line is converted as <div><br></div> ..
    newText = newText.replace(/<div>/g, "<br>");
    newText = newText.replace(/<\/div>/g,"");
    return newText;
}


/**
 * Wrapper around intersection observer-API, used for Visible/Invisible in 
 * viewport events
 */
class GDCellIntersectionObserver {
    constructor() {
        this._observedCellCallbacks = new Map();
        let callback = (entries, observer) => {
            entries.forEach( entry => {
                this.executeCallBackForEntry(entry);
            });
        };

        this._intersectionObserver = new IntersectionObserver(callback);
    }

    executeCallBackForEntry(entry) {
        let callbacks = this._observedCellCallbacks.get(entry.target);
        if (callbacks != undefined) {
            callbacks.forEach( item => item.callback(entry) );
        }
    }

    /**
     * calls fn(InterSectionObserverEntry) if something changed
     *
     * @param {HTMLElement} domElement
     * @param {GDEventHandler} eventHandler
     * @param {Function} fn
     */
    observeIntersection(domElement, eventHandler, fn) {
        let existingCallbacks = this._observedCellCallbacks.get(domElement);  
        const observeEntry = {callback: fn, eventHandler: eventHandler};
        if (existingCallbacks == undefined) { 
            this._intersectionObserver.observe(domElement);
            this._observedCellCallbacks.set(domElement, [observeEntry]);
        } else {
            existingCallbacks.push(observeEntry);
        }
    }

    /**
     * remove callbacks for the given Element and event handler
     *
     * @param {HTMLElement} domElement
     * @param {GDEventHandler} eventHandler
     */
    unobserveIntersection(domElement, eventHandler) {
        let existingCallbacks = this._observedCellCallbacks.get(domElement);  
        if (existingCallbacks == undefined) {
            return;
        }

        const i = existingCallbacks.findIndex( e => e.eventHandler == eventHandler);
        if (i == -1)  {
            return; 
        }

        existingCallbacks.splice(i,1);
        if (existingCallbacks.length == 0) {
            this._intersectionObserver.unobserve(domElement);
            this._observedCellCallbacks.delete(domElement);
        }
    }

}


/**
 * sends the dragging-events from the browser to Antetype. (like with the tools)
 */
class GDDragHandler {
    constructor(at) {
        this._at = at;
        this._started = false;
    }


    cocoaOperationToWeb(o) {
        switch (o) {
            case GDDragHandler.NSDragOperationNone: return "none";
            case GDDragHandler.NSDragOperationCopy: return "copy";
            case GDDragHandler.NSDragOperationLink: return "link";
            case GDDragHandler.NSDragOperationMove: return "move";
        }

        return "";
    }

    dragEnter(e) {
        if (this._started) {
            return;
        }
        if (window.workingAreaView) {
            e.preventDefault();
            var cocoaOperation = window.workingAreaView.webDragEnter(transferEvent(e));
            e.dataTransfer.effectAllowed = this.cocoaOperationToWeb(cocoaOperation);
            this._started = true;
        }
    }

    dragLeave(e) {

    }

    dragExit(e) {

    }

    dragOver(e) {
        if (window.workingAreaView) {
            e.preventDefault();
            var cocoaOperation = window.workingAreaView.webDragOver(transferEvent(e));
            e.dataTransfer.effectAllowed = this.cocoaOperationToWeb(cocoaOperation);
        }
    }

    drop(e) {
        if (window.workingAreaView) {
            e.preventDefault();
            this._at._dragHandler = null;
            var cocoaOperation = window.workingAreaView.webDrop(transferEvent(e));
            e.dataTransfer.dropEffect = this.cocoaOperationToWeb(cocoaOperation);
        }
    }
}

GDDragHandler.NSDragOperationNone = 0;
GDDragHandler.NSDragOperationCopy = 1;
GDDragHandler.NSDragOperationLink = 2;
GDDragHandler.NSDragOperationGeneric = 4;
GDDragHandler.NSDragOperationPrivate = 8;
GDDragHandler.NSDragOperationMove = 16;
GDDragHandler.NSDragOperationDelete = 32;
GDDragHandler.NSDragOperationEvery  = -1; //NSUIntegerMax, 



/**
    counterpart of the Tool in Antetype. Most of the events are transferred
    to the Antetype-classes. 
*/
class GDTool {
    constructor(at) {
        this.at = at;
    }

    mouseDown(e) {
        
        if (window.workingAreaView)  {
            var d = transferEvent(e);
            window.workingAreaView.currentTool().webMouseDown(d);
        }
    }

    mouseUp(e) {
        if (window.workingAreaView)  {
            var d = transferEvent(e);
            window.workingAreaView.currentTool().webMouseUp(d);
        }
    }

    mouseDoubleClick(e) {
        if (window.workingAreaView) {
            var d = transferEvent(e);
            d["clickCount"] = 2;
            window.workingAreaView.currentTool().webMouseUp(d);
        }
    }

    mouseDragged(e) {
        if (window.workingAreaView) {
            var d = transferEvent(e);
            window.workingAreaView.currentTool().webMouseDragged(d);
        } 
    }
    mouseMove(e) {}
    mouseClick(e) {}

    mouseEnter(e) {}

    contextMenu(e) {
    }

    keyDown(e) {}

    keyUp(e) { } 
    keyPress(e) {} 

    scroll(e) { }

    touchStart(e) {}
    tochEnd(e) {}
    touchEnter(e) {}
    touchLeave(e) {}
    touchMove(e) {}

    activate() {}
    deactivate() {}
    isRunTool() {
        return false;
    }

    screenWillChange() {}       // called before screen-change
    screenDidChange(newScreen) {} // called after screen-change

    executeEventHandler(eventHandler, event) {}
}

class GDSelectionTool extends GDTool {
    transferKeyEvent(e) {
        var keyIdentifier = e.keyIdentifier;
        if (keyIdentifier == "U+0009") 
            keyIdentifier = "Tab";
        if (keyIdentifier == "U+0008") 
            keyIdentifier = "Backspace";


        if (keyIdentifier == "Tab") {
            e.preventDefault();
        }

        if (e.metaKey && (keyIdentifier == "Up" || keyIdentifier == "Down")) {
            e.preventDefault();
        }

        var d = transferEvent(e);
        d.keyCode = e.keyCode;
        d.key = keyIdentifier;
        return d;
    }

    keyUp(e) {
        var d = this.transferKeyEvent(e);
        if (window.workingAreaView)
            window.workingAreaView.currentTool().webKeyUp(d);
    }

    keyDown(e) {
        var d = this.transferKeyEvent(e);
        if (window.workingAreaView) {
            window.workingAreaView.currentTool().webKeyDown(d);
            
            // Antetype Shortcut Previous/Next Screen
            if (e.altKey && e.metaKey && (e.key == "ArrowLeft" || e.key == "ArrowRight")) {
                return;
            }
            // for keys handled by Antetype don't use the browser behavior. See #133
            else if (e.key == "Enter" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp") {
               e.preventDefault();
            }
        }
    }
}


class GDFigureDragTool extends GDTool {
    activate() {
        this.at.hideHandlesTemporarily();
    }

    deactivate() {
        this.at.showHandlesTemporarily();
    }
}

class GDHandleDragTool extends GDTool {
    activate() {
        this.at.hideHandlesTemporarily();
    }

    deactivate() {
        this.at.showHandlesTemporarily();
    }
}


class GDTextTool extends GDTool {

    // issue 11, little hack to get at least new-lines.
    // We add span inside the normal text span for editing
    // afterwards we change the <div> to <br> ....
    editTextOfFigure(f) {
        var span = this.at.assureTextSpan(f);
        var editSpan = span.contentSpan;
        editSpan.contentEditable = true;
        editSpan.style.webkitUserSelect = "text";
        editSpan.style.minWidth = "1px";    // to see the textcursor
        editSpan.focus();
        this.editSpan = editSpan;
        this.textFigure = f;
        
        // Issue #120 plain text paste:
        this.pasteHandler = function(e) {
                // cancel paste
                e.preventDefault();
                
                //  get text representation of clipboard
                var text = e.clipboardData.getData("text/plain");
                
                // insert text manually
                document.execCommand("insertHTML", false, text);
        };

        editSpan.addEventListener("paste", this.pasteHandler);
        if (editSpan.innerText.length > 0)
            document.execCommand("selectAll", true, null);
    }

    commitTextInAntetype() {
        if (window.workingAreaView) {

            // workaround for #469: The browser moves the span so that the cursor 
            // is visible. This sometimes changes the layout, we hide and show the 
            // cell which forces a relayout. Not ideal, but seems to work. 

            const element = this.textFigure.DOMElement;
            const oldDisplay = element.style.display;
            element.style.display = "none";
            window.workingAreaView.currentTool().webViewTextCommit();

            // even hackier: the second issue on #469 only works with a small timeout
            // This is likely to break ... 
            window.setTimeout(() => element.style.display = oldDisplay, 1);
        }
    }

    mouseDown(e) {
        if (e.target != this.editSpan) {
            super.mouseDown(e);
            e.preventDefault();
            return;
        }
    }

    keyDown(e) {
        // enter or cmd-return:
        if (e.keyIdentifier == "Enter" && (e.metaKey  || e.keyLocation == KeyboardEvent.DOM_KEY_LOCATION_NUMPAD)) {
            this.commitTextInAntetype();
            e.preventDefault();
        }

        if (e.keyCode == 9) { // tab
            this.commitTextInAntetype();
            e.preventDefault();
        }

        if (e.key == "Escape" || e.key == "Cancel") {
            if (window.workingAreaView) {
                window.workingAreaView.currentTool().webViewTextAbort();
                e.preventDefault();
            }
        }

        // Issue #526 undo while editing text (works on 10.14.2, but bypasses the Antetype-undo-stack)
        // needs testing on 10.13 ... 
        if (e.metaKey && e.key == "z") {
            if (e.shiftKey) {
                document.execCommand("redo");
            } else {
                document.execCommand("undo");
            }
            e.preventDefault();
        }

    }

    /**
     * returns the edited text (replacing div's with <br> (since we currently use contentEditable 
     * for editing on the canvas. 
     */
    get currentEditText() {
        return stringFromContentEditable(this.editSpan);
    }

    set currentEditText(s) {
        this.editSpan.innerHTML = s;
    }

    abortEdit() {
        if (this.editSpan) {
            this.editSpan.blur();
            this.editSpan.contentEditable = false;
            this.editSpan.style.webkitUserSelect = "none";
            this.editSpan.style.minWidth = "";
            this.editSpan.removeEventListener("paste", this.pasteHandler);
        }
        this.textFigure = undefined;
        this.editSpan = undefined;
    }

    deactivate() {
        this.abortEdit();
    }


}


class GDVectorTool extends GDTool {

    editVectorOfFigure(f) {
        this.at.replaceSVGWithCanvas(f.DOMElement);
        this.atPaperCanvas = new PaperCanvas(f.DOMElement.firstChild, f.vectorJSONInStateWithIdentifier(f.activeStateIdentifier));
        const lastCanvasSize = f.lastCanvasSizeInStateWithIdentifier(f.activeStateIdentifier);
        this.atPaperCanvas.resizePaperCanvas(this.atPaperCanvas._paperInstance, lastCanvasSize[0], lastCanvasSize[1], true);
        this.paperCanvasContainer = f.DOMElement;
        this.paperCanvasCell = f;
    }

    updateVectorCellContent() {
        this.atPaperCanvas.restoreSavedState(this.atPaperCanvas._paperInstance, this.paperCanvasCell.vectorJSONInStateWithIdentifier(this.paperCanvasCell.activeStateIdentifier));
        const lastCanvasSize = this.paperCanvasCell.lastCanvasSizeInStateWithIdentifier(this.paperCanvasCell.activeStateIdentifier);
        this.atPaperCanvas.resizePaperCanvas(this.atPaperCanvas._paperInstance, lastCanvasSize[0], lastCanvasSize[1], true);
    }

    commitVector() {
        if (window.workingAreaView) {
            window.workingAreaView.currentTool().webViewVectorCommit();
        }
    }

    commitVectorInAntetype() {
        if (window.workingAreaView) {
            window.workingAreaView.currentTool().webViewVectorCommitAndAbortEdit();
        }
    }

    mouseDown(e) {
        if (e.target.nodeName.toLowerCase() != "canvas" && e.target.className != "handle") {
            window.workingAreaView.currentTool().webViewVectorCommitAndAbortEdit();
            super.mouseDown(e);
            e.preventDefault();
            return;
        }
    }

    keyDown(e) {
        // enter or cmd-return:
        if (e.keyIdentifier == "Enter") {
            this.commitVectorInAntetype();
            e.preventDefault();
        }

        // Abort editing
        if (e.key == "Escape" || e.key == "Cancel") {
            if (window.workingAreaView) {
                window.workingAreaView.currentTool().webViewVectorAbort();
                e.preventDefault();
            }
        }

        // Key C = Close path (toggle)
        if (e.keyIdentifier == "U+0043") {
            if (window.workingAreaView) {
                e.preventDefault();
                return;
            }
        }

        // Key X = Convert to curve (toggle)
        if (e.keyIdentifier == "U+0058") {
            e.preventDefault();
            return;
        }
    }

    get currentEditVector() {
        return this.atPaperCanvas.saveState();
    }

    set currentEditVector(s) { }

    abortEdit() {
        if(this.atPaperCanvas != null) {
            const svg = this.atPaperCanvas.modifySVG(this.atPaperCanvas._paperInstance.project.exportSVG());
            this.at.replaceCanvasOrSVGWithSVG(this.paperCanvasContainer, svg);
            this.atPaperCanvas = null;   
        }
    }

    deactivate() {
        this.abortEdit();
    }
}


class GDRunTool extends GDTool {
    constructor(at) {
        super(at);
        this._unloadEventHandlers= [];
        this._highlightRects = [];
        this._intersectionObserver = null;
    }

    handleEvents(domElement, type, event) {
        if (domElement == null)  {
            return false;
        }

        if (domElement.figure == undefined && domElement.parentNode) {
            return this.handleEvents(domElement.parentNode, type, event);
        }
        let cell = domElement.figure;
        if (cell != undefined) {
            cell = cell.rootInstanceCell;
        }
        if (cell == undefined || !cell.eventHandlers[type]) {
            return this.handleEvents(domElement.parentNode, type, event);
        }

        let eventHandlers = cell.eventHandlers[type];
        if (eventHandlers) {
            let handled = false;
            eventHandlers.forEach(e => {
                if (e.hasActions) {
                    e.execute(event);
                    handled = true;
                }
            });

            return handled;
        }

        return false;
    }

    mouseClick(e) {
        this.handleEvents(e.target, GDMouseClickEventType,e);
    }

    mouseDown(e) {
        this.handleEvents(e.target, GDMouseDownEventType,e);
    }

    mouseUp(e) {
        this.handleEvents(e.target, GDMouseUpEventType,e);
    }

    mouseDoubleClick(e) {
        this.handleEvents(e.target, GDDoubleClickEventType,e);
    }


    touchStart(e) {
        this.handleEvents(e.target, GDTouchStartEventType,e);
    }
    
    touchEnd(e) {
        this.handleEvents(e.target, GDTouchEndEventType,e);
    }

    touchEnter(e) {
        this.handleEvents(e.target, GDTouchEnterEventType,e);
    }

    touchLeave(e) {
        this.handleEvents(e.target, GDTouchLeaveEventType,e);
    }

    touchMove(e) {
        this.handleEvents(e.target, GDTouchMoveEventType,e);
    }

    scroll(e) {
        this.handleEvents(e.target, GDScrollEventType,e);
    }

    contextMenu(e) {
        var handledClick = this.handleEvents(e.target, GDRightMouseClickEventType,e);
        if (handledClick) {
            e.preventDefault();
        }
    }

    shouldHighlightDOMElement(d) {
        const style = window.getComputedStyle(d);
        if (style.visibility == "hidden") {
            return false;
        }
        
        let parent = d.parentElement;
        while (parent) {
            const parentStyle = window.getComputedStyle(parent);
            if (parentStyle.display == "none") {
                return false;
            }

            parent = parent.parentElement;
        }

        return true;
    }

    addHighlightCell(domElement) {
        var r = globalBoundsOfElement(domElement); 
        var highlight = document.createElement("div");
        highlight.className = "GDClickable";
        sizeHighlightCell(highlight, r);
        document.body.appendChild(highlight);
        this._highlightRects.push(highlight);
    }

    keyDown(e) {
        if (e.key === "Alt") {
            var actionCells = this.domElementsWithEventHandler(GDMouseClickEventType);
            actionCells.forEach((d) => {
                if (this.shouldHighlightDOMElement(d)) {
                    this.addHighlightCell(d);
                }
            });
        }
        this.handleKeyEventsOfType(GDKeyDownEventType,e);
    }

    keyUp(e) {
        if (e.key === "Alt") {
            for (var i=0; i<this._highlightRects.length; i++) {
                var h = this._highlightRects[i];
                if(h.parentElement != null) {
                    h.parentElement.removeChild(h);
                }
            }
            this._highlightRects = [];
        }
        this.handleKeyEventsOfType(GDKeyUpEventType,e);
    }

    handleKeyEventsOfType(keyEventType, e) {
        const actionCells = this.domElementsWithEventHandler(keyEventType);
        actionCells.forEach((domElement) => {
            const figure = domElement.figure;
            if (figure) {
                const eventHandlers = figure.eventHandlers[keyEventType];
                eventHandlers.forEach(eventHandler => {
                    if (eventHandler.parameter == e.key) {
                        eventHandler.execute(e);
                        e.preventDefault();
                    }
                });
            }
        });
    }

    keyPress(e) {
    }
   
    mouseDragged(e) { }

    domElementsWithEventHandler(eventType) {
        const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, function(e) {
            return e.figure && e.figure.hasActionsOfEventType(eventType) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        });

        let domElement = null;
        let result = [];
        while (domElement = iterator.nextNode()) {
            result.push(domElement);
        }
        return result;
    }

    activate() {
        var clickCells = this.domElementsWithEventHandler(GDMouseClickEventType);
        for (var i=0; i<clickCells.length; i++) {
            var domElement = clickCells[i];
            domElement.style.cursor = "pointer";
        }

        if (this.at.runsInAntetype) {

            // in-place-presentation mode. Run-Tool is either switched while entering 
            // ipp, or after switching to Selection-mode and and back (d/r). Make sure
            // the pseudostates are correctly set, and disable active pseudo-states:

            this.at.enablePseudoStates();

            if (this.at.currentScreen) {
                this.at.currentScreen.deepOrderedComponents.forEach( c => {
                    if (c.isRootInstanceCell && c.activeState.isPseudoState) {
                        let normalState = c.widget.states.find( s => s.type == GDState.GDNormalStateType );
                        this.at.changeStateOfCell(c, normalState, "");
                    }
                });
            }

        }
    }

    removePointerCursors() {
        const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, 
                e => e.nodeName.toLowerCase() === "cell" && e.figure && Object.keys(e.figure.eventHandlers).length > 0);

        let domElement = null;
        while (domElement = iterator.nextNode()) {
            const figure = domElement.figure;
            if (figure.hasActionsOfEventType(GDMouseClickEventType)) {
                domElement.style.cursor = "";
            }
        }
    }
    cleanupActions() {
        const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, 
                e =>  e.figure && e.figure.eventHandlers && Object.keys(e.figure.eventHandlers).length > 0);

        let domElement = null;
        while (domElement = iterator.nextNode()) {
            const figure = domElement.figure;

            figure.eventHandlersDo(e => e.cleanup());
        }
    }

    deactivate() {
        this.cleanupActions();
        this.removePointerCursors();

        if (this.at.runsInAntetype) {
            this.at.disablePseudoStates();
        }
    }

    isRunTool() {
        return true;
    }
    
    unloadEventHandlers(newScreen) {
        const domElements = this.domElementsWithEventHandler(GDUnloadEventType);
        let result = [];
        domElements.forEach(domElement => {
            let eventHandlers = domElement.figure.eventHandlers[GDUnloadEventType];
            eventHandlers.forEach(e => result.push(e));
        });
        return result;
    }

    screenWillChange() {
        this._unloadEventHandlers.forEach((eventHandler) => {
            eventHandler.execute();
        });
        this.cleanupActions();
    }

    screenDidChange(newScreen) {
        // #662 if a goto-screen action was executed make sure we let the actions finish
        // before we execute the load-actions. Not quiet sure if this is the right 
        // place for this. 
        window.setTimeout( () => {
            this._unloadEventHandlers = this.unloadEventHandlers(newScreen);
            const domElementsWithLoadEventHandlers = this.domElementsWithEventHandler(GDLoadEventType);
            domElementsWithLoadEventHandlers.forEach((domElement) => {
                this.handleEvents(domElement, GDLoadEventType);
            });
        },0);
    }

    executeEventHandler(eventHandler, event) {
        eventHandler.execute(event);
    }

    startEventHandlers(eventHandlers) {
        eventHandlers.forEach((eventHandler) => {
            eventHandler.forEach((e) => {
                e.startRepeat();
            });
        });
    }

    stopEventHandlers(eventHandlers) {
        eventHandlers.forEach((eventHandler) => {
            eventHandler.forEach((e) => {
                e.stopRepeat();
            });
        });
    }

    toggleEventHandlers(eventHandlers) {
        eventHandlers.forEach((eventHandler) => {
            eventHandler.forEach((e) => {
                e.toggleRepeat();
            });
        });
    }


    /* intersection -observer */
    observeIntersection(domElement, eventHandler, fn) {
        if (this._intersectionObserver == null) {
            this._intersectionObserver = new GDCellIntersectionObserver();
        } 
        this._intersectionObserver.observeIntersection(domElement, eventHandler, fn);

    }


    unobserveIntersection(domElement, eventHandler) {
        if (this._intersectionObserver == null) {
            return;
        }
        this._intersectionObserver.unobserveIntersection(domElement, eventHandler);
    }

}


class GDSelectionRectTool extends GDTool {

    activate() {
        var r = document.createElement("div");
        r.className = "selectionRect";
        this.selectionRect = r;
        document.body.appendChild(this.selectionRect);
    }

    deactivate() {
        if (this.selectionRect.parentNode != null) {
            if(document.body.contains(this.selectionRect)) {
                document.body.removeChild(this.selectionRect);
            }
        }
    }

    mouseDragged(e) {
        GDTool.prototype.mouseDragged.call(this, e);
        if (window.workingAreaView) {
            var r = window.workingAreaView.currentTool().currentBounds();
            this.selectionRect.style.top  = r.y + "px";
            this.selectionRect.style.left= r.x + "px";
            this.selectionRect.style.width = r.width + "px";
            this.selectionRect.style.height= r.height + "px";
        }
    }
}

function AlignmentLine(json) {
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


function sizeHighlightCell(highlight, r) {
    highlight.style.top = r.top + "px";
    highlight.style.left = r.left  + "px";
    highlight.style.width = r.width  + "px";
    highlight.style.height = r.height  + "px";
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
        case "bottomRight": return "nwse-resize"; break;
        case "topCenter": 
        case "bottomCenter": return "ns-resize"; break;
        case "rightCenter": 
        case "leftCenter": return "ew-resize"; break;
        case "bottomLeft":
        case "topRight": return "nesw-resize"; break;
    }

    return "pointer";
}


function globalBoundsOfElement(DOMElement) {
    var r = DOMElement.getBoundingClientRect();
    var offsetX = window.scrollX;
    var offsetY = window.scrollY;

    return {top: r.top + offsetY, left: r.left + offsetX, width: r.width, height: r.height};
}



// mmmhm, this one updates the position of the highlight-divs, will have to see
// if there is a better way (5% CPU for Antetype doing nothing o_O ) 
function selectionUpdater(timestamp) {
    if (window.Antetype == undefined) 
        return;
    Antetype.selection.forEach(function(highlight) {
        var rect = globalBoundsOfElement(highlight.figure.DOMElement);
        sizeHighlightCell(highlight, rect);
    });
    Antetype.handles.forEach(function(handle) {
        positionHandle(handle);
    });

    if (Antetype.selection.length > 0) {
        window.requestAnimationFrame(selectionUpdater);
    }
}

/**
    Used for Screen-transitions (see GDGotoScreenAction). This one is used in the
    exported WebViewer, GDEditModeScreenAnimator is used in LivePreview/In-Place-Presentation-Mode.

    Normally, <body> contains the current screen. In case of a screen-transition 
    we move the content of the body (old screen) into a div, the new screen in 
    another div, animate both (or one, depending on the transition) and when 
    the animation finishes we delete the old-screen-div and move the contents of 
    the new screen-div into the body
*/
class GDScreenAnimator {
    constructor(at, transition, duration) {
        this.at = at;
        this.transition = transition;
        this.duration = duration;
    }


    /**
        Converts between out transition constant (@link GDGotoScreenAction} and
        CSS-animation-classes.

        @return {Array} [oldScreenAnimation, newScreenAnimation]
    */
    convertTransitionToAnimationClasses() {
        let oldScreenAnimation = "";
        let newScreenAnimation = "";
        let oldOnTop = false;

        switch (this.transition) {
            case GDGotoScreenAction.GDScreenTransitionFade:
                oldScreenAnimation = "fadeOut";
                newScreenAnimation = "fadeIn";
                break;

            case GDGotoScreenAction.GDScreenTransitionFadeOut:
                oldScreenAnimation = "fadeOut";
//                newScreenAnimation = "fadeIn";
                oldOnTop = true;
                break;

            case GDGotoScreenAction.GDScreenTransitionScale: 
                newScreenAnimation = "zoomIn";
                break;

            case GDGotoScreenAction.GDScreenTransitionScaleOut: 
                oldScreenAnimation = "zoomOut";
                oldOnTop = true;
                break;

            // for Safari 12 we have to animate a margin, therefor use margin-animation
            // works in Technology Preview ... 
            case GDGotoScreenAction.GDScreenTransitionPushToLeft: 
                //newScreenAnimation = "slideInRight";
                newScreenAnimation = "marginInRight";
                oldScreenAnimation = "slideOutLeft";
                break;
            case GDGotoScreenAction.GDScreenTransitionPushToRight: 
                //newScreenAnimation = "slideInLeft";
                newScreenAnimation = "marginInLeft";
                oldScreenAnimation = "slideOutRight";
                break;
            case GDGotoScreenAction.GDScreenTransitionPushToTop: 
                //newScreenAnimation = "slideInUp";
                newScreenAnimation = "marginInUp";
                oldScreenAnimation = "slideOutUp";
                break;
            case GDGotoScreenAction.GDScreenTransitionPushToBottom: 
                //newScreenAnimation = "slideInDown";
                newScreenAnimation = "marginInDown";
                oldScreenAnimation = "slideOutDown";
                break;

            case GDGotoScreenAction.GDScreenTransitionMoveFromLeft: 
                //newScreenAnimation = "slideInLeft";
                newScreenAnimation = "marginInLeft";
                break; 
            case GDGotoScreenAction.GDScreenTransitionMoveFromRight: 
                //newScreenAnimation = "slideInRight";
                newScreenAnimation = "marginInRight";
                break; 
            case GDGotoScreenAction.GDScreenTransitionMoveFromBottom: 
                //newScreenAnimation = "slideInUp";
                newScreenAnimation = "marginInUp";
                break; 
            case GDGotoScreenAction.GDScreenTransitionMoveFromTop: 
                //newScreenAnimation = "slideInDown";
                newScreenAnimation = "marginInDown";
                break; 

            case GDGotoScreenAction.GDScreenTransitionMoveToLeft: 
                oldScreenAnimation = "slideOutLeft";
                oldOnTop = true;
                break; 
            case GDGotoScreenAction.GDScreenTransitionMoveToRight: 
                oldScreenAnimation = "slideOutRight";
                oldOnTop = true;
                break; 
            case GDGotoScreenAction.GDScreenTransitionMoveToBottom: 
                oldScreenAnimation = "slideOutDown";
                oldOnTop = true;
                break; 
            case GDGotoScreenAction.GDScreenTransitionMoveToTop: 
                oldScreenAnimation = "slideOutUp";
                oldOnTop = true;
                break; 


            default:
                // if we have a transition which is not knowm
                oldScreenAnimation = "fadeOut";
                newScreenAnimation = "fadeIn";

        }

        return [oldScreenAnimation, newScreenAnimation, oldOnTop];
    }

    moveChildren(sourceElement, targetElement) {
        let children = [];
        for (let i=0; i<sourceElement.children.length; i++) {
            let child = sourceElement.children[i];
            children.push(child);
        }

        children.forEach( c=> targetElement.appendChild(c));
    }

    createNewScreenContainer(screenDOMElement) {
        let newScreenContainer = document.createElement("div");
        newScreenContainer.className = screenDOMElement.className + " NewScreenContainer";
        newScreenContainer.innerHTML = screenDOMElement.innerHTML;
        newScreenContainer.style.animationDuration =this.duration + "s";
        return newScreenContainer;
    }

    animateScreenTransition(screen) {
        const at = this.at;
        const oldScreen = at.currentScreen;

        // new screen goes into this container .... 
        let newScreenContainer = this.createNewScreenContainer(screen.DOMElement);
        let [oldScreenAnimation, newScreenAnimation, oldOnTop] = this.convertTransitionToAnimationClasses();

        if (newScreenAnimation != "") {
            newScreenContainer.classList.add(newScreenAnimation, "animated");
        }

        let oldClassNames = document.body.className;
        
        // container for the oldscreen (not all transition needs this, but so far we use it for all, 
        const oldScreenContainer = document.createElement("div");
        oldScreenContainer.style.animationDuration = `${this.duration} s`;
        oldScreenContainer.className = `${oldClassNames} NewScreenContainer ${oldScreenAnimation} animated`; 

        if (oldOnTop) {
            oldScreenContainer.style.zIndex = 1;
        }

        // #645 cleanup effects to not show them twice:
        document.querySelectorAll(".animated").forEach( e => {
            if (e.figure) {
                e.className = cssClassNameForCell(e.figure, at.project) 
            }
        });

        this.moveChildren(document.body, oldScreenContainer);


        document.body.appendChild(oldScreenContainer);

        const endAnimationListener = (e) => {
            // when the animation is finished we need to remove the animation-containers ... 
            newScreenContainer.remove();
            at.screenElement.parentNode.replaceChild(screen.DOMElement, at.screenElement);
            at.screenElement = screen.DOMElement;
            at.currentScreen = screen;
            at.executeFinalWidgetLayoutPass(screen);
            this.moveChildren(oldScreenContainer, oldScreen.DOMElement);

            // since we cache the body-Elements we have to remove the oldScreenContainer-Div afterwards
            oldScreenContainer.remove();
            at.dispatchEvent({type: 'loadscreen', defaultPrevented: false});

        }
        if (newScreenAnimation != "") {
            newScreenContainer.addEventListener("animationend", endAnimationListener);
        } else if (oldScreenAnimation != "") {
            oldScreenContainer.addEventListener("animationend", endAnimationListener);
        }
        document.body.appendChild(newScreenContainer);
    }

    /**
     * selects the given screen with the transition/duration given in the constructor.
     *
     * @param {GDScreen} screen
     */
    gotoScreenWithTransition(screen) {
        let at = this.at;
        at.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});

        if (screen.DOMElement == undefined) {
            screen.DOMElement = at.buildDOMForCell(screen);
        }

        this.animateScreenTransition(screen);

    }

}


/**
    screen-transition in in-place presentation mode and live preview. (internally)
*/
class GDEditModeScreenAnimator extends GDScreenAnimator {
    gotoScreenWithID(i) {
        let at = this.at;
        at.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});

        let request = new XMLHttpRequest();
        request.open("GET", "/proxy/fetchobject?document=" + at.serverDocumentName + "&entity=GDFigure&id="+i);
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE && request.status === 200) {
                const json = JSON.parse(request.response);
                let screen = GDModelObject.fromJSONObjectInProject(json, at.project);

                screen.DOMElement  = at.buildDOMForCell(screen);
                this.animateScreenTransition(screen);
            }
        }
        request.send();
    }
}



/**
    main object for the viewer. Used in Live Preview/Antetype WebView and the exported Viewer. 
    AntetypeWebViewer is used in the exported web viewer .
*/
class AntetypeWeb {
    constructor(screenElement) {
        this.commands = [];
        this.converters = {};
        this.screenElement = screenElement; 
        if (!this.screenElement) {
            this.screenElement = document.createElement("div");
            document.body.appendChild(this.screenElement);
        }
        this.selectionTool = new GDSelectionTool(this);
        this.runTool = new GDRunTool(this);
        this.textTool = new GDTextTool(this);
        this.vectorTool = new GDVectorTool(this);
        this.figureDragTool = new GDFigureDragTool(this);
        this.handleDragTool = new GDHandleDragTool(this);
        this.selectionRectTool = new GDSelectionRectTool(this);
        this.setCurrentTool(this.runsInAntetype ? this.selectionTool : this.runTool );

        this.selection = [];
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

        this._dragHandler = null;

        this._showHandles = true;
        this.placeHolder = null;

        this._possibleTargetRect = null;

        this._asyncCommandExecuting = false;
        this._asyncCommandQueue = [];
        this._asyncTimoutID = null;

        this._fontStyleSheet = null;
        this._usedFonts = {};

        this.highlightColor = null;

        this._cssGenerator = new GDCSSGenerator();


        Object.seal(this);
    }

    /**
        the current visible Screen {@link GDScreen}
    */
    get currentScreen() {
        return this._currentScreen;
    }

    set currentScreen(s) {
        this._currentScreen = s;
        if (this.onScreenChange != null)
            this.onScreenChange();
    }

    /**
        the project of this prototype. {@link GDProject}
    */
    get project() {
        return this._project;
    }

    set project(p) {
        this._project = p;
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
     *      *   Calling the styling-stuff here directly looks wrong, either make 
     *          it explicit in the css-generation ... 
     *      *   tests are missing
     *
     */
    executeFinalWidgetLayoutPass(figure) {
        this._cssGenerator.executeFinalWidgetLayoutPass(figure);
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



        document.addEventListener("dragenter", function(e) {
            if (at._dragHandler == null) {
                at._dragHandler = new GDDragHandler(at);
            }
            at._dragHandler.dragEnter(e);
            at.log("dragenter: " + JSON.stringify(e));
        }, false);
        document.addEventListener("dragover", function(e) {
            if (at._dragHandler) {
                at._dragHandler.dragOver(e); 
            }
            at.log("dragover: " + JSON.stringify(e));
        }, false);
        document.addEventListener("drop", function(e) {
            if (at._dragHandler) {
                at._dragHandler.drop(e);
            }
            at.log("drop: " + JSON.stringify(e));
        }, false);


//        container.addEventListener("scroll", e => at.currentTool.scroll(e)); 
        container.addEventListener("touchstart", e => at.currentTool.touchStart(e)); 
        container.addEventListener("touchend", e => at.currentTool.touchEnd(e)); 
        container.addEventListener("touchenter", e => at.currentTool.touchEnter(e)); 
        container.addEventListener("touchleave", e => at.currentTool.touchLeave(e)); 
        container.addEventListener("touchmove", e => at.currentTool.touchMove(e)); 

        this.addEventListener("loadscreen", (e) => this.currentTool.screenDidChange(this.currentScreen) );
        this.addEventListener("unloadscreen", (e) => this.currentTool.screenWillChange() );
    }

    /**
        if the prototype is running inside Antetype (true)  or in the browser (false)
    */
    get runsInAntetype() {
        return window.navigator.userAgent == "Antetype";
    }


    getElementById(webID) {
        return document.getElementById(webID);
    }

    changeIDOfCell(cell, newID) {


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
            s.DOMElement = this.buildDOMForCell(s);
        }

        if (this.screenElement.parentNode) {
            this.screenElement.parentNode.replaceChild(s.DOMElement, this.screenElement);
        }
        this.screenElement = s.DOMElement;
        this.currentScreen = s;
        this.executeFinalWidgetLayoutPass(s);
        this.dispatchEvent({type: 'loadscreen', defaultPrevented: false});
    }


    /**
        like gotoScreen, but using a transition. 

        @param {GDScreen} screen
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

    setCurrentTool(t) {
        // Start RunTool/SelectionTool Toggle
        if(this.currentTool != undefined) {
            if(this.handles == undefined) {
                this.handles = [];
            }

            if(this.selection == undefined) {
                this.selection = [];
            }
        
            if (t.isRunTool()) {
                this.hideHandles();
                this.selectFigures([]);
            }
            else if(this.currentTool && this.currentTool.isRunTool() == true && t.isRunTool() == false) {
                this.showHandles();
            }
        }
        // End RunTool/SelectionTool Toggle

        if (t == this.currentTool) 
            return;
        if (this.currentTool)  {
            this.currentTool.deactivate();
        }
        this.currentTool = t;
        t.activate();
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
    set asyncCommandExecuting(v) {
        this._asyncCommandExecuting = v;
        if (!v) {
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
        } else {
            if (this._asyncTimoutID == null) {
                this._asyncTimoutID = window.setTimeout(() => { 
                    document.body.innerHTML += '<div class="loader-container">  <div class="loader"><img src="static/spinner.svg">  </div>  </div> ';
                    window.clearTimeout(this._asyncTimoutID);
                    this._asyncTimoutID = null;
                }, 500);
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
        this.selection.forEach(function(h) {h.style.display = "none"});
        this.handles.forEach(function(h) {h.style.display = "none"});
    }

    showHandlesTemporarily() {
        this.selection.forEach(function(h) {h.style.display = "block"});
        this.handles.forEach(function(h) {h.style.display = "block"});
    }


    showHandles() {
        this._showHandles = true;
        this.updateHandles();
        this.selection.forEach(function(h) {h.style.display = "block"});
    }

    hideHandles() {
        this._showHandles = false;
        for (var i=0; i<this.handles.length; i++) {
            var h = this.handles[i];
            h.parentElement.removeChild(h);
        }
        this.handles = [];

        this.selection.forEach(function(h) {h.style.display = "none"});
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
        for (var i=0; i<this.handles.length; i++) {
            var h = this.handles[i];
            if(h.parentElement != null) {
                h.parentElement.removeChild(h);
            }

        }
        this.handles = [];

        if (!this._showHandles) {
            return;
        }
        if (window.workingAreaView) {
            if (this.selectedObjects().length > 1) 
                return;

            var atHandles = workingAreaView.screenChangeManager().handles();
            for (var i=0; i<atHandles.length; i++) {
                var atHandle = atHandles[i];
                if (atHandle.isActive()) {
                    var handle = this.handleFromATHandle(atHandle);
                    document.body.appendChild(handle);
                    this.handles.push(handle);
                     
                }
            }
        }
    }

    selectFigures(figures) {
        
        if (this.currentTool.isRunTool()) {
            return;
        }

        if(this.selection != undefined) {
            for (var i=0; i<this.selection.length; i++) {
                var h = this.selection[i];
                if(h.parentElement != null) {
                    h.parentElement.removeChild(h);
                }
            }
        }

        this.selection = [];

        if (!this._showHandles) {
            return;
        }

        for (var i=0; i<figures.length; i++) {
            var figure = figures[i];
            if (figure.isScreen) {
                return;
            }

            var r = globalBoundsOfElement(figure.DOMElement); 
            var highlight = document.createElement("div");
            highlight.className = "highlightrect";
            if(this.highlightColor !== null) { // Always null on High Sierra and earlier (uses css highlight color instead)
                highlight.style.borderColor = this.highlightColor.toString();
            }
            sizeHighlightCell(highlight, r);
            highlight.figure = figure;
            document.body.appendChild(highlight);
            this.selection.push(highlight);
        }

        if (this.selection.length > 0) 
            window.requestAnimationFrame(selectionUpdater);
    }

    updateGuides(lines) {
        for (var i=0; i<this.guides.length; i++) {
            var h = this.guides[i];
            h.parentElement.removeChild(h);
        }
        this.guides= [];

        for (var i=0; i<lines.length; i++) {
            var line = lines[i];
            var element = line.domElement();
            document.body.appendChild(element);
            this.guides.push(element);
        }
        
    }

    selectedObjects() {
        if (this.selection.length == 0) {
            return [this.screenElement.figure];
        }

        var s = [];
        for (var i=0; i<this.selection.length; i++) {
            var selectionDiv = this.selection[i];
            s.push(selectionDiv.figure);
        }

        return s;
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
            oldPlaceHolder.addEventListener("transitionend", function(e) {
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
        if (this._possibleTargetRect == null) {
            this._possibleTargetRect = document.createElement("div");
            this._possibleTargetRect.className = "highlightrect";
            document.body.appendChild(this._possibleTargetRect);

        }
        var r = {"top": y, "left": x, "width": w, "height": h};
        sizeHighlightCell(this._possibleTargetRect,r)
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
            this._cssGenerator.updateDimensionProperties(figureStyle, f, f.activeStateIdentifier);

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
            var isEditable = cell.valueForKeyInStateWithIdentifier("isEditableText", activeStateId);
            span.contentSpan.contentEditable = isEditable ? true : false;
            if (isEditable) {
                span.contentSpan.style.webkitUserSelect = "text";
                span.contentSpan.style.minWidth = "1px";
                span.contentSpan.style.cursor = "text";
                span.contentSpan.style.width = "100%";
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

        if (state.isPseudoState) 
            return;

        if (cell.activeState == state) {
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
        this.executeFinalWidgetLayoutPass(cell);  
    }


    populateCellPropertiesInState(style, cell, stateId) {
        this._cssGenerator.populateCellPropertiesInState(style, cell, stateId);

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
    }


    /**
        sets the value for the given property in cell and active state 
        This also updates the HTML/CSS. 
        @param figure {GDWidgetInstanceCell} the cell
        @param key {String} the property name (see documentation)
        @param value {Object} the value of the property
    */
    cellSetProperty(figure, key, value) {
        var state = figure.activeState;
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
        var stateIdentifier = state.identifier;
        figure.setValueForKeyInStateWithIdentifier(value, key,stateIdentifier );
        var cell = figure.DOMElement;
        var style = figure.cssStyleForStateIdentifier(stateIdentifier);
        
        if (style != undefined) { 
            // mmhm, should we throw or should we go? 
            this.updateStyleProperty(style, figure, key, stateIdentifier);
        }

    }

    // called while building the css for the widgets. (GDLookAndFeel>>populateCSSForLookNode)
    // speedup instead of calling updateStyleProperty for all property names. 
    updateStyles(style, figure, state) {
        this._cssGenerator.updateStyles(style, figure, state);
        this.addUsedFont(figure.valueForKeyInStateWithIdentifier("textFont", state));
    }

    updateStyleProperty(style, figure, key, state) {
        this._cssGenerator.updateStyleProperty(style, figure, key, state);

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

        const activeStateId = cell.activeStateIdentifier;
        newCellNode.id = cell.objectID;

        newCellNode.className = cssClassNameForCell(cell, this.project);


        if (cell.isRootInstanceCell) {
            if (!this.runsInAntetype && cell.widget.states.find(s => s.type == GDState.GDFocusStateType)) {
                newCellNode.tabIndex = 0;
            }
        }

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
        const newScreenDOMElement = this.buildDOMForCell(screen);
        
        if (this.screenElement.parentNode) {
            this.screenElement.parentElement.replaceChild(newScreenDOMElement, this.screenElement);
        }
        this.currentScreen = screen;
        this.screenElement = newScreenDOMElement;
        // This step is necessary for the correct widget layout within a container 
        this.executeFinalWidgetLayoutPass(newScreenDOMElement.figure);
        this.dispatchEvent({type: 'loadscreen', defaultPrevented: false});
        this.send("restoreSelectionAfterReload");   
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
    }

    disablePseudoStates() {
        this.project.currentLookAndFeel.disablePseudoStates();
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
                    }
                    else {
                        return e.className.includes("_") || e.className.includes("animated");
                    }
                });
        let e = null;
        while (e = iterator.nextNode()) {
            let c = e.className;
            c = c.replace("_hover", "");
            c = c.replace("_active", "");
            c = c.replace("_focus", "");
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
        for (let i=0; i<this.handles.length; i++) {
            const h = this.handles[i];
            h.parentElement.removeChild(h);
        }
        this.handles = [];

        for (let i=0; i<this.selection.length; i++) {
            const h = this.selection[i];
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
        this.selection.forEach(function(s) { document.body.appendChild(s); });

        return result;

    }

    get styleSheetString() {
        var result = "";
        var changeCSS = !this.currentTool.isRunTool();
        if (changeCSS) {
            this.enablePseudoStates();
        }
        result  = this.project.currentLookAndFeel.styleSheetsString();
        if (changeCSS) {
            this.disablePseudoStates();
        }
        return result;
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
class AntetypeWebViewer extends AntetypeWeb {
    addUsedFont(f) {
        // do nothing, since we already have the fonts. 
    }

}





/**
 * Post messages to iOS-viewer
 */
function gdPostViewerMessage(msg, params) {
    if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.antetypeFinishedLoadingHandler && window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage) {
        if (params == undefined) {
            params = {};
        }

        var command = {"command": msg, "parameters": params};
        window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage(command)
    }
}

