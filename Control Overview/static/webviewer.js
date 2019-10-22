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
    toggles the toolbar
*/
function toggleToolbar() {
    if (window.toolbarHidden) {
        document.getElementById("ViewerToolbar").style.display = "flex"; 
    } else {
        document.getElementById("ViewerToolbar").style.display = "none"; 
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
}



// messages from the viewer (in the iframe). We have to use postMessage here
// to allow communication even if the prototype is opened directly from the 
// filesystem
window.addEventListener("message", (e) => {
    let selectElement = document.getElementById("ViewerScreenSelect");

    switch (e.data.command) {
        case "buildScreens": 
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
        break;

        case "toggleToolbar": 
            toggleToolbar();
        break;

        case "setTitle": 
            let title = e.data.parameters;
            document.title = title;
            document.getElementById("ViewerDocTitle").innerHTML = title;
        break;

        case "selectScreenWithIndex": 
            if (selectElement) {
                let index = e.data.parameters;
                selectElement.selectedIndex = index;
            }
            break;

        case "updateSpecInspector": 
            let transferObject = e.data.parameters;
            updateSpecInspector(transferObject);


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
        window.toolbarHidden = true;
        document.getElementById("ViewerToolbar").style.display = "none"; 
        document.getElementById("ViewerFrame").style.marginTop = "0px";
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


})
