import { transferEvent, globalBoundsOfElement, sizeHighlightCell } from './utils.js';
import { GDLiveLayouter } from './livelayouter.js';
/**
 * sends the dragging-events from the browser to Antetype. (like with the tools)
 */
export class GDDragHandler {
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
GDDragHandler.NSDragOperationEvery  = -1; //NSUIntegerMax, 


export class GDCellDragHandler extends GDDragHandler {
    constructor(at) {
        super(at);
        this._liveLayouter = new GDLiveLayouter(at);
    }
    possibleDragOperations(e) {
        for (let i=0; i<e.dataTransfer.types.length; i++) {
            const type = e.dataTransfer.types[i];
            if (type == GDCellDragType) {
                return GDDragHandler.NSDragOperationEvery;
            }

        }
        return GDDragHandler.NSDragOperationNone;    
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

export class GDRubberbandDragHandler extends GDDragHandler {
    possibleDragOperations(e) {
        for (let i=0; i<e.dataTransfer.types.length; i++) {
            const type = e.dataTransfer.types[i];
            if (type == GDRubberbandPassengerPBoardType) {
                return GDDragHandler.NSDragOperationLink;
            }
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

    elementsFromPoint(x,y) {
        const allElements = document.elementsFromPoint(x,y);
        let allFigures = allElements.filter( e => e.figure != undefined && !e.figure.isScreen );
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
           this._at.send("/rubberBandSelectFigureWithID/" + f.figure.objectID);
        }
        this.removeHighlighter(); 
    }



}

export const GDCellDragType = "application/cellid";
export const GDRubberbandPassengerPBoardType = "com.antetype.GDRubberbandPassenger";
