import { AntetypeWeb } from '../modules/viewer.js';
import { GDProject, GDFixedLayoutPolicyCode, GDFixResizing } from '../modules/model.js';


export function buildAntetypeWithScreen() {
    let element = createScreenTestElement();
    let at = new AntetypeWeb(element);

    // test.at._communication = {
    //     sendCommand: (commandName, parameters) =>
    //         console.log(`sendCommand(${commandName}, ${parameters})`),
    //     sendFile: (name, mimeType, content) =>
    //         console.log(`sendFile(${name}, ${mimeType}, ${content})`)
    // };

    at.project = GDProject.createInstance();
    at.buildStyleSheet();

    let screen = at.project.createScreen();
    screen.setProperty("horizontalResizing", GDFixResizing);
    screen.setProperty("width", 800);
    screen.setProperty("verticalResizing", GDFixResizing);
    screen.setProperty("height", 600);
    screen.setProperty("layoutPolicyCode", GDFixedLayoutPolicyCode);
    screen.createStyleSheets();
    element.figure = screen;       //??
    screen.DOMElement = element;
    at.currentScreen = screen;

    at.rebuildRenderObjects(screen);

    return at;
}

export function createScreenTestElement() {
    let element = document.createElement("div");
    element.style.width = "800px";
    element.style.height = "600px";
    element.style.position = "absolute";
    element.style.top = "10px";
    element.style.left = "10px";

    let qunitFixture = document.getElementById("qunit-fixture");
    qunitFixture.appendChild(element);
    return element;
}

export function cleanupAntetypeWithScreen(at) {
    at.currentScreen.removeStyleSheets();
    at.project.currentLookAndFeel.cssStyleSheet.remove();
    at.project.currentLookAndFeel.breakPointStyleSheet.remove();
    at.screenElement.remove();
}


