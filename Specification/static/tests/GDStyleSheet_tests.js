"use strict";

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
    this.styleSheet.insertSelector(".foo:focus", 3);
    const length = this.styleSheet.rulesLength;

    this.styleSheet.disablePseudoStates();

    assert.equal(this.domStyle.cssRules[0].selectorText, ".foo_hover");
    assert.equal(this.domStyle.cssRules[1].selectorText, ".foo");
    assert.equal(this.domStyle.cssRules[2].selectorText, ".foo_active");
    assert.equal(this.domStyle.cssRules[3].selectorText, ".foo_focus");

    assert.equal(this.styleSheet.rulesLength, length, "only selector rename");
});

QUnit.test("disablePseudoStates existing stylesheet", function(assert) {
    let domStyle = document.getElementById("GDStyleSheet_tests_style").sheet;
    let styleSheet = new GDStyleSheet(domStyle);

    const length = styleSheet.rulesLength;

    styleSheet.disablePseudoStates();

    assert.equal(domStyle.cssRules[0].selectorText, ".foo_hover");
    assert.equal(domStyle.cssRules[1].selectorText, ".foo");
    assert.equal(domStyle.cssRules[2].selectorText, ".foo_active");
    assert.equal(domStyle.cssRules[3].selectorText, ".foo_focus");

    assert.equal(styleSheet.rulesLength, length, "only selector rename");
});

QUnit.test("enablePseudoStates", function(assert) {
    this.styleSheet.insertSelector(".foo_hover",0);
    this.styleSheet.insertSelector(".foo", 1);
    this.styleSheet.insertSelector(".foo_active", 2);
    this.styleSheet.insertSelector(".foo_focus", 3);
    const length = this.styleSheet.rulesLength;

    this.styleSheet.enablePseudoStates();

    assert.equal(this.domStyle.cssRules[0].selectorText, ".foo:hover");
    assert.equal(this.domStyle.cssRules[1].selectorText, ".foo");
    assert.equal(this.domStyle.cssRules[2].selectorText, ".foo:active");
    assert.equal(this.domStyle.cssRules[3].selectorText, ".foo:focus");

    assert.equal(this.styleSheet.rulesLength, length, "only selector rename");
});
