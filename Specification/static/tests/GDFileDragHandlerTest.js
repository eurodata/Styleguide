import { GDDragHandler, GDFileDragHandler } from "../modules/drag-handler.js";
import { AntetypeWeb } from "../modules/viewer.js";

const { test } = QUnit;

QUnit.module("GDFileDragHandler tests", hooks => {
    let at;
    let dragHandler;

    hooks.beforeEach(() => {
        at = new AntetypeWeb();
        dragHandler = new GDFileDragHandler(at);
    });

    hooks.afterEach(() => {
        at.screenElement.remove();
    });

    test("possibleDragOperations", assert => {
        assert.equal(dragHandler.possibleDragOperations({ dataTransfer: { types: ["Files"] } }), GDDragHandler.NSDragOperationCopy);
        assert.equal(dragHandler.possibleDragOperations({ dataTransfer: { types: ["Files", "text/html"] } }), GDDragHandler.NSDragOperationCopy);
        assert.equal(dragHandler.possibleDragOperations({ dataTransfer: { types: ["text/plain"] } }), GDDragHandler.NSDragOperationNone);
    });

    test("dropSends", assert => {
        let file = new File([1, 2, 3], "name", { type: "image/png" });

        assert.timeout(10);
        const done = assert.async();
        const done2 = assert.async();

        at._communication = {
            sendFile: (name, mimeType, content) => {
                assert.equal(name, file.name);
                assert.equal(mimeType, file.type);
                assert.ok(content);
                done();
            },
            sendCommand: (command, parameters) => {
                assert.equal(command, "setPositionOfDroppedElement");
                assert.deepEqual(parameters, { x: 4, y: 5 });
                done2();
            }
        };

        let preventDefaultCalled = false;
        dragHandler.drop({
            dataTransfer: { files: [file] },
            preventDefault: () => preventDefaultCalled = true,
            pageX: 4,
            pageY: 5
        });

        assert.ok(preventDefaultCalled);
    });


    test("allowed file types", assert => {
        assert.ok(dragHandler.allowedType("image/png"));
        assert.ok(dragHandler.allowedType("image/jpeg"));
        assert.ok(dragHandler.allowedType("image/svg+xml"));
        assert.ok(dragHandler.allowedType("image/gif"));
        assert.notOk(dragHandler.allowedType("text/plain"));
        assert.notOk(dragHandler.allowedType("application/zip"));
    });

    test("no file send for wrong type", assert => {
        let file = new File([1, 2, 3], "name", { type: "text/plain" });

        let sendfileCalled = false;

        at._communication = {
            'sendFile': () => {
                sendfileCalled = true;
            }
        };

        let preventDefaultCalled = false;
        dragHandler.drop({ dataTransfer: { files: [file] }, preventDefault: () => preventDefaultCalled = true });

        assert.notOk(sendfileCalled);
        assert.ok(preventDefaultCalled);
    });

});
