import { GDActiveBoxLayoutContainerStrategy, GDLiveLayouter } from '../modules/livelayouter.js';
import { GDHorizontalBoxLayoutPolicyCode } from '../modules/model.js';
import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';


QUnit.module("GDActiveBoxLayoutContainerStrategy", {
    beforeEach: function() {
        buildAntetypeWithScreen(this);


        let container = this.at.project.createBasicCell();
        container.setValueForKeyInStateWithIdentifier(GDHorizontalBoxLayoutPolicyCode, "layoutPolicyCode",container.activeStateIdentifier);
        container.addComponent( this.at.project.createBasicCellWithBounds(0,0,10,10));
        container.addComponent( this.at.project.createBasicCellWithBounds(0,0,10,10));
        this.screen.addComponent(container);

        this.container = container;
        this.at.rebuildRenderObjects(this.screen);
        this.liveLayouter = new GDLiveLayouter(this.at);
    },
    afterEach: function() {
        cleanupAntetypeWithScreen(this);
    }
});


QUnit.test("testPassengerIsRemoved", function(assert) {
    let cell = this.at.project.createBasicCell();
    this.screen.addComponent(cell);
    this.at.rebuildRenderObjects(this.screen);

    let passengers = [cell];
    let cellElement = cell.DOMElement;

    let passengerRenderElements = [ cellElement ];

    let containerDropTargets = this.container.dropTargetsExcludingPassengers();
    let dropTarget = containerDropTargets[0];
    this.liveLayouter.setPassengers(passengers);
    this.liveLayouter._activeDropTarget = containerDropTargets[0];
    let containerStrategy = new GDActiveBoxLayoutContainerStrategy(this.liveLayouter);
    containerStrategy.selectTarget(dropTarget);
    assert.equal( cellElement.parentNode, undefined);

});

