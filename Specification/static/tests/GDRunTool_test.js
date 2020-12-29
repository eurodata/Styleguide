import { GDProject } from '../modules/model.js';
import { AntetypeWeb } from '../modules/viewer.js';

QUnit.module("GDRunTool", {
    beforeEach: function() {
        this.project = GDProject.createInstance();
        this.antetype = new AntetypeWeb();
        this.antetype.project = this.project;
        this.antetype.buildStyleSheet();
        this.screen =  this.project.library.screenWidget.createInstance();
    }


    ,afterEach: function() {
        this.project.currentLookAndFeel.cssStyleSheet.remove();
        this.project.currentLookAndFeel.breakPointStyleSheet.remove();
    }
});

