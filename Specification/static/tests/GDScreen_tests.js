"use strict";

import { GDProject, GDDesignBreakPoint } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';


QUnit.module("GDScreen", {
    beforeEach: function() {
        this.project = GDProject.createInstance();
        this.antetype = new AntetypeWeb();
        this.antetype.project = this.project;
        this.antetype.buildStyleSheet();
        this.screen =  this.project.library.screenWidget.createInstance();
    }


    ,afterEach: function() {
        this.project.currentLookAndFeel.cssStyleSheet.remove();
        this.project.currentLookAndFeel.breakPointStyleSheet.remove();
    }
});

QUnit.test("screen has two stylesheets", function(assert) {
    const styleCount = document.styleSheets.length;
    this.screen.createStyleSheets();
    assert.equal(document.styleSheets.length, styleCount+2);

    const lookAndFeelStyleSheet = this.project.currentLookAndFeel.cssStyleSheet._styleSheet;
    const lookAndFeelBreakpointsStyleSheet = this.project.currentLookAndFeel.breakPointStyleSheet._styleSheet;

    function indexOfStyleSheet(s) {
        for (let i=0; i<document.styleSheets.length; i++) 
            if (document.styleSheets[i] == s) 
                return i;

        return -1;
    }

    assert.ok(indexOfStyleSheet(this.screen.cssStyleSheet._styleSheet) 
        > indexOfStyleSheet(lookAndFeelStyleSheet), "screen styles after l&f stylesheet");
    assert.ok(indexOfStyleSheet(this.screen.cssStyleSheet._styleSheet) 
        < indexOfStyleSheet(lookAndFeelBreakpointsStyleSheet), "screen styles before l&f breakpoint styles");



});

QUnit.test("cleanupStyles keeps but disables the style-sheets", function(assert) {
    this.screen.createStyleSheets();
    const styleCountWithScreenStyleSheets = document.styleSheets.length;
    this.screen.cleanupStyles();

    assert.ok(this.screen.cssStyleSheet._styleSheet.disabled);
    assert.ok(this.screen.breakPointStyleSheet._styleSheet.disabled);


    assert.equal(document.styleSheets.length, styleCountWithScreenStyleSheets);
});

QUnit.test("removeStyleSheets removes the style-sheets", function(assert) {
    const styleCount = document.styleSheets.length;
    this.screen.createStyleSheets();
    this.screen.removeStyleSheets();

    assert.equal(document.styleSheets.length, styleCount);
});


QUnit.test("createStyleSheets and breakpoints", function(assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint.breakPointName= "foo";
    this.project.addDesignBreakPoint(breakpoint);

    let anotherBreakpoint= GDDesignBreakPoint.createInstance(this.project);
    anotherBreakpoint._breakPointMaxWidth = 800;
    anotherBreakpoint.breakPointName= "bar";
    this.project.addDesignBreakPoint(anotherBreakpoint);

    this.screen.createStyleSheets();
    assert.equal(this.screen.breakPointStyleSheet.rulesLength, 2);

    let mediaRule = this.screen.mediaRuleForBreakpoint(breakpoint);
    assert.ok( mediaRule != undefined, "media rule is available");
    assert.ok(mediaRule._styleSheet.media.mediaText.indexOf("400") != -1, "");


    let anotherMediaRule = this.screen.mediaRuleForBreakpoint(anotherBreakpoint);
    assert.ok( anotherMediaRule != undefined, "media rule is available");
    assert.ok(anotherMediaRule._styleSheet.media.mediaText.indexOf("800") != -1, "");
});

QUnit.test("screen has html-style", function(assert) {
    this.screen.createStyleSheets();
    const style = this.screen.htmlCSSStyle;
    assert.ok( style != undefined, "screen has a style");
    const rule = style.parentRule;
    assert.equal(rule.selectorText, "html");
});


QUnit.test("enablePseudoStates and breakpoints", function(assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint.breakPointName= "foo";
    this.project.addDesignBreakPoint(breakpoint);

    this.screen.createStyleSheets();
    let mediaRule = this.screen.mediaRuleForBreakpoint(breakpoint);
    mediaRule.insertSelector("bla:hover");

    this.screen.disablePseudoStates();
    assert.equal(mediaRule.indexOfSelector("bla:hover"), undefined, "pseudo state not available");
    assert.equal(mediaRule.indexOfSelector("bla_hover"), 0, "pseudo state is made static");

    this.screen.enablePseudoStates();
    assert.equal(mediaRule.indexOfSelector("bla:hover"), 0, "pseudo state available");
    assert.equal(mediaRule.indexOfSelector("bla_hover"), undefined, "static not available");
});



