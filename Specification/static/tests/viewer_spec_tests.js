import { AntetypeWeb } from '../modules/viewer.js';
import { GDSpecTool, rgb2hex } from '../modules/spec_tool.js';
import { GDState, GDWidget, GDProject, GDWidgetRootCellDefinition } from '../modules/model.js';

QUnit.module("viewer spec", { 
        beforeEach: function() {
            this.antetype = new AntetypeWeb();
            this.antetype.project = GDProject.createInstance();
            this.antetype.project.at = this.antetype;
            this.antetype.currentScreen = this.antetype.project.library.screenWidget.createInstance();
            this.antetype.buildStyleSheet();
            this.antetype.currentScreen.createStyleSheets();
            this.specTool = new GDSpecTool(this.antetype);
        },
        afterEach: function() {
            this.antetype.project.currentLookAndFeel.cssStyleSheet.remove();
            this.antetype.project.currentLookAndFeel.breakPointStyleSheet.remove();
            this.antetype.currentScreen.removeStyleSheets();

        }
    
});



QUnit.test("rgb2hex", function(assert) {
    assert.equal(rgb2hex("rgba(1,2,3,0)"), "transparent");
    assert.equal(rgb2hex("rgb(1,2,3)"), "#010203");
    assert.equal(rgb2hex("rgba(123,100,200,0.2)"), "#7b64c833");
});

// #1063 activating the spec inspector (spec tool) should show active
// pseudo states. 
QUnit.test("pseudo states are active", function(assert) {
    // create and add a cell with active mouse-over-state:w
    const project = this.antetype.project;
    let widget = GDWidget.createInstance(project);
    widget._hierarchy = GDWidgetRootCellDefinition.createInstance(project);
    widget._hierarchy._widget = widget;
    widget.type = GDWidget.GDUserWidgetType;
    let state = GDState.createInstance(project);
    state._type = GDState.GDMouseOverStateType;
    widget.addState(state);

    let cell = widget.createInstance();
    cell.activeState = state;

    this.antetype.currentScreen.addComponent(cell);
    this.antetype.rebuildRenderObjects(this.antetype.currentScreen);

    // activate Spec tool
    this.antetype.setCurrentTool(this.specTool);

    assert.ok(cell.DOMElement.className.indexOf("_hover") != -1, "hover state is active, like in edit mode");

    this.antetype.setCurrentTool(this.antetype.runTool);
    assert.equal(cell.DOMElement.className.indexOf("_hover"), -1, "like before, the browser handles the pseudo state");


});
