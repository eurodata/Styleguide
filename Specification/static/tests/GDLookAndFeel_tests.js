import { GDProject, GDDesignBreakPoint, GDUIColor, CPColor } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

const { test } = QUnit;

QUnit.module("GDLookAndFeel", hooks => {
    /** @type {GDProject} */
    let project;

    /** @type {AntetypeWeb} */
    let antetype;


    hooks.beforeEach(() => {
        project = GDProject.createInstance();
        antetype = new AntetypeWeb();
        antetype.project = project;
        antetype.buildStyleSheet();
    });

    hooks.afterEach(() => {
        project.currentLookAndFeel.cssStyleSheet.remove();
        project.currentLookAndFeel.breakPointStyleSheet.remove();
    });

    test("enablePseudoStates and breakpoints", assert => {
        let breakpoint = GDDesignBreakPoint.createInstance(project);
        breakpoint._breakPointMaxWidth = 400;
        breakpoint.breakPointName = "foo";
        project.addDesignBreakPoint(breakpoint);

        let mediaRule = breakpoint.mediaRule;
        mediaRule.insertSelector("bla:hover");

        project.currentLookAndFeel.disablePseudoStates();
        assert.equal(mediaRule.indexOfSelector("bla:hover"), undefined, "pseudo state not available");
        assert.equal(mediaRule.indexOfSelector("bla_hover"), 0, "pseudo state is made static");

        project.currentLookAndFeel.enablePseudoStates();
        assert.equal(mediaRule.indexOfSelector("bla:hover"), 0, "pseudo state available");
        assert.equal(mediaRule.indexOfSelector("bla_hover"), undefined, "static not available");
    });

    test("css and breakpoints", assert => {
        let breakPoint = new GDDesignBreakPoint({ breakPointName: "foo", breakPointMaxWidth: 300 }, project);
        project.addDesignBreakPoint(breakPoint);

        let breakPointStyleSheet = project.currentLookAndFeel.breakPointStyleSheet;
        assert.equal(breakPointStyleSheet.cssRules.length, 1);
        assert.equal(breakPoint.mediaRule._styleSheet, breakPointStyleSheet.cssRules[0]);
    });

    test("define colors in stylesheet", assert => {
        let lookAndFeel = project.currentLookAndFeel;
        let color = new GDUIColor({ colorValue: { NSColorValue: "1.000000,1.000000,1.000000,1.000000" }, objectId: 'id1234' }, project);
        lookAndFeel.colors.push(color);

        lookAndFeel.addColors();

        assert.ok(lookAndFeel._cssStyleSheet.indexOfSelector(":root") != undefined);
        assert.equal(lookAndFeel._rootRule, lookAndFeel._cssStyleSheet.existingRuleForSelector(":root"));
        assert.equal(lookAndFeel._rootRule.style.getPropertyValue("--id1234"), color.colorValue.toString());
    });

    test("updateColor", assert => {
        let lookAndFeel = project.currentLookAndFeel;
        let color = new GDUIColor({ colorValue: { NSColorValue: "1.000000,1.000000,1.000000,1.000000" }, objectId: 'id1234' }, project);
        lookAndFeel.colors.push(color);

        lookAndFeel.addColors();

        project.updateColor(color, CPColor.fromJSON({ NSColorValue: "0,0,0,1" }));

        assert.equal(color.colorValue.hexString(), "#000000");
        assert.equal(lookAndFeel._rootRule.style.getPropertyValue("--id1234"), color.colorValue.toString());
    });


});


