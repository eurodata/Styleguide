"use strict";

import { cssSelector } from '../modules/styling.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { addCommands } from '../modules/commands.js';

const projectJSON1  = {"orderedScreenCount":1,"designBreakPoints":[],"className":"GDProject","projectLibrary":{"className":"GDLibrary","objectId":"id4196171","widgets":[{"states":[{"animationCurve":0,"className":"GDState","animationDuration":0.2,"animate":0,"objectId":"id12584875","identifier":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDState/p1","type":0,"name":"Normal"}],"className":"GDWidget","identifier":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDWidget/p1","objectId":"id16779243","type":2,"hierarchy":{"orderedComponents":[],"className":"GDScreenDefinition","objectId":"id16779147","name":"Label","individualContent":false,"identifier":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDScreenDefinition/p2"},"name":"Label"},{"states":[{"animationCurve":0,"className":"GDState","animationDuration":0.2,"animate":0,"objectId":"id16779179","identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p29","type":0,"name":"Normal"}],"className":"GDWidget","identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDWidget/p19","objectId":"id4196331","type":1,"hierarchy":{"orderedComponents":[],"className":"GDWidgetRootCellDefinition","objectId":"id8390731","name":"Radio Button Group Dark","individualContent":false,"identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDWidgetRootCellDefinition/p18"},"name":"Radio Button Group Dark"},{"states":[{"animationCurve":0,"className":"GDState","animationDuration":0.2,"animate":0,"objectId":"id8390571","identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p72","type":0,"name":"Normal"}],"className":"GDWidget","identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDWidget/p1","objectId":"id8390635","type":2,"hierarchy":{"orderedComponents":[],"className":"GDScreenDefinition","objectId":"id12584843","name":"Mobile Device Title Bar","individualContent":false,"identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDScreenDefinition/p23"},"name":"Mobile Device Title Bar"},{"states":[{"animationCurve":0,"className":"GDState","animationDuration":0.2,"animate":0,"objectId":"id4196267","identifier":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDState/p2","type":0,"name":"Normal"}],"className":"GDWidget","identifier":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDWidget/p2","objectId":"id12584939","type":1,"hierarchy":{"orderedComponents":[],"className":"GDWidgetRootCellDefinition","objectId":"id4196427","name":"Text Area","individualContent":false,"identifier":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDWidgetRootCellDefinition/p1"},"name":"Text Area"}],"lookAndFeels":[{"name":"Antetype","identifier":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDLookAndFeel/p2"}],"resources":[]},"objectId":"id4196107","currentLookAndFeel":{"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDWidgetRootCellDefinition/p1":{"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDState/p2":{"isShowingPlaceholders":0,"minimumHeight":10,"minimumWidth":10,"className":"GDProperties","scrollable":0,"objectId":"id16779275","placeholderStyle":0,"isEditableText":0,"isNestable":1}},"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDWidgetRootCellDefinition/p18":{"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p29":{"isShowingPlaceholders":0,"scrollable":0,"className":"GDProperties","objectId":"id20973579","placeholderStyle":0,"isEditableText":0,"isNestable":1}},"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDScreenDefinition/p2":{"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDState/p1":{"isShowingPlaceholders":0,"minimumHeight":10,"minimumWidth":10,"className":"GDProperties","scrollable":0,"objectId":"id8390667","placeholderStyle":0,"isEditableText":0,"isNestable":1}},"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDScreenDefinition/p23":{"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p72":{"isShowingPlaceholders":0,"scrollable":0,"className":"GDProperties","objectId":"id4196363","placeholderStyle":0,"isEditableText":0,"isNestable":1}}}}; 

const screenJSON = {"eventHandlers":[],"styleProperties":{"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDState/p1":{"placeholderStyle":0,"isDisplay":1,"verticalAlignment":1,"textColor":{"NSColorValue":"0.000000,0.000000,0.000000,1.000000"},"layoutPolicyCode":0,"backgroundColor":{"NSColorValue":"1.000000,0.999990,0.999990,1.000000"},"isShowingPlaceholders":0,"borderLeftWidth":0,"borderRightWidth":0,"backgroundPainterType":1,"borderBottomWidth":0,"isContentClipped":1,"isVisible":1,"borderTopWidth":0,"isEditableText":0,"isNestable":1,"verticalResizing":0,"x":0,"objectId":"id12584971","y":0,"horizontalAlignment":1,"height":600,"textFont":{"GDFont":{"displayName":"Segoe UI Semilight","isItalic":false,"isBold":false,"fontName":"SegoeUI-Semilight","familyName":"Segoe UI","css":"\"SegoeUI-Semilight\", \"Segoe UI\"","size":28}},"className":"GDProperties","isSelectable":1,"width":800,"scrollable":0}},"className":"GDScreen","orderedComponents":[],"dataBindingSourceCellScreenIndex":0,"dataBindings":[],"dataBindingTargetIndexPaths":[],"activeState":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDState/p1","dataBindingTargetScreenIndexes":[],"objectId":"id4196203","definition":"x-coredata://143D15C6-A0DB-4381-AA9A-37984AAF84FA/GDScreenDefinition/p2","specificationCell":0,"name":"Getting started - Blank","dataBindingSourceCellIndexPath":""};

let Antetype;

QUnit.module("commands", {
    beforeEach: function() {
//        Antetype._currentLookAndFeel = null;
        Antetype = new AntetypeWeb(document.getElementById("qunit-fixture"));
        addCommands(Antetype);
        Antetype.loadProjectFromJSON(projectJSON);
        Antetype.changeScreenFromJSON(screenJSON);
        Antetype.runCommand({"command":"changeTool","parameters":{"className":"GDSelectionTool"}});
    }    
});


QUnit.test("addCell", function(assert) {
    Antetype.runCommand({"command": "addCell", "parameters": singleCellJson});

    assert.equal(Antetype.screenElement.childNodes.length, 1, "node is inserted");
    var index = singleCellJson["index"];
    var DOMElement = Antetype.screenElement.childNodes[index];
    var cell = DOMElement.figure;
    assert.equal(cell.DOMElement, DOMElement, "DOMElement is set");


    // insert before: 
    Antetype.runCommand({"command": "addCell", "parameters": singleCellJson});

    assert.equal(Antetype.screenElement.childNodes.length, 2, "second node is inserted");
    var inserted = Antetype.screenElement.childNodes[index];
    assert.notEqual(inserted, DOMElement,"inserted is the new node");
});

QUnit.test("addCell and styles", function(assert) {
    Antetype.runCommand({"command": "addCell", "parameters": singleCellJson});
    let newCell = Antetype.screenElement.childNodes[0].figure;

    let style = newCell.cssStyleForStateIdentifier(newCell.activeStateIdentifier);
    assert.ok( style != undefined, "cell has instance style");

    // assert.equal( style.parentRule.parentStyleSheet, Antetype.project.currentLookAndFeel.cssStyleSheet._styleSheet, "the style is in the right stylesheet");
    assert.equal( style.parentRule.parentStyleSheet, Antetype.currentScreen.cssStyleSheet._styleSheet, "the style is in the right stylesheet");
});



var changeScreenJSON ={"eventHandlers":[],"styleProperties":{"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p72":{"maximumHeight":1000000,"isDisplay":1,"textColor":{"NSColorValue":"0.000000,0.000000,0.000000,1.000000"},"backgroundColor":{"NSColorValue":"1.000000,1.000000,1.000000,1.000000"},"maximumWidth":1000000,"borderLeftWidth":0,"layoutPolicyCode":0,"borderRightWidth":0,"backgroundPainterType":1,"borderBottomWidth":0,"minimumWidth":10,"isContentClipped":0,"isVisible":1,"borderTopWidth":0,"isEditableText":0,"x":0,"objectId":"id3221225472","y":0,"minimumHeight":10,"height":600,"className":"GDProperties","isSelectable":1,"textFont":{"GDFont":{"displayName":"Helvetica Neue Bold","isItalic":false,"isBold":true,"fontName":"HelveticaNeue-Bold","familyName":"Helvetica Neue","css":"\"HelveticaNeue-Bold\", \"Helvetica Neue\"","size":13}},"width":800,"scrollable":0}},"className":"GDScreen","orderedComponents":[{"eventHandlers":[],"styleProperties":{"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p29":{"x":350,"className":"GDProperties","width":100,"y":249.5,"textColor":{"NSColorValue":"0.000000,0.000000,0.000000,1.000000"},"backgroundPainterType":1,"textFont":{"GDFont":{"displayName":"Helvetica Neue Bold","isItalic":false,"isBold":true,"fontName":"HelveticaNeue-Bold","familyName":"Helvetica Neue","css":"\"HelveticaNeue-Bold\", \"Helvetica Neue\"","size":13}},"minimumHeight":3,"scrollable":0,"height":100,"objectId":"id2684354560","layoutPolicyCode":2,"minimumWidth":3,"isEditableText":0,"backgroundImageProportionalScale":1}},"className":"GDWidgetInstanceRootCell","orderedComponents":[],"dataBindingSourceCellScreenIndex":0,"dataBindings":[],"dataBindingTargetIndexPaths":[],"activeState":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p29","dataBindingTargetScreenIndexes":[],"objectId":"id536870912","definition":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDWidgetRootCellDefinition/p18","specificationCell":0,"name":"Rectangle","dataBindingSourceCellIndexPath":""}],"dataBindingSourceCellScreenIndex":0,"dataBindings":[],"dataBindingTargetIndexPaths":[],"activeState":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDState/p72","dataBindingTargetScreenIndexes":[],"objectId":"id1073741824","definition":"x-coredata://8A119B17-AF00-4D70-8084-3C8BA8F4FC4C/GDScreenDefinition/p23","specificationCell":0,"name":"Screen","dataBindingSourceCellIndexPath":""}; 

QUnit.test("changeScreen", function(assert) {
    var oldScreen = Antetype.currentScreen;
    Antetype.changeScreenFromJSON(changeScreenJSON);
    assert.equal(Antetype.screenElement.childNodes.length, 1);
    var newScreen = Antetype.currentScreen;
    assert.notEqual(oldScreen, newScreen);
    assert.equal(newScreen.DOMElement, Antetype.screenElement);
}); 

QUnit.test("selectFigures", function(assert) {
    Antetype.setCurrentTool(Antetype.selectionTool);
    Antetype.runCommand({"command": "addCell", "parameters": singleCellJson});
    var f = document.getElementById(singleCellJson.cell.objectId).figure;
    Antetype.selectFigures([f]);
    assert.equal(Antetype.selectedObjects.length, 1);
});


QUnit.test("addWidget", function(assert) {
    var commandJSON = {
                    "command": "addWidget",
                    "parameters": {
                        "lookNodes": [
                        { "definitionIdentifier": "D3CCF0A5-2B28-4BA3-94DE-ADADAC57DC08",
                           "definitionDictionary":  {
                                "960237A7-460C-4562-B23E-A2C88C124C9C": {
                                    "backgroundImageHorizontalOperation": 0,
                                    "backgroundImageProportionalScale": 1,
                                    "backgroundImageResource": {
                                        "GDImageResource": {
                                            "identifier": "AC5F2B0D-81C1-44FF-A95F-453BE63730B2"
                                        }
                                    },
                                    "backgroundImageVerticalOperation": 0,
                                    "backgroundPainterType": 2,
                                    "borderBottomWidth": 0,
                                    "borderLeftWidth": 0,
                                    "borderRightWidth": 0,
                                    "borderTopWidth": 0,
                                    "className": "GDProperties",
                                    "height": 13,
                                    "isEditableText": 0,
                                    "isNestable": 1,
                                    "isShowingPlaceholders": 0,
                                    "minimumHeight": 3,
                                    "minimumWidth": 3,
                                    "objectId": "id1409286144",
                                    "placeholderStyle": 0,
                                    "scrollable": 0,
                                    "textColor": {
                                        "NSColorValue": "0.000000,0.478431,1.000000,1.000000"
                                    },
                                    "textFont": {
                                        "GDFont": {
                                            "css": "\"HelveticaNeue-Medium\", \"Helvetica Neue\"",
                                            "displayName": "Helvetica Neue Medium",
                                            "familyName": "Helvetica Neue",
                                            "fontName": "HelveticaNeue-Medium",
                                            "isBold": false,
                                            "isItalic": false,
                                            "size": 15
                                        }
                                    },
                                    "width": 13,
                                    "x": 138,
                                    "y": 135
                                }
                            }
                        }
                        ],
                        "widget": {
                            "className": "GDWidget",
                            "hierarchy": {
                                "className": "GDWidgetRootCellDefinition",
                                "identifier": "D3CCF0A5-2B28-4BA3-94DE-ADADAC57DC08",
                                "individualContent": false,
                                "name": "iOS7 - Checkmark",
                                "objectId": "id3825205248",
                                "orderedComponents": []
                            },
                            "identifier": "0F784059-4C88-4702-8E63-DB848D89857A",
                            "name": "iOS7 - Checkmark",
                            "objectId": "id2751463424",
                            "states": [
                                {
                                    "animate": 0,
                                    "animationCurve": 0,
                                    "animationDuration": 0.2,
                                    "className": "GDState",
                                    "identifier": "960237A7-460C-4562-B23E-A2C88C124C9C",
                                    "name": "Normal",
                                    "objectId": "id1677721600",
                                    "type": 0
                                }
                            ],
                            "type": 3
                        }
                    }
                };

    Antetype.runCommand(commandJSON);

    var widget = Antetype.project.widgetWithIdentifier(commandJSON["parameters"]["widget"]["identifier"]);
    var lookAndFeel = Antetype.project.currentLookAndFeel;
    var selector = cssSelector(widget.hierarchy.identifier, widget.states[0].identifier, Antetype.project);
    var cssRule = lookAndFeel.cssRuleForSelector(widget.states[0], widget.hierarchy);
    assert.ok(cssRule != undefined); 
    assert.equal(widget.name, commandJSON["parameters"]["widget"]["name"]); 
});



/*QUnit.test("addState", function(assert) {


}); */

