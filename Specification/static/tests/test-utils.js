import { AntetypeWeb } from '../modules/viewer.js';
import { GDProject, GDFixedLayoutPolicyCode, GDFixResizing } from '../modules/model.js';

export function buildAntetypeWithScreen(test) {
    let element = document.createElement("div");
    element.style.width="800px";
    element.style.height="600px";
    element.style.position="absolute";
    element.style.top="10px";
    element.style.left="10px";
    document.body.appendChild(element);
    test.at = new AntetypeWeb(element);
    test.at.project = GDProject.createInstance();
    test.at.buildStyleSheet();
    test.screen = test.at.project.library.screenWidget.createInstance();
    test.screen.setProperty("verticalResizing", GDFixResizing);
    test.screen.setProperty("horizontalResizing", GDFixResizing);
    test.screen.setProperty("width", 800);
    test.screen.setProperty("height", 600);
    test.screen.setProperty("layoutPolicyCode", GDFixedLayoutPolicyCode);
    test.screen.createStyleSheets();
    element.figure = test.screen;       //??
    test.screen.DOMElement = element;    
    test.at.currentScreen = test.screen;

    test.at.rebuildRenderObjects(test.screen);
}

export function cleanupAntetypeWithScreen(test) {
    test.screen.removeStyleSheets();
    test.at.project.currentLookAndFeel.cssStyleSheet.remove();
    test.at.project.currentLookAndFeel.breakPointStyleSheet.remove();
    test.at.screenElement.remove();
}


