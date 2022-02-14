"use strict";

import { GDProject, GDDesignBreakPoint } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

QUnit.module("GDDesignBreakPoint", {
    beforeEach: function () {
        this.project = GDProject.createInstance();
        this.antetype = new AntetypeWeb();
        this.antetype.project = this.project;
        this.antetype.buildStyleSheet();
        this.screen = this.project.createScreen();
        this.antetype.currentScreen = this.screen;
        this.screen.createStyleSheets();
    }


    , afterEach: function () {
        this.project.currentLookAndFeel.cssStyleSheet.remove();
        this.project.currentLookAndFeel.breakPointStyleSheet.remove();
    }
});


QUnit.test("add design breakpoint", function (assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint._originalBreakPointMaxWidth = 400;
    breakpoint.breakPointName = "foo";
    this.antetype.addDesignBreakPoint(breakpoint);

    assert.ok(breakpoint.mediaRule != undefined, "breakpoint has a media rule");

    let selector = breakpoint.mediaRule.insertSelector("foo");
    assert.equal(breakpoint.mediaRule.indexOfSelector("foo"), 0, "mediarule is a gdssttylesheet")
    assert.equal(this.project.currentLookAndFeel.breakPointStyleSheet.cssRules.length, 1, "l&f has a new mediaRule");
    assert.ok(this.screen.mediaRuleForBreakpoint(breakpoint) != undefined, "screen has a media rule for the breakpoint");
    assert.equal(this.screen._breakPointStyleSheet.cssRules.length, 1, "screen breakpoint stylesheet has a new rule");
});

QUnit.test("delete design breakpoint", function (assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint._originalBreakPointMaxWidth = 400;
    breakpoint.breakPointName = "foo";
    this.antetype.addDesignBreakPoint(breakpoint);
    this.antetype.deleteDesignBreakPoint(breakpoint);

    assert.ok(breakpoint.mediaRule == undefined, "no mediaRule in stored in the breakpoint");
    assert.equal(this.project.currentLookAndFeel.breakPointStyleSheet.cssRules.length, 0, "mediarule removed from l&f stylesheet");
    assert.ok(this.screen.mediaRuleForBreakpoint(breakpoint) == undefined, "screen has no media rule for deleted breakpoint");
    assert.equal(this.screen._breakPointStyleSheet.cssRules.length, 0, "screen breakpoint-stylesheet is empty");
});

QUnit.test("update design breakpoint", function (assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint._originalBreakPointMaxWidth = 400;
    breakpoint.breakPointName = "foo";
    this.antetype.addDesignBreakPoint(breakpoint);

    const newWidth = 1234;
    this.project.updateDesignBreakPoint(breakpoint, "newName", newWidth);

    assert.equal(breakpoint.breakPointName, "newName");
    assert.equal(breakpoint.breakPointMaxWidth, newWidth);

    const widgetRule = breakpoint.mediaRule;
    assert.equal(widgetRule._styleSheet.media.mediaText, `(max-width: ${newWidth}px)`);

    this.screen.updateDesignBreakPoint(breakpoint);
    const screenRule = this.screen.mediaRuleForBreakpoint(breakpoint);
    assert.equal(screenRule._styleSheet.media.mediaText, `(max-width: ${newWidth}px)`);
});
QUnit.test("add design breakpoint with zoom", function (assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint._originalBreakPointMaxWidth = 400;
    breakpoint.breakPointName = "withzoom1";

    this.antetype.currentZoom = 2.0;
    this.antetype.addDesignBreakPoint(breakpoint);

    assert.equal(breakpoint.breakPointMaxWidth, 800);
});

QUnit.test("update design breakpoint with zoom", function (assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint._originalBreakPointMaxWidth = 400;
    breakpoint.breakPointName = "withzoom2";
    this.antetype.addDesignBreakPoint(breakpoint);

    this.antetype.currentZoom = 2.0;

    const newWidth = 500;
    this.antetype.updateDesignBreakPoint(breakpoint, "withzoom2", newWidth);
    assert.equal(breakpoint.breakPointMaxWidth, 1000);
});

