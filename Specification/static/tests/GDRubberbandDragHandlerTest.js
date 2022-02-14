import { GDDragHandler, GDRubberbandDragHandler, GDRubberbandPassengerPBoardType } from "../modules/drag-handler.js";
import { GDProject, GDScreen } from "../modules/model.js";
import { AntetypeWeb } from "../modules/viewer.js";

const { test } = QUnit;

QUnit.module("GDFileDragHandler tests", hooks => {
    let at;
    let dragHandler;

    hooks.beforeEach(() => {
        at = new AntetypeWeb();

        // we setup basically a whole WebViewer, this way we can just program it 
        // like normal:
        at.project = GDProject.createInstance();
        at.screenElement.style.width = "100px";
        at.screenElement.style.height = "100px";
        at.project.addScreen(at.project.createScreen());
        at.currentScreen = at.project.orderedScreens[0];
        at.buildStyleSheet();
        at.currentScreen.createStyleSheets();
        at.rebuildRenderObjects(at.currentScreen);
        dragHandler = new GDRubberbandDragHandler(at);
    });

    hooks.afterEach(() => {
        at.screenElement.remove();
        at.currentScreen.removeStyleSheets();
        at.project.currentLookAndFeel.breakPointStyleSheet.remove();
        at.project.currentLookAndFeel.cssStyleSheet.remove();
    });

    test("possibleDragOperations", assert => {
        assert.equal(dragHandler.possibleDragOperations({ dataTransfer: { types: [GDRubberbandPassengerPBoardType] } }), GDDragHandler.NSDragOperationLink, "old webView uses own type");
        assert.equal(dragHandler.possibleDragOperations({ dataTransfer: { types: ["text/uri-list"] } }), GDDragHandler.NSDragOperationLink, "WKWebView uses currently this hack");
    });

    test("drop sends command", assert => {
        let cell = at.project.createBasicCellWithBounds(10, 10, 10, 10);
        at.cellInsertComponent(at.currentScreen, cell, 0);
        at._communication = {
            sendCommand: (command, parameters) => {
                assert.equal(command, "rubberBandSelectFigureWithID");
                assert.deepEqual(parameters, { "cellID": cell.objectID });
            }
        }

        const r = cell.DOMElement.getBoundingClientRect();

        dragHandler.drop({ pageX: r.x + 1, pageY: r.y + 1 });
    });

});
