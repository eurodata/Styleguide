"use strict";

import { GDCellDragHandler, GDDragHandler, GDRubberbandDragHandler } from '../modules/drag-handler.js';
import { GDProject, GDWidget, GDWidgetRootCellDefinition, GDState, GDDesignBreakPoint } from '../modules/model.js';
import { GDCellIntersectionObserver, GDNativeSelectionTool, GDSelectionTool } from '../modules/tools.js';
import { stringFromContentEditable, targetIDFromEventTarget } from '../modules/utils.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { GDCSSGenerator } from '../modules/styling.js';

QUnit.module("viewer", { 
        beforeEach: function() {
            this.antetype = new AntetypeWeb();
            this.antetype.project = GDProject.createInstance();
            this.antetype.buildStyleSheet();
            this.antetype.currentScreen =  this.antetype.project.library.screenWidget.createInstance();
            this.antetype.currentScreen.createStyleSheets();
        }

        ,afterEach: function() {
            this.antetype.project.currentLookAndFeel.cssStyleSheet.remove();
            this.antetype.project.currentLookAndFeel.breakPointStyleSheet.remove();
        }
});

QUnit.test("registerCommand", function(assert) {
    var n = 0;
    var antetype = null;
    this.antetype.registerCommand("foo", function(o,at) {
        n = o;
        antetype = at;
    });
    var json = {command: "foo", parameters: "bar"};
    this.antetype.runCommand(json);
    assert.equal(n,"bar");
    assert.equal(antetype, this.antetype);
});

QUnit.test("asyncSync_asyncCommandExecuting", function(assert) {
    // Command definition
    this.antetype.registerCommand("async1", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    this.antetype.registerCommand("async2", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    this.antetype.registerCommand("sync1", function(o,at) {
        
    });

    this.antetype.registerCommand("sync2", function(o,at) {
        
    });

    this.antetype.registerCommand("sync3", function(o,at) {
        
    });

    // Command setup
    var async1 = {command: "async1", parameters: "bar"};
    var async2 = {command: "async2", parameters: "bar"};
    var sync1 = {command: "sync1", parameters: "bar"};
    var sync2 = {command: "sync2", parameters: "bar"};
    var sync3 = {command: "sync3", parameters: "bar"};

    // Run commands
    this.antetype.runCommand(async1);
    this.antetype.runCommand(async2);
    this.antetype.runCommand(sync1);
    this.antetype.runCommand(sync2);
    this.antetype.runCommand(sync3);

    // Assertions
    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();
    var done5 = assert.async();

    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 4);
        done1();
    }, 1 );
    setTimeout(() => {
        this.antetype.asyncCommandExecuting = false;
        done2();
    }, 2 );
    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 3);
        done3();
    }, 3 );
    setTimeout(() => {
        this.antetype.asyncCommandExecuting = false;
        done4();
    }, 4 );
    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 0);
        done5();
    }, 5);
});

QUnit.test("syncAsync_asyncCommandExecuting", function(assert) {
    // Command definition

    this.antetype.registerCommand("sync1", function(o,at) {
        
    });

    this.antetype.registerCommand("sync2", function(o,at) {
        
    });

    this.antetype.registerCommand("sync3", function(o,at) {
        
    });

    this.antetype.registerCommand("async1", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    this.antetype.registerCommand("async2", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    // Command setup
    var async1 = {command: "async1", parameters: "bar"};
    var async2 = {command: "async2", parameters: "bar"};
    var sync1 = {command: "sync1", parameters: "bar"};
    var sync2 = {command: "sync1", parameters: "bar"};
    var sync3 = {command: "sync1", parameters: "bar"};

    // Run commands
    this.antetype.runCommand(sync1);
    this.antetype.runCommand(sync2);
    this.antetype.runCommand(sync3);
    this.antetype.runCommand(async1);
    this.antetype.runCommand(async2);

    // Assertions
    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();

    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 1);
        done1();
    }, 1 );
    setTimeout(() => {
        this.antetype.asyncCommandExecuting = false;
        done2();
    }, 2 );
    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 0);
        done3();
    }, 3 );
});

QUnit.test("randomOrder_asyncCommandExecuting", function(assert) {
    // Command definition
    this.antetype.registerCommand("async1", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    this.antetype.registerCommand("sync1", function(o,at) {
        
    });

    this.antetype.registerCommand("sync2", function(o,at) {
        
    });

    this.antetype.registerCommand("async2", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    this.antetype.registerCommand("sync3", function(o,at) {
        
    });

    this.antetype.registerCommand("async3", function(o,at) {
        at.asyncCommandExecuting = true;
    });

    this.antetype.registerCommand("sync4", function(o,at) {
        
    });

    this.antetype.registerCommand("sync5", function(o,at) {
        
    });

    // Command setup
    var async1 = {command: "async1", parameters: "bar"};
    var sync1 = {command: "sync1", parameters: "bar"};
    var sync2 = {command: "sync2", parameters: "bar"};
    var async2 = {command: "async2", parameters: "bar"};
    var sync3 = {command: "sync3", parameters: "bar"};
    var async3 = {command: "async3", parameters: "bar"};
    var sync4 = {command: "sync4", parameters: "bar"};
    var sync5 = {command: "sync5", parameters: "bar"};

    // Run commands
    this.antetype.runCommand(async1);
    this.antetype.runCommand(sync1);
    this.antetype.runCommand(sync2);
    this.antetype.runCommand(async2);
    this.antetype.runCommand(sync3);
    this.antetype.runCommand(async3);
    this.antetype.runCommand(sync4);
    this.antetype.runCommand(sync5);

    // Assertions
    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();
    var done5 = assert.async();
    var done6 = assert.async();
    var done7 = assert.async();

    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 7);
        done1();
    }, 1 );
    setTimeout(() => {
        this.antetype.asyncCommandExecuting = false;
        done2();
    }, 2 );
    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 4);
        done3();
    }, 3 );
    setTimeout(() => {
        this.antetype.asyncCommandExecuting = false;
        done4();
    }, 4 );
    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 2);
        done5();
    }, 5 );
    setTimeout(() => {
        this.antetype.asyncCommandExecuting = false;
        done6();
    }, 6 );
    setTimeout(() => {
        assert.equal(this.antetype._asyncCommandQueue.length, 0);
        done7();
    }, 7 );
});

QUnit.test("unknownCommand", function(assert) {
    try {
        this.runCommand({command: "bla", parameters: {}});
        assert.ok(false);
    } catch (e) {
        assert.ok(e != null);
    }
});


QUnit.test("antetype is sealed", function(assert) {
    assert.throws( function() {
        this.antetype.blubb = 12;
    }, "should throw");
});

QUnit.test("recordCommand", function(assert) {
    this.antetype.registerCommand("nop", function(o,at) {
    });
    var commandJson = {command: "nop", parameters: {foo:"bar"}};
    this.antetype.runCommand(commandJson);
    assert.equal(this.antetype.commandsLog.length, 0);
    this.antetype.recordCommands = true;
    this.antetype.runCommand(commandJson);

    assert.equal(JSON.stringify(this.antetype.commandsLog), JSON.stringify([commandJson]));
});

QUnit.test("loadscreen event", function(assert) {
    let events= [];
    let callback = e => events.push(e) 
    this.antetype.addEventListener("foo", callback);

    this.antetype.dispatchEvent({type: "foo", preventDefault: false});
    assert.equal(events.length, 1);
    assert.equal(events[0].type, "foo");

    this.antetype.removeEventListener("foo", callback);

    this.antetype.dispatchEvent({type: "foo", preventDefault: false});
    assert.equal(events.length, 1);
    assert.equal(events[0].type, "foo");
});

QUnit.test("targetIDFromEventTarget simple text", function(assert) {
    let e = document.createElement("div");
    e.innerHTML = '<cell id="foo"><span><span>bla</span></span></cell>'
    let target = e.querySelector("#foo > span > span");
    let cellID = targetIDFromEventTarget(target);
    assert.equal(cellID, "foo");
});

QUnit.test("targetIDFromEventTarget Issue #260", function(assert) {
    let e = document.createElement("div");
    e.innerHTML = '<cell id="foo"><span><span><span style="text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff;">Schäden aus Datenaustausch und Internetnutzung</span></span></span></cell>'
    let target = e.querySelector("#foo > span > span > span");
    let cellID = targetIDFromEventTarget(target);
    assert.equal(cellID, "foo");
});

QUnit.test("intersection observer registration single observer", function(assert) {
    let observer = new GDCellIntersectionObserver();
    let cell = document.createElement("p");
    let entries = [];
    let callback = entry => {entries.push(entry)};
    let eventHandler = "foo";

    observer.observeIntersection(cell, eventHandler, callback);
    observer.executeCallBackForEntry({target:cell});
    assert.equal(entries.length, 1, "callback is called");

    observer.unobserveIntersection(cell, eventHandler);
    observer.executeCallBackForEntry({target:cell});
    assert.equal(entries.length, 1, "callback is not called if unobserve was used");
});


QUnit.test("stringFromContentEditable", function(assert) {
    let span = document.createElement("span");

    span.innerHTML = "<br><br>foo<br>";
    assert.equal(stringFromContentEditable(span), "<br><br>foo<br>");

    span.innerHTML = "foo bar<div><br></div><div>baz</div>";
    assert.equal(stringFromContentEditable(span), "foo bar<br><br>baz" );

    span.innerHTML = "<div><br></div><div><br></div>Aber hallo<div><br></div><div>foo bar</div><div><br></div><div>baz!</div>";
    assert.equal(stringFromContentEditable(span), "<br><br>Aber hallo<br><br>foo bar<br><br>baz!" );
});

QUnit.test("useNativeMouseHandling", function(assert) {
    assert.notOk (this.antetype.nativeMouseSelection);
    assert.ok( this.antetype.selectionTool instanceof GDSelectionTool);
    assert.equal( this.antetype._dragHandlers.length, 2);   // rubberband-drag-handler, draghandler
    assert.ok( this.antetype._dragHandlers[0] instanceof GDRubberbandDragHandler );
    assert.ok( this.antetype._dragHandlers[1] instanceof GDDragHandler );

    this.antetype.nativeMouseSelection = true;

    assert.ok( this.antetype.selectionTool instanceof GDNativeSelectionTool);
    assert.equal( this.antetype._dragHandlers.length, 3);   
    assert.ok( this.antetype._dragHandlers[0] instanceof GDCellDragHandler );
    assert.ok( this.antetype._dragHandlers[1] instanceof GDRubberbandDragHandler );
    assert.ok( this.antetype._dragHandlers[2] instanceof GDDragHandler );
});


// make sure we do not rebuild the properties if we dont have breakpoints
// see #1024 for an explanation
QUnit.test("changeStateOfCell without-breakoints (#1024)", function(assert) {

    let widget = GDWidget.createInstance(this.antetype.project);
    widget._hierarchy = GDWidgetRootCellDefinition.createInstance(this.antetype.project);
    widget._hierarchy._widget = widget;
    this.antetype.project.library.addWidget(widget);
    let state = GDState.createInstance(this.antetype.project);
    widget.addState(state);

    let cell = widget.createInstance();
    this.antetype.currentScreen.addComponent(cell);
    this.antetype.rebuildRenderObjects(this.antetype.currentScreen);

    let called = 0;
    this.antetype._cssGenerator = new GDCSSGenerator(); 
    this.antetype._cssGenerator.populateCellPropertiesInState =  () => ++called ;

    this.antetype.changeStateOfCell(cell, state);
    assert.equal(called,0, "not called if we do not have breakpoints");

});

// make sure we do rebuild the properties if we do have breakpoints
// see #1024 for an explanation
QUnit.test("changeStateOfCell with-breakoints (#1024)", function(assert) {
    let breakpoint = GDDesignBreakPoint.createInstance(this.project);
    breakpoint._breakPointMaxWidth = 400;
    breakpoint.breakPointName= "foo";
    this.antetype.addDesignBreakPoint(breakpoint);

    let widget = GDWidget.createInstance(this.antetype.project);
    widget._hierarchy = GDWidgetRootCellDefinition.createInstance(this.antetype.project);
    widget._hierarchy._widget = widget;
    this.antetype.project.library.addWidget(widget);
    let state = GDState.createInstance(this.antetype.project);
    widget.addState(state);

    let cell = widget.createInstance();
    this.antetype.currentScreen.addComponent(cell);
    this.antetype.rebuildRenderObjects(this.antetype.currentScreen);

    let called = 0;
    this.antetype._cssGenerator = new GDCSSGenerator(); 
    this.antetype._cssGenerator.populateCellPropertiesInState =  () => ++called ;
    this.antetype.changeStateOfCell(cell, state);
    assert.equal(called,widget.states.length, "called for every cell in every state");

});