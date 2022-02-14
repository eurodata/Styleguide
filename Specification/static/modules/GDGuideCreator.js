import {
    GDVerticalEdgeAlignmentGuide,
    GDHorizontalEdgeAlignmentGuide,
    GDHorizontalMarginAlignmentGuide,
    GDVerticalMarginAlignmentGuide,
    GDHorizontalPaddingAlignmentGuide,
    GDVerticalPaddingAlignmentGuide,
    GDHorizontalCenterAlignmentGuide,
    GDVerticalCenterAlignmentGuide,
    GDAlignmentGuideTopSide,
    GDAlignmentGuideRightSide,
    GDAlignmentGuideBottomSide,
    GDAlignmentGuideCenterSide,
    GDAlignmentGuideLeftSide
} from "./GDAlignmentGuide.js";

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
        selections.forEach(c => {
            let b = this.guideCoordinator.cachedBoundsForCell(c);
            if (b.top < minY || !minY) minY = b.top;
            if (b.left < minX || !minX) minX = b.left;
            if (b.top + b.height > maxY || !maxY) maxY = b.top + b.height;
            if (b.left + b.width > maxX || !maxX) maxX = b.left + b.width;
        });

        const bounds = { top: minY, left: minX, width: maxX - minX, height: maxY - minY };
        let cell = selections[0];

        this.guideCoordinator.cacheBoundsForCell(cell, bounds);
        return cell;
    }
}


export class GDEdgeGuideCreator extends GDGuideCreator {
    guidesForContainer(container) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(container);

        return [
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.top, GDAlignmentGuideTopSide),
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.top + bounds.height, GDAlignmentGuideBottomSide),
            new GDHorizontalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.left, GDAlignmentGuideLeftSide),
            new GDHorizontalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.left + bounds.width, GDAlignmentGuideRightSide)
        ];
    }
    guidesForCell(cell) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(cell);

        return [
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.top, GDAlignmentGuideTopSide),
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.top + bounds.height, GDAlignmentGuideBottomSide),
            new GDHorizontalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.left, GDAlignmentGuideLeftSide),
            new GDHorizontalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.left + bounds.width, GDAlignmentGuideRightSide)
        ];
    }

    guidesForSelections(selections) {
        let o = this.createMultipleCellObject(selections);
        let bounds = this.guideCoordinator.cachedBoundsForCell(o);

        return [
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.top, GDAlignmentGuideTopSide),
            new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.top + bounds.height, GDAlignmentGuideBottomSide),
            new GDHorizontalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.left, GDAlignmentGuideLeftSide),
            new GDHorizontalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.left + bounds.width, GDAlignmentGuideRightSide)
        ];
    }

    getValueFromComputedStyle(styleProperty) {
        return parseInt(styleProperty.replace('px', ''));
    }
}

export class GDCenterGuideCreator extends GDGuideCreator {
    guidesForContainer(container) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(container);

        return [
            new GDVerticalCenterAlignmentGuide(this.guideCoordinator, container, bounds.top + bounds.height / 2, GDAlignmentGuideCenterSide),
            new GDHorizontalCenterAlignmentGuide(this.guideCoordinator, container, bounds.left + bounds.width / 2, GDAlignmentGuideCenterSide),
        ];
    }
    guidesForCell(cell) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(cell);

        return [
            new GDVerticalCenterAlignmentGuide(this.guideCoordinator, cell, bounds.top + bounds.height / 2, GDAlignmentGuideCenterSide),
            new GDHorizontalCenterAlignmentGuide(this.guideCoordinator, cell, bounds.left + bounds.width / 2, GDAlignmentGuideCenterSide),
        ];
    }

    guidesForSelections(selections) {
        let o = this.createMultipleCellObject(selections);
        let bounds = this.guideCoordinator.cachedBoundsForCell(o);

        return [
            new GDVerticalCenterAlignmentGuide(this.guideCoordinator, o, bounds.top + bounds.height / 2, GDAlignmentGuideCenterSide),
            new GDHorizontalCenterAlignmentGuide(this.guideCoordinator, o, bounds.left + bounds.width / 2, GDAlignmentGuideCenterSide),
        ];
    }

}


export class GDPaddingGuideCreator extends GDGuideCreator {
    guidesForContainer(container) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(container);
        const computedStyles = getComputedStyle(container.DOMElement);
        const paddingTop = this.getValueFromComputedStyle(computedStyles.paddingTop);
        const paddingBottom = this.getValueFromComputedStyle(computedStyles.paddingBottom);
        const paddingLeft = this.getValueFromComputedStyle(computedStyles.paddingLeft);
        const paddingRight = this.getValueFromComputedStyle(computedStyles.paddingRight);

        return [
            new GDHorizontalPaddingAlignmentGuide(this.guideCoordinator, container, bounds.left + paddingLeft, GDAlignmentGuideLeftSide),
            new GDHorizontalPaddingAlignmentGuide(this.guideCoordinator, container, bounds.left + bounds.width - paddingRight, GDAlignmentGuideRightSide),
            new GDVerticalPaddingAlignmentGuide(this.guideCoordinator, container, bounds.top + paddingTop, GDAlignmentGuideTopSide),
            new GDVerticalPaddingAlignmentGuide(this.guideCoordinator, container, bounds.top + bounds.height - paddingBottom, GDAlignmentGuideBottomSide)
        ];
    }
    guidesForCell(cell) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(cell);
        const computedStyles = getComputedStyle(cell.DOMElement);
        const paddingTop = this.getValueFromComputedStyle(computedStyles.paddingTop);
        const paddingBottom = this.getValueFromComputedStyle(computedStyles.paddingBottom);
        const paddingLeft = this.getValueFromComputedStyle(computedStyles.paddingLeft);
        const paddingRight = this.getValueFromComputedStyle(computedStyles.paddingRight);

        return [
            new GDHorizontalPaddingAlignmentGuide(this.guideCoordinator, cell, bounds.left + paddingLeft, GDAlignmentGuideLeftSide),
            new GDHorizontalPaddingAlignmentGuide(this.guideCoordinator, cell, bounds.left + bounds.width - paddingRight, GDAlignmentGuideRightSide),
            new GDVerticalPaddingAlignmentGuide(this.guideCoordinator, cell, bounds.top + paddingTop, GDAlignmentGuideTopSide),
            new GDVerticalPaddingAlignmentGuide(this.guideCoordinator, cell, bounds.top + bounds.height - paddingBottom, GDAlignmentGuideBottomSide)
        ];
    }

    guidesForSelections(selections) {
        let o = this.createMultipleCellObject(selections);
        let bounds = this.guideCoordinator.cachedBoundsForCell(o);

        const computedStyles = getComputedStyle(o.DOMElement);
        const paddingTop = this.getValueFromComputedStyle(computedStyles.paddingTop);
        const paddingBottom = this.getValueFromComputedStyle(computedStyles.paddingBottom);
        const paddingLeft = this.getValueFromComputedStyle(computedStyles.paddingLeft);
        const paddingRight = this.getValueFromComputedStyle(computedStyles.paddingRight);

        return [
            new GDHorizontalPaddingAlignmentGuide(this.guideCoordinator, o, bounds.left + paddingLeft, GDAlignmentGuideLeftSide),
            new GDHorizontalPaddingAlignmentGuide(this.guideCoordinator, o, bounds.left + bounds.width - paddingRight, GDAlignmentGuideRightSide),
            new GDVerticalPaddingAlignmentGuide(this.guideCoordinator, o, bounds.top + paddingTop, GDAlignmentGuideTopSide),
            new GDVerticalPaddingAlignmentGuide(this.guideCoordinator, o, bounds.top + bounds.height - paddingBottom, GDAlignmentGuideBottomSide)
        ];
    }

    getValueFromComputedStyle(styleProperty) {
        return parseInt(styleProperty.replace('px', ''));
    }
}

export class GDMarginGuideCreator extends GDGuideCreator {
    guidesForContainer(container) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(container);
        const computedStyles = getComputedStyle(container.DOMElement);
        const marginTop = this.getValueFromComputedStyle(computedStyles.marginTop);
        const marginBottom = this.getValueFromComputedStyle(computedStyles.marginBottom);
        const marginLeft = this.getValueFromComputedStyle(computedStyles.marginLeft);
        const marginRight = this.getValueFromComputedStyle(computedStyles.marginRight);

        return [

            new GDHorizontalMarginAlignmentGuide(this.guideCoordinator, container, bounds.left - marginLeft, GDAlignmentGuideLeftSide),
            new GDHorizontalMarginAlignmentGuide(this.guideCoordinator, container, bounds.left + bounds.width + marginRight, GDAlignmentGuideRightSide),
            new GDVerticalMarginAlignmentGuide(this.guideCoordinator, container, bounds.top - marginTop, GDAlignmentGuideTopSide),
            new GDVerticalMarginAlignmentGuide(this.guideCoordinator, container, bounds.top + bounds.height + marginBottom, GDAlignmentGuideBottomSide)
        ];
    }
    guidesForCell(cell) {
        const bounds = this.guideCoordinator.cachedBoundsForCell(cell);
        const computedStyles = getComputedStyle(cell.DOMElement);

        const marginTop = this.getValueFromComputedStyle(computedStyles.marginTop);
        const marginBottom = this.getValueFromComputedStyle(computedStyles.marginBottom);
        const marginLeft = this.getValueFromComputedStyle(computedStyles.marginLeft);
        const marginRight = this.getValueFromComputedStyle(computedStyles.marginRight);

        return [
            new GDHorizontalMarginAlignmentGuide(this.guideCoordinator, cell, bounds.left - marginLeft, GDAlignmentGuideLeftSide),
            new GDHorizontalMarginAlignmentGuide(this.guideCoordinator, cell, bounds.left + bounds.width + marginRight, GDAlignmentGuideRightSide),
            new GDVerticalMarginAlignmentGuide(this.guideCoordinator, cell, bounds.top - marginTop, GDAlignmentGuideTopSide),
            new GDVerticalMarginAlignmentGuide(this.guideCoordinator, cell, bounds.top + bounds.height + marginBottom, GDAlignmentGuideBottomSide)
        ];
    }

    guidesForSelections(selections) {
        let o = this.createMultipleCellObject(selections);
        let bounds = this.guideCoordinator.cachedBoundsForCell(o);

        const computedStyles = getComputedStyle(o.DOMElement);
        const marginTop = this.getValueFromComputedStyle(computedStyles.marginTop);
        const marginBottom = this.getValueFromComputedStyle(computedStyles.marginBottom);
        const marginLeft = this.getValueFromComputedStyle(computedStyles.marginLeft);
        const marginRight = this.getValueFromComputedStyle(computedStyles.marginRight);

        return [
            new GDHorizontalMarginAlignmentGuide(this.guideCoordinator, o, bounds.left - marginLeft, GDAlignmentGuideLeftSide),
            new GDHorizontalMarginAlignmentGuide(this.guideCoordinator, o, bounds.left + bounds.width + marginRight, GDAlignmentGuideRightSide),
            new GDVerticalMarginAlignmentGuide(this.guideCoordinator, o, bounds.top - marginTop, GDAlignmentGuideTopSide),
            new GDVerticalMarginAlignmentGuide(this.guideCoordinator, o, bounds.top + bounds.height + marginBottom, GDAlignmentGuideBottomSide)
        ];
    }

    getValueFromComputedStyle(styleProperty) {
        return parseInt(styleProperty.replace('px', ''));
    }
}
