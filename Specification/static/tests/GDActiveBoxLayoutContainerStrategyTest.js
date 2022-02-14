import { GDActiveBoxLayoutContainerStrategy, GDLiveLayouter } from '../modules/livelayouter.js';
import { GDHorizontalBoxLayoutPolicyCode } from '../modules/model.js';
import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';

const { test } = QUnit;

QUnit.module("GDActiveBoxLayoutContainerStrategy", hooks => {
    let at, screen, container, liveLayouter;
    hooks.beforeEach(() => {
        at = buildAntetypeWithScreen(this);

        container = at.project.createBasicCell();
        container.setValueForKeyInStateWithIdentifier(GDHorizontalBoxLayoutPolicyCode, "layoutPolicyCode", container.activeStateIdentifier);
        container.addComponent(at.project.createBasicCellWithBounds(0, 0, 10, 10));
        container.addComponent(at.project.createBasicCellWithBounds(0, 0, 10, 10));
        screen = at.currentScreen;
        screen.addComponent(container);

        at.rebuildRenderObjects(screen);
        liveLayouter = new GDLiveLayouter(at);
    });

    hooks.afterEach(() => {
        cleanupAntetypeWithScreen(at)
    });

    test("testPassengerIsRemoved", assert => {
        let cell = at.project.createBasicCell();
        screen.addComponent(cell);
        at.rebuildRenderObjects(screen);

        let passengers = [cell];
        let cellElement = cell.DOMElement;

        let passengerRenderElements = [cellElement];

        let containerDropTargets = container.dropTargetsExcludingPassengers();
        let dropTarget = containerDropTargets[0];
        liveLayouter.setPassengers(passengers);
        liveLayouter._activeDropTarget = containerDropTargets[0];
        let containerStrategy = new GDActiveBoxLayoutContainerStrategy(liveLayouter);
        containerStrategy.selectTarget(dropTarget);
        assert.equal(cellElement.parentNode, undefined);
    });
});


