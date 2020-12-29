"use strict";

import { GDProject, GDWidget } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

QUnit.module("GDLibrary", {
    beforeEach: function() {
        this.project = GDProject.createInstance();
        this.library = this.project.library;
        this.antetype = new AntetypeWeb();
        this.antetype.project = this.project;
    }


    ,afterEach: function() {
    }
});

QUnit.test("addWidget and widget with same identifier", function(assert) {
    let w = GDWidget.createInstance(this.project);
    w.identifier = "foo";
    this.library.addWidget(w);
    const n = this.library.widgets.length;


    let w2 = GDWidget.createInstance(this.project);
    w2.identifier = "foo";
    this.library.addWidget(w2);

    assert.equal(this.library.widgets.length,n);
    assert.equal(this.library.widgetWithIdentifier("foo"), w2);
});

QUnit.test("createBasicCell creates complete cell", function(assert) {
    const cell = this.library.basicCellWidget.createInstance();

    assert.notEqual(cell.definitionIdentifier, undefined);

});
