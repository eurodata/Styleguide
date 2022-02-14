// @ts-nocheck
import { GDLiveLayouter } from '../modules/livelayouter.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { GDProject, GDFixedLayoutPolicyCode, GDVerticalBoxLayoutPolicyCode, GDScreen, GDWidgetInstanceCell } from '../modules/model.js';
import { globalBoundsOfElement, GDZeroRect } from '../modules/utils.js';
import { GDLiveLayouterModeSelector } from '../modules/GDLiveLayouterModeSelector.js';
import { draggingInfoForLocalPoint, draggingInfoForCenterOfFigure } from './draggingInfoForLocalPoint.js';

// since using setTimeout is brittle (breaks randomly), we use a different 
// approach: We adjust the start-time that the corresponing methods shouldHighlight … etc,
// return true;
class TestModeSelector extends GDLiveLayouterModeSelector {
    advanceHighlight() {
        this._startTime -= this.highlightTargetDelay + 1;
    }

    advanceBlink() {
        this._startTime -= this.containerSelectDelay - this.blinkingDuration + 1;
    }

    advanceSelect() {
        this._startTime -= this.containerSelectDelay + 1;
    }
}

const { test } = QUnit;


QUnit.module("LiveLayouter", hooks => {
    /** @type {AntetypeWeb} */
    let at;

    /** @type {GDScreen} */
    let screen;

    /** @type {GDWidgetInstanceCell} */
    let container;

    /** @type {GDLiveLayouter} */
    let liveLayouter;

    hooks.beforeEach(() => {
        let element = document.createElement("div");
        element.style.width = "800px";
        element.style.height = "600px";
        element.style.position = "absolute";
        element.style.top = "10px";
        element.style.left = "10px";
        document.body.appendChild(element);
        at = new AntetypeWeb(element);
        at.project = GDProject.createInstance();
        at.buildStyleSheet();
        screen = at.project.createScreen();
        screen.setValueForKeyInStateWithIdentifier(GDFixedLayoutPolicyCode, "layoutPolicyCode", screen.activeStateIdentifier);
        screen.createStyleSheets();
        element.figure = screen;       //??
        screen.DOMElement = element;
        at.currentScreen = screen;

        container = at.project.createBasicCell();
        screen.addComponent(container);

        let containerElement = document.createElement("cell");
        containerElement.style.position = "absolute";
        containerElement.style.top = "100px";
        containerElement.style.left = "100px";
        containerElement.style.width = "100px";
        containerElement.style.height = "100px";
        containerElement.figure = container;
        container.DOMElement = containerElement;
        element.appendChild(containerElement);

        liveLayouter = new GDLiveLayouter(at);

        const selectionTimer = new TestModeSelector();
        liveLayouter._selectionTimer = selectionTimer;

    });

    // call these to not have to bother with timeouts

    function advanceHighlight() {
        liveLayouter._selectionTimer.advanceHighlight();
    }

    function advanceBlink() {
        liveLayouter._selectionTimer.advanceBlink();
    }

    function advanceSelect() {
        liveLayouter._selectionTimer.advanceSelect();
    }

    hooks.afterEach(() => {
        screen.removeStyleSheets();
        at.project.currentLookAndFeel.cssStyleSheet.remove();
        at.project.currentLookAndFeel.breakPointStyleSheet.remove();
        at.screenElement.remove();
    });


    test("initial setup", assert => {
        let liveLayouter = new GDLiveLayouter(at);
        assert.equal(liveLayouter.activeDropTarget, undefined);
        assert.notOk(liveLayouter.searchMode);
        assert.notOk(liveLayouter.showsOriginalRenderObjects);
        assert.equal(liveLayouter.containerSelectDelay, 1000);
        assert.equal(liveLayouter.highlightTargetDelay, 500);
        assert.equal(liveLayouter.blinkingDuration, 300);
        assert.notOk(liveLayouter.moveMode);
    });

    test("first live-layout", assert => {
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        const activeDropTarget = liveLayouter.activeDropTarget;
        assert.equal(activeDropTarget.container, screen);
    });


    test("not timer if in same container", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));

        // first drag on the screen, screen is activeDropTarget
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        assert.notOk(liveLayouter.searchMode);

        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 20, 20));
        assert.ok(liveLayouter.searchMode, "starting searchmode");
    });


    test("testTargetIsNotChangedImmediately", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));
        // first drag on the screen, screen is activeDropTarget
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));

        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 110, 110));
        const activeDropTarget = liveLayouter.activeDropTarget;
        assert.equal(activeDropTarget.container, screen, "screen is still target");
    });


    test("testTargetIsNotChangedImmediately", assert => {
        const cell = createCellOnScreen(at, screen);

        liveLayouter.setPassengers([cell], draggingInfoForLocalPoint(at, 10, 10));

        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        assert.deepEqual(at.possibleTargetRect, { top: 0, left: 0, width: 0, height: 0 });
        assert.equal(liveLayouter.activeDropTarget.container, screen);

        advanceHighlight();
        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        assert.deepEqual(at.possibleTargetRect, globalBoundsOfElement(container.DOMElement));
    });

    function createCellOnScreen(at, screen) {
        const cell = at.project.createBasicCell();
        screen.addComponent(cell);
        let cellElement = document.createElement("cell");
        cell.DOMElement = cellElement;
        cellElement.figure = cell;
        at.screenElement.appendChild(cellElement);
        return cell;
    }


    test("testBlinkBeforeSelect", assert => {
        let cell = createCellOnScreen(at, screen);

        liveLayouter.setPassengers([cell], draggingInfoForLocalPoint(at, 10, 10));

        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        advanceBlink();
        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));

        assert.ok(liveLayouter.isBlinking, "targetrect blinking");
    });

    test("testNothingHappensIfCursorNotMoved", assert => {
        let cell = createCellOnScreen(at, screen);

        liveLayouter.setPassengers([cell], draggingInfoForLocalPoint(at, 10, 10));

        // first drag on the screen, screen is activeDropTarget
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));

        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        assert.ok(liveLayouter.searchMode);

        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        assert.ok(liveLayouter.searchMode);
    });

    test("testNoTimerIfMovedToDifferentParent", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 110, 110));
        assert.equal(liveLayouter.activeDropTarget, null);

        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        assert.equal(liveLayouter.activeDropTarget.container, container);
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        assert.equal(liveLayouter.activeDropTarget.container, container);
        assert.ok(liveLayouter.searchMode);

        advanceSelect();
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        assert.equal(liveLayouter.activeDropTarget.container, screen);
    });

    test("testTimerForSelectDownInHierarchy", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(at, container));
        assert.equal(liveLayouter.activeDropTarget.container, screen, "screen still selected");
        assert.ok(liveLayouter.searchMode, "timer is set");
    });

    test("testRenderObjectIsInserted", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        assert.equal(at.screenElement.childNodes.length, 2, "element inserted");
    });



    test("testRenderObjectIsRemoved", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        liveLayouter.removePassengerElements();
        assert.equal(at.screenElement.childNodes.length, 1, "element removed");
    });


    test("testPossibleContainerRect", assert => {
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));
        liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(at, 10, 10));
        assert.deepEqual(at.possibleTargetRect, GDZeroRect, "no target rect");

    });

    test("testInsertOriginalsDoesNothingIfNotThere", assert => {
        const elementsCount = at.screenElement.childNodes.length;
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));

        liveLayouter.insertOriginalElements();
        assert.equal(at.screenElement.childNodes.length, elementsCount, "nothing happens");
    });

    test("testRemoveOriginalsDoesNothingIfNotThere", assert => {
        const elementsCount = at.screenElement.childNodes.length;
        liveLayouter.setPassengers([at.project.createBasicCell()], draggingInfoForLocalPoint(at, 10, 10));

        liveLayouter.removeOriginalElements();
        assert.equal(at.screenElement.childNodes.length, elementsCount, "nothing happens");
    });

    test("testInsertOriginalRenderObjects", assert => {
        liveLayouter.setPassengers([container], draggingInfoForCenterOfFigure(at, container));

        const info = draggingInfoForLocalPoint(at, 10, 10);
        liveLayouter.layoutForDraggingInfo(info);

        liveLayouter.insertOriginalElements();

        const screenElement = at.screenElement;

        assert.ok(liveLayouter.showsOriginalElements);
        assert.equal(screenElement.childNodes.length, 2, "inserted the original component");
        assert.equal(liveLayouter.activeDropTarget.container, screen);
        assert.equal(liveLayouter.passengerElements[0].parentNode, screenElement);
    });


    test("testRemoveOriginalRenderObjects", assert => {
        liveLayouter.setPassengers([container], draggingInfoForCenterOfFigure(at, container));

        const info = draggingInfoForLocalPoint(at, 10, 10);
        liveLayouter.layoutForDraggingInfo(info);

        liveLayouter.insertOriginalElements();

        liveLayouter.layoutForDraggingInfo(info);
        liveLayouter.removeOriginalElements();

        const screenElement = at.screenElement;

        assert.notOk(liveLayouter.showsOriginalElements);
        assert.equal(screenElement.childNodes.length, 1, "removed the original component");
        assert.equal(liveLayouter.activeDropTarget.container, screen);
        assert.equal(liveLayouter.passengerElements[0].parentNode, screenElement);
    });

    test("testBugAT1780", assert => {
        liveLayouter.setPassengers([container], draggingInfoForCenterOfFigure(at, container));

        const info = draggingInfoForLocalPoint(at, 10, 10);
        liveLayouter.layoutForDraggingInfo(info);
        liveLayouter.insertOriginalElements();

        liveLayouter.layoutForDraggingInfo(info);
        liveLayouter.removeOriginalElements();

        liveLayouter.layoutForDraggingInfo(info);

        const screenElement = at.screenElement;
        assert.equal(screenElement.childNodes.length, 1, "removed the original component");

        liveLayouter.insertOriginalElements();
        assert.ok(liveLayouter.showsOriginalElements);
        assert.equal(screenElement.childNodes.length, 2, "insert again");
    });


    test("testPassengersRenderObjectsAreSorted", assert => {
        let cell = at.project.createBasicCell();
        screen.addComponent(cell);
        at.rebuildRenderObjects(screen);

        liveLayouter.setPassengers([cell, container], draggingInfoForLocalPoint(at, 10, 10));
        assert.equal(liveLayouter.passengerElements[0], at.screenElement.childNodes[0]);
        assert.equal(liveLayouter.passengerElements[1], at.screenElement.childNodes[1]);
    });

    test("testSetPassengersSetsActiveTarget", assert => {
        liveLayouter.setPassengers([container], draggingInfoForCenterOfFigure(at, container));

        const activeTarget = liveLayouter.activeDropTarget;
        assert.notEqual(activeTarget, null);
        assert.equal(activeTarget.container, screen);
    });

    test("testCorrectTargetInBoxLayout", assert => {
        container.setValueForKeyInStateWithIdentifier("layoutPolicyCode", GDVerticalBoxLayoutPolicyCode, container.activeStateIdentifier);
        container.addComponent(at.project.createBasicCell());
        container.addComponent(at.project.createBasicCell());

        at.rebuildRenderObjects(screen);

        const cell = container.orderedComponents[0];

        liveLayouter.setPassengers([cell], draggingInfoForCenterOfFigure(at, cell));

        assert.equal(liveLayouter.activeDropTarget.container, container);
        assert.equal(liveLayouter.activeDropTarget.index, 0);
    });

});


