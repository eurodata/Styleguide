import { GDAlignmentGuideBottomSide, GDAlignmentGuideCenterSide, GDAlignmentGuideRightSide, GDAlignmentGuideLeftSide, GDAlignmentGuideTopSide } from './GDAlignmentGuide.js';
import { GDFixedLayoutPolicyCode, GDFixResizing } from './model.js';
import { globalBoundsOfElement } from './utils.js'
import { AntetypeWeb } from './viewer.js';

export class GDHandle {
    /**
     * 
     * @param {GDWidgetInstanceCell} owner the cell 
     * @param {String} path which handle I am 
     * @param {AntetypeWeb} at the AntetypeWeb object, currently only used for currentZoom
     */
    constructor(owner, path, at) {
        this.owner = owner;
        this.path = path;

        this._snapPointDeltaX = 0;
        this._snapPointDeltaY = 0;
        this._at = at;
    }

    get cursor() {
        switch (this.path) {
            case "topLeft":
            case "bottomRight": return "nwse-resize";
            case "topCenter":
            case "bottomCenter": return "ns-resize";
            case "rightCenter":
            case "leftCenter": return "ew-resize";
            case "bottomLeft":
            case "topRight": return "nesw-resize";
        }

        return "pointer";
    }

    positionElement() {
        const handleElement = this.DOMElement;
        const ownerRect = globalBoundsOfElement(this.owner.DOMElement);
        const ownerNotVisible = ownerRect.height <= 0 && ownerRect.width <= 0;

        let p = {};
        const keyPath = this.path;
        const delta = 3 + (Math.round(((2 / this._at.currentZoom) + Number.EPSILON) * 100) / 100) / 2;
        const delta2 = 3 - (Math.round(((2 / this._at.currentZoom) + Number.EPSILON) * 100) / 100) / 2;

        switch (keyPath) {
            case "topLeft": p = { x: ownerRect.left - delta2, y: ownerRect.top - delta2 }; break;
            case "topCenter": p = { x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top - delta2 }; break;
            case "topRight": p = { x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top - delta2 }; break;
            case "rightCenter": p = { x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height / 2 - delta }; break;
            case "bottomRight": p = { x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height - delta }; break;
            case "bottomCenter": p = { x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top + ownerRect.height - delta }; break;
            case "bottomLeft": p = { x: ownerRect.left - delta2, y: ownerRect.top + ownerRect.height - delta }; break;
            case "leftCenter": p = { x: ownerRect.left - delta2, y: ownerRect.top + ownerRect.height / 2 - delta }; break;
        }

        handleElement.style.left = p.x + "px";
        handleElement.style.top = p.y + "px";
        handleElement.style.display = ownerNotVisible ? "none" : "block";

    }

    remove() {
        if (this.DOMElement && this.DOMElement.parentElement) {
            this.DOMElement.parentElement.removeChild(this.DOMElement);
        }
    }

    createElement() {
        const handleElement = document.createElement("div");
        handleElement.className = "handle";
        handleElement.handle = this;
        handleElement.style.cursor = this.cursor;
        this.DOMElement = handleElement;
        this.positionElement();
        return handleElement;
    }

    dragged(tool, x, y) { }

    startDragAtPoint(tool, x, y) {
        [this._snapPointDeltaX, this._snapPointDeltaY] = this.calculateStartDifference(tool, x, y);
    }

    calculateStartDifference(tool, x, y) {
        return [x, y];
    }
}


export class GDTopCenterHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [0, y - ownerBounds.top];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideTopSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing;
        const centered = containerHasFreeLayout && tool.centered;

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        let dy = y - ownerBounds.top;
        let height = this.owner.getProperty("height");
        const minHeight = this.owner.getProperty("minimumHeight")
        height -= dy;

        if (centered) {
            height -= dy;
        }

        ownerBounds.height = height;
        if (height <= minHeight) {
            height = minHeight;
        }
        tool.at.cellSetProperty(this.owner, "height", height);

        if (constrained) {
            const newWidth = (tool.originalBounds.width / tool.originalBounds.height) * height;
            const oldWidth = this.owner.getProperty("width");
            tool.at.cellSetProperty(this.owner, "width", newWidth);

            if (containerHasFreeLayout) {
                const newX = this.owner.getProperty("x") + (oldWidth - newWidth) / 2;
                tool.at.cellSetProperty(this.owner, "x", newX);
            }
        }

        if (!minHeightReached(this.owner, height)) {
            let y = this.owner.getProperty("y");
            y += dy;
            ownerBounds.top += dy;
            tool.at.cellSetProperty(this.owner, "y", y);
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}


export class GDBottomCenterHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [0, y - (ownerBounds.top + ownerBounds.height)];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideBottomSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing;
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        let dy = y - (ownerBounds.top + ownerBounds.height);
        let height = this.owner.getProperty("height");

        height += dy;

        if (centered) {
            height += dy;
        }

        if (height <= this.owner.getProperty("minimumHeight")) {
            height = this.owner.getProperty("minimumHeight");
        }

        ownerBounds.height = height;

        tool.at.cellSetProperty(this.owner, "height", height);

        if (constrained) {
            const newWidth = (tool.originalBounds.width / tool.originalBounds.height) * height;
            const oldWidth = this.owner.getProperty("width");
            tool.at.cellSetProperty(this.owner, "width", newWidth);

            if (containerHasFreeLayout) {
                const newX = this.owner.getProperty("x") + (oldWidth - newWidth) / 2;
                tool.at.cellSetProperty(this.owner, "x", newX);
            }
        }

        if (containerHasFreeLayout && centered && !minHeightReached(this.owner, height)) {
            let y = this.owner.getProperty("y");
            y -= dy;
            ownerBounds.top -= dy;
            tool.at.cellSetProperty(this.owner, "y", y);
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}

export class GDBottomRightHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [x - (ownerBounds.left + ownerBounds.width), y - (ownerBounds.top + ownerBounds.height)];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideBottomSide);
        x -= this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideRightSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;
        const minHeight = this.owner.getProperty("minimumHeight");
        const minWidth = this.owner.getProperty("minimumWidth");

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let height = this.owner.getProperty("height");
        let width = this.owner.getProperty("width");
        const oldWidth = width;
        const oldHeight = height;
        let dy = y - (ownerBounds.top + ownerBounds.height);
        let dx = x - (ownerBounds.left + ownerBounds.width);

        if (constrained) {
            const useY = Math.abs(dy) < Math.abs(dx);
            const multiplier = centered ? 2 : 1;
            if (useY) {
                height += multiplier * dy;
                width = (tool.originalBounds.width / tool.originalBounds.height) * height;
            } else {
                width += multiplier * dx;
                height = (tool.originalBounds.height / tool.originalBounds.width) * width;
            }
        }
        if (!centered && !constrained) {
            height += dy;
            width += dx;
        }

        if (centered && !constrained) {
            height += 2 * dy;
            width += 2 * dx;
        }

        if (height <= minHeight) {
            height = minHeight;
        }
        ownerBounds.height = height;

        if (width <= minWidth) {
            width = minWidth;
        }
        ownerBounds.width = width;

        tool.at.cellSetProperty(this.owner, "height", height);
        tool.at.cellSetProperty(this.owner, "width", width);
        const minHeightWidthReached = minHeightAndWidthReached(this.owner, height, width);

        if (centered && !constrained && !minHeightWidthReached) {
            if (!minHeightReached(this.owner, height)) {
                let y = this.owner.getProperty("y");
                y -= dy;
                ownerBounds.top -= dy;
                tool.at.cellSetProperty(this.owner, "y", y);

            }

            if (!minWidthReached(this.owner, width)) {
                let x = this.owner.getProperty("x");
                x -= dx;
                ownerBounds.left -= dx;
                tool.at.cellSetProperty(this.owner, "x", x);

            }
        }
        if (containerHasFreeLayout && constrained && centered && !minHeightWidthReached) {
            const diviser = centered ? 2 : 1;
            const heightDiff = (oldHeight - height);
            const newY = this.owner.getProperty("y") + heightDiff / diviser;

            tool.at.cellSetProperty(this.owner, "y", newY);
            ownerBounds.top += heightDiff / diviser;

            const widthDiff = (oldWidth - width);
            const newX = this.owner.getProperty("x") + widthDiff / diviser;

            tool.at.cellSetProperty(this.owner, "x", newX);
            ownerBounds.left -= widthDiff / diviser;

            if (centered) {

            }
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}

export class GDTopRightHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [x - (ownerBounds.left + ownerBounds.width), y - ownerBounds.top];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideTopSide);
        x -= this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideRightSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;
        const minHeight = this.owner.getProperty("minimumHeight");
        const minWidth = this.owner.getProperty("minimumWidth");

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let height = this.owner.getProperty("height");
        let width = this.owner.getProperty("width");
        const oldWidth = width;
        const oldHeight = height;
        let dy = y - ownerBounds.top;
        let dx = x - (ownerBounds.left + ownerBounds.width);



        if (constrained) {
            const useY = Math.abs(dy) < Math.abs(dx);
            const multiplier = centered ? 2 : 1;
            if (useY) {
                height -= multiplier * dy;
                width = (tool.originalBounds.width / tool.originalBounds.height) * height;
            } else {
                width += multiplier * dx;
                height = (tool.originalBounds.height / tool.originalBounds.width) * width;
            }
        }
        if (!centered && !constrained) {
            height -= dy;
            width += dx;
        }

        if (centered && !constrained) {
            height -= 2 * dy;
            width += 2 * dx;
        }

        if (height <= minHeight) {
            height = minHeight;
        }
        ownerBounds.height = height;

        if (width <= minWidth) {
            width = minWidth;
        }
        ownerBounds.width = width;

        tool.at.cellSetProperty(this.owner, "height", height);
        tool.at.cellSetProperty(this.owner, "width", width);

        const minHeightWidthReached = minHeightAndWidthReached(this.owner, height, width);

        if (!centered && !constrained && !minHeightReached(this.owner, height)) {
            let y = this.owner.getProperty("y");
            y += dy;
            ownerBounds.top += dy;
            tool.at.cellSetProperty(this.owner, "y", y);
        }

        if (centered && !constrained && !minHeightWidthReached) {
            if (!minHeightReached(this.owner, height)) {
                let y = this.owner.getProperty("y");
                y += dy;
                ownerBounds.top += dy;
                tool.at.cellSetProperty(this.owner, "y", y);
            }

            if (!minWidthReached(this.owner, width)) {
                let x = this.owner.getProperty("x");
                x -= dx;
                ownerBounds.left -= dx;
                tool.at.cellSetProperty(this.owner, "x", x);
            }
        }

        if (containerHasFreeLayout && constrained && !minHeightWidthReached) {
            const diviser = centered ? 2 : 1;
            const heightDiff = (oldHeight - height);
            const newY = this.owner.getProperty("y") + heightDiff / diviser;

            tool.at.cellSetProperty(this.owner, "y", newY);
            ownerBounds.top += heightDiff / diviser;

            if (centered) {
                const widthDiff = (oldWidth - width);
                const newX = this.owner.getProperty("x") + widthDiff / diviser;

                tool.at.cellSetProperty(this.owner, "x", newX);
                ownerBounds.left -= widthDiff / diviser;
            }
        }


        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}
export class GDRightCenterHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [x - (ownerBounds.left + ownerBounds.width), 0];
    }

    dragged(tool, x, y) {
        x += this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideRightSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;
        const minWidth = this.owner.getProperty("minimumWidth");


        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let width = this.owner.getProperty("width");
        let height = this.owner.getProperty("height");
        let dx = x - (ownerBounds.left + ownerBounds.width);
        width += dx;

        if (centered) {
            width += dx;
        }
        if (width <= minWidth) {
            width = minWidth;
        }
        ownerBounds.width = width;

        tool.at.cellSetProperty(this.owner, "width", width);

        if (constrained) {

            let oldHeight = this.owner.getProperty("height");;
            const newHeight = (tool.originalBounds.height / tool.originalBounds.width) * width;
            tool.at.cellSetProperty(this.owner, "height", newHeight);
            if (containerHasFreeLayout) {
                const newY = this.owner.getProperty("y") + (oldHeight - newHeight) / 2;
                tool.at.cellSetProperty(this.owner, "y", newY);
            }
        }
        if (centered && !minWidthReached(this.owner, width)) {
            let x = this.owner.getProperty("x");
            x -= dx;
            ownerBounds.left -= dx;
            tool.at.cellSetProperty(this.owner, "x", x);
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}
export class GDLeftCenterHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [ownerBounds.left - x, 0];
    }

    dragged(tool, x, y) {
        x -= this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideLeftSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;
        const minWidth = this.owner.getProperty("minimumWidth");

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let width = this.owner.getProperty("width");
        let dx = ownerBounds.left - x;
        width += dx;

        if (centered) {
            width += dx;
        }

        ownerBounds.width = width;
        if (width <= minWidth) {
            width = minWidth;
        }

        tool.at.cellSetProperty(this.owner, "width", width);
        if (!minWidthReached(this.owner, width)) {
            let updatedX = this.owner.getProperty("x");
            updatedX -= dx;
            ownerBounds.left -= dx;
            tool.at.cellSetProperty(this.owner, "x", updatedX);
        }

        if (constrained) {

            let oldHeight = this.owner.getProperty("height");;
            const newHeight = (tool.originalBounds.height / tool.originalBounds.width) * width;
            tool.at.cellSetProperty(this.owner, "height", newHeight);
            if (containerHasFreeLayout) {
                const newY = this.owner.getProperty("y") + (oldHeight - newHeight) / 2;
                tool.at.cellSetProperty(this.owner, "y", newY);
            }
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}

export class GDLeftTopHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [ownerBounds.left - x, y - ownerBounds.top];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideTopSide);
        x -= this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideLeftSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;
        const minHeight = this.owner.getProperty("minimumHeight");
        const minWidth = this.owner.getProperty("minimumWidth");


        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let height = this.owner.getProperty("height");
        let width = this.owner.getProperty("width");
        const oldWidth = width;
        const oldHeight = height;
        let dy = y - ownerBounds.top;
        let dx = ownerBounds.left - x;


        if (constrained) {
            const useY = Math.abs(dy) < Math.abs(dx);
            const multiplier = centered ? 2 : 1;

            if (useY) {
                height -= multiplier * dy;
                width = (tool.originalBounds.width / tool.originalBounds.height) * height;
            } else {
                width += multiplier * dx;
                height = (tool.originalBounds.height / tool.originalBounds.width) * width;
            }
        }
        if (!centered && !constrained) {
            height -= dy;
            width += dx;
        }

        if (centered && !constrained) {
            height -= 2 * dy;
            width += 2 * dx;
        }

        if (height <= minHeight) {
            height = minHeight;
        }
        ownerBounds.height = height;

        if (width <= minWidth) {
            width = minWidth;
        }
        ownerBounds.width = width;

        tool.at.cellSetProperty(this.owner, "height", height);
        tool.at.cellSetProperty(this.owner, "width", width);

        const minHeightWidthReached = minHeightAndWidthReached(this.owner, height, width);

        if (containerHasFreeLayout && constrained) {
            const diviser = centered ? 2 : 1;
            const widthDiff = (oldWidth - width);
            const heightDiff = (oldHeight - height);
            const newX = this.owner.getProperty("x") + widthDiff / diviser;
            tool.at.cellSetProperty(this.owner, "x", newX);
            const newY = this.owner.getProperty("y") + heightDiff / diviser;
            tool.at.cellSetProperty(this.owner, "y", newY);
            ownerBounds.top += heightDiff / diviser;
            ownerBounds.left -= widthDiff / diviser;

        }

        if (!centered && !constrained && !minHeightWidthReached) {
            if (!minHeightReached(this.owner, height)) {
                let y = this.owner.getProperty("y");
                y += dy;
                ownerBounds.top += dy;
                tool.at.cellSetProperty(this.owner, "y", y);

            }
            if (!minWidthReached(this.owner, width)) {
                let updatedX = this.owner.getProperty("x");
                updatedX -= dx;
                ownerBounds.left -= dx;
                tool.at.cellSetProperty(this.owner, "x", updatedX);

            }
        }

        if (centered && !constrained && !minHeightWidthReached) {
            if (!minHeightReached(this.owner, height)) {
                let y = this.owner.getProperty("y");
                y += dy;
                ownerBounds.top += dy;
                tool.at.cellSetProperty(this.owner, "y", y);

            }

            if (!minWidthReached(this.owner, width)) {
                let x = this.owner.getProperty("x");
                x -= dx;
                ownerBounds.left -= dx;
                tool.at.cellSetProperty(this.owner, "x", x);

            }
        }

        // if (centered && constrained && !minHeightWidthReached) {
        //     if (!minHeightReached(this.owner, height)) {
        //         let y = this.owner.getProperty("y");
        //         y += dy;
        //         ownerBounds.top += dy;
        //         tool.at.cellSetProperty(this.owner, "y", y);

        //     }

        //     if (!minWidthReached(this.owner, width)) {
        //         let x = this.owner.getProperty("x");
        //         x -= dx;
        //         ownerBounds.left -= dx;
        //         tool.at.cellSetProperty(this.owner, "x", x);

        //     }
        // }


        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}

export class GDBottomLeftHandle extends GDHandle {
    calculateStartDifference(tool, x, y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [ownerBounds.left - x, y - (ownerBounds.top + ownerBounds.height)];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideTopSide);
        x -= this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideLeftSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;
        const minHeight = this.owner.getProperty("minimumHeight");
        const minWidth = this.owner.getProperty("minimumWidth");

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let height = this.owner.getProperty("height");
        let width = this.owner.getProperty("width");
        const oldWidth = width;
        const oldHeight = height;
        let dy = y - (ownerBounds.top + ownerBounds.height);;
        let dx = ownerBounds.left - x;


        if (constrained) {
            const useY = Math.abs(dy) < Math.abs(dx);
            const multiplier = centered ? 2 : 1;

            if (useY) {
                height += multiplier * dy;
                width = (tool.originalBounds.width / tool.originalBounds.height) * height;
            } else {
                width += multiplier * dx;
                height = (tool.originalBounds.height / tool.originalBounds.width) * width;
            }
        }
        if (!centered && !constrained) {
            height += dy;
            width += dx;
        }
        if (centered && !constrained) {
            height += 2 * dy;
            width += 2 * dx;
        }

        if (height <= minHeight) {
            height = minHeight;
        }
        ownerBounds.height = height;

        if (width <= minWidth) {
            width = minWidth;
        }
        ownerBounds.width = width;

        tool.at.cellSetProperty(this.owner, "height", height);
        tool.at.cellSetProperty(this.owner, "width", width);

        const minHeightWidthReached = minHeightAndWidthReached(this.owner, height, width);
        if (containerHasFreeLayout && constrained && !minHeightWidthReached) {
            const diviser = centered ? 2 : 1;
            const widthDiff = (oldWidth - width);
            const heightDiff = (oldHeight - height);
            const newX = this.owner.getProperty("x") + widthDiff / diviser;

            tool.at.cellSetProperty(this.owner, "x", newX);
            ownerBounds.left -= widthDiff / diviser;

            if (centered) {
                const newY = this.owner.getProperty("y") + heightDiff / diviser;
                tool.at.cellSetProperty(this.owner, "y", newY);
                ownerBounds.top += heightDiff / diviser;
            }

        }
        if (!centered && !constrained && !minHeightWidthReached) {
            if (!minWidthReached(this.owner, width)) {
                let updatedX = this.owner.getProperty("x");
                updatedX -= dx;
                ownerBounds.left -= dx;
                tool.at.cellSetProperty(this.owner, "x", updatedX);

            }
        }


        if (centered && !constrained && !minHeightAndWidthReached(this.owner, height, width)) {
            if (!minHeightReached(this.owner, height)) {
                let y = this.owner.getProperty("y");
                y -= dy;
                ownerBounds.top -= dy;
                tool.at.cellSetProperty(this.owner, "y", y);

            }

            if (!minWidthReached(this.owner, width)) {
                let x = this.owner.getProperty("x");
                x -= dx;
                ownerBounds.left -= dx;
                tool.at.cellSetProperty(this.owner, "x", x);

            }
        }


        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner, ownerBounds);
    }
}

function minHeightAndWidthReached(owner, height, width) {

    const minHeight = owner.getProperty("minimumHeight");
    const minWidth = owner.getProperty("minimumWidth");
    return height <= minHeight && width <= minWidth;
}

function minHeightReached(owner, height) {

    const minHeight = owner.getProperty("minimumHeight");
    return height <= minHeight;
}
function minWidthReached(owner, width) {
    const minWidth = owner.getProperty("minimumWidth");
    return width <= minWidth;
}