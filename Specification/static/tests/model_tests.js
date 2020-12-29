"use strict";

import { GDProject, GDModelObject, GDCompositeFigure, GDDesignBreakPoint,
    GDEventHandler, GDMouseEnterEventType, GDMouseLeaveEventType, GDActionSet,
    GDAction, GDState, GDScrollEventType, GDUIColor, GDWidget, CPColor, GDScriptAction } from '../modules/model.js';
import { Antetype } from '../modules/viewer.js';

QUnit.module("model", {
    beforeEach: function() {
        this.project = new GDProject(projectJSON, null)
//        new GDState(stateJson, this.project);
 //       new GDState(stateJson2, this.project);


        // no idea why a createElement("style") does not work (returns a HTMLStyleElement, but it is not usable), 
        // therefor we remove everything before use
        this.testStyleSheet = document.getElementById("TestStyles").sheet;
        while (this.testStyleSheet.cssRules.length > 0) {
            this.testStyleSheet.deleteRule(0);
        }
    }
});


QUnit.test("fromJSON", function(assert) {
    var cell = GDModelObject.fromJSONObjectInProject(singleCellJson.cell, this.project);
    assert.equal(cell.name, "Rectangle");    

    var textColor = cell.valueForKeyInStateWithIdentifier("textColor", cell.activeStateIdentifier);
    assert.equal(textColor.toString(), "#ffffff");

});
 
QUnit.test("valueForKey", function(assert) {
    var cell = GDModelObject.fromJSONObjectInProject(singleCellJson.cell, this.project);
    var stateIdentifier = singleCellJson.cell.activeState;
    var x = cell.valueForKeyInStateWithIdentifier("x", stateIdentifier);
    assert.equal(singleCellJson.cell.styleProperties[stateIdentifier].x, x);

    var defaultBorderLeft = this.project.currentLookAndFeel.defaultValueForKey("borderLeftColor");
    assert.equal(defaultBorderLeft, cell.valueForKeyInStateWithIdentifier("borderLeftColor", stateIdentifier));
});

QUnit.test("converted", function(assert) {
    var d = {className: "GDCompositeFigure", 
            name: "foo",    
            orderedComponents: [ 
                {className: "GDCompositeFigure", 
                name: "bar", orderedComponents: []},
                {className: "GDCompositeFigure", 
                name: "baz", orderedComponents: []},
            ]};
     var figure = new GDCompositeFigure(d,this.project);
     assert.equal(figure.orderedComponents.length, 2);
     assert.equal(figure.name, d.name);

     assert.equal(figure.orderedComponents[0].name, "bar");
     assert.equal(figure.orderedComponents[0].container, figure);

     assert.equal(figure.orderedComponents[1].name, "baz");
     assert.equal(figure.orderedComponents[1].container, figure);
});


QUnit.test("css and breakpoints", function(assert) {
    this.updateStyleProperty= function(){};
    var breakPoint = new GDDesignBreakPoint({breakPointName: "foo", breakPointMaxWidth: 300}, this.project);
    this.project.designBreakPoints = [breakPoint];
    var breakStyleElement = document.createElement("style");
    document.head.appendChild(breakStyleElement);
    var breakpointStylesheet = document.styleSheets[document.styleSheets.length-1];
    this.project.currentLookAndFeel.populateCSS(this.testStyleSheet, breakpointStylesheet, this); 
    assert.equal(breakpointStylesheet.cssRules.length, 1);
    assert.equal(breakPoint.mediaRule._styleSheet, breakpointStylesheet.cssRules[0]);
    document.head.removeChild(breakStyleElement);
});


QUnit.test("updateEventListeners cleans old ones", function(assert) {
    let eventHandler = new GDEventHandler({eventType: GDMouseEnterEventType, orderedActionSets: []}, this.project);
    let DOMElement = document.createElement("cell");

    eventHandler.updateEventListeners(this, {DOMElement: DOMElement});
    assert.equal(eventHandler._eventListeners.length, 1);

    eventHandler.type = GDMouseLeaveEventType;
    eventHandler.updateEventListeners(this, {DOMElement: DOMElement});
    assert.equal(eventHandler._eventListeners.length, 1);
});


QUnit.test("createInstance action tests", function(assert) {
    let eventHandler = GDEventHandler.createInstance();
    assert.equal( eventHandler.orderedActionSets.length, 0);

    let actionSet = GDActionSet.createInstance();
    eventHandler.addActionSet(actionSet);
    assert.equal( eventHandler.orderedActionSets.length, 1);
    let calls = [];

    let action = GDAction.createInstance();
    action.execute = (e) => calls.push("action1");

    actionSet.addAction(action);

    eventHandler.execute({});
    assert.equal(calls.length, 1);
});

QUnit.test("afterPrevious and actionsets #626", function(assert) {
    let eventHandler = GDEventHandler.createInstance();

    let calls = [];

    let actionSet = GDActionSet.createInstance();
    let action = GDAction.createInstance();

    action.execute = (e) => { calls.push("action1"); action.actionFinished(e); }

    actionSet.addAction(action);

    eventHandler.addActionSet(actionSet);

    let actionSet2 = GDActionSet.createInstance();
    let action2 = GDAction.createInstance();
    action2.execute = (e) => calls.push("action2");

    actionSet2.addAction(action2);
    actionSet2.afterPrevious = true;

    eventHandler.addActionSet(actionSet2);

    eventHandler.execute({});
    assert.equal(calls.length, 2);
    assert.equal(calls[0], "action1");
    assert.equal(calls[1], "action2");
});

QUnit.test("afterPrevious only after actionFinished", function(assert) {

    let calls = [];

    let actionSet = GDActionSet.createInstance();
    function createAction(name) {
        let action = GDAction.createInstance();

        action.execute = (e) => { calls.push(name);  }

        action.afterPrevious = true;
        return action;
    }

    let actions = [createAction("1"), createAction("2"), createAction("3")];
    actions.forEach(a => actionSet.addAction(a));


    actionSet.execute({});
    assert.equal(actions[0]._nextAction, actions[1]);
    assert.equal(calls.length,1);
    assert.equal(calls[0], "1");

    actions[0].actionFinished({});
    assert.equal(calls.length,2);
    assert.equal(calls[1], "2");
    assert.equal(actions[1]._nextAction, actions[2]);

    actions[1].actionFinished({});
    assert.equal(calls.length,3);
    assert.equal(calls[2], "3");
});



QUnit.test("state css sort", function(assert) {
    const normal = {type: GDState.GDNormalStateType};
    const custom = {type: GDState.GDCustomStateType};
    const mouseOver = {type: GDState.GDMouseOverStateType};
    const pressed = {type: GDState.GDPressedStateType};
    const focus = {type: GDState.GDFocusStateType};

    let states = [focus, pressed, mouseOver, custom, normal];

    states.sort(GDState.sortFunction);

    assert.equal(states[0].type, GDState.GDNormalStateType);

    const mouseOverIndex = states.indexOf(mouseOver);
    const pressedIndex = states.indexOf(pressed);

    assert.ok( mouseOverIndex > 0);
    assert.ok( pressedIndex > mouseOverIndex);
});


QUnit.test("issue 707, no parameter", function(assert) {
    let eventHandler = GDEventHandler.createInstance();
    eventHandler.eventType = GDScrollEventType;

    let cell = {DOMElement: document.body, isScreen: true};
    eventHandler.updateEventListeners(null, cell);

    let eventListeners = eventHandler._eventListeners;
    assert.equal(eventListeners.length, 1);
    assert.equal(eventListeners[0].target, window, "need window for scroll-event on body");

    eventHandler.removeOldListeners();
});

QUnit.test("issue 707, with parameter", function(assert) {
    let eventHandler = GDEventHandler.createInstance();
    eventHandler.eventType = GDScrollEventType;
    eventHandler._parameter = {axis: "scrollLeft", comparator: "<", value: 1};

    let cell = {DOMElement: document.body, isScreen: true};
    eventHandler.updateEventListeners(null, cell);

    let eventListeners = eventHandler._eventListeners;
    assert.equal(eventListeners.length, 1);
    assert.equal(eventListeners[0].target, window, "need window for scroll-event on body");

    eventHandler.removeOldListeners();
});


QUnit.test("define ui color", function(assert) {
    let color = new GDUIColor({colorValue: {NSColorValue: "1.000000,1.000000,1.000000,1.000000"}, objectId: 'id1234'}, this.project);

    let style = document.createElement("div").style;
    color.defineInStyle(style);

    assert.equal(style.getPropertyValue('--id1234'), color.colorValue.toString());
});

QUnit.test("reference ui color", function(assert) {
    let color = new GDUIColor({colorValue: {NSColorValue: "1.000000,1.000000,1.000000,1.000000"}, objectId: 'id1234'}, this.project);
    let reference = color.referenceValue;
    assert.equal(reference, 'var(--id1234)');
});

QUnit.test("define colors in stylesheet", function(assert) {
    this.updateStyleProperty= function(){};
    let lookAndFeel = this.project.currentLookAndFeel;
    let color = new GDUIColor({colorValue: {NSColorValue: "1.000000,1.000000,1.000000,1.000000"}, objectId: 'id1234'}, this.project);
    lookAndFeel.colors.push(color);

    lookAndFeel.populateCSS(this.testStyleSheet, null, this); 

    assert.ok(lookAndFeel._cssStyleSheet.indexOfSelector(":root") != undefined );
    assert.equal(lookAndFeel._rootRule, lookAndFeel._cssStyleSheet.existingRuleForSelector(":root"));
    assert.equal(lookAndFeel._rootRule.style.getPropertyValue("--id1234"), color.colorValue.toString());
});

QUnit.test("updateColor", function(assert) {
    this.updateStyleProperty= function(){};
    let lookAndFeel = this.project.currentLookAndFeel;
    let color = new GDUIColor({colorValue: {NSColorValue: "1.000000,1.000000,1.000000,1.000000"}, objectId: 'id1234'}, this.project);
    lookAndFeel.colors.push(color);

    lookAndFeel.populateCSS(this.testStyleSheet, null, this); 

    this.project.updateColor(color, CPColor.fromJSON({NSColorValue: "0,0,0,1"}));

    assert.equal(color.colorValue.hexString(), "#000000");
    assert.equal(lookAndFeel._rootRule.style.getPropertyValue("--id1234"), color.colorValue.toString());
});


QUnit.test("GDProject.createInstance", function(assert) {
    const project = GDProject.createInstance();
    const library = project.library;
    assert.ok(library != undefined, "project has a library");
    const screenWidget = library.screenWidget;
    assert.ok(screenWidget != undefined, "project has a screen widget");
    const basicCellWidget = library.basicCellWidget;
    assert.ok(basicCellWidget != undefined, "project has a basic cell widget");
});

QUnit.test("Widget createInstance", function(assert) {
    const project = GDProject.createInstance();
    const library = project.library;
    const screenWidget = library.screenWidget;

    const screenInstance = screenWidget.createInstance();
    assert.equal(screenInstance.definition, screenWidget.hierarchy, "check definition");
});

QUnit.test("create basic cell", function(assert) {
    const project = GDProject.createInstance();
    const basicCell = project.createBasicCell();
    assert.equal(basicCell.widget.type, GDWidget.GDNormalCellWidgetType);
});


QUnit.test("script action test", function(assert) {
    let eventHandler = GDEventHandler.createInstance();
    let actionSet = GDActionSet.createInstance();
    eventHandler.addActionSet(actionSet);
    let action = GDScriptAction.createInstance();

    var result = {};

    window.GlobalTestHandler = (targetCells, at, event, action) => {
        result = {targetCells: targetCells, at: at, event: event, action: action};
    }
    action.type = "JavaScript";
    action.source = "window.GlobalTestHandler(targetCells, at, event, action)";
    actionSet.addAction(action);

    const event = {foo: "bar"};
    eventHandler.execute(event);

    assert.equal(result.at, Antetype);
    assert.deepEqual(result.targetCells, action.targetFigures);
    assert.equal(result.action, action);
    assert.equal(result.event, event);

    delete window.GlobalTestHandler;
})