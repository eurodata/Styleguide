import { GDBottomCenterHandle, GDBottomRightHandle, GDTopCenterHandle } from "./handles.js";
import { GDFixedLayoutPolicyCode, GDFixResizing } from "./model.js";

/**
 * returns the handles for the given cell. 
 * 
 * takes the container and resizing-modes into acccount
 * 
 * @param {GDWidgetInstanceCell} cell 
 */
export function handlesForCell(cell) {
    const horizontalResizing = cell.getProperty("horizontalResizing");
    const verticalResizing = cell.getProperty("verticalResizing");

    if (horizontalResizing != GDFixResizing && verticalResizing != GDFixResizing) {
        return [];
    }

    const handles = [];

    if (cell.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode) {
        if (verticalResizing == GDFixResizing) {
            handles.push(new GDTopCenterHandle(cell, "topCenter"));
            handles.push(new GDBottomCenterHandle(cell, "bottomCenter"));
        }

        if (horizontalResizing == GDFixResizing) {
            handles.push(new GDBottomRightHandle(cell, "bottomRight"));
        }
    }


    return handles;

}