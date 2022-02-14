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
        return [new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, cell.valueForKeyInStateWithIdentifier("x", cell.activeStateIdentifier), GDAlignmentGuideTopSide)];
    }

    guidesForContainer(container) {
        this.visitedContainer = container;
        return [new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, 0, GDAlignmentGuideTopSide)];
    }

    guidesForSelections(selections) {
        this.visitedSelections = selections;
        return [new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, selections[0], 0, GDAlignmentGuideTopSide)];
    }
}

const { test } = QUnit;

QUnit.module("guide coordinator test", hooks => {
    let at, project, container, cell, guideCoordinator, testGuideCreator;

    hooks.beforeEach(() => {
        at = buildAntetypeWithScreen();

        project = at.project;
        container = at.currentScreen;
        cell = project.createBasicCellWithBounds(10, 10, 10, 10);
        container.addComponent(cell);
        at.rebuildRenderObjects(at.currentScreen);
        guideCoordinator = new GDGuideCoordinator();
        testGuideCreator = new GDTestGuideCreator();
        guideCoordinator.addGuideCreator(testGuideCreator);
    });

    hooks.afterEach(() => {
        cleanupAntetypeWithScreen(at);
    });

    test("guide creator nows its coordinator", assert => {
        assert.equal(testGuideCreator.guideCoordinator, guideCoordinator);
    });


    test("testGuideCreatorIsCalledForContainer", assert => {
        guideCoordinator.prepareWithSelections([cell]);

        assert.equal(testGuideCreator.visitedCells.length, 0);
        assert.equal(testGuideCreator.visitedContainer, container);
        assert.equal(guideCoordinator.possibleAlignmentGuides.length, 1);
        assert.equal(guideCoordinator.possibleAlignmentGuides[0].cell, container);
    });

    test("testGuideCreatorIsCalledForSiblings", assert => {
        const otherCell = project.createBasicCell();
        container.addComponent(otherCell);

        guideCoordinator.prepareWithSelections([cell]);

        assert.equal(testGuideCreator.visitedCells.length, 1);
        assert.equal(testGuideCreator.visitedCells[0], otherCell);
    });

    test("multiple selection, guide creator is called", assert => {
        const otherCell = project.createBasicCell();
        container.addComponent(otherCell);
        at.rebuildRenderObjects(at.currentScreen);


        guideCoordinator.prepareWithSelections(container.orderedComponents);
        assert.equal(testGuideCreator.visitedCells.length, 0, "no siblings");
        assert.equal(testGuideCreator.visitedContainer, container, "container visited");

        guideCoordinator.updateDisplayedSmartGuidesForView(at);

        assert.deepEqual(testGuideCreator.visitedSelections, container.orderedComponents, "visitedSelections called with selection");
        assert.equal(testGuideCreator.visitedCells.length, 0, "but again no siblings");
        assert.equal(testGuideCreator.visitedContainer, container, "container again");
    });

    test("snapDelta", assert => {
        guideCoordinator.prepareWithSelections([cell]);
        let [x, y] = guideCoordinator.snapDelta(0, -9);
        assert.equal(x, 0, "x unchanged");
        assert.equal(y, -10, "snapped to cell");
    });

    test("bounds are cached", assert => {
        assert.equal(guideCoordinator._boundsCache.get(cell), undefined);
        guideCoordinator.cacheBoundsForCell(cell);
        assert.deepEqual(guideCoordinator.cachedBoundsForCell(cell), globalBoundsOfElement(cell.DOMElement));
    });

});

