import { GDCellDragHandler, GDTransferDragHandler, GDRubberbandDragHandler, GDFileDragHandler } from '../modules/drag-handler.js';
import { GDProject, GDWidget, GDWidgetRootCellDefinition, GDState, GDDesignBreakPoint, GDNoPainterType } from '../modules/model.js';
import { GDCellIntersectionObserver, GDNativeSelectionTool, GDNOPTool, GDRunTool, GDSelectionTool } from '../modules/tools.js';
import { stringFromContentEditable, targetIDFromEventTarget } from '../modules/utils.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { GDCSSGenerator } from '../modules/styling.js';
import { createScreenTestElement } from './test-utils.js';

// we want to test the edit-functionality, normally runsInAntetype returns
// false if it is running in the browser. To make testing easier, we pretend
// running inside Antetype:
class TestAntetypeWeb extends AntetypeWeb {
    get runsInAntetype() {
        return true;
    }
}

const { test } = QUnit;

QUnit.module("viewer", hooks => {
    /** @type {AntetypeWeb} */
    let antetype;

    hooks.beforeEach(() => {
        antetype = new TestAntetypeWeb(createScreenTestElement());
        window.Antetype = antetype;
        antetype.project = GDProject.createInstance();
        antetype.buildStyleSheet();
        antetype.currentScreen = antetype.project.createScreen();
        antetype.currentScreen.createStyleSheets();
    });

    hooks.afterEach(() => {
        antetype.project.currentLookAndFeel.cssStyleSheet.remove();
        antetype.project.currentLookAndFeel.breakPointStyleSheet.remove();
        antetype.screenElement.remove();
    });

    test("registerCommand", assert => {
        var n = 0;
        let savedAt = null;
        antetype.registerCommand("foo", function (o, at) {
            n = o;
            savedAt = at;
        });
        var json = { command: "foo", parameters: "bar" };
        antetype.runCommand(json);
        assert.equal(n, "bar");
        assert.equal(savedAt, antetype);
    });

    test("asyncSync_asyncCommandExecuting", assert => {
        // Command definition
        antetype.registerCommand("async1", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        antetype.registerCommand("async2", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        antetype.registerCommand("sync1", function (o, at) {

        });

        antetype.registerCommand("sync2", function (o, at) {

        });

        antetype.registerCommand("sync3", function (o, at) {

        });

        // Command setup
        var async1 = { command: "async1", parameters: "bar" };
        var async2 = { command: "async2", parameters: "bar" };
        var sync1 = { command: "sync1", parameters: "bar" };
        var sync2 = { command: "sync2", parameters: "bar" };
        var sync3 = { command: "sync3", parameters: "bar" };

        // Run commands
        antetype.runCommand(async1);
        antetype.runCommand(async2);
        antetype.runCommand(sync1);
        antetype.runCommand(sync2);
        antetype.runCommand(sync3);

        // Assertions
        var done1 = assert.async();
        var done2 = assert.async();
        var done3 = assert.async();
        var done4 = assert.async();
        var done5 = assert.async();

        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 4);
            done1();
        }, 1);
        setTimeout(() => {
            antetype.asyncCommandExecuting = false;
            done2();
        }, 2);
        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 3);
            done3();
        }, 3);
        setTimeout(() => {
            antetype.asyncCommandExecuting = false;
            done4();
        }, 4);
        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 0);
            done5();
        }, 5);
    });

    test("syncAsync_asyncCommandExecuting", assert => {
        // Command definition

        antetype.registerCommand("sync1", function (o, at) {

        });

        antetype.registerCommand("sync2", function (o, at) {

        });

        antetype.registerCommand("sync3", function (o, at) {

        });

        antetype.registerCommand("async1", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        antetype.registerCommand("async2", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        // Command setup
        var async1 = { command: "async1", parameters: "bar" };
        var async2 = { command: "async2", parameters: "bar" };
        var sync1 = { command: "sync1", parameters: "bar" };
        var sync2 = { command: "sync1", parameters: "bar" };
        var sync3 = { command: "sync1", parameters: "bar" };

        // Run commands
        antetype.runCommand(sync1);
        antetype.runCommand(sync2);
        antetype.runCommand(sync3);
        antetype.runCommand(async1);
        antetype.runCommand(async2);

        // Assertions
        var done1 = assert.async();
        var done2 = assert.async();
        var done3 = assert.async();

        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 1);
            done1();
        }, 1);
        setTimeout(() => {
            antetype.asyncCommandExecuting = false;
            done2();
        }, 2);
        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 0);
            done3();
        }, 3);
    });

    test("randomOrder_asyncCommandExecuting", assert => {
        // Command definition
        antetype.registerCommand("async1", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        antetype.registerCommand("sync1", function (o, at) {

        });

        antetype.registerCommand("sync2", function (o, at) {

        });

        antetype.registerCommand("async2", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        antetype.registerCommand("sync3", function (o, at) {

        });

        antetype.registerCommand("async3", function (o, at) {
            at.asyncCommandExecuting = true;
        });

        antetype.registerCommand("sync4", function (o, at) {

        });

        antetype.registerCommand("sync5", function (o, at) {

        });

        // Command setup
        var async1 = { command: "async1", parameters: "bar" };
        var sync1 = { command: "sync1", parameters: "bar" };
        var sync2 = { command: "sync2", parameters: "bar" };
        var async2 = { command: "async2", parameters: "bar" };
        var sync3 = { command: "sync3", parameters: "bar" };
        var async3 = { command: "async3", parameters: "bar" };
        var sync4 = { command: "sync4", parameters: "bar" };
        var sync5 = { command: "sync5", parameters: "bar" };

        // Run commands
        antetype.runCommand(async1);
        antetype.runCommand(sync1);
        antetype.runCommand(sync2);
        antetype.runCommand(async2);
        antetype.runCommand(sync3);
        antetype.runCommand(async3);
        antetype.runCommand(sync4);
        antetype.runCommand(sync5);

        // Assertions
        var done1 = assert.async();
        var done2 = assert.async();
        var done3 = assert.async();
        var done4 = assert.async();
        var done5 = assert.async();
        var done6 = assert.async();
        var done7 = assert.async();

        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 7);
            done1();
        }, 1);
        setTimeout(() => {
            antetype.asyncCommandExecuting = false;
            done2();
        }, 2);
        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 4);
            done3();
        }, 3);
        setTimeout(() => {
            antetype.asyncCommandExecuting = false;
            done4();
        }, 4);
        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 2);
            done5();
        }, 5);
        setTimeout(() => {
            antetype.asyncCommandExecuting = false;
            done6();
        }, 6);
        setTimeout(() => {
            assert.equal(antetype._asyncCommandQueue.length, 0);
            done7();
        }, 7);
    });

    test("unknownCommand", assert => {
        try {
            runCommand({ command: "bla", parameters: {} });
            assert.ok(false);
        } catch (e) {
            assert.ok(e != null);
        }
    });


    test("antetype is sealed", assert => {
        assert.throws(function () {
            antetype.blubb = 12;
        }, "should throw");
    });

    test("recordCommand", assert => {
        antetype.registerCommand("nop", function (o, at) {
        });
        var commandJson = { command: "nop", parameters: { foo: "bar" } };
        antetype.runCommand(commandJson);
        assert.equal(antetype.commandsLog.length, 0);
        antetype.recordCommands = true;
        antetype.runCommand(commandJson);

        assert.equal(JSON.stringify(antetype.commandsLog), JSON.stringify([commandJson]));
    });

    test("loadscreen event", assert => {
        let events = [];
        let callback = e => events.push(e)
        antetype.addEventListener("foo", callback);

        antetype.dispatchEvent({ type: "foo", preventDefault: false });
        assert.equal(events.length, 1);
        assert.equal(events[0].type, "foo");

        antetype.removeEventListener("foo", callback);

        antetype.dispatchEvent({ type: "foo", preventDefault: false });
        assert.equal(events.length, 1);
        assert.equal(events[0].type, "foo");
    });

    test("targetIDFromEventTarget simple text", assert => {
        let e = document.createElement("div");
        e.innerHTML = '<cell id="foo"><span><span>bla</span></span></cell>'
        let target = e.querySelector("#foo > span > span");
        let cellID = targetIDFromEventTarget(target);
        assert.equal(cellID, "foo");
    });

    test("targetIDFromEventTarget Issue #260", assert => {
        let e = document.createElement("div");
        e.innerHTML = '<cell id="foo"><span><span><span style="text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff;">Schäden aus Datenaustausch und Internetnutzung</span></span></span></cell>'
        let target = e.querySelector("#foo > span > span > span");
        let cellID = targetIDFromEventTarget(target);
        assert.equal(cellID, "foo");
    });

    test("intersection observer registration single observer", assert => {
        let observer = new GDCellIntersectionObserver();
        let cell = document.createElement("p");
        let entries = [];
        let callback = entry => { entries.push(entry) };
        let eventHandler = "foo";

        observer.observeIntersection(cell, eventHandler, callback);
        observer.executeCallBackForEntry({ target: cell });
        assert.equal(entries.length, 1, "callback is called");

        observer.unobserveIntersection(cell, eventHandler);
        observer.executeCallBackForEntry({ target: cell });
        assert.equal(entries.length, 1, "callback is not called if unobserve was used");
    });


    test("stringFromContentEditable", assert => {
        let span = document.createElement("span");

        span.innerHTML = "<br><br>foo<br>";
        assert.equal(stringFromContentEditable(span), "<br><br>foo<br>");

        span.innerHTML = "foo bar<div><br></div><div>baz</div>";
        assert.equal(stringFromContentEditable(span), "foo bar<br><br>baz");

        span.innerHTML = "<div><br></div><div><br></div>Aber hallo<div><br></div><div>foo bar</div><div><br></div><div>baz!</div>";
        assert.equal(stringFromContentEditable(span), "<br><br>Aber hallo<br><br>foo bar<br><br>baz!");
    });

    test("useNativeMouseHandling", assert => {
        assert.notOk(antetype.nativeMouseSelection);
        assert.ok(antetype.selectionTool instanceof GDSelectionTool);
        assert.equal(antetype._dragHandlers.length, 2);   // rubberband-drag-handler, draghandler
        assert.ok(antetype._dragHandlers[0] instanceof GDRubberbandDragHandler);
        assert.ok(antetype._dragHandlers[1] instanceof GDTransferDragHandler);

        antetype.nativeMouseSelection = true;

        assert.ok(antetype.selectionTool instanceof GDNativeSelectionTool);
        assert.equal(antetype._dragHandlers.length, 3);
        assert.ok(antetype._dragHandlers[0] instanceof GDCellDragHandler);
        assert.ok(antetype._dragHandlers[1] instanceof GDRubberbandDragHandler);
        assert.ok(antetype._dragHandlers[2] instanceof GDFileDragHandler);
    });


    // make sure we do not rebuild the properties if we dont have breakpoints
    // see #1024 for an explanation
    test("changeStateOfCell without-breakoints (#1024)", assert => {

        let widget = GDWidget.createInstance(antetype.project);
        widget._hierarchy = GDWidgetRootCellDefinition.createInstance(antetype.project);
        widget._hierarchy._widget = widget;
        antetype.project.library.addWidget(widget);
        let state = GDState.createInstance(antetype.project);
        widget.addState(state);

        let cell = widget.createInstance();
        antetype.currentScreen.addComponent(cell);
        antetype.rebuildRenderObjects(antetype.currentScreen);

        let called = 0;
        antetype._cssGenerator = new GDCSSGenerator();
        antetype._cssGenerator.populateCellPropertiesInState = () => ++called;

        antetype.changeStateOfCell(cell, state);
        assert.equal(called, 0, "not called if we do not have breakpoints");

    });

    // make sure we do rebuild the properties if we do have breakpoints
    // see #1024 for an explanation
    test("changeStateOfCell with-breakoints (#1024)", assert => {
        let breakpoint = GDDesignBreakPoint.createInstance(antetype.project);
        breakpoint._breakPointMaxWidth = 400;
        breakpoint.breakPointName = "foo";
        antetype.addDesignBreakPoint(breakpoint);

        let widget = GDWidget.createInstance(antetype.project);
        widget._hierarchy = GDWidgetRootCellDefinition.createInstance(antetype.project);
        widget._hierarchy._widget = widget;
        antetype.project.library.addWidget(widget);
        let state = GDState.createInstance(antetype.project);
        widget.addState(state);

        let cell = widget.createInstance();
        antetype.currentScreen.addComponent(cell);
        antetype.rebuildRenderObjects(antetype.currentScreen);

        let called = 0;
        antetype._cssGenerator = new GDCSSGenerator();
        antetype._cssGenerator.populateCellPropertiesInState = () => ++called;
        antetype.changeStateOfCell(cell, state);
        assert.equal(called, widget.states.length, "called for every cell in every state");

    });

    test("currentZoom sets css-variable", assert => {
        assert.equal(antetype.currentZoom, 1, "starts with 1");
        assert.equal(window.getComputedStyle(document.body).getPropertyValue("--current-zoom"), 1, "css variable is set");

        antetype.currentZoom = 1.4;
        assert.equal(window.getComputedStyle(document.body).getPropertyValue("--current-zoom"), 1.4, "css variable is updated");
    });

    test("rebuildRenderObjectsForFigures and selection/handles (Issue #268)", assert => {
        // setup the screen with one cell:
        const cell = antetype.project.createBasicCellWithBounds(1, 2, 20, 30);
        antetype.currentScreen.addComponent(cell);
        antetype.rebuildRenderObjects(antetype.currentScreen);

        // rebuild rebuilds the cell, so get the newly build one:
        const newCell = antetype.currentScreen.orderedComponents[0];
        antetype.selectFigures([newCell]);

        assert.equal(antetype._highlightDivs.length, 1, "we have one highlightDiv");
        const highlightRect = antetype._highlightDivs[0].getBoundingClientRect();
        const domElementRect = newCell.DOMElement.getBoundingClientRect();
        assert.propEqual(highlightRect, domElementRect, "bounds of highlight div are right");

        // now rebuild the cell:
        antetype.rebuildRenderObjectsForFigures([newCell]);
        const highlightRect2 = antetype._highlightDivs[0].getBoundingClientRect();
        assert.equal(antetype._highlightDivs.length, 1, "we have still one highlightDiv");
        assert.propEqual(highlightRect2, domElementRect, "bounds of highlight div are right");
    });

    test("disable/enable selection", assert => {
        antetype.disableSelectionOnCanvas();
        assert.ok(antetype.currentTool instanceof GDNOPTool, "no-operation tool is active");
        antetype.enableSelectionOnCanvas();
        assert.ok(antetype.currentTool instanceof GDSelectionTool, "selection tool is active");
    });

    test("disable/enable selection ipp", assert => {
        antetype.setCurrentTool(antetype.runTool);
        antetype.disableSelectionOnCanvas();
        assert.ok(antetype.currentTool instanceof GDRunTool, "does not change if run tool is active");
        antetype.enableSelectionOnCanvas();
        assert.ok(antetype.currentTool instanceof GDRunTool, "dont change selection in ipp");
    });

    test("disable/enable selection ipp is entered after disable", assert => {
        antetype.disableSelectionOnCanvas();
        antetype.setCurrentTool(antetype.runTool);
        antetype.enableSelectionOnCanvas();
        assert.ok(antetype.currentTool instanceof GDRunTool, "keep the run tool");
    });


});

