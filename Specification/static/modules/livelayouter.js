//@ts-check

import { GDFixedLayoutPolicyCode, GDHorizontalBoxLayoutPolicyCode, GDVerticalBoxLayoutPolicyCode, GDAlignmentLayoutPolicyCode } from "./model.js";
import { globalBoundsOfElement } from "./utils.js";
import { GDLiveLayouterModeSelector } from "./GDLiveLayouterModeSelector.js";

class GDActiveContainerStrategy {
    constructor(liveLayouter) {
        this._liveLayouter = liveLayouter;
    }

    selectTarget(aDropTarget) {
        
    }

    updatePassengerElements(draggingInfo) {

    }

    removePassengerElements() {

    }

    alreadyInsertedInContainer(targetElement) {
        let containers = new Set();

        this._liveLayouter.passengerElements.forEach(e => containers.add(e.parentNode));
        if (containers.size != 1) {
            return false;
        }

        let containerArray = Array.from(containers);

        return containerArray[0] == targetElement;
    }

    get insertedCells() {
        return [];
    }

    cleanup () {}

    get continousDropTargets() {
        return false;
    }

    get draggingInfo() {
        return this._liveLayouter.draggingInfo;
    }
}

class GDActiveFixedLayoutContainerStrategy extends GDActiveContainerStrategy {
    constructor(liveLayouter) {
        super(liveLayouter);
        this._lastX = null;
        this._lastY = null;
    }

    removePassengerElements() {
        this._liveLayouter.passengers.forEach(p => {
            if (p.DOMElement) {
                p.DOMElement.remove();
            }

            if (p.container) {
                p.container.removeComponent(p);
            }
        });
    }

    updatePassengerElements() {

    }


    selectTarget(aDropTarget) {
        this._liveLayouter.passengers.forEach(p => {
            if (!p.container) {
                aDropTarget.container.addComponent(p);
                let element = this._liveLayouter._at.buildDOMForCell(p);
                aDropTarget.container.DOMElement.appendChild(element);
    
            }
            
        });
        /*
        NSPoint localImageLocation = [self.workingAreaView convertPoint:[self.draggingInfo draggedImageLocation] fromView:nil];

        NSAffineTransform* globalToLocalTransform = [self.activeDropTarget.container affineTransform];
        [globalToLocalTransform appendTransform:[self.activeDropTarget.container absoluteAffineTransform]];
        [globalToLocalTransform invert];
        localImageLocation = [globalToLocalTransform transformPoint:localImageLocation];
    
        NSSize draggedImageSize = [[self.draggingInfo draggedImage] size];
        CGFloat scaleFactor = [self scaleFactor];
        localImageLocation.y -= draggedImageSize.height / scaleFactor;
    
        [self insertPassengerRenderObjectsAtPoint:localImageLocation inContainer:self.activeDropTarget.container atIndex:self.activeDropTarget.index];
    
        [[self.workingAreaView guideCoordinator] prepareWithSelections:self.passengerRenderObjects];
        _cellBoundsChange = [GDCellBoundsChange cellBoundsChangeWithScreenChangeManager:self.screenChangeManager cells:self.passengerRenderObjects];
        _absoluteDelta = NSMakePoint(0, 0);
        _lastAlignedPoint = [self.workingAreaView convertPoint:[self.draggingInfo draggedImageLocation] fromView:nil];
        
        // Issue #136 take scrolling into account. Still buggy, but better than before
        CGFloat scrollDeltaLeft = 0;
        CGFloat scrollDeltaTop = 0;
        GDCellRenderObject* container = self.activeDropTarget.container;
        while (container) {
            scrollDeltaLeft += container.scrollLeft;
            scrollDeltaTop += container.scrollTop;
            container = container.container;
        }
        
        
        _lastAlignedPoint.x = _lastAlignedPoint.x - scrollDeltaLeft; // self.activeDropTarget.container.scrollLeft;
        _lastAlignedPoint.y = _lastAlignedPoint.y - scrollDeltaTop; // self.activeDropTarget.container.scrollTop;
        GDEvent* event = [GDEvent eventWithCocoaEvent:[NSApp currentEvent] inView:self.workingAreaView];
        [GDToolTip showDragTooltipForRenderObjects:self.passengerRenderObjects event:event];
*/    
    }
}

export class GDActiveBoxLayoutContainerStrategy extends GDActiveContainerStrategy {
    constructor(liveLayouter) {
        super(liveLayouter);
        const alreadyInserted = this.alreadyInsertedInContainer(liveLayouter.activeDropTarget.container.DOMElement)
        if (!alreadyInserted) {
            this._liveLayouter.removePassengerElements();
        }
    }

    selectTargetAlreadyInserted(aDropTarget) {
        this._liveLayouter.removePassengerElements();

    }   

    selectTargetNotInserted(aDropTarget) {

    }

    selectTarget(aDropTarget) {
        const alreadyInserted = this.alreadyInsertedInContainer(aDropTarget.container.DOMElement);
        if (alreadyInserted) {
            this.selectTargetAlreadyInserted(aDropTarget);
        } else {
            this.selectTargetNotInserted(aDropTarget);
        }
    }
}

export class GDActiveAlignmentContainerStrategy extends GDActiveContainerStrategy {

}


export class GDContainerTargetFinder {
    constructor(liveLayouter) {
        this._liveLayouter = liveLayouter;  
    }

    containersWithDropTargetAtPoint(containers, x, y)  {
        let result = [];
        containers.forEach( container => {
            let dropTargets = this._liveLayouter.dropTargetsOfContainer(container);
            dropTargets.forEach( dropTarget => {
                if (dropTarget.isTargetForPoint(x,y)) {
                    result.push(container);
                }
            });
        });
        return result;
    }

    filterContainers(containers) {
        return containers;
    }

    weightedContainersAtPoint(x,y) {
        const allAtPoint = document.elementsFromPoint(x,y);
        let result = allAtPoint.filter( c => {
            if (!c.figure) {    // only Antetype-cells
                return false;
            }
            for (let i=0; i<this._liveLayouter.passengers.length; i++) {
                const p = this._liveLayouter.passengers[i];
                if (p == c.figure || c.figure.isDescendentOf(p))
                    return false;
            }
            return true;
        })

        result = result.map( e => e.figure);

        if (this._liveLayouter.activeDropTarget) {
            result = this.containersWithDropTargetAtPoint(result, x, y);
        }

        result = this.filterContainers(result);
        this._cursorX = x;
        this._cursorY = y;
        return result;
    }

    nearestDropTarget(dropTargets,x,y) {
        let nearestDistance = Number.MAX_VALUE;
        let nearestDropTarget = null;

        dropTargets.forEach( dropTarget => {
            const nextDistance = dropTarget.distanceToPoint(x,y);
            if (nextDistance < nearestDistance) {
                nearestDistance = nextDistance;
                nearestDropTarget = dropTarget;
            }
        });

        return nearestDropTarget;

    }

}

export class GDLiveLayouter {
    constructor(at) {
        this._at = at;

        this._showsOriginalRenderObjects = false;
        this._activeDropTarget = null;
        this._moveMode = false;
        this._passengers = [];
        this._passengerElements = [];
        this._originalElements = null;
        this._targetFinder = new GDContainerTargetFinder(this);
        this._activeContainerStrategy = null;
        this._selectionTimer = new GDLiveLayouterModeSelector();
    }

    get activeDropTarget() {
        return this._activeDropTarget;
    }

    set activeDropTarget(aTarget) {
        if (this.activeDropTarget == aTarget) {
            return;
        }

        this.invalidateActiveDropTargetsInView();

        const containerChanged = !this.activeDropTarget || (aTarget.container != this._activeDropTarget.container);

        this._activeDropTarget = aTarget;
        this.invalidateActiveDropTargetsInView();

        if (containerChanged) {
            if (this._activeContainerStrategy) {
                this._activeContainerStrategy.cleanup();
            }
            const layoutPolicyCode = aTarget.container.valueForKeyInStateWithIdentifier("layoutPolicyCode", aTarget.container.activeStateIdentifier);
            switch (layoutPolicyCode) {
                case GDFixedLayoutPolicyCode: 
                    this._activeContainerStrategy = new GDActiveFixedLayoutContainerStrategy(this); 
                    break;
                case GDHorizontalBoxLayoutPolicyCode:
                case GDVerticalBoxLayoutPolicyCode:
                    this._activeContainerStrategy = new GDActiveBoxLayoutContainerStrategy(this); 
                    break;
                case GDAlignmentLayoutPolicyCode: 
                    this._activeContainerStrategy = new GDActiveAlignmentContainerStrategy(this);
                    break;

                default:
                    this._activeContainerStrategy = new GDActiveContainerStrategy(this);
            }
        }
    }

    set containerSelectDelay(d) {
        this._selectionTimer.containerSelectDelay = d;
    }

    get containerSelectDelay() {
        return this._selectionTimer.containerSelectDelay;
    }

    set highlightTargetDelay(d) {
        this._selectionTimer.highlightTargetDelay = d;
    }

    get highlightTargetDelay() {
        return this._selectionTimer.highlightTargetDelay;
    }

    set blinkingDuration(d) {
        this._selectionTimer.blinkingDuration = d;
    }

    get blinkingDuration() {
        return this._selectionTimer.blinkingDuration;
    }

    get searchMode() {
        return this._selectionTimer.isRunning;
    }

    get showsOriginalRenderObjects() {
        return this._showsOriginalRenderObjects;
    }

    get moveMode() {
        return this._moveMode;
    }

    get passengers() {
        return this._passengers;
    }

    get draggingInfo() {
        return this._draggingInfo;
    }

    invalidateActiveDropTargetsInView() {}

    bestContainerAtPoint(x,y) {
        const possibleContainers = this._targetFinder.weightedContainersAtPoint(x,y);
        if (possibleContainers.length == 0) {
            return null;
        }

        return possibleContainers[0];
    }

    liveLayoutCells() {
        let ignored = this._passengers;
        if (!this._passengers) {
            ignored = [];
        }
        if (this._activeContainerStrategy) {
            ignored = ignored.concat(this._activeContainerStrategy.insertedCells);
        }
        return ignored;
    }

    dropTargetsOfContainerContinous(container, continous) {
        const ignored = this.liveLayoutCells();
        if (continous) {
            return container.dropTargetsExcludingPassengers(ignored);
        } else {
            return container.continousDropTargetsExcludingPassengers(ignored);
        }
    }

    dropTargetsOfContainer(container) {
        return this.dropTargetsOfContainerContinous(container, false);
    }

    highlightContainer(container) {
        if (!container || this.activeDropTarget.container == container) {
            this._at.setPossibleTargetRect(0,0,0,0);
        } else {
            let b = globalBoundsOfElement(container.DOMElement);
            this._at.setPossibleTargetRect(b.left, b.top, b.width, b.height);
        }
    }

    selectTarget(bestTarget) {
        if (bestTarget.isEqual(this._activeDropTarget)) {
            return;
        }


        if (!bestTarget) {
            return;
        }

        this.highlightContainer(null);
        this.activeDropTarget = bestTarget;

    //    [[self.workingAreaView guideCoordinator] clearAlignmentGuidesForView:self.workingAreaView];

        this._activeContainerStrategy.selectTarget(bestTarget);
        this._activeDropTarget.insertedRenderObjects = this._passengerElements;
        this._activeDropTarget.resizetoFreeSpace();

    }


    selectBestTargetForPoint(x,y) {
        const bestContainer = this.bestContainerAtPoint(x,y);
        if (!bestContainer) {
            return;
        }

        const dropTargets = this.dropTargetsOfContainer(bestContainer);
        let nearestDropTarget = this._targetFinder.nearestDropTarget(dropTargets,x,y);
        this.selectTarget(nearestDropTarget);
    }

    buildPassengerElements(passengers) {
        this._passengers = passengers;
        this._passengerElements = [];
        this._passengersAreNestable = true;
        let passengersAlreadyInserted = false;
        this._passengers.forEach( p => {
            if (p.container) {
                passengersAlreadyInserted = true;
            }

            if (!p.valueForKeyInStateWithIdentifier("isNestable", p.activeStateIdentifier)) {
                this._passengersAreNestable = false;
            }

            let passengerElement = p.DOMElement;
            if (!passengerElement) {
                // passengerElement = this._at.buildDOMForCell(p);
                // does not work, since css-building needs a screen
                // not sure what to do currently only a unstyled cell:
                passengerElement = document.createElement("cell");
                passengerElement.figure = p; 
                p.DOMElement = passengerElement; 
            }

            this._passengerElements.push(passengerElement);
        });

        const sortFunction = (obj1, obj2) => {
            if (obj1.figure.index == obj2.figure.index) {
                return 0;
            }

            if (obj1.figure.index < obj2.figure.index) {
                return -1;
            }

            return 1;
        };
        this._passengerElements.sort(sortFunction);

        return passengersAlreadyInserted;
    }

    selectExistingTarget() {
        const p = this._passengers[0];
        let container = p.container;

        let dropTargets = this.dropTargetsOfContainer(container);

        if (dropTargets.length == 1) {
            this.selectTarget(dropTargets[0]);
        } else  {
            for (let i=0; i<dropTargets.length; i++) {
                const target = dropTargets[i];
                if (target.index == p.index) {
                    this.selectTarget(target);
                    break;
                }
            }
        }
}


    setPassengers(passengers, draggingInfo) {
        this._draggingInfo = draggingInfo;
        const passengersAlreadyInserted = this.buildPassengerElements(passengers);

        if (passengersAlreadyInserted) {
            this.selectExistingTarget();
        }
        this._originalElements = null;
    
        this._passengers = passengers;
        this._isBlinking = false;
        
    }

    updatePassengerElements() {
        this._activeContainerStrategy.updatePassengerElements(this._draggingInfo);
    }

    removePassengerElements() {
        this._activeContainerStrategy.removePassengerElements();
    }

    get passengerElements() {
        return this._passengerElements;
    }

    insertOriginalElements() {
        if (this.showsOriginalElements) {
            return;
        }

        let renderObjects = [];
        this._passengers.forEach( passenger => {
            const container = passenger.container;

            if (this.activeDropTarget && container == this.activeDropTarget.container) {
                if (passenger.index <= this.activeDropTarget.index) {
                    this.activeDropTarget.index += 1;
                }
            }

            // mmmhm we can only build the elements if it is part of the screem
            if (!container) {
                if (this.activeDropTarget) {
                    this.activeDropTarget.container.insertComponent(passenger, this.activeDropTarget.index);
                }
            }

            if (passenger.container && passenger.container.DOMElement) {
                let containerElement = passenger.container.DOMElement;
                
                let element = this._at.buildDOMForCell(passenger);

                if (passenger.index == container.orderedComponents.length-1) {
                    containerElement.appendChild(element);
                } else {
                    const referenceNode = containerElement.childNodes[passenger.index+1];
                    containerElement.insertBefore(element, referenceNode);
                }
                renderObjects.push(element);

            }

        });
        this._originalElements = renderObjects;

        // [[self.workingAreaView guideCoordinator] clearAlignmentGuidesForView:self.workingAreaView];
        // [[self.workingAreaView guideCoordinator] prepareWithSelections:_passengerRenderObjects];
    }

    removeOriginalElements() {
        if (!this.showsOriginalElements) {
            return;
        }

        this._originalElements.forEach( element => {
            element.remove();
            
        });
        this._originalElements = null;

/*

    [_screenChangeManager doWorkUsingBlock:^{
        for (GDRenderObject* renderObject in _originalRenderObjects) {
            GDCellRenderObject* containerRenderObject = [renderObject container];
            if ([containerRenderObject isEqual: self.activeDropTarget.container]) {
                if (renderObject.index < self.activeDropTarget.index)
                    self.activeDropTarget.index -= 1;
            }

            [containerRenderObject removeComponentAtIndex:[renderObject index]];
        }
    }];

    _originalRenderObjects = nil; */

    // [[self.workingAreaView guideCoordinator] clearAlignmentGuidesForView:self.workingAreaView];
    // [[self.workingAreaView guideCoordinator] prepareWithSelections:_passengerRenderObjects];



    }

    get showsOriginalElements() {
        return this._originalElements != null;
    }

    get isBlinking() {
        return this._isBlinking;
    }

    stopBlinking() {
        this._isBlinking = false;
    }

    blinkContainer() {
        this._isBlinking = true;
        this._at.blinkPossibleTargetRect();

    }

    startHighlightingAtPoint(x,y) {
        if (!this._selectionTimer.isRunning) {
            const sameCursorLocation = this._selectionTimer.sameLocation(x,y);
            if (!sameCursorLocation) {
                this.stopBlinking();
                this.highlightContainer(null);
                this._selectionTimer.startWithPoint(x,y);
            }
        }
    
        if (this._selectionTimer.shouldHighlightForPoint(x,y)) {
            const bestContainer = this.bestContainerAtPoint(x,y); 
            this.highlightContainer(bestContainer);
    
            this._selectionTimer.useContainerSelectDelay = true;
        }
    
        if (this._selectionTimer.shouldBlinkForPoint(x,y)) {
            this.blinkContainer();
        }
    
        if (this._selectionTimer.shouldSelectForPoint(x,y)) {
            this.stopBlinking();
            this.selectBestTargetForPoint(x,y);
            this._selectionTimer.reset();
        }    
    }

    activeDropTargetsAtPoint(x,y) {
        const activeContainer = this._activeDropTarget.container;
        const allDropTargets = this.dropTargetsOfContainerContinous(activeContainer, this._activeContainerStrategy.continousDropTargets);
        return allDropTargets.filter( dropTarget => dropTarget.isTargetForPoint(x,y));
    }

    containerDropTargetAtPoint(x,y) {
        const targets = this.activeDropTargetsAtPoint(x,y);
        if (targets.length == 0) {
            return null;
        }

        return targets[0];
    }


    doLiveLayout() {
        const x = this._draggingInfo.pageX;
        const y = this._draggingInfo.pageY;

        if (this.activeDropTarget == null) {
            this.selectBestTargetForPoint(x, y);
            return;
        }

        this.updatePassengerElements();
    
        if (this.moveMode || !this._passengersAreNestable)
            return;
    
        this.startHighlightingAtPoint(x,y);
    
        const newContainerDropTarget = this.containerDropTargetAtPoint(x,y);
        if (newContainerDropTarget) {
            this.selectTarget(newContainerDropTarget);
        }
    }

    layoutForDraggingInfo(draggingInfo) {
        this._draggingInfo = draggingInfo;
        this.doLiveLayout();
        this._draggingInfo = null;
    
    }
}