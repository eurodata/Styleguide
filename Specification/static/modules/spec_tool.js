"use strict";

import { GDTool } from './tools.js';
import { globalBoundsOfElement } from './utils.js';
import { GDFlexResizing, GDFixResizing, GDFixedLayoutPolicyCode, GDAlignmentLayoutPolicyCode,
    GDHorizontalBoxLayoutPolicyCode, GDTopAlignment, GDCenterAlignment, GDBottomAlignment,
    GDLeftAlignment, GDRightAlignment, GDMaxSizeValue, GDState } from './model.js';


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
export function rgb2hex(rgba) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(rgba.indexOf("(") + 1).split(")")[0].split(sep);

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
 *
 *  See viewer_index_spec.js for the JavaScript of the main-frame (displaying the spec inspector).
 */
export class GDSpecTool extends GDTool {
    constructor(at) {
        super(at);

        this._mouseOverHighlight = null;
        this._selectedElementHighlight = null;
        this._selectedElement = null;
        this._updateMarkerID = null;
        this._mouseOverElement = null;



        // hide mouse-over if the mouse leaves the browser window
        this._mouseLeaveListener = () => this._mouseOverHighlight.style.display = "none";

    }

    stateHandledByBrowser(state) {
        return state.type == GDState.GDMouseOverStateType
        || state.type == GDState.GDPressedStateType
        || state.type == GDState.GDFocusStateType;
    }

    activatePseudoStates(screen) {
        let cellsWithActivePseudoState = screen.deepOrderedComponents.filter(c => c.isRootInstanceCell && this.stateHandledByBrowser(c.activeState));
        cellsWithActivePseudoState.forEach(c => c.DOMElement.className = this.at.cssClassNameForRootCellInState(c, c.activeState));
    }

    deactivatePseudoStates(screen) {
        let cellsWithActivePseudoState = screen.deepOrderedComponents.filter(c => c.isRootInstanceCell && this.stateHandledByBrowser(c.activeState));
        cellsWithActivePseudoState.forEach(c => {
            let normalState = c.widget.normalState;
            c.DOMElement.className = this.at.cssClassNameForRootCellInState(c, normalState);
        });
    }

    addMeasureElements() {
        // Tims measures;
        if (!document.getElementById("measure-horiz")) {
            let measureHor = document.createElement("div");
            measureHor.id = "measure-hor";
            measureHor.innerHTML = '<div id = "measure-hor-number"> xxx</div><div id="measure-hor-line"></div>';
            document.body.appendChild(measureHor);

            let measureHor2 = document.createElement("div");
            measureHor2.id = "measure-hor2";
            measureHor2.innerHTML = '<div id = "measure-hor2-number"> xxx</div><div id="measure-hor2-line"></div>';
            document.body.appendChild(measureHor2);

            let measureVert = document.createElement("div");
            measureVert.id = "measure-vert";
            measureVert.innerHTML = '<div id = "measure-vert-number"> xxx</div><div id="measure-vert-line"></div>';
            document.body.appendChild(measureVert);

            let measureVert2 = document.createElement("div");
            measureVert2.id = "measure-vert2";
            measureVert2.innerHTML = '<div id = "measure-vert2-number"> xxx</div><div id="measure-vert2-line"></div>';
            document.body.appendChild(measureVert2);
        }
    }

    removeMeasureElements() {
        window.cancelAnimationFrame(this._updateMarkerID);
        document.getElementById("measure-hor").remove();
        document.getElementById("measure-hor2").remove();
        document.getElementById("measure-vert").remove();
        document.getElementById("measure-vert2").remove();

        const guidesVertical = document.getElementById("guides-vertical");
        if (guidesVertical)
            guidesVertical.remove();

        const guidesHorizontal = document.getElementById("guides-horziontal");
        if (guidesHorizontal)
            guidesHorizontal.remove();

    }


    activate() {
        this.addMeasureElements();
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
        this.removeMeasureElements();
    }

    screenWillChange() {
        this.deactivatePseudoStates(this.at.currentScreen);
        this.removeMeasureElements();
    }

    screenDidChange(newScreen) {
        this.activatePseudoStates(newScreen);
        this.addMeasureElements();
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
        while (targetElement != null && !isATElement(targetElement)) {
            targetElement = targetElement.parentElement;
        }

        return targetElement;
    }



    mouseMove(e) {
        let element = this.targetFromEventTarget(e.target);

        if (element == null) {
            return;
        }

        this._mouseOverElement = element;

        this.showMeasures(element);
    }

    showMeasures(element) {
        let bounds = globalBoundsOfElement(element);
        this._mouseOverHighlight = getOrCreateDiv("high");
        this._mouseOverHighlight.style.top = bounds.top + "px";
        this._mouseOverHighlight.style.left = bounds.left + "px";
        this._mouseOverHighlight.style.width = bounds.width + "px";
        this._mouseOverHighlight.style.height = bounds.height + "px";
        this._mouseOverHighlight.style.display = "block";
        let selected = globalBoundsOfElement(this._selectedElementHighlight);



        let selectedLeft = selected.left;
        let selectedWidth = selected.width;
        let selectedTop = selected.top;
        let selectedHeight = selected.height;
        let mouseOverLeft = bounds.left;
        let mouseOverWidth = bounds.width;
        let mouseOverTop = bounds.top;
        let mouseOverHeight = bounds.height;


        let measureHor = document.getElementById("measure-hor");
        let measureHorBounds = globalBoundsOfElement(measureHor);
        let measureHor2 = document.getElementById("measure-hor2");
        let measureHor2Bounds = globalBoundsOfElement(measureHor2);
        let measureVert = document.getElementById("measure-vert");
        let measureVertBounds = globalBoundsOfElement(measureVert);
        let measureVert2 = document.getElementById("measure-vert2");
        let measureVert2Bounds = globalBoundsOfElement(measureVert2);
        let measureHorHeight = measureHorBounds.height;
        let measureHor2Height = measureHor2Bounds.height;
        let measureVertWidth = measureVertBounds.width;
        let measureVert2Width = measureVert2Bounds.width;
        let measureVertNumber = document.getElementById("measure-vert-number");
        let measureVert2Number = document.getElementById("measure-vert2-number");
        let measureHorNumber = document.getElementById("measure-hor-number");
        let measureHor2Number = document.getElementById("measure-hor2-number");

        let selectedStyles = getComputedStyle(this._selectedElement);
        let selectedLeftBorder = parseInt(selectedStyles.borderLeftWidth);
        let selectedRightBorder = parseInt(selectedStyles.borderRightWidth);
        let selectedTopBorder = parseInt(selectedStyles.borderRightWidth);
        let selectedBottomBorder = parseInt(selectedStyles.borderBottomWidth);

        let mouseOverStyles = getComputedStyle(element);
        let mouseOverLeftBorder = parseInt(mouseOverStyles.borderLeftWidth);
        let mouseOverRightBorder = parseInt(mouseOverStyles.borderRightWidth);
        let mouseOverTopBorder = parseInt(mouseOverStyles.borderRightWidth);
        let mouseOverBottomBorder = parseInt(mouseOverStyles.borderBottomWidth);

        // let selectedBorderHor = selectedLeftBorder + selectedRightBorder;
        // let selectedBorderVert = selectedTopBorder + selectedBottomBorder;

        //Measures Horizontal
        if (mouseOverLeft - (selectedLeft + selectedWidth) > 0) {
            // Mouse over element is to the right of the selected element
            measureHor.style.display = "flex";
            measureHor2.style.display = "none";
            measureHor.style.left = (selectedLeft + selectedWidth) + "px";
            measureHor.style.width = (mouseOverLeft - (selectedLeft + selectedWidth)) + "px";
            measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
            let measureNumber = document.getElementById("measure-hor-number");
            measureNumber.innerHTML = Math.round((mouseOverLeft - (selectedLeft + selectedWidth)));
            measureVert.style.display = "none";
            measureVert2.style.display = "none";




            // if (Number.isNaN(borderHorSelected) == false)  {
            //   console.log(styles);
            // }
        }
        else if (mouseOverLeft <= selectedLeft && (mouseOverLeft + mouseOverWidth) >= (selectedLeft + selectedWidth)) {
            // Mouse over element is bigger:  left is smaller and  right is larger than the selected element
            measureHor.style.display = "flex";
            measureHor.style.left = mouseOverLeft + "px";
            measureHor.style.width = (selectedLeft - mouseOverLeft) + "px";
            measureHor.style.top = selectedTop + (selectedHeight / 2) - measureHorHeight + "px";
            let measureNumber = document.getElementById("measure-hor-number");
            measureNumber.innerHTML = Math.round((selectedLeft - mouseOverLeft - mouseOverLeftBorder));
            measureHor2.style.display = "flex";
            measureHor2.style.left = (selectedLeft + selectedWidth) + "px";
            measureHor2.style.width = ((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)) + "px";
            measureHor2.style.top = selectedTop + (selectedHeight / 2) - measureHor2Height + "px";
            let measureNumber2 = document.getElementById("measure-hor2-number");
            measureNumber2.innerHTML = Math.round(((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)  - mouseOverRightBorder));
            // if (selectedLeft > mouseOverLeft) {
            //   measureHor.style.display = "none";
            //   measureHor2.style.display = "none";
            // }
        }
        else if (selectedLeft <= mouseOverLeft && (mouseOverLeft + mouseOverWidth) <= (selectedLeft + selectedWidth)) {
            // Mouse over element is smaller: left is bigger and right is smaller than the selected element
            measureHor.style.display = "flex";
            measureHor.style.left = selectedLeft + "px";
            measureHor.style.width = (mouseOverLeft - selectedLeft) + "px";
            measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
            let measureNumber = document.getElementById("measure-hor-number");
            measureNumber.innerHTML = Math.round((mouseOverLeft - selectedLeft - selectedLeftBorder));
            measureHor2.style.display = "flex";
            measureHor2.style.left = (mouseOverLeft + mouseOverWidth) + "px";
            measureHor2.style.width = ((selectedLeft + selectedWidth) - (mouseOverLeft + mouseOverWidth)) + "px";
            measureHor2.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHor2Height + "px";
            let measureNumber2 = document.getElementById("measure-hor2-number");
            measureNumber2.innerHTML = Math.round(((selectedLeft + selectedWidth) - (mouseOverLeft + mouseOverWidth)) - selectedRightBorder);
            // if (selectedLeft <= mouseOverLeft) {
            //   measureHor.style.display = "none";
            //   measureHor2.style.display = "none";
            // }
        }
        else if (selectedLeft <= mouseOverLeft && (mouseOverLeft + mouseOverWidth) >= (selectedLeft + selectedWidth)) {
            // left and right egde of mouse over is bigger
            measureHor.style.display = "none";
            // measureHor.style.left = selectedLeft + "px";
            // measureHor.style.width = (mouseOverLeft - selectedLeft) + "px";
            // measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
            //
            // let measureNumber = document.getElementById("measure-hor-number");
            // measureNumber.innerHTML = Math.round(mouseOverLeft - selectedLeft);
            measureHor2.style.display = "none";
            // measureHor2.style.left = (selectedLeft + selectedWidth) + "px";
            // measureHor2.style.width = ((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)) + "px";
            // measureHor2.style.top = mouseOverTop - measureHorHeight - 5  + "px";
            //
            // let measureNumber2 = document.getElementById("measure-hor2-number");
            // measureNumber2.innerHTML = Math.round(((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)));
        }
        else if (selectedLeft >= mouseOverLeft && (mouseOverLeft + mouseOverWidth) <= (selectedLeft + selectedWidth) && (mouseOverLeft + mouseOverWidth) >= selectedLeft) {
            // left and right egde of mouse over is smaller
            measureHor.style.display = "none";
            // measureHor.style.left = mouseOverLeft + mouseOverWidth + "px";
            // measureHor.style.width = ((selectedLeft + selectedWidth) - (mouseOverLeft + mouseOverWidth)) + "px";
            // measureHor.style.top =  mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
            //
            // let measureNumber = document.getElementById("measure-hor-number");
            // measureNumber.innerHTML = Math.round((mouseOverLeft + mouseOverWidth) - selectedLeft);
            measureHor2.style.display = "none";
            // measureHor2.style.left = mouseOverLeft + "px";
            // measureHor2.style.width = selectedLeft - mouseOverLeft + "px";
            // measureHor2.style.top = mouseOverTop - measureHorHeight - 5  + "px";
            //
            // let measureNumber2 = document.getElementById("measure-hor2-number");
            // measureNumber2.innerHTML = Math.round(selectedLeft - mouseOverLeft);
        }
        else {
            // Mouse over element is to the left of the selected element
            measureHor.style.display = "flex";
            measureHor2.style.display = "none";
            measureHor.style.left = (mouseOverLeft + mouseOverWidth) + "px";
            measureHor.style.width = (selectedLeft - (mouseOverLeft + mouseOverWidth)) + "px";
            measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
            let measureNumber = document.getElementById("measure-hor-number");
            measureNumber.innerHTML = Math.round((selectedLeft - (mouseOverLeft + mouseOverWidth)));
        }
        // Horizontal is 0
        if (selectedLeft == mouseOverLeft) {
            measureHor.style.display = "none";
        }
        if (selectedLeft + selectedWidth == mouseOverLeft + mouseOverWidth) {
            measureHor2.style.display = "none";
        }
        //Vertical Measures
        if (mouseOverTop - (selectedTop + selectedHeight) > 0) {
            // Mouse over element is below the selected element
            measureVert.style.display = "flex";
            measureVert2.style.display = "none";
            measureVert.style.top = (selectedTop + selectedHeight) + "px";
            measureVert.style.height = (mouseOverTop - (selectedTop + selectedHeight)) + "px";
            measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
            let measureVertNumber = document.getElementById("measure-vert-number");
            measureVertNumber.innerHTML = Math.round((mouseOverTop - (selectedTop + selectedHeight)));
            // measureHor.style.display = "none"
            // measureHor2.style.display = "none"
        }
        else if (mouseOverTop <= selectedTop && (mouseOverTop + mouseOverHeight) >= (selectedTop + selectedHeight)) {
            // Mouse over element is bigger: starts at top of and ends below the selected element
            measureVert.style.display = "flex";
            measureVert.style.top = mouseOverTop + "px";
            measureVert.style.height = (selectedTop - mouseOverTop) + "px";
            measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
            let measureVertNumber = document.getElementById("measure-vert-number");
            measureVertNumber.innerHTML = Math.round((selectedTop - mouseOverTop  - mouseOverTopBorder));
            measureVert2.style.display = "flex";
            measureVert2.style.top = (selectedTop + selectedHeight) + "px";
            measureVert2.style.height = ((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight)) + "px";
            measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
            let measureVertNumber2 = document.getElementById("measure-vert2-number");
            measureVertNumber2.innerHTML = Math.round(((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight) - mouseOverBottomBorder));
        }
        else if (selectedTop <= mouseOverTop && (mouseOverTop + mouseOverHeight) <= (selectedTop + selectedHeight)) {
            // Mouse over element is smaller: top and bottom are smaller than the selected element
            measureVert.style.display = "flex";
            measureVert.style.top = selectedTop + "px";
            measureVert.style.height = (mouseOverTop - selectedTop) + "px";
            measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
            let measureVertNumber = document.getElementById("measure-vert-number");
            measureVertNumber.innerHTML = Math.round(mouseOverTop - selectedTop - selectedTopBorder );
            measureVert2.style.display = "flex";
            measureVert2.style.top = (mouseOverTop + mouseOverHeight) + "px";
            measureVert2.style.height = ((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight)) + "px";
            measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
            let measureVertNumber2 = document.getElementById("measure-vert2-number");
          //  console.log(selectedBorderVert);
            measureVertNumber2.innerHTML = Math.round(((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight) - selectedBottomBorder ));

        }
        else if (mouseOverTop >= selectedTop && (mouseOverTop + mouseOverHeight) >= (selectedTop + selectedHeight)) {
            // top and bottom of mouse over is bigger
            measureVert.style.display = "flex";
            measureVert.style.top = selectedTop + "px";
            measureVert.style.height = (mouseOverTop - selectedTop) + "px";
            measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
            let measureVertNumber = document.getElementById("measure-vert-number");
            measureVertNumber.innerHTML = Math.round(mouseOverTop - selectedTop);
            measureVert2.style.display = "flex";
            measureVert2.style.top = (selectedTop + selectedHeight) + "px";
            measureVert2.style.height = ((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight)) + "px";
            measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
            let measureVertNumber2 = document.getElementById("measure-vert2-number");
            measureVertNumber2.innerHTML = Math.round(((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight)));
        }
        else if (mouseOverTop <= selectedTop && (mouseOverTop + mouseOverHeight) <= (selectedTop + selectedHeight) && (mouseOverTop + mouseOverHeight) >= selectedTop) {
            // top and bottom of selected is bigger
            measureVert.style.display = "none";
            // measureVert.style.top = mouseOverTop + "px";
            // measureVert.style.height = (selectedTop - mouseOverTop) + "px";
            // measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
            //
            // let measureVertNumber = document.getElementById("measure-vert-number");
            // measureVertNumber.innerHTML = Math.round(selectedTop - mouseOverTop);
            measureVert2.style.display = "none";
            // measureVert2.style.top = (mouseOverTop + mouseOverHeight) + "px";
            // measureVert2.style.height = ((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight)) + "px";
            // measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
            //
            // let measureVertNumber2 = document.getElementById("measure-vert2-number");
            // measureVertNumber2.innerHTML = Math.round(((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight)));
        }
        else {
            // Mouse over element is above the selected element
            measureVert.style.display = "flex";
            measureVert2.style.display = "none";
            measureVert.style.top = (mouseOverTop + mouseOverHeight) + "px";
            measureVert.style.height = (selectedTop - (mouseOverTop + mouseOverHeight)) + "px";
            measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
            let measureVertNumber = document.getElementById("measure-vert-number");
            measureVertNumber.innerHTML = Math.round((selectedTop - (mouseOverTop + mouseOverHeight)));
        }
        // Vertical is 0
        if (selectedTop == mouseOverTop) {
            measureVert.style.display = "none";
        }
        if ((selectedTop + selectedHeight) == (mouseOverTop + mouseOverHeight)) {
            measureVert2.style.display = "none";
        }
        // Offset measure numbers if narrow
        let measureHorWidth = measureHor.style.width;
        let measureHorWidthNumber = parseInt(measureHorWidth, 10);
        if (measureHorWidthNumber < 15) {
            measureHorNumber.className = "numberOffsetLeft";
        }
        else {
            measureHorNumber.className = "numberOffsetLeftNo";
        }
        let measureHor2Width = measureHor2.style.width;
        let measureHor2WidthNumber = parseInt(measureHor2Width, 10);
        if (measureHor2WidthNumber < 15) {
            measureHor2Number.className = "numberOffsetRight";
        }
        else {
            measureHor2Number.className = "numberOffsetRightNo";
        }
        let measureVertHeight = measureVert.style.height;
        let measureVertHeightNumber = parseInt(measureVertHeight, 10);
        if (measureVertHeightNumber < 15) {
            measureVertNumber.className = "numberOffsetTop";
        }
        else {
            measureVertNumber.className = "numberOffsetTopNo";
        }
        let measureVert2Height = measureVert2.style.height;
        let measureVert2HeightNumber = parseInt(measureVert2Height, 10);
        if (measureVert2HeightNumber < 15) {
            measureVert2Number.className = "numberOffsetBottom";
        }
        else {
            measureVert2Number.className = "numberOffsetLeftBottomNo";
        }
    }

    mouseClick(e) {
        let element = this.targetFromEventTarget(e.target);
        if (element == null) {
            return;
        }

        this.selectElement(element);



    }


    keyDown(e) {
        if (e.metaKey || e.ctrlKey) {
            if (e.key == "ArrowUp") {
                this.selectContainer();
                e.preventDefault();
            }
            if (e.key == "ArrowDown") {
                this.selectFirstChild();
                e.preventDefault();
            }

            if (e.key == "ArrowLeft") {
                this.selectPreviousSibling();
                e.preventDefault();
            }

            if (e.key == "ArrowRight") {
                this.selectNextSibling();
                e.preventDefault();
            }
        }

    }

    /**
     * selects the given element (HTMLElement but part of Antetype).
     * Shows the selection rect and sends the properties to the spec-inspector
     */

    selectElement(element) {
        window.cancelAnimationFrame(this._updateMarkerID);
        this._selectedElement = element;



        let lastBounds;

        // handler for requestAnimationFrame to update the markers if the user scolls
        // or resizes the window:
        let updateMarkers = () => {
            let bounds = globalBoundsOfElement(element);


            if (!lastBounds || bounds.height != lastBounds.height || bounds.left != lastBounds.left || bounds.top != lastBounds.top || bounds.width != lastBounds.width) {
                lastBounds = bounds;
                this._selectedElementHighlight = getOrCreateDiv("high2");
                this._selectedElementHighlight.style.top = bounds.top + "px";
                this._selectedElementHighlight.style.left = bounds.left + "px";
                this._selectedElementHighlight.style.width = bounds.width + "px";
                this._selectedElementHighlight.style.height = bounds.height + "px";
                this._selectedElementHighlight.style.display = "block";







                this.sendStylesToInspector(element);

                let selected = globalBoundsOfElement(this._selectedElementHighlight);
                let selectedLeft = selected.left;
                let selectedWidth = selected.width;
                let selectedTop = selected.top;
                let selectedHeight = selected.height;

                let guidesVertical = getOrCreateDiv("guides-vertical");
                let guidesHorizontal = getOrCreateDiv("guides-horziontal");

                guidesVertical.style.left = selectedLeft + "px";
                guidesVertical.style.width = selectedWidth + "px";
                guidesVertical.style.height = document.body.scrollHeight + "px";


                guidesHorizontal.style.top = selectedTop + "px";
                guidesHorizontal.style.height = selectedHeight + "px";
                guidesHorizontal.style.width = document.body.scrollWidth + "px";

                if (this._mouseOverElement)
                    this.showMeasures(this._mouseOverElement);

            }
            this._updateMarkerID = window.requestAnimationFrame(updateMarkers);
        };

        this._updateMarkerID = window.requestAnimationFrame(updateMarkers);


        // hide measures if selection changes

        this.hideMeasures();

    }

    hideMeasures() {
        let measureHor = document.getElementById("measure-hor");
        measureHor.style.display = "none";

        let measureHor2 = document.getElementById("measure-hor2");
        measureHor2.style.display = "none";

        let measureVert = document.getElementById("measure-vert");
        measureVert.style.display = "none";

        let measureVert2 = document.getElementById("measure-vert2");
        measureVert2.style.display = "none";
    }

    /**
     * returns a an object with the various properties displayed in the
     * Spec-inspector. We have to use sendMessage() between the viewer-frame
     * and the outer frame displaying the toolbar (to run it locally in chrome).
     *
     * see
     *
     * @param {HTMLElement} element
     * @returns {Object} transferObject
     */
    getStylesFromElement(element) {
        const elestyle = getComputedStyle(element);
        let fontFamily = elestyle.fontFamily;
        //        fontFamily = fontFamily.split(',')[0];

        // Firefox has a slightly different way, it looks like it does
        // not supply the combined properties, so we have to do it:
        let flexStyle = elestyle.flex;
        if (flexStyle == "") {
            flexStyle = elestyle.flexGrow + " " + elestyle.flexShrink + " " + elestyle.flexBasis;
        }


        function encodeColor(cssValue, element, key) {
            const figure = element.figure;
            if (figure == undefined || cssValue == "transparent") {
                return { colorValue: "transparent" };
            }
            const color = figure.valueForKeyInStateWithIdentifier(key, figure.activeStateIdentifier);
            const hexValue = rgb2hex(color.colorValue.rgbaString());
            const cpColorEncoded = {};
            Object.assign(cpColorEncoded, color.colorValue);
            return { name: color.name, colorValue: hexValue, cpColor: cpColorEncoded };
        }

        function roundDimension(dimensionString) {
            let x = parseFloat(dimensionString);
            return Math.round(x) + "px";
        }

        // Properties directly from the browser:
        const transferObject = {
            fontColor: encodeColor(elestyle.color, element, "textColor"),
            backgroundColor: encodeColor(elestyle.backgroundColor, element, "backgroundColor"),
            backgroundImage: elestyle.backgroundImage,

            marginTop: elestyle.marginTop,
            marginBottom: elestyle.marginBottom,
            marginLeft: elestyle.marginLeft,
            marginRight: elestyle.marginRight,

            paddingTop: elestyle.paddingTop,
            paddingBottom: elestyle.paddingBottom,
            paddingLeft: elestyle.paddingLeft,
            paddingRight: elestyle.paddingRight,


            borderTopLeftRadius: elestyle.borderTopLeftRadius,
            borderTopRightRadius: elestyle.borderTopRightRadius,
            borderBottomRightRadius: elestyle.borderBottomRightRadius,
            borderBottomLeftRadius: elestyle.borderBottomLeftRadius,

            width: roundDimension(elestyle.width),
            height: roundDimension(elestyle.height),
            fontFamily: fontFamily,
            fontSize: elestyle.fontSize,
            flex: flexStyle,
            shadow: elestyle.boxShadow,
            opacity: elestyle.opacity,

            borderBottomWidth: elestyle.borderBottomWidth,
            borderBottomStyle: elestyle.borderBottomStyle,
            borderBottomColor: encodeColor(elestyle.borderBottomColorm, element, "borderBottomColor"),

            borderTopWidth: elestyle.borderTopWidth,
            borderTopStyle: elestyle.borderTopStyle,
            borderTopColor: encodeColor(elestyle.borderTopColor, element, "borderTopColor"),

            borderLeftWidth: elestyle.borderLeftWidth,
            borderLeftStyle: elestyle.borderLeftStyle,
            borderLeftColor: encodeColor(elestyle.borderLeftColor, element, "borderLeftColor"),

            borderRightWidth: elestyle.borderRightWidth,
            borderRightStyle: elestyle.borderRightStyle,
            borderRightColor: encodeColor(elestyle.borderRightColor, element, "borderRightColor")
        };


        // if we have a Antetype cell, use it too:
        let cell = element.figure;
        if (cell) {
            const hor = cell.valueForKeyInStateWithIdentifier("horizontalResizing", cell.activeStateIdentifier);
            const ver = cell.valueForKeyInStateWithIdentifier("verticalResizing", cell.activeStateIdentifier);
            const cl = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", cell.activeStateIdentifier);

            if (hor == GDFlexResizing) {
                transferObject.horV = "Stretch";
            } else if (hor == GDFixResizing) {
                transferObject.horV = "Manual";
            } else {
                transferObject.horV = "Shrink";
            }


            if (ver == GDFlexResizing) {
                transferObject.verV = "Stretch";
            } else if (ver == GDFixResizing) {
                transferObject.verV = "Manual";
            } else {
                transferObject.verV = "Shrink";
            }

            if (cl == GDFixedLayoutPolicyCode) {
                transferObject.clV = "Free";
            } else if (cl == GDAlignmentLayoutPolicyCode) {
                transferObject.clV = "Stacked";
            } else if (cl == GDHorizontalBoxLayoutPolicyCode) {
                transferObject.clV = "Horizontal Flow";
            } else {
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

            // add shadows:
            const state = cell.activeStateIdentifier;
            if (cell.valueForKeyInStateWithIdentifier("dropShadow", state)) {
                const color = encodeColor("", element, "dropShadowColor");

                transferObject.dropShadow = {
                    color: color,
                    angle: cell.valueForKeyInStateWithIdentifier("dropShadowAngle", state),
                    blur: cell.valueForKeyInStateWithIdentifier("dropShadowBlur", state),
                    size: cell.valueForKeyInStateWithIdentifier("dropShadowSize", state),
                    offset: cell.valueForKeyInStateWithIdentifier("dropShadowOffset", state)
                };
            }


            if (cell.valueForKeyInStateWithIdentifier("innerShadow", state)) {
                const color = encodeColor("", element, "innerShadowColor");

                transferObject.innerShadow = {
                    color: color,
                    angle: cell.valueForKeyInStateWithIdentifier("innerShadowAngle", state),
                    blur: cell.valueForKeyInStateWithIdentifier("innerShadowBlur", state),
                    offset: cell.valueForKeyInStateWithIdentifier("innerShadowOffset", state)
                };


            }

            // min/max
            let minimumWidth = cell.valueForKeyInStateWithIdentifier("minimumWidth", state);
            if (hor != GDFixResizing && minimumWidth > 3) {
                transferObject.minimumWidth = minimumWidth + "px";
            }

            let minimumHeight = cell.valueForKeyInStateWithIdentifier("minimumHeight", state);
            if (ver != GDFixResizing && minimumHeight > 3) {
                transferObject.minimumHeight = minimumHeight + "px";
            }

            let maximumWidth = cell.valueForKeyInStateWithIdentifier("maximumWidth", state);
            if (hor != GDFixResizing && maximumWidth != GDMaxSizeValue) {
                transferObject.maximumWidth = maximumWidth + "px";
            }

            let maximumHeight = cell.valueForKeyInStateWithIdentifier("maximumHeight", state);
            if (ver != GDFixResizing && maximumHeight != GDMaxSizeValue) {
                transferObject.maximumHeight = maximumHeight + "px";
            }

            let customCSS = cell.valueForKeyInStateWithIdentifier("customCSS", state);
            if (customCSS) {
                transferObject.customCSS = customCSS;
            }

            let backgroundPainterType = cell.valueForKeyInStateWithIdentifier("backgroundPainterType", state);
            transferObject.backgroundPainterType = backgroundPainterType;

        }

        return transferObject;
    }



    /**
     * get the computed css-styles/properties of the element and send it to
     * the inspector (in the parentFrame).
     *
     * @param {HTMLElement} element
     */
    sendStylesToInspector(element) {
        const transferObject = this.getStylesFromElement(element);

        if (window.parent) {
            const command = {
                command: "updateSpecInspector",
                parameters: transferObject
            };
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

    selectFirstChild() {
        if (this._selectedElement == null) {
            return;
        }

        let selectedFigure = this._selectedElement.figure;
        if (!selectedFigure) {
            return;
        }

        if (selectedFigure.orderedComponents.length == 0) {
            return;
        }

        let firstChildFigure = selectedFigure.orderedComponents[0];

        this.selectElement(firstChildFigure.DOMElement);
    }

    selectPreviousSibling() {
        if (this._selectedElement == null) {
            return;
        }

        let selectedFigure = this._selectedElement.figure;
        if (!selectedFigure) {
            return;
        }

        let container = selectedFigure.container;
        if (!container) {
            return;
        }

        let index = container.orderedComponents.indexOf(selectedFigure);
        if (index == 0) {
            let lastChild = container.orderedComponents[container.orderedComponents.length - 1];
            this.selectElement(lastChild.DOMElement);
            return;
        }

        let previousSibling = container.orderedComponents[index - 1];

        this.selectElement(previousSibling.DOMElement);
    }

    selectNextSibling() {
        if (this._selectedElement == null) {
            return;
        }

        let selectedFigure = this._selectedElement.figure;
        if (!selectedFigure) {
            return;
        }

        let container = selectedFigure.container;
        if (!container) {
            return;
        }

        let index = container.orderedComponents.indexOf(selectedFigure);
        if (index == container.orderedComponents.length - 1) {
            this.selectElement(container.orderedComponents[0].DOMElement);
            return;
        }

        let nextSibling = container.orderedComponents[index + 1];

        this.selectElement(nextSibling.DOMElement);
    }

}

