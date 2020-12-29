import { GDHorizontalBoxLayoutPolicyCode, GDAlignmentLayoutPolicyCode, GDVerticalBoxLayoutPolicyCode, GDIntrinsicResizing, GDFlexResizing, GDMaxSizeValue, GDFixedLayoutPolicyCode, GDLeftAlignment, GDCenterAlignment, GDRightAlignment, GDTopAlignment, GDBottomAlignment, GDNoScrolling, GDVerticalScrolling, GDHorizontalScrolling, GDAutoScrolling, GDBlendModeNormal, GDBlendModeMultiply, GDBlendModeScreen, GDBlendModeOverlay, GDBlendModeDarken, GDBlendModeLighten, GDBlendModeColorDodge, GDBlendModeColorBurn, GDBlendModeHardLight, GDBlendModeSoftLight, GDBlendModeDifference, GDBlendModeExclusion, GDBlendModeHue, GDBlendModeSaturation, GDBlendModeColor, GDBlendModeLuminosity, GDTriangleCellType, GDVectorCellType, GDBorderTypeSolid, GDBorderTypeDashed, GDBorderTypeDotted, GDCircleCellType, GDNoPainterType, GDColorPainterType, GDImagePainterType, GDGradientPainterType, GDTileImageOperation, GDStretchImageOperation, GDBackgroundSizeContain, GDOriginalSizeImageOperation, GDVisibilityVisible, GDVisibilityCollapsed, GDVisibilityHidden, gdStringHash, GDProject } from "./model.js";
import { currentContainerStateIdentifier } from "./utils.js";

 

/*
 * CSS generation. 
 */


/**
    debugging helper. Given two CSSStyleDeclarations compares the styles and 
    prints the differences on the console. 
*/
function gdCompareStyles(s1, s2) {
    if (s1.length != s2.length) 
        console.log(`different number of items: ${s1.length} vs. ${s2.length}`);

    const names1 = new Set();
    for (let i=0; i<s1.length; i++) {
        names1.add(s1[i]);
    }
    
    const names2 = new Set();
    for (let i=0; i<s2.length; i++) {
        names2.add(s2[i]);
    }

    function difference(setA, setB) {
        var _difference = new Set(setA);
        for (var elem of setB) {
            _difference.delete(elem);
        }
         return _difference;
    }


    const diff = difference(names1, names2);
    if (diff.size!= 0) {
        const differentNames = Array.from(diff).join();
        console.log(`name difference: ${differentNames}`);
    }


    function intersection(setA, setB) {
        var _intersection = new Set();
        for (var elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem);
            }
        }
        return _intersection;
    }

    let sameNames = intersection(names1, names2);
    for (let n of sameNames) {
        let v1 = s1.getPropertyValue(n);
        let v2 = s2.getPropertyValue(n);

        if (v1 != v2) {
            console.log(`difference in ${n}, ${v1} vs ${v2}`);
        }
    }
}

/**
    debugging-helper: prints the differences of the instance-styles of the 
    active state to the console
*/
// eslint-disable-next-line no-unused-vars
function gdCompareInstanceStyleOf(c1, c2) {
    gdCompareStyles(c1.cssStyleForStateIdentifier(c1.activeStateIdentifier), c2.cssStyleForStateIdentifier(c2.activeStateIdentifier));
}

export function removeTextSpan(cell) {
    var domElement = cell.DOMElement;
    if (domElement === undefined) {
        return;
    }
    var spanElement = domElement.textSpan;
    if (spanElement == undefined) 
        return;

    domElement.removeChild(spanElement);
    domElement.textSpan = undefined;
}




function dimensionStyles(style, cell, state, containerState) {
    // Set vertical resizing
    verticalResizingCSS(style, cell, state, containerState);
    // Set horizontal resizing
    horizontalResizingCSS(style, cell, state, containerState);
    // Set layout policy and active layout
    layoutPolicyCodeAndActiveLayoutCSS(style, cell, state, containerState);
}




function verticalResizingCSS(style, cell, state, containerState) {
    // Necessary cell properties
    const cellVerticalResizing = cell.valueForKeyInStateWithIdentifier("verticalResizing", state);
    const cellMarginTop  = cell.valueForKeyInStateWithIdentifier("marginTop", state);
    const cellMarginBottom = cell.valueForKeyInStateWithIdentifier("marginBottom", state);
    const cellPaddingTop  = cell.valueForKeyInStateWithIdentifier("paddingTop", state);
    const cellPaddingBottom = cell.valueForKeyInStateWithIdentifier("paddingBottom", state);
    const cellBorderTop  = cell.valueForKeyInStateWithIdentifier("borderTopWidth", state);
    const cellBorderBottom = cell.valueForKeyInStateWithIdentifier("borderBottomWidth", state);
    const cellActiveLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", state);
    const cellHeight = cell.valueForKeyInStateWithIdentifier("height", state);
    const cellFlexHeightPercentage = cell.valueForKeyInStateWithIdentifier("flexHeightPercentage", state);
    const cellMinimumHeight = cell.valueForKeyInStateWithIdentifier("minimumHeight", state);
    const cellMaximumHeight = cell.valueForKeyInStateWithIdentifier("maximumHeight", state);

    // Necessary container cell properties
    const container = cell.container;
    const hasContainer = container !== undefined ? true : false;

    const containerLayoutPolicyCode = hasContainer ? container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState) : undefined;
    const containerUsesFlex = containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode;
    const containerUsesStacked = containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode;
    const containerPaddingTop = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingTop", containerState) : "0";
    const containerPaddingBottom = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingBottom", containerState) : "0";

    // Set vertical resizing properties
    switch(cellVerticalResizing) {
        case GDIntrinsicResizing: 
            style.height = "auto";
            if (containerUsesFlex) { 
                if (containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                    style.flex = "0 0 auto";
                } else { 
                    style.alignSelf = "auto"; 
                }
            } else {
                style.flex= "";
                style.alignSelf = "";
            }
            break;
        case GDFlexResizing: {
            if (containerUsesFlex) {
                if(cellActiveLayout) { 
                    style.height = "calc("+cellFlexHeightPercentage+"% - ("+containerPaddingTop+"px + "+containerPaddingBottom+"px + "+cellMarginTop+"px + "+cellMarginBottom+"px))";
                } else {
                   style.height = "auto";
                }

                if (containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                    if (cellFlexHeightPercentage == 100) {
                        style.flex = "1 1 calc(" + cellFlexHeightPercentage + "% - (" + cellPaddingTop + "px + " + cellPaddingBottom + "px + " + cellMarginTop + "px + " + cellMarginBottom + "px + " + cellBorderTop + "px + " + cellBorderBottom + "px))" ;
                    } else {
                        style.flex = "0 1 calc(" + cellFlexHeightPercentage + "% - (" + cellMarginTop + "px + " + cellMarginBottom + "px))" ;
                    }
                } else {
                    if (cellFlexHeightPercentage == 100) {
                        style.alignSelf= "stretch";
                    } else {
                        style.height = "calc(" + cellFlexHeightPercentage + "% - (" + cellMarginTop + "px + " + cellMarginBottom + "px))" ;
                    }
                }
            } else if(containerUsesStacked) {
                style.alignSelf = "stretch";
                if (cellFlexHeightPercentage == 100) {
                    style.height = "auto"; 
                } else {
                    style.height = "calc(" + cellFlexHeightPercentage + "% - (" + cellMarginTop + "px + " + cellMarginBottom + "px))" ;
                }
            } else {
                style.height = cellFlexHeightPercentage+ "%"; 
            }
            break;
        }
        default: {
            if (containerUsesFlex && containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                style.flex = "0 0 " + cellHeight+ "px";
            } 
            style.height = cellHeight + "px";
            if (containerUsesFlex && containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                style.alignSelf = "auto";
            }
        }
    }

    style.minHeight = cellMinimumHeight + "px";
    style.maxHeight = cellMaximumHeight + "px";  
}


function horizontalResizingCSS(style, cell, state, containerState) {
    // Necessary cell properties
    const cellHorizontalResizing = cell.valueForKeyInStateWithIdentifier("horizontalResizing", state);
    const cellMarginLeft  = cell.valueForKeyInStateWithIdentifier("marginLeft", state);
    const cellMarginRight = cell.valueForKeyInStateWithIdentifier("marginRight", state);
    const cellPaddingLeft  = cell.valueForKeyInStateWithIdentifier("paddingLeft", state);
    const cellPaddingRight = cell.valueForKeyInStateWithIdentifier("paddingRight", state);
    const cellBorderLeft  = cell.valueForKeyInStateWithIdentifier("borderLeftWidth", state);
    const cellBorderRight = cell.valueForKeyInStateWithIdentifier("borderRightWidth", state);
    const cellActiveLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", state);
    const cellWidth = cell.valueForKeyInStateWithIdentifier("width", state);
    const cellFlexWidthPercentage = cell.valueForKeyInStateWithIdentifier("flexWidthPercentage", state);
    const cellMinimumWidth = cell.valueForKeyInStateWithIdentifier("minimumWidth", state); 
    const cellMaximumWidth = cell.valueForKeyInStateWithIdentifier("maximumWidth", state);

    // Necessary container cell properties
    const container = cell.container;
    const hasContainer = container !== undefined ? true : false;

    const containerLayoutPolicyCode = hasContainer ? container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState) : undefined;
    const containerUsesFlex = containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode;
    const containerUsesStacked = containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode;
    const containerPaddingLeft = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingLeft", containerState) : "0";
    const containerPaddingRight = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingRight", containerState) : "0";

    // Set horizontal resizing properties
    switch(cellHorizontalResizing) {
        case GDIntrinsicResizing: 
            style.width = "auto"; 
            if (containerUsesFlex) {
                if (containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    style.flex = "0 0 auto";
                } else {
                    style.alignSelf = "auto";
                }

            } else {
                style.flex = "";
                style.alignSelf = "";
            }
            break;
        case GDFlexResizing: 
            if (containerUsesFlex) {
                if(cellActiveLayout) { 
                    style.width = "calc("+cellFlexWidthPercentage+"% - ("+containerPaddingLeft+"px + "+containerPaddingRight+"px + "+cellMarginLeft+"px + "+cellMarginRight+"px))";
                } else {
                   style.width = "auto"; 
                }
                
                if (containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    if (cellFlexWidthPercentage == 100) {
                        style.flex = "1 1 calc(" + cellFlexWidthPercentage + "% - (" + cellPaddingLeft+ "px + " + cellPaddingRight+ "px + " + cellMarginLeft+ "px + " + cellMarginRight+ "px + " + cellBorderLeft + "px + " + cellBorderRight + "px))" ;

                    } else {
                        style.flex = "0 1 calc(" + cellFlexWidthPercentage + "% - (" + cellMarginLeft+ "px + " + cellMarginRight + "px))" ;
                    }
                    
                } else {
                    if (cellFlexWidthPercentage == 100 && cellMaximumWidth >= GDMaxSizeValue) { // #112 max-width bug
                        style.alignSelf = "stretch"; 
                    } else {
                        style.alignSelf = "auto";
                        style.width = "calc(" + cellFlexWidthPercentage + "% - (" + cellMarginLeft+ "px + " + cellMarginRight + "px))" ;
                    }
                }
            } 
            else if (containerUsesStacked) {
                style.alignSelf = "stretch"; 
                if (cellFlexWidthPercentage != 100 ||  cellMaximumWidth >= GDMaxSizeValue) { // #112 max-width bug
                    style.width = "calc(" + cellFlexWidthPercentage + "% - (" + cellMarginLeft+ "px + " + cellMarginRight + "px))" ;
                }
            } else {
                style.width = cellFlexWidthPercentage+ "%";
            }
            break;
        default: 
        {
            if (containerUsesFlex && containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                style.flex = "0 0 " + cellWidth + "px";
            }
            style.width = cellWidth + "px"; 
            if (containerUsesFlex && containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                style.alignSelf = "auto";
            }
        }
    }

    style.minWidth = cellMinimumWidth + "px";
    style.maxWidth = cellMaximumWidth + "px"; 
}


function layoutPolicyCodeAndActiveLayoutCSS(style, cell, state, containerState) {
    // Necessary cell properties
    const cellMarginTop  = cell.valueForKeyInStateWithIdentifier("marginTop", state);
    const cellMarginBottom = cell.valueForKeyInStateWithIdentifier("marginBottom", state);
    const cellMarginLeft  = cell.valueForKeyInStateWithIdentifier("marginLeft", state);
    const cellMarginRight = cell.valueForKeyInStateWithIdentifier("marginRight", state);
    const cellActiveLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", state);
    const cellXPosition = cell.valueForKeyInStateWithIdentifier("x", state);
    const cellYPosition = cell.valueForKeyInStateWithIdentifier("y", state);
    const cellActiveVerticalLayout = cell.valueForKeyInStateWithIdentifier("activeVerticalAlignment", state);
    const cellActiveHorizontalLayout = cell.valueForKeyInStateWithIdentifier("activeHorizontalAlignment", state);
    const cellVerticalResizing = cell.valueForKeyInStateWithIdentifier("verticalResizing", state);

    // Necessary container cell properties
    const container = cell.container;
    const hasContainer = container !== undefined ? true : false;
    const containerLayoutPolicyCode = hasContainer ? container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState) : undefined;
    const containerUsesStacked = containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode;
    const containerPaddingTop = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingTop", containerState) : "0";
    const containerPaddingBottom = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingBottom", containerState) : "0";
    const containerPaddingLeft = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingLeft", containerState) : "0";
    const containerPaddingRight = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingRight", containerState) : "0";
    const containerVerticalLayout = hasContainer ? container.valueForKeyInStateWithIdentifier("verticalAlignment", containerState) : undefined;
    const containerHorizontalLayout = hasContainer ? container.valueForKeyInStateWithIdentifier("horizontalAlignment", containerState) : undefined;

    // Set layout policy code and active layout properties
    // Free Layout 
    if (containerLayoutPolicyCode == GDFixedLayoutPolicyCode && !cellActiveLayout) {
        style.position = "absolute";

        // issue #155 need to clear those two properties: 
        style.bottom = "unset";
        style.right = "unset";

        // TO DO: Fixed Position after changing container layout to fixed layout
        style.left = cellXPosition - cellMarginLeft + "px";     // #333 CSS adds the margin 
        style.top = cellYPosition - cellMarginTop + "px";
    } else if(containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode) {
        style.left = "unset"; 
        style.right = "unset";
        style.top = "unset";
        style.bottom = "unset";
        const horizontalLayoutType = cellActiveLayout ? cellActiveHorizontalLayout : containerHorizontalLayout;
        const verticalLayoutType = cellActiveLayout ? cellActiveVerticalLayout : containerVerticalLayout;

        let justify = "";
        switch(horizontalLayoutType) {
            case GDLeftAlignment: 
                justify = "start";
                break;
            case GDCenterAlignment: 
                justify = "center";
                break;
            case GDRightAlignment: 
                justify = "end";
                break;
        }
        
        let align = "";
        switch(verticalLayoutType) {
            case GDTopAlignment: 
                align = "start";
                break;
            case GDCenterAlignment:
                align = "center";
                break;
            case GDBottomAlignment: 
                align = "end";
                break;
        } 

        if (cellVerticalResizing == GDFlexResizing) {
            align = "stretch";
        }

        style.placeSelf = align + " " + justify;
        style.gridColumn = "1";
        style.gridRow = "1";
        style.position = "relative"
    
    } else if (cellActiveLayout && !containerUsesStacked) {
        const fixed = cell.valueForKeyInStateWithIdentifier("fixedLayout", state);
        style.position = fixed ? "fixed" : "absolute";
        var centeringTransformations = "";

        // Check if alignment layout or active layout

        switch(cellActiveHorizontalLayout) {
            case GDLeftAlignment: 
                style.left = "calc(0px + "+containerPaddingLeft+"px)";
                style.right = "unset";
                break;
            case GDCenterAlignment: 
                var horizontalPaddingAndMargins = ((containerPaddingLeft - cellMarginLeft - cellMarginRight - containerPaddingRight) / 2.0);
                if(horizontalPaddingAndMargins !== undefined) {
                    style.left = "calc(50% + "+horizontalPaddingAndMargins+"px)";   
                }
                else {
                    style.left = "calc(50%)";
                }
                centeringTransformations = "translate(-50%,0%) ";
                style.right = "unset";
                break;
            case GDRightAlignment: 
                style.left = "unset";
                style.right = "calc(0px + "+containerPaddingRight+"px)";
                break;
        }
        
        switch(cellActiveVerticalLayout) {
            case GDTopAlignment: 
                style.top = "calc(0px + "+containerPaddingTop+"px)";
                style.bottom = "unset";
                break;
            case GDCenterAlignment:
                var verticalPaddingAndMargins = ((containerPaddingTop - cellMarginTop - cellMarginBottom - containerPaddingBottom) / 2.0);
                if(verticalPaddingAndMargins !== undefined) {
                    style.top = "calc(50% + "+verticalPaddingAndMargins+"px)";   
                }
                else {
                    style.top = "calc(50%)";
                }
                centeringTransformations += "translate(0%,-50%) ";
                style.bottom = "unset";
                break;
            case GDBottomAlignment: 
                style.top = "unset";
                style.bottom = "calc(0px + "+containerPaddingBottom+"px)";
                break;
        } 
        
        cssTransformPropertyHandler(style, style.transform, centeringTransformations, false);
    } else if(containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
        // Reset these properties
        style.left = "unset"; 
        style.right = "unset";
        style.top = "unset";
        style.bottom = "unset";
        style.position = "relative";

        // #238 if widget has active layout, but instance not we have to overwrite the tranform... 
        // will break for rotation? 
        if (cell.valueForKeyInStateWithIdentifier("rotationAngle", state) == 0) {
            style.transform = "unset";
        }
        style.justifySelf = "unset";
        style.gridColumn = "unset";
        style.gridRow = "unset";
    }
}


function layoutCSS(style, cell, state, containerState) {
    var containerLayoutPolicyCode;
    if (cell.container) {
        containerLayoutPolicyCode = cell.container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState);        
    } 
    
    var layoutPolicyCode = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", state);
    if (layoutPolicyCode == GDVerticalBoxLayoutPolicyCode || layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
        if (cell.valueForKeyInStateWithIdentifier("isDisplay", state) == false) {
            style.display = "none";
        } else {
            style.display = "flex";
        }

        if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
            style.flexDirection = "row";
        } else {
            style.flexDirection = "column";
        }

        if (cell.valueForKeyInStateWithIdentifier("layoutWrap", state)) {
            style.flexWrap = "wrap";
        } else {
            style.flexWrap = "nowrap";
        }


        var justify = "center";
        var alignment = "center";
        switch(cell.valueForKeyInStateWithIdentifier("horizontalAlignment", state)) {
            case GDLeftAlignment: 
                if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    justify = "flex-start";
                } else {
                    alignment = "flex-start";
                }
                break;
            case GDCenterAlignment: 
                if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    justify = "center";
                } else {
                    alignment = "center";
                }
                break;
            case GDRightAlignment: 
                if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    justify = "flex-end";
                } else {
                    alignment = "flex-end";
                }
                break;
        }
        
        switch(cell.valueForKeyInStateWithIdentifier("verticalAlignment", state)) {
            case GDTopAlignment: 
                if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    alignment = "flex-start";
                } else {
                    justify = "flex-start";
                }
                break;
            case GDCenterAlignment: 
                if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    alignment = "center";
                } else {
                    justify = "center";
                }
                break;
            case GDBottomAlignment: 
                if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                    alignment = "flex-end";
                } else {
                    justify = "flex-end";
                }
                break;
        }
        style.alignItems = alignment;
        style.alignContent = alignment;
        style.justifyContent = justify;
    } else if (layoutPolicyCode == GDAlignmentLayoutPolicyCode) {
        if (cell.valueForKeyInStateWithIdentifier("isDisplay", state) == false) {
            style.display = "none";
        } else {
            style.display = "grid";
        }
        style.gridTemplateRows = "100%";
        style.gridTemplateColumns = "100%";
        style.alignItems = "unset";
        style.alignContent = "unset";
        style.justifyContent = "unset";
        style.flexDirection = "unset";
        style.flexWrap = "unset";
    } else if(containerLayoutPolicyCode !== undefined && containerLayoutPolicyCode == GDFixedLayoutPolicyCode) {
        style.position = "absolute";
        style.display = "flex";
        style.gridTemplateColumns = "unset";
        style.gridTemplateRows = "unset";
    }
}


function displayCSS(style, cell, state) {
    var contentClipped = cell.valueForKeyInStateWithIdentifier("isContentClipped", state); 
    var scrollable = cell.valueForKeyInStateWithIdentifier("scrollable", state); 
    var nonScrollingOverflow = contentClipped ? "hidden" : "visible";

    if (scrollable == GDNoScrolling) {
        style.overflow =  nonScrollingOverflow;
    } else { 
        switch (scrollable) {
            case GDVerticalScrolling: style.overflowY = "scroll"; style.overflowX = "hidden"; break;
            case GDHorizontalScrolling: style.overflowX = "scroll"; style.overflowY = "hidden"; break;
            case GDAutoScrolling: style.overflow = "auto"; break;
        }
    }


    var zIndex = cell.valueForKeyInStateWithIdentifier("drawingIndex", state);
    style.zIndex = zIndex == 0 ? "auto" : zIndex;

    var blendMode = cell.valueForKeyInStateWithIdentifier("blendMode", state);
    var blendModeString = "normal";

    switch (blendMode) {
        case GDBlendModeNormal: blendModeString = "normal"; break;
        case GDBlendModeMultiply: blendModeString = "multiply"; break;
        case GDBlendModeScreen: blendModeString = "screen"; break;
        case GDBlendModeOverlay: blendModeString = "overlay"; break;
        case GDBlendModeDarken: blendModeString = "darken"; break;
        case GDBlendModeLighten: blendModeString = "lighten"; break;
        case GDBlendModeColorDodge: blendModeString = "color-dodge"; break;
        case GDBlendModeColorBurn: blendModeString = "color-burn"; break;
        case GDBlendModeHardLight: blendModeString = "hard-light"; break;
        case GDBlendModeSoftLight: blendModeString = "soft-light"; break;
        case GDBlendModeDifference: blendModeString = "difference"; break;
        case GDBlendModeExclusion: blendModeString = "exclusion"; break;
        case GDBlendModeHue: blendModeString = "hue"; break;
        case GDBlendModeSaturation: blendModeString = "saturation"; break;
        case GDBlendModeColor: blendModeString = "color"; break;
        case GDBlendModeLuminosity: blendModeString = "luminosity"; break;
        default: blendModeString = "unset";
    }

    style.mixBlendMode = blendModeString;


    // Old triangle cell
    if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
        var clipPath = "polygon(0 100%, 100% 100%, 50% 0)"; 

        switch(cell.valueForKeyInStateWithIdentifier("rotationAngle", state)) {
            case 0: clipPath = "polygon(0 100%, 100% 100%, 50% 0)"; break;
            case 45: clipPath = "polygon(0 0, 100% 0, 100% 100%)"; break;
            case 90: clipPath = "polygon(0 0, 100% 50%, 0 100%)"; break;
            case 135: clipPath = "polygon(100% 0, 100% 100%, 0 100%)"; break;
            case 180: clipPath = "polygon(0 0, 100% 0, 50% 100%)"; break;
            case 225: clipPath = "polygon(0 0, 100% 100%, 0 100%)"; break;
            case 270: clipPath = "polygon(0 50%, 100% 0, 100% 100%)"; break;
            case 315: clipPath = "polygon(0 0, 100% 0, 0 100%)"; break;
            default: clipPath = "polygon(0 100%, 100% 100%, 50% 0)"; break;
        }

        style.clipPath = clipPath; 
        style.webkitClipPath = clipPath; 
    }

    // new triangle cell
    // if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
    //     createSVGTriangle(style, cell, state);
    // }
}

function marginCSS(style, cell, state) {
    var left = cell.valueForKeyInStateWithIdentifier("marginLeft", state);
    var right = cell.valueForKeyInStateWithIdentifier("marginRight", state);
    var top  = cell.valueForKeyInStateWithIdentifier("marginTop", state);
    var bottom = cell.valueForKeyInStateWithIdentifier("marginBottom", state);

    if (left == right && right == top && top == bottom) {
        style.margin = left + "px";
        return;
    }

    style.margin = top + "px " + right + "px " + bottom + "px " + left + "px";
}

function paddingCSS(style, cell, state) {
    // older files can contain negative paddings, use 0 instead (if not, 
    // padding is completely ignored)
    let left = cell.valueForKeyInStateWithIdentifier("paddingLeft", state);
    if (left < 0) left = 0;

    let right = cell.valueForKeyInStateWithIdentifier("paddingRight", state);
    if (right < 0) right = 0;
    let top  = cell.valueForKeyInStateWithIdentifier("paddingTop", state);
    if (top < 0) top = 0;

    let bottom = cell.valueForKeyInStateWithIdentifier("paddingBottom", state);
    if (bottom < 0) bottom = 0;



    if (left == right && right == top && top == bottom) {
        style.padding = left + "px";
        return;
    }

    style.padding = top + "px " + right + "px " + bottom + "px " + left + "px";   
}

function borderCSS(style, cell, state) {
    if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
        style.border= "0px solid black";
        return;
    }

    if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDVectorCellType) {
        // Set CSS border invisible
        style.border= "0px solid black";
        // Set vector stroke color and width
        vectorStrokeCSS(style, cell, state);
        return;
    }

    var leftWidth = cell.valueForKeyInStateWithIdentifier("borderLeftWidth", state);
    var rightWidth = cell.valueForKeyInStateWithIdentifier("borderRightWidth", state);
    var topWidth = cell.valueForKeyInStateWithIdentifier("borderTopWidth", state);
    var bottomWidth = cell.valueForKeyInStateWithIdentifier("borderBottomWidth", state);

    if (leftWidth == rightWidth && rightWidth == topWidth && topWidth == bottomWidth && bottomWidth == 0) {
        style.border= "0px solid black";
        return;
    }

    var leftColor = cell.valueForKeyInStateWithIdentifier("borderLeftColor", state).referenceValue;
    var rightColor = cell.valueForKeyInStateWithIdentifier("borderRightColor", state).referenceValue;
    var bottomColor = cell.valueForKeyInStateWithIdentifier("borderBottomColor", state).referenceValue;
    var topColor = cell.valueForKeyInStateWithIdentifier("borderTopColor", state).referenceValue;


    function borderType(cell,key, state) {
        switch (cell.valueForKeyInStateWithIdentifier(key, state)) {
            case GDBorderTypeSolid: return  "solid"; 
            case GDBorderTypeDashed: return  "dashed"; 
            case GDBorderTypeDotted: return  "dotted"; 
        }
    }

    var leftStyle = borderType(cell,"borderLeftType", state);
    var rightStyle = borderType(cell,"borderRightType", state);
    var topStyle = borderType(cell,"borderTopType", state);
    var bottomStyle = borderType(cell,"borderBottomType", state);


    // Issue #88 only use the top-values
    if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDCircleCellType) {
        style.border = topWidth + "px " +  topStyle + " " + topColor;
        return;
    }


    
    var widthMatches = leftWidth == rightWidth && rightWidth == bottomWidth && bottomWidth == topWidth;
    var stylesMatches = leftStyle == rightStyle && rightStyle == bottomStyle && bottomStyle == topStyle;
    var colorsMatches = leftColor == rightColor && rightColor == bottomColor && bottomColor == topColor;
    if (widthMatches && stylesMatches && colorsMatches) {
        style.border = leftWidth + "px " + leftStyle + " " + leftColor;
        return;
    }

    style.borderWidth = topWidth + "px " + rightWidth + "px " + bottomWidth + "px " + leftWidth + "px";
    style.borderColor = topColor + " " + rightColor + " " + bottomColor + " " + leftColor;
    style.borderStyle = topStyle + " " + rightStyle + " " + bottomStyle + " " + leftStyle;
}

function borderRadiusCSS(style, cell, state) {
    if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDCircleCellType) {
        style.borderRadius = "50%";
        return;
    }
    var topLeft = cell.valueForKeyInStateWithIdentifier("cornerRadiusTopLeft", state);
    var topRight = cell.valueForKeyInStateWithIdentifier("cornerRadiusTopRight", state);
    var bottomLeft = cell.valueForKeyInStateWithIdentifier("cornerRadiusBottomLeft", state);
    var bottomRight = cell.valueForKeyInStateWithIdentifier("cornerRadiusBottomRight", state);

    if (topLeft == topRight && topRight == bottomLeft && bottomLeft == bottomRight) {
        if (topLeft == 0) {
            style.borderRadius = "unset";
            return;
        }

        style.borderRadius = topLeft + "px"; 
        return;
    }

    style.borderRadius = topLeft + "px " + topRight + "px " + bottomRight + "px " + bottomLeft + "px";

}

function backgroundCSS(style, cell, state) {

    var type = cell.valueForKeyInStateWithIdentifier("backgroundPainterType", state);

    // if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
    //     style.background = "none";
    //     return;
    // }

    // Vector Cell
    if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDVectorCellType) {
        // Set CSS background to none
        style.background = "none";
        // Fill Vector
        vectorFillCSS(style, cell, state);
        return;
    }

    if (type == GDNoPainterType) {
        style.background = "none";
        return;
    }

    if (type == GDColorPainterType) {
        style.background = cell.valueForKeyInStateWithIdentifier("backgroundColor", state).referenceValue;
        return;
    }

    if (type == GDImagePainterType) {
        backgroundImageCSS(style, cell, state);
        return;
    }

    if (type == GDGradientPainterType) {
        backgroundGradientCSS(style, cell, state);
    }
}

function backgroundImageCSS(style, cell, state) {
    style.backgroundColor = "unset";
    const horizontalAlignment = cell.valueForKeyInStateWithIdentifier("backgroundImageHorizontalAlignment", state);
    let alignment = "";
    switch (horizontalAlignment) {
        case GDLeftAlignment: alignment = "left"; break;
        case GDCenterAlignment: alignment = "center"; break;
        case GDRightAlignment: alignment = "right"; break;
    }

    const verticalAlignment = cell.valueForKeyInStateWithIdentifier("backgroundImageVerticalAlignment", state);
    switch (verticalAlignment) {
        case GDTopAlignment: alignment += " top"; break;
        case GDCenterAlignment: alignment += " center"; break;
        case GDBottomAlignment: alignment += " bottom"; break;
    }

    style.backgroundPosition = alignment;

    const horizontalOperation = cell.valueForKeyInStateWithIdentifier("backgroundImageHorizontalOperation", state);
    const verticalOperation = cell.valueForKeyInStateWithIdentifier("backgroundImageVerticalOperation", state);

    if (horizontalOperation == GDTileImageOperation && verticalOperation == GDTileImageOperation) {
        style.backgroundRepeat = "repeat";
    } else if (horizontalOperation == GDTileImageOperation) {
        style.backgroundRepeat = "repeat-x";
    } else if (verticalOperation == GDTileImageOperation) {
        style.backgroundRepeat = "repeat-y";
    } else {
        style.backgroundRepeat = "no-repeat";
    }

    
    const r = cell.valueForKeyInStateWithIdentifier("backgroundImageResource", state);
    if (r == null) {
        return;
    }

    style.backgroundImage = 'url("/images/' + r.fileName + '")'; 

    if (window.projectJSON != undefined) { // FIXME: different url-generation for exported viewer
        style.backgroundImage = 'url("static/images/' + r.fileName + '")'; 
    }

    let backgroundSize = "";

    const proportionalScaling = cell.valueForKeyInStateWithIdentifier("backgroundImageProportionalScale", state);
    if (proportionalScaling && horizontalOperation == GDStretchImageOperation && verticalOperation == GDStretchImageOperation) {
        backgroundSize = proportionalScaling == GDBackgroundSizeContain ? "contain" : "cover";
    } else {
        switch (horizontalOperation) {
            case GDStretchImageOperation: 
                backgroundSize =  "100%"; break;
            case GDOriginalSizeImageOperation: 
                backgroundSize = r.width + "px"; break;
        }

        switch (verticalOperation) {
            case GDStretchImageOperation:
                backgroundSize += " 100%"; break;
            case GDOriginalSizeImageOperation: 
                backgroundSize += " " + r.height+ "px"; break;
        }
    }

    style.backgroundSize = backgroundSize;
}


function backgroundGradientCSS(style, cell, state) {
    var gradient = cell.valueForKeyInStateWithIdentifier("backgroundGradient", state);
    if (gradient == null) 
        return;
    var angle = cell.valueForKeyInStateWithIdentifier("backgroundGradientAngle", state);

    var stopStrings = [];

    for (var i=0; i< gradient.colorStops.length; i++) {
        var stop = gradient.colorStops[i];
        var s = "rgba(" + Math.round(stop.r*255.0) + "," + Math.round(stop.g*255) + "," + Math.round(stop.b*255) + "," + stop.a + ") " + Math.round(stop.p*100)+ "%";

        stopStrings.push(s);
    }

    var stopString = stopStrings.join(",");
    var isRadial = cell.valueForKeyInStateWithIdentifier("backgroundGradientIsRadial", state);
    if (isRadial) {
        style.background = "radial-gradient(" + stopString + ")";
    } else {
        style.background = "linear-gradient(" + (angle+180)%360 + "deg, " + stopString + ")";
    }
}

function fontCSS(style, cell, state) {
    var textColor = cell.valueForKeyInStateWithIdentifier("textColor", state);
    var textFont = cell.valueForKeyInStateWithIdentifier("textFont", state);
    var lineHeightMultiply = cell.valueForKeyInStateWithIdentifier("textLineHeightMultiply", state); 
    var textLineHeight = cell.valueForKeyInStateWithIdentifier("textLineHeight", state);
    var textWordWrap = cell.valueForKeyInStateWithIdentifier("textWordWrap", state);

    if (textWordWrap) {
        style.whiteSpace = "normal"; 
    }
    else {
        style.whiteSpace = "nowrap"; 
    }
         
    style.color = textColor.referenceValue;
    style.fontFamily = '"' + textFont.fontName + '", "' + textFont.displayName + '", "' + textFont.familyName + '"';
    if (textFont.fallback && textFont.fallback.length > 1) {
        style.fontFamily += ", " + textFont.fallback;       // add fallback
    }


    style.fontSize = textFont.size + "px";

    if (lineHeightMultiply) {
        if (textLineHeight > 1) {
            style.lineHeight = textLineHeight;
        }
        else {
            style.lineHeight = "normal";
        }
        
    } else {
        if (textLineHeight > 0) {
            style.lineHeight = textLineHeight + "px";
        }
    }
}

function textShadowCSS(style, cell, state) {
    if (!cell.valueForKeyInStateWithIdentifier("textShadow", state)) {
        style.textShadow = "none";
        return;
    }


    const textShadowAngle = cell.valueForKeyInStateWithIdentifier("textShadowAngle", state);
    const textShadowBlur = cell.valueForKeyInStateWithIdentifier("textShadowBlur", state);
    const textShadowOffset = cell.valueForKeyInStateWithIdentifier("textShadowOffset", state);
    let textShadowColor = cell.valueForKeyInStateWithIdentifier("textShadowColor", state);
    


   const horizontalOffset =  Math.round(Math.sin(textShadowAngle * Math.PI / 180.0) * textShadowOffset);
   const verticalOffset = Math.round(Math.cos(textShadowAngle * Math.PI / 180.0) * textShadowOffset * (-1.0));

   const textShadowCSS = horizontalOffset + "px " + verticalOffset + "px " + textShadowBlur + "px " +  textShadowColor.referenceValue;
   style.textShadow = textShadowCSS;

}


function miscCSS(style, cell, state) {
    var opacity = cell.valueForKeyInStateWithIdentifier("opacity", state);
    if (opacity === undefined || opacity === null) {
        style.opacity = "unset";
    } else { 
        style.opacity = opacity;
    }

    var isDisplay = cell.valueForKeyInStateWithIdentifier("isDisplay", state); 
    var isVisible = cell.valueForKeyInStateWithIdentifier("isVisible", state);

    var visibility = GDVisibilityVisible; // cell.valueForKeyInStateWithIdentifier("visibility", state);
    if (!isDisplay) {
        visibility = GDVisibilityCollapsed;
    } else if (!isVisible) {
        visibility = GDVisibilityHidden;
    }

    let display = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", state) == GDAlignmentLayoutPolicyCode ? "grid" : "flex";
    
    // Old variant. Sets only the current element to hidden/visible. Ignores child elements. 
    switch(visibility) {
        case GDVisibilityHidden: style.visibility = "hidden"; style.display = display; break;
        case GDVisibilityCollapsed: style.display = "none"; style.visibility = "inherit"; break;
        default: style.visibility = "inherit"; style.display = display;
    }

    var rotation = cell.valueForKeyInStateWithIdentifier("rotationAngle", state);
    if ((rotation != 0 || style.transform.indexOf("rotate(") != -1)  && cell.valueForKeyInStateWithIdentifier("cellType", state) != GDTriangleCellType) {
        cssTransformPropertyHandler(style, style.transform, "rotate(" + rotation + "deg)", true)
    }

    var filters = cell.valueForKeyInStateWithIdentifier("filters", state);
    if ((filters != null  ||  style.filter != "") && filters > 0) {
        style.filter = "blur(" + filters + "px)";
    } else {
        style.filter = "unset";
    }
    
    var selectable = cell.valueForKeyInStateWithIdentifier("isSelectable", state);
    style.pointerEvents = selectable ? "auto" : "none";
}



function shadowCSS(style, cell, state) {
    let dropShadow = cell.valueForKeyInStateWithIdentifier("dropShadow", state);
    let innerShadow = cell.valueForKeyInStateWithIdentifier("innerShadow", state);

    let dropShadowColor = cell.valueForKeyInStateWithIdentifier("dropShadowColor", state);
    let innerShadowColor = cell.valueForKeyInStateWithIdentifier("innerShadowColor", state);
    if (dropShadow == false && innerShadow == false) {
        style.boxShadow = "none";
        return;
    }

    let shadowString = "";


    if (dropShadow) {
        const dropShadowAngle = cell.valueForKeyInStateWithIdentifier("dropShadowAngle", state);
        const dropShadowBlur = cell.valueForKeyInStateWithIdentifier("dropShadowBlur", state);
        const dropShadowSize = cell.valueForKeyInStateWithIdentifier("dropShadowSize", state);
        const dropShadowOffset = cell.valueForKeyInStateWithIdentifier("dropShadowOffset", state);
        


       const horizontalOffset =  Math.round(Math.sin(dropShadowAngle * Math.PI / 180.0) * dropShadowOffset);
       const verticalOffset = Math.round(Math.cos(dropShadowAngle * Math.PI / 180.0) * dropShadowOffset * (-1.0));

       const dropShadowCSS = horizontalOffset + "px " + verticalOffset + "px " + dropShadowBlur + "px " + dropShadowSize + "px " + dropShadowColor.referenceValue;


        shadowString = dropShadowCSS;
    } 

    if (innerShadow) {
        const innerShadowAngle = cell.valueForKeyInStateWithIdentifier("innerShadowAngle", state);
        const innerShadowBlur = cell.valueForKeyInStateWithIdentifier("innerShadowBlur", state);
        const innerShadowSize = 0; // cell.valueForKeyInStateWithIdentifier("innerShadowSize", state);
        const innerShadowOffset = cell.valueForKeyInStateWithIdentifier("innerShadowOffset", state);
        


       const horizontalOffset =  Math.round(Math.sin(innerShadowAngle * Math.PI / 180.0) * innerShadowOffset);
       const verticalOffset = Math.round(Math.cos(innerShadowAngle * Math.PI / 180.0) * innerShadowOffset * (-1.0));

       const innerShadowCSS = horizontalOffset + "px " + verticalOffset + "px " + innerShadowBlur + "px " + innerShadowSize + "px " + innerShadowColor.referenceValue;

       if (shadowString.length > 0) {
           shadowString += ", ";
       }

       shadowString += "inset " + innerShadowCSS;
    } 

    style.boxShadow = shadowString;
}

function createSVGTriangle(style, cell, state) {
    // Required Properties
    const backgroundPainterType = cell.valueForKeyInStateWithIdentifier('backgroundPainterType', state);
    var backgroundColor = cell.valueForKeyInStateWithIdentifier('backgroundColor', state);
    const borderLeftWidth = cell.valueForKeyInStateWithIdentifier('borderLeftWidth', state); 
    const borderBottomWidth = cell.valueForKeyInStateWithIdentifier('borderBottomWidth', state);
    const borderRightWidth = cell.valueForKeyInStateWithIdentifier('borderRightWidth', state);
    const borderLeftColor = cell.valueForKeyInStateWithIdentifier('borderLeftColor', state);
    const borderRightColor = cell.valueForKeyInStateWithIdentifier('borderRightColor', state);
    const borderBottomColor = cell.valueForKeyInStateWithIdentifier('borderBottomColor', state);
    const borderLeftType = cell.valueForKeyInStateWithIdentifier('borderLeftType', state);
    const borderRightType = cell.valueForKeyInStateWithIdentifier('borderRightType', state);
    const borderBottomType = cell.valueForKeyInStateWithIdentifier('borderBottomType', state);

    // Get triangle edges
    var x1, y1, x2, y2, x3, y3;
    switch(cell.valueForKeyInStateWithIdentifier("rotationAngle", state)) {
        case 0:
            x1 = 0, y1 = 100, x2 = 50, y2 = 0, x3 = 100, y3 = 100;
            break;
        case 45:
            x1 = 0, y1 = 0, x2 = 100, y2 = 0, x3 = 100, y3 = 100;
            break;
        case 90:
            x1 = 0, y1 = 0, x2 = 100, y2 = 50, x3 = 0, y3 = 100;            
            break;
        case 135:
            x1 = 100, y1 = 0, x2 = 100, y2 = 100, x3 = 0, y3 = 100;   
            break;
        case 180:
            x1 = 100, y1 = 0, x2 = 50, y2 = 100, x3 = 0, y3 = 0;
            break;
        case 225:
            x1 = 100, y1 = 100, x2 = 0, y2 = 100, x3 = 0, y3 = 0;
            break;
        case 270:
            x1 = 100, y1 = 100, x2 = 0, y2 = 50, x3 = 100, y3 = 0;
            break;
        case 315:
            x1 = 0, y1 = 100, x2 = 0, y2 = 0, x3 = 100, y3 = 0;
            break;
        default:
            x1 = 0, y1 = 100, x2 = 50, y2 = 0, x3 = 100, y3 = 100; 
            break;
    }

    // Set background color transparent if none is set
    if(backgroundPainterType == GDNoPainterType) {
        backgroundColor = 'rgba(255, 255, 255, 0.0)';
    }

    // Create gradient definition
    var gradientDefinition = '';
    const gradientDefinitionId = cell.objectID + 'gradient';
    if (backgroundPainterType == GDGradientPainterType) {
        var gradient = cell.valueForKeyInStateWithIdentifier('backgroundGradient', state);
        if (gradient != null) {
            var angle = cell.valueForKeyInStateWithIdentifier('backgroundGradientAngle', state);
            var isRadial = cell.valueForKeyInStateWithIdentifier('backgroundGradientIsRadial', state);

            if(isRadial) {
                gradientDefinition = gradientDefinition + '<defs><radialGradient id="'+ gradientDefinitionId +'">'
            }
            else {
                const direction = degreeToSVGLinearGradient(angle);
                gradientDefinition = gradientDefinition + '<defs><linearGradient id="'+ gradientDefinitionId +'" x1="'+ direction[0] +'%" y1="'+ direction[1] +'%" x2="'+ direction[2] +'%" y2="'+ direction[3] +'%">';
            }

            for (var i=0; i< gradient.colorStops.length; i++) {
                var stop = gradient.colorStops[i];
                gradientDefinition = gradientDefinition + '<stop offset="'+Math.round(stop.p*100)+'%" style="stop-color:rgb('+Math.round(stop.r*255)+','+ Math.round(stop.g*255) +','+ Math.round(stop.b*255) +');stop-opacity:'+ stop.a +'" />';
            }
            
            if (isRadial) {
                gradientDefinition = gradientDefinition + '</radialGradient></defs>';
                
            } else {
                gradientDefinition = gradientDefinition + '</linearGradient></defs>';
            }

            backgroundColor = 'url(#' + gradientDefinitionId + ')';
        }
    }


    // SVG 1.1 has no option to draw the border stroke inside the fill.
    // It's always centered (half inside, half outside).
    // Walkaround: Multiply it by 2 and clip the outside part with a css clip path (see below)
    const leftStrokeWidth = borderLeftWidth * 2;
    const rightStrokeWidth = borderRightWidth * 2;
    const bottomStrokeWidth = borderBottomWidth * 2

    // Get border types
    var borderLeftStyle = '';
    if(borderLeftType == 1) {
        borderLeftStyle = 'stroke-dasharray:'+borderLeftWidth+' '+borderLeftWidth;
    }
    else if(borderLeftType == 2) {
        borderLeftStyle = 'stroke-dasharray:'+borderLeftWidth*3+' '+borderLeftWidth*3;
    }

    var borderRightStyle = '';
    if(borderRightType == 1) {
        borderRightStyle = 'stroke-dasharray:'+borderRightWidth+' '+borderRightWidth;
    }
    else if(borderRightType == 2) {
        borderRightStyle = 'stroke-dasharray:'+borderRightWidth*3+' '+borderRightWidth*3;
    }

    var borderBottomStyle = '';
    if(borderBottomType == 1) {
        borderBottomStyle = 'stroke-dasharray:'+borderBottomWidth+' '+borderBottomWidth;
    }
    else if(borderBottomType == 2) {
        borderBottomStyle = 'stroke-dasharray:'+borderBottomWidth*3+' '+borderBottomWidth*3;
    }

    const clippathDefinitionId = cell.objectID + 'clippath';
    const triangleSVGClipPath = 
    '<defs>' +
    '<clipPath id="'+ clippathDefinitionId +'">' +
    '<polygon points="'+x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+'"/>' +
    '</clipPath>' +
    '</defs>';

    var triangleSVG = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" preserveAspectRatio="none" viewbox="0 0 100 100">' +
    triangleSVGClipPath +
    gradientDefinition +
    '<polygon points="'+x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+'" class="triangle" style="fill:'+ backgroundColor +';vector-effect:non-scaling-stroke;pointer-events:none;clip-path:url(#'+ clippathDefinitionId +');"/>' + 
    '<line x1="'+x1+'" y1="'+y1+'" x2="'+x3+'" y2="'+y3+'" style="vector-effect:non-scaling-stroke;pointer-events:none;clip-path:url(#'+ clippathDefinitionId +');stroke:'+ borderBottomColor + ';stroke-width:'+ bottomStrokeWidth + ';'+borderBottomStyle+'" />' +
    '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" style="vector-effect:non-scaling-stroke;pointer-events:none;clip-path:url(#'+ clippathDefinitionId +');stroke:'+ borderLeftColor + ';stroke-width:'+ leftStrokeWidth + ';'+borderLeftStyle+'" />' +
    '<line x1="'+x3+'" y1="'+y3+'" x2="'+x2+'" y2="'+y2+'" style="vector-effect:non-scaling-stroke;pointer-events:none;clip-path:url(#'+ clippathDefinitionId +');stroke:'+ borderRightColor + ';stroke-width:'+ rightStrokeWidth + ';'+borderRightStyle+'" />' +
    '</svg>';

    // Assign triangle
    if(cell.DOMElement !== undefined) {
        cell.DOMElement.innerHTML = triangleSVG;
    }
}

function degreeToSVGLinearGradient(degree){

    var pointOfAngle = function(a) {
        return {
            x:Math.cos(a),
            y:Math.sin(a)
        };
    }

    var degreesToRadians = function(d) {
        return ((d * Math.PI) / 180);
    }

    var eps = Math.pow(2, -52);
    var angle = (degree % 360);
    var startPoint = pointOfAngle(degreesToRadians(180 - angle));
    var endPoint = pointOfAngle(degreesToRadians(360 - angle));

    if(startPoint.x <= 0 || Math.abs(startPoint.x) <= eps)
        startPoint.x = 0;

    if(startPoint.y <= 0 || Math.abs(startPoint.y) <= eps)
        startPoint.y = 0;

    if(endPoint.x <= 0 || Math.abs(endPoint.x) <= eps)
        endPoint.x = 0;

    if(endPoint.y <= 0 || Math.abs(endPoint.y) <= eps)
        endPoint.y = 0;

    return [startPoint.x * 100, startPoint.y * 100, endPoint.x * 100, endPoint.y * 100];
}

function vectorFillCSS(style, cell, state) {
    var type = cell.valueForKeyInStateWithIdentifier("backgroundPainterType", state);

    // Get properties
    var fillColor = ""; 
    if (type == GDColorPainterType) {
        fillColor = cell.valueForKeyInStateWithIdentifier("backgroundColor", state);
    }
    const vectorContent = cell.valueForKeyInStateWithIdentifier("vectorContent", state);

    // FIX ME: Implement a better way than regex replace -> very fragile and error prone.
    // Set SVG fill color
    var svgFillRegex = /fill=\\"([^"]+)\\"/gmi;
    var svgFillOpacityRegex = /fill-opacity=\\"[0-9\.]{1,100}\\"/gmi;
    var modifiedSVGVectorContent = vectorContent;

    if (type == GDColorPainterType) {
        if(svgFillRegex.test(modifiedSVGVectorContent)) {
            modifiedSVGVectorContent = modifiedSVGVectorContent.replace(svgFillRegex, `fill=\\\"${fillColor.referenceValue}\\\"`);
        }
        else {
            modifiedSVGVectorContent = modifiedSVGVectorContent.replace(/<g /, `<g fill=\\\"${fillColor.referenceValue}\\\"`);
        }

        // fill-opacity no longer needed: since the use of css color variables, we use RGBA instead
        if(svgFillOpacityRegex.test(modifiedSVGVectorContent)) {
            modifiedSVGVectorContent = modifiedSVGVectorContent.replace(svgFillOpacityRegex, ``);
        }
    }
    else { 
        // set fill color to none
        if(svgFillRegex.test(modifiedSVGVectorContent)) {
            modifiedSVGVectorContent = modifiedSVGVectorContent.replace(svgFillRegex, `fill=\\\"none\\\"`);
        }
        else {
            modifiedSVGVectorContent = modifiedSVGVectorContent.replace(/<g /, `<g fill=\\\"none\\\" `);
        }
    }
    
    // Set JSON fill color
    var modifiedJSONVectorContent = modifiedSVGVectorContent;
    var jsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi); // rgb
    var extendedJsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi); // rgba
    var jsonRegexNoColor = new RegExp(/\[\"Path\",\{/gmi);

    if (type == GDColorPainterType) {
        if(extendedJsonRegex.test(modifiedJSONVectorContent)) { // existing rgba
            modifiedJSONVectorContent = modifiedJSONVectorContent.replace(extendedJsonRegex, `\"fillColor\":[${fillColor.colorValue.red},${fillColor.colorValue.green},${fillColor.colorValue.blue},${fillColor.colorValue.alpha}]`);
        }
        else if(jsonRegex.test(modifiedJSONVectorContent)) { // existing rgb
            modifiedJSONVectorContent = modifiedJSONVectorContent.replace(jsonRegex, `\"fillColor\":[${fillColor.colorValue.red},${fillColor.colorValue.green},${fillColor.colorValue.blue},${fillColor.colorValue.alpha}]`);
        }
        else { // no existing fill color
            modifiedJSONVectorContent = modifiedJSONVectorContent.replace(jsonRegexNoColor, `[\"Path\",{\"fillColor\":[${fillColor.colorValue.red},${fillColor.colorValue.green},${fillColor.colorValue.blue},${fillColor.colorValue.alpha}],`);
        }
    }
    else {
        if(extendedJsonRegex.test(modifiedJSONVectorContent)) { // existing rgba
            // colon added to the end of the regex. It must be removed with the expression.
            // Otherwise there will be two colons behind each other resulting in an parse error.
            extendedJsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\],/gmi);
            modifiedJSONVectorContent = modifiedJSONVectorContent.replace(extendedJsonRegex, ``);
        }
        else if(jsonRegex.test(modifiedJSONVectorContent)) { // existing rgb
            // colon added to the end of the regex. It must be removed with the expression.
            // Otherwise there will be two colons behind each other resulting in an parse error.
            jsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\],/gmi);
            modifiedJSONVectorContent = modifiedJSONVectorContent.replace(jsonRegex, ``);
        }
        else {
            // nothing to do
        }
    }

    // Update vector content
    if(typeof cell.setValueForKeyInStateWithIdentifier !== "undefined") {
        cell.setValueForKeyInStateWithIdentifier(modifiedJSONVectorContent, "vectorContent", state);
    }
}

function vectorStrokeCSS(style, cell, state) {
    // Get properties
    const strokeWidth = cell.valueForKeyInStateWithIdentifier("borderTopWidth", state);
    const strokeColor = cell.valueForKeyInStateWithIdentifier("borderTopColor", state);
    const vectorContent = cell.valueForKeyInStateWithIdentifier("vectorContent", state);

    // FIX ME: Implement a better way than regex replace -> very fragile and error prone.
    // Set SVG stroke color
    var svgStrokeRegex = /stroke=\\"([^"]+)\\"/gmi;
    var modifiedSVGVectorContent = vectorContent.replace(svgStrokeRegex, `stroke=\\\"${strokeColor.referenceValue}\\\"`);

    // stroke-opacity no longer needed: since the use of css color variables, we use RGBA instead
    const strokeOpacityRegex = /stroke-opacity=\\"[0-9\.]{1,100}\\"/;
    if(strokeOpacityRegex.test(modifiedSVGVectorContent)) {
        modifiedSVGVectorContent = modifiedSVGVectorContent.replace(strokeOpacityRegex, ``);   
    }

    // Set SVG stroke width
    modifiedSVGVectorContent = modifiedSVGVectorContent.replace(/stroke-width=\\"[0-9\.]{1,3}\\"/gmi, `stroke-width=\\\"${strokeWidth}\\\"`);

    // Set JSON stroke color
    var modifiedJSONVectorContent = modifiedSVGVectorContent;
    const strokeColorRegex = new RegExp(/"strokeColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi);
    const strokeColorWithOpacityRegex = new RegExp(/"strokeColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi);
    const noStrokeColorRegex = new RegExp(/\[\"Path\",\{/gmi);
    if(strokeColorWithOpacityRegex.test(modifiedJSONVectorContent)) {
        modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeColorWithOpacityRegex, `\"strokeColor\":[${strokeColor.colorValue.red},${strokeColor.colorValue.green},${strokeColor.colorValue.blue},${strokeColor.colorValue.alpha}]`);
    }
    else if(strokeColorRegex.test(modifiedJSONVectorContent)) {
        modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeColorRegex, `\"strokeColor\":[${strokeColor.colorValue.red},${strokeColor.colorValue.green},${strokeColor.colorValue.blue},${strokeColor.colorValue.alpha}]`);
    }
    else {
        modifiedJSONVectorContent = modifiedJSONVectorContent.replace(noStrokeColorRegex, `[\"Path\",{\"strokeColor\":[${strokeColor.colorValue.red},${strokeColor.colorValue.green},${strokeColor.colorValue.blue},${strokeColor.colorValue.alpha}],`);
    }

    // Set JSON stroke width
    var strokeWidthRegex = new RegExp(/"strokeWidth":[0-9\.]{1,3}/gmi); 
    if(strokeWidthRegex.test(modifiedJSONVectorContent)) {
        modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeWidthRegex, `\"strokeWidth\":${strokeWidth}`);
    }
    else {
        strokeWidthRegex = new RegExp(/\[\"Path\",\{/gmi);
        modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeWidthRegex, `[\"Path\",{\"strokeWidth\":${strokeWidth},`);
    }

    // Update vector content
    if(typeof cell.setValueForKeyInStateWithIdentifier !== "undefined") {
        cell.setValueForKeyInStateWithIdentifier(modifiedJSONVectorContent, "vectorContent", state);
    }
}




function customCSS(style, cell, state) {
    let cssText = cell.valueForKeyInStateWithIdentifier("customCSS", state);
    if (!cssText || cssText.length == 0)  {
        return;
    }

    
    let properties = cssText.split(";");
    properties.forEach( p => {
        let colonIndex = p.indexOf(":");
        if (colonIndex > 0) {
            style.setProperty(p.slice(0,colonIndex).trim(), p.slice(colonIndex+1).trim());
        }
    });
}


function PropertyGroup(keys, updateFunction) {
    this._keys = keys;
    this.updateFunction = updateFunction;
}

PropertyGroup.prototype.hasProperty = function(cell, state) {
    return this._keys.find(function(k) {
        return cell.ownValueForKeyInStateWithIdentifier(k, state) !== undefined
    });
}

PropertyGroup.prototype.shouldUse = function(key, cell, state) {
    if (this._keys.indexOf(key) === -1) {
        return false;
    }

    return this.hasProperty(cell, state);
}

function AlwaysPropertyGroup(keys, updateFunction) {
    this._keys = keys;
    this.updateFunction = updateFunction;
}

AlwaysPropertyGroup.prototype.hasProperty = function(cell, state) {
    return true; 
}

AlwaysPropertyGroup.prototype.shouldUse = function(key, cell, state) {
    return this.hasProperty(cell, state);
}

var dimensionKeys = ["x", "y", "layoutPolicyCode", "activeLayout", "fixedLayout", "horizontalResizing", "flexWidthPercentage", "borderLeftWidth", "borderRightWidth", "width", 
"verticalResizing", "flexHeightPercentage", "borderTopWidth", "borderBottomWidth", "height", 
"minimumWidth", "minimumHeight", "maximumHeight", "maximumWidth", "activeVerticalAlignment", "activeHorizontalAlignment", "textWordWrap", 
"marginLeft", "marginRight", "marginTop", "marginBottom"];

var dimensionProperties = new PropertyGroup(dimensionKeys, dimensionStyles);

var borderKeys = ["borderLeftWidth", "borderTopWidth", "borderBottomWidth", "borderRightWidth", 
                "borderTopColor", "borderBottomColor", "borderLeftColor", "borderRightColor",
                "borderTopType", "borderBottomType", "borderLeftType", "borderRightType"];
var borderProperties = new PropertyGroup(borderKeys, borderCSS);

var layoutKeys = ["layoutPolicyCode", "verticalAlignment", "horizontalAlignment", "layoutWrap", "isDisplay"];
var layoutProperties = new PropertyGroup(layoutKeys, layoutCSS);


var displayKeys = ["cellType", "drawingIndex", "isContentClipped", "scrollable", "rotationAngle", "blendMode"];
var displayProperties = new PropertyGroup(displayKeys, displayCSS);

var marginKeys = ["marginLeft", "marginRight", "marginTop", "marginBottom"];
var marginProperties = new PropertyGroup(marginKeys, marginCSS);

var paddingKeys = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"];
var paddingProperties = new PropertyGroup(paddingKeys, paddingCSS);

var borderRadiusKeys = ["cellType", "cornerRadiusTopLeft", "cornerRadiusBottomLeft", "cornerRadiusTopRight", "cornerRadiusBottomRight"];
var borderRadiusProperties = new PropertyGroup(borderRadiusKeys, borderRadiusCSS);

var backgroundKeys = [ "backgroundPainterType","backgroundColor", "backgroundGradient",	"backgroundGradientAngle", "backgroundGradientIsRadial","backgroundImageResource", "backgroundImageHorizontalAlignment", "backgroundImageVerticalAlignment"	, "backgroundImageHorizontalOperation", "backgroundImageVerticalOperation", "backgroundImageProportionalScale"];	
var backgroundProperties = new PropertyGroup(backgroundKeys, backgroundCSS);

var textKeys = ["textFont", "textColor", "textString", "textLineHeight", "textLineHeightMultiply", "isEditableText", "textHorizontalAlignment", "textVerticalAlignment", "textWordWrap"];
var textProperties = new PropertyGroup(textKeys, fontCSS);

const textShadowKeys = ["textShadow", "textShadowOffset", "textShadowAngle", "textShadowBlur", "textShadowColor"];
const textShadowProperties = new PropertyGroup(textShadowKeys, textShadowCSS);


var miscKeys = ["visibility", "opacity", "isDisplay", "isVisible", "rotationAngle", "filters", "isSelectable" ];
var miscProperties = new AlwaysPropertyGroup(miscKeys, miscCSS);

var shadowKeys = ["dropShadow", "dropShadowColor", "dropShadowAngle", "dropShadowSize", "dropShadowBlur", "dropShadowOffset", "dropShadowBlur", "innerShadowOffset", "innerShadowBlur", "innerShadowColor", "innerShadow", "innerShadowAngle"];
var shadowProperties = new PropertyGroup(shadowKeys, shadowCSS);

var customKeys = ["customCSS"];
var customProperties = new AlwaysPropertyGroup(customKeys, customCSS); // Always: my overwrite AT-styles




export function cssClassNameDefinition(definitionIdentifier) {
    return "D" + gdStringHash(definitionIdentifier); 
}

export function cssClassName(definitionIdentifier, stateIdentifier, project) {
    var definitionName = cssClassNameDefinition(definitionIdentifier); 
    var state = project.stateWithIdentifier(stateIdentifier);
    var stateName = state.cssSelector();
    return definitionName + stateName;
}

export function cssSelector(definitionIdentifier, stateIdentifier, project) {
    var state = project.stateWithIdentifier(stateIdentifier);
    var definition = project.definitionWithIdentifier(definitionIdentifier);
    var stateName = state.cssSelector();

    var rootDefinition = definition.rootNode();
    var selector = "." + cssClassNameDefinition(rootDefinition.identifier) + stateName;
    if (rootDefinition != definition) {
        selector += " ." + cssClassNameDefinition(definitionIdentifier);
    }
    return selector;
}

/**
 * the css-selector for the given cell in state
 * @param {GDWidgetInstanceCell} cell 
 * @param {GDState} state 
 * @param {GDProject} project 
 * @returns {string}
 */
export function cssSelectorInstance(cell, state, project) {
    var id = cell.objectID;
    if (cell.isBasicCell) {
        return "#" + id;
    }


    var rootCell = cell.rootInstanceCell;
    var rootDefinitionId = rootCell.definitionIdentifier;

    if (cell != rootCell) { // .widgetRootDef[_:]state #instanceId
        var selector = "";
        selector += "." + cssClassName(rootDefinitionId, state.identifier, project) + " "; 
        selector += "." + id;
        return selector;
    } 


    // for root-instance cell, we can't use the above notation instead:
    // .instanceId[_:]state    

    return "."  + id +  state.cssSelector();
}

// the class name of the cell 
export function cssClassNameForCell(cell, project) {
    let className = "";
    if (cell.isRootInstanceCell) {
        if (!cell.activeState.isPseudoState) {
            className = cssClassName(cell.definitionIdentifier, cell.activeStateIdentifier, project);
            // special case: for root instance cell append the "instance-class"
            if (!cell.isBasicCell) {
                className += " " + cell.objectID + cell.activeState.cssSelector();
            }
        } else {
            // don't append pseudo-state to the className
            className = cssClassNameDefinition(cell.definitionIdentifier);
            if (!cell.isBasicCell) {
                className += " " + cell.objectID ;
            }
        }
    } else {
        className = cssClassNameDefinition(cell.definitionIdentifier) + " " + cell.objectID;
    }

    return className;
}


export function GDCSSTransition(animationDuration, animationCurve, animationDelay) {
    var curves = ["ease-in-out", "ease-in", "ease-out", "linear", "cubic-bezier(0.5, 1.8, 1, 1)"];
    return "all " + animationDuration + "s " + curves[animationCurve] + " " + animationDelay + "s";    
}


function cssTransformPropertyHandler(style, existingTransformations, newTransformations, isRotation) {
    var translateRegex = /(translate\([-%,0-9\s]*\))/g;
    var rotateRegex = /(rotate\([-0-9deg\s]*\))/g;
    var existingTranslateTransformations = [];
    var existingRotateTransformations = [];
    var newTranslateTransformations = [];
    var newRotateTransformations = [];
    
    // Extract existing and new transformations
    var match;
    while((match = translateRegex.exec(existingTransformations))) {
        existingTranslateTransformations.push(match[0]);
    }
    
    while((match = rotateRegex.exec(existingTransformations))) {
        existingRotateTransformations.push(match[0]);
    }
    
    while((match = translateRegex.exec(newTransformations))) {
        newTranslateTransformations.push(match[0]);
    }
    
    while((match = rotateRegex.exec(newTransformations))) {
        newRotateTransformations.push(match[0]);
    }
    
    // Assemble new transform property
    style.transform = "";
    if(newTranslateTransformations.length > 0) {
        for(let i = 0; i < newTranslateTransformations.length; i++) {
            style.transform += newTranslateTransformations[i];
            style.transform += " ";
        }
    }
    else if(isRotation == true) {
        for(let i = 0; i < existingTranslateTransformations.length; i++) {
            style.transform += existingTranslateTransformations[i];
            style.transform += " ";
        }
    }
    
    if(newRotateTransformations.length > 0) {
        for(let i = 0; i < newRotateTransformations.length; i++) {
            style.transform += newRotateTransformations[i];
            style.transform += " ";
        }
    }
    else if(isRotation == false) {
        for(let i = 0; i < existingRotateTransformations.length; i++) {
            style.transform += existingRotateTransformations[i];
            style.transform += " ";
        }
    }
}




/**
 * public api for the css-generation stuff. Currently only moved all calls
 * to the various xxxxProperties-calls from viewer.js to encapsulate 
 * the css generation.
 */
export class GDCSSGenerator {
    updateStyles(style, figure, stateIdentifier, containerStateIdentifier) {
        displayProperties.updateFunction(style, figure, stateIdentifier);
        marginProperties.updateFunction(style, figure, stateIdentifier);
        paddingProperties.updateFunction(style, figure, stateIdentifier);
        borderProperties.updateFunction(style, figure, stateIdentifier);
        borderRadiusProperties.updateFunction(style, figure, stateIdentifier);
        backgroundProperties.updateFunction(style, figure, stateIdentifier);
        textProperties.updateFunction(style, figure, stateIdentifier);
        textShadowProperties.updateFunction(style, figure, stateIdentifier);
        miscProperties.updateFunction(style, figure, stateIdentifier);
        shadowProperties.updateFunction(style, figure, stateIdentifier);
        layoutProperties.updateFunction(style,figure, stateIdentifier, containerStateIdentifier);
        dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
        customProperties.updateFunction(style, figure, stateIdentifier);
    }

    populateCellPropertiesInState(style, cell, stateIdentifier, containerStateIdentifier) {
        if (cell.container || dimensionProperties.hasProperty(cell, stateIdentifier)) {
            dimensionProperties.updateFunction(style, cell, stateIdentifier, containerStateIdentifier);
        }
        if (layoutProperties.hasProperty(cell, stateIdentifier)) {
            layoutProperties.updateFunction(style, cell, stateIdentifier, containerStateIdentifier);
        }
        if (displayProperties.hasProperty(cell,stateIdentifier)) {
            displayProperties.updateFunction(style, cell, stateIdentifier);
        }
        
        if (marginProperties.hasProperty(cell, stateIdentifier)) {
            marginProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (paddingProperties.hasProperty(cell,stateIdentifier)) {
            paddingProperties.updateFunction(style, cell, stateIdentifier);
        }
        if (borderProperties.hasProperty(cell, stateIdentifier)) {
            borderProperties.updateFunction(style, cell, stateIdentifier);
        }
        if (borderRadiusProperties.hasProperty(cell,stateIdentifier)) {
            borderRadiusProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (backgroundProperties.hasProperty(cell,stateIdentifier)) {
            backgroundProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (textProperties.hasProperty(cell, stateIdentifier)) {
            textProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (textShadowProperties.hasProperty(cell, stateIdentifier)) {
            textShadowProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (miscProperties.hasProperty(cell, stateIdentifier)) {
            miscProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (shadowProperties.hasProperty(cell, stateIdentifier)) {
            shadowProperties.updateFunction(style, cell, stateIdentifier);
        }

        if (customProperties.hasProperty(cell, stateIdentifier)) {
            customProperties.updateFunction(style, cell, stateIdentifier);
        }
    }

    updateStyleProperty(style, figure, key, stateIdentifier, containerStateIdentifier) {
        if (displayProperties.shouldUse(key, figure, stateIdentifier)) {
            displayProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (marginProperties.shouldUse(key,figure, stateIdentifier)) {
            marginProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (paddingProperties.shouldUse(key,figure, stateIdentifier)) {
            paddingProperties.updateFunction(style, figure, stateIdentifier);
        }
        
        if (borderProperties.shouldUse(key, figure, stateIdentifier)) {
            borderProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (borderRadiusProperties.shouldUse(key, figure, stateIdentifier)) {
            borderRadiusProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (backgroundProperties.shouldUse(key, figure, stateIdentifier)) {
            backgroundProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (textProperties.shouldUse(key, figure, stateIdentifier)) {
            textProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (textShadowProperties.shouldUse(key, figure, stateIdentifier)) {
            textShadowProperties.updateFunction(style, figure, stateIdentifier);
        }

        if (miscProperties.shouldUse(key, figure, stateIdentifier)) {
            miscProperties.updateFunction(style, figure, stateIdentifier);
        } 

        if (shadowProperties.shouldUse(key, figure, stateIdentifier)) {
            shadowProperties.updateFunction(style, figure, stateIdentifier);
        } 
        if (layoutProperties.shouldUse(key, figure, stateIdentifier)) {
            layoutProperties.updateFunction(style,figure, stateIdentifier, containerStateIdentifier);
        }
        
        if (dimensionProperties.shouldUse(key, figure, stateIdentifier)) {
            dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
        }
        
        // Update direct children of container after layout policy change
        if(key == "layoutPolicyCode") {
            if(figure.orderedComponents) {
                this.updateLayoutCells(figure.orderedComponents, containerStateIdentifier);
            }
        }
        
        this.updateLayoutCells(this.detectCellsThatNeedAnUpdate(key, figure, stateIdentifier), containerStateIdentifier);  

        if (customProperties.shouldUse(key, figure, stateIdentifier)) {
            customProperties.updateFunction(style, figure, stateIdentifier);
        }
    }
    
    
    detectCellsThatNeedAnUpdate(key, figure) {
        let cellsNeedUpdate = []

        const isPaddingKey = key == "paddingTop" || key == "paddingLeft" || key == "paddingRight" || key == "paddingBottom";

        if (isPaddingKey && figure.orderedComponents) {
            figure.orderedComponents.forEach( (c) => { 
                if (c.valueForKeyInStateWithIdentifier("activeLayout", c.activeStateIdentifier)) {
                    cellsNeedUpdate.push(c)
                }
            });
        }
        
    
        return cellsNeedUpdate;
    }
    

    updateLayoutCells(cells, containerStateIdentifier) {
        cells.forEach( figure => {
            if (!figure.objectID) { // generating widgetstyles
                return;
            }

            const state = figure.activeState;
            const stateIdentifier = state.identifier;
            const style = figure.cssStyleForStateIdentifier(stateIdentifier);
        
            layoutProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
            dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);

        });
    }
    


    /**
     *  Normally our CSS-generation is divided into widget- and instance-css. 
     *  But unfortunately sometimes we need to know the container to generate
     *  the right css. For root-instance-cells the container is not known on 
     *  creation, only when the instance is inserted in the screen. (or a state
     *  change). 
     *
     *  FIXME: 
     *      *   currently this method is called on numerous places after changing
     *          the hierarchy, can we make it automatic? 
     *      *   Calling the styling-stuff here directly looks wrong, either make 
     *          it explicit in the css-generation ... 
     *      *   tests are missing
     *
     */
    executeFinalWidgetLayoutPass(figure) {
        // #385 speed up of this pass. Use iterator and call properties-methods directly. 
        // would be even faster to just call the stuff needed, but this is only possible
        // if we cleanup the styling.js-mess. 
        const iterator = document.createNodeIterator(figure.DOMElement, NodeFilter.SHOW_ELEMENT, e => {
            let figure = e.figure;
            if (figure == undefined) return false;
            return figure.isRootInstanceCell;
        });

        let element = null;
        while ((element = iterator.nextNode())) {
            let figure = element.figure;
            const containerState = currentContainerStateIdentifier(figure,figure.activeStateIdentifier);

            // #1079 we need to adjust the active and all pseudo-states:
            figure.widget.states.forEach( state => {
                if (state.isPseudoState || state == figure.activeState) {
                    const stateIdentifier = state.identifier;
                    let style = figure.cssStyleForStateIdentifier(stateIdentifier);

                    dimensionProperties.updateFunction(style, figure, stateIdentifier, containerState);
                    layoutProperties.updateFunction(style, figure, stateIdentifier, containerState);

                    // #596 it might be that the above calls overwrite the css in the widget-css...
                    if (figure.valueForKeyInStateWithIdentifier("customCSS", stateIdentifier)) {
                        customProperties.updateFunction(style, figure, stateIdentifier);
                    }
                }
            });
        }
    }

    updateDimensionProperties(style, figure, stateIdentifier, containerStateIdentifier) {
        dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
    }

    hasTextProperty(cell, stateIdentifier) {
        return textProperties.hasProperty(cell, stateIdentifier);
    }

    propertyAffectsText(key, figure, stateIdentifier) {
        return textProperties.shouldUse(key, figure, stateIdentifier);
    }


    textSpanStyling(cell) {
        const span = cell.DOMElement.textSpan;
        const activeStateId = cell.activeStateIdentifier;

        const h = cell.valueForKeyInStateWithIdentifier("textHorizontalAlignment", activeStateId);
        const v = cell.valueForKeyInStateWithIdentifier("textVerticalAlignment", activeStateId);

        function alignmentClass(horizontalAlignment, verticalAlignment) {
            var horizontalMapping = ["l", "c", "r"];
            var verticalMapping = ["t", "c", "b"]; 
            return "aa" + verticalMapping[verticalAlignment] + horizontalMapping[horizontalAlignment];
        }
    
        const alignment = alignmentClass(h, v);
        span.className = "text " + alignment;
    }

    isBackgroundProperty(key) {
        return backgroundProperties._keys.indexOf(key) != -1;
    }

    populateScreenBackgroundPropertiesInState(style, cell, stateIdentifier) {
        if (backgroundProperties.hasProperty(cell,stateIdentifier)) {
            backgroundProperties.updateFunction(style, cell, stateIdentifier);
        }
    }

    updateScreenBackgroundProperty(style, figure, key, stateIdentifier) {
        if (backgroundProperties.shouldUse(key, figure, stateIdentifier)) {
            backgroundProperties.updateFunction(style, figure, stateIdentifier);
        }
    }

}



// for testing, but there should be a better way, do not call those 
// functions from the outside: 

export { layoutPolicyCodeAndActiveLayoutCSS, layoutCSS, customCSS, borderRadiusCSS,displayCSS, displayProperties,  horizontalResizingCSS, verticalResizingCSS };