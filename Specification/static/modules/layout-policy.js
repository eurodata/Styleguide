import { 	GDFixedLayoutPolicyCode,
	GDAlignmentLayoutPolicyCode, 
	GDHorizontalBoxLayoutPolicyCode,
	GDVerticalBoxLayoutPolicyCode
} from './model.js';

import { GDDropTarget } from './GDDropTarget.js';
import { globalBoundsOfElement } from './utils.js';

const GDDropTargetMinimumSize = 14;
const GDDropTargetMaximumSize = 30;


export class GDLayoutPolicy {
    static fromCode(layoutPolicCode) {
        switch(layoutPolicCode) {
            case GDFixedLayoutPolicyCode: return new GDFixedLayoutPolicy();
            case GDAlignmentLayoutPolicyCode: return new GDAlignmentLayoutPolicy();
            case GDVerticalBoxLayoutPolicyCode: return new GDVerticalBoxLayoutPolicy();
            case GDHorizontalBoxLayoutPolicyCode: return new GDHorizontalBoxLayoutPolicy();
        }        
    }

    dropTargetsForCellExcludingPassengers(cell, passengers, continous) {
        return [new GDDropTarget(cell, globalBoundsOfElement(cell.DOMElement))];
    }
}

export class GDBoxLayoutPolicy extends GDLayoutPolicy {

}

export class GDVerticalBoxLayoutPolicy extends GDLayoutPolicy {
    dropTargetsForCellExcludingPassengers(cell, passengers, continous) {
        if (cell.orderedComponents.length == 0) {
            return super.dropTargetsForCellExcludingPassengers(cell, passengers, continous);
        }

        const dropTargets = [];
        const firstChild = cell.orderedComponents[0];
        let b = globalBoundsOfElement(firstChild.DOMElement);




        return dropTargets;
    }
}


export class GDHorizontalBoxLayoutPolicy extends GDLayoutPolicy {

}

export class GDAlignmentLayoutPolicy extends GDLayoutPolicy {

}

export class GDFixedLayoutPolicy extends GDLayoutPolicy {

}
