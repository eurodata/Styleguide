import { GDAlignmentGuideTopSide, GDVerticalEdgeAlignmentGuide } from '../modules/GDAlignmentGuide.js';
import { GDGuideCreator } from '../modules/GDGuideCreator.js';
import { GDGuideCoordinator } from '../modules/GDGuideCoordinator.js';
import { GDProject } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';
import { globalBoundsOfElement } from '../modules/utils.js';


class GDTestGuideCreator extends GDGuideCreator {
    constructor() {
        super();
        this.visitedCells = [];
    }

    guidesForCell(cell) {
        this.visitedCells.push(cell);
        return [new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell,cell.valueForKeyInStateWithIdentifier("x",cell.activeStateIdentifier),GDAlignmentGuideTopSide)];
    }

    guidesForContainer(container) {
        this.visitedContainer = container;
        return [new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container,0,GDAlignmentGuideTopSide)];
    }

    guidesForSelections(selections) {
        this.visitedSelections = selections;
        return [new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, selections[0],0,GDAlignmentGuideTopSide)];
    }
}


QUnit.module("guide coordinator test", {
    beforeEach: function() {
        buildAntetypeWithScreen(this);

        this.project = this.at.project;
        this.container = this.at.currentScreen;
        this.cell = this.project.createBasicCellWithBounds(10,10,10,10);
        this.container.addComponent(this.cell);
        this.at.rebuildRenderObjects(this.at.currentScreen);
        this.guideCoordinator = new GDGuideCoordinator();
        this.testGuideCreator = new GDTestGuideCreator();
        this.guideCoordinator.addGuideCreator( this.testGuideCreator );
        
    },
    afterEach: function() {
        cleanupAntetypeWithScreen(this);
    }
});

QUnit.test("guide creator nows its coordinator", function(assert) {
    assert.equal(this.testGuideCreator.guideCoordinator, this.guideCoordinator);
});


QUnit.test("testGuideCreatorIsCalledForContainer", function(assert) {
    this.guideCoordinator.prepareWithSelections([this.cell]);

    assert.equal(this.testGuideCreator.visitedCells.length, 0);
    assert.equal(this.testGuideCreator.visitedContainer, this.container);
    assert.equal(this.guideCoordinator.possibleAlignmentGuides.length, 1);
    assert.equal(this.guideCoordinator.possibleAlignmentGuides[0].cell, this.container);
});

QUnit.test("testGuideCreatorIsCalledForSiblings", function(assert) {
    const otherCell = this.project.createBasicCell();
    this.container.addComponent(otherCell);

    this.guideCoordinator.prepareWithSelections([this.cell]);

    assert.equal(this.testGuideCreator.visitedCells.length, 1);
    assert.equal(this.testGuideCreator.visitedCells[0], otherCell);
});

QUnit.test("multiple selection, guide creator is called", function(assert) {
    const otherCell = this.project.createBasicCell();
    this.container.addComponent(otherCell);
    this.at.rebuildRenderObjects(this.at.currentScreen);
    
    
    this.guideCoordinator.prepareWithSelections(this.container.orderedComponents);
    assert.equal(this.testGuideCreator.visitedCells.length, 0, "no siblings");
    assert.equal(this.testGuideCreator.visitedContainer, this.container, "container visited");

    this.guideCoordinator.updateDisplayedSmartGuidesForView(this.at);

    assert.deepEqual(this.testGuideCreator.visitedSelections, this.container.orderedComponents, "visitedSelections called with selection");
    assert.equal(this.testGuideCreator.visitedCells.length, 0, "but again no siblings");
    assert.equal(this.testGuideCreator.visitedContainer, this.container, "container again");
});

QUnit.test("snapDelta", function(assert) {
    this.guideCoordinator.prepareWithSelections([this.cell]);
    let [x,y] = this.guideCoordinator.snapDelta(0,-6);
    assert.equal(x,0, "x unchanged");
    assert.equal(y, -10, "snapped to cell");
});

QUnit.test("bounds are cached", function(assert) {
    assert.equal(this.guideCoordinator._boundsCache.get(this.cell), undefined);
    this.guideCoordinator.cacheBoundsForCell(this.cell);
    assert.deepEqual(this.guideCoordinator.cachedBoundsForCell(this.cell), globalBoundsOfElement(this.cell.DOMElement));
});

// QUnit.test("snap-handle", function(assert) {
//     const otherCell = this.project.createBasicCellWithBounds(0,5,10,10);
//     this.container.addComponent(otherCell);
//     this.at.rebuildRenderObjects(this.at.currentScreen);

//     this.at.selectFigures([otherCell]);
//     this.guideCoordinator.prepareWithSelections([otherCell]);

    

// });

