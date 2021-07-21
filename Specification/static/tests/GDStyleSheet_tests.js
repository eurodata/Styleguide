"use strict";

import { GDStyleSheet } from '../modules/GDStyleSheet.js';

QUnit.module("GDStyleSheet", {
    beforeEach: function() {
        this.styleElement = document.createElement("style");
        document.head.appendChild(this.styleElement);
        this.domStyle = this.styleElement.sheet;
        this.styleSheet = new GDStyleSheet(this.domStyle);
    },

    afterEach: function() {
        document.head.removeChild(this.styleElement);
    }
});


QUnit.test("styles selector tests", function(assert) {
    const rule = this.styleSheet._appendSelector("foo");
    assert.equal(this.domStyle.cssRules.length, 1);
    assert.equal(rule.selectorText, "foo");

    assert.equal(this.styleSheet.indexOfSelector("foo"),0);


    assert.equal(this.styleSheet.indexOfSelector("bar"), undefined);

    const barRule = this.styleSheet.insertSelector("bar", 0);
    assert.equal(barRule.selectorText, "bar");
    assert.equal(this.domStyle.cssRules.length, 2);
    assert.equal(this.styleSheet.indexOfSelector("bar"), 0);
    assert.equal(this.domStyle.cssRules[0].selectorText, "bar");

    assert.equal(this.styleSheet.indexOfSelector("foo"), 1);
    assert.equal(this.domStyle.cssRules[1].selectorText, "foo");

    this.styleSheet.deleteSelector("bar");
    // issue #337, recycle: 
    assert.equal(this.domStyle.cssRules.length, 2);
    assert.equal(this.styleSheet._selectorsForDelete.size, 1);
    assert.equal(this.styleSheet.indexOfSelector("foo"),1);
    assert.equal(this.domStyle.cssRules[1].selectorText, "foo");
});

QUnit.test("disablePseudoStates", function(assert) {
    this.styleSheet.insertSelector(".foo:hover",0);
    this.styleSheet.insertSelector(".foo", 1);
    this.styleSheet.insertSelector(".foo:active", 2);
    this.styleSheet.insertSelector(".foo:focus-within", 3);
    const length = this.styleSheet.rulesLength;

    this.styleSheet.disablePseudoStates();

    assert.equal(this.domStyle.cssRules[0].selectorText, ".foo_hover");
    assert.equal(this.domStyle.cssRules[1].selectorText, ".foo");
    assert.equal(this.domStyle.cssRules[2].selectorText, ".foo_active");
    assert.equal(this.domStyle.cssRules[3].selectorText, ".foo_focus-within");

    assert.equal(this.styleSheet.rulesLength, length, "only selector rename");
});

QUnit.test("disablePseudoStates existing stylesheet", function(assert) {
    let domStyle = document.getElementById("GDStyleSheet_tests_style").sheet;
    let styleSheet = new GDStyleSheet(domStyle);
    styleSheet.fillSelectorMap();

    const length = styleSheet.rulesLength;

    styleSheet.disablePseudoStates();

    assert.equal(domStyle.cssRules[0].selectorText, ".foo_hover");
    assert.equal(domStyle.cssRules[1].selectorText, ".foo");
    assert.equal(domStyle.cssRules[2].selectorText, ".foo_active");
    assert.equal(domStyle.cssRules[3].selectorText, ".foo_focus-within");

    assert.equal(styleSheet.indexOfSelector(".foo_hover"), 0);
    assert.equal(styleSheet.indexOfSelector(".foo"), 1);
    assert.equal(styleSheet.indexOfSelector(".foo_active"), 2);
    assert.equal(styleSheet.indexOfSelector(".foo_focus-within"), 3);

    assert.equal(styleSheet.rulesLength, length, "only selector rename");
});

QUnit.test("enablePseudoStates", function(assert) {
    this.styleSheet.insertSelector(".foo_hover",0);
    this.styleSheet.insertSelector(".foo", 1);
    this.styleSheet.insertSelector(".foo_active", 2);
    this.styleSheet.insertSelector(".foo_focus-within", 3);
    const length = this.styleSheet.rulesLength;

    this.styleSheet.enablePseudoStates();

    assert.equal(this.domStyle.cssRules[0].selectorText, ".foo:hover");
    assert.equal(this.domStyle.cssRules[1].selectorText, ".foo");
    assert.equal(this.domStyle.cssRules[2].selectorText, ".foo:active");
    assert.equal(this.domStyle.cssRules[3].selectorText, ".foo:focus-within");

    assert.equal(this.styleSheet.indexOfSelector(".foo:hover"), 0);
    assert.equal(this.styleSheet.indexOfSelector(".foo"), 1);
    assert.equal(this.styleSheet.indexOfSelector(".foo:active"), 2);
    assert.equal(this.styleSheet.indexOfSelector(".foo:focus-within"), 3);


    assert.equal(this.styleSheet.rulesLength, length, "only selector rename");
});

QUnit.test("issue923 write gradient as backround:", function(assert) {
    const rule = this.styleSheet._appendSelector("foo");
    rule.style.backgroundImage = "linear-gradient(rgb(173, 173, 173) 0%, rgba(212, 212, 212, 0) 100%)";

    const cssText = this.styleSheet.cssStringOfRule(rule);

    // hack but we simply add a background: after background-image
    assert.ok(cssText.indexOf("background-image:") < cssText.indexOf("background:"));
});

QUnit.test("issue 362", function(assert) {
    const rule = this.styleSheet._appendSelector("foo");
    rule.style.left = "calc(50%)";
    rule.style.top = "calc(0px)";
    rule.style.bottom = "unset";
    rule.style.right = "unset";
    const cssText = this.styleSheet.cssStringOfRule(rule);

    assert.ok(cssText.indexOf("left:") != -1);
    assert.ok(cssText.indexOf("top:") != -1);
    assert.equal(cssText.indexOf("index:"),-1);
})

QUnit.test("issue 367", function(assert) {
    const rule = this.styleSheet._appendSelector("foo");
    rule.style.left = "100px";
    rule.style.top = "20px";
    rule.style.bottom = "unset";
    rule.style.right = "unset";
    rule.style.background = "none";
    const cssText = this.styleSheet.cssStringOfRule(rule);

    assert.ok(cssText.indexOf("left:") != -1);
    assert.ok(cssText.indexOf("top:") != -1);
    assert.equal(cssText.indexOf("index:"),-1);
})

QUnit.test("cssStringOfRule special cases", function(assert) {
    const rule = this.styleSheet._appendSelector("foo");
    rule.style.background = "none";
    let cssText = this.styleSheet.cssStringOfRule(rule);
    assert.ok(cssText.indexOf("background: none") != -1);

    rule.style.backgroundImage = "initial";
    let cssText = this.styleSheet.cssStringOfRule(rule);
    assert.ok(cssText.indexOf("backround-image: initial") != -1);
    

});
