import { buildAntetypeWithScreen, cleanupAntetypeWithScreen } from './test-utils.js';
import { GDNativeSelectionTool, GDNativeFigureDragTool, GDNativeHandleDragTool } from '../modules/tools.js';
import {
    GDFixedLayoutPolicyCode,
    GDHorizontalBoxLayoutPolicyCode,
    GDVerticalBoxLayoutPolicyCode,
    GDAlignmentLayoutPolicyCode,
    GDLeftAlignment,
    GDCenterAlignment,
    GDRightAlignment,
    GDTopAlignment,
    GDBottomAlignment
} from '../modules/model.js';
import { globalBoundsOfElement } from '../modules/utils.js';

const { test } = QUnit;

QUnit.module("native handle drag tool", hooks => {
    let at, tool, cell, screen;

    hooks.beforeEach(() => {
        at = buildAntetypeWithScreen();
        tool = new GDNativeSelectionTool(at);

        cell = at.project.createBasicCellWithBounds(10, 10, 100, 100);
        screen = at.currentScreen;
        at.cellInsertComponent(screen, cell, 0);

        screen.setProperty("layoutPolicyCode", GDFixedLayoutPolicyCode);

        at.nativeMouseSelection = true;

        at.setCurrentTool(tool);
    });

    hooks.afterEach(() => {
        cleanupAntetypeWithScreen(at);
    });

    test("drag right-center without guides", assert => {
        at.selectFigures([cell]);
        const topRightHandle = at.handles.find(h => h.path == "rightCenter");
        const handleBounds = globalBoundsOfElement(topRightHandle.DOMElement);
        const x = handleBounds.left;
        const y = handleBounds.top;
        const oldWidth = cell.getProperty("width");
        at.currentTool.mouseDown({ target: topRightHandle.DOMElement, clientX: x, clientY: y });

        const deltaX = 5;
        at.currentTool.mouseDragged({ clientX: x + deltaX, clientY: y });

        assert.equal(cell.getProperty("width"), oldWidth - deltaX + 2, "width changed");
        assert.equal(cell.getProperty("x"), 10, "x changed too");
    });

    test("drag left-center without guides", assert => {
        at.selectFigures([cell]);
        const leftCenterHandle = at.handles.find(h => h.path == "leftCenter");
        const handleBounds = globalBoundsOfElement(leftCenterHandle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;
        const oldWidth = cell.getProperty("width");
        at.currentTool.mouseDown({ target: leftCenterHandle.DOMElement, clientX: x, clientY: y });
        console.log(cell.getProperty("x"), 'x position');
        const deltaX = 5;
        at.currentTool.mouseDragged({ clientX: x + deltaX, clientY: y });

        assert.equal(cell.getProperty("width"), oldWidth - deltaX + 2, "width changed");
        assert.equal(cell.getProperty("x"), 13, "x changed too");
    });

    test("drag top-left without guides", assert => {
        at.selectFigures([cell]);
        const topRightHandle = at.handles.find(h => h.path == "topLeft");
        const handleBounds = globalBoundsOfElement(topRightHandle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;
        const oldHeight = cell.getProperty("height");
        const oldWidth = cell.getProperty("width");
        at.currentTool.mouseDown({ target: topRightHandle.DOMElement, clientX: x, clientY: y });

        const deltaY = 5;
        const deltaX = 5;
        at.currentTool.mouseDragged({ clientX: x + deltaX, clientY: y - deltaY });

        assert.equal(cell.getProperty("height"), oldHeight + deltaY, "height changed");
        assert.equal(cell.getProperty("y"), 5, "y changed too");
        assert.equal(cell.getProperty("width"), oldWidth - deltaX + 2, "width changed");
        assert.equal(cell.getProperty("x"), 13, "x changed too");
    });

    test("drag bottom-left without guides", assert => {
        at.selectFigures([cell]);
        const bottomLeftHandle = at.handles.find(h => h.path == "bottomLeft");
        const handleBounds = globalBoundsOfElement(bottomLeftHandle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;
        const oldHeight = cell.getProperty("height");
        const oldWidth = cell.getProperty("width");
        at.currentTool.mouseDown({ target: bottomLeftHandle.DOMElement, clientX: x, clientY: y });
        console.log(handleBounds);

        const deltaY = 5;
        const deltaX = 5;
        at.currentTool.mouseDragged({ clientX: x + deltaX, clientY: y + deltaY });

        assert.equal(cell.getProperty("height"), oldHeight + deltaY, "height changed");
        assert.equal(cell.getProperty("y"), 10, "y changed too");
        assert.equal(cell.getProperty("width"), oldWidth - deltaX + 2, "width changed");
        assert.equal(cell.getProperty("x"), 13, "x changed too");
    });

    test("drag top-center without guides", assert => {
        at.selectFigures([cell]);
        const topCenterHandle = at.handles.find(h => h.path == "topCenter");
        const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;
        const oldHeight = cell.getProperty("height");
        at.currentTool.mouseDown({ target: topCenterHandle.DOMElement, clientX: x, clientY: y });

        const deltaY = 5;
        at.currentTool.mouseDragged({ clientX: x, clientY: y - deltaY });

        assert.equal(cell.getProperty("height"), oldHeight + deltaY, "height changed");
        assert.equal(cell.getProperty("y"), 5, "y changed too");
    });

    test("drag top-center with guides", assert => {
        const otherCell = at.project.createBasicCellWithBounds(110, 120, 10, 10);
        at.cellInsertComponent(screen, otherCell, screen.orderedComponents.length);

        at.selectFigures([otherCell]);
        const topCenterHandle = at.handles.find(h => h.path == "topCenter");
        const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;

        at.currentTool.mouseDown({ target: topCenterHandle.DOMElement, clientX: x, clientY: y });

        const cellBounds = globalBoundsOfElement(cell.DOMElement);
        const cellBottomY = cellBounds.top + cellBounds.height;

        at.currentTool.mouseDragged({ clientX: x, clientY: cellBottomY + 2 });

        assert.equal(otherCell.getProperty("y"), cellBottomY + 3, "snapped to guide");
    });



    test("drag top-right without guides", function (assert) {
        at.selectFigures([cell]);
        const topRightHandle = at.handles.find(h => h.path == "topRight");
        const handleBounds = globalBoundsOfElement(topRightHandle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;
        const oldHeight = cell.getProperty("height");
        const oldWidth = cell.getProperty("width");
        at.currentTool.mouseDown({ target: topRightHandle.DOMElement, clientX: x, clientY: y });

        const deltaY = 5;
        const deltaX = 5;
        at.currentTool.mouseDragged({ clientX: x + deltaX, clientY: y - deltaY });

        assert.equal(cell.getProperty("height"), oldHeight + deltaY, "height changed");
        assert.equal(cell.getProperty("y"), 5, "y changed too");
        assert.equal(cell.getProperty("width"), oldWidth + deltaX, "width changed");
        assert.equal(cell.getProperty("x"), 10, "x changed too");
    });


    test("drag top-right without guides", assert => {
        at.selectFigures([cell]);
        const topRightHandle = at.handles.find(h => h.path == "topRight");
        const handleBounds = globalBoundsOfElement(topRightHandle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;
        const oldHeight = cell.getProperty("height");
        const oldWidth = cell.getProperty("width");
        at.currentTool.mouseDown({ target: topRightHandle.DOMElement, clientX: x, clientY: y });

        const deltaY = 5;
        const deltaX = 5;
        at.currentTool.mouseDragged({ clientX: x + deltaX, clientY: y - deltaY });

        assert.equal(cell.getProperty("height"), oldHeight + deltaY, "height changed");
        assert.equal(cell.getProperty("y"), 5, "y changed too");
        assert.equal(cell.getProperty("width"), oldWidth + deltaX, "width changed");
        assert.equal(cell.getProperty("x"), 10, "x changed too");
    });

    test("snapping verticle guides", assert => {
        const otherCell = at.project.createBasicCellWithBounds(120, 120, 30, 30);
        at.cellInsertComponent(screen, otherCell, screen.orderedComponents.length);

        at.selectFigures([otherCell]);
        const leftCenterHandle = at.handles.find(h => h.path == "leftCenter");
        const handleBounds = globalBoundsOfElement(leftCenterHandle.DOMElement);

        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;

        at.currentTool.mouseDown({ target: leftCenterHandle.DOMElement, clientX: x, clientY: y });

        const cellBounds = globalBoundsOfElement(cell.DOMElement);
        console.log(cellBounds);
        const cellBottomY = cellBounds.top + cellBounds.height;

        at.currentTool.mouseDragged({ clientX: x-8, clientY: 0 });

        assert.equal(otherCell.getProperty("x"), cellBounds.left + cellBounds.width, "snapped to guide");

        const updatedHandleBounds = globalBoundsOfElement(leftCenterHandle.DOMElement);
        const updatedX = updatedHandleBounds.left + 1;
        const updatedY = updatedHandleBounds.top + 1;
        at.currentTool.mouseDown({ target: leftCenterHandle.DOMElement, clientX: updatedX, clientY: updatedY });
        at.currentTool.mouseDragged({ clientX: updatedX-98, clientY: 0 });
        assert.equal(otherCell.getProperty("x"), cellBounds.left, "snapped to guide of other side");

    });

    test("drag top-right with guides", assert => {
        const otherCell = at.project.createBasicCellWithBounds(110, 120, 10, 10);
        at.cellInsertComponent(screen, otherCell, screen.orderedComponents.length);

        at.selectFigures([otherCell]);
        const topCenterHandle = at.handles.find(h => h.path == "topRight");
        const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;

        at.currentTool.mouseDown({ target: topCenterHandle.DOMElement, clientX: x, clientY: y });

        const cellBounds = globalBoundsOfElement(cell.DOMElement);
        const cellBottomY = cellBounds.top + cellBounds.height;

        at.currentTool.mouseDragged({ clientX: x, clientY: cellBottomY + 2 });

        assert.equal(otherCell.getProperty("y"), cellBottomY + 3, "snapped to guide");
    });

    test("top-center and side already snapping", assert => {
        const otherCell = at.project.createBasicCellWithBounds(0, 60, 100, 50);
        at.cellInsertComponent(screen, otherCell, screen.orderedComponents.length);

        at.selectFigures([otherCell]);
        const topCenterHandle = at.handles.find(h => h.path == "topCenter");
        const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;

        at.currentTool.mouseDown({ target: topCenterHandle.DOMElement, clientX: x, clientY: y });

        const cellBounds = globalBoundsOfElement(cell.DOMElement);

        at.currentTool.mouseDragged({ clientX: x, clientY: cellBounds.top + 2 });

        assert.equal(otherCell.getProperty("y"), cellBounds.top + 3, "snapped to guide");
    });

    test("nested cells", assert => {
        const oldHeight = 20;
        const oldY = 20;
        const innerCell = at.project.createBasicCellWithBounds(20, oldY, 20, oldHeight);
        at.cellSetPropertyInState(cell, "layoutPolicyCode", GDFixedLayoutPolicyCode, cell.activeState);
        at.cellInsertComponent(cell, innerCell, 0);
        at.cellSetPropertyInState(cell, "y", 200, cell.activeState);

        at.selectFigures([innerCell]);
        const topCenterHandle = at.handles.find(h => h.path == "topCenter");
        const handleBounds = globalBoundsOfElement(topCenterHandle.DOMElement);

        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;

        at.currentTool.mouseDown({ target: topCenterHandle.DOMElement, clientX: x, clientY: y });

        const delta = 10;
        at.currentTool.mouseDragged({ clientX: x, clientY: y - delta });
        at.currentTool.mouseUp({ clientX: x, clientY: y - delta });

        assert.equal(innerCell.getProperty("height"), oldHeight + delta);
        assert.equal(innerCell.getProperty("y"), oldY - delta);
        const newBoundsOfElement = globalBoundsOfElement(innerCell.DOMElement);
        assert.equal(newBoundsOfElement.height, oldHeight + delta);

    });

    test("bottom center centered", assert => {
        at.selectFigures([cell]);

        const cellHeight = cell.getProperty("height");
        const handle = at.handles.find(h => h.path == "bottomCenter");
        const handleBounds = globalBoundsOfElement(handle.DOMElement);
        const x = handleBounds.left + 1;
        const y = handleBounds.top + 1;

        at.currentTool.mouseDown({ target: handle.DOMElement, clientX: x, clientY: y });
        at.currentTool.mouseDragged({ target: handle.DOMElement, clientX: x, clientY: y - 10, altKey: true });
        at.currentTool.mouseDragged({ target: handle.DOMElement, clientX: x, clientY: y - cellHeight - 30, altKey: true });
        assert.equal(cell.getProperty("height"), cell.getProperty("minimumWidth"), "drag set height to min height if the height was  < min height");
    });

    test("horizontal layout resize handlers", assert => {

        screen.setProperty("layoutPolicyCode", GDHorizontalBoxLayoutPolicyCode);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);

        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- left, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 8, "8 handles horizontal layout - HAlign- center, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- right, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- bottom");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- bottom");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- bottom");

    });

    test("vertical layout resize handlers", assert => {

        screen.setProperty("layoutPolicyCode", GDVerticalBoxLayoutPolicyCode);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);

        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- left, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 8, "8 handles horizontal layout - HAlign- center, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- right, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- bottom");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- bottom");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- bottom");

    });

    test("stacked layout resize handlers", assert => {

        screen.setProperty("layoutPolicyCode", GDAlignmentLayoutPolicyCode);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);

        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- top");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- left, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 8, "8 handles horizontal layout - HAlign- center, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- right, VAlign- center");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDLeftAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- bottom");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDCenterAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- bottom");

        at.selectFigures([]);
        cell.container.setProperty("horizontalAlignment", GDRightAlignment);
        cell.container.setProperty("verticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- bottom");

    });

    test("floating cell resize handlers", assert => {
        cell.setProperty("activeLayout", 1);

        cell.setProperty("activeHorizontalAlignment", GDLeftAlignment);
        cell.setProperty("activeVerticalAlignment", GDTopAlignment);

        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- top");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDCenterAlignment);
        cell.setProperty("activeVerticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- top");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDRightAlignment);
        cell.setProperty("activeVerticalAlignment", GDTopAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- top");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDLeftAlignment);
        cell.setProperty("activeVerticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- left, VAlign- center");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDCenterAlignment);
        cell.setProperty("activeVerticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 8, "8 handles horizontal layout - HAlign- center, VAlign- center");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDRightAlignment);
        cell.setProperty("activeVerticalAlignment", GDCenterAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- right, VAlign- center");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDLeftAlignment);
        cell.setProperty("activeVerticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- left, VAlign- bottom");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDCenterAlignment);
        cell.setProperty("activeVerticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 5, "5 handles horizontal layout - HAlign- center, VAlign- bottom");

        at.selectFigures([]);
        cell.setProperty("activeHorizontalAlignment", GDRightAlignment);
        cell.setProperty("activeVerticalAlignment", GDBottomAlignment);
        at.selectFigures([cell]);
        assert.equal(at.handles.length, 3, "3 handles horizontal layout - HAlign- right, VAlign- bottom");

    });
});
