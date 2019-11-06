"use strict";

/*
 * This file contains the JavaScripts for the web-inspector used in the web-viewer. 
 * See viewer_index_spec.js for the JavaScript of the web-inspector of the main frame
 */





function getOrCreateDiv(identifier) {
    let existing = document.getElementById(identifier);
    if (existing)
        return existing;

    let element = document.createElement("div");
    element.id = identifier;
    document.body.appendChild(element);
    return element;
}

/**
 * given an rgba(...)-value, return the correspinding #-hex notation
 * for the color. If opacity == 0: return 'transparent'.
 */
function rgb2hex(rgba) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(rgba.indexOf("(")+1).split(")")[0].split(sep);

    let r = (+rgba[0]).toString(16),
    g = (+rgba[1]).toString(16),
    b = (+rgba[2]).toString(16),
    a = rgba[3] * 255;

    if (r.length == 1) {
        r = "0" + r;
    } 
    if (g.length == 1) {
        g = "0" + g;
    }
    if (b.length == 1) {
        b = "0" + b;
    }

    // rgb exception
    if (isNaN(a)) {
        a = "";
    } else {
        if (a == 0) {
            return "transparent";
        }
        a = Math.round(a).toString(16); // " " + a + "%";
        if (a.length == 1) {
            a = "0" + a;
        }
    }

    return "#" + r + g + b + a;
}




/**
 *  I am the tool used for Spec-inspector. When the user opens the Spec-inspector in the 
 *  Web Viewer a spec-tool becomes the current tool and listens to the mouse-events to select
 *  cells (and show their properties).  
 */
class GDSpecTool extends  GDTool {
    constructor(at) {
        super(at);

        this._mouseOverHighlight= null;
        this._selectedElementHighlight = null;
        this._selectedElement = null;

        // hide mouse-over if the mouse leaves the browser window
        this._mouseLeaveListener = e => this._mouseOverHighlight.style.display = "none";

        if (window.ResizeObserver) {
            this._resizeObserver = new ResizeObserver( entries => {
                for (let entry of entries) {
                    let r = globalBoundsOfElement(entry.target);
                    sizeHighlightCell(this._selectedElementHighlight, r);
                }
            });
        }
    }

    activatePseudoStates(screen) {
        let cellsWithActivePseudoState = screen.deepOrderedComponents.filter( c => c.isRootInstanceCell && c.activeState.xxxisPseudoState);
        cellsWithActivePseudoState.forEach( c => c.DOMElement.className = this.at.cssClassNameForRootCellInState(c, c.activeState));
    }

    deactivatePseudoStates(screen) {
        let cellsWithActivePseudoState = screen.deepOrderedComponents.filter( c => c.isRootInstanceCell && c.activeState.xxxisPseudoState);
        cellsWithActivePseudoState.forEach( c => {
            let normalState = c.widget.normalState;
            c.DOMElement.className = this.at.cssClassNameForRootCellInState(c, normalState);
        });
    }
    activate() {
        this.at.disablePseudoStates();
        this.activatePseudoStates(this.at.currentScreen);
        this._mouseOverHighlight = getOrCreateDiv("high");
        this._selectedElementHighlight = getOrCreateDiv("high2");
        document.body.addEventListener("mouseleave", this._mouseLeaveListener);
        if (this._selectedElement == null) {
            this.selectElement(document.body);
        }    
    }

    deactivate() {
        if (this._mouseOverHighlight) {
            this._mouseOverHighlight.remove();
        }

        if (this._selectedElementHighlight) {
            this._selectedElementHighlight.remove();
        }
        document.body.removeEventListener("mouseleave", this._mouseLeaveListener);
        this._selectedElement = null;
        this.at.enablePseudoStates();
        this.deactivatePseudoStates(this.at.currentScreen);
    }

    screenWillChange() {
        this.deactivatePseudoStates(this.at.currentScreen);
    }

    screenDidChange(newScreen) {
        this.activatePseudoStates(newScreen);
    }

    targetFromEventTarget(target) {
        if (!target) { 
            return null;
        }

        function isATElement(target) {
            return (target.nodeName.toLowerCase() == "cell" || target.nodeName.toLowerCase() == "body") && target.figure;
        }

        if (isATElement(target)) {
            return target;
        }

        let targetElement = target.parentElement;
        while(targetElement != null && !isATElement(targetElement)) {
            targetElement = targetElement.parentElement;
        }

        return targetElement;
    }



    mouseMove(e) {
        let element = this.targetFromEventTarget(e.target);

        if (element == null) {
            return;
        }

        let bounds = globalBoundsOfElement(element);

        this._mouseOverHighlight = getOrCreateDiv("high");

        this._mouseOverHighlight.style.top = bounds.top + "px";
        this._mouseOverHighlight.style.left = bounds.left + "px";
        this._mouseOverHighlight.style.width = bounds.width + "px";
        this._mouseOverHighlight.style.height = bounds.height + "px";
        this._mouseOverHighlight.style.display = "block";
    }

    mouseClick(e) {
        let element = this.targetFromEventTarget(e.target);
        if (element == null) {
            return;
        }
            
        this.selectElement(element);

    }

    /**
     * selects the given element (HTMLElement but part of Antetype). 
     * Shows the selection rect and sends the properties to the spec-inspector
     */
    selectElement(element) {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver.observe(element);
        }

        this._selectedElement = element;
        let bounds = globalBoundsOfElement(element);

        this._selectedElementHighlight = getOrCreateDiv("high2");
        this._selectedElementHighlight.style.top = bounds.top + "px";
        this._selectedElementHighlight.style.left = bounds.left + "px";
        this._selectedElementHighlight.style.width = bounds.width + "px";
        this._selectedElementHighlight.style.height = bounds.height + "px";
        this._selectedElementHighlight.style.display = "block";

        this.sendStylesToInspector(element);
    }

    /**
     * returns a an object with the various properties displayed in the 
     * Spec-inspector. 
     *
     * @param {HTMLElement} element
     * @returns {Object} transferObject
     */
    getStylesFromElement(element) {
        const elestyle = getComputedStyle(element);
        let fontFamily = elestyle.fontFamily;
        fontFamily = fontFamily.split(',')[0];

        // Firefox has a slightly different way, it looks like it does
        // not supply the combined properties, so we have to do it:
        let flexStyle = elestyle.flex;
        if (flexStyle == "") {
            flexStyle = elestyle.flexGrow + " " + elestyle.flexShrink + " " + elestyle.flexBasis;
        }




        const transferObject = {
            color: rgb2hex(elestyle.color),
            backgroundColor: rgb2hex(elestyle.backgroundColor),
            backgroundImage: elestyle.backgroundImage,

            marginTop: elestyle.marginTop,
            marginBottom: elestyle.marginBottom,
            marginLeft: elestyle.marginLeft,
            marginRight: elestyle.marginRight,

            paddingTop: elestyle.paddingTop,
            paddingBottom: elestyle.paddingBottom,
            paddingLeft: elestyle.paddingLeft,
            paddingRight: elestyle.paddingRight,


            borderTopLeftRadius:  elestyle.borderTopLeftRadius,
            borderTopRightRadius: elestyle.borderTopRightRadius,
            borderBottomRightRadius: elestyle.borderBottomRightRadius,
            borderBottomLeftRadius: elestyle.borderBottomLeftRadius,
            
            width: elestyle.width,
            height: elestyle.height,
            fontFamily: fontFamily,
            fontSize: elestyle.fontSize,
            flex: flexStyle,
            shadow: elestyle.boxShadow,
            opacity: elestyle.opacity,

            borderBottomWidth: elestyle.borderBottomWidth,
            borderBottomStyle: elestyle.borderBottomStyle,
            borderBottomColor: rgb2hex(elestyle.borderBottomColor),

            borderTopWidth: elestyle.borderTopWidth,
            borderTopStyle: elestyle.borderTopStyle,
            borderTopColor: rgb2hex(elestyle.borderTopColor),

            borderLeftWidth: elestyle.borderLeftWidth,
            borderLeftStyle: elestyle.borderLeftStyle,
            borderLeftColor: rgb2hex(elestyle.borderLeftColor),

            borderRightWidth: elestyle.borderRightWidth,
            borderRightStyle: elestyle.borderRightStyle,
            borderRightColor: rgb2hex(elestyle.borderRightColor)
        };


        let cell  = element.figure;
        if (cell) {
            const hor = cell.valueForKeyInStateWithIdentifier("horizontalResizing", cell.activeStateIdentifier);
            const ver = cell.valueForKeyInStateWithIdentifier("verticalResizing", cell.activeStateIdentifier);
            const cl = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", cell.activeStateIdentifier);

            if (hor == GDFlexResizing) {
              transferObject.horV = "Flex";
            } else if (hor == GDFixResizing){
              transferObject.horV ="Manual";
            } else {
              transferObject.horV = "Fit";
            }


            if (ver == GDFlexResizing) {
              transferObject.verV = "Flex";
            } else if (ver == GDFixResizing){
              transferObject.verV ="Manual";
            } else {
              transferObject.verV = "Fit";
            }

            if (cl == GDFixedLayoutPolicyCode) {
              transferObject.clV = "Free";
            } else if (cl == GDAlignmentLayoutPolicyCode) {
              transferObject.clV = "Stacked";
            } else if (cl == GDHorizontalBoxLayoutPolicyCode) {
              transferObject.clV = "Horizontal Flow";
            } else  {
              transferObject.clV = "Vertical Flow";
            }

            const textString = cell.valueForKeyInStateWithIdentifier("textString", cell.activeStateIdentifier);

            transferObject.hasText = textString != undefined && textString.length > 0;
            transferObject.textString = textString;

            const activeLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", cell.activeStateIdentifier);


            if (!activeLayout) {
                transferObject.activeLayout = "none";
            } else {
                const verticalAlignment = cell.valueForKeyInStateWithIdentifier("activeVerticalAlignment", cell.activeStateIdentifier);
                const horizontalAlignment = cell.valueForKeyInStateWithIdentifier("activeHorizontalAlignment", cell.activeStateIdentifier);
                let verticalAlignmentString = "";

                switch (verticalAlignment) {
                    case GDTopAlignment: verticalAlignmentString = "top";
                        break;
                    case GDCenterAlignment: verticalAlignmentString = "center";
                        break;
                    case GDBottomAlignment: verticalAlignmentString = "bottom";
                        break;
                }

                let horizontalAlignmentString = "";

                switch (horizontalAlignment) {
                    case GDLeftAlignment: horizontalAlignmentString = "left";
                        break;
                    case GDCenterAlignment: horizontalAlignmentString = "center";
                        break;
                    case GDRightAlignment: horizontalAlignmentString = "right";
                        break;
                }

                transferObject.activeLayout = `${verticalAlignmentString}/${horizontalAlignmentString}`;

            }


        }

        return transferObject;
    }



    /**
     * get the computed css-styles/properties of the element and send it to 
     * the inspector (in the parentFrame). 
     *
     * @param {HTMLElement} element
     */
    sendStylesToInspector(element) {
        const transferObject = this.getStylesFromElement(element);

        if (window.parent) {
            const command = {command: "updateSpecInspector", 
                parameters: transferObject};
            window.parent.postMessage(command, "*");
        }
    }

    selectContainer() {
        if (this._selectedElement == null) {
            return;
        }

        let parent = this._selectedElement.parentElement;

        let antetypeParentElement = this.targetFromEventTarget(parent);
        if (antetypeParentElement == null) {
            return;
        }

        this.selectElement(antetypeParentElement);
    }

};

// just like the normal tools, but for specification
let specTool = null; 


// since we have to cross frames (and have to work without web server) we send 
// messages between the frames. This are the messages which are called by the main frame. 
window.addEventListener("message", e => {
    if (specTool == null) {
        specTool = new GDSpecTool(Antetype); 
    }
    switch (e.data.command) {
        case "enableSpecTool": Antetype.setCurrentTool(specTool);
            break;

        case "disableSpecTool": Antetype.setCurrentTool(Antetype.runTool);
            break;

        case "selectParent": specTool.selectContainer(); 
            break;

    }

});


