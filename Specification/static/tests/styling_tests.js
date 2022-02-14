"use strict";

import { GDProject, GDAlignmentLayoutPolicyCode, GDCenterAlignment, GDHorizontalBoxLayoutPolicyCode, GDTriangleCellType,
    GDVerticalBoxLayoutPolicyCode,  GDFlexResizing, GDIntrinsicResizing, GDFixResizing, GDFixedLayoutPolicyCode } from '../modules/model.js';
import { GDCSSGenerator } from '../modules/styling.js';
import { layoutPolicyCodeAndActiveLayoutCSS, layoutCSS, customCSS, borderRadiusCSS,displayCSS, displayProperties,  horizontalResizingCSS, verticalResizingCSS } from '../modules/styling.js';

let stylingTestProject;

QUnit.module("styling", {
    beforeEach: function() {
        stylingTestProject = new GDProject(projectJSON, null);
    }
});


function createTestCell(props, container) {
    function valueForKey(k,s) {
        if (props[k])
            return props[k];

        return stylingTestProject.currentLookAndFeel.defaultValueForKey(k);
    }
    const cell = {
        valueForKeyInStateWithIdentifier: (k, s) => {
            return valueForKey(k,s);
        },

        ownValueForKeyInStateWithIdentifier: (k, s) => {
            return valueForKey(k,s);
        },

        container: container, 
        project: stylingTestProject
    }; 

    if (container) {
        container.orderedComponents = [cell];
    }

    return cell;
}

QUnit.test("issue 433, cell-alignment", function(assert) {
    const container = createTestCell({"layoutPolicyCode": GDAlignmentLayoutPolicyCode, 
            "horizontalAlignment": GDCenterAlignment, 
            "verticalAlignment": GDCenterAlignment});
        

    const cell = createTestCell({} ,container);

    const style = {};
    layoutPolicyCodeAndActiveLayoutCSS(style, cell, null);

    assert.equal(style.placeSelf, "center center");
});

QUnit.test("issue 675, grid-template-rows/columns", function(assert) {
    const container = createTestCell({"layoutPolicyCode": GDAlignmentLayoutPolicyCode });

    const style = {};
    layoutCSS(style, container, null);

    assert.equal(style.gridTemplateRows, "100%");       // using 1fr breaks stretch in the child-cell
    assert.equal(style.gridTemplateColumns, "100%");
});


QUnit.test("customCSS single property", function(assert) {
    let cell = { valueForKeyInStateWithIdentifier: (key, state) => "caret-color: red" };
    let e = document.createElement("div");

    customCSS(e.style, cell, null);

    assert.equal(e.style.caretColor, "red");
});


QUnit.test("customCSS multiple properties", function(assert) {
    let cell = { valueForKeyInStateWithIdentifier: (key, state) => "caret-color: red;\n text-transform  : capitalize" };
    let e = document.createElement("div");

    customCSS(e.style, cell, null);

    assert.equal(e.style.caretColor, "red");
    assert.equal(e.style.textTransform, "capitalize");
});

QUnit.test("customCSS url", function(assert) {
    const url = "url(\"https://foo.com/bar.jpg\")";
    let cell = { valueForKeyInStateWithIdentifier: (key, state) => `background-image: ${url};` };
    let e = document.createElement("div");

    customCSS(e.style, cell, null);
    assert.equal(e.style.backgroundImage, url);
});

QUnit.test("rotatation issue #517", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDHorizontalBoxLayoutPolicyCode});
    let cell = createTestCell({"rotationAngle": 33}, container);
    let e = document.createElement("div");
    e.style.transform="rotate(12deg)";
    layoutPolicyCodeAndActiveLayoutCSS(e.style, cell, null);

    assert.equal(e.style.transform, "rotate(12deg)", "do nothing if we have a rotation angle");

    layoutPolicyCodeAndActiveLayoutCSS(e.style, createTestCell({"rotationAngle": 0},container), null);

    assert.equal(e.style.transform, "unset", "remove for zero rotation");
});


QUnit.test("unset for 0px corner radius (#528)", function (assert) {
    let cell = createTestCell({}, null);
    let e = document.createElement("div");
    borderRadiusCSS(e.style, cell, null);
    assert.equal(e.style.borderRadius, "unset");
});




QUnit.test("issue683 triangle", function(assert) {
    let cell = createTestCell({cellType: GDTriangleCellType, rotationAngle: 0}, null);
    let e = document.createElement("div");
    displayCSS(e.style, cell, cell.activeStateIdentifier);
    let clipPath = e.style.clipPath;
    if (clipPath == "")
        clipPath = e.style.webkitClipPath;
    assert.notEqual( clipPath, "");
});

QUnit.test("issue683 displayCSS is called", function(assert) {
    let cell = createTestCell({cellType: GDTriangleCellType, rotationAngle: 0}, null);
    let displayIsCalledForCellType = displayProperties.shouldUse("cellType", cell, cell.activeStateIdentifier);
    assert.ok(displayIsCalledForCellType);
});

// don't know how to test this particular bug, it was basically an error while moving the 
// stuff from viewer into the own class. The real problem is: where do we need the 
// updateLayoutCells anyway ... 
QUnit.test("issue 701", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDVerticalBoxLayoutPolicyCode});
    let child = createTestCell({"horizontalResizing": GDFlexResizing, "verticalResizing": GDIntrinsicResizing}, container);
    let e = document.createElement("div");

    let cssGenerator = new GDCSSGenerator();

    cssGenerator.updateStyleProperty(e.style, container, "layoutPolicyCode", container.activeStateIdentifier);
    assert.ok( true, "the call above should not throw ");
});


// since we currenly cannot use real objects we mock it :/ 
// We create two cells, container and cell an make sure the inner-cells position
// is overwritten according to the containers-layout. #694 had basically this problem
QUnit.test("issue 694", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDVerticalBoxLayoutPolicyCode});
    let cell =  createTestCell({}, container);
    let div = document.createElement("div");
    div.style.position = "absolute";
    cell.cssStyleForStateIdentifier = () => div.style;
    cell.activeState = {identifier: "foo"};
    cell.objectID = "blar";

    let cssGenerator = new GDCSSGenerator();

    let containerDiv = document.createElement("div");
    document.body.appendChild(containerDiv);
    let containerStyle = containerDiv.style;


    cssGenerator.updateStyleProperty(containerStyle, container, "layoutPolicyCode", null);
    assert.equal(div.style.position, "relative");
});


// make sure alignSelf = "stretch" is removed if resizing is changed from flex to fix. 
QUnit.test("issue 733 horizontal ", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDHorizontalBoxLayoutPolicyCode, "verticalAlignment": GDCenterAlignment, "horizontalAlignment": GDCenterAlignment});
    let cell = createTestCell({"verticalResizing": GDFlexResizing, "horizontalResizing": GDFixResizing}, container);

    let cellStyle = document.createElement("div").style;
    let containerStyle = document.createElement("div").style;
    
    let cssGenerator = new GDCSSGenerator();
    cssGenerator.updateStyles(containerStyle, container, null);
    cssGenerator.updateStyles(cellStyle, cell, null);

    assert.equal(cellStyle.alignSelf, "stretch");

    let cell2 = createTestCell({"verticalResizing": GDFixResizing, "horizontalResizing": GDFixResizing}, container);
    cssGenerator.updateStyleProperty(cellStyle, cell2, "verticalResizing", null);


    assert.equal(cellStyle.alignSelf, "auto");
});

// make sure alignSelf = "stretch" is removed if resizing is changed from flex to fix. 
QUnit.test("issue 733 vertical", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDVerticalBoxLayoutPolicyCode, "verticalAlignment": GDCenterAlignment, "horizontalAlignment": GDCenterAlignment});
    let cell = createTestCell({"verticalResizing": GDFixResizing, "horizontalResizing": GDFlexResizing}, container);

    let cellStyle = document.createElement("div").style;
    let containerStyle = document.createElement("div").style;
    
    let cssGenerator = new GDCSSGenerator();
    cssGenerator.updateStyles(containerStyle, container, null);
    cssGenerator.updateStyles(cellStyle, cell, null);

    assert.equal(cellStyle.alignSelf, "stretch");

    let cell2 = createTestCell({"verticalResizing": GDFixResizing, "horizontalResizing": GDFixResizing}, container);
    cssGenerator.updateStyleProperty(cellStyle, cell2, "horizontalResizing", null);


    assert.equal(cellStyle.alignSelf, "auto");
});

// make sure alignSelf = "auto" is if resizing is changed from fix to flex 
QUnit.test("issue 248 vertical", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDVerticalBoxLayoutPolicyCode, "verticalAlignment": GDCenterAlignment, "horizontalAlignment": GDCenterAlignment});
    let cell = createTestCell({"verticalResizing": GDFlexResizing, "horizontalResizing": GDFixResizing}, container);

    let cellStyle = document.createElement("div").style;
    let containerStyle = document.createElement("div").style;
    
    let cssGenerator = new GDCSSGenerator();
    cssGenerator.updateStyles(containerStyle, container, null);
    cssGenerator.updateStyles(cellStyle, cell, null);

    assert.equal(cellStyle.alignSelf, "auto");
});

QUnit.test("issue 825 no min/max for manual width", function(assert) {
    let cell = createTestCell({"width": 100, "horizontalResizing": GDFixResizing});

    const style = {};
    horizontalResizingCSS(style, cell, null);

    assert.equal(style.minWidth, `${cell.valueForKeyInStateWithIdentifier("minimumWidth", null)}px`);
    assert.equal(style.maxWidth, `${cell.valueForKeyInStateWithIdentifier("maximumWidth", null)}px`);
    assert.equal(style.width, `${cell.valueForKeyInStateWithIdentifier("width", null)}px`);
});

QUnit.test("issue 825 no min/max for manual height", function(assert) {
    let cell = createTestCell({"height": 100, "verticalResizing": GDFixResizing});

    const style = {};
    verticalResizingCSS(style, cell, null);

    assert.equal(style.minHeight, `${cell.valueForKeyInStateWithIdentifier("minimumHeight", null)}px`);
    assert.equal(style.maxHeight, `${cell.valueForKeyInStateWithIdentifier("maximumHeight", null)}px`);
    assert.equal(style.height, `${cell.valueForKeyInStateWithIdentifier("height", null)}px`);
});

QUnit.test("issue 1121 make sure children are updated after container layoutPolicy-change", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDFixedLayoutPolicyCode});
    let cell = createTestCell({}, container);

    let style = {transform: ""};
    let cssGenerator = new GDCSSGenerator();
    let usedStateIdentifer = null;
    cssGenerator.updateLayoutCells = (_cells, stateIdentifier) => usedStateIdentifer = stateIdentifier;
    cssGenerator.updateStyleProperty(style,container,"layoutPolicyCode", "stateIdentifier", null);

    assert.equal(usedStateIdentifer, "stateIdentifier", "use the stateIdentifer of the container");
});

QUnit.test("issue 67 Stacked Layout Mouseover element wrongly placed", function(assert) {
    let container = createTestCell({"layoutPolicyCode": GDAlignmentLayoutPolicyCode});
    let cell = createTestCell({}, container);

    let cellStyle = document.createElement("div").style;
    let containerStyle = document.createElement("div").style;
    
    let cssGenerator = new GDCSSGenerator();
    cssGenerator.updateStyles(containerStyle, container, null);
    cssGenerator.updateStyles(cellStyle, cell, null);

    assert.equal(cellStyle.transform, "unset");
});
