"use strict";

QUnit.module("classes");

function A(a) {
    this.a = a;
}

A.prototype.foo = function() {
    return this.a;
}

Object.defineProperty(A.prototype, 'baz', {
    get: function() { return "baz" + this.a }
});

function B(a) {
    A.call(this,a);
    this.b = a*2;
}

B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.bar = function() {
    return this.b;
}

QUnit.test("classes", function(assert) {
    var a = new A(1);    
    assert.equal(1, a.foo());
    var b = new B(2);
    assert.equal(2, b.foo());
    assert.equal(4, b.bar());
    assert.equal(a.baz, "baz1");
    assert.equal(b.baz, "baz2");
});


class C extends B {
    constructor(a) {
        super(a);
        this.p = a;
    }

}

QUnit.test("extend using new style classes", function(assert) {
    var c = new C(0);
    assert.equal(0, c.foo());
    assert.equal("baz0", c.baz);
    assert.equal(0, c.p);
});
