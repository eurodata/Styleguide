"use strict";
/*
QUnit.module("interactions", {
    beforeEach: function() {
    }
});



QUnit.test("action chaining", function(assert) {
    let actionSet = new GDActionSet({orderedActions: [], orderedElements: []});

    let log = [];

    class GDTestAction extends GDAction {
        execute(e) {
            log.push({action: this, time: Date.now()});

        }
    }

    let a1= new GDTestAction({delay:0.01, afterPrevious:false});
    let a2= new GDTestAction({delay:0.01, afterPrevious:true});

    actionSet.orderedActions = [a1,a2];
    let done = assert.async();
    setTimeout( () => {
        assert.equal(log.length,2);
        let start = log[0].time;
        let end = log[1].time;
       
        assert.ok( end - start > 10)
        done();
    }, 100)

    
    actionSet.execute({});





});
QUnit.test("oneByOne vs. together for ActionSets", function(assert) {

});

QUnit.test("action set knows if finished", function(assert) {

});

QUnit.test("animateend vs. transitionend", function(assert) {

});
*/
