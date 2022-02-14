import { transferEvent, globalBoundsOfElement, sizeHighlightCell } from './utils.js';
import { GDLiveLayouter } from './livelayouter.js';
/**
 * sends the dragging-events from the browser to Antetype. (like with the tools)
 */
export class GDDragHandler {
    constructor(at) {
        this._at = at;
    }



    dragEnter(dragEvent) {
    }

    dragLeave(dragEvent) {
    }

    dragExit(dragEvent) {
    }

    dragOver(dragEvent) {
    }

    drop(dragEvent) {
    }

    /**
     * Called on drag enter to find the drag-handler for the drag. The first handler which
     * returns something different then GDDragHandler.NSDragOperationNone is choosen to handle the
     * drag
     * 
     * @param {DragEvent} dragEvent 
     * @returns drag-operation (GDDragHandler.NSDragOperation…)
     */
    possibleDragOperations(dragEvent) {
        return GDDragHandler.NSDragOperationNone;    // for now ...
    }
}

/**
 * This drag-handler is used in the old WebView. It simply forwards all methods
 * to the corresponding Cocoa-objects. Not used anymore in the WKWebView.
 * 
 * Remove it, once the transition is complete
 */
export class GDTransferDragHandler extends GDDragHandler {
    constructor(at) {
        super(at);
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

    dragLeave() {
    }

    dragExit() {
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
            var cocoaOperation = window.workingAreaView.webDrop(transferEvent(e));
            e.dataTransfer.dropEffect = this.cocoaOperationToWeb(cocoaOperation);
            this._started = false;
        }
    }

    /**
     * Called on drag enter to find the drag-handler for the drag. The first handler which
     * returns something different then GDDragHandler.NSDragOperationNone is choosen to handle the
     * drag
     * 
     * @param {DragEvent} e 
     * @returns drag-operation (GDDragHandler.NSDragOperation…)
     */
    possibleDragOperations(e) {
        return GDDragHandler.NSDragOperationEvery;    // for now ...
    }

}

GDDragHandler.NSDragOperationNone = 0;
GDDragHandler.NSDragOperationCopy = 1;
GDDragHandler.NSDragOperationLink = 2;
GDDragHandler.NSDragOperationGeneric = 4;
GDDragHandler.NSDragOperationPrivate = 8;
GDDragHandler.NSDragOperationMove = 16;
GDDragHandler.NSDragOperationDelete = 32;
GDDragHandler.NSDragOperationEvery = -1; //NSUIntegerMax, 


export class GDCellDragHandler extends GDDragHandler {
    constructor(at) {
        super(at);
        this._liveLayouter = new GDLiveLayouter(at);
    }
    possibleDragOperations(e) {
        return e.dataTransfer.types.includes(GDCellDragType) ? GDDragHandler.NSDragOperationEvery : GDDragHandler.NSDragOperationNone;
    }

    dragEnter(e) {
        // let data = e.dataTransfer.getData(GDCellDragType);
        // let figure = document.getElementById(data).figure;

        // due to security we can not access the data (only on drop),
        // for now store the cells in the tool ... 
        let draggedFigures = this._at.currentTool.draggedFigures;
        this._liveLayouter.setPassengers(draggedFigures, e);
        return GDDragHandler.NSDragOperationMove;
    }

    dragOver(e) {
        this._liveLayouter.layoutForDraggingInfo(e);
        return GDDragHandler.NSDragOperationMove;
    }
}

/**
 * The rubberband-feature is implemented as a Cocoa drag'n'drop. This handler is used
 * to highlight the cell under the cursor and send the id of the cell to antetype on "drop"
 * (the user releases the mouse-button)
 */
export class GDRubberbandDragHandler extends GDDragHandler {
    possibleDragOperations(e) {

        // for old WebView:
        if (e.dataTransfer.types.includes(GDRubberbandPassengerPBoardType)) {
            return GDDragHandler.NSDragOperationLink;
        }

        // for WKWebView:
        if (e.dataTransfer.types.length == 1 && e.dataTransfer.types[0] == "text/uri-list") {
            return GDDragHandler.NSDragOperationLink;
        }

        return GDDragHandler.NSDragOperationNone;
    }

    showHilighter() {
        if (this._highlighter) return;
        this._highlighter = document.createElement("div");
        this._highlighter.className = "rubberbandrect";
        document.body.appendChild(this._highlighter);
    }

    removeHighlighter() {
        if (!this._highlighter) return;
        this._highlighter.remove();
        delete this._highlighter;
    }

    dragEnter(e) {
        e.preventDefault();
        const allFigures = this.elementsFromPoint(e.pageX, e.pageY);
        if (allFigures.length > 0) {
            const f = allFigures[0];
            let b = globalBoundsOfElement(f);
            this.showHilighter();
            sizeHighlightCell(this._highlighter, b);
        } else {
            this.removeHighlighter();
        }

    }

    elementsFromPoint(x, y) {
        const allElements = document.elementsFromPoint(x, y);
        let allFigures = allElements.filter(e => e.figure != undefined && !e.figure.isScreen);
        return allFigures;
    }

    dragLeave() {
        // at least webkit has the order: dragenter → dragleave → dragover
        // we cannot remove the hihlighter on leave, because we would remove the new one
        // or should we store the target? 
        this._removeTimout = window.setTimeout(() => { this.removeHighlighter() }, 10);
    }

    dragOver(e) {
        e.preventDefault();
        window.clearTimeout(this._removeTimout);    // see above in dragLeave
    }

    drop(e) {
        const allFigures = this.elementsFromPoint(e.pageX, e.pageY);
        if (allFigures.length > 0) {
            const f = allFigures[0];
            this._at.sendCommand("rubberBandSelectFigureWithID", { 'cellID': f.figure.objectID });
        }
        this.removeHighlighter();
    }
}

/**
 * used for drops of image files from macOS. 
 */
export class GDFileDragHandler extends GDDragHandler {
    constructor(at) {
        super(at);
        this._highlightDiv = null;
    }

    possibleDragOperations(e) {
        return e.dataTransfer.types.includes("Files") ? GDDragHandler.NSDragOperationCopy : GDDragHandler.NSDragOperationNone;
    }


    allowedType(type) {
        return ["image/png", "image/gif", "image/jpeg", "image/svg+xml"].indexOf(type) != -1;
    }

    dragEnter(e) {
        this.addHighlightDiv();
    }

    addHighlightDiv() {
        this._highlightDiv = document.createElement("div");
        this._highlightDiv.className = "highlightrect";
        this._highlightDiv.style.top = "0px";
        this._highlightDiv.style.left = "0px";
        this._highlightDiv.style.width = this._at.currentScreen.getProperty("width") + "px";
        this._highlightDiv.style.height = this._at.currentScreen.getProperty("height") + "px";

        this._at.screenElement.appendChild(this._highlightDiv);
    }

    removeHighlightDiv() {
        if (this._highlightDiv) {
            this._highlightDiv.remove();
            this._highlightDiv = null;
        }
    }

    dragExit(e) {
        this.removeHighlightDiv();
    }

    dragLeave(e) {
        this.removeHighlightDiv();
    }

    drop(e) {
        e.preventDefault();
        this.removeHighlightDiv();
        const files = e.dataTransfer.files;

        for (let file of files) {
            if (!this.allowedType(file.type)) {
                continue;
            }

            this._at.sendCommand("setPositionOfDroppedElement", { x: e.pageX, y: e.pageY });

            const reader = new FileReader();
            reader.onload = () => this._at.sendFile(file.name, file.type, reader.result);
            reader.readAsArrayBuffer(file);
        }
    }
}

export const GDCellDragType = "application/cellid";
export const GDRubberbandPassengerPBoardType = "com.antetype.GDRubberbandPassenger";
