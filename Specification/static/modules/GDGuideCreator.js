import { GDVerticalEdgeAlignmentGuide, GDAlignmentGuideTopSide, GDAlignmentGuideBottomSide } from "./GDAlignmentGuide.js";

export class GDGuideCreator {
    constructor() {
        this.guideCoordinator = undefined;
    }

    guidesForCell(cell) {
        return [];
    }

    guidesForContainer(container) {
        return [];
    }

    guidesForSelections(selections) {
        return [];
    }

    createMultipleCellObject(selections) {
        let minX, minY, maxX, maxY;
        selections.forEach( c => {
            let b = this.guideCoordinator.cachedBoundsForCell(c);
            if (b.top < minY || !minY) minY = b.top;
            if (b.left < minX || !minX) minX = b.left;
            if (b.top + b.height > maxY || !maxY) maxY = b.top + b.height;
            if (b.left + b.width > maxX || !maxX) maxX = b.left + b.width;
        });

        const bounds = {top:minY, left: minX, width: maxX - minX, height: maxY - minY};

        let o = {
            cell: selections[0]
        }

        this.guideCoordinator.cacheBoundsForCell(o,bounds);
        return o;
    }
}


export class GDEdgeGuideCreator extends GDGuideCreator {
    guidesForContainer(container) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(container);
        return [
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.top, GDAlignmentGuideTopSide),
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.top + bounds.height, GDAlignmentGuideBottomSide)
        ];
    }
    guidesForCell(cell) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(cell);
        return [
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.top, GDAlignmentGuideTopSide),
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.top + bounds.height, GDAlignmentGuideBottomSide)
        ];
    }

    guidesForSelections(selections) {
        let o = this.createMultipleCellObject(selections);
        let bounds = this.guideCoordinator.cachedBoundsForCell(o);
        return [
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.top, GDAlignmentGuideTopSide),
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.top + bounds.height, GDAlignmentGuideBottomSide)
        ];
    }
}

export class GDCenterGuideCreator extends GDGuideCreator {
    
}