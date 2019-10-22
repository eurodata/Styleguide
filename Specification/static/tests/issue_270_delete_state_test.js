"use strict";

/*
    trying to test the javascript-side. in buildAntetypeWeb() the json generated in 
    export "Web Viewer" is used to build the JavaScript-side of things. 

    the testcase is really only a small start. 

*/

QUnit.module("Issue #270 Delete State", {
    beforeEach: function()  {
        this.at = buildAntetypeWeb();
    }, 

    afterEach: function() {
        document.head.removeChild(this.at._fontStyleSheet.ownerNode);
        let lf = this.at.project.currentLookAndFeel;
        document.head.removeChild(lf.cssStyleSheet._styleSheet.ownerNode);
        document.head.removeChild(lf.breakPointStyleSheet._styleSheet.ownerNode);
    }
});

QUnit.test("deleteState", function(assert) {
    let widget = this.at.currentScreen.orderedComponents[0].widget;
    let darkState = widget.states.find( s => s.name == "dark" );
    let darkStateId = darkState.objectID
    this.at.project.deleteStates([darkState]);

    assert.equal(widget.states.length,1);
    assert.throws(() => this.at.project.stateWithIdentifier(darkStateId)); // or should we better return null, undefined or whatever? 
});
 

function buildAntetypeWeb() {
var projectJSON = {
  "orderedScreenCount" : 1,
  "designBreakPoints" : [

  ],
  "className" : "GDProject",
  "projectLibrary" : {
    "className" : "GDLibrary",
    "objectId" : "id4194699",
    "widgets" : [
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id362057050l",
            "identifier" : "6943F577-5E51-4E5A-B3AE-C20120CBFFDB",
            "type" : 100,
            "name" : "MouseOver"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id227112854l",
            "identifier" : "0C407D99-3DA4-40F3-B49F-2B3C18B10B98",
            "type" : 100,
            "name" : "Auswertung"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1739647651l",
            "identifier" : "E029BE08-4736-4BE8-A1C8-55A66084B11C",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1609557430l",
            "identifier" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
            "type" : 100,
            "name" : "Ergebnisliste"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "B60E49AF-26E6-45B7-B9B0-8F15E51C0B4D",
        "objectId" : "id20973067",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id256578245l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "C306C731-A122-458E-AE5B-99299C9B7C9D"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id508539873l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "F2B29CD3-EBA8-41E7-A288-05E22126E1DC"
            },
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id76729523l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "F5BDF55B-F9BF-4E15-893A-A19EA80BDE42"
            },
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id818267244l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "A111B5D0-2EBC-411B-9045-6EACFB963707"
            },
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id2046331602l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "60436C2B-601D-4FCF-84B7-416E447B7368"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1701132846l",
          "name" : "Ergebnis_indicator",
          "individualContent" : false,
          "identifier" : "2FCC2970-D87A-4B33-AE3D-31728F55D72D"
        },
        "name" : "Ergebnis_indicator"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0,
            "animate" : false,
            "objectId" : "id2039049620l",
            "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidget\/p19",
        "objectId" : "id16778763",
        "type" : 1,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1774171882l",
          "name" : "Radio Button Group Dark",
          "individualContent" : false,
          "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18"
        },
        "name" : "Radio Button Group Dark"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id2047165059l",
            "identifier" : "3329992A-1223-4906-A77F-6DE3641FB30B",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "A292514F-AB9D-4BA7-937B-F370B0BB0E41",
        "objectId" : "id25167371",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1982797659l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "FC2AE729-3960-4A77-9DDD-A9399546D1E6"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1435967006l",
          "name" : "checkbox",
          "individualContent" : false,
          "identifier" : "9627D988-3F31-4152-9BE1-7B97CD492047"
        },
        "name" : "checkbox"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0,
            "animate" : false,
            "objectId" : "id478965299l",
            "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidget\/p1",
        "objectId" : "id12584459",
        "type" : 2,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDScreenDefinition",
          "objectId" : "id444571797l",
          "name" : "Label",
          "individualContent" : false,
          "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDScreenDefinition\/p2"
        },
        "name" : "Label"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0,
            "animate" : false,
            "objectId" : "id606667206l",
            "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidget\/p2",
        "objectId" : "id4195851",
        "type" : 1,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id445551550l",
          "name" : "Text Area",
          "individualContent" : false,
          "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1"
        },
        "name" : "Text Area"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0,
            "animate" : false,
            "objectId" : "id1657267467l",
            "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p72",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidget\/p1",
        "objectId" : "id8390155",
        "type" : 2,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDScreenDefinition",
          "objectId" : "id1904533981l",
          "name" : "Mobile Device Title Bar",
          "individualContent" : false,
          "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDScreenDefinition\/p23"
        },
        "name" : "Mobile Device Title Bar"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id924594684l",
            "identifier" : "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F",
            "type" : 100,
            "name" : "dark"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1196543981l",
            "identifier" : "37B66C56-8FBA-4B67-BB8D-76C395774FC0",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "843C52BC-108D-4BFA-B4E5-4D9FAA5F6877",
        "objectId" : "id29361675",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id952501253l",
                      "name" : "Rectangle",
                      "individualContent" : false,
                      "identifier" : "39B4EA6A-95F5-44AC-B1D6-B23CC39DC6DA"
                    }
                  ],
                  "className" : "GDEmbeddedWidgetDefinition",
                  "objectId" : "id50487500l",
                  "name" : "checkbox",
                  "individualContent" : false,
                  "identifier" : "F886F8ED-A804-4CBD-95B3-2155640D6A9A"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id995248894l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "1B71B6EA-22D5-4BF5-B615-BD37FA963847"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1367728473l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "631EBA86-D8EC-40C1-89F6-30DACFC6B136"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id533120959l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "1730DCC6-E2D6-4913-93D4-FEBC6F9DB5BE"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id34522683l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "549212B0-30CD-42E6-92E2-E64F569E9EE0"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id708420846l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "7ABFF879-E077-4CC4-B6F4-BA9EE2E99523"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id2010459640l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "F39F0CB5-0B93-4E43-91FC-495862DB7567"
                },
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id386995173l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "C514EDCD-3E78-4AF2-A6F4-469554688540"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id543968073l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "4B7BDC6D-9BBD-4C7D-A087-50EB3B0643F1"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id2112365948l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "BC93B44A-1C7C-499D-890D-082246A42292"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id2007948363l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "9498B5C8-A49E-4D5E-A1AB-D730A20E6A97"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id998091093l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "532DB09F-8648-4596-B77E-9C70101EF995"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id2109931041l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "14D2503F-5ABB-4570-9B22-E488A61333DB"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1233161279l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "B2F42D33-C253-48E9-8937-DDFB9BCD23BC"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1650405071l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "7E45B004-911E-4A26-94CC-B9429869D4CF"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id786481697l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "2305E725-91CA-4349-9790-B657BE5A86F3"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1344378613l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "89D05B76-65E3-4014-9017-5D386AE1C0AB"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1311820386l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "7B67E70E-62E4-449F-940A-A4432E109E64"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id463256824l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "1787302E-E8F6-4A4D-AFE1-4E54F5CD9B21"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1556383483l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "144D04FF-19E4-43B6-82F9-AADB396A289E"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1267243928l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "275E8989-1623-4FEA-9314-96BBAD9AF293"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id163244547l",
          "name" : "list-item",
          "individualContent" : false,
          "identifier" : "145AEBAD-B449-4AEC-AF65-904CC25D7B0F"
        },
        "name" : "list-item"
      }
    ],
    "lookAndFeels" : [

    ],
    "resources" : [

    ]
  },
  "objectId" : "id4194635",
  "currentLookAndFeel" : {
    "39B4EA6A-95F5-44AC-B1D6-B23CC39DC6DA" : {
      "3329992A-1223-4906-A77F-6DE3641FB30B" : {
        "textHorizontalAlignment" : 0,
        "textString" : "",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.999990,0.999997,1.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : 203,
        "objectId" : "id385877547",
        "y" : -41,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "F2B29CD3-EBA8-41E7-A288-05E22126E1DC" : {
      "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 1,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,0.635717"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id444597803",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 1,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,0.635717"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id570426923",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 1,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,0.635717"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id289408555",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 1,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,0.635717"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id679478827",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDScreenDefinition\/p2" : {
      "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1" : {
        "minimumHeight" : 10,
        "minimumWidth" : 10,
        "scrollable" : 0,
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "objectId" : "id20973099",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "isNestable" : 1
      }
    },
    "14D2503F-5ABB-4570-9B22-E488A61333DB" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 140,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id285214251",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 845,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 451,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 140,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id499123755",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 845,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 451,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDScreenDefinition\/p23" : {
      "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p72" : {
        "isEditableText" : 0,
        "textOverflow" : 0,
        "className" : "GDProperties",
        "blendMode" : 0,
        "objectId" : "id12584491",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "isNestable" : 1
      }
    },
    "F886F8ED-A804-4CBD-95B3-2155640D6A9A" : {
      "3329992A-1223-4906-A77F-6DE3641FB30B" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id457180715",
        "backgroundColor" : {
          "NSColorValue" : "0.231731,0.598738,0.986816,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "cornerRadiusTopRight" : 3,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 1,
        "height" : 16,
        "marginTop" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 3,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 0,
        "cornerRadiusBottomLeft" : 3,
        "backgroundPainterType" : 1,
        "x" : 223,
        "width" : 16,
        "y" : -21
      }
    },
    "549212B0-30CD-42E6-92E2-E64F569E9EE0" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id641730091",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.233142,0.391633,0.446215,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 970,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 550,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id46138923",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.233142,0.391633,0.446215,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 970,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 550,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "532DB09F-8648-4596-B77E-9C70101EF995" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 2,
        "textString" : "12.04.2017, 18:00",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 1,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 66,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 2,
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 2,
        "embedHTML" : "",
        "objectId" : "id524289579",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 755,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
        "cornerRadiusBottomLeft" : 2,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 360.5,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 2,
        "textString" : "12.04.2017, 18:00",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 1,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 66,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 2,
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 2,
        "embedHTML" : "",
        "objectId" : "id423626283",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 755,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
        "cornerRadiusBottomLeft" : 2,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 360.5,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "2305E725-91CA-4349-9790-B657BE5A86F3" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id645924395",
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "Admin 1",
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "layoutWrap" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "textVerticalAlignment" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 0,
        "x" : 755,
        "width" : 78,
        "y" : 360.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id364906027",
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "Admin 1",
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 1,
        "textVerticalAlignment" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "layoutWrap" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "scrollable" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 0,
        "x" : 755,
        "width" : 78,
        "y" : 360.5
      }
    },
    "1B71B6EA-22D5-4BF5-B615-BD37FA963847" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id637535787",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 1,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 755,
        "paddingBottom" : 8,
        "width" : 100,
        "y" : 360.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id373294635",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 1,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 755,
        "paddingBottom" : 8,
        "width" : 100,
        "y" : 360.5
      }
    },
    "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1" : {
      "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
        "minimumHeight" : 10,
        "minimumWidth" : 10,
        "scrollable" : 0,
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "objectId" : "id16778795",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "isNestable" : 1
      }
    },
    "60436C2B-601D-4FCF-84B7-416E447B7368" : {
      "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
        "textHorizontalAlignment" : 0,
        "textString" : "4",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : -21.5,
        "objectId" : "id29361707",
        "y" : -33,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
        "textHorizontalAlignment" : 0,
        "textString" : "4",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : -21.5,
        "objectId" : "id104859179",
        "y" : -33,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
        "textHorizontalAlignment" : 0,
        "textString" : "4",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : -21.5,
        "objectId" : "id541066795",
        "y" : -33,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
        "textHorizontalAlignment" : 0,
        "textString" : "4",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : -21.5,
        "objectId" : "id192939563",
        "y" : -33,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "144D04FF-19E4-43B6-82F9-AADB396A289E" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id633341483",
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed&nbsp;",
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "layoutWrap" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "textVerticalAlignment" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 0,
        "x" : 755,
        "width" : 162,
        "y" : 360.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id125830699",
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed&nbsp;",
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "layoutWrap" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "textVerticalAlignment" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 0,
        "x" : 755,
        "width" : 162,
        "y" : 360.5
      }
    },
    "F5BDF55B-F9BF-4E15-893A-A19EA80BDE42" : {
      "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 8,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id415237675",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 8,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id390071851",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 8,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id67110443",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 8,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id436209195",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "BC93B44A-1C7C-499D-890D-082246A42292" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id461375019",
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "12.04.2017, 18:00",
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "layoutWrap" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "textVerticalAlignment" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 0,
        "x" : 755,
        "width" : 66,
        "y" : 360.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id654313003",
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "12.04.2017, 18:00",
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "layoutWrap" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "textVerticalAlignment" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 0,
        "x" : 755,
        "width" : 66,
        "y" : 360.5
      }
    },
    "7B67E70E-62E4-449F-940A-A4432E109E64" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 2,
        "textString" : "Silvio Werner",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 1,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 78,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 2,
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 2,
        "embedHTML" : "",
        "objectId" : "id511706667",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 755,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
        "cornerRadiusBottomLeft" : 2,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 360.5,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 2,
        "textString" : "Silvio Werner",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 1,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 78,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 2,
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 2,
        "embedHTML" : "",
        "objectId" : "id96470571",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 755,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
        "cornerRadiusBottomLeft" : 2,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 360.5,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "9498B5C8-A49E-4D5E-A1AB-D730A20E6A97" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id478152235",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 835,
        "paddingBottom" : 8,
        "width" : 140,
        "y" : 441
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id314574379",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 835,
        "paddingBottom" : 8,
        "width" : 140,
        "y" : 441
      }
    },
    "275E8989-1623-4FEA-9314-96BBAD9AF293" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id490735147",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 785,
        "paddingBottom" : 8,
        "width" : 400,
        "y" : 390.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id595592747",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 785,
        "paddingBottom" : 8,
        "width" : 400,
        "y" : 390.5
      }
    },
    "C306C731-A122-458E-AE5B-99299C9B7C9D" : {
      "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id536872491",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id574621227",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id620758571",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id469763627",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "145AEBAD-B449-4AEC-AF65-904CC25D7B0F" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "marginLeft" : 15,
        "paddingLeft" : 0,
        "horizontalResizing" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id335545899",
        "backgroundColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "height" : 100,
        "marginTop" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "paddingTop" : 4,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "paddingRight" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 15,
        "backgroundPainterType" : 1,
        "x" : 795,
        "paddingBottom" : 4,
        "width" : 100,
        "y" : 478
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "marginLeft" : 15,
        "paddingLeft" : 0,
        "horizontalResizing" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id700450347",
        "backgroundColor" : {
          "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "height" : 100,
        "marginTop" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "paddingTop" : 4,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "paddingRight" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 15,
        "backgroundPainterType" : 1,
        "x" : 795,
        "paddingBottom" : 4,
        "width" : 100,
        "y" : 478
      }
    },
    "FC2AE729-3960-4A77-9DDD-A9399546D1E6" : {
      "3329992A-1223-4906-A77F-6DE3641FB30B" : {
        "textHorizontalAlignment" : 0,
        "textString" : "",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.999990,0.999997,1.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : 203,
        "objectId" : "id603981355",
        "y" : -41,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "C514EDCD-3E78-4AF2-A6F4-469554688540" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "4",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : -21.5,
        "objectId" : "id167773739",
        "y" : -33,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "textHorizontalAlignment" : 0,
        "textString" : "4",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : -21.5,
        "objectId" : "id117442091",
        "y" : -33,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "9627D988-3F31-4152-9BE1-7B97CD492047" : {
      "3329992A-1223-4906-A77F-6DE3641FB30B" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id134219307",
        "backgroundColor" : {
          "NSColorValue" : "0.231731,0.598738,0.986816,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "cornerRadiusTopRight" : 3,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 1,
        "height" : 16,
        "marginTop" : 3,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 3,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 10,
        "cornerRadiusBottomLeft" : 3,
        "backgroundPainterType" : 1,
        "x" : 203,
        "width" : 16,
        "y" : -41
      }
    },
    "A111B5D0-2EBC-411B-9045-6EACFB963707" : {
      "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
        "layoutWrap" : 0,
        "textString" : "",
        "horizontalResizing" : 0,
        "marginRight" : 8,
        "verticalAlignment" : 1,
        "flexHeightPercentage" : 13,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 1,
        "minimumWidth" : 3,
        "verticalResizing" : 2,
        "x" : 1080,
        "objectId" : "id394266155",
        "y" : 660,
        "minimumHeight" : 3,
        "height" : 13,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 16,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
        "layoutWrap" : 0,
        "textString" : "",
        "horizontalResizing" : 0,
        "marginRight" : 8,
        "verticalAlignment" : 1,
        "flexHeightPercentage" : 13,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 1,
        "minimumWidth" : 3,
        "verticalResizing" : 2,
        "x" : 1080,
        "objectId" : "id268437035",
        "y" : 660,
        "minimumHeight" : 3,
        "height" : 13,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 16,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
        "layoutWrap" : 0,
        "textString" : "",
        "horizontalResizing" : 0,
        "marginRight" : 8,
        "verticalAlignment" : 1,
        "flexHeightPercentage" : 13,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "verticalResizing" : 2,
        "x" : 1080,
        "objectId" : "id171968043",
        "y" : 660,
        "minimumHeight" : 3,
        "height" : 13,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 16,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "horizontalResizing" : 0,
        "flexHeightPercentage" : 13,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id222299691",
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:local(\"FontAwesome Regular\")}"
          }
        },
        "textString" : "",
        "verticalResizing" : 2,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "height" : 13,
        "backgroundBlur" : 0,
        "isDisplay" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 8,
        "backgroundPainterType" : 0,
        "x" : 1080,
        "y" : 660,
        "width" : 16
      }
    },
    "4B7BDC6D-9BBD-4C7D-A087-50EB3B0643F1" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id226493995",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id260048427",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "7ABFF879-E077-4CC4-B6F4-BA9EE2E99523" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id62916139",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 1,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 775,
        "paddingBottom" : 8,
        "width" : 57,
        "y" : 381
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id150996523",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 1,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 775,
        "paddingBottom" : 8,
        "width" : 57,
        "y" : 381
      }
    },
    "631EBA86-D8EC-40C1-89F6-30DACFC6B136" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "horizontalResizing" : 2,
        "flexHeightPercentage" : 13,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id264242731",
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "100",
        "verticalResizing" : 2,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "height" : 13,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 0,
        "backgroundPainterType" : 0,
        "x" : 970,
        "width" : 16,
        "y" : 550
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "horizontalResizing" : 2,
        "flexHeightPercentage" : 13,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id427820587",
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "textString" : "100",
        "verticalResizing" : 2,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "height" : 13,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 0,
        "backgroundPainterType" : 0,
        "x" : 970,
        "width" : 16,
        "y" : 550
      }
    },
    "7E45B004-911E-4A26-94CC-B9429869D4CF" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 140,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id197133867",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 855,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 461,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 140,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id58721835",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 855,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 461,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "89D05B76-65E3-4014-9017-5D386AE1C0AB" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id666895915",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 775,
        "paddingBottom" : 8,
        "width" : 160,
        "y" : 380.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id503318059",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 775,
        "paddingBottom" : 8,
        "width" : 160,
        "y" : 380.5
      }
    },
    "1787302E-E8F6-4A4D-AFE1-4E54F5CD9B21" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 160,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id578815531",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 785,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 390.5,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 160,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id83887659",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 785,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 390.5,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "1730DCC6-E2D6-4913-93D4-FEBC6F9DB5BE" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id683673131",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 765,
        "paddingBottom" : 8,
        "width" : 64,
        "y" : 370.5
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "borderLeftWidth" : 0,
        "textHorizontalAlignment" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "verticalAlignment" : 0,
        "paddingLeft" : 8,
        "horizontalResizing" : 0,
        "className" : "GDProperties",
        "layoutPolicyCode" : 3,
        "objectId" : "id360711723",
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "verticalResizing" : 1,
        "minimumHeight" : 3,
        "isNestable" : 1,
        "horizontalAlignment" : 0,
        "height" : 100,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "minimumWidth" : 3,
        "scrollable" : 0,
        "layoutWrap" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "borderBottomWidth" : 0,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "paddingRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "backgroundPainterType" : 0,
        "x" : 765,
        "paddingBottom" : 8,
        "width" : 64,
        "y" : 370.5
      }
    },
    "F39F0CB5-0B93-4E43-91FC-495862DB7567" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 8,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id616564267",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 8,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 16,
        "flexHeightPercentage" : 13,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "FontAwesome Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "FontAwesome",
            "familyName" : "FontAwesome",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id473957931",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250978,0.250978,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 1000,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 13,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 580,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "B2F42D33-C253-48E9-8937-DDFB9BCD23BC" : {
      "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 2,
        "textString" : "12.04.2017, 18:00",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 1,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 66,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 2,
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 2,
        "embedHTML" : "",
        "objectId" : "id54527531",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 755,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
        "cornerRadiusBottomLeft" : 2,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 360.5,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 2,
        "textString" : "12.04.2017, 18:00",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 1,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 66,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 2,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "OpenSans-Regular",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 13,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 2,
        "borderLeftColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 2,
        "embedHTML" : "",
        "objectId" : "id448792107",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 755,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
        "cornerRadiusBottomLeft" : 2,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 360.5,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "2FCC2970-D87A-4B33-AE3D-31728F55D72D" : {
      "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id440403499",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id37750315",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 0,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id704644651",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 1,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textLineHeightMultiply" : 1,
        "borderBottomType" : 0,
        "paddingRight" : 8,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 57,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 1,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "paddingBottom" : 8,
        "textShadowAngle" : 180,
        "borderRightType" : 0,
        "textOverflow" : 0,
        "innerShadowBlur" : 5,
        "dropShadowOffset" : 2,
        "marginTop" : 0,
        "dropShadowBlur" : 2,
        "isNestable" : 1,
        "isVisible" : 1,
        "innerShadowOffset" : 5,
        "borderTopColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "innerShadowOpacity" : 0.75,
        "constrainProportions" : 0,
        "marginLeft" : 0,
        "textShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "isDrawingReverted" : 0,
        "textTransform" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Open Sans SemiBold",
            "isItalic" : false,
            "isBold" : true,
            "fontName" : "OpenSans-SemiBold",
            "familyName" : "Open Sans",
            "fallback" : "",
            "size" : 11,
            "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 8,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id79693355",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 0,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 8,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 805,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 100,
        "cornerRadiusBottomLeft" : 0,
        "backgroundGradient" : {
          "CTGradient" : {
            "colorStops" : [
              0.68000000000000005,
              0.68000000000000005,
              0.68000000000000005,
              1,
              0,
              0.82999999999999996,
              0.82999999999999996,
              0.82999999999999996,
              1,
              1
            ],
            "count" : 2
          }
        },
        "y" : 411,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18" : {
      "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
        "isEditableText" : 0,
        "textOverflow" : 0,
        "className" : "GDProperties",
        "blendMode" : 0,
        "objectId" : "id4195883",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "isNestable" : 1
      }
    }
  }
};
var screenJSON = [
  {
    "specificationCell" : 0,
    "styleProperties" : {
      "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1" : {
        "layoutWrap" : 0,
        "isDisplay" : 1,
        "verticalAlignment" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "backgroundColor" : {
          "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
        },
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 1,
        "isVisible" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "isNestable" : 1,
        "verticalResizing" : 0,
        "x" : 0,
        "objectId" : "id8390187",
        "y" : 0,
        "horizontalAlignment" : 1,
        "height" : 600,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Segoe UI Semilight",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "SegoeUI-Semilight",
            "familyName" : "Segoe UI",
            "fallback" : "",
            "size" : 28,
            "fontCSS" : "\n@font-face {\nfont-family: \"SegoeUI-Semilight\";src:local(\"Segoe UI Semilight\")}"
          }
        },
        "className" : "GDProperties",
        "isSelectable" : 1,
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 800,
        "backgroundBlur" : 0,
        "scrollable" : 3
      }
    },
    "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDScreenDefinition\/p2",
    "className" : "GDScreen",
    "eventHandlers" : [

    ],
    "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1",
    "objectId" : "id230692997l",
    "name" : "Getting started - Blank",
    "orderedComponents" : [
      {
        "specificationCell" : 0,
        "styleProperties" : {
          "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
            "isEditableText" : 0,
            "x" : 795,
            "className" : "GDProperties",
            "y" : 478,
            "blendMode" : 0,
            "objectId" : "id100664875",
            "textTransform" : 0,
            "backgroundBlur" : 0,
            "scrollable" : 0,
            "textOverflow" : 0
          },
          "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
            "isEditableText" : 0,
            "x" : 795,
            "className" : "GDProperties",
            "y" : 478,
            "blendMode" : 0,
            "objectId" : "id381683243",
            "textTransform" : 0,
            "backgroundBlur" : 0,
            "scrollable" : 0,
            "textOverflow" : 0
          }
        },
        "definition" : "145AEBAD-B449-4AEC-AF65-904CC25D7B0F",
        "className" : "GDWidgetInstanceRootCell",
        "eventHandlers" : [

        ],
        "activeState" : "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F",
        "objectId" : "id870259029l",
        "name" : "list-item",
        "orderedComponents" : [
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 755,
                "className" : "GDProperties",
                "y" : 360.5,
                "blendMode" : 0,
                "objectId" : "id599787051",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "1B71B6EA-22D5-4BF5-B615-BD37FA963847",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1301429185l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "3329992A-1223-4906-A77F-6DE3641FB30B" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "marginRight" : 0,
                    "x" : 223,
                    "className" : "GDProperties",
                    "width" : 16,
                    "y" : -21,
                    "marginTop" : 0,
                    "scrollable" : 0,
                    "textTransform" : 0,
                    "height" : 16,
                    "objectId" : "id130025003",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "9627D988-3F31-4152-9BE1-7B97CD492047",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "3329992A-1223-4906-A77F-6DE3641FB30B",
                "objectId" : "id1792517197l",
                "name" : "checkbox",
                "orderedComponents" : [
                  {
                    "specificationCell" : 0,
                    "styleProperties" : {
                      "3329992A-1223-4906-A77F-6DE3641FB30B" : {
                        "isEditableText" : 0,
                        "className" : "GDProperties",
                        "blendMode" : 0,
                        "objectId" : "id465569323",
                        "textTransform" : 0,
                        "backgroundBlur" : 0,
                        "scrollable" : 0,
                        "textOverflow" : 0
                      }
                    },
                    "definition" : "FC2AE729-3960-4A77-9DDD-A9399546D1E6",
                    "className" : "GDWidgetInstanceCell",
                    "eventHandlers" : [

                    ],
                    "objectId" : "id393231498l",
                    "name" : "Rectangle",
                    "orderedComponents" : [

                    ]
                  }
                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "backgroundBlur" : 0,
                "blendMode" : 0,
                "x" : 765,
                "className" : "GDProperties",
                "y" : 371,
                "width" : 64,
                "textHorizontalAlignment" : 0,
                "textTransform" : 0,
                "scrollable" : 0,
                "objectId" : "id318768683",
                "textOverflow" : 0,
                "isEditableText" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "textOverflow" : 0,
                "x" : 765,
                "className" : "GDProperties",
                "y" : 371,
                "blendMode" : 0,
                "objectId" : "id297797163",
                "textTransform" : 0,
                "textHorizontalAlignment" : 0,
                "scrollable" : 0,
                "backgroundBlur" : 0
              }
            },
            "definition" : "1730DCC6-E2D6-4913-93D4-FEBC6F9DB5BE",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id2087910882l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 970,
                    "className" : "GDProperties",
                    "textString" : "100",
                    "y" : 550,
                    "blendMode" : 0,
                    "objectId" : "id369100331",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "textString" : "100",
                    "blendMode" : 0,
                    "objectId" : "id612369963",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "631EBA86-D8EC-40C1-89F6-30DACFC6B136",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id108290373l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id557844011",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "7ABFF879-E077-4CC4-B6F4-BA9EE2E99523",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1705051884l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {

                },
                "definition" : "549212B0-30CD-42E6-92E2-E64F569E9EE0",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1207671162l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                "isEditableText" : 0,
                "x" : 805,
                "className" : "GDProperties",
                "y" : 411,
                "blendMode" : 0,
                "objectId" : "id482346539",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                "isEditableText" : 0,
                "x" : 805,
                "className" : "GDProperties",
                "y" : 411,
                "blendMode" : 0,
                "objectId" : "id234882603",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                "isEditableText" : 0,
                "x" : 805,
                "className" : "GDProperties",
                "y" : 411,
                "blendMode" : 0,
                "objectId" : "id205522475",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "2FCC2970-D87A-4B33-AE3D-31728F55D72D",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [
              {
                "className" : "GDEventHandler",
                "objectId" : "id16779179",
                "eventType" : "GDMouseEnterEventType",
                "orderedActionSets" : [
                  {
                    "className" : "GDActionSet",
                    "orderedActions" : [
                      {
                        "className" : "GDToggleStateAction",
                        "animationCurve" : 0,
                        "animationDuration" : 0.20000000000000001,
                        "delay" : 0,
                        "animate" : 0,
                        "objectId" : "id180357099",
                        "firstState" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
                        "secondState" : "6943F577-5E51-4E5A-B3AE-C20120CBFFDB",
                        "specifier" : 0
                      }
                    ],
                    "objectId" : "id20973515",
                    "orderedElements" : [
                      "id1664673856l"
                    ]
                  }
                ]
              },
              {
                "className" : "GDEventHandler",
                "objectId" : "id12584875",
                "eventType" : "GDMouseLeaveEventType",
                "orderedActionSets" : [
                  {
                    "className" : "GDActionSet",
                    "orderedActions" : [
                      {
                        "className" : "GDToggleStateAction",
                        "animationCurve" : 0,
                        "animationDuration" : 0.20000000000000001,
                        "delay" : 0,
                        "animate" : 0,
                        "objectId" : "id176162795",
                        "firstState" : "6943F577-5E51-4E5A-B3AE-C20120CBFFDB",
                        "secondState" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
                        "specifier" : 0
                      }
                    ],
                    "objectId" : "id25167819",
                    "orderedElements" : [
                      "id1664673856l"
                    ]
                  }
                ]
              },
              {
                "className" : "GDEventHandler",
                "objectId" : "id20973483",
                "eventType" : "GDMouseClickEventType",
                "orderedActionSets" : [
                  {
                    "className" : "GDActionSet",
                    "orderedActions" : [
                      {
                        "className" : "GDGotoScreenAction",
                        "animationCurve" : 0,
                        "animationDuration" : 0.20000000000000001,
                        "delay" : 0,
                        "animate" : 0,
                        "objectId" : "id184551435",
                        "specifier" : 0
                      }
                    ],
                    "objectId" : "id16779211",
                    "orderedElements" : [
                      "id1664673856l"
                    ]
                  }
                ]
              }
            ],
            "activeState" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
            "objectId" : "id1664673856l",
            "name" : "Ergebnis_indicator",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "blendMode" : 0,
                    "objectId" : "id88081963",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : 805,
                    "className" : "GDProperties",
                    "y" : 411,
                    "blendMode" : 0,
                    "objectId" : "id692061739",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "blendMode" : 0,
                    "objectId" : "id583009835",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "F2B29CD3-EBA8-41E7-A288-05E22126E1DC",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id781890725l",
                "name" : "Rectangle",
                "orderedComponents" : [
                  {
                    "specificationCell" : 0,
                    "styleProperties" : {
                      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                        "isEditableText" : 0,
                        "x" : 1000,
                        "className" : "GDProperties",
                        "textString" : "",
                        "y" : 580,
                        "blendMode" : 0,
                        "objectId" : "id113247787",
                        "textTransform" : 0,
                        "backgroundBlur" : 0,
                        "scrollable" : 0,
                        "textOverflow" : 0
                      }
                    },
                    "definition" : "C306C731-A122-458E-AE5B-99299C9B7C9D",
                    "className" : "GDWidgetInstanceCell",
                    "eventHandlers" : [

                    ],
                    "objectId" : "id1589803503l",
                    "name" : "Rectangle",
                    "orderedComponents" : [

                    ]
                  }
                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                    "isEditableText" : 0,
                    "x" : 1000,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 580,
                    "blendMode" : 0,
                    "objectId" : "id184550955",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : 1000,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 580,
                    "blendMode" : 0,
                    "objectId" : "id142607915",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "x" : 1000,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 580,
                    "blendMode" : 0,
                    "objectId" : "id348128811",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "F5BDF55B-F9BF-4E15-893A-A19EA80BDE42",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id881060500l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : 1080,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 660,
                    "blendMode" : 0,
                    "objectId" : "id520095275",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "blendMode" : 0,
                    "objectId" : "id398460459",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "A111B5D0-2EBC-411B-9045-6EACFB963707",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id980136165l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                    "isEditableText" : 0,
                    "x" : -21.5,
                    "className" : "GDProperties",
                    "textString" : "4",
                    "y" : -33,
                    "blendMode" : 0,
                    "objectId" : "id402654763",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : -21.5,
                    "className" : "GDProperties",
                    "textString" : "4",
                    "y" : -33,
                    "blendMode" : 0,
                    "objectId" : "id587204139",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "x" : -21.5,
                    "className" : "GDProperties",
                    "textString" : "4",
                    "y" : -33,
                    "blendMode" : 0,
                    "objectId" : "id411043371",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "60436C2B-601D-4FCF-84B7-416E447B7368",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1240827617l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 785,
                "className" : "GDProperties",
                "y" : 391,
                "blendMode" : 0,
                "objectId" : "id721421867",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 785,
                "className" : "GDProperties",
                "y" : 391,
                "blendMode" : 0,
                "objectId" : "id549455403",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "275E8989-1623-4FEA-9314-96BBAD9AF293",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1440416418l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 755,
                    "className" : "GDProperties",
                    "textString" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed&nbsp;",
                    "y" : 360.5,
                    "blendMode" : 0,
                    "objectId" : "id494929451",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "144D04FF-19E4-43B6-82F9-AADB396A289E",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id28989050l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 835,
                "className" : "GDProperties",
                "y" : 441,
                "blendMode" : 0,
                "objectId" : "id419431979",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "9498B5C8-A49E-4D5E-A1AB-D730A20E6A97",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id394773155l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 755,
                    "className" : "GDProperties",
                    "textString" : "12.04.2017, 18:00",
                    "y" : 360.5,
                    "blendMode" : 0,
                    "objectId" : "id671090219",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "BC93B44A-1C7C-499D-890D-082246A42292",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1085449968l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id121636395",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id713033259",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "89D05B76-65E3-4014-9017-5D386AE1C0AB",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id422220549l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 755,
                    "className" : "GDProperties",
                    "textString" : "Silvio Werner",
                    "y" : 360.5,
                    "blendMode" : 0,
                    "objectId" : "id159385131",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "textString" : "Silvio Werner",
                    "blendMode" : 0,
                    "objectId" : "id25167403",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "2305E725-91CA-4349-9790-B657BE5A86F3",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id335200389l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {

            },
            "definition" : "14D2503F-5ABB-4570-9B22-E488A61333DB",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1193740341l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {

                },
                "definition" : "532DB09F-8648-4596-B77E-9C70101EF995",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id2127272433l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 785,
                "className" : "GDProperties",
                "y" : 391,
                "blendMode" : 0,
                "objectId" : "id71304747",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 785,
                "className" : "GDProperties",
                "y" : 391,
                "blendMode" : 0,
                "objectId" : "id545261099",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "1787302E-E8F6-4A4D-AFE1-4E54F5CD9B21",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1542871552l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {

                },
                "definition" : "7B67E70E-62E4-449F-940A-A4432E109E64",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id710930550l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 855,
                "className" : "GDProperties",
                "y" : 461,
                "blendMode" : 0,
                "objectId" : "id507512363",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 855,
                "className" : "GDProperties",
                "y" : 461,
                "blendMode" : 0,
                "objectId" : "id41944619",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "7E45B004-911E-4A26-94CC-B9429869D4CF",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1719436437l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {

                },
                "definition" : "B2F42D33-C253-48E9-8937-DDFB9BCD23BC",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1769984406l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                "backgroundBlur" : 0,
                "backgroundGradientIsRadial" : 0,
                "isMovable" : 1,
                "cornerRadiusTopLeft" : 0,
                "dropShadowSize" : 0,
                "horizontalAlignment" : 0,
                "isDisplay" : 1,
                "horizontalResizing" : 1,
                "layoutWrap" : 0,
                "borderTopType" : 0,
                "borderLeftType" : 0,
                "dropShadow" : 0,
                "customCSS" : "",
                "backgroundPainterType" : 0,
                "isContentClipped" : 1,
                "verticalAlignment" : 0,
                "fixedLayout" : 0,
                "isEditableText" : 0,
                "scrollable" : 0,
                "blendMode" : 0,
                "minimumHeight" : 3,
                "className" : "GDProperties",
                "drawingIndex" : 0,
                "textLineHeightMultiply" : 1,
                "borderBottomType" : 0,
                "paddingRight" : 8,
                "marginBottom" : 0,
                "isDropTarget" : 1,
                "textLineHeight" : 1,
                "marginRight" : 0,
                "textShadowOffset" : 2,
                "borderBottomWidth" : 0,
                "rotationAngle" : 0,
                "width" : 140,
                "flexHeightPercentage" : 100,
                "opacity" : 1,
                "flexWidthPercentage" : 100,
                "backgroundImageHorizontalAlignment" : 1,
                "verticalResizing" : 1,
                "backgroundImageVerticalOperation" : 0,
                "innerShadowAngle" : 315,
                "dropShadowOpacity" : 0.5,
                "borderRightColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "paddingBottom" : 8,
                "textShadowAngle" : 180,
                "borderRightType" : 0,
                "textOverflow" : 0,
                "innerShadowBlur" : 5,
                "dropShadowOffset" : 2,
                "marginTop" : 0,
                "dropShadowBlur" : 2,
                "isNestable" : 1,
                "isVisible" : 1,
                "innerShadowOffset" : 5,
                "borderTopColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "innerShadowOpacity" : 0.75,
                "constrainProportions" : 0,
                "marginLeft" : 0,
                "textShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "isDrawingReverted" : 0,
                "textTransform" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "Open Sans SemiBold",
                    "isItalic" : false,
                    "isBold" : true,
                    "fontName" : "OpenSans-SemiBold",
                    "familyName" : "Open Sans",
                    "fallback" : "",
                    "size" : 11,
                    "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
                  }
                },
                "activeHorizontalAlignment" : 0,
                "maximumWidth" : 1000000,
                "paddingLeft" : 8,
                "resizableInPresentationMode" : 0,
                "cellType" : 0,
                "maximumHeight" : 1000000,
                "backgroundColor" : {
                  "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                },
                "backgroundImageProportionalScale" : 1,
                "cornerRadiusTopRight" : 0,
                "borderLeftColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "textTraits" : 0,
                "textShadow" : 0,
                "textShadowBlur" : 1,
                "textShadowOpacity" : 0.5,
                "activeVerticalAlignment" : 0,
                "cornerRadiusBottomRight" : 0,
                "embedHTML" : "",
                "objectId" : "id432014891",
                "borderTopWidth" : 0,
                "dropShadowAngle" : 180,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "backgroundImageHorizontalOperation" : 0,
                "minimumWidth" : 3,
                "borderBottomColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "activeLayout" : 0,
                "borderLeftWidth" : 0,
                "dropShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "textHorizontalAlignment" : 1,
                "paddingTop" : 8,
                "textWordWrap" : 0,
                "innerShadow" : 0,
                "backgroundGradientAngle" : 0,
                "x" : 865,
                "isSelectable" : 1,
                "proportionalScale" : 0,
                "backgroundImageVerticalAlignment" : 1,
                "height" : 100,
                "cornerRadiusBottomLeft" : 0,
                "backgroundGradient" : {
                  "CTGradient" : {
                    "colorStops" : [
                      0.68000000000000005,
                      0.68000000000000005,
                      0.68000000000000005,
                      1,
                      0,
                      0.82999999999999996,
                      0.82999999999999996,
                      0.82999999999999996,
                      1,
                      1
                    ],
                    "count" : 2
                  }
                },
                "y" : 471,
                "layoutPolicyCode" : 3,
                "borderRightWidth" : 1,
                "textVerticalAlignment" : 1,
                "innerShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                }
              }
            },
            "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
            "objectId" : "id1072987600l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 2,
                    "textString" : "Ergebnis erzeugt",
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 2,
                    "layoutWrap" : 1,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 0,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 0,
                    "rotationAngle" : 0,
                    "width" : 66,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 2,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "OpenSans-Regular",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 13,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 2,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 2,
                    "embedHTML" : "",
                    "objectId" : "id138413611",
                    "borderTopWidth" : 0,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 0,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 0,
                    "paddingTop" : 0,
                    "textWordWrap" : 0,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 755,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 24,
                    "cornerRadiusBottomLeft" : 2,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 360.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 0,
                    "textVerticalAlignment" : 0,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
                "objectId" : "id1181510219l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          }
        ]
      },
      {
        "specificationCell" : 0,
        "styleProperties" : {
          "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
            "isEditableText" : 0,
            "x" : 350,
            "className" : "GDProperties",
            "y" : 250,
            "blendMode" : 0,
            "objectId" : "id629147179",
            "textTransform" : 0,
            "backgroundBlur" : 0,
            "scrollable" : 0,
            "textOverflow" : 0
          },
          "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
            "backgroundColor" : {
              "NSColorValue" : "1.000000,0.999990,0.999990,1.000000"
            },
            "textOverflow" : 0,
            "x" : 350,
            "className" : "GDProperties",
            "y" : 250,
            "blendMode" : 0,
            "objectId" : "id230688299",
            "textTransform" : 0,
            "backgroundBlur" : 0,
            "isEditableText" : 0,
            "scrollable" : 0
          }
        },
        "definition" : "145AEBAD-B449-4AEC-AF65-904CC25D7B0F",
        "className" : "GDWidgetInstanceRootCell",
        "eventHandlers" : [

        ],
        "activeState" : "37B66C56-8FBA-4B67-BB8D-76C395774FC0",
        "objectId" : "id1323633604l",
        "name" : "list-item",
        "orderedComponents" : [
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 755,
                "className" : "GDProperties",
                "y" : 360.5,
                "blendMode" : 0,
                "objectId" : "id306185771",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 755,
                "className" : "GDProperties",
                "y" : 360.5,
                "blendMode" : 0,
                "objectId" : "id33556011",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "1B71B6EA-22D5-4BF5-B615-BD37FA963847",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1581527473l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 4,
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 0,
                    "layoutWrap" : 0,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 1,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 1,
                    "rotationAngle" : 0,
                    "width" : 16,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 0,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans SemiBold",
                        "isItalic" : false,
                        "isBold" : true,
                        "fontName" : "OpenSans-SemiBold",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 11,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 4,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 4,
                    "embedHTML" : "",
                    "objectId" : "id662701611",
                    "borderTopWidth" : 1,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 1,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 1,
                    "paddingTop" : 0,
                    "textWordWrap" : 1,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 755,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 16,
                    "cornerRadiusBottomLeft" : 4,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 360.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 1,
                    "textVerticalAlignment" : 1,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
                "objectId" : "id1438088464l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "textOverflow" : 0,
                "x" : 765,
                "className" : "GDProperties",
                "y" : 371,
                "blendMode" : 0,
                "objectId" : "id675284523",
                "textTransform" : 0,
                "textHorizontalAlignment" : 0,
                "scrollable" : 0,
                "backgroundBlur" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "textOverflow" : 0,
                "x" : 765,
                "className" : "GDProperties",
                "y" : 371,
                "blendMode" : 0,
                "objectId" : "id532678187",
                "textTransform" : 0,
                "textHorizontalAlignment" : 0,
                "scrollable" : 0,
                "backgroundBlur" : 0
              }
            },
            "definition" : "1730DCC6-E2D6-4913-93D4-FEBC6F9DB5BE",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1400363127l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 980,
                    "className" : "GDProperties",
                    "textString" : "99",
                    "y" : 560,
                    "blendMode" : 0,
                    "objectId" : "id486540843",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                    "isEditableText" : 0,
                    "x" : 980,
                    "className" : "GDProperties",
                    "textString" : "99",
                    "y" : 560,
                    "blendMode" : 0,
                    "objectId" : "id281019947",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "631EBA86-D8EC-40C1-89F6-30DACFC6B136",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id252311069l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id301991467",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id566232619",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "7ABFF879-E077-4CC4-B6F4-BA9EE2E99523",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1336936418l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                    "layoutWrap" : 0,
                    "textString" : "",
                    "horizontalResizing" : 0,
                    "marginRight" : 0,
                    "verticalAlignment" : 1,
                    "flexHeightPercentage" : 13,
                    "backgroundImageProportionalScale" : 1,
                    "textColor" : {
                      "NSColorValue" : "0.721569,0.552941,0.054902,1.000000"
                    },
                    "backgroundColor" : {
                      "NSColorValue" : "0.358400,0.572766,0.640000,1.000000"
                    },
                    "layoutPolicyCode" : 2,
                    "borderLeftWidth" : 0,
                    "textTransform" : 0,
                    "borderRightWidth" : 0,
                    "backgroundPainterType" : 0,
                    "borderBottomWidth" : 0,
                    "minimumWidth" : 3,
                    "borderTopWidth" : 0,
                    "isEditableText" : 1,
                    "verticalResizing" : 2,
                    "x" : 980,
                    "objectId" : "id218105387",
                    "y" : 560,
                    "minimumHeight" : 3,
                    "height" : 13,
                    "className" : "GDProperties",
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "FontAwesome Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "FontAwesome",
                        "familyName" : "FontAwesome",
                        "fallback" : "",
                        "size" : 14,
                        "fontCSS" : "\n@font-face {\nfont-family: \"FontAwesome\";src:url(\"\/images\/FontAwesome.woff\") format(\"woff\"),local(\"FontAwesome Regular\")}"
                      }
                    },
                    "textOverflow" : 0,
                    "blendMode" : 0,
                    "width" : 16,
                    "backgroundBlur" : 0,
                    "scrollable" : 0
                  }
                },
                "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
                "objectId" : "id2050660477l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                "isEditableText" : 0,
                "x" : 815,
                "className" : "GDProperties",
                "y" : 421,
                "blendMode" : 0,
                "objectId" : "id247465515",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "E029BE08-4736-4BE8-A1C8-55A66084B11C" : {
                "isEditableText" : 0,
                "x" : 815,
                "className" : "GDProperties",
                "y" : 421,
                "blendMode" : 0,
                "objectId" : "id272631339",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                "isEditableText" : 0,
                "x" : 815,
                "className" : "GDProperties",
                "y" : 421,
                "blendMode" : 0,
                "objectId" : "id109053483",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                "isEditableText" : 0,
                "x" : 815,
                "className" : "GDProperties",
                "y" : 421,
                "blendMode" : 0,
                "objectId" : "id155190827",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "2FCC2970-D87A-4B33-AE3D-31728F55D72D",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [
              {
                "className" : "GDEventHandler",
                "objectId" : "id8390571",
                "eventType" : "GDMouseEnterEventType",
                "orderedActionSets" : [
                  {
                    "className" : "GDActionSet",
                    "orderedActions" : [
                      {
                        "className" : "GDToggleStateAction",
                        "animationCurve" : 0,
                        "animationDuration" : 0.20000000000000001,
                        "delay" : 0,
                        "animate" : 0,
                        "objectId" : "id192940011",
                        "firstState" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
                        "secondState" : "6943F577-5E51-4E5A-B3AE-C20120CBFFDB",
                        "specifier" : 0
                      }
                    ],
                    "objectId" : "id8390603",
                    "orderedElements" : [
                      "id185323289l"
                    ]
                  }
                ]
              },
              {
                "className" : "GDEventHandler",
                "objectId" : "id4196267",
                "eventType" : "GDMouseLeaveEventType",
                "orderedActionSets" : [
                  {
                    "className" : "GDActionSet",
                    "orderedActions" : [
                      {
                        "className" : "GDToggleStateAction",
                        "animationCurve" : 0,
                        "animationDuration" : 0.20000000000000001,
                        "delay" : 0,
                        "animate" : 0,
                        "objectId" : "id188745707",
                        "firstState" : "6943F577-5E51-4E5A-B3AE-C20120CBFFDB",
                        "secondState" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
                        "specifier" : 0
                      }
                    ],
                    "objectId" : "id4196299",
                    "orderedElements" : [
                      "id185323289l"
                    ]
                  }
                ]
              },
              {
                "className" : "GDEventHandler",
                "objectId" : "id25167787",
                "eventType" : "GDMouseClickEventType",
                "orderedActionSets" : [
                  {
                    "className" : "GDActionSet",
                    "orderedActions" : [
                      {
                        "className" : "GDGotoScreenAction",
                        "animationCurve" : 0,
                        "animationDuration" : 0.20000000000000001,
                        "delay" : 0,
                        "animate" : 0,
                        "objectId" : "id171968523",
                        "specifier" : 0
                      }
                    ],
                    "objectId" : "id12584907",
                    "orderedElements" : [
                      "id185323289l"
                    ]
                  }
                ]
              }
            ],
            "activeState" : "392E303A-091F-4F60-BDA7-AE04B01F1AAB",
            "objectId" : "id185323289l",
            "name" : "Ergebnis_indicator",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "blendMode" : 0,
                    "objectId" : "id201328171",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : 805,
                    "className" : "GDProperties",
                    "y" : 411,
                    "blendMode" : 0,
                    "objectId" : "id331351595",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "blendMode" : 0,
                    "objectId" : "id650118699",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "F2B29CD3-EBA8-41E7-A288-05E22126E1DC",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1411175042l",
                "name" : "Rectangle",
                "orderedComponents" : [
                  {
                    "specificationCell" : 0,
                    "styleProperties" : {
                      "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                        "isEditableText" : 0,
                        "x" : 1000,
                        "className" : "GDProperties",
                        "textString" : "",
                        "y" : 580,
                        "blendMode" : 0,
                        "objectId" : "id608175659",
                        "textTransform" : 0,
                        "backgroundBlur" : 0,
                        "scrollable" : 0,
                        "textOverflow" : 0
                      }
                    },
                    "definition" : "C306C731-A122-458E-AE5B-99299C9B7C9D",
                    "className" : "GDWidgetInstanceCell",
                    "eventHandlers" : [

                    ],
                    "objectId" : "id347286830l",
                    "name" : "Rectangle",
                    "orderedComponents" : [

                    ]
                  }
                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                    "isEditableText" : 0,
                    "x" : 1000,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 580,
                    "blendMode" : 0,
                    "objectId" : "id276825643",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : 1000,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 580,
                    "blendMode" : 0,
                    "objectId" : "id343934507",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "x" : 1000,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 580,
                    "blendMode" : 0,
                    "objectId" : "id188745259",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "F5BDF55B-F9BF-4E15-893A-A19EA80BDE42",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id2088984978l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : 1080,
                    "className" : "GDProperties",
                    "textString" : "",
                    "y" : 660,
                    "blendMode" : 0,
                    "objectId" : "id92276267",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "className" : "GDProperties",
                    "blendMode" : 0,
                    "objectId" : "id213911083",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "A111B5D0-2EBC-411B-9045-6EACFB963707",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1695327017l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "0C407D99-3DA4-40F3-B49F-2B3C18B10B98" : {
                    "isEditableText" : 0,
                    "x" : -21.5,
                    "className" : "GDProperties",
                    "textString" : "4",
                    "y" : -33,
                    "blendMode" : 0,
                    "objectId" : "id553649707",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "6943F577-5E51-4E5A-B3AE-C20120CBFFDB" : {
                    "isEditableText" : 0,
                    "x" : -21.5,
                    "className" : "GDProperties",
                    "textString" : "4",
                    "y" : -33,
                    "blendMode" : 0,
                    "objectId" : "id406849067",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "392E303A-091F-4F60-BDA7-AE04B01F1AAB" : {
                    "isEditableText" : 0,
                    "x" : -21.5,
                    "className" : "GDProperties",
                    "textString" : "4",
                    "y" : -33,
                    "blendMode" : 0,
                    "objectId" : "id322962987",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "60436C2B-601D-4FCF-84B7-416E447B7368",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1129177555l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 785,
                "className" : "GDProperties",
                "y" : 391,
                "blendMode" : 0,
                "objectId" : "id243271211",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 785,
                "className" : "GDProperties",
                "y" : 391,
                "blendMode" : 0,
                "objectId" : "id209716779",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "275E8989-1623-4FEA-9314-96BBAD9AF293",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1531304833l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 755,
                    "className" : "GDProperties",
                    "textString" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed ",
                    "y" : 360.5,
                    "blendMode" : 0,
                    "objectId" : "id180356651",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                    "isEditableText" : 0,
                    "x" : 755,
                    "className" : "GDProperties",
                    "textString" : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed ",
                    "y" : 360.5,
                    "blendMode" : 0,
                    "objectId" : "id176162347",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "144D04FF-19E4-43B6-82F9-AADB396A289E",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id428903870l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 835,
                "className" : "GDProperties",
                "y" : 441,
                "blendMode" : 0,
                "objectId" : "id452986411",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 835,
                "className" : "GDProperties",
                "y" : 441,
                "blendMode" : 0,
                "objectId" : "id515900971",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "9498B5C8-A49E-4D5E-A1AB-D730A20E6A97",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id2109313721l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                    "isEditableText" : 0,
                    "x" : 765,
                    "className" : "GDProperties",
                    "textString" : "12.04.2017, 17:30",
                    "y" : 370.5,
                    "blendMode" : 0,
                    "objectId" : "id163579435",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  },
                  "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                    "isEditableText" : 0,
                    "x" : 765,
                    "className" : "GDProperties",
                    "textString" : "12.04.2017, 17:30",
                    "y" : 370.5,
                    "blendMode" : 0,
                    "objectId" : "id356517419",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "BC93B44A-1C7C-499D-890D-082246A42292",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id624648802l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C9DFEF6E-76C9-459F-9EC5-A0873D723C0F" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id696256043",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              },
              "37B66C56-8FBA-4B67-BB8D-76C395774FC0" : {
                "isEditableText" : 0,
                "x" : 775,
                "className" : "GDProperties",
                "y" : 381,
                "blendMode" : 0,
                "objectId" : "id310380075",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "89D05B76-65E3-4014-9017-5D386AE1C0AB",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1869320288l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 2,
                    "textString" : "Silvio Werner",
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 2,
                    "layoutWrap" : 1,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 0,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 0,
                    "rotationAngle" : 0,
                    "width" : 78,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 2,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "OpenSans-Regular",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 13,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 2,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 2,
                    "embedHTML" : "",
                    "objectId" : "id352323115",
                    "borderTopWidth" : 0,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 0,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 0,
                    "paddingTop" : 0,
                    "textWordWrap" : 0,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 765,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 24,
                    "cornerRadiusBottomLeft" : 2,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 370.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 0,
                    "textVerticalAlignment" : 0,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
                "objectId" : "id2138302771l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                "backgroundBlur" : 0,
                "backgroundGradientIsRadial" : 0,
                "isMovable" : 1,
                "cornerRadiusTopLeft" : 0,
                "dropShadowSize" : 0,
                "horizontalAlignment" : 0,
                "isDisplay" : 1,
                "horizontalResizing" : 0,
                "layoutWrap" : 0,
                "borderTopType" : 0,
                "borderLeftType" : 0,
                "dropShadow" : 0,
                "customCSS" : "",
                "backgroundPainterType" : 0,
                "isContentClipped" : 1,
                "verticalAlignment" : 0,
                "fixedLayout" : 0,
                "isEditableText" : 0,
                "scrollable" : 0,
                "blendMode" : 0,
                "minimumHeight" : 3,
                "className" : "GDProperties",
                "drawingIndex" : 0,
                "textLineHeightMultiply" : 1,
                "borderBottomType" : 0,
                "paddingRight" : 8,
                "marginBottom" : 0,
                "isDropTarget" : 1,
                "textLineHeight" : 1,
                "marginRight" : 0,
                "textShadowOffset" : 2,
                "borderBottomWidth" : 0,
                "rotationAngle" : 0,
                "width" : 140,
                "flexHeightPercentage" : 100,
                "opacity" : 1,
                "flexWidthPercentage" : 100,
                "backgroundImageHorizontalAlignment" : 1,
                "verticalResizing" : 1,
                "backgroundImageVerticalOperation" : 0,
                "innerShadowAngle" : 315,
                "dropShadowOpacity" : 0.5,
                "borderRightColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "paddingBottom" : 8,
                "textShadowAngle" : 180,
                "borderRightType" : 0,
                "textOverflow" : 0,
                "innerShadowBlur" : 5,
                "dropShadowOffset" : 2,
                "marginTop" : 0,
                "dropShadowBlur" : 2,
                "isNestable" : 1,
                "isVisible" : 1,
                "innerShadowOffset" : 5,
                "borderTopColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "innerShadowOpacity" : 0.75,
                "constrainProportions" : 0,
                "marginLeft" : 0,
                "textShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "isDrawingReverted" : 0,
                "textTransform" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "Open Sans SemiBold",
                    "isItalic" : false,
                    "isBold" : true,
                    "fontName" : "OpenSans-SemiBold",
                    "familyName" : "Open Sans",
                    "fallback" : "",
                    "size" : 11,
                    "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
                  }
                },
                "activeHorizontalAlignment" : 0,
                "maximumWidth" : 1000000,
                "paddingLeft" : 8,
                "resizableInPresentationMode" : 0,
                "cellType" : 0,
                "maximumHeight" : 1000000,
                "backgroundColor" : {
                  "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                },
                "backgroundImageProportionalScale" : 1,
                "cornerRadiusTopRight" : 0,
                "borderLeftColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "textTraits" : 0,
                "textShadow" : 0,
                "textShadowBlur" : 1,
                "textShadowOpacity" : 0.5,
                "activeVerticalAlignment" : 0,
                "cornerRadiusBottomRight" : 0,
                "embedHTML" : "",
                "objectId" : "id75499051",
                "borderTopWidth" : 0,
                "dropShadowAngle" : 180,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "backgroundImageHorizontalOperation" : 0,
                "minimumWidth" : 3,
                "borderBottomColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "activeLayout" : 0,
                "borderLeftWidth" : 0,
                "dropShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "textHorizontalAlignment" : 1,
                "paddingTop" : 8,
                "textWordWrap" : 0,
                "innerShadow" : 0,
                "backgroundGradientAngle" : 0,
                "x" : 845,
                "isSelectable" : 1,
                "proportionalScale" : 0,
                "backgroundImageVerticalAlignment" : 1,
                "height" : 100,
                "cornerRadiusBottomLeft" : 0,
                "backgroundGradient" : {
                  "CTGradient" : {
                    "colorStops" : [
                      0.68000000000000005,
                      0.68000000000000005,
                      0.68000000000000005,
                      1,
                      0,
                      0.82999999999999996,
                      0.82999999999999996,
                      0.82999999999999996,
                      1,
                      1
                    ],
                    "count" : 2
                  }
                },
                "y" : 451,
                "layoutPolicyCode" : 3,
                "borderRightWidth" : 1,
                "textVerticalAlignment" : 1,
                "innerShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                }
              }
            },
            "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
            "objectId" : "id1019421957l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 2,
                    "textString" : "12.04.2017, 17:30",
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 2,
                    "layoutWrap" : 1,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 0,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 0,
                    "rotationAngle" : 0,
                    "width" : 66,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 2,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "OpenSans-Regular",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 13,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 2,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 2,
                    "embedHTML" : "",
                    "objectId" : "id339740203",
                    "borderTopWidth" : 0,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 0,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 0,
                    "paddingTop" : 0,
                    "textWordWrap" : 0,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 765,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 24,
                    "cornerRadiusBottomLeft" : 2,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 370.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 0,
                    "textVerticalAlignment" : 0,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
                "objectId" : "id807286608l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                "backgroundBlur" : 0,
                "backgroundGradientIsRadial" : 0,
                "isMovable" : 1,
                "cornerRadiusTopLeft" : 0,
                "dropShadowSize" : 0,
                "horizontalAlignment" : 0,
                "isDisplay" : 1,
                "horizontalResizing" : 0,
                "layoutWrap" : 0,
                "borderTopType" : 0,
                "borderLeftType" : 0,
                "dropShadow" : 0,
                "customCSS" : "",
                "backgroundPainterType" : 0,
                "isContentClipped" : 1,
                "verticalAlignment" : 0,
                "fixedLayout" : 0,
                "isEditableText" : 0,
                "scrollable" : 0,
                "blendMode" : 0,
                "minimumHeight" : 3,
                "className" : "GDProperties",
                "drawingIndex" : 0,
                "textLineHeightMultiply" : 1,
                "borderBottomType" : 0,
                "paddingRight" : 8,
                "marginBottom" : 0,
                "isDropTarget" : 1,
                "textLineHeight" : 1,
                "marginRight" : 0,
                "textShadowOffset" : 2,
                "borderBottomWidth" : 0,
                "rotationAngle" : 0,
                "width" : 160,
                "flexHeightPercentage" : 100,
                "opacity" : 1,
                "flexWidthPercentage" : 100,
                "backgroundImageHorizontalAlignment" : 1,
                "verticalResizing" : 1,
                "backgroundImageVerticalOperation" : 0,
                "innerShadowAngle" : 315,
                "dropShadowOpacity" : 0.5,
                "borderRightColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "paddingBottom" : 8,
                "textShadowAngle" : 180,
                "borderRightType" : 0,
                "textOverflow" : 0,
                "innerShadowBlur" : 5,
                "dropShadowOffset" : 2,
                "marginTop" : 0,
                "dropShadowBlur" : 2,
                "isNestable" : 1,
                "isVisible" : 1,
                "innerShadowOffset" : 5,
                "borderTopColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "innerShadowOpacity" : 0.75,
                "constrainProportions" : 0,
                "marginLeft" : 0,
                "textShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "isDrawingReverted" : 0,
                "textTransform" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "Open Sans SemiBold",
                    "isItalic" : false,
                    "isBold" : true,
                    "fontName" : "OpenSans-SemiBold",
                    "familyName" : "Open Sans",
                    "fallback" : "",
                    "size" : 11,
                    "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
                  }
                },
                "activeHorizontalAlignment" : 0,
                "maximumWidth" : 1000000,
                "paddingLeft" : 8,
                "resizableInPresentationMode" : 0,
                "cellType" : 0,
                "maximumHeight" : 1000000,
                "backgroundColor" : {
                  "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                },
                "backgroundImageProportionalScale" : 1,
                "cornerRadiusTopRight" : 0,
                "borderLeftColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "textTraits" : 0,
                "textShadow" : 0,
                "textShadowBlur" : 1,
                "textShadowOpacity" : 0.5,
                "activeVerticalAlignment" : 0,
                "cornerRadiusBottomRight" : 0,
                "embedHTML" : "",
                "objectId" : "id327157291",
                "borderTopWidth" : 0,
                "dropShadowAngle" : 180,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "backgroundImageHorizontalOperation" : 0,
                "minimumWidth" : 3,
                "borderBottomColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "activeLayout" : 0,
                "borderLeftWidth" : 0,
                "dropShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "textHorizontalAlignment" : 1,
                "paddingTop" : 8,
                "textWordWrap" : 0,
                "innerShadow" : 0,
                "backgroundGradientAngle" : 0,
                "x" : 785,
                "isSelectable" : 1,
                "proportionalScale" : 0,
                "backgroundImageVerticalAlignment" : 1,
                "height" : 100,
                "cornerRadiusBottomLeft" : 0,
                "backgroundGradient" : {
                  "CTGradient" : {
                    "colorStops" : [
                      0.68000000000000005,
                      0.68000000000000005,
                      0.68000000000000005,
                      1,
                      0,
                      0.82999999999999996,
                      0.82999999999999996,
                      0.82999999999999996,
                      1,
                      1
                    ],
                    "count" : 2
                  }
                },
                "y" : 390.5,
                "layoutPolicyCode" : 3,
                "borderRightWidth" : 1,
                "textVerticalAlignment" : 1,
                "innerShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                }
              }
            },
            "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
            "objectId" : "id413039672l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 2,
                    "textString" : "Silvio Werner",
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 2,
                    "layoutWrap" : 1,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 0,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 0,
                    "rotationAngle" : 0,
                    "width" : 78,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 2,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "OpenSans-Regular",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 13,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 2,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 2,
                    "embedHTML" : "",
                    "objectId" : "id251659819",
                    "borderTopWidth" : 0,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 0,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 0,
                    "paddingTop" : 0,
                    "textWordWrap" : 0,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 765,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 24,
                    "cornerRadiusBottomLeft" : 2,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 370.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 0,
                    "textVerticalAlignment" : 0,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
                "objectId" : "id1354622347l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                "backgroundBlur" : 0,
                "backgroundGradientIsRadial" : 0,
                "isMovable" : 1,
                "cornerRadiusTopLeft" : 0,
                "dropShadowSize" : 0,
                "horizontalAlignment" : 0,
                "isDisplay" : 1,
                "horizontalResizing" : 0,
                "layoutWrap" : 0,
                "borderTopType" : 0,
                "borderLeftType" : 0,
                "dropShadow" : 0,
                "customCSS" : "",
                "backgroundPainterType" : 0,
                "isContentClipped" : 1,
                "verticalAlignment" : 0,
                "fixedLayout" : 0,
                "isEditableText" : 0,
                "scrollable" : 0,
                "blendMode" : 0,
                "minimumHeight" : 3,
                "className" : "GDProperties",
                "drawingIndex" : 0,
                "textLineHeightMultiply" : 1,
                "borderBottomType" : 0,
                "paddingRight" : 8,
                "marginBottom" : 0,
                "isDropTarget" : 1,
                "textLineHeight" : 1,
                "marginRight" : 0,
                "textShadowOffset" : 2,
                "borderBottomWidth" : 0,
                "rotationAngle" : 0,
                "width" : 140,
                "flexHeightPercentage" : 100,
                "opacity" : 1,
                "flexWidthPercentage" : 100,
                "backgroundImageHorizontalAlignment" : 1,
                "verticalResizing" : 1,
                "backgroundImageVerticalOperation" : 0,
                "innerShadowAngle" : 315,
                "dropShadowOpacity" : 0.5,
                "borderRightColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "paddingBottom" : 8,
                "textShadowAngle" : 180,
                "borderRightType" : 0,
                "textOverflow" : 0,
                "innerShadowBlur" : 5,
                "dropShadowOffset" : 2,
                "marginTop" : 0,
                "dropShadowBlur" : 2,
                "isNestable" : 1,
                "isVisible" : 1,
                "innerShadowOffset" : 5,
                "borderTopColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "innerShadowOpacity" : 0.75,
                "constrainProportions" : 0,
                "marginLeft" : 0,
                "textShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "isDrawingReverted" : 0,
                "textTransform" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "Open Sans SemiBold",
                    "isItalic" : false,
                    "isBold" : true,
                    "fontName" : "OpenSans-SemiBold",
                    "familyName" : "Open Sans",
                    "fallback" : "",
                    "size" : 11,
                    "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
                  }
                },
                "activeHorizontalAlignment" : 0,
                "maximumWidth" : 1000000,
                "paddingLeft" : 8,
                "resizableInPresentationMode" : 0,
                "cellType" : 0,
                "maximumHeight" : 1000000,
                "backgroundColor" : {
                  "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                },
                "backgroundImageProportionalScale" : 1,
                "cornerRadiusTopRight" : 0,
                "borderLeftColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "textTraits" : 0,
                "textShadow" : 0,
                "textShadowBlur" : 1,
                "textShadowOpacity" : 0.5,
                "activeVerticalAlignment" : 0,
                "cornerRadiusBottomRight" : 0,
                "embedHTML" : "",
                "objectId" : "id255854123",
                "borderTopWidth" : 0,
                "dropShadowAngle" : 180,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "backgroundImageHorizontalOperation" : 0,
                "minimumWidth" : 3,
                "borderBottomColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "activeLayout" : 0,
                "borderLeftWidth" : 0,
                "dropShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "textHorizontalAlignment" : 1,
                "paddingTop" : 8,
                "textWordWrap" : 0,
                "innerShadow" : 0,
                "backgroundGradientAngle" : 0,
                "x" : 855,
                "isSelectable" : 1,
                "proportionalScale" : 0,
                "backgroundImageVerticalAlignment" : 1,
                "height" : 100,
                "cornerRadiusBottomLeft" : 0,
                "backgroundGradient" : {
                  "CTGradient" : {
                    "colorStops" : [
                      0.68000000000000005,
                      0.68000000000000005,
                      0.68000000000000005,
                      1,
                      0,
                      0.82999999999999996,
                      0.82999999999999996,
                      0.82999999999999996,
                      1,
                      1
                    ],
                    "count" : 2
                  }
                },
                "y" : 461,
                "layoutPolicyCode" : 3,
                "borderRightWidth" : 1,
                "textVerticalAlignment" : 1,
                "innerShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                }
              }
            },
            "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
            "objectId" : "id2001026950l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 2,
                    "textString" : "12.04.2017, 17:30",
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 2,
                    "layoutWrap" : 1,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 0,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 0,
                    "rotationAngle" : 0,
                    "width" : 66,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 2,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "OpenSans-Regular",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 13,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:url(\"\/images\/OpenSans-Regular.woff\") format(\"woff\"),local(\"Open Sans Regular\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 2,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 2,
                    "embedHTML" : "",
                    "objectId" : "id562038315",
                    "borderTopWidth" : 0,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 0,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 0,
                    "paddingTop" : 0,
                    "textWordWrap" : 0,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 765,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 24,
                    "cornerRadiusBottomLeft" : 2,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 370.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 0,
                    "textVerticalAlignment" : 0,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidgetRootCellDefinition\/p1",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
                "objectId" : "id392828458l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                "backgroundBlur" : 0,
                "backgroundGradientIsRadial" : 0,
                "isMovable" : 1,
                "cornerRadiusTopLeft" : 0,
                "dropShadowSize" : 0,
                "horizontalAlignment" : 0,
                "isDisplay" : 1,
                "horizontalResizing" : 1,
                "layoutWrap" : 0,
                "borderTopType" : 0,
                "borderLeftType" : 0,
                "dropShadow" : 0,
                "customCSS" : "",
                "backgroundPainterType" : 0,
                "isContentClipped" : 1,
                "verticalAlignment" : 0,
                "fixedLayout" : 0,
                "isEditableText" : 0,
                "scrollable" : 0,
                "blendMode" : 0,
                "minimumHeight" : 3,
                "className" : "GDProperties",
                "drawingIndex" : 0,
                "textLineHeightMultiply" : 1,
                "borderBottomType" : 0,
                "paddingRight" : 8,
                "marginBottom" : 0,
                "isDropTarget" : 1,
                "textLineHeight" : 1,
                "marginRight" : 0,
                "textShadowOffset" : 2,
                "borderBottomWidth" : 0,
                "rotationAngle" : 0,
                "width" : 140,
                "flexHeightPercentage" : 100,
                "opacity" : 1,
                "flexWidthPercentage" : 100,
                "backgroundImageHorizontalAlignment" : 1,
                "verticalResizing" : 1,
                "backgroundImageVerticalOperation" : 0,
                "innerShadowAngle" : 315,
                "dropShadowOpacity" : 0.5,
                "borderRightColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "paddingBottom" : 8,
                "textShadowAngle" : 180,
                "borderRightType" : 0,
                "textOverflow" : 0,
                "innerShadowBlur" : 5,
                "dropShadowOffset" : 2,
                "marginTop" : 0,
                "dropShadowBlur" : 2,
                "isNestable" : 1,
                "isVisible" : 1,
                "innerShadowOffset" : 5,
                "borderTopColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "innerShadowOpacity" : 0.75,
                "constrainProportions" : 0,
                "marginLeft" : 0,
                "textShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "isDrawingReverted" : 0,
                "textTransform" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "Open Sans SemiBold",
                    "isItalic" : false,
                    "isBold" : true,
                    "fontName" : "OpenSans-SemiBold",
                    "familyName" : "Open Sans",
                    "fallback" : "",
                    "size" : 11,
                    "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-SemiBold\";src:local(\"Open Sans SemiBold\")}"
                  }
                },
                "activeHorizontalAlignment" : 0,
                "maximumWidth" : 1000000,
                "paddingLeft" : 8,
                "resizableInPresentationMode" : 0,
                "cellType" : 0,
                "maximumHeight" : 1000000,
                "backgroundColor" : {
                  "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                },
                "backgroundImageProportionalScale" : 1,
                "cornerRadiusTopRight" : 0,
                "borderLeftColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "textTraits" : 0,
                "textShadow" : 0,
                "textShadowBlur" : 1,
                "textShadowOpacity" : 0.5,
                "activeVerticalAlignment" : 0,
                "cornerRadiusBottomRight" : 0,
                "embedHTML" : "",
                "objectId" : "id708838955",
                "borderTopWidth" : 0,
                "dropShadowAngle" : 180,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "backgroundImageHorizontalOperation" : 0,
                "minimumWidth" : 3,
                "borderBottomColor" : {
                  "NSColorValue" : "0.976471,0.976471,0.976471,1.000000"
                },
                "activeLayout" : 0,
                "borderLeftWidth" : 0,
                "dropShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "textHorizontalAlignment" : 1,
                "paddingTop" : 8,
                "textWordWrap" : 0,
                "innerShadow" : 0,
                "backgroundGradientAngle" : 0,
                "x" : 875,
                "isSelectable" : 1,
                "proportionalScale" : 0,
                "backgroundImageVerticalAlignment" : 1,
                "height" : 100,
                "cornerRadiusBottomLeft" : 0,
                "backgroundGradient" : {
                  "CTGradient" : {
                    "colorStops" : [
                      0.68000000000000005,
                      0.68000000000000005,
                      0.68000000000000005,
                      1,
                      0,
                      0.82999999999999996,
                      0.82999999999999996,
                      0.82999999999999996,
                      1,
                      1
                    ],
                    "count" : 2
                  }
                },
                "y" : 481,
                "layoutPolicyCode" : 3,
                "borderRightWidth" : 1,
                "textVerticalAlignment" : 1,
                "innerShadowColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                }
              }
            },
            "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
            "objectId" : "id750010251l",
            "name" : "Rectangle",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                    "backgroundBlur" : 0,
                    "backgroundGradientIsRadial" : 0,
                    "isMovable" : 1,
                    "cornerRadiusTopLeft" : 2,
                    "textString" : "Abfragedefinition geändert",
                    "dropShadowSize" : 0,
                    "horizontalAlignment" : 0,
                    "isDisplay" : 1,
                    "horizontalResizing" : 2,
                    "layoutWrap" : 1,
                    "borderTopType" : 0,
                    "borderLeftType" : 0,
                    "dropShadow" : 0,
                    "customCSS" : "",
                    "backgroundPainterType" : 0,
                    "isContentClipped" : 1,
                    "verticalAlignment" : 0,
                    "fixedLayout" : 0,
                    "isEditableText" : 0,
                    "scrollable" : 0,
                    "blendMode" : 0,
                    "minimumHeight" : 3,
                    "className" : "GDProperties",
                    "drawingIndex" : 0,
                    "textLineHeightMultiply" : 1,
                    "borderBottomType" : 0,
                    "paddingRight" : 0,
                    "marginBottom" : 0,
                    "isDropTarget" : 1,
                    "textLineHeight" : 1,
                    "marginRight" : 0,
                    "textShadowOffset" : 2,
                    "borderBottomWidth" : 0,
                    "rotationAngle" : 0,
                    "width" : 66,
                    "flexHeightPercentage" : 100,
                    "opacity" : 1,
                    "flexWidthPercentage" : 100,
                    "backgroundImageHorizontalAlignment" : 1,
                    "verticalResizing" : 2,
                    "backgroundImageVerticalOperation" : 0,
                    "innerShadowAngle" : 315,
                    "dropShadowOpacity" : 0.5,
                    "borderRightColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "paddingBottom" : 0,
                    "textShadowAngle" : 180,
                    "borderRightType" : 0,
                    "textOverflow" : 0,
                    "innerShadowBlur" : 5,
                    "dropShadowOffset" : 2,
                    "marginTop" : 0,
                    "dropShadowBlur" : 2,
                    "isNestable" : 1,
                    "isVisible" : 1,
                    "innerShadowOffset" : 5,
                    "borderTopColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "innerShadowOpacity" : 0.75,
                    "constrainProportions" : 0,
                    "marginLeft" : 0,
                    "textShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "isDrawingReverted" : 0,
                    "textTransform" : 0,
                    "textFont" : {
                      "GDFont" : {
                        "displayName" : "Open Sans Regular",
                        "isItalic" : false,
                        "isBold" : false,
                        "fontName" : "OpenSans-Regular",
                        "familyName" : "Open Sans",
                        "fallback" : "",
                        "size" : 13,
                        "fontCSS" : "\n@font-face {\nfont-family: \"OpenSans-Regular\";src:local(\"Open Sans Regular\")}"
                      }
                    },
                    "activeHorizontalAlignment" : 0,
                    "maximumWidth" : 1000000,
                    "paddingLeft" : 0,
                    "resizableInPresentationMode" : 0,
                    "cellType" : 0,
                    "maximumHeight" : 1000000,
                    "backgroundColor" : {
                      "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
                    },
                    "backgroundImageProportionalScale" : 1,
                    "cornerRadiusTopRight" : 2,
                    "borderLeftColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "textTraits" : 0,
                    "textShadow" : 0,
                    "textShadowBlur" : 1,
                    "textShadowOpacity" : 0.5,
                    "activeVerticalAlignment" : 0,
                    "cornerRadiusBottomRight" : 2,
                    "embedHTML" : "",
                    "objectId" : "id50333227",
                    "borderTopWidth" : 0,
                    "dropShadowAngle" : 180,
                    "textColor" : {
                      "NSColorValue" : "0.250980,0.250980,0.250980,1.000000"
                    },
                    "backgroundImageHorizontalOperation" : 0,
                    "minimumWidth" : 3,
                    "borderBottomColor" : {
                      "NSColorValue" : "0.789997,0.790000,0.789992,1.000000"
                    },
                    "activeLayout" : 0,
                    "borderLeftWidth" : 0,
                    "dropShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    },
                    "textHorizontalAlignment" : 0,
                    "paddingTop" : 0,
                    "textWordWrap" : 0,
                    "innerShadow" : 0,
                    "backgroundGradientAngle" : 0,
                    "x" : 755,
                    "isSelectable" : 1,
                    "proportionalScale" : 0,
                    "backgroundImageVerticalAlignment" : 1,
                    "height" : 24,
                    "cornerRadiusBottomLeft" : 2,
                    "backgroundGradient" : {
                      "CTGradient" : {
                        "colorStops" : [
                          0.68000000000000005,
                          0.68000000000000005,
                          0.68000000000000005,
                          1,
                          0,
                          0.82999999999999996,
                          0.82999999999999996,
                          0.82999999999999996,
                          1,
                          1
                        ],
                        "count" : 2
                      }
                    },
                    "y" : 360.5,
                    "layoutPolicyCode" : 2,
                    "borderRightWidth" : 0,
                    "textVerticalAlignment" : 0,
                    "innerShadowColor" : {
                      "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                    }
                  }
                },
                "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
                "className" : "GDWidgetInstanceRootCell",
                "eventHandlers" : [

                ],
                "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
                "objectId" : "id564473852l",
                "name" : "Rectangle",
                "orderedComponents" : [

                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
var currentScreenIndex = 0
    let fixture = document.getElementById("qunit-fixture")
    let atContainer = document.createElement("div")
    fixture.appendChild(atContainer);
    let antetype = new AntetypeWeb(atContainer);
    antetype.loadProjectFromJSON(projectJSON);
    antetype.changeScreenFromJSON(screenJSON[currentScreenIndex]);
    return antetype;
}

