import { transferEvent, stringFromContentEditable, globalBoundsOfElement, sizeHighlightCell,
    targetIDFromEventTarget, intersectsBounds } from './utils.js';
import { GDMouseClickEventType, GDMouseDownEventType, GDMouseUpEventType, GDDoubleClickEventType, 
    GDTouchStartEventType, GDTouchEndEventType, GDTouchEnterEventType, 
    GDTouchLeaveEventType, GDTouchMoveEventType, GDScrollEventType, GDRightMouseClickEventType,
    GDKeyDownEventType, GDKeyUpEventType, GDUnloadEventType, GDLoadEventType, GDState } from './model.js';

import { PaperCanvas } from './paper-antetype.js';
import { GDGuideCoordinator } from './GDGuideCoordinator.js';
import { GDEdgeGuideCreator } from './GDGuideCreator.js';


/**
 * Wrapper around intersection observer-API, used for Visible/Invisible in 
 * viewport events
 */
export class GDCellIntersectionObserver {
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
     * @param {Function} fn
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
    counterpart of the Tool in Antetype. Most of the events are transferred
    to the Antetype-classes. 
*/
export class GDTool {
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

export class GDSelectionTool extends GDTool {
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
            else if (e.key == "Enter" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp") {
               e.preventDefault();
            }
        }
    }
}

/**
 * this tool does not transfer everything to Objective-C-side, but handles
 * all for itself. 
 *
 * Work in progress (enable in Develop-Menu)
 */
export class GDNativeSelectionTool extends GDTool {
    constructor(at) {
        super(at);
        this._selectOnMouseUp = false;
    }
    figureToSelectForFigure(f) {
        let parents = f.parents;
        let rootCellParents = parents.filter( p => p.isRootInstanceCell && !p.isScreen && !p.isBasicCell);

        if (rootCellParents.length == 0) return f;

        let rootCellToSelect = rootCellParents[0];
        const widgetIsAlreadySelected = this.at.selectedObjects.filter( c => rootCellToSelect.deepOrderedComponents.indexOf(c) != -1).length > 0;

        if (widgetIsAlreadySelected) return f;

        return rootCellToSelect;
    }

    selectOnMouseUp(f) {
        for (let cell of this.at.selectedObjects) {
            if (!cell.isScreen) {
                if (cell.deepOrderedComponents.indexOf(f) != -1) {
                    return true;
                }
            }
        }
        return false;
    }

    selectFigureForEvent(cell, e) {
        const toggleSelectiom = e.shiftKey || e.metaKey;

        if (toggleSelectiom) {
            const index = this.at.selectedFigures.indexOf(cell);
            const cellIsSelected = index != -1;
            const newSelection = this.at.selectedFigures.slice();

            if (cellIsSelected) {
                newSelection.splice(index,1);
            } else {
                newSelection.push(cell);
            }
            this.at.selectFigures(newSelection);

            const idStrings = this.at.selectedFigures.map( c => c.objectID).join();
            this.at.send("select/" + idStrings);
        } else {
            this.at.selectFigures([cell]);
            this.at.send("select/" + cell.objectID);    
        }
    }

    mouseDragged(e) {
        // only for now:
        if (!targetIDFromEventTarget(e.target)) return;

        let dragTool = new GDNativeFigureDragTool(this.at, e);
        this.at.setCurrentTool(dragTool);
        dragTool.mouseDragged(e);
        
    }

    mouseDown(e) {
        if (e.target && e.target.handle) {
            let handleDragTool = new GDNativeHandleDragTool(this.at,e);
            this.at.setCurrentTool(handleDragTool);
            //handleDragTool.mouseDragged(e);
            return;
        }

        this._selectOnMouseUp = false;
        let targetId = targetIDFromEventTarget(e.target);
        if (targetId) {
            let element = document.getElementById(targetId);
            let cell = element.figure;

            cell = this.figureToSelectForFigure(cell);

            this._selectOnMouseUp = this.selectOnMouseUp(cell);
            if (!this._selectOnMouseUp) {
                this.selectFigureForEvent(cell, e);
            }
        } else if (e.target == this.at.screenElement) {
            this.at.send("select/" + document.body.id);
            let selectionRectTool = new GDNativeSelectionRectTool(this.at, e);
            this.at.setCurrentTool(selectionRectTool);
        }
     }

    mouseUp(e) {
        if (this._selectOnMouseUp) {
            let targetId = targetIDFromEventTarget(e.target);
            if (targetId) {
                let element = document.getElementById(targetId);
                let cell = element.figure;
    
                cell = this.figureToSelectForFigure(cell);
                this.selectFigureForEvent(cell,e);
            }
        }
    }
}

export class GDNativeHandleDragTool extends GDTool {
    constructor(at, event) {
        super(at);
        this.guideCoordinator = new GDGuideCoordinator();
        this.guideCoordinator.addGuideCreator( new GDEdgeGuideCreator());
        this.guideCoordinator.prepareWithSelections(this.at.selectedObjects);

        this.handle = event.target.handle;
        this.handle.startDragAtPoint(this, event.clientX, event.clientY);
        this.originalBounds = this.boundsOfCell(this.handle.owner);

    }

    deactivate() {
        super.deactivate();
        this.guideCoordinator.clearLinesForView(this.at);
    }

    boundsOfCell(cell) {
        return {
            x:  cell.valueForKeyInStateWithIdentifier("x",cell.activeStateIdentifier),
            y: cell.valueForKeyInStateWithIdentifier("y",cell.activeStateIdentifier),
            width: cell.valueForKeyInStateWithIdentifier("width",cell.activeStateIdentifier),
            height: cell.valueForKeyInStateWithIdentifier("height",cell.activeStateIdentifier)
        };
    }

    mouseDragged(e) {
        this.handle.dragged(this, e.clientX, e.clientY);
        this.constrained = e.shiftKey;
        this.centered = e.altKey;
        this.guideCoordinator.updateDisplayedSmartGuidesForView(this.at);
    }

    mouseUp(e) {
        const cell = this.handle.owner;
        const newBounds = this.boundsOfCell(cell);
        let changes = {};
        if (newBounds.x != this.originalBounds.x) changes.x = newBounds.x;
        if (newBounds.y != this.originalBounds.y) changes.y = newBounds.y;
        if (newBounds.width != this.originalBounds.width) changes.width = newBounds.width;
        if (newBounds.height != this.originalBounds.height) changes.height = newBounds.height;

        let changesString = JSON.stringify(changes);
        this.at.send("setBounds/" + changesString);

        this.at.restoreSelectionTool();
    }
}

/**
 * Tool for dragging cells in free-layout. This is part of #1050 (using only native
 * JavaScript for event handling)
 */
export class GDNativeFigureDragTool extends GDTool {
    constructor(at, event) {
        super(at);
        this.guideCoordinator = new GDGuideCoordinator();
        this.guideCoordinator.addGuideCreator( new GDEdgeGuideCreator());
        this.guideCoordinator.prepareWithSelections(this.at.selectedObjects);

        let draggedCell = this.at.selectedObjects[0];
        this.oldX = draggedCell.valueForKeyInStateWithIdentifier("x", draggedCell.activeStateIdentifier);
        this.oldY = draggedCell.valueForKeyInStateWithIdentifier("y", draggedCell.activeStateIdentifier);

        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    activate() {
        this.at.hideHandlesTemporarily();
    }

    deactivate() {
        this.at.showHandlesTemporarily();
        this.guideCoordinator.clearLinesForView(this.at);
    }


    mouseDragged(e) {
        this.guideCoordinator.updateDisplayedSmartGuidesForView(this.at);

        // not sure why, but Event.movementX/Y behaves strange in the WebView, looks like it is somehow scaled ....
        // therefor we calculate it here: 
        let movementX = e.clientX - this.lastX;
        let movementY = e.clientY - this.lastY;
        this.lastX = e.clientX;
        this.lastY = e.clientY;

        let [dx, dy] = this.guideCoordinator.snapDelta(movementX, movementY);
        this.at.selectedObjects.forEach(c => {
            let x = c.valueForKeyInStateWithIdentifier("x", c.activeStateIdentifier);
            let y = c.valueForKeyInStateWithIdentifier("y", c.activeStateIdentifier);

            x += dx;
            y += dy;

            this.at.cellSetPropertyInState(c,"x",x, c.activeState);
            this.at.cellSetPropertyInState(c,"y",y, c.activeState);
        });
    }

    mouseUp(e) {
        let draggedCell = this.at.selectedObjects[0];
        let currentX = draggedCell.valueForKeyInStateWithIdentifier("x", draggedCell.activeStateIdentifier);
        let currentY = draggedCell.valueForKeyInStateWithIdentifier("y", draggedCell.activeStateIdentifier);


        let deltaX = currentX - this.oldX;
        let deltaY = currentY - this.oldY;

        this.at.send(`moveFigures/{"x":${deltaX}, "y":${deltaY}}`);

        this.at.restoreSelectionTool();
    }
}


export class GDFigureDragTool extends GDTool {
    activate() {
        this.at.hideHandlesTemporarily();
    }

    deactivate() {
        this.at.showHandlesTemporarily();
    }
}

export class GDHandleDragTool extends GDTool {
    activate() {
        this.at.hideHandlesTemporarily();
    }

    deactivate() {
        this.at.showHandlesTemporarily();
    }
}


export class GDTextTool extends GDTool {

    // issue 11, little hack to get at least new-lines.
    // We add span inside the normal text span for editing
    // afterwards we change the <div> to <br> ....
    editTextOfFigure(f) {
        var span = this.at.assureTextSpan(f);
        var editSpan = span.contentSpan;
        editSpan.contentEditable = true;
        editSpan.style.webkitUserSelect = "text";
        editSpan.style.minWidth = "1px";    // to see the textcursor
        editSpan.style.pointerEvents= "auto";
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

        if (e.key == "Escape" || e.key == "Cancel") {
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


export class GDVectorTool extends GDTool {

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
        if (e.key == "Escape" || e.key == "Cancel") {
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

/**
 * the tool used while the prototype is running. Handles the whole interaction-stuff. 
 * This is the only tool in LivePreview and WebViewer, in Antetype itself
 * \see GDInplaceRunTool
 */
export class GDRunTool extends GDTool {
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

    keyPress() {
    }
   
    mouseDragged() { }

    domElementsWithEventHandler(eventType) {
        const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, function(e) {
            return e.figure && e.figure.hasActionsOfEventType(eventType) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        });

        let domElement = null;
        let result = [];
        while ((domElement = iterator.nextNode()) != null) {
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

    }

    changePseudoStates(screen) {
        if (screen) {
            screen.deepOrderedComponents.forEach(c => {
                if (c.isRootInstanceCell && c.activeState.isPseudoState) {
                    let normalState = c.widget.states.find(s => s.type == GDState.GDNormalStateType);
                    this.at.changeStateOfCell(c, normalState, "");
                }
            });
        }
    }

    removePointerCursors() {
        const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, 
                e => e.nodeName.toLowerCase() === "cell" && e.figure && Object.keys(e.figure.eventHandlers).length > 0);

        let domElement = null;
        while ((domElement = iterator.nextNode()) != null) {
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
        while ((domElement = iterator.nextNode()) != null) {
            const figure = domElement.figure;

            figure.eventHandlersDo(e => e.cleanup());
        }
    }

    deactivate() {
        this.cleanupActions();
        this.removePointerCursors();
    }

    isRunTool() {
        return true;
    }
    
    unloadEventHandlers() {
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

/**
 * the run tool inside Antetype (In place presentation mode).
 */
export class GDInplaceRunTool extends GDRunTool {

    constructor(at) {
        super(at);
        this._visitedScreens = new Set();
    }

    activate() {
        super.activate();

        // in-place-presentation mode. Run-Tool is either switched while entering 
        // ipp, or after switching to Selection-mode and and back (d/r). Make sure
        // the pseudostates are correctly set, and disable active pseudo-states:

        this.at.enablePseudoStates();

        let screen = this.at.currentScreen;
        this.changePseudoStates(screen);
    }

    deactivate() {
        super.deactivate();
        this.at.disablePseudoStates();
    }

    screenDidChange(newScreen) {
        super.screenDidChange(newScreen);

        if (!this._visitedScreens.has(newScreen)) {
            this.changePseudoStates(newScreen);
            this._visitedScreens.add(newScreen);
        }
    }

    startPresentationMode() {
        this._visitedScreens = new Set();
    }

    stopPresentationMode() {
        this._visitedScreens.forEach(s => this.at.deleteCachedScreenWithObjectID(s.objectID));
    }

}



export class GDSelectionRectTool extends GDTool {

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

export class GDNativeSelectionRectTool extends GDTool {
    constructor(at, event) {
        super(at);
        var r = document.createElement("div");
        r.className = "selectionRect";
        this.selectionRect = r;
        document.body.appendChild(this.selectionRect);
        this.startX = event.clientX;
        this.startY = event.clientY;
    }

    activate() {
        var r = document.createElement("div");
        r.className = "selectionRect";
        this.selectionRect = r;
        document.body.appendChild(this.selectionRect);

        let container = this.at.currentScreen;
        this.bounds = container.orderedComponents.map( cell => { return {'cell': cell, 'bounds': globalBoundsOfElement(cell.DOMElement)}});
    }

    deactivate() {
        if (this.selectionRect.parentNode != null) {
            if(document.body.contains(this.selectionRect)) {
                document.body.removeChild(this.selectionRect);
            }
        }
    }

    mouseDragged(e) {
        const y = Math.min(this.startY, e.clientY) + window.scrollY;
        const x = Math.min(this.startX, e.clientX) + window.scrollX;
        const width = this.startX < e.clientX ? e.clientX - this.startX : this.startX - e.clientX;
        const height = this.startY < e.clientY ? e.clientY - this.startY : this.startY - e.clientY;

        this.selectionRect.style.top = y + "px";
        this.selectionRect.style.left = x + "px";
        this.selectionRect.style.width = width + "px";
        this.selectionRect.style.height = height + "px";

        const selectionBounds = {top: y, left: x, width: width, height: height};
        let intersection = [];
        this.bounds.forEach( b => {
            let cell = b.cell;
            let bounds = b.bounds;

            if (intersectsBounds(bounds, selectionBounds)) {
                intersection.push(cell.objectID);
            }
        });

        this.at.send("select/" + intersection);

        
    }

    mouseUp(e) {
        this.at.restoreSelectionTool();
    }
}

