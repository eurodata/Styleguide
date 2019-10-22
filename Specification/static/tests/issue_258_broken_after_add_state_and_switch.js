"use strict";

/*
    trying to test the javascript-side. in buildAntetypeWeb() the json generated in 
    export "Web Viewer" is used to build the JavaScript-side of things. 

    the testcase is really only a small start. 

*/

QUnit.module("Issue #258 broken after add state and switch" , {
    beforeEach: function()  {
        this.at = buildAntetypeWeb258();
    }, 

    afterEach: function() {
        document.head.removeChild(this.at._fontStyleSheet.ownerNode);
        let lf = this.at.project.currentLookAndFeel;
        document.head.removeChild(lf.cssStyleSheet._styleSheet.ownerNode);
        document.head.removeChild(lf.breakPointStyleSheet._styleSheet.ownerNode);
    }
});

QUnit.test("addState", function(assert) {
    let widget = this.at.project.widgets.find( w => w.name == "lasche" )
    assert.ok(widget != null)
    
});
 

function buildAntetypeWeb258() {

var projectJSON = {
  "orderedScreenCount" : 1,
  "designBreakPoints" : [

  ],
  "className" : "GDProject",
  "projectLibrary" : {
    "className" : "GDLibrary",
    "objectId" : "id4195435",
    "widgets" : [
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0,
            "animate" : false,
            "objectId" : "id1172750495l",
            "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidget\/p19",
        "objectId" : "id58721547",
        "type" : 1,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1207082470l",
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
            "objectId" : "id132891731l",
            "identifier" : "D052DC27-2983-4200-8840-BC589C022D5D",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1321993143l",
            "identifier" : "34942F53-64CB-4993-A462-C9C1B4544366",
            "type" : 100,
            "name" : "Kieferorthopädie"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1585802442l",
            "identifier" : "0536D012-C4CE-4C66-B7DB-53F94C76F4B7",
            "type" : 100,
            "name" : "Keine Zuordnung"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id666728801l",
            "identifier" : "E51EE011-BE48-4FAB-B4AB-992A0904AF22",
            "type" : 100,
            "name" : "Endodontie"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id2038403926l",
            "identifier" : "602DB8AE-A390-4693-8CAD-2631904B3724",
            "type" : 1,
            "name" : "Mouse Over"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id221060491l",
            "identifier" : "09920D1E-0B39-4632-957F-8DC13B35C3E3",
            "type" : 100,
            "name" : "Prophylaxe"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id96341814l",
            "identifier" : "3FD7D44B-8466-4EE2-9EC4-459CD0BFD289",
            "type" : 100,
            "name" : "Implantologie"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "93F8C0DD-0A31-4AF6-968A-A8A7BD23F743",
        "objectId" : "id8389899",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id165153208l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "00955B2F-80B4-4B58-8A6D-E754FEC2BAFA"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id365223138l",
          "name" : "tile-tag",
          "individualContent" : false,
          "identifier" : "3B0BB1D0-8B2E-43D2-AE11-D21FF92BF44C"
        },
        "name" : "tile-tag"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id2003935273l",
            "identifier" : "6B4E1BC8-83C9-492D-A7BB-278543AECC50",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1144909755l",
            "identifier" : "BB462431-752E-422B-A67E-AA24D237EB71",
            "type" : 100,
            "name" : "copllpased"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id340259927l",
            "identifier" : "46CE591E-9D78-42BE-B857-2466EC64E72F",
            "type" : 100,
            "name" : "favorite group"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1546123167l",
            "identifier" : "A09E44C7-24C8-4415-93C9-F15D5D00D073",
            "type" : 100,
            "name" : "Selected"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "3953B35F-5A92-4BEF-B3B4-8F06DE9675F4",
        "objectId" : "id41944331",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1876936944l",
              "name" : "icon-24",
              "individualContent" : false,
              "identifier" : "44FB20DC-C9CE-45B0-AD97-4620D543DCD5"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id914857970l",
                  "name" : "Circle",
                  "individualContent" : false,
                  "identifier" : "8B417092-1EA2-428E-BDD5-CABE11FCA864"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1887218275l",
              "name" : "Highlight",
              "individualContent" : false,
              "identifier" : "7DB406F2-407F-44AA-91D5-CB964E7FAFFB"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1786210784l",
          "name" : "favorite",
          "individualContent" : false,
          "identifier" : "BEB7157C-B4C2-49A2-882C-4C33155BE936"
        },
        "name" : "favorite"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id333148717l",
            "identifier" : "B87CF65D-C6FE-4E52-BF46-63F23AE40F63",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id652983007l",
            "identifier" : "FEFA83D6-494A-4D42-BDD9-7A3477B651E8",
            "type" : 1,
            "name" : "Mouse Over"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "0A9F0DB4-596F-43AD-8CC4-3DD5B6FEB819",
        "objectId" : "id12584203",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1943405631l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "DFA08E1F-E049-4F4F-A73E-2D9C0DDEAC9B"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1728433151l",
          "name" : "text-box",
          "individualContent" : false,
          "identifier" : "BF5341D5-63F9-4197-A0D7-72631C87415C"
        },
        "name" : "text-box"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id297998557l",
            "identifier" : "32154893-2965-4181-A9E3-EDE681D1678F",
            "type" : 1,
            "name" : "Mouse Over"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1318033661l",
            "identifier" : "0E1500B9-0479-43C4-A190-DD665B281779",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1058998242l",
            "identifier" : "25CAFC55-64A1-489A-B7D3-D23CF1219B1C",
            "type" : 100,
            "name" : "checked"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "377F3A88-C0A1-4920-ABA3-FE4CA329DD0D",
        "objectId" : "id25167115",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id430327301l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "5B03E4C4-0C9E-418A-AB0A-29A2446DD3D6"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1698344764l",
                  "name" : "icon-24",
                  "individualContent" : false,
                  "identifier" : "1936D789-DED6-4FD9-9557-BDC5E13F7C8F"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1418959055l",
              "name" : "icon",
              "individualContent" : false,
              "identifier" : "6B89FD1E-3792-4499-A24C-5EBB6F94CAD0"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id680146972l",
          "name" : "list-item-icon",
          "individualContent" : false,
          "identifier" : "C85EB0B4-4F02-45EE-BB57-7F232BD20F3B"
        },
        "name" : "list-item-icon"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1120960498l",
            "identifier" : "44D56948-42A0-4790-87B8-056BD70ECEA9",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "FB5C629A-EAA4-48D8-BDA0-65DB346FD10E",
        "objectId" : "id20972811",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1018197791l",
          "name" : "icon-24",
          "individualContent" : false,
          "identifier" : "04F0A6B0-7394-41B1-8388-588A0410370A"
        },
        "name" : "icon-24"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id708222029l",
            "identifier" : "835DEC25-E40F-468E-B625-AF7003261F35",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1490124461l",
            "identifier" : "F90B8DC8-A16D-4C49-B820-CCD589A99526",
            "type" : 100,
            "name" : "With Placeholders"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "27E51422-09EE-4B57-B4CA-9825C0E07392",
        "objectId" : "id16778507",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1239004633l",
              "name" : "column",
              "individualContent" : true,
              "identifier" : "C93F9E2F-40CA-40D8-B51D-C638548492C6"
            },
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1743138484l",
              "name" : "column",
              "individualContent" : true,
              "identifier" : "CD07CD36-9633-40B8-B25C-FCF6FEE29DBF"
            },
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id658023020l",
              "name" : "column",
              "individualContent" : true,
              "identifier" : "7596086D-4A6E-4510-A860-0F050BA42071"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1789880459l",
          "name" : "3-row",
          "individualContent" : false,
          "identifier" : "1F8E4A5F-0713-4FA5-853D-3BE25C4A9941"
        },
        "name" : "3-row"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id696202700l",
            "identifier" : "DFF37F5D-8572-4DCE-9031-85785C777F4D",
            "type" : 1,
            "name" : "Mouse Over"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1642368612l",
            "identifier" : "D6F73AAA-9F51-4FD6-A308-62C3294EA712",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "6FF22B2D-0DCB-4C6F-AFC8-5487DFBF73D4",
        "objectId" : "id37750027",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id922508759l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "8A7A33D6-FB2B-47B4-9040-4C892591787D"
                },
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1258483929l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "2359474A-CE1C-4875-AB49-DD78ECC6DA5E"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id376570554l",
              "name" : "preview",
              "individualContent" : false,
              "identifier" : "77E678AD-79D5-4523-8220-5EB97D6C4CFE"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [
                        {
                          "orderedComponents" : [
                            {
                              "orderedComponents" : [

                              ],
                              "className" : "GDWidgetCellDefinition",
                              "objectId" : "id1738274078l",
                              "name" : "Rectangle",
                              "individualContent" : false,
                              "identifier" : "745DFA5B-C689-4C2E-B2EB-50DA82A12B05"
                            }
                          ],
                          "className" : "GDEmbeddedWidgetDefinition",
                          "objectId" : "id1903762164l",
                          "name" : "text-box",
                          "individualContent" : false,
                          "identifier" : "2B8DD8E5-B22B-4B94-BE27-BE5FAAE721DB"
                        },
                        {
                          "orderedComponents" : [

                          ],
                          "className" : "GDWidgetCellDefinition",
                          "objectId" : "id2008925055l",
                          "name" : "context",
                          "individualContent" : false,
                          "identifier" : "BBFC13BE-285A-43C1-8997-5E4219F3FEF0"
                        },
                        {
                          "orderedComponents" : [
                            {
                              "orderedComponents" : [

                              ],
                              "className" : "GDEmbeddedWidgetDefinition",
                              "objectId" : "id492889599l",
                              "name" : "icon-24",
                              "individualContent" : false,
                              "identifier" : "ECDDE8AC-420E-4E9A-AE89-6C723F2C892C"
                            },
                            {
                              "orderedComponents" : [
                                {
                                  "orderedComponents" : [

                                  ],
                                  "className" : "GDWidgetCellDefinition",
                                  "objectId" : "id56597020l",
                                  "name" : "Circle",
                                  "individualContent" : false,
                                  "identifier" : "268E7A91-63B3-4866-AFC0-FDF0C97B507F"
                                }
                              ],
                              "className" : "GDWidgetCellDefinition",
                              "objectId" : "id1201338396l",
                              "name" : "Highlight",
                              "individualContent" : false,
                              "identifier" : "87554C97-97D1-48D8-B9E5-C3F453B68DB8"
                            }
                          ],
                          "className" : "GDEmbeddedWidgetDefinition",
                          "objectId" : "id1609218452l",
                          "name" : "favorite",
                          "individualContent" : false,
                          "identifier" : "37D439C2-4041-4C2A-B3AA-1E2A184947DD"
                        }
                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id219889182l",
                      "name" : "Vertical Flow Group",
                      "individualContent" : false,
                      "identifier" : "856253CE-5113-4007-A930-CFBDF2698DEF"
                    },
                    {
                      "orderedComponents" : [
                        {
                          "orderedComponents" : [
                            {
                              "orderedComponents" : [
                                {
                                  "orderedComponents" : [
                                    {
                                      "orderedComponents" : [
                                        {
                                          "orderedComponents" : [

                                          ],
                                          "className" : "GDWidgetCellDefinition",
                                          "objectId" : "id1580978060l",
                                          "name" : "Rectangle",
                                          "individualContent" : false,
                                          "identifier" : "AF510C65-7143-4244-ADDB-F545734E9659"
                                        }
                                      ],
                                      "className" : "GDEmbeddedWidgetDefinition",
                                      "objectId" : "id279565325l",
                                      "name" : "list-item",
                                      "individualContent" : false,
                                      "identifier" : "0BF1AB61-9D76-407F-A614-EEAC94ECE0F6"
                                    },
                                    {
                                      "orderedComponents" : [
                                        {
                                          "orderedComponents" : [

                                          ],
                                          "className" : "GDWidgetCellDefinition",
                                          "objectId" : "id1339641391l",
                                          "name" : "Rectangle",
                                          "individualContent" : false,
                                          "identifier" : "4ABF2480-EE28-49A7-B5EA-C9243090B602"
                                        }
                                      ],
                                      "className" : "GDEmbeddedWidgetDefinition",
                                      "objectId" : "id1572022338l",
                                      "name" : "list-item",
                                      "individualContent" : false,
                                      "identifier" : "C648A30D-A1A5-497E-8195-14B55EA60077"
                                    }
                                  ],
                                  "className" : "GDEmbeddedWidgetDefinition",
                                  "objectId" : "id1866385165l",
                                  "name" : "label-list",
                                  "individualContent" : false,
                                  "identifier" : "7BCE6676-FAF5-4ABC-BE08-73D30BAD1AC2"
                                }
                              ],
                              "className" : "GDWidgetCellDefinition",
                              "objectId" : "id1121814667l",
                              "name" : "list",
                              "individualContent" : false,
                              "identifier" : "DC34BBD9-840F-4E46-9F45-55AA8495500C"
                            }
                          ],
                          "className" : "GDWidgetCellDefinition",
                          "objectId" : "id277761570l",
                          "name" : "Rectangle",
                          "individualContent" : false,
                          "identifier" : "5A744A7F-7629-4587-A25D-50D328AF0C82"
                        },
                        {
                          "orderedComponents" : [
                            {
                              "orderedComponents" : [
                                {
                                  "orderedComponents" : [

                                  ],
                                  "className" : "GDWidgetCellDefinition",
                                  "objectId" : "id1531566611l",
                                  "name" : "Rectangle",
                                  "individualContent" : false,
                                  "identifier" : "2F308011-F67C-40B2-86EA-1B8E9432C655"
                                }
                              ],
                              "className" : "GDEmbeddedWidgetDefinition",
                              "objectId" : "id532700516l",
                              "name" : "tile-tag",
                              "individualContent" : false,
                              "identifier" : "F50C561F-4469-4C40-BA38-13F26591E3E1"
                            },
                            {
                              "orderedComponents" : [
                                {
                                  "orderedComponents" : [

                                  ],
                                  "className" : "GDWidgetCellDefinition",
                                  "objectId" : "id786823627l",
                                  "name" : "Rectangle",
                                  "individualContent" : false,
                                  "identifier" : "1B4B47F4-4FD2-4BE3-9F6A-C42258DC63EC"
                                }
                              ],
                              "className" : "GDWidgetCellDefinition",
                              "objectId" : "id1855837986l",
                              "name" : "meta",
                              "individualContent" : false,
                              "identifier" : "33BEE13E-4279-445A-A78B-845C3D1486FD"
                            }
                          ],
                          "className" : "GDWidgetCellDefinition",
                          "objectId" : "id2100816002l",
                          "name" : "Vertical Flow Group",
                          "individualContent" : false,
                          "identifier" : "DA07F803-2323-4CFC-966F-F87484317C28"
                        }
                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id1319447183l",
                      "name" : "Free Layout Group",
                      "individualContent" : false,
                      "identifier" : "7F78121F-BDD7-455C-BFEB-265F61A1EA1A"
                    }
                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id107650316l",
                  "name" : "Vertical Flow Group",
                  "individualContent" : false,
                  "identifier" : "3ED11CCC-840E-4245-88F3-C05E712D0814"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id481149528l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "6277843F-8370-420B-B07B-761199624C7F"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1208593271l",
          "name" : "library-tile",
          "individualContent" : false,
          "identifier" : "3FC99D34-22D0-41B2-85EA-4B6DEDAF86AF"
        },
        "name" : "library-tile"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id505413135l",
            "identifier" : "3E3D8D54-4A28-44C5-B377-6F4D034B5971",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1640923736l",
            "identifier" : "202F9E55-E83D-4E33-A08B-BA12B670D4CA",
            "type" : 1,
            "name" : "Mouse Over"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "C3087553-6A31-4706-B224-3DE39388D4A8",
        "objectId" : "id50332939",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id144140271l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "44156051-2DC8-42BF-AE0E-541D732B469C"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1366584519l",
          "name" : "list-item",
          "individualContent" : false,
          "identifier" : "3EAFF962-01AA-44ED-99B6-4DB85CD96A16"
        },
        "name" : "list-item"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id402219049l",
            "identifier" : "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE",
            "type" : 100,
            "name" : "closed"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id1550085527l",
            "identifier" : "76138222-EE29-49E0-8D45-8504B384F034",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "CAFA221A-2FFB-4ADA-AC2C-C679B17C81F6",
        "objectId" : "id54527243",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [

              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id551495679l",
              "name" : "Rectangle",
              "individualContent" : false,
              "identifier" : "05CDE084-F28E-445B-AF10-7CBF51907751"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id1370630890l",
                      "name" : "Triangle",
                      "individualContent" : false,
                      "identifier" : "4CE7D621-3786-47ED-ACB7-A293579EFED1"
                    },
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id804547162l",
                      "name" : "Rectangle",
                      "individualContent" : false,
                      "identifier" : "2B790D60-B939-466B-9145-62ED0C943F1E"
                    },
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id2043298584l",
                      "name" : "Triangle",
                      "individualContent" : false,
                      "identifier" : "6AEEDC92-AE8B-4E40-9169-774C9EE2F614"
                    }
                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id305590349l",
                  "name" : "Vertical Flow Group",
                  "individualContent" : false,
                  "identifier" : "65BD64F7-5EF1-4A29-84E9-E4A0D0C68EEB"
                }
              ],
              "className" : "GDWidgetCellDefinition",
              "objectId" : "id1159572619l",
              "name" : "Vertical Flow Group",
              "individualContent" : false,
              "identifier" : "D953C21D-CD96-4BB7-B10E-9B29046FB415"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id355978320l",
          "name" : "lasche",
          "individualContent" : false,
          "identifier" : "4D1A4E59-DD3C-4348-B0B4-37EA3C8F47AE"
        },
        "name" : "lasche"
      },
      {
        "states" : [
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0,
            "animate" : false,
            "objectId" : "id465658142l",
            "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidget\/p1",
        "objectId" : "id29361419",
        "type" : 2,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDScreenDefinition",
          "objectId" : "id1367395859l",
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
            "objectId" : "id502546079l",
            "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p2",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDWidget\/p2",
        "objectId" : "id33555723",
        "type" : 1,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id110851557l",
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
            "objectId" : "id998461665l",
            "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p72",
            "type" : 0,
            "name" : "Normal"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidget\/p1",
        "objectId" : "id4195595",
        "type" : 2,
        "hierarchy" : {
          "orderedComponents" : [

          ],
          "className" : "GDScreenDefinition",
          "objectId" : "id752379220l",
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
            "objectId" : "id1867864045l",
            "identifier" : "35B32E26-4E34-4B07-B554-528994B1A941",
            "type" : 0,
            "name" : "Normal"
          },
          {
            "animationCurve" : 0,
            "className" : "GDState",
            "animationDuration" : 0.20000000000000001,
            "animate" : 0,
            "objectId" : "id925380580l",
            "identifier" : "F1664CDE-4494-4752-9FE0-B6477503BF40",
            "type" : 100,
            "name" : "Collapsed"
          }
        ],
        "className" : "GDWidget",
        "identifier" : "415D5E59-C569-4608-9DB9-7EBFD2AEC9A4",
        "objectId" : "id46138635",
        "type" : 0,
        "hierarchy" : {
          "orderedComponents" : [
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1058272311l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "F5CB6072-B282-4024-9286-5D6448B0E8DA"
                },
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id60674548l",
                  "name" : "icon-24",
                  "individualContent" : false,
                  "identifier" : "37323164-F576-46DC-9AD3-9986A5DA3134"
                }
              ],
              "className" : "GDEmbeddedWidgetDefinition",
              "objectId" : "id1306182839l",
              "name" : "list-item-icon",
              "individualContent" : false,
              "identifier" : "A8CB88E1-19C1-4C13-867A-E580CDF4629D"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1279332802l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "532D1E7E-B132-4FBB-9CCB-4F2FCFB5EC8D"
                },
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id1293444932l",
                      "name" : "icon-24",
                      "individualContent" : false,
                      "identifier" : "4269BD10-01C0-4B99-97FC-87E2F9EE43F8"
                    }
                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1382667691l",
                  "name" : "icon",
                  "individualContent" : false,
                  "identifier" : "5AEB0C93-49B9-4E6C-B314-3B6479FD6F0C"
                }
              ],
              "className" : "GDEmbeddedWidgetDefinition",
              "objectId" : "id1402524653l",
              "name" : "list-item-icon",
              "individualContent" : false,
              "identifier" : "D785DBE6-348D-4C59-9602-ED374E2F5DEA"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1547820899l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "214ADCAE-5FAA-42B7-8093-151473663EB0"
                },
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id1007205187l",
                      "name" : "icon-24",
                      "individualContent" : false,
                      "identifier" : "4AF28A6B-A339-4838-8BD6-121E89DA28A0"
                    }
                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1388245501l",
                  "name" : "icon",
                  "individualContent" : false,
                  "identifier" : "9A297376-88CB-4CA6-B1EC-3C63F9A04DB1"
                }
              ],
              "className" : "GDEmbeddedWidgetDefinition",
              "objectId" : "id1644555941l",
              "name" : "list-item-icon",
              "individualContent" : false,
              "identifier" : "F3F1B2B0-475C-40D9-A9C3-314F91A96249"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id881685590l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "CB615803-F2EF-488F-84E3-33DA3FCB731F"
                },
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id49890658l",
                      "name" : "icon-24",
                      "individualContent" : false,
                      "identifier" : "9F21820A-C817-461F-9526-BC61ED8ABC3A"
                    }
                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id226306058l",
                  "name" : "icon",
                  "individualContent" : false,
                  "identifier" : "8EFDAF07-007D-4319-AFA5-C024F93FCA3C"
                }
              ],
              "className" : "GDEmbeddedWidgetDefinition",
              "objectId" : "id2053234035l",
              "name" : "list-item-icon",
              "individualContent" : false,
              "identifier" : "3B41FA81-E2E5-4F65-B063-74C9204C9C25"
            },
            {
              "orderedComponents" : [
                {
                  "orderedComponents" : [

                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1332625205l",
                  "name" : "Rectangle",
                  "individualContent" : false,
                  "identifier" : "DFC6BC7F-3673-4A74-8A80-9AC1EE86ECE8"
                },
                {
                  "orderedComponents" : [
                    {
                      "orderedComponents" : [

                      ],
                      "className" : "GDWidgetCellDefinition",
                      "objectId" : "id1422612635l",
                      "name" : "icon-24",
                      "individualContent" : false,
                      "identifier" : "E338FA10-1D90-4A52-86A9-2BAEC9D5E76C"
                    }
                  ],
                  "className" : "GDWidgetCellDefinition",
                  "objectId" : "id1108888900l",
                  "name" : "icon",
                  "individualContent" : false,
                  "identifier" : "EEADACE0-2137-436C-9C6F-363BD381AC2C"
                }
              ],
              "className" : "GDEmbeddedWidgetDefinition",
              "objectId" : "id104578974l",
              "name" : "list-item-icon",
              "individualContent" : false,
              "identifier" : "38711F53-F6CE-46F8-8181-4E7265B781D0"
            }
          ],
          "className" : "GDWidgetRootCellDefinition",
          "objectId" : "id1541429395l",
          "name" : "label-list",
          "individualContent" : false,
          "identifier" : "F64AC8C0-0C81-4968-8335-2537614580F5"
        },
        "name" : "label-list"
      }
    ],
    "lookAndFeels" : [

    ],
    "resources" : [

    ]
  },
  "objectId" : "id4195371",
  "currentLookAndFeel" : {
    "4ABF2480-EE28-49A7-B5EA-C9243090B602" : {
      "202F9E55-E83D-4E33-A08B-BA12B670D4CA" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Aus der Bibliothek entfernen",
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id931136811",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "3E3D8D54-4A28-44C5-B377-6F4D034B5971" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Behandlerspezifisch",
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id155190571",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "C93F9E2F-40CA-40D8-B51D-C638548492C6" : {
      "835DEC25-E40F-468E-B625-AF7003261F35" : {
        "horizontalResizing" : 1,
        "marginRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "marginLeft" : 8,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "marginBottom" : 8,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "marginTop" : 8,
        "objectId" : "id1509950763",
        "x" : 462,
        "y" : 128,
        "height" : 100,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "marginLeft" : 8,
        "horizontalResizing" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1581253931",
        "backgroundColor" : {
          "NSColorValue" : "0.999991,1.000000,0.999990,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "cornerRadiusTopRight" : 4,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 4,
        "isNestable" : 1,
        "height" : 100,
        "marginTop" : 8,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 4,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "marginBottom" : 8,
        "borderTopWidth" : 0,
        "textOverflow" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 8,
        "cornerRadiusBottomLeft" : 4,
        "backgroundPainterType" : 1,
        "x" : 462,
        "width" : 100,
        "y" : 128
      }
    },
    "AF510C65-7143-4244-ADDB-F545734E9659" : {
      "202F9E55-E83D-4E33-A08B-BA12B670D4CA" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Chronologisch",
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id511706411",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "3E3D8D54-4A28-44C5-B377-6F4D034B5971" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Chronologisch",
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1119880491",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "8EFDAF07-007D-4319-AFA5-C024F93FCA3C" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 4,
        "objectId" : "id1438647595",
        "y" : 4,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id1396704555",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id742393131",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
    "38711F53-F6CE-46F8-8181-4E7265B781D0" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 70,
        "paddingBottom" : 8,
        "objectId" : "id1191183659",
        "y" : -8,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 70,
        "paddingBottom" : 8,
        "objectId" : "id213910827",
        "y" : -8,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 70,
        "paddingBottom" : 8,
        "objectId" : "id369100075",
        "y" : -8,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "2B790D60-B939-466B-9145-62ED0C943F1E" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "horizontalResizing" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.345098,0.396078,0.450980,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "cornerRadiusBottomLeft" : 20,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 472,
        "cornerRadiusBottomRight" : 20,
        "objectId" : "id113247531",
        "y" : 343.5,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 356,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "horizontalResizing" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.345098,0.396078,0.450980,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "cornerRadiusBottomLeft" : 20,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 472,
        "cornerRadiusBottomRight" : 20,
        "objectId" : "id1556088107",
        "y" : 343.5,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 356,
        "backgroundBlur" : 0,
        "scrollable" : 0
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
        "objectId" : "id176162091",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "isNestable" : 1
      }
    },
    "77E678AD-79D5-4523-8220-5EB97D6C4CFE" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "backgroundColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "borderTopWidth" : 0,
        "isNestable" : 1,
        "verticalResizing" : 1,
        "x" : 105.5,
        "objectId" : "id25167147",
        "flexWidthPercentage" : 30,
        "horizontalAlignment" : 1,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "y" : 0
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "backgroundColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "borderTopWidth" : 0,
        "isNestable" : 1,
        "verticalResizing" : 1,
        "x" : 105.5,
        "objectId" : "id184550699",
        "flexWidthPercentage" : 30,
        "horizontalAlignment" : 1,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "y" : 0
      }
    },
    "2F308011-F67C-40B2-86EA-1B8E9432C655" : {
      "3FD7D44B-8466-4EE2-9EC4-459CD0BFD289" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implanttherapie",
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
        "x" : -48.5,
        "objectId" : "id1010828587",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "D052DC27-2983-4200-8840-BC589C022D5D" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
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
        "x" : -48.5,
        "objectId" : "id822084907",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
    "4AF28A6B-A339-4838-8BD6-121E89DA28A0" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1115686187",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id247465259",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1094714667",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "E338FA10-1D90-4A52-86A9-2BAEC9D5E76C" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id146801963",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id792724779",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1518339371",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "D953C21D-CD96-4BB7-B10E-9B29046FB415" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 1,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id725615915",
        "y" : -29.5,
        "horizontalAlignment" : 1,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 1,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id1153434923",
        "y" : -29.5,
        "horizontalAlignment" : 1,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "2359474A-CE1C-4875-AB49-DD78ECC6DA5E" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 32,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id855639339",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 6.5,
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
        "y" : 10,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 0,
        "horizontalResizing" : 2,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 32,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1048577323",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 6.5,
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
        "y" : 10,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "3EAFF962-01AA-44ED-99B6-4DB85CD96A16" : {
      "202F9E55-E83D-4E33-A08B-BA12B670D4CA" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id905970987",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "3E3D8D54-4A28-44C5-B377-6F4D034B5971" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id356517163",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "C648A30D-A1A5-497E-8195-14B55EA60077" : {
      "202F9E55-E83D-4E33-A08B-BA12B670D4CA" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 40,
        "paddingBottom" : 8,
        "objectId" : "id700450091",
        "y" : -38,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "3E3D8D54-4A28-44C5-B377-6F4D034B5971" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 40,
        "paddingBottom" : 8,
        "objectId" : "id960496939",
        "y" : -38,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "9F21820A-C817-461F-9526-BC61ED8ABC3A" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1103103275",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1430258987",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id562038059",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "745DFA5B-C689-4C2E-B2EB-50DA82A12B05" : {
      "B87CF65D-C6FE-4E52-BF46-63F23AE40F63" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "Vorstellung Praxis Gesamt<br>",
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
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id83887403",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 59,
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
        "y" : 0,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "FEFA83D6-494A-4D42-BDD9-7A3477B651E8" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "Vorstellung Praxis Gesamt<br>",
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
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id868222251",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 59,
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
        "y" : 0,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "EEADACE0-2137-436C-9C6F-363BD381AC2C" : {
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id1602225451",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id427820331",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 4,
        "objectId" : "id1434453291",
        "y" : 4,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "65BD64F7-5EF1-4A29-84E9-E4A0D0C68EEB" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 472,
        "objectId" : "id1128269099",
        "y" : 343.5,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 472,
        "objectId" : "id293602603",
        "y" : 343.5,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "1936D789-DED6-4FD9-9557-BDC5E13F7C8F" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id671089963",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id658507051",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id46138667",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "8A7A33D6-FB2B-47B4-9040-4C892591787D" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "textHorizontalAlignment" : 0,
        "textString" : "",
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
        },
        "textVerticalAlignment" : 0,
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : -3.5,
        "objectId" : "id968885547",
        "y" : 0,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 32,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "textHorizontalAlignment" : 0,
        "textString" : "",
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "1.000000,1.000000,1.000000,1.000000"
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
        "x" : -3.5,
        "objectId" : "id608175403",
        "y" : 0,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 32,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
    "DC34BBD9-840F-4E46-9F45-55AA8495500C" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
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
        "isContentClipped" : 0,
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
        "width" : 156,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id33555755",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "paddingTop" : 5,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 28,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 5,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
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
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 102,
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
        "width" : 156,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id784336171",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "paddingTop" : 5,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 28,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 5,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "1B4B47F4-4FD2-4BE3-9F6A-C42258DC63EC" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "21.07.2017 - 3:53 min",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1216349483",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.400000,0.399996,0.399996,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 50.5,
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
        "y" : -8,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "21.07.2017 - 3:53 min",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id398460203",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.400000,0.399996,0.399996,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 50.5,
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
        "y" : -8,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "4269BD10-01C0-4B99-97FC-87E2F9EE43F8" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1367344427",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id754976043",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id817890603",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "6AEEDC92-AE8B-4E40-9169-774C9EE2F614" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "marginRight" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.346008,0.394152,0.450568,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "rotationAngle" : 315,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "marginLeft" : -7,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "textTransform" : 0,
        "x" : 472,
        "objectId" : "id922748203",
        "y" : -13.5,
        "minimumHeight" : 3,
        "height" : 31,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "cellType" : 2,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 36
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "marginRight" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.346008,0.394152,0.450568,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "rotationAngle" : 315,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "marginLeft" : -7,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "textTransform" : 0,
        "x" : 472,
        "objectId" : "id767558955",
        "y" : -13.5,
        "minimumHeight" : 3,
        "height" : 31,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "cellType" : 2,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 36
      }
    },
    "7F78121F-BDD7-455C-BFEB-265F61A1EA1A" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 1,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 50.5,
        "objectId" : "id1287652651",
        "y" : -8,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 41,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 120
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 1,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 50.5,
        "objectId" : "id1132463403",
        "y" : -8,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 41,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 120
      }
    },
    "87554C97-97D1-48D8-B9E5-C3F453B68DB8" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 2,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id696255787",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -32,
        "layoutPolicyCode" : 1,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "5AEB0C93-49B9-4E6C-B314-3B6479FD6F0C" : {
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id109053227",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 4,
        "objectId" : "id444597547",
        "y" : 4,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id150996267",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
    "7BCE6676-FAF5-4ABC-BE08-73D30BAD1AC2" : {
      "35B32E26-4E34-4B07-B554-528994B1A941" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 2,
        "borderLeftWidth" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "cornerRadiusBottomLeft" : 4,
        "borderBottomWidth" : 1,
        "cornerRadiusTopRight" : 4,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 1,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "x" : 30,
        "cornerRadiusBottomRight" : 4,
        "objectId" : "id675284267",
        "cornerRadiusTopLeft" : 4,
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "F1664CDE-4494-4752-9FE0-B6477503BF40" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 2,
        "borderLeftWidth" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "cornerRadiusBottomLeft" : 4,
        "borderBottomWidth" : 1,
        "cornerRadiusTopRight" : 4,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 1,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "x" : 30,
        "cornerRadiusBottomRight" : 4,
        "objectId" : "id486540587",
        "cornerRadiusTopLeft" : 4,
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDScreenDefinition\/p23" : {
      "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p72" : {
        "isEditableText" : 0,
        "textOverflow" : 0,
        "className" : "GDProperties",
        "blendMode" : 0,
        "objectId" : "id1145046315",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "isNestable" : 1
      }
    },
    "37D439C2-4041-4C2A-B3AA-1E2A184947DD" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 1,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.925399,0.925554,0.925379,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id935331115",
        "borderTopWidth" : 1,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 482,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : -2,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "46CE591E-9D78-42BE-B857-2466EC64E72F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 1,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.925399,0.925554,0.925379,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id1505756459",
        "borderTopWidth" : 1,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 482,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : -2,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "BB462431-752E-422B-A67E-AA24D237EB71" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 1,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.925399,0.925554,0.925379,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id1468007723",
        "borderTopWidth" : 1,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 482,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : -2,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "A09E44C7-24C8-4415-93C9-F15D5D00D073" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 1,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.925399,0.925554,0.925379,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id1174406443",
        "borderTopWidth" : 1,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 482,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : -2,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 1,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "04F0A6B0-7394-41B1-8388-588A0410370A" : {
      "44D56948-42A0-4790-87B8-056BD70ECEA9" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1283458347",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -16,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -16,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "F3F1B2B0-475C-40D9-A9C3-314F91A96249" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 50,
        "paddingBottom" : 8,
        "objectId" : "id1325401387",
        "y" : -28,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 50,
        "paddingBottom" : 8,
        "objectId" : "id239076651",
        "y" : -28,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 50,
        "paddingBottom" : 8,
        "objectId" : "id12584235",
        "y" : -28,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "7596086D-4A6E-4510-A860-0F050BA42071" : {
      "835DEC25-E40F-468E-B625-AF7003261F35" : {
        "horizontalResizing" : 1,
        "marginRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "marginLeft" : 8,
        "borderBottomWidth" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "marginBottom" : 8,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "x" : 482,
        "marginTop" : 8,
        "objectId" : "id1493173547",
        "y" : 148,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "marginLeft" : 8,
        "horizontalResizing" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id104858923",
        "backgroundColor" : {
          "NSColorValue" : "0.999991,1.000000,0.999990,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "cornerRadiusTopRight" : 4,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 4,
        "isNestable" : 1,
        "height" : 100,
        "marginTop" : 8,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 4,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "marginBottom" : 8,
        "borderTopWidth" : 0,
        "textOverflow" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 8,
        "cornerRadiusBottomLeft" : 4,
        "backgroundPainterType" : 1,
        "x" : 482,
        "width" : 100,
        "y" : 148
      }
    },
    "44156051-2DC8-42BF-AE0E-541D732B469C" : {
      "3E3D8D54-4A28-44C5-B377-6F4D034B5971" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Bearbeiten",
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
        "x" : 30,
        "objectId" : "id1291846955",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "202F9E55-E83D-4E33-A08B-BA12B670D4CA" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Bearbeiten",
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
        "x" : 30,
        "objectId" : "id713033003",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
    "3ED11CCC-840E-4245-88F3-C05E712D0814" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 1,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : 59,
        "objectId" : "id1312818475",
        "y" : 0,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 1,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : 59,
        "objectId" : "id901776683",
        "y" : 0,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "D785DBE6-348D-4C59-9602-ED374E2F5DEA" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 40,
        "paddingBottom" : 8,
        "objectId" : "id1589642539",
        "y" : -38,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 40,
        "paddingBottom" : 8,
        "objectId" : "id402654507",
        "y" : -38,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 40,
        "paddingBottom" : 8,
        "objectId" : "id645924139",
        "y" : -38,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "DA07F803-2323-4CFC-966F-F87484317C28" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 50.5,
        "objectId" : "id473957675",
        "y" : -8,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 41,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 120
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 50.5,
        "objectId" : "id1501562155",
        "y" : -8,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 41,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 120
      }
    },
    "5B03E4C4-0C9E-418A-AB0A-29A2446DD3D6" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id260048171",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id683672875",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id352322859",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "DFC6BC7F-3673-4A74-8A80-9AC1EE86ECE8" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Prophylaxe",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1220543787",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Kieferorthopädie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1421870379",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Prophylaxe",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1124074795",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "856253CE-5113-4007-A930-CFBDF2698DEF" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 1,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : 59,
        "objectId" : "id524289323",
        "y" : 0,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 1,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "x" : 59,
        "objectId" : "id687867179",
        "y" : 0,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "F50C561F-4469-4C40-BA38-13F26591E3E1" : {
      "D052DC27-2983-4200-8840-BC589C022D5D" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1237321003",
        "backgroundColor" : {
          "NSColorValue" : "0.825947,0.940000,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "602DB8AE-A390-4693-8CAD-2631904B3724" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id415237419",
        "backgroundColor" : {
          "NSColorValue" : "0.825947,0.940000,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "3FD7D44B-8466-4EE2-9EC4-459CD0BFD289" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1182795051",
        "backgroundColor" : {
          "NSColorValue" : "0.817800,0.866680,0.940000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "34942F53-64CB-4993-A462-C9C1B4544366" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id432014635",
        "backgroundColor" : {
          "NSColorValue" : "0.817800,0.866680,0.940000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "E51EE011-BE48-4FAB-B4AB-992A0904AF22" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1140852011",
        "backgroundColor" : {
          "NSColorValue" : "0.817800,0.866680,0.940000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "0536D012-C4CE-4C66-B7DB-53F94C76F4B7" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1249903915",
        "backgroundColor" : {
          "NSColorValue" : "0.825947,0.940000,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "09920D1E-0B39-4632-957F-8DC13B35C3E3" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1593836843",
        "backgroundColor" : {
          "NSColorValue" : "0.817800,0.866680,0.940000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 100,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      }
    },
    "9A297376-88CB-4CA6-B1EC-3C63F9A04DB1" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 4,
        "objectId" : "id339739947",
        "y" : 4,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id1199572267",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id469763371",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
    "1F8E4A5F-0713-4FA5-853D-3BE25C4A9941" : {
      "835DEC25-E40F-468E-B625-AF7003261F35" : {
        "horizontalResizing" : 1,
        "marginRight" : -8,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "marginLeft" : -8,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id1035994411",
        "y" : 128,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
        "horizontalResizing" : 1,
        "marginRight" : -8,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "marginLeft" : -8,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id503317803",
        "y" : 128,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "214ADCAE-5FAA-42B7-8093-151473663EB0" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Endodontie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1413481771",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Endodontie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1262486827",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Endodontie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id58721579",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "268E7A91-63B3-4866-AFC0-FDF0C97B507F" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
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
        "borderBottomWidth" : 2,
        "rotationAngle" : 0,
        "width" : 12,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 1,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id880805163",
        "borderTopWidth" : 2,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 2,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 12,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 2,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "F64AC8C0-0C81-4968-8335-2537614580F5" : {
      "35B32E26-4E34-4B07-B554-528994B1A941" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 0,
        "borderLeftWidth" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "cornerRadiusBottomLeft" : 4,
        "borderBottomWidth" : 1,
        "cornerRadiusTopRight" : 4,
        "isContentClipped" : 0,
        "borderTopWidth" : 1,
        "isNestable" : 1,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "x" : 30,
        "cornerRadiusBottomRight" : 4,
        "objectId" : "id884999467",
        "cornerRadiusTopLeft" : 4,
        "y" : -48,
        "height" : 182,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "drawingIndex" : 102,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "blendMode" : 0,
        "textOverflow" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "textWordWrap" : 0,
        "width" : 100
      },
      "F1664CDE-4494-4752-9FE0-B6477503BF40" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "cornerRadiusBottomLeft" : 4,
        "borderBottomWidth" : 0,
        "cornerRadiusTopRight" : 4,
        "isContentClipped" : 1,
        "borderTopWidth" : 0,
        "isNestable" : 1,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "x" : 30,
        "cornerRadiusBottomRight" : 4,
        "objectId" : "id96470315",
        "cornerRadiusTopLeft" : 4,
        "y" : -48,
        "height" : 0,
        "minimumHeight" : 0,
        "className" : "GDProperties",
        "drawingIndex" : 102,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "blendMode" : 0,
        "textOverflow" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "textWordWrap" : 0,
        "width" : 100
      }
    },
    "7DB406F2-407F-44AA-91D5-CB964E7FAFFB" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 2,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1371538731",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -32,
        "layoutPolicyCode" : 1,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "46CE591E-9D78-42BE-B857-2466EC64E72F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 2,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1488979243",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -32,
        "layoutPolicyCode" : 1,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "BB462431-752E-422B-A67E-AA24D237EB71" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 2,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id390071595",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -32,
        "layoutPolicyCode" : 1,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "A09E44C7-24C8-4415-93C9-F15D5D00D073" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 2,
        "isDisplay" : 0,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id452986155",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -32,
        "layoutPolicyCode" : 1,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "4D1A4E59-DD3C-4348-B0B4-37EA3C8F47AE" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id348128555",
        "y" : 333.5,
        "horizontalAlignment" : 1,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id1350567211",
        "y" : 333.5,
        "horizontalAlignment" : 1,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "00955B2F-80B4-4B58-8A6D-E754FEC2BAFA" : {
      "D052DC27-2983-4200-8840-BC589C022D5D" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
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
        "x" : -48.5,
        "objectId" : "id532677931",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "602DB8AE-A390-4693-8CAD-2631904B3724" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
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
        "x" : -48.5,
        "objectId" : "id171967787",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "34942F53-64CB-4993-A462-C9C1B4544366" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Kieferorthopädie",
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
        "x" : -48.5,
        "objectId" : "id226493739",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "E51EE011-BE48-4FAB-B4AB-992A0904AF22" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
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
        "x" : -48.5,
        "objectId" : "id616564011",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "3FD7D44B-8466-4EE2-9EC4-459CD0BFD289" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
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
        "x" : -48.5,
        "objectId" : "id956302635",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "0536D012-C4CE-4C66-B7DB-53F94C76F4B7" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
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
        "x" : -48.5,
        "objectId" : "id272631083",
        "y" : 2,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "09920D1E-0B39-4632-957F-8DC13B35C3E3" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Prophylaxe",
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
        "x" : -48.5,
        "objectId" : "id763364651",
        "y" : -48.5,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
    "F5CB6072-B282-4024-9286-5D6448B0E8DA" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1526727979",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Allgemein",
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1451230507",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "33BEE13E-4279-445A-A78B-845C3D1486FD" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1543505195",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 50.5,
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
        "y" : -8,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "dropShadowSize" : 0,
        "horizontalAlignment" : 0,
        "isDisplay" : 1,
        "horizontalResizing" : 2,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1426064683",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 50.5,
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
        "y" : -8,
        "layoutPolicyCode" : 3,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "CD07CD36-9633-40B8-B25C-FCF6FEE29DBF" : {
      "835DEC25-E40F-468E-B625-AF7003261F35" : {
        "horizontalResizing" : 1,
        "marginRight" : 8,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "marginLeft" : 8,
        "borderBottomWidth" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "marginBottom" : 8,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "x" : 472,
        "marginTop" : 8,
        "objectId" : "id1266681131",
        "y" : 138,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "marginLeft" : 8,
        "horizontalResizing" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id478151979",
        "backgroundColor" : {
          "NSColorValue" : "0.999991,1.000000,0.999990,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 24,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "cornerRadiusTopRight" : 4,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 4,
        "isNestable" : 1,
        "height" : 100,
        "marginTop" : 8,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 4,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "blendMode" : 0,
        "borderBottomWidth" : 0,
        "marginBottom" : 8,
        "borderTopWidth" : 0,
        "textOverflow" : 0,
        "backgroundImageProportionalScale" : 1,
        "marginRight" : 8,
        "cornerRadiusBottomLeft" : 4,
        "backgroundPainterType" : 1,
        "x" : 472,
        "width" : 100,
        "y" : 138
      }
    },
    "BEB7157C-B4C2-49A2-882C-4C33155BE936" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : -4,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
        "marginTop" : -4,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.899849,0.900000,0.899829,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id142607659",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 482,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : -2,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "46CE591E-9D78-42BE-B857-2466EC64E72F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.899849,0.900000,0.899829,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id570426667",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 492,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : 8,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "BB462431-752E-422B-A67E-AA24D237EB71" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : 0,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
        "textTransform" : 0,
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
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.899849,0.900000,0.899829,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id977274155",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 492,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : 8,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "A09E44C7-24C8-4415-93C9-F15D5D00D073" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 4,
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
        "paddingRight" : 0,
        "marginBottom" : 0,
        "isDropTarget" : 1,
        "textLineHeight" : 1,
        "marginRight" : -4,
        "textShadowOffset" : 2,
        "borderBottomWidth" : 0,
        "rotationAngle" : 0,
        "width" : 36,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
        "marginTop" : -4,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 0,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.899849,0.900000,0.899829,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 4,
        "borderLeftColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 4,
        "embedHTML" : "",
        "objectId" : "id1317012779",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "x" : 482,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 36,
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
        "y" : -2,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
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
        "objectId" : "id1606419755",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "isNestable" : 1
      }
    },
    "4CE7D621-3786-47ED-ACB7-A293579EFED1" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "marginRight" : -7,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.346008,0.394152,0.450568,1.000000"
        },
        "rotationAngle" : 45,
        "borderLeftWidth" : 0,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "textTransform" : 0,
        "x" : 462,
        "objectId" : "id117441835",
        "y" : -23.5,
        "minimumHeight" : 3,
        "height" : 31,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "cellType" : 2,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 36
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "marginRight" : -7,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.346008,0.394152,0.450568,1.000000"
        },
        "rotationAngle" : 45,
        "borderLeftWidth" : 0,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "textTransform" : 0,
        "x" : 462,
        "objectId" : "id138413355",
        "y" : -23.5,
        "minimumHeight" : 3,
        "height" : 31,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "cellType" : 2,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 36
      }
    },
    "6B89FD1E-3792-4499-A24C-5EBB6F94CAD0" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id192939307",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 2,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
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
        "x" : 4,
        "objectId" : "id1551893803",
        "y" : 4,
        "textOverflow" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "className" : "GDProperties",
        "minimumHeight" : 3,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 4,
        "objectId" : "id385877291",
        "y" : 4,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
    "5A744A7F-7629-4587-A25D-50D328AF0C82" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "paddingTop" : 19,
        "borderTopWidth" : 0,
        "isNestable" : 1,
        "isEditableText" : 0,
        "x" : 10,
        "objectId" : "id864027947",
        "y" : -29.5,
        "minimumHeight" : 3,
        "height" : 41,
        "className" : "GDProperties",
        "drawingIndex" : 0,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "blendMode" : 0,
        "textOverflow" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 120
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "paddingTop" : 19,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 10,
        "objectId" : "id704644395",
        "y" : -29.5,
        "minimumHeight" : 3,
        "height" : 41,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 120,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "8B417092-1EA2-428E-BDD5-CABE11FCA864" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
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
        "borderBottomWidth" : 2,
        "rotationAngle" : 0,
        "width" : 12,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 1,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1258292523",
        "borderTopWidth" : 2,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 2,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 12,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 2,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "46CE591E-9D78-42BE-B857-2466EC64E72F" : {
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
        "borderBottomWidth" : 2,
        "rotationAngle" : 0,
        "width" : 12,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 1,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id834667819",
        "borderTopWidth" : 2,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 2,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 12,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 2,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "BB462431-752E-422B-A67E-AA24D237EB71" : {
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
        "borderBottomWidth" : 2,
        "rotationAngle" : 0,
        "width" : 12,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 1,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1082131755",
        "borderTopWidth" : 2,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 2,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 12,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 2,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "A09E44C7-24C8-4415-93C9-F15D5D00D073" : {
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
        "borderBottomWidth" : 2,
        "rotationAngle" : 0,
        "width" : 12,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
        "backgroundImageVerticalOperation" : 0,
        "innerShadowAngle" : 315,
        "dropShadowOpacity" : 0.5,
        "borderRightColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "activeHorizontalAlignment" : 0,
        "maximumWidth" : 1000000,
        "paddingLeft" : 0,
        "resizableInPresentationMode" : 0,
        "cellType" : 1,
        "maximumHeight" : 1000000,
        "backgroundColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusTopRight" : 0,
        "borderLeftColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id843056427",
        "borderTopWidth" : 2,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundImageHorizontalOperation" : 0,
        "minimumWidth" : 3,
        "borderBottomColor" : {
          "NSColorValue" : "0.752866,0.752994,0.752849,1.000000"
        },
        "activeLayout" : 0,
        "borderLeftWidth" : 2,
        "dropShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textHorizontalAlignment" : 1,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -32,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 12,
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
        "y" : -32,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 2,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "DFA08E1F-E049-4F4F-A73E-2D9C0DDEAC9B" : {
      "B87CF65D-C6FE-4E52-BF46-63F23AE40F63" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "Vorstellung Praxis Gesamt<br>",
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
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id633341227",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 59,
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
        "y" : 0,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "FEFA83D6-494A-4D42-BDD9-7A3477B651E8" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "Vorstellung Praxis Gesamt<br>",
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
        "isContentClipped" : 0,
        "verticalAlignment" : 0,
        "fixedLayout" : 0,
        "isEditableText" : 1,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 100,
        "flexHeightPercentage" : 100,
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
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id629146923",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textHorizontalAlignment" : 0,
        "paddingTop" : 0,
        "textWordWrap" : 1,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 59,
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
        "y" : 0,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 0,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "3FC99D34-22D0-41B2-85EA-4B6DEDAF86AF" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.948926,0.949085,0.948905,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "cornerRadiusBottomLeft" : 4,
        "borderBottomWidth" : 1,
        "backgroundPainterType" : 1,
        "cornerRadiusTopRight" : 4,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 1,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 4,
        "objectId" : "id859833643",
        "cornerRadiusTopLeft" : 4,
        "x" : 105.5,
        "height" : 100,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "y" : 0
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.948926,0.949085,0.948905,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 1,
        "textTransform" : 0,
        "borderRightWidth" : 1,
        "cornerRadiusBottomLeft" : 4,
        "borderBottomWidth" : 1,
        "backgroundPainterType" : 1,
        "cornerRadiusTopRight" : 4,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 1,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 4,
        "objectId" : "id1098908971",
        "cornerRadiusTopLeft" : 4,
        "x" : 105.5,
        "height" : 100,
        "minimumHeight" : 3,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "y" : 0
      }
    },
    "3B0BB1D0-8B2E-43D2-AE11-D21FF92BF44C" : {
      "D052DC27-2983-4200-8840-BC589C022D5D" : {
        "y" : 0,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id662701355",
        "backgroundColor" : {
          "NSColorValue" : "0.825947,0.940000,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "drawingIndex" : 0,
        "paddingBottom" : 2,
        "width" : 100,
        "x" : 59
      },
      "602DB8AE-A390-4693-8CAD-2631904B3724" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id306185515",
        "backgroundColor" : {
          "NSColorValue" : "0.746867,0.850000,0.739500,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 2,
        "width" : 100,
        "y" : 10
      },
      "34942F53-64CB-4993-A462-C9C1B4544366" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1002439979",
        "backgroundColor" : {
          "NSColorValue" : "0.940000,0.817800,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 0,
        "width" : 100,
        "y" : 10
      },
      "E51EE011-BE48-4FAB-B4AB-992A0904AF22" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id381682987",
        "backgroundColor" : {
          "NSColorValue" : "0.940000,0.907413,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 0,
        "width" : 100,
        "y" : 10
      },
      "3FD7D44B-8466-4EE2-9EC4-459CD0BFD289" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1497367851",
        "backgroundColor" : {
          "NSColorValue" : "0.817800,0.866680,0.940000,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 59,
        "paddingBottom" : 0,
        "width" : 100,
        "y" : 0
      },
      "0536D012-C4CE-4C66-B7DB-53F94C76F4B7" : {
        "y" : 10,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id29361451",
        "backgroundColor" : {
          "NSColorValue" : "0.825947,0.940000,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 2,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "drawingIndex" : 0,
        "paddingBottom" : 2,
        "width" : 100,
        "x" : 69
      },
      "09920D1E-0B39-4632-957F-8DC13B35C3E3" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "verticalAlignment" : 1,
        "paddingLeft" : 4,
        "horizontalResizing" : 2,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id1207960875",
        "backgroundColor" : {
          "NSColorValue" : "0.940000,0.907413,0.817800,1.000000"
        },
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 0,
        "cornerRadiusTopRight" : 2,
        "minimumHeight" : 3,
        "cornerRadiusTopLeft" : 2,
        "isNestable" : 1,
        "height" : 24,
        "backgroundBlur" : 0,
        "textWordWrap" : 0,
        "isEditableText" : 0,
        "paddingTop" : 0,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 2,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 2,
        "backgroundPainterType" : 1,
        "x" : 69,
        "paddingBottom" : 0,
        "width" : 100,
        "y" : 10
      }
    },
    "BF5341D5-63F9-4197-A0D7-72631C87415C" : {
      "B87CF65D-C6FE-4E52-BF46-63F23AE40F63" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "marginLeft" : -4,
        "isEditableText" : 1,
        "paddingTop" : 4,
        "marginTop" : -4,
        "paddingBottom" : 4,
        "objectId" : "id1363150123",
        "x" : 59,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "y" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 4
      },
      "FEFA83D6-494A-4D42-BDD9-7A3477B651E8" : {
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "marginLeft" : -4,
        "paddingLeft" : 4,
        "horizontalResizing" : 1,
        "className" : "GDProperties",
        "layoutPolicyCode" : 2,
        "objectId" : "id813696299",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "verticalResizing" : 2,
        "cornerRadiusTopRight" : 4,
        "minimumHeight" : 3,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "cornerRadiusTopLeft" : 4,
        "marginTop" : -4,
        "backgroundBlur" : 0,
        "isEditableText" : 1,
        "paddingTop" : 4,
        "minimumWidth" : 3,
        "cornerRadiusBottomRight" : 4,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "scrollable" : 0,
        "blendMode" : 0,
        "paddingRight" : 4,
        "borderBottomWidth" : 0,
        "textOverflow" : 0,
        "borderTopWidth" : 0,
        "backgroundImageProportionalScale" : 1,
        "cornerRadiusBottomLeft" : 4,
        "backgroundPainterType" : 1,
        "x" : 59,
        "paddingBottom" : 4,
        "y" : 0
      }
    },
    "3B41FA81-E2E5-4F65-B063-74C9204C9C25" : {
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 60,
        "paddingBottom" : 8,
        "objectId" : "id1329595691",
        "y" : -18,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 60,
        "paddingBottom" : 8,
        "objectId" : "id301991211",
        "y" : -18,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 60,
        "paddingBottom" : 8,
        "objectId" : "id310379819",
        "y" : -18,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "37323164-F576-46DC-9AD3-9986A5DA3134" : {
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id771753259",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id494929195",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : 4,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : 4,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "BBFC13BE-285A-43C1-8997-5E4219F3FEF0" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 2,
        "isDisplay" : 1,
        "marginRight" : 4,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 482,
        "objectId" : "id423626027",
        "y" : -2,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "textWordWrap" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 2,
        "isDisplay" : 0,
        "marginRight" : 4,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "isNestable" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 482,
        "objectId" : "id377488683",
        "y" : -2,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
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
    "532D1E7E-B132-4FBB-9CCB-4F2FCFB5EC8D" : {
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id541066539",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id62915883",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Implantologie",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1224738091",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      }
    },
    "2B8DD8E5-B22B-4B94-BE27-BE5FAAE721DB" : {
      "B87CF65D-C6FE-4E52-BF46-63F23AE40F63" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "marginLeft" : -4,
        "isEditableText" : 0,
        "paddingTop" : 4,
        "marginTop" : -4,
        "paddingBottom" : 4,
        "objectId" : "id830473515",
        "x" : 59,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "y" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 4
      },
      "FEFA83D6-494A-4D42-BDD9-7A3477B651E8" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "verticalResizing" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 4,
        "borderBottomWidth" : 0,
        "isContentClipped" : 0,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "minimumWidth" : 3,
        "isEditableText" : 0,
        "paddingTop" : 4,
        "paddingBottom" : 4,
        "objectId" : "id71304491",
        "x" : 59,
        "y" : 0,
        "minimumHeight" : 3,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 12,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "textOverflow" : 0,
        "blendMode" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 4
      }
    },
    "ECDDE8AC-420E-4E9A-AE89-6C723F2C892C" : {
      "44D56948-42A0-4790-87B8-056BD70ECEA9" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id599786795",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -6,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -6,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "CB615803-F2EF-488F-84E3-33DA3FCB731F" : {
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Prophylaxe",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id297796907",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Prophylaxe",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id1061160235",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "textHorizontalAlignment" : 0,
        "textString" : "Prophylaxe",
        "horizontalResizing" : 1,
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
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 30,
        "objectId" : "id603981099",
        "y" : -32,
        "minimumHeight" : 10,
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "className" : "GDProperties",
        "height" : 100,
        "textOverflow" : 0,
        "blendMode" : 0,
        "textWordWrap" : 0,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "width" : 100
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
        "objectId" : "id759170347",
        "textTransform" : 0,
        "backgroundBlur" : 0,
        "isEditableText" : 0,
        "isNestable" : 1
      }
    },
    "6277843F-8370-420B-B07B-761199624C7F" : {
      "DFF37F5D-8572-4DCE-9031-85785C777F4D" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 1,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "paddingLeft" : 8,
        "paddingTop" : 8,
        "paddingBottom" : 8,
        "objectId" : "id587203883",
        "flexWidthPercentage" : 70,
        "x" : 115.5,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "y" : 10,
        "paddingRight" : 8
      },
      "D6F73AAA-9F51-4FD6-A308-62C3294EA712" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 1,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 0,
        "borderBottomWidth" : 0,
        "isEditableText" : 0,
        "minimumWidth" : 3,
        "isContentClipped" : 0,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "paddingLeft" : 8,
        "paddingTop" : 8,
        "paddingBottom" : 8,
        "objectId" : "id746587435",
        "flexWidthPercentage" : 70,
        "x" : 115.5,
        "minimumHeight" : 3,
        "height" : 100,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "y" : 10,
        "paddingRight" : 8
      }
    },
    "A8CB88E1-19C1-4C13-867A-E580CDF4629D" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id1212155179",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id612369707",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id1342178603",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "44FB20DC-C9CE-45B0-AD97-4620D543DCD5" : {
      "6B4E1BC8-83C9-492D-A7BB-278543AECC50" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1245709611",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -6,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -6,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "46CE591E-9D78-42BE-B857-2466EC64E72F" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1400898859",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -6,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -6,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "BB462431-752E-422B-A67E-AA24D237EB71" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id121636139",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -6,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -6,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      },
      "A09E44C7-24C8-4415-93C9-F15D5D00D073" : {
        "backgroundBlur" : 0,
        "backgroundGradientIsRadial" : 0,
        "isMovable" : 1,
        "cornerRadiusTopLeft" : 0,
        "textString" : "",
        "dropShadowSize" : 0,
        "horizontalAlignment" : 1,
        "isDisplay" : 1,
        "horizontalResizing" : 0,
        "layoutWrap" : 0,
        "borderTopType" : 0,
        "borderLeftType" : 0,
        "dropShadow" : 0,
        "customCSS" : "",
        "backgroundPainterType" : 0,
        "isContentClipped" : 0,
        "verticalAlignment" : 1,
        "fixedLayout" : 0,
        "isEditableText" : 0,
        "scrollable" : 0,
        "blendMode" : 0,
        "minimumHeight" : 10,
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
        "width" : 24,
        "flexHeightPercentage" : 100,
        "opacity" : 1,
        "flexWidthPercentage" : 100,
        "backgroundImageHorizontalAlignment" : 1,
        "verticalResizing" : 0,
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
            "displayName" : "Ergosign Glyph Icons 2 Normal",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "ErgosignGlyphIcons2-Normal",
            "familyName" : "Ergosign Glyph Icons 2",
            "fallback" : "",
            "size" : 20,
            "fontCSS" : "\n@font-face {\nfont-family: \"ErgosignGlyphIcons2-Normal\";src:url(\"\/images\/ErgosignGlyphIcons2-Normal.woff\") format(\"woff\"),local(\"Ergosign Glyph Icons 2 Normal\")}"
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
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "textTraits" : 0,
        "textShadow" : 0,
        "textShadowBlur" : 1,
        "textShadowOpacity" : 0.5,
        "activeVerticalAlignment" : 0,
        "cornerRadiusBottomRight" : 0,
        "embedHTML" : "",
        "objectId" : "id1463813419",
        "borderTopWidth" : 0,
        "dropShadowAngle" : 180,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
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
        "textWordWrap" : 0,
        "innerShadow" : 0,
        "backgroundGradientAngle" : 0,
        "x" : -6,
        "isSelectable" : 1,
        "proportionalScale" : 0,
        "backgroundImageVerticalAlignment" : 1,
        "height" : 24,
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
        "y" : -6,
        "layoutPolicyCode" : 2,
        "borderRightWidth" : 0,
        "textVerticalAlignment" : 1,
        "innerShadowColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        }
      }
    },
    "05CDE084-F28E-445B-AF10-7CBF51907751" : {
      "76138222-EE29-49E0-8D45-8504B384F034" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.345098,0.396078,0.450980,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id536872235",
        "y" : 333.5,
        "minimumHeight" : 3,
        "height" : 5,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0
      },
      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
        "horizontalResizing" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.345098,0.396078,0.450980,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "backgroundPainterType" : 1,
        "borderBottomWidth" : 0,
        "minimumWidth" : 3,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "x" : 462,
        "objectId" : "id750781739",
        "y" : 333.5,
        "minimumHeight" : 3,
        "height" : 5,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 14,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 100,
        "backgroundBlur" : 0,
        "scrollable" : 0
      }
    },
    "C85EB0B4-4F02-45EE-BB57-7F232BD20F3B" : {
      "25CAFC55-64A1-489A-B7D3-D23CF1219B1C" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 40,
        "paddingBottom" : 8,
        "objectId" : "id41944363",
        "y" : -38,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "0E1500B9-0479-43C4-A190-DD665B281779" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id838862123",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "32154893-2965-4181-A9E3-EDE681D1678F" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id1585448235",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    },
    "0BF1AB61-9D76-407F-A614-EEAC94ECE0F6" : {
      "202F9E55-E83D-4E33-A08B-BA12B670D4CA" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "backgroundColor" : {
          "NSColorValue" : "0.949020,0.949020,0.949020,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id1161823531",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 216,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      },
      "3E3D8D54-4A28-44C5-B377-6F4D034B5971" : {
        "horizontalResizing" : 1,
        "verticalAlignment" : 1,
        "backgroundImageProportionalScale" : 1,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 2,
        "borderLeftWidth" : 0,
        "textTransform" : 0,
        "borderRightWidth" : 0,
        "paddingLeft" : 8,
        "borderBottomWidth" : 1,
        "minimumWidth" : 3,
        "backgroundPainterType" : 1,
        "isNestable" : 1,
        "borderTopWidth" : 0,
        "isEditableText" : 0,
        "paddingTop" : 8,
        "x" : 30,
        "paddingBottom" : 8,
        "objectId" : "id1379927339",
        "y" : -48,
        "minimumHeight" : 3,
        "height" : 36,
        "className" : "GDProperties",
        "textFont" : {
          "GDFont" : {
            "displayName" : "System Font Regular",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : ".AppleSystemUIFont",
            "familyName" : ".AppleSystemUIFont",
            "fallback" : "",
            "size" : 16,
            "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
          }
        },
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 160,
        "backgroundBlur" : 0,
        "scrollable" : 0,
        "paddingRight" : 8
      }
    }
  }
};
var screenJSON = [
  {
    "specificationCell" : 0,
    "styleProperties" : {
      "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1" : {
        "isDisplay" : 1,
        "verticalAlignment" : 0,
        "textColor" : {
          "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
        },
        "layoutPolicyCode" : 3,
        "backgroundColor" : {
          "NSColorValue" : "0.960784,0.976471,0.988235,1.000000"
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
        "x" : 3448,
        "objectId" : "id335545643",
        "y" : 3576,
        "horizontalAlignment" : 0,
        "height" : 766,
        "textFont" : {
          "GDFont" : {
            "displayName" : "Segoe UI Semilight",
            "isItalic" : false,
            "isBold" : false,
            "fontName" : "SegoeUI-Semilight",
            "familyName" : "Segoe UI",
            "fallback" : "",
            "size" : 28,
            "fontCSS" : "\n@font-face {\nfont-family: \"SegoeUI-Semilight\";src:url(\"\/images\/SegoeUI-Semilight.woff\") format(\"woff\"),local(\"Segoe UI Semilight\")}"
          }
        },
        "className" : "GDProperties",
        "isSelectable" : 1,
        "textOverflow" : 0,
        "blendMode" : 0,
        "width" : 1023,
        "backgroundBlur" : 0,
        "scrollable" : 3
      }
    },
    "definition" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDScreenDefinition\/p2",
    "className" : "GDScreen",
    "eventHandlers" : [

    ],
    "activeState" : "x-coredata:\/\/143D15C6-A0DB-4381-AA9A-37984AAF84FA\/GDState\/p1",
    "objectId" : "id1838110253l",
    "name" : "Visual Design Test",
    "orderedComponents" : [
      {
        "specificationCell" : 0,
        "styleProperties" : {
          "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
            "horizontalResizing" : 1,
            "backgroundImageProportionalScale" : 1,
            "textColor" : {
              "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
            },
            "layoutPolicyCode" : 3,
            "verticalResizing" : 2,
            "borderLeftWidth" : 0,
            "textTransform" : 0,
            "borderRightWidth" : 0,
            "borderBottomWidth" : 0,
            "isContentClipped" : 0,
            "borderTopWidth" : 0,
            "minimumWidth" : 3,
            "isEditableText" : 0,
            "x" : 462,
            "objectId" : "id268436779",
            "y" : 334,
            "textOverflow" : 0,
            "textFont" : {
              "GDFont" : {
                "displayName" : "System Font Regular",
                "isItalic" : false,
                "isBold" : false,
                "fontName" : ".AppleSystemUIFont",
                "familyName" : ".AppleSystemUIFont",
                "fallback" : "",
                "size" : 14,
                "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
              }
            },
            "className" : "GDProperties",
            "minimumHeight" : 3,
            "blendMode" : 0,
            "backgroundBlur" : 0,
            "scrollable" : 0
          }
        },
        "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
        "className" : "GDWidgetInstanceRootCell",
        "eventHandlers" : [

        ],
        "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
        "objectId" : "id1218167483l",
        "name" : "Vertical Flow Group",
        "orderedComponents" : [
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                "borderBottomColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "horizontalResizing" : 1,
                "backgroundImageProportionalScale" : 1,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "layoutPolicyCode" : 2,
                "borderTopColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "borderLeftWidth" : 0,
                "borderRightWidth" : 0,
                "backgroundPainterType" : 1,
                "borderBottomWidth" : 0,
                "minimumWidth" : 3,
                "borderTopWidth" : 0,
                "isEditableText" : 0,
                "textTransform" : 0,
                "x" : 462,
                "objectId" : "id490734891",
                "y" : 334,
                "minimumHeight" : 3,
                "borderLeftColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "className" : "GDProperties",
                "borderRightColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "height" : 56,
                "blendMode" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "System Font Regular",
                    "isItalic" : false,
                    "isBold" : false,
                    "fontName" : ".AppleSystemUIFont",
                    "familyName" : ".AppleSystemUIFont",
                    "fallback" : "",
                    "size" : 14,
                    "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
                  }
                },
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0,
                "width" : 100
              }
            },
            "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
            "objectId" : "id1705120917l",
            "name" : "Rectangle",
            "orderedComponents" : [

            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                "borderBottomColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "horizontalResizing" : 1,
                "backgroundImageProportionalScale" : 1,
                "textColor" : {
                  "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
                },
                "layoutPolicyCode" : 2,
                "borderTopColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "borderLeftWidth" : 0,
                "borderRightWidth" : 0,
                "backgroundPainterType" : 3,
                "borderBottomWidth" : 0,
                "backgroundGradientAngle" : 90,
                "borderTopWidth" : 0,
                "isEditableText" : 0,
                "minimumWidth" : 3,
                "textTransform" : 0,
                "x" : 472,
                "objectId" : "id67110187",
                "y" : 344,
                "height" : 1,
                "borderLeftColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "className" : "GDProperties",
                "borderRightColor" : {
                  "NSColorValue" : "0.874180,0.888934,0.900000,1.000000"
                },
                "minimumHeight" : 1,
                "blendMode" : 0,
                "textFont" : {
                  "GDFont" : {
                    "displayName" : "System Font Regular",
                    "isItalic" : false,
                    "isBold" : false,
                    "fontName" : ".AppleSystemUIFont",
                    "familyName" : ".AppleSystemUIFont",
                    "fallback" : "",
                    "size" : 14,
                    "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
                  }
                },
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "backgroundGradient" : {
                  "CTGradient" : {
                    "colorStops" : [
                      0.82745098039215681,
                      0.84313725490196079,
                      0.85098039215686272,
                      0.20000000000000001,
                      0,
                      0.82733272455605222,
                      0.84132870351130229,
                      0.85182568772774003,
                      1,
                      1
                    ],
                    "count" : 2
                  }
                },
                "textOverflow" : 0,
                "width" : 100
              }
            },
            "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
            "objectId" : "id216786576l",
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
            "horizontalResizing" : 1,
            "backgroundImageProportionalScale" : 1,
            "textColor" : {
              "NSColorValue" : "0.000000,0.000000,0.000000,1.000000"
            },
            "layoutPolicyCode" : 3,
            "verticalResizing" : 2,
            "borderLeftWidth" : 0,
            "textTransform" : 0,
            "borderRightWidth" : 0,
            "paddingLeft" : 32,
            "borderBottomWidth" : 0,
            "minimumWidth" : 3,
            "backgroundPainterType" : 0,
            "paddingTop" : 32,
            "borderTopWidth" : 0,
            "isEditableText" : 0,
            "x" : 462,
            "paddingBottom" : 16,
            "objectId" : "id8389931",
            "y" : 333.5,
            "minimumHeight" : 3,
            "height" : 100,
            "className" : "GDProperties",
            "textFont" : {
              "GDFont" : {
                "displayName" : "System Font Regular",
                "isItalic" : false,
                "isBold" : false,
                "fontName" : ".AppleSystemUIFont",
                "familyName" : ".AppleSystemUIFont",
                "fallback" : "",
                "size" : 14,
                "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
              }
            },
            "textOverflow" : 0,
            "blendMode" : 0,
            "width" : 100,
            "backgroundBlur" : 0,
            "scrollable" : 0,
            "paddingRight" : 32
          }
        },
        "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
        "className" : "GDWidgetInstanceRootCell",
        "eventHandlers" : [

        ],
        "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
        "objectId" : "id703963428l",
        "name" : "Rectangle",
        "orderedComponents" : [
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "835DEC25-E40F-468E-B625-AF7003261F35" : {
                "backgroundBlur" : 0,
                "blendMode" : 0,
                "x" : 472,
                "className" : "GDProperties",
                "y" : 138,
                "width" : 100,
                "textTransform" : 0,
                "scrollable" : 0,
                "height" : 100,
                "objectId" : "id847250731",
                "textOverflow" : 0,
                "isEditableText" : 0
              },
              "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                "backgroundBlur" : 0,
                "blendMode" : 0,
                "x" : 472,
                "className" : "GDProperties",
                "y" : 138,
                "width" : 100,
                "textTransform" : 0,
                "scrollable" : 0,
                "height" : 100,
                "objectId" : "id1409287467",
                "textOverflow" : 0,
                "isEditableText" : 0
              }
            },
            "definition" : "1F8E4A5F-0713-4FA5-853D-3BE25C4A9941",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "F90B8DC8-A16D-4C49-B820-CCD589A99526",
            "objectId" : "id1290422624l",
            "name" : "3-row",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "835DEC25-E40F-468E-B625-AF7003261F35" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 462,
                    "className" : "GDProperties",
                    "y" : 128,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id805307691",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  },
                  "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 462,
                    "backgroundColor" : {
                      "NSColorValue" : "0.999991,1.000000,0.999990,1.000000"
                    },
                    "className" : "GDProperties",
                    "width" : 100,
                    "y" : 128,
                    "scrollable" : 0,
                    "textTransform" : 0,
                    "height" : 100,
                    "objectId" : "id243270955",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "C93F9E2F-40CA-40D8-B51D-C638548492C6",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id990643713l",
                "name" : "column",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "835DEC25-E40F-468E-B625-AF7003261F35" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 472,
                    "className" : "GDProperties",
                    "y" : 138,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id998245675",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  },
                  "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 472,
                    "backgroundColor" : {
                      "NSColorValue" : "0.999991,1.000000,0.999990,1.000000"
                    },
                    "className" : "GDProperties",
                    "width" : 100,
                    "y" : 138,
                    "scrollable" : 0,
                    "textTransform" : 0,
                    "height" : 100,
                    "objectId" : "id1086326059",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "CD07CD36-9633-40B8-B25C-FCF6FEE29DBF",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1600157535l",
                "name" : "column",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "835DEC25-E40F-468E-B625-AF7003261F35" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 482,
                    "className" : "GDProperties",
                    "y" : 148,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id461374763",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  },
                  "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 482,
                    "className" : "GDProperties",
                    "y" : 148,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id1056965931",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "7596086D-4A6E-4510-A860-0F050BA42071",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id984607280l",
                "name" : "column",
                "orderedComponents" : [

                ]
              }
            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "835DEC25-E40F-468E-B625-AF7003261F35" : {
                "backgroundBlur" : 0,
                "blendMode" : 0,
                "x" : 482,
                "className" : "GDProperties",
                "y" : 148,
                "width" : 100,
                "textTransform" : 0,
                "scrollable" : 0,
                "height" : 100,
                "objectId" : "id1006634283",
                "textOverflow" : 0,
                "isEditableText" : 0
              },
              "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                "backgroundBlur" : 0,
                "blendMode" : 0,
                "x" : 482,
                "className" : "GDProperties",
                "y" : 148,
                "width" : 100,
                "textTransform" : 0,
                "scrollable" : 0,
                "height" : 100,
                "objectId" : "id180356395",
                "textOverflow" : 0,
                "isEditableText" : 0
              }
            },
            "definition" : "1F8E4A5F-0713-4FA5-853D-3BE25C4A9941",
            "className" : "GDWidgetInstanceRootCell",
            "eventHandlers" : [

            ],
            "activeState" : "F90B8DC8-A16D-4C49-B820-CCD589A99526",
            "objectId" : "id1889237590l",
            "name" : "3-row",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "835DEC25-E40F-468E-B625-AF7003261F35" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 462,
                    "className" : "GDProperties",
                    "y" : 128,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id578815275",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  },
                  "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 462,
                    "className" : "GDProperties",
                    "y" : 128,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id520095019",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "C93F9E2F-40CA-40D8-B51D-C638548492C6",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1027596218l",
                "name" : "column",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "835DEC25-E40F-468E-B625-AF7003261F35" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 472,
                    "className" : "GDProperties",
                    "y" : 138,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id75498795",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  },
                  "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 472,
                    "className" : "GDProperties",
                    "y" : 138,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id654312747",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "CD07CD36-9633-40B8-B25C-FCF6FEE29DBF",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id1915011741l",
                "name" : "column",
                "orderedComponents" : [

                ]
              },
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "835DEC25-E40F-468E-B625-AF7003261F35" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 482,
                    "className" : "GDProperties",
                    "y" : 148,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id1577059627",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  },
                  "F90B8DC8-A16D-4C49-B820-CCD589A99526" : {
                    "backgroundBlur" : 0,
                    "blendMode" : 0,
                    "x" : 482,
                    "className" : "GDProperties",
                    "y" : 148,
                    "width" : 100,
                    "textTransform" : 0,
                    "scrollable" : 0,
                    "height" : 100,
                    "objectId" : "id37750059",
                    "textOverflow" : 0,
                    "isEditableText" : 0
                  }
                },
                "definition" : "7596086D-4A6E-4510-A860-0F050BA42071",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id206932670l",
                "name" : "column",
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
          "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
            "isEditableText" : 0,
            "x" : 462,
            "className" : "GDProperties",
            "y" : 333.5,
            "blendMode" : 0,
            "objectId" : "id964691243",
            "textTransform" : 0,
            "backgroundBlur" : 0,
            "scrollable" : 0,
            "textOverflow" : 0
          }
        },
        "definition" : "4D1A4E59-DD3C-4348-B0B4-37EA3C8F47AE",
        "className" : "GDWidgetInstanceRootCell",
        "eventHandlers" : [

        ],
        "activeState" : "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE",
        "objectId" : "id483800610l",
        "name" : "lasche",
        "orderedComponents" : [
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
                "backgroundPainterType" : 0,
                "textOverflow" : 0,
                "x" : 462,
                "className" : "GDProperties",
                "y" : 333.5,
                "blendMode" : 0,
                "objectId" : "id650118443",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "isEditableText" : 0,
                "scrollable" : 0
              }
            },
            "definition" : "05CDE084-F28E-445B-AF10-7CBF51907751",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1833175429l",
            "name" : "Rectangle",
            "orderedComponents" : [

            ]
          },
          {
            "specificationCell" : 0,
            "styleProperties" : {
              "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
                "isEditableText" : 0,
                "x" : 462,
                "className" : "GDProperties",
                "y" : -29.5,
                "blendMode" : 0,
                "objectId" : "id1019217195",
                "textTransform" : 0,
                "backgroundBlur" : 0,
                "scrollable" : 0,
                "textOverflow" : 0
              }
            },
            "definition" : "D953C21D-CD96-4BB7-B10E-9B29046FB415",
            "className" : "GDWidgetInstanceCell",
            "eventHandlers" : [

            ],
            "objectId" : "id1722749955l",
            "name" : "Vertical Flow Group",
            "orderedComponents" : [
              {
                "specificationCell" : 0,
                "styleProperties" : {
                  "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
                    "isEditableText" : 0,
                    "x" : 472,
                    "className" : "GDProperties",
                    "y" : 343.5,
                    "blendMode" : 0,
                    "objectId" : "id92276011",
                    "textTransform" : 0,
                    "backgroundBlur" : 0,
                    "scrollable" : 0,
                    "textOverflow" : 0
                  }
                },
                "definition" : "65BD64F7-5EF1-4A29-84E9-E4A0D0C68EEB",
                "className" : "GDWidgetInstanceCell",
                "eventHandlers" : [

                ],
                "objectId" : "id366918466l",
                "name" : "Vertical Flow Group",
                "orderedComponents" : [
                  {
                    "specificationCell" : 0,
                    "styleProperties" : {
                      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
                        "backgroundPainterType" : 0,
                        "textOverflow" : 0,
                        "x" : 462,
                        "className" : "GDProperties",
                        "y" : -23.5,
                        "blendMode" : 0,
                        "objectId" : "id1535116587",
                        "textTransform" : 0,
                        "backgroundBlur" : 0,
                        "isEditableText" : 0,
                        "scrollable" : 0
                      }
                    },
                    "definition" : "4CE7D621-3786-47ED-ACB7-A293579EFED1",
                    "className" : "GDWidgetInstanceCell",
                    "eventHandlers" : [

                    ],
                    "objectId" : "id745511444l",
                    "name" : "Triangle",
                    "orderedComponents" : [

                    ]
                  },
                  {
                    "specificationCell" : 0,
                    "styleProperties" : {
                      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
                        "backgroundBlur" : 0,
                        "blendMode" : 0,
                        "x" : 472,
                        "verticalAlignment" : 1,
                        "className" : "GDProperties",
                        "y" : 343.5,
                        "backgroundPainterType" : 0,
                        "textTransform" : 0,
                        "scrollable" : 0,
                        "horizontalAlignment" : 1,
                        "objectId" : "id515900715",
                        "textOverflow" : 0,
                        "isEditableText" : 0
                      }
                    },
                    "definition" : "2B790D60-B939-466B-9145-62ED0C943F1E",
                    "className" : "GDWidgetInstanceCell",
                    "eventHandlers" : [

                    ],
                    "objectId" : "id619474843l",
                    "name" : "Rectangle",
                    "orderedComponents" : [
                      {
                        "specificationCell" : 0,
                        "styleProperties" : {
                          "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29" : {
                            "textHorizontalAlignment" : 0,
                            "textString" : "Alle Medien anzeigen",
                            "horizontalResizing" : 2,
                            "backgroundImageProportionalScale" : 1,
                            "textColor" : {
                              "NSColorValue" : "0.000000,0.466667,0.796078,1.000000"
                            },
                            "textVerticalAlignment" : 0,
                            "layoutPolicyCode" : 2,
                            "verticalResizing" : 2,
                            "borderLeftWidth" : 0,
                            "textTransform" : 0,
                            "borderRightWidth" : 0,
                            "borderBottomWidth" : 0,
                            "isContentClipped" : 0,
                            "borderTopWidth" : 0,
                            "minimumWidth" : 3,
                            "isEditableText" : 0,
                            "x" : 128,
                            "objectId" : "id1358955819",
                            "y" : -32,
                            "textOverflow" : 0,
                            "textFont" : {
                              "GDFont" : {
                                "displayName" : "System Font Regular",
                                "isItalic" : false,
                                "isBold" : false,
                                "fontName" : ".AppleSystemUIFont",
                                "familyName" : ".AppleSystemUIFont",
                                "fallback" : "",
                                "size" : 13,
                                "fontCSS" : "\n@font-face {\nfont-family: \".AppleSystemUIFont\";src:local(\"System Font Regular\")}"
                              }
                            },
                            "className" : "GDProperties",
                            "minimumHeight" : 10,
                            "textWordWrap" : 0,
                            "blendMode" : 0,
                            "backgroundBlur" : 0,
                            "scrollable" : 0
                          }
                        },
                        "definition" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDWidgetRootCellDefinition\/p18",
                        "className" : "GDWidgetInstanceRootCell",
                        "eventHandlers" : [

                        ],
                        "activeState" : "x-coredata:\/\/8A119B17-AF00-4D70-8084-3C8BA8F4FC4C\/GDState\/p29",
                        "objectId" : "id712416190l",
                        "name" : "Rectangle",
                        "orderedComponents" : [

                        ]
                      }
                    ]
                  },
                  {
                    "specificationCell" : 0,
                    "styleProperties" : {
                      "C169D9D9-AEAC-4734-9ADB-D25712CAA0CE" : {
                        "backgroundPainterType" : 0,
                        "textOverflow" : 0,
                        "x" : 472,
                        "className" : "GDProperties",
                        "y" : -13.5,
                        "blendMode" : 0,
                        "objectId" : "id1308624171",
                        "textTransform" : 0,
                        "backgroundBlur" : 0,
                        "isEditableText" : 0,
                        "scrollable" : 0
                      }
                    },
                    "definition" : "6AEEDC92-AE8B-4E40-9169-774C9EE2F614",
                    "className" : "GDWidgetInstanceCell",
                    "eventHandlers" : [

                    ],
                    "objectId" : "id1494779564l",
                    "name" : "Triangle",
                    "orderedComponents" : [

                    ]
                  }
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
var displayName='Sirona-Visual-Test_0.1.atype';
    let fixture = document.getElementById("qunit-fixture")
    let atContainer = document.createElement("div")
    fixture.appendChild(atContainer);
    let antetype = new AntetypeWeb(atContainer);
    antetype.loadProjectFromJSON(projectJSON);
    antetype.changeScreenFromJSON(screenJSON[currentScreenIndex]);
    return antetype;
}

