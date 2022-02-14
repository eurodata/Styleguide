/**
 * wrapping a stylesheet and remembering the index for the css-rules.
 *
 * only works for Antetype-style css. Various hacks for speedup. 
 */
export class GDStyleSheet {
    /**
     * 
     * @param {CSSStyleSheet} styleSheet 
     */
    constructor(styleSheet) {
        this._styleSheet = styleSheet;
        this._selectorMap = new Map();
        this._selectorsForDelete = new Set();
    }

    fillSelectorMap() {
        for (let i = 0; i < this._styleSheet.cssRules.length; i++) {
            const rule = this._styleSheet.cssRules[i];
            const selectorText = rule.selectorText;
            if (selectorText) {
                this._selectorMap.set(selectorText, i);
            }
        }
    }


    _appendSelector(selector) {
        const rule = selector + " {} ";
        const i = this._styleSheet.insertRule(rule, this._styleSheet.cssRules.length);
        this._selectorMap.set(selector, i);
        return this._styleSheet.cssRules[i];
    }

    /**
     * appends a new CSS rule for the selector, returns the rule
     * @param {string} selector 
     * @returns {CSSRule} 
     */
    appendSelector(selector) {
        return this._appendSelector(selector);
    }

    /**
     * inserts a new rule for the selector at the given index, returns the rule
     * @param {string} selector 
     * @param {number} index 
     * @returns {CSSRule}
     */
    insertSelector(selector, index) {
        if (index >= this.rulesLength) {
            return this._appendSelector(selector);
        }

        const rule = selector + " {} ";

        const insertedIndex = this._styleSheet.insertRule(rule, index);
        for (var i = insertedIndex + 1; i < this.rulesLength; i++) {
            let rule = this._styleSheet.cssRules[i];
            let selector = rule.selectorText;
            this._selectorMap.set(selector, i);
        }

        this._selectorMap.set(selector, insertedIndex);
        this._selectorsForDelete.delete(selector);      // re-used, what to do with appendSelector? 

        return this._styleSheet.cssRules[insertedIndex];
    }

    /**
     * deletes the rule for the selector
     * @param {string} selector 
     */
    deleteSelector(selector) {
        // #399 since we don't delete anymore make sure we remove old properties
        // but we should delete ... 
        let rule = this.existingRuleForSelector(selector);
        if (rule != undefined) {
            let style = rule.style;
            if (style != undefined) {               // not need for @media rules
                for (let i = style.length; i--;) {
                    let name = style[i];
                    style.removeProperty(name);
                }
            }
        }

        // Issue #337 this is superslow. For measurement we jsut record the selectors ...
        this._selectorsForDelete.add(selector);

        // unless it is a media-rule (used in breakpoints).
        // at least fixed #842. 
        if (rule.type == CSSRule.MEDIA_RULE) {
            const i = this.indexOfSelector(selector);
            if (i == undefined)
                return;
            for (let [s, index] of this._selectorMap.entries()) {
                if (index >= i) {
                    this._selectorMap.set(s, index - 1);
                }
            }

            let r = this._styleSheet.cssRules[i];
            if (r.selectorText != selector) {
                console.log("wrong index: " + i + " rule: " + r.selectorText + " selector: " + selector);
            }
            this._styleSheet.deleteRule(i);
            this._selectorMap.delete(selector);
        }
    }

    /**
     * returns the rule for the selector, or undefined if not in the stylesheet
     * @param {string} selector 
     * @returns {CSSRule|undefined}
     */
    existingRuleForSelector(selector) {
        const index = this.indexOfSelector(selector);
        if (index == undefined)
            return undefined;

        return this._styleSheet.cssRules[index];
    }

    /**
     * returns the index of the rule with the selector, or undefined if we do not have one
     * @param {string} selector 
     * @returns {number|undefined}
     */
    indexOfSelector(selector) {
        return this._selectorMap.get(selector);
    }

    /**
     * the number of rules
     * @returns {number}
     */
    get rulesLength() {
        return this._styleSheet.cssRules.length;
    }

    _recursiveCSSRules(styleSheet) {
        var result = [];
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            let rule = styleSheet.cssRules[i];
            if (rule.cssRules) {
                result = result.concat(this._recursiveCSSRules(rule));
            } else {
                result.push(rule);
            }
        }
        return result;
    }

    /**
        all defined rules. If the Stylesheet contains CSSGroupRules (@media... for example)
        return the cssStyles of those too. 
        @returns {Array<CSSRule>}
    */
    get recursiveCSSRules() {
        return this._recursiveCSSRules(this._styleSheet);
    }

    /**
     * disables all pseudo-states
     */
    disablePseudoStates() {
        this.recursiveCSSRules.forEach((rule) => {
            const selectorText = rule.selectorText;

            if (selectorText) {
                if (selectorText.indexOf(":hover") != -1 || selectorText.indexOf(":active") != -1 || selectorText.indexOf(":focus-within") != -1) {
                    const index = this.indexOfSelector(selectorText);
                    this._selectorMap.delete(selectorText);
                    rule.selectorText = selectorText.replace(":", "_");
                    this._selectorMap.set(rule.selectorText, index);
                }
            }
        });
    }

    /**
     * enables all pseudo states
     */
    enablePseudoStates() {
        this.recursiveCSSRules.forEach((rule) => {
            const selectorText = rule.selectorText;

            if (selectorText) {
                if (selectorText.indexOf("_hover") != -1 || selectorText.indexOf("_active") != -1 || selectorText.indexOf("_focus-within") != -1) {
                    const index = this.indexOfSelector(selectorText);
                    this._selectorMap.delete(selectorText);
                    rule.selectorText = selectorText.replace("_", ":");
                    this._selectorMap.set(rule.selectorText, index);
                }
            }
        });
    }

    /**
     * @private returns the text of the given rule. We have to fix some properties to make
     * it work in non-Safari
     * @param {CSSRule} rule 
     * @returns {string}
     */
    cssStringOfRule(rule) {
        let ruleCSSText = rule.style.cssText;
        // Issue #313  the CSSStyleRule has background: none, but cssTExt not. Works on Chrome 
        // as expected. Looks like a Safari bug, as a workaround we add background:none manually:
        if (rule.style.background == "none" && ruleCSSText.indexOf("background: none") == -1) {
            ruleCSSText += " background: none;";

            // Issue #668 a similar problem. For a pseudo state with color-background and gradient
            // for the normal-state only "background-color" in css-text leaving the background-image gradient
            // in place... 
        } else if (rule.style.backgroundImage == "initial" && ruleCSSText.indexOf("background-image") == -1) {
            ruleCSSText += " background: initial;";
        } else if (rule.style.backgroundImage.indexOf("-gradient") != -1) { // #923
            ruleCSSText += ` background: ${rule.style.backgroundImage};`;
        }

        // add backdrop for chrome: 
        if (rule.style.webkitBackdropFilter != "") {
            ruleCSSText += ` backdrop-filter: ${rule.style.webkitBackdropFilter};`;
        }

        if (ruleCSSText.indexOf("inset:") != -1) {
            // issue 362 since macOS 11.3 WebKit writes inset instead of top/left/bottom/right but
            // uses a syntax which is not supported in Firefox/Chrome. Here we remove the inset
            // and add top/left/right/bottom-values:
            ruleCSSText = ruleCSSText.replace(/inset:[^;]+;/, '');
            if (rule.style.top != "") {
                ruleCSSText += ` top: ${rule.style.top};`;
            }

            if (rule.style.left != "") {
                ruleCSSText += ` left: ${rule.style.left};`;
            }

            if (rule.style.bottom != "") {
                ruleCSSText += ` bottom: ${rule.style.bottom};`;
            }
            if (rule.style.right != "") {
                ruleCSSText += ` right: ${rule.style.right};`;
            }

        }

        return rule.selectorText + " { " + ruleCSSText + "}\n";
    }

    cssTextOfRules(rules) {
        let cssString = "";
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];

            // issue #365: 
            if (rule.style) {
                cssString += this.cssStringOfRule(rule);
            } else if (rule.type == CSSRule.MEDIA_RULE) {
                cssString += `@media ${rule.media.mediaText} {\n`;
                cssString += this.cssTextOfRules(rule.cssRules);
                cssString += "\n}\n";
            }
        }
        return cssString;
    }

    remove() {
        this._styleSheet.ownerNode.remove();
    }

    get cssText() {
        return this.cssTextOfRules(this._styleSheet.cssRules);
    }

    get disabled() {
        return this._styleSheet.disabled;
    }

    set disabled(v) {
        this._styleSheet.disabled = v;
    }

    get ownerNode() {
        return this._styleSheet.ownerNode;
    }

    get cssRules() {
        return this._styleSheet.cssRules;
    }

    get media() {
        return this._styleSheet.media;
    }

}

