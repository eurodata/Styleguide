import { GDProject, GDDesignBreakPoint, GDScreen } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';
import { createScreenTestElement } from './test-utils.js';

const { test } = QUnit;

QUnit.module("GDScreen", hooks => {
    /** @type {GDProject} */
    let project;

    /** @type {AntetypeWeb} */
    let antetype;

    /** @type {GDScreen} */
    let screen;


    hooks.beforeEach(() => {
        project = GDProject.createInstance();
        antetype = new AntetypeWeb(createScreenTestElement());
        antetype.project = project;
        antetype.buildStyleSheet();
        screen = project.createScreen();
    });


    hooks.afterEach(() => {
        project.currentLookAndFeel.cssStyleSheet.remove();
        project.currentLookAndFeel.breakPointStyleSheet.remove();
    });


    test("screen has two stylesheets", assert => {
        const styleCount = document.styleSheets.length;
        screen.createStyleSheets();
        assert.equal(document.styleSheets.length, styleCount + 2);

        const lookAndFeelStyleSheet = project.currentLookAndFeel.cssStyleSheet._styleSheet;
        const lookAndFeelBreakpointsStyleSheet = project.currentLookAndFeel.breakPointStyleSheet._styleSheet;

        function indexOfStyleSheet(s) {
            for (let i = 0; i < document.styleSheets.length; i++)
                if (document.styleSheets[i] == s)
                    return i;

            return -1;
        }

        assert.ok(indexOfStyleSheet(screen.cssStyleSheet._styleSheet)
            > indexOfStyleSheet(lookAndFeelStyleSheet), "screen styles after l&f stylesheet");
        assert.ok(indexOfStyleSheet(screen.cssStyleSheet._styleSheet)
            < indexOfStyleSheet(lookAndFeelBreakpointsStyleSheet), "screen styles before l&f breakpoint styles");
    });

    test("cleanupStyles keeps but disables the style-sheets", assert => {
        screen.createStyleSheets();
        const styleCountWithScreenStyleSheets = document.styleSheets.length;
        screen.cleanupStyles();

        assert.ok(screen.cssStyleSheet._styleSheet.disabled);
        assert.ok(screen.breakPointStyleSheet._styleSheet.disabled);


        assert.equal(document.styleSheets.length, styleCountWithScreenStyleSheets);
    });

    test("removeStyleSheets removes the style-sheets", assert => {
        const styleCount = document.styleSheets.length;
        screen.createStyleSheets();
        screen.removeStyleSheets();

        assert.equal(document.styleSheets.length, styleCount);
    });


    test("createStyleSheets and breakpoints", assert => {
        let breakpoint = GDDesignBreakPoint.createInstance(project);
        breakpoint._breakPointMaxWidth = 400;
        breakpoint.breakPointName = "foo";
        project.addDesignBreakPoint(breakpoint);

        let anotherBreakpoint = GDDesignBreakPoint.createInstance(project);
        anotherBreakpoint._breakPointMaxWidth = 800;
        anotherBreakpoint.breakPointName = "bar";
        project.addDesignBreakPoint(anotherBreakpoint);

        screen.createStyleSheets();
        assert.equal(screen.breakPointStyleSheet.rulesLength, 2);

        let mediaRule = screen.mediaRuleForBreakpoint(breakpoint);
        assert.ok(mediaRule != undefined, "media rule is available");
        assert.ok(mediaRule._styleSheet.media.mediaText.indexOf("400") != -1, "");


        let anotherMediaRule = screen.mediaRuleForBreakpoint(anotherBreakpoint);
        assert.ok(anotherMediaRule != undefined, "media rule is available");
        assert.ok(anotherMediaRule._styleSheet.media.mediaText.indexOf("800") != -1, "");
    });

    test("screen has html-style", assert => {
        screen.createStyleSheets();
        const style = screen.htmlCSSStyle;
        assert.ok(style != undefined, "screen has a style");
        const rule = style.parentRule;
        assert.equal(rule.selectorText, "html");
    });


    test("enablePseudoStates and breakpoints", assert => {
        let breakpoint = GDDesignBreakPoint.createInstance(project);
        breakpoint._breakPointMaxWidth = 400;
        breakpoint.breakPointName = "foo";
        project.addDesignBreakPoint(breakpoint);

        screen.createStyleSheets();
        let mediaRule = screen.mediaRuleForBreakpoint(breakpoint);
        mediaRule.insertSelector("bla:hover");

        screen.disablePseudoStates();
        assert.equal(mediaRule.indexOfSelector("bla:hover"), undefined, "pseudo state not available");
        assert.equal(mediaRule.indexOfSelector("bla_hover"), 0, "pseudo state is made static");

        screen.enablePseudoStates();
        assert.equal(mediaRule.indexOfSelector("bla:hover"), 0, "pseudo state available");
        assert.equal(mediaRule.indexOfSelector("bla_hover"), undefined, "static not available");
    });

});


