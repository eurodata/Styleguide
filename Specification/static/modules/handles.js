import { GDAlignmentGuideBottomSide, GDAlignmentGuideRightSide, GDAlignmentGuideTopSide } from './GDAlignmentGuide.js';
import { GDFixedLayoutPolicyCode, GDFixResizing } from './model.js';
import { globalBoundsOfElement } from './utils.js'

export class GDHandle {
    constructor(owner, path) {
        this.owner = owner;
        this.path = path;

        this._snapPointDeltaX = 0;
        this._snapPointDeltaY = 0;
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

        const ownerRect = globalBoundsOfElement(this.owner.DOMElement); //handle.owner.getBoundingClientRect(); 

        let p = {};
        
        const keyPath = this.path;
        const delta = 3; 
    
        switch (keyPath) {
            case "topLeft": p = {x: ownerRect.left - delta, y: ownerRect.top - delta}; break;
            case "topCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top - delta}; break;
            case "topRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top - delta}; break;
            case "rightCenter": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break;
            case "bottomRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height - delta}; break;
            case "bottomCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top + ownerRect.height - delta} ; break;
            case "bottomLeft": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height - delta}; break;
            case "leftCenter": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break; 
        }
    
        handleElement.style.left = p.x + "px";
        handleElement.style.top = p.y + "px";
    
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

    dragged(tool, x, y) {}

    startDragAtPoint(tool, x,y) {
        [this._snapPointDeltaX, this._snapPointDeltaY] = this.calculateStartDifference(tool, x, y);
    }

    calculateStartDifference(tool, x,y) {
        return [x,y];
    }
}


export class GDTopCenterHandle extends GDHandle {
    calculateStartDifference(tool,x,y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [0, y-ownerBounds.top];
    }
    
    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideTopSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        let dy =  y - ownerBounds.top;
        let height = this.owner.getProperty("height");
        height -= dy;

        if (centered) {
            height -= dy;
        }

        ownerBounds.height = height;
        if (height <= this.owner.getProperty("minimumHeight")) {
            return;
        }
        tool.at.cellSetProperty(this.owner, "height", height);

        
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing;
        if (constrained) {
            const newWidth = (tool.originalBounds.width/tool.originalBounds.height)* height;
            const oldWidth = this.owner.getProperty("width");
            tool.at.cellSetProperty(this.owner, "width", newWidth);

            if (containerHasFreeLayout) {
                const newX = this.owner.getProperty("x") + (oldWidth - newWidth) / 2;
                tool.at.cellSetProperty(this.owner, "x", newX);
            }
        }

        if (containerHasFreeLayout) {
            let y =  this.owner.getProperty("y");   
            y += dy;
            ownerBounds.top += dy;
            tool.at.cellSetProperty(this.owner, "y", y);
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner,ownerBounds);
    }
}


export class GDBottomCenterHandle extends GDHandle {
    calculateStartDifference(tool,x,y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [0, y-(ownerBounds.top + ownerBounds.height)];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideBottomSide);


        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        if (y < ownerBounds.top) return; 

        let dy =  y - (ownerBounds.top + ownerBounds.height);
        let height = this.owner.getProperty("height");
        height += dy;

        if (centered) {
            height += dy;
        }

        if (height <= this.owner.getProperty("minimumHeight")) {
            return;
        }

        ownerBounds.height = height;

        tool.at.cellSetProperty(this.owner, "height", height);

        
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing;
        if (constrained) {
            const newWidth = (tool.originalBounds.width/tool.originalBounds.height)* height;
            const oldWidth = this.owner.getProperty("width");
            tool.at.cellSetProperty(this.owner, "width", newWidth);

            if (containerHasFreeLayout) {
                const newX = this.owner.getProperty("x") + (oldWidth - newWidth) / 2;
                tool.at.cellSetProperty(this.owner, "x", newX);
            }
        }

        if (containerHasFreeLayout && centered) {
            let y =  this.owner.getProperty("y");   
            y -= dy;
            ownerBounds.top -= dy;
            tool.at.cellSetProperty(this.owner, "y", y);
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner,ownerBounds);
    }
}


export class GDBottomRightHandle extends GDHandle {
    calculateStartDifference(tool,x,y) {
        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
        return [x-(ownerBounds.left + ownerBounds.width), y-(ownerBounds.top + ownerBounds.height)];
    }

    dragged(tool, x, y) {
        y -= this._snapPointDeltaY;
        y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideBottomSide);
        x -= this._snapPointDeltaX;
        x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideRightSide);

        const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
        const centered = containerHasFreeLayout && tool.centered;
        const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing

        let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

        let height = this.owner.getProperty("height");
        let width = this.owner.getProperty("width");
        let dy =  y - (ownerBounds.top + ownerBounds.height);
        let dx =  x - (ownerBounds.left + ownerBounds.width);

        if (constrained) {
            const useY =  Math.abs(dy) < Math.abs(dx);
            if (useY) {
                height += dy;
                width = (tool.originalBounds.width/tool.originalBounds.height)* height;           
            } else {
                width += dx;
                height = (tool.originalBounds.height/tool.originalBounds.width)*width;                
            }
        } else {
            height += dy;
            width += dx;

            if (centered) {
                height += dy;
                width += dx;
            }
        }

        if (height <= this.owner.getProperty("minimumHeight")) {
            return;
        }
        ownerBounds.height = height;

        if (width <= this.owner.getProperty("minimumWidth")) {
            return;
        }
        ownerBounds.width = width;

        tool.at.cellSetProperty(this.owner, "height", height);
        tool.at.cellSetProperty(this.owner, "width", width);
        

        if (centered && !constrained) {
            let y =  this.owner.getProperty("y");   
            y -= dy;
            ownerBounds.top -= dy;
            tool.at.cellSetProperty(this.owner, "y", y);

            let x =  this.owner.getProperty("x");   
            x -= dx;
            ownerBounds.left -= dx;
            tool.at.cellSetProperty(this.owner, "x", x);
        }

        // update cached bounds
        tool.guideCoordinator.cacheBoundsForCell(this.owner,ownerBounds);
    }
}