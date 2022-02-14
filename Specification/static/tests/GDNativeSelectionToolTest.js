import { GDFixedLayoutPolicyCode, GDHorizontalBoxLayoutPolicyCode, GDVerticalBoxLayoutPolicyCode, GDAlignmentLayoutPolicyCode, GDWidget, GDWidgetCellDefinition, GDWidgetRootCellDefinition } from '../modules/model.js';
import { GDNativeFigureDragTool, GDNativeHandleDragTool, GDNativeSelectionTool, GDNativeSelectionRectTool, GDNativeTextTool, GDTextTool } from '../modules/tools.js';
import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';

const { test } = QUnit;

QUnit.module("native selection tool", hooks => {
    let at, tool, project, cell, screen, widget, commands;

    hooks.beforeEach(() => {
        at = buildAntetypeWithScreen();

        tool = new GDNativeSelectionTool(at);
        project = at.project;

        cell = at.project.createBasicCellWithBounds(10, 10, 10, 10);
        screen = at.currentScreen;
        screen.addComponent(cell);
        screen.setValueForKeyInStateWithIdentifier(GDFixedLayoutPolicyCode, "layoutPolicyCode", screen.activeStateIdentifier);
        at.rebuildRenderObjects(screen);

        let rootDefinition = GDWidgetRootCellDefinition.createInstance(project);
        let innerDefinition = GDWidgetCellDefinition.createInstance(project);
        rootDefinition.addComponent(innerDefinition);
        widget = GDWidget.createInstance(project);
        widget._hierarchy = rootDefinition;
        rootDefinition._widget = widget;

        at.nativeMouseSelection = true;

        at.setCurrentTool(tool);

        // normally this is sent to the application, here we just store all commands 
        // and can check if the right commands would be send.
        commands = [];
        at._communication = { sendCommand: (name, p) => commands.push({ 'command': name, 'parameters': p }) };
    });

    hooks.afterEach(() => {
        cleanupAntetypeWithScreen(at);
    });


    test("mosue drag on free layout starts drag-tool", assert => {
        at.selectFigures([cell]);
        tool.mouseDown({ target: cell.DOMElement });
        tool.mouseDragged({ target: cell.DOMElement });

        assert.ok(at.currentTool instanceof GDNativeFigureDragTool);
    });

    test("mouse drag on screen starts selection rect", assert => {
        tool.mouseDown({ target: screen.DOMElement });
        tool.mouseDragged({ target: screen.DOMElement });

        assert.ok(at.currentTool instanceof GDNativeSelectionRectTool);
    });


    test("test selection", assert => {
        tool.mouseDown({ target: cell.DOMElement });
        tool.mouseUp({ target: cell.DOMElement });

        assert.equal(commands[0].command, "select", "a select command");
        assert.equal(commands[0].parameters.cellIdentifiers.length, 1, "one cell selected");
        assert.equal(commands[0].parameters.cellIdentifiers[0], cell.objectID, "cell identifier is transferred");
    });

    test("figureToSelectForFigure", assert => {
        assert.equal(tool.figureToSelectForFigure(cell), cell, "basic cell: select the cell");

        let instance = widget.createInstance(project);
        screen.addComponent(instance);
        at.rebuildRenderObjects(screen);

        let selectedCell = tool.figureToSelectForFigure(instance.orderedComponents[0]);
        assert.equal(selectedCell, instance, "inner cell: select root cell");

        at.selectFigures([instance]);

        selectedCell = tool.figureToSelectForFigure(instance.orderedComponents[0]);
        assert.equal(selectedCell, instance.orderedComponents[0], "if instance is already selected: select inner cell");
    });

    test("selectOnMouseUp", assert => {
        assert.notOk(tool.selectOnMouseUp(cell));

        let instance = widget.createInstance(project);
        screen.addComponent(instance);
        at.rebuildRenderObjects(screen);
        assert.notOk(tool.selectOnMouseUp(instance.orderedComponents[0]), "select directly");

        at.selectFigures([instance]);
        assert.ok(tool.selectOnMouseUp(instance.orderedComponents[0]), "select on mouse up since parent is already selected");
    });

    test("handles", assert => {
        tool.mouseDown({ target: cell.DOMElement });
        tool.mouseUp({ target: cell.DOMElement });

        assert.equal(at.handles.length, 8, "8 handles");
        at.handles.forEach(h => {
            assert.notOk(h.DOMElement == undefined, "handle has DOM element");
            assert.notOk(h.DOMElement.parentElement == undefined);
        });
    });

    test("handle drag tool", assert => {
        at.selectFigures([cell]);
        const handle = at.handles[0];

        tool.mouseDown({ target: handle.DOMElement });
        assert.ok(at.currentTool instanceof GDNativeHandleDragTool);
    });


    test("testKeyDownDelete", assert => {
        let preventDefaultCalled = false;
        let preventDefaultFun = () => preventDefaultCalled = true;

        at.selectFigures([cell]);

        tool.keyDown({ key: "Delete", preventDefault: preventDefaultFun });
        assert.equal(commands[0].command, "deleteSelection");
        assert.ok(preventDefaultCalled);
        preventDefaultCalled = false;

        tool.keyDown({ key: "Backspace", preventDefault: preventDefaultFun });
        assert.equal(commands[1].command, "deleteSelection");
        assert.ok(preventDefaultCalled);
    });

    test("tabKey", assert => {
        let otherCell = at.project.createBasicCellWithBounds(10, 10, 10, 10);
        screen.addComponent(otherCell);
        at.rebuildRenderObjects(screen);

        at.selectFigures([cell]);

        let preventDefaultCalled = false;
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({
            key: "Tab",
            preventDefault: preventDefaultFun,
            shiftKey: false
        });
        assert.equal(at.selectedFigures[0].objectID, otherCell.objectID);
        assert.equal(commands[0].command, "select", "select command");
        assert.equal(commands[0].parameters.cellIdentifiers[0], otherCell.objectID);
        assert.equal(commands[0].parameters.cellIdentifiers.length, 1);

        assert.ok(preventDefaultCalled);

        tool.keyDown({
            key: "Tab",
            preventDefault: preventDefaultFun,
            shiftKey: true
        });
        assert.equal(at.selectedFigures[0].objectID, cell.objectID);
        assert.equal(commands[1].command, "select", "select command");
        assert.equal(commands[1].parameters.cellIdentifiers[0], cell.objectID);
        assert.equal(commands[1].parameters.cellIdentifiers.length, 1);
        assert.ok(preventDefaultCalled);
    });

    test("up/down arrow", assert => {
        let otherCell = at.project.createBasicCellWithBounds(10, 10, 10, 10);
        cell.addComponent(otherCell);
        at.rebuildRenderObjects(screen);

        at.selectFigures([cell]);

        let preventDefaultCalled = false;
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({
            key: "ArrowDown",
            preventDefault: preventDefaultFun,
            metaKey: true
        });

        assert.equal(at.selectedFigures[0].objectID, otherCell.objectID);
        assert.equal(commands[0].command, "select", "select command");
        assert.equal(commands[0].parameters.cellIdentifiers[0], otherCell.objectID);
        assert.equal(commands[0].parameters.cellIdentifiers.length, 1);

        assert.ok(preventDefaultCalled);

        preventDefaultCalled = false;
        tool.keyDown({
            key: "ArrowUp",
            preventDefault: preventDefaultFun,
            metaKey: true
        });

        assert.equal(at.selectedFigures[0].objectID, cell.objectID);
        assert.equal(commands[1].command, "select", "select command");
        assert.equal(commands[1].parameters.cellIdentifiers[0], cell.objectID);
        assert.equal(commands[1].parameters.cellIdentifiers.length, 1);


        assert.ok(preventDefaultCalled);
    });

    test("double click on non-text-cell", assert => {
        tool.mouseDown({ target: cell.DOMElement });
        tool.mouseUp({ target: cell.DOMElement });
        tool.mouseDoubleClick({ target: cell.DOMElement });

        assert.ok(at.currentTool instanceof GDNativeSelectionTool, "selection tool still active");
        assert.equal(at.selectedObjects.length, 1);
        assert.equal(at.selectedObjects[0], cell);
    });

    test("double click on text-cell", assert => {
        cell.setProperty("textString", "foo");     // add a text content to the cell
        tool.mouseDown({ target: cell.DOMElement });
        tool.mouseUp({ target: cell.DOMElement });
        tool.mouseDoubleClick({ target: cell.DOMElement });

        assert.ok(at.currentTool instanceof GDNativeTextTool, "switched to text tool");
        assert.equal(at.selectedObjects.length, 1);
        assert.equal(at.selectedObjects[0], cell);
    });

    test("enter on text cell starts editing", assert => {
        cell.setProperty("textString", "foo");     // add a text content to the cell
        at.selectFigures([cell]);
        let preventDefaultCalled = false;
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({
            key: "Enter",
            preventDefault: preventDefaultFun,
            metaKey: true
        });

        assert.ok(at.currentTool instanceof GDNativeTextTool, "switched to text tool");
        assert.ok(preventDefaultCalled);
        assert.equal(at.selectedObjects.length, 1);
        assert.equal(at.selectedObjects[0], cell);
    });


    test("enter does nothing if cell does not contain text", assert => {
        cell.setProperty("textString", "");     // cell without text
        at.selectFigures([cell]);
        let preventDefaultCalled = false;
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({
            key: "Enter",
            preventDefault: preventDefaultFun,
            metaKey: true
        });

        assert.ok(at.currentTool instanceof GDNativeSelectionTool, "selection tool still active");
        assert.ok(preventDefaultCalled);
        assert.equal(at.selectedObjects.length, 1);
        assert.equal(at.selectedObjects[0], cell);
    });


    test("editTextOfFigure does nothing if text tool is active", assert => {
        cell.setProperty("textString", "foo");

        at.editTextOfFigure(cell);

        assert.ok(at.currentTool instanceof GDTextTool, "text tool is active");
        assert.equal(commands.length, 1, "one command sent");

        at.editTextOfFigure(cell);

        assert.ok(at.currentTool instanceof GDTextTool, "text tool is still active");
        assert.equal(commands.length, 1, "still one command sent");
    });

    test("double click in non-selected text cell selects the cell", assert => {
        cell.setProperty("textString", "foo");     // add a text content to the cell
        tool.mouseDoubleClick({ target: cell.DOMElement });

        assert.ok(at.currentTool instanceof GDNativeTextTool, "switched to text tool");
        assert.equal(at.selectedObjects.length, 1);
        assert.equal(at.selectedObjects[0], cell);
        assert.equal(commands.length, 2);
        assert.equal(commands[0].command, "select");
        assert.equal(commands[0].parameters.cellIdentifiers[0], cell.objectID);
        assert.equal(commands[1].command, "editTextOfFigure");
        assert.equal(commands[1].parameters.cellID, cell.objectID);
    });

    test("selectionIsKeyboardMovable", assert => {
        assert.notOk(tool.isKeyboardMovable, "empty selection");
        at.selectFigures([cell]);
        assert.ok(tool.isKeyboardMovable, "cell is selected");
        cell.setProperty("isMovable", false);
        assert.notOk(tool.isKeyboardMovable, "cell is not movable");

        cell.setProperty("isMovable", true);
        cell.container.setProperty("layoutPolicyCode", GDHorizontalBoxLayoutPolicyCode);
        assert.notOk(tool.isKeyboardMovable, "only in fix layout");
        cell.container.setProperty("layoutPolicyCode", GDVerticalBoxLayoutPolicyCode);
        assert.notOk(tool.isKeyboardMovable, "only in fix layout");
        cell.container.setProperty("layoutPolicyCode", GDAlignmentLayoutPolicyCode);
        assert.notOk(tool.isKeyboardMovable, "only in fix layout");
    })

    test("keyboard movement in free layout ArrowDown", assert => {
        at.selectFigures([cell]);
        let preventDefaultCalled = false;
        const element = cell.DOMElement;
        const oldLocation = parseInt(getComputedStyle(element).top);
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({ key: "ArrowDown", preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).top), oldLocation + 1);
        tool.keyDown({ key: "ArrowDown", shiftKey: true, preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).top), oldLocation + 11);

        assert.equal(commands.length, 0, "command only on mouseUp");

        assert.ok(preventDefaultCalled);
        tool.keyUp({ key: "ArrowDown", preventDefault: preventDefaultFun });
        assert.equal(commands.length, 1, "command sent");
        assert.equal(commands[0].command, "moveFigures");
        assert.equal(commands[0].parameters.deltaX, 0);
        assert.equal(commands[0].parameters.deltaY, 11);
    });

    test("keyboard movement in free layout ArrowUp", assert => {
        at.selectFigures([cell]);
        let preventDefaultCalled = false;
        const element = cell.DOMElement;

        const oldLocation = parseInt(getComputedStyle(element).top);
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({ key: "ArrowUp", preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).top), oldLocation - 1);
        tool.keyDown({ key: "ArrowUp", shiftKey: true, preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).top), oldLocation - 11);

        assert.equal(commands.length, 0, "command only on mouseUp");

        assert.ok(preventDefaultCalled);
        tool.keyUp({ key: "ArrowUp", preventDefault: preventDefaultFun });
        assert.equal(commands.length, 1, "command sent");
        assert.equal(commands[0].command, "moveFigures");
        assert.equal(commands[0].parameters.deltaX, 0);
        assert.equal(commands[0].parameters.deltaY, -11);
    });

    test("keyboard movement in free layout ArrowLeft", assert => {
        at.selectFigures([cell]);
        let preventDefaultCalled = false;
        const element = cell.DOMElement;

        const oldLocation = parseInt(getComputedStyle(element).left);
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({ key: "ArrowLeft", preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).left), oldLocation - 1);
        tool.keyDown({ key: "ArrowLeft", shiftKey: true, preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).left), oldLocation - 11);

        assert.equal(commands.length, 0, "command only on mouseUp");

        assert.ok(preventDefaultCalled);
        tool.keyUp({ key: "ArrowLeft", preventDefault: preventDefaultFun });
        assert.equal(commands.length, 1, "command sent");
        assert.equal(commands[0].command, "moveFigures");
        assert.equal(commands[0].parameters.deltaX, -11);
        assert.equal(commands[0].parameters.deltaY, 0);
    });

    test("keyboard movement in free layout ArrowRight", assert => {
        at.selectFigures([cell]);
        let preventDefaultCalled = false;
        const element = cell.DOMElement;

        const oldLocation = parseInt(getComputedStyle(element).left);
        let preventDefaultFun = () => preventDefaultCalled = true;

        tool.keyDown({ key: "ArrowRight", preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).left), oldLocation + 1);
        tool.keyDown({ key: "ArrowRight", shiftKey: true, preventDefault: preventDefaultFun });
        assert.equal(parseInt(getComputedStyle(element).left), oldLocation + 11);

        assert.equal(commands.length, 0, "command only on mouseUp");

        assert.ok(preventDefaultCalled);
        tool.keyUp({ key: "ArrowRight", preventDefault: preventDefaultFun });
        assert.equal(commands.length, 1, "command sent");
        assert.equal(commands[0].command, "moveFigures");
        assert.equal(commands[0].parameters.deltaX, 11);
        assert.equal(commands[0].parameters.deltaY, 0);
    });

    test("selection tool on drag on screen", assert => {
        at.currentTool.mouseDown({ target: screen.DOMElement });
        assert.ok(at.currentTool instanceof GDNativeSelectionTool, "still selection tool");
        at.currentTool.mouseDragged({ target: screen.DOMElement });
        assert.ok(at.currentTool instanceof GDNativeSelectionRectTool, "selection rect tool on drag");
        at.currentTool.mouseUp();
        assert.ok(at.currentTool instanceof GDNativeSelectionTool, "back to selection tool on mouseup");
    });
});
