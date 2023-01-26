import { GDProject, GDState, GDDesignBreakPoint, GDWidget, GDWidgetRootCellDefinition } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

QUnit.module("GDWidgetInstanceCell", {
    beforeEach: function() {
        this.project = GDProject.createInstance();
        this.antetype = new AntetypeWeb();
        this.antetype.project = this.project;
        this.antetype.buildStyleSheet();
        this.screen = this.project.library.screenWidget.createInstance();
    },

    afterEach: function() {
        this.screen.cleanupStyles();
        this.project.currentLookAndFeel.cssStyleSheet.remove();
        this.project.currentLookAndFeel.breakPointStyleSheet.remove();
    }
});

QUnit.test("writes into screen-stylesheet", function(assert) {
    this.screen.createStyleSheets();
    let cell = this.project.createBasicCell();
    this.screen.addComponent(cell);

    let style = cell.insertCSSRuleForState(cell.activeState);
    assert.equal(this.screen.cssStyleSheet.rulesLength, 1);
});

QUnit.test("breakpoints", function(assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint.breakPointName= "foo";
    this.project.addDesignBreakPoint(breakpoint);
    this.screen.createStyleSheets();


    let widget = GDWidget.createInstance(this.project);
    widget._hierarchy = GDWidgetRootCellDefinition.createInstance(this.project);
    widget._hierarchy._widget = widget;
    this.project.library.addWidget(widget);

    let breakPointState = GDState.createInstance(this.project);
    breakPointState.designBreakPointName = breakpoint.breakPointName;
    breakPointState._type = GDState.GDNormalStateType;
    breakPointState._name = widget.normalState.name;
    widget.addState(breakPointState);
    assert.ok(breakPointState.hasBreakPoints(), "we have breakpoints in this state");
    assert.equal(breakPointState.designBreakPoint(), breakpoint);

    let cell = widget.createInstance();
    this.screen.addComponent(cell);


    let style = cell.insertCSSRuleForState(breakPointState);
    assert.equal(style.parentRule.parentStyleSheet, this.screen.breakPointStyleSheet._styleSheet);
});


QUnit.test("cleanupStyles cleans screen stylesheet", function(assert) {
    this.screen.createStyleSheets();
    let cell = this.project.createBasicCell();
    this.screen.addComponent(cell);

    let style = cell.insertCSSRuleForState(cell.activeState);
    style.width = "123px";

    cell.cleanupStyles();

    assert.equal(style.width, "");
    assert.equal( cell._cssStyles[cell.activeStateIdentifier], undefined);
});


QUnit.test("getProperty", function(assert) {
    const basicCell = this.project.createBasicCell();
    const value = 123;
    basicCell.setValueForKeyInStateWithIdentifier(value, "width", basicCell.activeStateIdentifier);
    assert.equal(basicCell.getProperty("width"), value);
    assert.equal(basicCell.getProperty("width", basicCell.activeState), value);
    assert.equal(basicCell.valueForKeyInStateWithIdentifier("width", basicCell.activeStateIdentifier), value);
});

QUnit.test("setProperty", function(assert) {
    const basicCell = this.project.createBasicCell();

    const value = 123;
    basicCell.setProperty("height", value);
    assert.equal(basicCell.getProperty("height"), value);    
});