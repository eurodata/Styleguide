"use strict";

/**
 * wrapping a stylesheet and remembering the index for the css-rules.
 *
 * only works for Antetype-style css. Various hacks for speedup. 
 */
class GDStyleSheet {
    constructor(styleSheet) {
        this._styleSheet = styleSheet;
        this._selectorMap = new Map();
        this._selectorsForDelete = new Set();
    }

    fillSelectorMap() {
        for (let i=0; i<this._styleSheet.cssRules.length; i++) {
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

    insertSelector(selector, index) {
        if (selector == ".D-920531801 .id341740054l") {
            console.log("hohoh");

        }
        if (index >= this.rulesLength) {
            return this._appendSelector(selector);
        }
        const rule = selector + " {} ";

        const insertedIndex = this._styleSheet.insertRule(rule, index);
        for (var i=insertedIndex+1; i<this.rulesLength; i++) {
            let rule = this._styleSheet.cssRules[i];
            let selector = rule.selectorText;
            this._selectorMap.set(selector, i);
        }

        this._selectorMap.set(selector, insertedIndex);
        this._selectorsForDelete.delete(selector);      // re-used, what to do with appendSelector? 

        return this._styleSheet.cssRules[insertedIndex];
    }

    deleteSelector(selector) {
        // #399 since we don't delete anymore make sure we remove old properties
        // but we should delete ... 
        let rule = this.existingRuleForSelector(selector);
        if (rule != undefined) {
            let style = rule.style;
            if (style != undefined) {               // not need for @media rules
                for (let i=style.length; i--;) {
                    let name = style[i];
                    style.removeProperty(name);
                }
            }
        }

        // Issue #337 this is superslow. For measurement we jsut record the selectors ...
        this._selectorsForDelete.add(selector);

/*        const i = this.indexOfSelector(selector);
        if (i == undefined)
            return;
        for (let [s, index] of this._selectorMap.entries()) {
            if (index >= i) {
                this._selectorMap.set(s, index-1);
            }
        }

        let r = this._styleSheet.cssRules[i];
        if (r.selectorText != selector) {
            console.log("wrong index: " + i + " rule: " + r.selectorText + " selector: " + selector);
        }
        this._styleSheet.deleteRule(i);
        this._selectorMap.delete(selector); */
    }

    existingRuleForSelector(selector) {
        const index = this.indexOfSelector(selector);
        if (index == undefined)
            return undefined;

        return this._styleSheet.cssRules[index];
    }

    indexOfSelector(selector) {
        return this._selectorMap.get(selector);
    }

    get rulesLength() {
        return this._styleSheet.cssRules.length;
    }

    _recursiveCSSRules(styleSheet) {
        var result = [];
        for (let i=0; i<styleSheet.cssRules.length; i++) {
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
    */
    get recursiveCSSRules() {
        return this._recursiveCSSRules(this._styleSheet);
    }

    disablePseudoStates() {
        this.recursiveCSSRules.forEach( (rule) => {
            const selectorText = rule.selectorText;

            if (selectorText) {
                if (selectorText.indexOf(":hover") != -1 || selectorText.indexOf(":active") != -1 || selectorText.indexOf(":focus") != -1) {
                    rule.selectorText = selectorText.replace(":", "_");
                }
            }
        });
    }


    enablePseudoStates() {
        this.recursiveCSSRules.forEach( (rule) => {
            const selectorText = rule.selectorText;

            if (selectorText) {
                if (selectorText.indexOf("_hover") != -1 || selectorText.indexOf("_active") != -1 || selectorText.indexOf("_focus") != -1) {
                    rule.selectorText = selectorText.replace("_", ":");
                }
            }
        });
    }

    cssTextOfRules(rules) {
        let cssString = "";
        for (let i=0; i<rules.length; i++) {
            const rule = rules[i];
            
            // issue #365: 
            if (rule.style) {
                // Issue #313  the CSSStyleRule has background: none, but cssTExt not. Works on Chrome 
                // as expected. Looks like a Safari bug, as a workaround we add background:none manually:
                if (rule.style.background == "none" && rule.cssText.indexOf("background: none") == -1) {
                    cssString += rule.selectorText + " { " + rule.style.cssText + " background: none}\n";

                    // Issue #668 a similar problem. For a pseudo state with color-background and gradient
                    // for the normal-state only "background-color" in css-text leaving the background-image gradient
                    // in place... 
                } else if (rule.style.backgroundImage == "initial" && rule.cssText.indexOf("background-image") == -1) {
                    cssString += rule.selectorText + " { " + rule.style.cssText + " background-image: initial}\n";
                } else {
                   cssString += rule.cssText +"\n"; 
                }
            } else if (rule.type == CSSRule.MEDIA_RULE) {
                cssString += `@media ${rule.media.mediaText} {\n`;
                cssString += this.cssTextOfRules(rule.cssRules); 
                cssString += "\n}\n";
            }
        }
        return cssString;
    }



    get cssText() {
        return this.cssTextOfRules(this._styleSheet.cssRules);
    } 
}

