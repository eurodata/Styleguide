import { GDAlignmentGuideZeroPriority } from "./GDAlignmentGuide.js";
import { globalBoundsOfElement } from "./utils.js";

export class GDGuideCoordinator {
    constructor() {
        this._possibleAlignmentGuides = [];
        this._guideCreators = new Set();
        this._activeAlignmentGuides = [];
        this._selections = [];
        this._boundsCache = new Map();
    }

    static get snappingTolerance() {
        return 5;
    }

    cachedBoundsForCell(cell) {
        let b =  this._boundsCache.get(cell);
        if (!b) {
            b = globalBoundsOfElement(cell.DOMElement);
            this._boundsCache.set(cell, b);    
        }
        return b;
    }

    cacheBoundsForCell(cell, bounds) {
        this._boundsCache.set(cell, bounds);
    }

    prepareWithSelections(selections) {
        this._selections = selections;
        this._possibleAlignmentGuides = [];
        let alignmentCandidates = [];

        if (selections.length == 0)
            return;

        const f = selections[0];
        alignmentCandidates = alignmentCandidates.concat(f.siblings);
        
        this._guideCreators.forEach( creator => {
            const containerGuides = creator.guidesForContainer(f.container);
            this._possibleAlignmentGuides = this._possibleAlignmentGuides.concat(containerGuides);

            alignmentCandidates.forEach( candidate => {
                if (selections.indexOf(candidate) == -1)
                    this._possibleAlignmentGuides = this._possibleAlignmentGuides.concat(creator.guidesForCell(candidate));
            })
        });
    }

    selectionGuides() {
        if (this._selections.length == 0)  {
            return [];
        }

        let selectionGuides = [];

        this._guideCreators.forEach( guideCreator => {
            if (this._selections.length == 1) {
                selectionGuides = selectionGuides.concat( guideCreator.guidesForCell(this._selections[0]));
            } else {
                selectionGuides = selectionGuides.concat( guideCreator.guidesForSelections(this._selections));
            }
        });
        return selectionGuides;
    }

    updateDisplayedSmartGuidesForView(view) {
        this._activeAlignmentGuides = [];
        let selectionGuides = this.selectionGuides();

        const selectionHorizontalGuides = selectionGuides.filter( g => g.isHorizontal );
        const possibleHorizontalGuides = this._possibleAlignmentGuides.filter( g => g.isHorizontal );

        let horizontalLines = [];
        let maximumHorizontalPriority = GDAlignmentGuideZeroPriority;
        selectionHorizontalGuides.forEach( nextSelectionGuide => {
            possibleHorizontalGuides.forEach( nextPossibleAlignmentGuide => {
                if (nextPossibleAlignmentGuide.isAlignedTo(nextSelectionGuide)) {
                    let currentPriority = Math.max(nextPossibleAlignmentGuide.priority, nextSelectionGuide.priority);
                    if (currentPriority > maximumHorizontalPriority) {
                        horizontalLines = [];
                        horizontalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                        maximumHorizontalPriority = currentPriority;
                    } else if (currentPriority == maximumHorizontalPriority) {
                        horizontalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                    }
                } 
            })
        });
         
        const selectionVerticalGuides = selectionGuides.filter( g => g.isVertical );
        const possibleVerticalGuides = this._possibleAlignmentGuides.filter( g => g.isVertical );

        let verticalLines = [];
        let maximumVerticalPriority = GDAlignmentGuideZeroPriority;
        selectionVerticalGuides.forEach( nextSelectionGuide => {
            possibleVerticalGuides.forEach( nextPossibleAlignmentGuide => {
                if (nextPossibleAlignmentGuide.isAlignedTo(nextSelectionGuide)) {
                    let currentPriority = Math.max(nextPossibleAlignmentGuide.priority, nextSelectionGuide.priority);
                    if (currentPriority > maximumVerticalPriority) {
                        verticalLines = [];
                        verticalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                        maximumVerticalPriority = currentPriority;
                    } else if (currentPriority == maximumVerticalPriority) {
                        verticalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                    }
                } 
            })
        });

        let lines = horizontalLines.concat(verticalLines);
        view.updateGuideLines(lines);

    }

    clearLinesForView(view) {
        view.updateGuideLines([]);
    }

    addGuideCreator(guideCreator) {
        this._guideCreators.add(guideCreator);
        guideCreator.guideCoordinator = this;
    }

    nearestDistance(selectionGuides, possibleGuides, delta) {
        let nearestDistance = Number.MAX_VALUE;
        possibleGuides.forEach( possibleGuide => {
            selectionGuides.forEach( selectionGuide => {
                if (possibleGuide.canSnapTo(selectionGuide)) {
                    const distance = possibleGuide.distanceTo(selectionGuide);
                    if (Math.abs( distance - delta) < Math.abs(nearestDistance)) {
                        nearestDistance = distance;
                    }
                }
            })
        });

        return nearestDistance;
    }

    snapDelta(dx, dy) {
        const selectionGuides = this.selectionGuides();
        const verticalSelectionGuides = selectionGuides.filter( g => g.isVertical );
        const possibleVerticalGuides = this.possibleAlignmentGuides.filter( g => g.isVertical );

        const nearestVerticalDistance = this.nearestDistance(verticalSelectionGuides, possibleVerticalGuides, dy);
        if (Math.abs(nearestVerticalDistance - dy) < GDGuideCoordinator.snappingTolerance) {
            dy = nearestVerticalDistance;
        }

        const horizontalSelectionGuides = selectionGuides.filter( g => g.isHorizontal );
        const possibleHorizontalGuides = this.possibleAlignmentGuides.filter( g => g.isHorizontal );

        const nearestHorizontalDistance = this.nearestDistance(horizontalSelectionGuides, possibleHorizontalGuides, dx);
        if (Math.abs(nearestHorizontalDistance - dx) < GDGuideCoordinator.snappingTolerance) {
            dx = nearestHorizontalDistance;
        }

        this._selections.forEach( c => {
            const b = this._boundsCache.get(c);
            if (b) {
                b.top += dy;
                b.left += dx;
                this._boundsCache.set(c,b);
            }
        });

        return [dx,dy];
    }

    nearestAlignmentGuidePair(selectionGuides, possibleGuides) {
        let nearestDistance = Number.MAX_VALUE;
        let nearestGuide, selectionGuide;

        possibleGuides.forEach( nextPossibleGuide => {
            selectionGuides.forEach( nextSelectionGuide => {
                if (nextPossibleGuide.canSnapTo(nextSelectionGuide)) {
                    const distance = nextPossibleGuide.distanceTo(nextSelectionGuide);
                    if (Math.abs(distance) < Math.abs(nearestDistance)) {
                        nearestDistance = distance;
                        nearestGuide = nextPossibleGuide;
                        selectionGuide = nextSelectionGuide;
                    }
                }
            })
        });

        return [nearestGuide, selectionGuide];
    }

    snapVertical(pos,side) {
        const selectionGuides = this.selectionGuides().filter( g => g.isVertical && g.side == side);
        const possibleGuides = this.possibleAlignmentGuides.filter( g => g.isVertical );

        let [nearestGuide, selectionGuide] = this.nearestAlignmentGuidePair(selectionGuides, possibleGuides);
        if (!nearestGuide || !selectionGuide) {
            return pos;
        }

        if (Math.abs(nearestGuide.position - pos) < GDGuideCoordinator.snappingTolerance)  {
            return nearestGuide.position;
        }

        return pos;
    }

    snapHorizontal(pos,side) {
        const selectionGuides = this.selectionGuides().filter( g => g.isHoriztontal && g.side == side);
        const possibleGuides = this.possibleAlignmentGuides.filter( g => g.isHoriztontal );

        let [nearestGuide, selectionGuide] = this.nearestAlignmentGuidePair(selectionGuides, possibleGuides);
        if (!nearestGuide || !selectionGuide) {
            return pos;
        }

        if (Math.abs(nearestGuide.position - pos) < GDGuideCoordinator.snappingTolerance)  {
            return nearestGuide.position;
        }

        return pos;
    }


    get possibleAlignmentGuides() {
        return this._possibleAlignmentGuides;
    }
}
