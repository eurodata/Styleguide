import {
    GDProject, GDModelObject, GDCompositeFigure, GDDesignBreakPoint,
    GDEventHandler, GDMouseEnterEventType, GDMouseLeaveEventType, GDActionSet,
    GDAction, GDState, GDScrollEventType, GDUIColor, GDWidget, CPColor, GDScriptAction
} from '../modules/model.js';
import { Antetype } from '../modules/viewer.js';

const { test } = QUnit;

QUnit.module("model", hooks => {
    /** @type {GDProject} */
    let project;

    let testStyleSheet;
    hooks.beforeEach(() => {
        project = new GDProject(projectJSON, null)

        // no idea why a createElement("style") does not work (returns a HTMLStyleElement, but it is not usable), 
        // therefor we remove everything before use
        testStyleSheet = document.getElementById("TestStyles").sheet;
        while (testStyleSheet.cssRules.length > 0) {
            testStyleSheet.deleteRule(0);
        }
    });

    test("fromJSON", assert => {
        var cell = GDModelObject.fromJSONObjectInProject(singleCellJson.cell, project);
        assert.equal(cell.name, "Rectangle");

        var textColor = cell.valueForKeyInStateWithIdentifier("textColor", cell.activeStateIdentifier);
        assert.equal(textColor.toString(), "#ffffff");

    });

    test("valueForKey", assert => {
        var cell = GDModelObject.fromJSONObjectInProject(singleCellJson.cell, project);
        var stateIdentifier = singleCellJson.cell.activeState;
        var x = cell.valueForKeyInStateWithIdentifier("x", stateIdentifier);
        assert.equal(singleCellJson.cell.styleProperties[stateIdentifier].x, x);

        var defaultBorderLeft = project.currentLookAndFeel.defaultValueForKey("borderLeftColor");
        assert.equal(defaultBorderLeft, cell.valueForKeyInStateWithIdentifier("borderLeftColor", stateIdentifier));
    });

    test("converted", assert => {
        var d = {
            className: "GDCompositeFigure",
            name: "foo",
            orderedComponents: [
                {
                    className: "GDCompositeFigure",
                    name: "bar", orderedComponents: []
                },
                {
                    className: "GDCompositeFigure",
                    name: "baz", orderedComponents: []
                },
            ]
        };
        var figure = new GDCompositeFigure(d, project);
        assert.equal(figure.orderedComponents.length, 2);
        assert.equal(figure.name, d.name);

        assert.equal(figure.orderedComponents[0].name, "bar");
        assert.equal(figure.orderedComponents[0].container, figure);

        assert.equal(figure.orderedComponents[1].name, "baz");
        assert.equal(figure.orderedComponents[1].container, figure);
    });




    test("updateEventListeners cleans old ones", assert => {
        let eventHandler = new GDEventHandler({ eventType: GDMouseEnterEventType, orderedActionSets: [] }, project);
        let DOMElement = document.createElement("cell");

        eventHandler.updateEventListeners(this, { DOMElement: DOMElement });
        assert.equal(eventHandler._eventListeners.length, 1);

        eventHandler.type = GDMouseLeaveEventType;
        eventHandler.updateEventListeners(this, { DOMElement: DOMElement });
        assert.equal(eventHandler._eventListeners.length, 1);
    });


    test("createInstance action tests", assert => {
        let eventHandler = GDEventHandler.createInstance();
        assert.equal(eventHandler.orderedActionSets.length, 0);

        let actionSet = GDActionSet.createInstance();
        eventHandler.addActionSet(actionSet);
        assert.equal(eventHandler.orderedActionSets.length, 1);
        let calls = [];

        let action = GDAction.createInstance();
        action.execute = (e) => calls.push("action1");

        actionSet.addAction(action);

        eventHandler.execute({});
        assert.equal(calls.length, 1);
    });

    test("afterPrevious and actionsets #626", assert => {
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

    test("afterPrevious only after actionFinished", assert => {

        let calls = [];

        let actionSet = GDActionSet.createInstance();
        function createAction(name) {
            let action = GDAction.createInstance();

            action.execute = (e) => { calls.push(name); }

            action.afterPrevious = true;
            return action;
        }

        let actions = [createAction("1"), createAction("2"), createAction("3")];
        actions.forEach(a => actionSet.addAction(a));


        actionSet.execute({});
        assert.equal(actions[0]._nextAction, actions[1]);
        assert.equal(calls.length, 1);
        assert.equal(calls[0], "1");

        actions[0].actionFinished({});
        assert.equal(calls.length, 2);
        assert.equal(calls[1], "2");
        assert.equal(actions[1]._nextAction, actions[2]);

        actions[1].actionFinished({});
        assert.equal(calls.length, 3);
        assert.equal(calls[2], "3");
    });



    test("state css sort", assert => {
        const normal = { type: GDState.GDNormalStateType };
        const custom = { type: GDState.GDCustomStateType };
        const mouseOver = { type: GDState.GDMouseOverStateType };
        const pressed = { type: GDState.GDPressedStateType };
        const focus = { type: GDState.GDFocusStateType };

        let states = [focus, pressed, mouseOver, custom, normal];

        states.sort(GDState.sortFunction);

        assert.equal(states[0].type, GDState.GDNormalStateType);

        const mouseOverIndex = states.indexOf(mouseOver);
        const pressedIndex = states.indexOf(pressed);

        assert.ok(mouseOverIndex > 0);
        assert.ok(pressedIndex > mouseOverIndex);
    });


    test("issue 707, no parameter", assert => {
        let eventHandler = GDEventHandler.createInstance();
        eventHandler.eventType = GDScrollEventType;

        let cell = { DOMElement: document.body, isScreen: true };
        eventHandler.updateEventListeners(null, cell);

        let eventListeners = eventHandler._eventListeners;
        assert.equal(eventListeners.length, 1);
        assert.equal(eventListeners[0].target, window, "need window for scroll-event on body");

        eventHandler.removeOldListeners();
    });

    test("issue 707, with parameter", assert => {
        let eventHandler = GDEventHandler.createInstance();
        eventHandler.eventType = GDScrollEventType;
        eventHandler._parameter = { axis: "scrollLeft", comparator: "<", value: 1 };

        let cell = { DOMElement: document.body, isScreen: true };
        eventHandler.updateEventListeners(null, cell);

        let eventListeners = eventHandler._eventListeners;
        assert.equal(eventListeners.length, 1);
        assert.equal(eventListeners[0].target, window, "need window for scroll-event on body");

        eventHandler.removeOldListeners();
    });


    test("define ui color", assert => {
        let color = new GDUIColor({ colorValue: { NSColorValue: "1.000000,1.000000,1.000000,1.000000" }, objectId: 'id1234' }, project);

        let style = document.createElement("div").style;
        color.defineInStyle(style);

        assert.equal(style.getPropertyValue('--id1234'), color.colorValue.toString());
    });

    test("reference ui color", assert => {
        let color = new GDUIColor({ colorValue: { NSColorValue: "1.000000,1.000000,1.000000,1.000000" }, objectId: 'id1234' }, project);
        let reference = color.referenceValue;
        assert.equal(reference, 'var(--id1234)');
    });



    test("GDProject.createInstance", assert => {
        const project = GDProject.createInstance();
        const library = project.library;
        assert.ok(library != undefined, "project has a library");
        const screenWidget = library.screenWidget;
        assert.ok(screenWidget != undefined, "project has a screen widget");
        const basicCellWidget = library.basicCellWidget;
        assert.ok(basicCellWidget != undefined, "project has a basic cell widget");
    });

    test("Widget createInstance", assert => {
        const project = GDProject.createInstance();
        const library = project.library;
        const screenWidget = library.screenWidget;

        const screenInstance = screenWidget.createInstance();
        assert.equal(screenInstance.definition, screenWidget.hierarchy, "check definition");
    });

    test("create basic cell", assert => {
        const project = GDProject.createInstance();
        const basicCell = project.createBasicCell();
        assert.equal(basicCell.widget.type, GDWidget.GDNormalCellWidgetType);
    });


    test("script action test", assert => {
        let eventHandler = GDEventHandler.createInstance();
        let actionSet = GDActionSet.createInstance();
        eventHandler.addActionSet(actionSet);
        let action = GDScriptAction.createInstance();

        var result = {};

        window.GlobalTestHandler = (targetCells, at, event, action) => {
            result = { targetCells: targetCells, at: at, event: event, action: action };
        }
        action.type = "JavaScript";
        action.source = "window.GlobalTestHandler(targetCells, at, event, action)";
        actionSet.addAction(action);

        const event = { foo: "bar" };
        eventHandler.execute(event);

        assert.equal(result.at, Antetype);
        assert.deepEqual(result.targetCells, action.targetFigures);
        assert.equal(result.action, action);
        assert.equal(result.event, event);

        delete window.GlobalTestHandler;
    })
});


