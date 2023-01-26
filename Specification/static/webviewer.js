"use strict"
/*
    This file is used in the index-page of the exported web-viewer. The viewer itself
    is shown in an iframe.
*/


/**
    send command to the iframe-window-object
*/
function sendToViewerFrame(command) {
    let viewerFrame = document.getElementById("ViewerFrame");
    viewerFrame.contentWindow.postMessage(command, "*");
}

/**
    toggles the toolbar. Also updates the height of viewer-iframe and
    viewer-inspector.
*/
function toggleToolbar() {
    if (window.toolbarHidden) {
        document.getElementById("ViewerToolbar").style.display = "flex";
        document.getElementById("ViewerFrame").style.height = "calc(100vh - 35px)";
        document.getElementById("ViewerInspector").style.height = "calc(100vh - 35px)";
    } else {
        document.getElementById("ViewerToolbar").style.display = "none";
        document.getElementById("ViewerFrame").style.height = "100vh";
        document.getElementById("ViewerInspector").style.height = "100vh";
    }
    window.toolbarHidden = !window.toolbarHidden;
}


function toggleInspector() {
    if (window.inspectorHidden) {
        document.getElementById("ViewerInspector").style.display = "flex";
        sendToViewerFrame({command: "enableSpecTool"});
    } else {
        document.getElementById("ViewerInspector").style.display = "none";
        sendToViewerFrame({command: "disableSpecTool"});

    }
    window.inspectorHidden = !window.inspectorHidden;
    this.classList.toggle('toggled-on');
}

/**
 * Updates the IFrame size based on the given screenSize object.
 * This should normally be the current screen right after a screen change
 * @param {Object} screenSize an object containing the (('min'|'max'|'')('width'|'height'))
 */
function updateIFrameProperties(screenSize) {
    const viewer = document.getElementById('ViewerFrame');
    viewer.style.width = screenSize.width + 'px';
    viewer.style.minWidth = screenSize.minHeight + 'px';
    viewer.style.maxWidth = screenSize.maxHeight + 'px';
    viewer.style.height = screenSize.height + 'px';
    viewer.style.minHeight = screenSize.minHeight + 'px';
    viewer.style.maxHeight = screenSize.maxHeight + 'px';
}



// messages from the viewer (in the iframe). We have to use postMessage here
// to allow communication even if the prototype is opened directly from the
// filesystem
window.addEventListener("message", (e) => {
    let selectElement = document.getElementById("ViewerScreenSelect");

    switch (e.data.command) {
        case "buildScreens": {
            let names = e.data.parameters;
            for (let i=0; i<names.length; i++) {
                let option = document.createElement("option");
                option.text = names[i];
                option.value = i;
                selectElement.add(option);
            }

            selectElement.addEventListener("change", function(e) {
                let screenIndex = e.target.value;
                sendToViewerFrame({command: "gotoScreenWithIndex", parameters: screenIndex});
            });
        }
        break;

        case "toggleToolbar":
            toggleToolbar();
        break;

        case "setTitle": {
            let title = e.data.parameters;
            document.title = title;
            document.getElementById("ViewerDocTitle").innerHTML = title;
        }
        break;

        case "selectScreenWithIndex":
            if (selectElement) {
                let index = e.data.parameters.index;
                selectElement.selectedIndex = index;

                // to support the back-button (see onpopstate below)
                history.pushState({screenID: e.data.parameters.objectID}, "");
            }
            break;

        case "updateSpecInspector": {
            let transferObject = e.data.parameters;
            updateSpecInspector(transferObject);
        }
        break;

        case "updateIFrame":
            updateIFrameProperties(e.data.parameters);
        break;
    }
});


window.addEventListener("keypress", function(e) {
    if (e.key === "t") {
        toggleToolbar();
    }
});

window.addEventListener("keydown", function(e) {
    if (e.key === "Alt") {
        sendToViewerFrame({command: "showInteractions"});
    }
});

window.addEventListener("keyup", function(e) {
    if (e.key === "Alt") {
        sendToViewerFrame({command: "hideInteractions"});
    }
});


window.addEventListener("load", function(e) {
    document.getElementById("ViewerPrevButton").addEventListener("click", () => sendToViewerFrame({command: "gotoPreviousScreen"}));
    document.getElementById("ViewerNextButton").addEventListener("click", () => sendToViewerFrame({command: "gotoNextScreen"}));

    document.getElementById("ViewerFullScreenButton").addEventListener("click", function() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }

            if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

            if (document.mozExitFullscreen) {
                document.mozExitFullscreen();
            }

            return;
        }



        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        }
        if (document.body.webkitRequestFullscreen) {
            document.body.webkitRequestFullscreen();
        }

        if (document.body.mozRequestFullScreen) {
            document.body.mozRequestFullScreen();
        }
    });

    document.getElementById("ViewerHideButton").addEventListener("click", function() {
        toggleToolbar();
    });

    let highlightShown = false;
    document.getElementById("ViewerInteractionButton").addEventListener("mousedown", function() {
        if (highlightShown)
            return;
        highlightShown = true;
        sendToViewerFrame({command: "showInteractions"});
    });

    document.getElementById("ViewerInteractionButton").addEventListener("mouseup", function() {
        sendToViewerFrame({command: "hideInteractions"});
        highlightShown = false;
    });


    document.getElementById("ViewerInspectorButton").addEventListener("click", toggleInspector);
    window.inspectorHidden = true;

    document.getElementById("ViewerResizeModeButton").addEventListener("click", function() {
        this.classList.toggle('toggled-on');
        document.getElementById('ViewerFrame').classList.toggle('not-resize-able');
    });

    // Issue #336: open another screen (not the first on)
    // get screen index from URL and switch to the given screen: 
    // simply a # followed by the screen-number (starting by 1)
    // or use the identifier (visible in the style inspector: #id9837473)
    const hash = document.location.hash;
    if (hash && hash.length > 1) {
        let screenIndex = Number.parseInt(hash.substr(1));

        if (!isNaN(screenIndex)) {
            sendToViewerFrame({command: "gotoScreenWithIndex", parameters: screenIndex-1});
        } else {
            // try it as an ID:
            sendToViewerFrame({command: "gotoScreenWithID", parameters: hash.substr(1)})
        }
    }

    window.onpopstate = e => {
        if (e.state.screenID && e.state.screenID.length > 1) {
            let screenID = e.state.screenID;
            sendToViewerFrame({command: "gotoScreenWithID", parameters: screenID})
        }
    };
})
