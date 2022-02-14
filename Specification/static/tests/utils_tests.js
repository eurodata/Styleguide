import { sizeHighlightCell } from "../modules/utils.js";

const { test } = QUnit;

QUnit.module("utils tests", hooks => {
    test("sizeHighlightCell and hidden cell", assert => {
        const highlight = document.createElement("div");
        sizeHighlightCell(highlight, { top: 0, left: 0, width: 0, height: 0 });
        assert.notEqual(highlight.style.display, "none", "do not change here");

        sizeHighlightCell(highlight, { top: 1, left: 2, width: 3, height: 4 });
        assert.equal(highlight.style.top, "1px");
        assert.equal(highlight.style.left, "2px");
        assert.equal(highlight.style.width, "calc(3px*var(--current-zoom))");
        assert.equal(highlight.style.height, "calc(4px*var(--current-zoom))");
    });
});