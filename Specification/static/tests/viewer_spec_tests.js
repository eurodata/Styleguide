"use strict";

QUnit.module("viewer spec", { 
        beforeEach: function() {
            this.antetype = new AntetypeWeb();
            this.specTool = new GDSpecTool(this.antetype);
        }
});


if (window.ResizeObserver) {
QUnit.test("selection resize", function(assert) {
    let element = document.createElement("div");
    element.style.width = "80px";
    element.style.height = "70px";

    document.body.appendChild(element);
    assert.equal(this.specTool._selectedElementHighlight, null);
    this.specTool.selectElement(element);

    assert.ok(this.specTool._selectedElementHighlight != null);
    this.specTool._selectedElementHighlight.style.position = "absolute";
    assert.equal( this.specTool._selectedElementHighlight.style.width, element.style.width);

    element.style.width = "345px";

    // even resize-observer is not instantly... 
    let done = assert.async();
    
    setTimeout( () => {
        let elementBounds = globalBoundsOfElement(element);
        let highlightBounds = globalBoundsOfElement(this.specTool._selectedElementHighlight);
        assert.propEqual( elementBounds, highlightBounds);
        done();
    }, 5);
});
}


QUnit.test("rgb2hex", function(assert) {
    assert.equal(rgb2hex("rgba(1,2,3,0)"), "transparent");
    assert.equal(rgb2hex("rgb(1,2,3)"), "#010203");
    assert.equal(rgb2hex("rgba(123,100,200,0.2)"), "#7b64c833");
});


