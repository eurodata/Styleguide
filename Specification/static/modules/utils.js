"use strict";

/*
    a event target is not necessarily the element we are interested in Antetype 
    (for example a Antetype-cell might consists of multiple DOM-Element). 
    This function return the id of the toplevel-Antetype-cell 
*/
export function targetIDFromEventTarget(target) {
    if (!target) {
        return undefined;
    }

    let targetID = undefined;

    // if target is not an Antetype cell go up until we find one. Currently used in text or vector. 
    if (target.nodeName.toLowerCase() != "cell") {
        let targetElement = target.parentElement;
        while (targetElement != null && targetElement.nodeName.toLowerCase() != "cell") {
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
export function transferEvent(e) {
    var targetID = targetIDFromEventTarget(e.target);
    var handle;
    if (e.target) {
        if (e.target.atHandle) {
            var atHandle = e.target.atHandle;
            handle = { "ownerID": atHandle.ownerWebID(), "keyPath": atHandle.keyPath() };
        }
    }

    var d = {
        "shiftKey": e.shiftKey, "ctrlKey": e.ctrlKey, "altKey": e.altKey, "metaKey": e.metaKey,
        "target": targetID, "handle": handle, "screenX": e.screenX, "screenY": e.screenY,
        "clientX": e.clientX, "clientY": e.clientY, "offsetX": e.offsetX, "offsetY": e.offsetY
    };

    if (e.dataTransfer) {
        var data = {};
        for (var i = 0; i < e.dataTransfer.types.length; i++) {
            var type = e.dataTransfer.types[i];
            var typeData = e.dataTransfer.getData(type);
            data[type] = typeData;
            data["effectAllowed"] = e.dataTransfer.effectAllowed;
            data["dropEffect"] = e.dataTransfer.dropEffect;
        }
        d["dataTransfer"] = { "data": data };
    }

    return d;
}



// we use contentEditable for editing, but only want <br> as newlines in our text
// this function tries to convert the mixture of <div> and <br>'s from the contentEditable-edit-span
// to our format. Quiet a mess, but I don't see a pattern when Safari decides to use a <div> or a <br>
export function stringFromContentEditable(element) {
    if (element == undefined)
        return "";

    let newText = element.innerHTML;

    if (newText == "<br>") {
        return "";
    }

    newText = newText.replace(/<div><br><\/div>/g, "<br>");     // #552 a single return in the first line is converted as <div><br></div> ..
    newText = newText.replace(/<div>/g, "<br>");
    newText = newText.replace(/<\/div>/g, "");
    return newText;
}

/**
 * getBoundingClientRect() but take window.offsetX/Y into account
 * 
 * @param {HTMLElement} DOMElement the element to measure
 * @returns {Object} the bounds (top,left,with,height)
 */
export function globalBoundsOfElement(DOMElement) {
    var r = DOMElement.getBoundingClientRect();
    var offsetX = window.scrollX;
    var offsetY = window.scrollY;

    return { top: r.top + offsetY, left: r.left + offsetX, width: r.width, height: r.height };
}

export function intersectsBounds(b1, b2) {
    if (b1.width <= 0 || b1.height <= 0 || b2.width <= 0 || b2.height <= 0) {
        return false;
    }

    let x1 = Math.max(b1.left, b2.left);
    let x2 = Math.min(b1.left + b1.width, b2.left + b2.width);
    let y1 = Math.max(b1.top, b2.top);
    let y2 = Math.min(b1.top + b1.height, b2.top + b2.height);
    return x1 < x2 && y1 < y2;
}

export const GDZeroRect = { top: 0, left: 0, width: 0, height: 0 };
export function GDEqualRects(a, b) {
    return a.top == b.top && a.left == b.left && a.width == b.width && a.height == b.height;
}

/**
 * changes the size of the 'highlight'-div acccording to the given bounds
 * 
 * @param {HTMLElement} highlight the div for the highlight
 * @param {Object} bounds the new bounds (top,left,width, height)
 */
export function sizeHighlightCell(highlight, bounds) {
    
    highlight.style.width = `calc(${bounds.width}px*var(--current-zoom))`;
    highlight.style.height = `calc(${bounds.height}px*var(--current-zoom))`;
    highlight.style.top = bounds.top + "px";
    highlight.style.left = bounds.left + "px";
}


/**
 * Post messages to iOS-viewer
 */
export function gdPostViewerMessage(msg, params) {
    if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.antetypeFinishedLoadingHandler && window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage) {
        if (params == undefined) {
            params = {};
        }

        var command = { "command": msg, "parameters": params };
        window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage(command)
    }
}


/**
    if cell's container is of the same widget we use the state, otherwise
    use the activeState. This is more complicated in the case of breakpoints. 
    Here we cannot rely on the "active-state" to be the one we need and furthermore
    the container-widget might have different breakpoint-states enabled...

    See #1024 for the discussion

*/
export function currentContainerStateIdentifier(cell, stateIdentifier) {
    const container = cell.container;
    if (container == undefined) {
        return undefined;
    }

    if (container.widget && container.widget == cell.widget) {
        return stateIdentifier;
    }

    const state = cell.project.stateWithIdentifier(stateIdentifier);
    const containerState = cell.project.stateWithIdentifier(container.activeStateIdentifier);
    const containerBreakPointStates = containerState.breakPointStates();

    if (state.designBreakPoint()) {
        // if the current state is a breakpoint-state find the right state in the container widget:
        let containerStateInBreakPoint = containerBreakPointStates[0];
        for (let i = 0; i < containerBreakPointStates.length - 1; i++) {
            const containerState = containerBreakPointStates[i];
            if (containerState.designBreakPoint() && containerState.designBreakPoint().breakPointMaxWidth <= state.designBreakPoint().breakPointMaxWidth) {
                containerStateInBreakPoint = containerState;
            }
        }
        if (containerStateInBreakPoint) {
            return containerStateInBreakPoint.identifier;
        }
    } else if (containerState.designBreakPoint()) {
        // if the active-container state is a breakpoint state, but the current state not, we find 
        // the state in the "default"-breakpoint:
        const stateInDefaultBreakPoint = containerBreakPointStates[containerBreakPointStates.length - 1];
        return stateInDefaultBreakPoint.identifier;
    }

    return container.activeStateIdentifier;
}
