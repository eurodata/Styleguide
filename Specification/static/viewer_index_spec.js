"use strict";

/*
 * This file contains the spec-inspector in the web viewer. 
 */

function upFunction(event) {
    sendToViewerFrame({command: "selectParent"});
}



document.getElementById("up").addEventListener("click", upFunction);

document.getElementById("copytext").addEventListener("click", copyCSSToClipboard);

function createPropertyRowElement(label, value, extraElement) {
    const irow = document.createElement("div");
    irow.className = "irow";

    const labelElement = document.createElement("div");
    labelElement.className = "label";
    labelElement.innerHTML = label;
    irow.appendChild(labelElement);


    const valueElement = document.createElement("div");
    valueElement.className = "tooltip";
    irow.appendChild(valueElement);

    const tooltipText = document.createElement("span");
    tooltipText.className = "tooltiptext";

    const clicktocopy = "<br><span class='clicktocopy'>Click to Copy</span>"
    tooltipText.innerHTML = value + clicktocopy;
    valueElement.appendChild(tooltipText);

    const valueText = document.createElement("div");
    valueText.className = "value";
    valueText.innerHTML = value;
    valueElement.appendChild(valueText);

    if (extraElement) {
        valueText.appendChild(extraElement);
    }


    irow.addEventListener("click", (e) =>  {
        let range = document.createRange();
        let ele = e.target;
        range.selectNode(ele);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    });
    return irow;
}

function updateSpecInspector(transferObject) {
    const inspectorContainer = document.getElementById("GDViewerPropertyTable");
    inspectorContainer.innerHTML = "";

    function appendProperty(label, value) {
        return inspectorContainer.appendChild(createPropertyRowElement(label, value));
    }

    function appendColorProperty(label, value, colorValue) {
        if (value == "transparent") {
            appendProperty(label, value);
            return;
        }

        if (colorValue === undefined) {
            colorValue = value;
        }

        let colorSwatch = document.createElement("div");
        colorSwatch.className = "colorswatch";
        colorSwatch.style.background = colorValue;

        return inspectorContainer.appendChild(createPropertyRowElement(label, value, colorSwatch));
    }

    let cssCode = "";

    if (transferObject.hasText) {
        appendProperty("Font:", transferObject.fontFamily);
        appendProperty("Font Size:", transferObject.fontSize);
        appendColorProperty("Font Color:", transferObject.color);
        appendProperty("Text:", `<span style="font-family: ${transferObject.fontFamily}">${transferObject.textString}</span>`).classList.add("ispace-bottom");

        cssCode += `font: ${transferObject.fontSize} ${transferObject.fontFamily};\n`;
    }

    const hasImage = transferObject.backgroundImage != "none";

    if (!hasImage) {
        appendColorProperty("Background Color:", transferObject.backgroundColor);
        if (transferObject.backgroundColor != "transparent") {
            cssCode += `background: ${transferObject.backgroundColor};\n`; 
        }
    } else {
        appendProperty("Background Image:", transferObject.backgroundImage);
        cssCode += `background: ${transferObject.backgroundImage};\n`; 
    }
    const opacityElement = appendProperty("Opacity:", transferObject.opacity);
    cssCode += `opacity: ${transferObject.opacity};\n`; 

    if (transferObject.shadow != "none") {
        appendProperty("Shadow:", transferObject.shadow).classList.add("ispace-bottom");
        cssCode += `box-shadow: ${transferObject.shadow};\n`;
    } else {
        opacityElement.classList.add("ispace-bottom");
    }

    appendProperty("Width:", transferObject.width + (transferObject.horV != "Manual" ? " <i>(calculated)</i>" : ""));
    if (transferObject.horV == "Manual") {
        cssCode += `width: ${transferObject.width};\n`;
    }

    appendProperty("Height:", transferObject.height + (transferObject.verV != "Manual" ? " <i>(calculated)</i>" : ""));
    if (transferObject.verV == "Manual") {
        cssCode += `height: ${transferObject.height};\n`;
    }

    appendProperty("Horizontal Resizing:", transferObject.horV);
    appendProperty("Vertical Resizing:", transferObject.verV);
    appendProperty("Flexbox:", transferObject.flex);
    cssCode += `flex: ${transferObject.flex};\n`;

    if (transferObject.activeLayout != "none") {
        appendProperty("Float:", transferObject.activeLayout);
    }

    appendProperty("Content Layout:", transferObject.clV).classList.add("ispace-bottom");



    if (transferObject.marginLeft == transferObject.marginRight 
        && transferObject.marginRight == transferObject.marginBottom 
        && transferObject.marginTop) {
        appendProperty("Margin:", transferObject.marginLeft);
        cssCode += `margin: ${transferObject.marginLeft};\n`;
    } else {
        appendProperty("Margin Top:", transferObject.marginTop);
        appendProperty("Margin Right:", transferObject.marginRight);
        appendProperty("Margin Bottom:", transferObject.marginBottom);
        appendProperty("Margin Left:", transferObject.marginLeft);

        cssCode += `margin: ${transferObject.marginTop} ${transferObject.marginRight} ${transferObject.marginBottom} ${transferObject.marginLeft};\n`;
    }


    if (transferObject.paddingLeft == transferObject.paddingRight 
        && transferObject.paddingRight == transferObject.paddingBottom 
        && transferObject.paddingTop) {
        appendProperty("Padding:", transferObject.paddingLeft).classList.add("ispace-bottom");
        cssCode += `padding: ${transferObject.paddingLeft};\n`;
    } else {
        appendProperty("Padding Top:", transferObject.paddingTop);
        appendProperty("Padding Right:", transferObject.paddingRight);
        appendProperty("Padding Bottom:", transferObject.paddingBottom);
        appendProperty("Padding Left:", transferObject.paddingLeft).classList.add("ispace-bottom");
        cssCode += `padding: ${transferObject.paddingTop} ${transferObject.paddingRight} ${transferObject.paddingBottom} ${transferObject.paddingLeft};\n`;
    }




    const borderBottom = transferObject.borderBottomWidth == "0px" ? "0px" : 
        transferObject.borderBottomWidth + " " + transferObject.borderBottomStyle + " " + transferObject.borderBottomColor;
    const borderTop = transferObject.borderTopWidth == "0px" ? "0px" : 
        transferObject.borderTopWidth + " " + transferObject.borderTopStyle + " " + transferObject.borderTopColor;
    const borderLeft = transferObject.borderLeftWidth == "0px" ? "0px" : 
        transferObject.borderLeftWidth + " " + transferObject.borderLeftStyle + " " + transferObject.borderLeftColor;
    const borderRight = transferObject.borderRightWidth == "0px" ? "0px" : 
        transferObject.borderRightWidth + " " + transferObject.borderRightStyle + " " + transferObject.borderRightColor;


    function appendBorderProperty(label, value, color) {
        if (value == "0px") {
            appendProperty(label, value);
        } else {
            appendColorProperty(label, value, color);
        }
    }

    if (borderBottom == borderTop 
        && borderTop == borderLeft
        && borderLeft == borderRight) {

        appendBorderProperty("Border:", borderBottom, transferObject.borderBottomColor);
        cssCode += `border: ${transferObject.borderBottomWidth} ${transferObject.borderBottomStyle} ${transferObject.borderBottomColor};\n`;
        
    } else {
        appendBorderProperty("Border Top:", borderTop, transferObject.borderTopColor);
        cssCode += `border-top: ${transferObject.borderTopWidth} ${transferObject.borderTopStyle} ${transferObject.borderTopColor};\n`;

        appendBorderProperty("Border Right:", borderRight, transferObject.borderRightColor);
        cssCode += `border-right: ${transferObject.borderRightWidth} ${transferObject.borderRightStyle} ${transferObject.borderRightColor};\n`;

        appendBorderProperty("Border Bottom:", borderBottom, transferObject.borderBottomColor);
        cssCode += `border-bottom: ${transferObject.borderBottomWidth} ${transferObject.borderBottomStyle} ${transferObject.borderBottomColor};\n`;

        appendBorderProperty("Border Left:", borderLeft, transferObject.borderLeftColor);
        cssCode += `border-left: ${transferObject.borderLeftWidth} ${transferObject.borderLeftStyle} ${transferObject.borderLeftColor};\n`;
    }

    if (transferObject.borderTopLeftRadius == transferObject.borderTopRightRadius 
        && transferObject.borderTopRightRadius == transferObject.borderBottomRightRadius
        && transferObject.borderBottomRightRadius == transferObject.borderBottomLeftRadius) {

        appendProperty("Rounded Corners:", transferObject.borderTopLeftRadius);
        cssCode += `border-radius: ${transferObject.borderTopLeftRadius};\n`;
    } else {
        appendProperty("Rounded Corner Top Left:", transferObject.borderTopLeftRadius);
        appendProperty("Rounded Corner Top Right:", transferObject.borderTopRightRadius);
        appendProperty("Rounded Corner Bottom Left:", transferObject.borderBottomLeftRadius);
        appendProperty("Rounded Corner Bottom Right:", transferObject.borderBottomRightRadius);

        cssCode += `border-radius: ${transferObject.borderTopLeftRadius} ${transferObject.borderTopRightRadius} ${transferObject.borderBottomRightRadius} ${transferObject.borderBottomLeftRadius};\n`;
    }


    // CSS copy:
    var copyText = document.getElementById("css");
    copyText.innerText = cssCode;
}

function copyCSSToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("css"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
 };

