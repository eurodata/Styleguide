"use strict";

/*
 * This file contains the spec-inspector in the web viewer. 
 */


// wire-up buttons in the spec-inspector:
document.getElementById("up").addEventListener("click", () => sendToViewerFrame({command: "selectParent"}));
document.getElementById("down").addEventListener("click", () => sendToViewerFrame({command: "selectFirstChild"}));
document.getElementById("left").addEventListener("click", () => sendToViewerFrame({command: "selectPreviousSibling"}));
document.getElementById("right").addEventListener("click", () => sendToViewerFrame({command: "selectNextSibling"}));

// we want the shortcuts not only if the iframe with the viewer
// has the focus: 
window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey) {
        if (e.key == "ArrowUp") {
            sendToViewerFrame({command: "selectParent"});
            e.preventDefault();
        }
        if (e.key == "ArrowDown") {
            sendToViewerFrame({command: "selectFirstChild"});
            e.preventDefault();
        }

        if (e.key == "ArrowLeft") {
            sendToViewerFrame({command: "selectPreviousSibling"}); 
            e.preventDefault();
        }

        if (e.key == "ArrowRight") {
            sendToViewerFrame({command: "selectNextSibling"}); 
            e.preventDefault();
        }
    }
});

document.getElementById("copytext").addEventListener("click", copyCSSToClipboard);

function hexStringOfColor(color) {
    function colorPart(n) {
        var s = Number(Math.round(n*255)).toString(16);
        if (s.length == 1)
            s = "0" + s;

        return s;
    }
    var result = "#" + colorPart(color.red) + colorPart(color.green) + colorPart(color.blue);
    if (color.alpha != 1) {
        result += colorPart(color.alpha);
    }

    return result;
}

function cssColorStringOfColor(cpColor) {
    let cssColor = "rgb(" + Math.round(cpColor.red*255) + "," + Math.round(cpColor.green*255) + "," + Math.round(cpColor.blue*255) + ")";
    if (cpColor.alpha != 1) {
        cssColor = "rgba(" + Math.round(cpColor.red*255) + "," + Math.round(cpColor.green*255) + "," + Math.round(cpColor.blue*255) + "," + Math.round(cpColor.alpha*100) + "%)";
    }
    return cssColor;
}

/**
 *  the transferObject is send from the viewer-frame GDSpecTool#selectElement.
 *  Updates the spec-inspector. 
 *  in viewer_spec.js
 */
function updateSpecInspector(transferObject) {
    const inspectorContainer = document.getElementById("GDViewerPropertyTable");
    inspectorContainer.innerHTML = "";

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

        const valueText = document.createElement("div");
        valueText.className = "value";
        if (extraElement) {
            valueText.appendChild(extraElement);
        }
        valueText.innerHTML += value;
        valueElement.appendChild(valueText);


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

    function appendHeader(text) {
        const header = document.createElement("h3");
        header.innerText = text;
        return inspectorContainer.appendChild(header);
    }

    function appendProperty(label, value) {
        return inspectorContainer.appendChild(createPropertyRowElement(label, value));
    }

    function appendColorProperty(label, color) {
        if (color.colorValue == "transparent") {
            return appendProperty(label, color);
        }

        let colorSwatch = document.createElement("div");
        colorSwatch.className = "colorswatch";
        let name = color.name ? color.name : color.colorValue; 
        colorSwatch.style.background = color.colorValue;

        let spacer = document.createElement("div");
        spacer.className = "colorspacer";

        inspectorContainer.appendChild(createPropertyRowElement(label, name, colorSwatch));
        inspectorContainer.appendChild(createPropertyRowElement("", hexStringOfColor(color.cpColor), spacer.cloneNode()));
        return inspectorContainer.appendChild(createPropertyRowElement("", cssColorStringOfColor(color.cpColor), spacer.cloneNode()));
    }


    let cssCode = "";

    if (transferObject.hasText) {
        const fontFamilies = transferObject.fontFamily.split(',');
        const fontFamilyName = fontFamilies.length > 1  ? fontFamilies[0] : fontFamilies;
        appendProperty("Font:", fontFamilyName);
        appendProperty("Font Size:", transferObject.fontSize);
        appendColorProperty("Font Color:", transferObject.fontColor);
        const fontFamilyStyle = transferObject.fontFamily.replace(/"/g, "'");
        appendProperty("Text:", `<span style="font-family: ${fontFamilyStyle}">${transferObject.textString}</span>`).classList.add("ispace-bottom");

        let fontColor = transferObject.fontColor.cpColor ? cssColorStringOfColor(transferObject.fontColor.cpColor) 
        : transferObject.fontColor.colorValue;
        cssCode += `font: ${transferObject.fontSize} ${transferObject.fontFamily};\ncolor: ${fontColor};\n`;
    }

    const hasImage = transferObject.backgroundImage != "none";

    if (transferObject.backgroundPainterType == 1 /*GDColorPainterType*/) {
        let color = transferObject.backgroundColor;
        appendColorProperty("Background Color:", color);
        if (color.cpColor) {
            const cssString = cssColorStringOfColor(color.cpColor);
            cssCode += `background: ${cssString};\n`; 
        } else {
            cssCode += `background: ${transferObject.backgroundColor.colorValue};\n`; 
        }
    } else if (hasImage) {
        appendProperty("Background Image:", transferObject.backgroundImage);
        cssCode += `background: ${transferObject.backgroundImage};\n`; 
    }

    if (transferObject.opacity < 1) {
        appendProperty("Opacity:", transferObject.opacity);
        cssCode += `opacity: ${transferObject.opacity};\n`; 
    }


    appendProperty("Width:", transferObject.width + (transferObject.horV != "Manual" ? " <i>(calculated)</i>" : ""));
    if (transferObject.horV == "Manual") {
        cssCode += `width: ${transferObject.width};\n`;
    }

    appendProperty("Height:", transferObject.height + (transferObject.verV != "Manual" ? " <i>(calculated)</i>" : ""));
    if (transferObject.verV == "Manual") {
        cssCode += `height: ${transferObject.height};\n`;
    }

    if (transferObject.minimumWidth) {
        appendProperty("Minimum Width:", transferObject.minimumWidth);
        cssCode += `min-width: ${transferObject.minimumWidth};\n`;
    }
    if (transferObject.maximumWidth) {
        appendProperty("Maximum Width:", transferObject.maximumWidth);
        cssCode += `max-width: ${transferObject.maximumWidth};\n`;
    }

    if (transferObject.minimumHeight) {
        appendProperty("Minimum Height:", transferObject.minimumHeight);
        cssCode += `min-height: ${transferObject.minimumHeight};\n`;
    }
    if (transferObject.maximumHeight) {
        appendProperty("Maximum Height:", transferObject.maximumHeight);
        cssCode += `max-height: ${transferObject.maximumHeight};\n`;
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
        && transferObject.marginBottom == transferObject.marginTop) {
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
        && transferObject.paddingBottom == transferObject.paddingTop) {
        appendProperty("Padding:", transferObject.paddingLeft).classList.add("ispace-bottom");
        cssCode += `padding: ${transferObject.paddingLeft};\n`;
    } else {
        appendProperty("Padding Top:", transferObject.paddingTop);
        appendProperty("Padding Right:", transferObject.paddingRight);
        appendProperty("Padding Bottom:", transferObject.paddingBottom);
        appendProperty("Padding Left:", transferObject.paddingLeft).classList.add("ispace-bottom");
        cssCode += `padding: ${transferObject.paddingTop} ${transferObject.paddingRight} ${transferObject.paddingBottom} ${transferObject.paddingLeft};\n`;
    }

    if (transferObject.customCSS) {
        appendProperty("Custom CSS:", transferObject.customCSS);
        cssCode += transferObject.customCSS + "\n";
    }



    const borderBottom = transferObject.borderBottomWidth == "0px" ? "0px" : 
        transferObject.borderBottomWidth + " " + transferObject.borderBottomStyle + " " + transferObject.borderBottomColor;
    const borderTop = transferObject.borderTopWidth == "0px" ? "0px" : 
        transferObject.borderTopWidth + " " + transferObject.borderTopStyle + " " + transferObject.borderTopColor;
    const borderLeft = transferObject.borderLeftWidth == "0px" ? "0px" : 
        transferObject.borderLeftWidth + " " + transferObject.borderLeftStyle + " " + transferObject.borderLeftColor;
    const borderRight = transferObject.borderRightWidth == "0px" ? "0px" : 
        transferObject.borderRightWidth + " " + transferObject.borderRightStyle + " " + transferObject.borderRightColor;



    const sameBorder = borderBottom == borderTop && borderTop == borderLeft && borderLeft == borderRight;
    const sameBorderRadius = transferObject.borderTopLeftRadius == transferObject.borderTopRightRadius 
        && transferObject.borderTopRightRadius == transferObject.borderBottomRightRadius
        && transferObject.borderBottomRightRadius == transferObject.borderBottomLeftRadius;

    const displayBorderProperties = !(sameBorder &&  borderBottom == "0px" && sameBorderRadius && transferObject.borderBottomRightRadius == "0px"); 

    if (displayBorderProperties) {
        appendHeader("Border");

        if (sameBorder) {
            appendProperty("Width:", transferObject.borderTopWidth);

            if (transferObject.borderTopWidth != "0px") {
                appendProperty("Style:", transferObject.borderTopStyle);
                appendColorProperty("Color:", transferObject.borderTopColor);
            }

            cssCode += `border: ${transferObject.borderBottomWidth} ${transferObject.borderBottomStyle} ${transferObject.borderBottomColor.colorValue};\n`;
            
        } else {
            appendProperty("Top-Width:", transferObject.borderTopWidth);

            if (transferObject.borderTopWidth != "0px") {
                appendProperty("Top-Style:", transferObject.borderTopStyle);
                appendColorProperty("Top-Color:", transferObject.borderTopColor);
            }

            cssCode += `border-top: ${transferObject.borderTopWidth} ${transferObject.borderTopStyle} ${transferObject.borderTopColor.colorValue};\n`;

            appendProperty("Right-Width:", transferObject.borderRightWidth);
            if (transferObject.borderRightWidth != "0px") {
                appendProperty("Right-Style:", transferObject.borderRightStyle);
                appendColorProperty("Right-Color:", transferObject.borderRightColor);
            }
            cssCode += `border-right: ${transferObject.borderRightWidth} ${transferObject.borderRightStyle} ${transferObject.borderRightColor.colorValue};\n`;

            appendProperty("Bottom-Width:", transferObject.borderBottomWidth);

            if (transferObject.borderBottomWidth != "0px") {
                appendProperty("Bottom-Style:", transferObject.borderBottomStyle);
                appendColorProperty("Bottom-Color:", transferObject.borderBottomColor);
            }
            cssCode += `border-bottom: ${transferObject.borderBottomWidth} ${transferObject.borderBottomStyle} ${transferObject.borderBottomColor.colorValue};\n`;

            appendProperty("Left-Width:", transferObject.borderLeftWidth);

            if (transferObject.borderLeftWidth != "0px") {
                appendProperty("Left-Style:", transferObject.borderLeftStyle);
                appendColorProperty("Left-Color:", transferObject.borderLeftColor);
            }
            cssCode += `border-left: ${transferObject.borderLeftWidth} ${transferObject.borderLeftStyle} ${transferObject.borderLeftColor.colorValue};\n`;
        }

        if (sameBorderRadius) {
            appendProperty("Rounded Corners:", transferObject.borderTopLeftRadius);
            cssCode += `border-radius: ${transferObject.borderTopLeftRadius};\n`;
        } else {
            appendProperty("Rounded Corner Top Left:", transferObject.borderTopLeftRadius);
            appendProperty("Rounded Corner Top Right:", transferObject.borderTopRightRadius);
            appendProperty("Rounded Corner Bottom Left:", transferObject.borderBottomLeftRadius);
            appendProperty("Rounded Corner Bottom Right:", transferObject.borderBottomRightRadius);

            cssCode += `border-radius: ${transferObject.borderTopLeftRadius} ${transferObject.borderTopRightRadius} ${transferObject.borderBottomRightRadius} ${transferObject.borderBottomLeftRadius};\n`;
        }
    }

    if (transferObject.shadow != "none") {
        if (transferObject.dropShadow) {
            appendHeader("Shadow");
            const atShadow = transferObject.dropShadow;

            const x =  Math.round(Math.sin(atShadow.angle * Math.PI / 180.0) * atShadow.offset);
            const y = Math.round(Math.cos(atShadow.angle * Math.PI / 180.0) * atShadow.offset * (-1.0));
            appendProperty("X-Offset", x + "px");
            appendProperty("Y-Offset", y + "px");
            appendProperty("Blur", atShadow.blur + "px");
            appendProperty("Spread", atShadow.size+ "px")
            appendColorProperty("Color", atShadow.color).classList.add("ispace.bottom");
        }

        if (transferObject.innerShadow) {
            appendHeader("Inner Shadow");
            const atShadow = transferObject.innerShadow;

            const x =  Math.round(Math.sin(atShadow.angle * Math.PI / 180.0) * atShadow.offset);
            const y = Math.round(Math.cos(atShadow.angle * Math.PI / 180.0) * atShadow.offset * (-1.0));
            appendProperty("X-Offset", x + "px");
            appendProperty("Y-Offset", y + "px");
            appendProperty("Blur", atShadow.blur + "px");
            appendColorProperty("Color", atShadow.color).classList.add("ispace.bottom");
        }

        cssCode += `box-shadow: ${transferObject.shadow};\n`;
    } else {
        const lastElement = inspectorContainer.childNodes[inspectorContainer.childNodes.length-1];
        lastElement.classList.add("ispace-bottom");
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

