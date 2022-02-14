import { GDProject, GDState, GDDesignBreakPoint, GDWidget, GDWidgetRootCellDefinition } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

const { test } = QUnit;

QUnit.module("GDWidgetInstanceCell", hooks => {
    let project, antetype, screen;
    hooks.beforeEach(() => {
        project = GDProject.createInstance();
        antetype = new AntetypeWeb();
        antetype.project = project;
        antetype.buildStyleSheet();
        screen = project.createScreen();
    });

    hooks.afterEach(() => {
        screen.cleanupStyles();
        project.currentLookAndFeel.cssStyleSheet.remove();
        project.currentLookAndFeel.breakPointStyleSheet.remove();
    });

    test("writes into screen-stylesheet", assert => {
        screen.createStyleSheets();
        let cell = project.createBasicCell();
        screen.addComponent(cell);

        cell.insertCSSRuleForState(cell.activeState);
        assert.equal(screen.cssStyleSheet.rulesLength, 1);
    });

    test("breakpoints", assert => {
        let breakpoint = GDDesignBreakPoint.createInstance(project);
        breakpoint._breakPointMaxWidth = 400;
        breakpoint.breakPointName = "foo";
        project.addDesignBreakPoint(breakpoint);
        screen.createStyleSheets();


        let widget = GDWidget.createInstance(project);
        widget._hierarchy = GDWidgetRootCellDefinition.createInstance(project);
        widget._hierarchy._widget = widget;
        project.library.addWidget(widget);

        let breakPointState = GDState.createInstance(project);
        breakPointState.designBreakPointName = breakpoint.breakPointName;
        breakPointState._type = GDState.GDNormalStateType;
        breakPointState._name = widget.normalState.name;
        widget.addState(breakPointState);
        assert.ok(breakPointState.hasBreakPoints(), "we have breakpoints in this state");
        assert.equal(breakPointState.designBreakPoint(), breakpoint);

        let cell = widget.createInstance();
        screen.addComponent(cell);


        let style = cell.insertCSSRuleForState(breakPointState);
        assert.equal(style.parentRule.parentStyleSheet, screen.breakPointStyleSheet._styleSheet);
    });


    test("cleanupStyles cleans screen stylesheet", assert => {
        screen.createStyleSheets();
        let cell = project.createBasicCell();
        screen.addComponent(cell);

        let style = cell.insertCSSRuleForState(cell.activeState);
        style.width = "123px";

        cell.cleanupStyles();

        assert.equal(style.width, "");
        assert.equal(cell._cssStyles[cell.activeStateIdentifier], undefined);
    });


    test("getProperty", assert => {
        const basicCell = project.createBasicCell();
        const value = 123;
        basicCell.setValueForKeyInStateWithIdentifier(value, "width", basicCell.activeStateIdentifier);
        assert.equal(basicCell.getProperty("width"), value);
        assert.equal(basicCell.getProperty("width", basicCell.activeState), value);
        assert.equal(basicCell.valueForKeyInStateWithIdentifier("width", basicCell.activeStateIdentifier), value);
    });

    test("setProperty", assert => {
        const basicCell = project.createBasicCell();

        const value = 123;
        basicCell.setProperty("height", value);
        assert.equal(basicCell.getProperty("height"), value);
    });
});

