import { globalBoundsOfElement } from './utils.js';

function addHandleListener(handleId, handler) {
    let handle = document.getElementById(handleId);
    let iframe = document.getElementById("screenframe");

    handle.addEventListener("mousedown", () => {
        let bounds = globalBoundsOfElement(iframe);
        let width = bounds.width;
        let height = bounds.height;
        const maxWidth = window.Antetype.currentScreen.getProperty("maximumWidth");
        const minWidth = window.Antetype.currentScreen.getProperty("minimumWidth");
        const maxHeight = window.Antetype.currentScreen.getProperty("maximumHeight");
        const minHeight = window.Antetype.currentScreen.getProperty("minimumHeight");
        const currentZoom = window.Antetype.currentZoom;

        iframe.style.pointerEvents = "none";    // otherwise we stop receiving events if the cursor is above the iframe

        const mouseMoveHandler = (e) => {

            const result = handler({ movementX: e.movementX / currentZoom, movementY: e.movementY / currentZoom }, width, height);
            height = result.height || height;
            width = result.width || width;

            if (height < minHeight) {
                height = minHeight;
            }

            if (height > maxHeight) {
                height = maxHeight;
            }

            if (width < minWidth) {
                width = minWidth;
            }

            if (width > maxWidth) {
                width = maxWidth;
            }

            window.updateScreenBounds({ 'width': width, 'height': height });
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        const mouseUpHandler = (e) => {
            iframe.style.pointerEvents = "unset";
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
            window.Antetype.sendCommand("setScreenSize", { "width": width, "height": height });
        };
        document.addEventListener("mouseup", mouseUpHandler);
    })
}


window.addEventListener("load", (e) => {
    let iframe = document.getElementById("screenframe");
    iframe.src = document.location.pathname.replace(
        "drawing-board",
        "index_in_at"
    );

    addHandleListener("bottom-right-handle", (e, width, height) => {
        return {
            height: height + e.movementY * 2,
            width: width + e.movementX * 2
        }
    });

    addHandleListener("bottom-center-handle", (e, width, height) => {
        return {
            height: height + e.movementY * 2,
        }
    });

    addHandleListener("bottom-left-handle", (e, width, height) => {
        return {
            height: height + e.movementY * 2,
            width: width - e.movementX * 2
        }
    });

    addHandleListener("left-center-handle", (e, width, height) => {
        return {
            width: width - e.movementX * 2
        }
    });

    addHandleListener("top-left-handle", (e, width, height) => {
        return {
            height: height - e.movementY * 2,
            width: width - e.movementX * 2
        }
    });

    addHandleListener("top-center-handle", (e, width, height) => {
        return {
            height: height - e.movementY * 2
        }
    });

    addHandleListener("right-center-handle", (e, width, height) => {
        return {
            width: width + e.movementX * 2
        }
    });

    addHandleListener("top-right-handle", (e, width, height) => {
        return {
            height: height - e.movementY * 2,
            width: width + e.movementX * 2
        }
    });

});

// called from the screen-frame to adjust the size of the screen.
window.updateScreenBounds = function (bounds) {
    const rootStyle = document.styleSheets[0].cssRules[0].style;
    let width = bounds.width;
    let height = bounds.height;

    rootStyle.setProperty("--screenHeight", height + "px");
    rootStyle.setProperty("--screenWidth", width + "px");
}

// called by Antetype to to get the "global Bounds" of an element (for popovers)
// relative to the viewport
window.globalBoundsOfFigureWithId = function (id) {
    let iFrameBounds = document.getElementById('screenframe').getBoundingClientRect();
    let zoom = window.Antetype.currentZoom;
    let e = window.Antetype.getElementById(id);
    let r = e.getBoundingClientRect();

    let y = (r.y + iFrameBounds.y) * zoom;
    let x = (r.x + iFrameBounds.x) * zoom;

    return { 'x': x, 'y': y, 'width': r.width * zoom, 'height': r.height * zoom };
}

// called by Antetype to get the "global bounds" of an element relative to the 
// drawing-board-document. (for createPDFWithConfiguration…, getting an image) 
window.rectOfFigureWithId = function (id) {
    let iFrameBounds = document.getElementById('screenframe').getBoundingClientRect();
    iFrameBounds.x += window.scrollX;
    iFrameBounds.y += window.scrollY;

    let e = window.Antetype.getElementById(id);
    let r = e.getBoundingClientRect();
    let zoom = window.Antetype.currentZoom;

    let y = (r.y + iFrameBounds.y) * zoom;
    let x = (r.x + iFrameBounds.x) * zoom;

    return { 'x': x, 'y': y, 'width': r.width * zoom, 'height': r.height * zoom };
}

window.visualViewport.addEventListener("resize", (event) => {
    if (event.target.scale < 1) {
        //TODO: currently we center below 100% but we have to use the pinch-position
        // Here we don't have it ... maybe send with "startPinch"? 
        document.body.style.width = `calc(100%/${event.target.scale})`;
        document.body.style.height = `calc(100%/${event.target.scale})`;
    } else {
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("height");
    }

});

// called by antetype to center the screen:
window.centerScreen = function () {
    document.getElementById("screenframe").scrollIntoView({ block: "center", inline: "center" });
}

// called by Antetype before it changes the magnification with Fit-to-window
// on resize (the magnification was changed) we make sure that the sceen 
// is centered.
window.startFitToWindow = function () {
    const resizeHandler = (e) => {
        window.centerScreen();
        window.visualViewport.removeEventListener("resize", resizeHandler);
    }

    window.visualViewport.addEventListener("resize", resizeHandler);
}