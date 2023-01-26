// @ts-nocheck
import { GDLiveLayouter } from '../modules/livelayouter.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { GDProject, GDFixedLayoutPolicyCode, GDVerticalBoxLayoutPolicyCode } from '../modules/model.js';
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
        this._startTime -= this.containerSelectDelay - this.blinkingDuration +1;
    }

    advanceSelect() {
        this._startTime -= this.containerSelectDelay + 1;
    }
}

QUnit.module("LiveLayouter", {
    beforeEach: function() {
        let element = document.createElement("div");
        element.style.width="800px";
        element.style.height="600px";
        element.style.position="absolute";
        element.style.top="10px";
        element.style.left="10px";
        document.body.appendChild(element);
        this.at = new AntetypeWeb(element);
        this.at.project = GDProject.createInstance();
        this.at.buildStyleSheet();
        this.screen = this.at.project.library.screenWidget.createInstance();
        this.screen.setValueForKeyInStateWithIdentifier(GDFixedLayoutPolicyCode, "layoutPolicyCode", this.screen.activeStateIdentifier);
        this.screen.createStyleSheets();
        element.figure = this.screen;       //??
        this.screen.DOMElement = element;    
        this.at.currentScreen = this.screen;

        let container = this.at.project.createBasicCell();
        this.screen.addComponent(container);

        let containerElement = document.createElement("cell");
        containerElement.style.position="absolute";
        containerElement.style.top="100px";
        containerElement.style.left="100px";
        containerElement.style.width="100px";
        containerElement.style.height="100px";
        containerElement.figure = container;
        container.DOMElement = containerElement;
        element.appendChild(containerElement);

        this.container = container;
        this.liveLayouter = new GDLiveLayouter(this.at);

        const selectionTimer = new TestModeSelector();
        this.liveLayouter._selectionTimer = selectionTimer;

        // call these to not have to bother with timeouts
        this.advanceHighlight = () => selectionTimer.advanceHighlight();
        this.advanceBlink = () => selectionTimer.advanceBlink();
        this.advanceSelect = () => selectionTimer.advanceSelect();
    },
    afterEach: function() {
        this.screen.removeStyleSheets();
        this.at.project.currentLookAndFeel.cssStyleSheet.remove();
        this.at.project.currentLookAndFeel.breakPointStyleSheet.remove();
        this.at.screenElement.remove();
    }
});

QUnit.test("initial setup", function(assert) {
    let liveLayouter = new GDLiveLayouter(this.at);
    assert.equal( liveLayouter.activeDropTarget, undefined );
    assert.notOk( liveLayouter.searchMode);
    assert.notOk( liveLayouter.showsOriginalRenderObjects);
    assert.equal( liveLayouter.containerSelectDelay,1000);
    assert.equal( liveLayouter.highlightTargetDelay, 500);
    assert.equal( liveLayouter.blinkingDuration, 300);
    assert.notOk( liveLayouter.moveMode );
});

QUnit.test("first live-layout", function(assert) {
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10, 10));
    const activeDropTarget = this.liveLayouter.activeDropTarget;
    assert.equal( activeDropTarget.container, this.screen);
});


QUnit.test("not timer if in same container", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );

    // first drag on the screen, screen is activeDropTarget
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    assert.notOk(this.liveLayouter.searchMode);

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 20,20));
    assert.ok( this.liveLayouter.searchMode, "starting searchmode");
});


QUnit.test("testTargetIsNotChangedImmediately", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );
    // first drag on the screen, screen is activeDropTarget
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 110,110));
    const activeDropTarget = this.liveLayouter.activeDropTarget;
    assert.equal( activeDropTarget.container, this.screen, "screen is still target");
});


QUnit.test("testTargetIsNotChangedImmediately", function(assert) {
    const cell = createCellOnScreen(this.at, this.screen);

    this.liveLayouter.setPassengers([cell], draggingInfoForLocalPoint(this,10,10) );

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    assert.deepEqual(this.at.possibleTargetRect, {top:0, left: 0, width: 0, height: 0});
    assert.equal(this.liveLayouter.activeDropTarget.container, this.screen);

    this.advanceHighlight();
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    assert.deepEqual( this.at.possibleTargetRect, globalBoundsOfElement(this.container.DOMElement));
});

function createCellOnScreen(at,screen) {
    const cell = at.project.createBasicCell();
    screen.addComponent(cell);
    let cellElement = document.createElement("cell");
    cell.DOMElement = cellElement;
    cellElement.figure = cell;
    at.screenElement.appendChild(cellElement);
    return cell;
}


QUnit.test("testBlinkBeforeSelect", function(assert) {
    let cell = createCellOnScreen(this.at, this.screen);

    this.liveLayouter.setPassengers([cell], draggingInfoForLocalPoint(this,10,10) );

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    this.advanceBlink();
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));

    assert.ok( this.liveLayouter.isBlinking, "targetrect blinking");
});

QUnit.test("testNothingHappensIfCursorNotMoved", function(assert) {
    let cell = createCellOnScreen(this.at, this.screen);

    this.liveLayouter.setPassengers([cell], draggingInfoForLocalPoint(this,10,10) );

    // first drag on the screen, screen is activeDropTarget
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    assert.ok( this.liveLayouter.searchMode);

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    assert.ok( this.liveLayouter.searchMode);
});

QUnit.test("testNoTimerIfMovedToDifferentParent", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,110,110) );
    assert.equal(this.liveLayouter.activeDropTarget, null);

    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    assert.equal(this.liveLayouter.activeDropTarget.container, this.container);
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    assert.equal(this.liveLayouter.activeDropTarget.container, this.container);
    assert.ok( this.liveLayouter.searchMode);

    this.advanceSelect();
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    assert.equal(this.liveLayouter.activeDropTarget.container, this.screen);
});

QUnit.test("testTimerForSelectDownInHierarchy", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForCenterOfFigure(this, this.container));
    assert.equal(this.liveLayouter.activeDropTarget.container, this.screen, "screen still selected");
    assert.ok(this.liveLayouter.searchMode, "timer is set");
});

QUnit.test("testRenderObjectIsInserted", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    assert.equal(this.at.screenElement.childNodes.length, 2, "element inserted");
});



QUnit.test("testRenderObjectIsRemoved", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    this.liveLayouter.removePassengerElements();
    assert.equal(this.at.screenElement.childNodes.length, 1, "element removed");
});


QUnit.test("testPossibleContainerRect", function(assert) {
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );
    this.liveLayouter.layoutForDraggingInfo(draggingInfoForLocalPoint(this, 10,10));
    assert.deepEqual( this.at.possibleTargetRect, GDZeroRect, "no target rect");

});


/*

- (void) testFreeLayoutUsesCellBoundsChange
{
    id cell = [project createBasicCell];
    [liveLayouter setPassengers:@[ cell ] draggingInfo: nil];

    NSPoint p = [workingAreaView convertPoint:NSMakePoint(10,10) toView:nil];

    GDDraggingInfo* info = [GDDraggingInfo draggingInfoWithSourceOperationMask:NSDragOperationCopy pasteboard:nil draggedLocation:p draggedImageLocation:p source:nil];

    [liveLayouter layoutForDraggingInfo: info];

    GDCellBoundsChange* cellBoundsChange = [liveLayouter cellBoundsChange];
    XCTAssertNotNil( cellBoundsChange, @"needed for free-layout");
    XCTAssertEqual( [[cellBoundsChange changes] numberOfObjects], (NSInteger)0, @"nothing to record");
    XCTAssertTrue( [[[workingAreaView guideCoordinator] selections] isEqualToArray: liveLayouter.passengerRenderObjects], @"guides are prepared");
}
*/

QUnit.test("testInsertOriginalsDoesNothingIfNotThere", function(assert) {
    const elementsCount = this.at.screenElement.childNodes.length;
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );

    this.liveLayouter.insertOriginalElements();
    assert.equal(this.at.screenElement.childNodes.length, elementsCount, "nothing happens");
});

QUnit.test("testRemoveOriginalsDoesNothingIfNotThere", function(assert) {
    const elementsCount = this.at.screenElement.childNodes.length;
    this.liveLayouter.setPassengers([this.at.project.createBasicCell()], draggingInfoForLocalPoint(this,10,10) );

    this.liveLayouter.removeOriginalElements();
    assert.equal(this.at.screenElement.childNodes.length, elementsCount, "nothing happens");
});

QUnit.test("testInsertOriginalRenderObjects", function(assert) {
    this.liveLayouter.setPassengers([this.container], draggingInfoForCenterOfFigure(this, this.container));

    const info = draggingInfoForLocalPoint(this, 10, 10);
    this.liveLayouter.layoutForDraggingInfo(info);

    this.liveLayouter.insertOriginalElements();

    const screenElement = this.at.screenElement;

    assert.ok(this.liveLayouter.showsOriginalElements);
    assert.equal(screenElement.childNodes.length, 2, "inserted the original component");
    assert.equal(this.liveLayouter.activeDropTarget.container, this.screen);
    assert.equal(this.liveLayouter.passengerElements[0].parentNode, screenElement);
});


QUnit.test("testRemoveOriginalRenderObjects", function(assert) {
    this.liveLayouter.setPassengers([this.container], draggingInfoForCenterOfFigure(this, this.container));

    const info = draggingInfoForLocalPoint(this, 10, 10);
    this.liveLayouter.layoutForDraggingInfo(info);

    this.liveLayouter.insertOriginalElements();

    this.liveLayouter.layoutForDraggingInfo(info);
    this.liveLayouter.removeOriginalElements();

    const screenElement = this.at.screenElement;

    assert.notOk(this.liveLayouter.showsOriginalElements);
    assert.equal(screenElement.childNodes.length, 1, "removed the original component");
    assert.equal(this.liveLayouter.activeDropTarget.container, this.screen);
    assert.equal(this.liveLayouter.passengerElements[0].parentNode, screenElement);
});

QUnit.test("testBugAT1780", function(assert) {
    this.liveLayouter.setPassengers([this.container], draggingInfoForCenterOfFigure(this, this.container));

    const info = draggingInfoForLocalPoint(this, 10, 10);
    this.liveLayouter.layoutForDraggingInfo(info);
    this.liveLayouter.insertOriginalElements();

    this.liveLayouter.layoutForDraggingInfo(info);
    this.liveLayouter.removeOriginalElements();

    this.liveLayouter.layoutForDraggingInfo(info);

    const screenElement = this.at.screenElement;
    assert.equal(screenElement.childNodes.length, 1, "removed the original component");

    this.liveLayouter.insertOriginalElements();
    assert.ok(this.liveLayouter.showsOriginalElements);
    assert.equal(screenElement.childNodes.length, 2, "insert again");
});


QUnit.test("testPassengersRenderObjectsAreSorted", function(assert){
    let cell = this.at.project.createBasicCell();
    this.screen.addComponent(cell);
    this.at.rebuildRenderObjects(this.screen);

    this.liveLayouter.setPassengers( [cell,this.container], draggingInfoForLocalPoint(this,10,10));
    assert.equal(this.liveLayouter.passengerElements[0], this.at.screenElement.childNodes[0]);
    assert.equal(this.liveLayouter.passengerElements[1], this.at.screenElement.childNodes[1]);
});

QUnit.test("testSetPassengersSetsActiveTarget", function(assert) {
    this.liveLayouter.setPassengers([this.container], draggingInfoForCenterOfFigure(this,this.container));
    
    const activeTarget = this.liveLayouter.activeDropTarget;
    assert.notEqual( activeTarget, null);
    assert.equal( activeTarget.container, this.screen);
});

QUnit.test("testCorrectTargetInBoxLayout", function(assert) {
    this.container.setValueForKeyInStateWithIdentifier("layoutPolicyCode", GDVerticalBoxLayoutPolicyCode, this.container.activeStateIdentifier);
    this.container.addComponent(this.at.project.createBasicCell());
    this.container.addComponent(this.at.project.createBasicCell());

    this.at.rebuildRenderObjects(this.screen);

    const cell = this.container.orderedComponents[0];

    this.liveLayouter.setPassengers([cell], draggingInfoForCenterOfFigure(this,cell));

    assert.equal( this.liveLayouter.activeDropTarget.container, this.container);
    assert.equal( this.liveLayouter.activeDropTarget.index, 0);
});

// QUnit.test("testCorrectOrderBoxLayout", function(assert) {
//     this.container.setValueForKeyInStateWithIdentifier("layoutPolicyCode", GDVerticalBoxLayoutPolicyCode, this.container.activeStateIdentifier);
//     this.container.addComponent(this.at.project.createBasicCell());
//     this.container.addComponent(this.at.project.createBasicCell());

//     this.at.rebuildRenderObjects(this.screen);

//     id renderObjects = [cells collectUsingBlock:^id(id cell) {
//         return [screenChangeManager renderObjectForFigure:cell];
//     }];
//     NSPoint p = [workingAreaView convertPoint: GDRectCenter([[renderObjects objectAtIndex:0] globalBounds]) toView:nil];
//     NSPoint q = [workingAreaView convertPoint: [[renderObjects objectAtIndex:0] globalBounds].origin toView: nil];
//     id<NSDraggingInfo> draggingInfo = [GDDraggingInfo draggingInfoWithSourceOperationMask:NSDragOperationMove pasteboard:nil draggedLocation:p draggedImageLocation:q source:nil];
//     [liveLayouter setPassengers:@[[cells objectAtIndex:0]] draggingInfo:draggingInfo];
//     GDDropTarget* dropTarget = [liveLayouter activeDropTarget];
//     XCTAssertEqualObjects( dropTarget.containerFigure, container);
//     XCTAssertEqual( dropTarget.index, (NSUInteger)0);
//     XCTAssertTrue( [dropTarget.insertedRenderObjects isEqualToArray: @[ [renderObjects objectAtIndex:0]]]);
//     XCTAssertTrue( NSEqualRects( dropTarget.globalBounds, [[renderObjects objectAtIndex:0] globalBounds]));
// }


