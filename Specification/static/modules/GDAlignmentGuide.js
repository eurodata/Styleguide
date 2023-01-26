import { GDAlignmentLine } from "./GDAlignmentLine.js";

export const GDAlignmentGuideTopSide = 0,
    GDAlignmentGuideRightSide = 1,
    GDAlignmentGuideBottomSide = 2,
    GDAlignmentGuideLeftSide = 3,
    GDAlignmentGuideCenterSide = 4,
    GDAlignmentGuideBaselineSide = 5;

export const GDAlignmentGuideBaselinePriority = 100,
    GDAlignmentGuideEdgePriority = 90,
    GDAlignmentGuideCenterPriority = 80,
    GDAlignmentGuideMarginPriority = 70,
    GDAlignmentGuidePaddingPriority = 60,
    GDAlignmentGuideZeroPriority = 0



export class GDAlignmentGuide {
    constructor(coordinator, cell, position, side) {
        this.guideCoordinator = coordinator;
        this.cell = cell;
        this.position = position;
        this.side = side;
    }

    get isHorizontal() {
        return false;
    }

    get isVertical() {
        return false;
    }

    get priority() {
        return GDAlignmentGuideZeroPriority; // mmhmm like in Objective-C with subclass for everything or parameter?
    }

    alignmentLineTo(otherAlignmentGuide) {
        return undefined;
    }

    isAlignedTo(otherAlignmentGuide) {
        return this.position == otherAlignmentGuide.position;
    }

    distanceTo(otherAlignmentGuide) {
        return this.position - otherAlignmentGuide.position;
    }

    canSnapTo(otherAlignmentGuide) {
        return Object.getPrototypeOf(otherAlignmentGuide) == Object.getPrototypeOf(this);
    }
}

export class GDHoriontalAlignmentGuide extends GDAlignmentGuide {
    get isHorizontal() {
        return true;
    }

    alignmentLineTo(otherAlignmentGuide) {
        if (this.cell.container == otherAlignmentGuide.cell) {
            const containerBounds = this.guideCoordinator.cachedBoundsForCell(otherAlignmentGuide.cell);
            return new GDAlignmentLine(containerBounds.left, containerBounds.top, containerBounds.left, containerBounds.top + containerBounds.height);
        }

        let startCell = this.cell;
        let endCell = otherAlignmentGuide.cell;

        const startBounds = this.guideCoordinator.cachedBoundsForCell(startCell);
        const endBounds = this.guideCoordinator.cachedBoundsForCell(endCell);

        if (startBounds.top > endBounds.top) {
            return new GDAlignmentLine(otherAlignmentGuide.position, endBounds.top, otherAlignmentGuide.position, startBounds.top + startBounds.height );
        } 

        return new GDAlignmentLine(this.position, startBounds.top, this.position, endBounds.top + endBounds.height );
    }

}


export class GDVerticalAlignmentGuide extends GDAlignmentGuide {
    get isVertical() {
        return true;
    }

    alignmentLineTo(otherAlignmentGuide) {
        if (this.cell.container == otherAlignmentGuide.cell) {
            const containerBounds = this.guideCoordinator.cachedBoundsForCell(otherAlignmentGuide.cell);
            return new GDAlignmentLine(containerBounds.left, containerBounds.top, containerBounds.left, containerBounds.top + containerBounds.height);
        }

        let startCell = this.cell;
        let endCell = otherAlignmentGuide.cell;

        const startBounds = this.guideCoordinator.cachedBoundsForCell(startCell);
        const endBounds = this.guideCoordinator.cachedBoundsForCell(endCell);

        if (startBounds.left > endBounds.left) {
            return new GDAlignmentLine(endBounds.left, otherAlignmentGuide.position, startBounds.left + startBounds.width, otherAlignmentGuide.position );
        } 

        return new GDAlignmentLine(startBounds.left, this.position,  endBounds.left + endBounds.width, this.position);
    }

}

export class GDVerticalEdgeAlignmentGuide extends GDVerticalAlignmentGuide {

}