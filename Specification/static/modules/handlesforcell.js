import {
    GDBottomCenterHandle,
    GDTopRightHandle,
    GDRightCenterHandle,
    GDLeftCenterHandle,
    GDBottomLeftHandle,
    GDLeftTopHandle,
    GDBottomRightHandle,
    GDTopCenterHandle
} from "./handles.js";
import {
    GDFixedLayoutPolicyCode,
    GDHorizontalBoxLayoutPolicyCode,
    GDVerticalBoxLayoutPolicyCode,
    GDAlignmentLayoutPolicyCode,
    GDFixResizing,
    GDLeftAlignment,
    GDCenterAlignment,
    GDRightAlignment,
    GDTopAlignment,
    GDBottomAlignment
} from "./model.js";

const handleConstructors = {
    topCenter: GDTopCenterHandle,
    bottomCenter: GDBottomCenterHandle,
    rightCenter: GDRightCenterHandle,
    leftCenter: GDLeftCenterHandle,
    bottomRight: GDBottomRightHandle,
    topRight: GDTopRightHandle,
    topLeft: GDLeftTopHandle,
    bottomLeft: GDBottomLeftHandle
};

/**
 * returns the handles for the given cell. 
 * 
 * takes the container and resizing-modes into acccount
 * 
 * @param {GDWidgetInstanceCell} cell 
 */
export function handlesForCell(cell, at) {
    const horizontalResizing = cell.getProperty("horizontalResizing");
    const verticalResizing = cell.getProperty("verticalResizing");
    const layoutPolicyCode = cell.container.getProperty("layoutPolicyCode");
    let horizontalAlignmant = cell.container.getProperty("horizontalAlignment");
    let verticalAlignmant = cell.container.getProperty("verticalAlignment");
    const cellIsFloating = cell.getProperty("activeLayout");

    if (cellIsFloating) {
        horizontalAlignmant = cell.getProperty("activeHorizontalAlignment");
        verticalAlignmant = cell.getProperty("activeVerticalAlignment");

    }

    if (horizontalResizing != GDFixResizing && verticalResizing != GDFixResizing) {
        return [];
    }

    let handles = [];

    if (layoutPolicyCode == GDFixedLayoutPolicyCode && !cellIsFloating) {
        if (verticalResizing == GDFixResizing) {
            handles = handles.concat(['topCenter', 'bottomCenter']);
        }

        if (horizontalResizing == GDFixResizing) {
            handles = handles.concat(['rightCenter', 'leftCenter']);
        }
        if (verticalResizing == GDFixResizing && horizontalResizing == GDFixResizing) {
            handles = handles.concat(['bottomRight', 'topRight', 'topLeft', 'bottomLeft']);
        }
    }
    if (layoutPolicyCode == GDVerticalBoxLayoutPolicyCode || 
        layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || 
        layoutPolicyCode == GDAlignmentLayoutPolicyCode 
        || cellIsFloating) {
        if (verticalResizing == GDFixResizing) {
            handles = handles.concat(gethandlesforVerticalResizing(verticalAlignmant));
        }

        if (horizontalResizing == GDFixResizing) {
            handles = handles.concat(gethandlesforHorizontalResizing(horizontalAlignmant));
        }
        if (verticalResizing == GDFixResizing && horizontalResizing == GDFixResizing) {
            handles = handles.concat(gethandlesforCombinedResizing(verticalAlignmant, horizontalAlignmant));
        }
    }

    return handles.map(handle => new handleConstructors[handle](cell, handle, at));

}

function gethandlesforHorizontalResizing(horizontalAlignment) {
    let handles;
    switch (horizontalAlignment) {
        case GDRightAlignment:
            handles = ['leftCenter'];
            break;
        case GDLeftAlignment:
            handles = ['rightCenter'];
            break;
        case GDCenterAlignment:
            handles = ['leftCenter', 'rightCenter'];
            break;
    }
    return handles;
}

function gethandlesforVerticalResizing(verticalAlignment) {
    let handles;
    switch (verticalAlignment) {
        case GDTopAlignment:
            handles = ['bottomCenter'];
            break;
        case GDBottomAlignment:
            handles = ['topCenter'];
            break;
        case GDCenterAlignment:
            handles = ['bottomCenter', 'topCenter'];
            break;
    }
    return handles;
}
function gethandlesforCombinedResizing(verticalAlignment, horizontalAlignment) {
    const handles = [];
    if (verticalAlignment == GDTopAlignment) {
        switch (horizontalAlignment) {
            case GDRightAlignment:
                handles.push('bottomLeft');
                break;
            case GDLeftAlignment:
                handles.push('bottomRight');
                break;
            case GDCenterAlignment:
                handles.push('bottomRight');
                handles.push('bottomLeft');
                break;
        }
    }
    if (verticalAlignment == GDCenterAlignment) {
        switch (horizontalAlignment) {
            case GDRightAlignment:
                handles.push('bottomLeft');
                handles.push('topLeft');
                break;
            case GDLeftAlignment:
                handles.push('bottomRight');
                handles.push('topRight');
                break;
            case GDCenterAlignment:
                handles.push('bottomRight');
                handles.push('bottomLeft');
                handles.push('topRight');
                handles.push('topLeft');
                break;
        }
    }
    if (verticalAlignment == GDBottomAlignment) {
        switch (horizontalAlignment) {
            case GDRightAlignment:
                handles.push('topLeft');
                break;
            case GDLeftAlignment:
                handles.push('topRight');
                break;
            case GDCenterAlignment:
                handles.push('topRight');
                handles.push('topLeft');
                break;
        }
    }
    return handles;

}