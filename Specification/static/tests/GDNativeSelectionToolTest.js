import { GDFixedLayoutPolicyCode, GDWidget, GDWidgetCellDefinition, GDWidgetRootCellDefinition } from '../modules/model.js';
import { GDNativeFigureDragTool, GDNativeHandleDragTool, GDNativeSelectionTool, GDNativeSelectionRectTool } from '../modules/tools.js';
import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';

QUnit.module("native selection tool", {
    beforeEach: function() {
        buildAntetypeWithScreen(this);
        this.tool = new GDNativeSelectionTool(this.at);
        this.project = this.at.project;

        this.cell = this.at.project.createBasicCellWithBounds(10,10,10,10);
        this.screen.addComponent(this.cell);
        this.screen.setValueForKeyInStateWithIdentifier(GDFixedLayoutPolicyCode, "layoutPolicyCode", this.screen.activeStateIdentifier);
        this.at.rebuildRenderObjects(this.screen);

        let rootDefinition = GDWidgetRootCellDefinition.createInstance(this.project);
        let innerDefinition = GDWidgetCellDefinition.createInstance(this.project);
        rootDefinition.addComponent(innerDefinition);
        this.widget = GDWidget.createInstance(this.project);
        this.widget._hierarchy = rootDefinition;
        rootDefinition._widget = this.widget;
    
        this.at.nativeMouseSelection = true;

        this.at.setCurrentTool(this.tool);
    }, 
    afterEach: function() {
        cleanupAntetypeWithScreen(this);
    }
});


QUnit.test("mosue drag on free layout starts drag-tool", function(assert) {
    this.at.selectFigures([this.cell]);

    this.tool.mouseDown({target: this.cell.DOMElement});
    this.tool.mouseDragged({target: this.cell.DOMElement});

    assert.ok(this.at.currentTool instanceof GDNativeFigureDragTool);
});

QUnit.test("mouse drag on screen starts selection rect", function(assert) {
    this.tool.mouseDown({target: this.screen.DOMElement});
    this.tool.mouseDragged({target: this.screen.DOMElement});
    
    assert.ok(this.at.currentTool instanceof GDNativeSelectionRectTool);
});


QUnit.test("test selection", function(assert) {

    let command = null;
    this.at.__proto__.send = s => command = s;

    this.tool.mouseDown({target: this.cell.DOMElement});
    this.tool.mouseUp({target: this.cell.DOMElement});

    assert.equal(command, "select/" + this.cell.objectID);
});

QUnit.test("figureToSelectForFigure", function(assert) {
    assert.equal(this.tool.figureToSelectForFigure(this.cell), this.cell, "basic cell: select the cell");

    let instance = this.widget.createInstance(this.project);
    this.screen.addComponent(instance);
    this.at.rebuildRenderObjects(this.screen);

    let selectedCell = this.tool.figureToSelectForFigure(instance.orderedComponents[0]);
    assert.equal(selectedCell, instance, "inner cell: select root cell");

    this.at.selectFigures([instance]);

    selectedCell = this.tool.figureToSelectForFigure(instance.orderedComponents[0]);
    assert.equal(selectedCell, instance.orderedComponents[0], "if instance is already selected: select inner cell");
});

QUnit.test("selectOnMouseUp", function(assert) {
    assert.notOk(this.tool.selectOnMouseUp(this.cell));

    let instance = this.widget.createInstance(this.project);
    this.screen.addComponent(instance);
    this.at.rebuildRenderObjects(this.screen);
    assert.notOk(this.tool.selectOnMouseUp(instance.orderedComponents[0]), "select directly");

    this.at.selectFigures([instance]);
    assert.ok(this.tool.selectOnMouseUp(instance.orderedComponents[0]), "select on mouse up since parent is already selected");
});

QUnit.test("handles", function(assert) {
    this.tool.mouseDown({target: this.cell.DOMElement});
    this.tool.mouseUp({target: this.cell.DOMElement});

    assert.equal(this.at.handles.length, 3, "3 handles");
    this.at.handles.forEach( h => {
        assert.notOk( h.DOMElement == undefined, "handle has DOM element" );
        assert.notOk( h.DOMElement.parentElement == undefined);    
    } );
});

QUnit.test("handle drag tool", function(assert) {
    this.at.selectFigures([this.cell]);
    const handle = this.at.handles[0];

    this.tool.mouseDown({target: handle.DOMElement});
    assert.ok( this.at.currentTool instanceof GDNativeHandleDragTool );
});

