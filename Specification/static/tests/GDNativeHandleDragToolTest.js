import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';
import { GDNativeSelectionTool, GDNativeFigureDragTool, GDNativeHandleDragTool } from '../modules/tools.js';
import { GDFixedLayoutPolicyCode, GDWidgetCellDefinition, GDWidgetRootCellDefinition,  GDWidget} from '../modules/model.js';
import { globalBoundsOfElement } from '../modules/utils.js';


QUnit.module("native handle drag tool", {
    beforeEach: function() {
        buildAntetypeWithScreen(this);
        this.tool = new GDNativeSelectionTool(this.at);
        this.project = this.at.project;

        this.cell = this.at.project.createBasicCellWithBounds(10,10,100,100);
        this.at.cellInsertComponent(this.screen, this.cell, 0);
        
        this.screen.setProperty("layoutPolicyCode", GDFixedLayoutPolicyCode);
    
        this.at.nativeMouseSelection = true;

        this.at.setCurrentTool(this.tool);
    },
    afterEach: function() {
        cleanupAntetypeWithScreen(this);
    }
});

QUnit.test("drag top-center without guides", function(assert) {
    this.at.selectFigures([this.cell]);
    const topCenterHandle = this.at.handles.find( h => h.path == "topCenter");
    const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);
    const x = handleBounds.left + 1;
    const y = handleBounds.top + 1;
    const oldHeight = this.cell.getProperty("height");
    this.at.currentTool.mouseDown({target: topCenterHandle.DOMElement, clientX: x, clientY: y});

    const deltaY = 5;
    this.at.currentTool.mouseDragged({clientX: x, clientY: y-deltaY});

    assert.equal( this.cell.getProperty("height"), oldHeight + deltaY, "height changed");
    assert.equal( this.cell.getProperty("y"), 5, "y changed too");
});

QUnit.test("drag top-center with guides", function(assert) {
    const otherCell = this.at.project.createBasicCellWithBounds(110,120, 10,10);
    this.at.cellInsertComponent(this.screen, otherCell, this.screen.orderedComponents.length);

    this.at.selectFigures([otherCell]);
    const topCenterHandle = this.at.handles.find( h => h.path == "topCenter");
    const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

    const x = handleBounds.left + 1;
    const y = handleBounds.top + 1;

    this.at.currentTool.mouseDown({target: topCenterHandle.DOMElement, clientX: x, clientY: y});

    const cellBounds = globalBoundsOfElement(this.cell.DOMElement);
    const cellBottomY = cellBounds.top + cellBounds.height;

    this.at.currentTool.mouseDragged({clientX: x, clientY: cellBottomY+2});

    assert.equal( otherCell.getProperty("y"), cellBottomY, "snapped to guide");
});

QUnit.test("top-center and side already snapping", function(assert) {
    const otherCell = this.at.project.createBasicCellWithBounds(0,60, 100,50);
    this.at.cellInsertComponent(this.screen, otherCell, this.screen.orderedComponents.length);

    this.at.selectFigures([otherCell]);
    const topCenterHandle = this.at.handles.find( h => h.path == "topCenter");
    const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

    const x = handleBounds.left + 1;
    const y = handleBounds.top + 1;

    this.at.currentTool.mouseDown({target: topCenterHandle.DOMElement, clientX: x, clientY: y});

    const cellBounds = globalBoundsOfElement(this.cell.DOMElement);

    this.at.currentTool.mouseDragged({clientX: x, clientY: cellBounds.top+2});

    assert.equal( otherCell.getProperty("y"), cellBounds.top, "snapped to guide");    
});

QUnit.test("nested cells", function(assert) {
    const oldHeight = 20;
    const oldY = 20;
    const innerCell=  this.at.project.createBasicCellWithBounds(20,oldY,20,oldHeight);
    this.at.cellSetPropertyInState(this.cell,"layoutPolicyCode",GDFixedLayoutPolicyCode, this.cell.activeState);
    this.at.cellInsertComponent(this.cell,innerCell,0);
    this.at.cellSetPropertyInState(this.cell,"y",200, this.cell.activeState);

    this.at.selectFigures([innerCell]);
    const topCenterHandle = this.at.handles.find( h => h.path == "topCenter");
    const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

    const x = handleBounds.left + 1;
    const y = handleBounds.top + 1;

    this.at.currentTool.mouseDown({target: topCenterHandle.DOMElement, clientX: x, clientY: y});

    const delta = 10;
    this.at.currentTool.mouseDragged({clientX: x, clientY: y-delta});
    this.at.currentTool.mouseUp({clientX: x, clientY: y-delta});

    assert.equal(innerCell.getProperty("height"), oldHeight + delta );
    assert.equal(innerCell.getProperty("y"), oldY - delta );
    const newBoundsOfElement = globalBoundsOfElement(innerCell.DOMElement);
    assert.equal(newBoundsOfElement.height, oldHeight + delta);

});

QUnit.test("bottom center centered", function(assert) {
    this.at.selectFigures([this.cell]);

    const cellHeight = this.cell.getProperty("height");
    const handle = this.at.handles.find( h => h.path == "bottomCenter");
    const handleBounds = globalBoundsOfElement(handle.DOMElement);
    const x = handleBounds.left + 1;
    const y = handleBounds.top + 1;

    this.at.currentTool.mouseDown({target: handle.DOMElement, clientX: x, clientY: y});
    this.at.currentTool.mouseDragged({target: handle.DOMElement, clientX: x, clientY: y-10, altKey: true});
    this.at.currentTool.mouseDragged({target: handle.DOMElement, clientX: x, clientY: y-cellHeight-30, altKey: true});
    assert.equal(this.cell.getProperty("height"), cellHeight-10, "drag does nothing if height would be < min height");
});