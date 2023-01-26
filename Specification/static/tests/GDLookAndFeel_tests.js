"use strict";

import { GDProject, GDDesignBreakPoint } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

QUnit.module("GDLookAndFeel", {
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


QUnit.test("enablePseudoStates and breakpoints", function(assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint.breakPointName= "foo";
    this.project.addDesignBreakPoint(breakpoint);

    let mediaRule = breakpoint.mediaRule;
    mediaRule.insertSelector("bla:hover");

    this.project.currentLookAndFeel.disablePseudoStates();
    assert.equal(mediaRule.indexOfSelector("bla:hover"), undefined, "pseudo state not available");
    assert.equal(mediaRule.indexOfSelector("bla_hover"), 0, "pseudo state is made static");

    this.project.currentLookAndFeel.enablePseudoStates();
    assert.equal(mediaRule.indexOfSelector("bla:hover"), 0, "pseudo state available");
    assert.equal(mediaRule.indexOfSelector("bla_hover"), undefined, "static not available");
});
