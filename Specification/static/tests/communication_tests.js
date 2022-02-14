import { GDCommunication } from "../modules/communication.js";

QUnit.module("communication test", {
    beforeEach: function() {

    }, 
    afterEach: function() {

    }
});

QUnit.test("internal webview uses direct communication", function(assert) {
    let at = {runsInAntetype: true};
    let commands = [];
    let window = {serverDocument: {runCommand: (c) => commands.push(c)}};
    let communication = new GDCommunication(window, at);
    communication.sendCommand("foo", "bar");

    assert.equal(commands.length, 1);
    assert.equal(commands[0].command, "foo")
    assert.equal(commands[0].parameters, "bar")
});

QUnit.test("internal wkwebview uses direct communication", function(assert) {
    let at = {runsInAntetype: true};
    let commands = [];
    let window = {parent: {webkit: {messageHandlers: {serverDocument: {postMessage:  (c) => commands.push(c)}}}}};
    let communication = new GDCommunication(window, at);
    communication.sendCommand("foo", "bar");

    assert.equal(commands.length, 1);
    assert.equal(commands[0].command, "foo")
    assert.equal(commands[0].parameters, "bar")
});

QUnit.test("live preview uses fetch", function(assert) {
    let at = {runsInAntetype: false, serverDocumentName: "2"};
    let resource;
    let options;
    let window = {fetch: (r, i)=> {resource = r; options = i} };
    let communication = new GDCommunication(window, at);
    communication.sendCommand("foo", "bar");

    assert.equal( resource, `/proxy/command/${at.serverDocumentName}`)
    assert.equal( options.method, "POST");
    let command = JSON.parse(options.body);
    assert.equal( command.command, "foo");
    assert.equal( command.parameters, "bar");
});
