(function () {
  'use strict';

  /*
      a event target is not necessarily the element we are interested in Antetype 
      (for example a Antetype-cell might consists of multiple DOM-Element). 
      This function return the id of the toplevel-Antetype-cell 
  */
  function targetIDFromEventTarget(target) {
      if (!target) {
          return undefined;
      }

      let targetID = undefined;

      // if target is not an Antetype cell go up until we find one. Currently used in text or vector. 
      if(target.nodeName.toLowerCase() != "cell") {
          let targetElement = target.parentElement;
          while(targetElement != null && targetElement.nodeName.toLowerCase() != "cell") {
              targetElement = targetElement.parentElement;
          }

          if (targetElement) {
              targetID = targetElement.id;
          }
      } else {
          targetID = target.id; 
      }

      return targetID;
  }

  /*
      We transfer DOM-Events into Antetype (used in the various webKeyDown, webMouseDown-etc. 
      methods in GDTool. 
  */
  function transferEvent(e) {
      var targetID = targetIDFromEventTarget(e.target);
      var handle;
      if (e.target) {
          if (e.target.atHandle) {
              var atHandle = e.target.atHandle;
              handle = {"ownerID": atHandle.ownerWebID(), "keyPath": atHandle.keyPath()};
          }
      }

      var d = {"shiftKey" : e.shiftKey, "ctrlKey": e.ctrlKey, "altKey": e.altKey, "metaKey": e.metaKey, 
              "target": targetID, "handle": handle, "screenX": e.screenX, "screenY": e.screenY, 
              "clientX": e.clientX, "clientY": e.clientY, "offsetX": e.offsetX, "offsetY": e.offsetY};

      if (e.dataTransfer) {
          var data = {};
          for (var i=0; i<e.dataTransfer.types.length; i++) {
              var type = e.dataTransfer.types[i];
              var typeData = e.dataTransfer.getData(type);
              data[type] = typeData;
              data["effectAllowed"] = e.dataTransfer.effectAllowed;
              data["dropEffect"] = e.dataTransfer.dropEffect;
          }
          d["dataTransfer"] = {"data" : data};
      }

      return d;
  }



  // we use contentEditable for editing, but only want <br> as newlines in our text
  // this function tries to convert the mixture of <div> and <br>'s from the contentEditable-edit-span
  // to our format. Quiet a mess, but I don't see a pattern when Safari decides to use a <div> or a <br>
  function stringFromContentEditable(element) {
      if (element == undefined) 
          return "";

      let newText = element.innerHTML;

      if (newText == "<br>") {
          return "";
      }

      newText = newText.replace(/<div><br><\/div>/g, "<br>");     // #552 a single return in the first line is converted as <div><br></div> ..
      newText = newText.replace(/<div>/g, "<br>");
      newText = newText.replace(/<\/div>/g,"");
      return newText;
  }

  /**
   * 
   * @param {HTMLElement} DOMElement the element to measure
   * @returns {Object} the bounds (top,left,with,height) 
   */
  function globalBoundsOfElement(DOMElement) {
      var r = DOMElement.getBoundingClientRect();
      var offsetX = window.scrollX;
      var offsetY = window.scrollY;

      return {top: r.top + offsetY, left: r.left + offsetX, width: r.width, height: r.height};
  }

  function intersectsBounds(b1,b2) {
      if (b1.width <=0 || b1.height <=0 || b2.width <= 0 || b2.height <=0) {
          return false;
      }
    
      let x1 = Math.max(b1.left, b2.left);
      let x2 = Math.min(b1.left + b1.width, b2.left + b2.width);
      let y1 = Math.max(b1.top, b2.top);
      let y2 = Math.min(b1.top + b1.height, b2.top + b2.height);
      return x1 < x2 && y1 < y2;  
  }
  function GDEqualRects(a,b) {
      return a.top == b.top && a.left == b.left && a.width == b.width && a.height == b.height;
  }
  function sizeHighlightCell(highlight, r) {
      highlight.style.top = r.top + "px";
      highlight.style.left = r.left  + "px";
      highlight.style.width = r.width  + "px";
      highlight.style.height = r.height  + "px";
  }


  /**
   * Post messages to iOS-viewer
   */
  function gdPostViewerMessage(msg, params) {
      if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.antetypeFinishedLoadingHandler && window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage) {
          if (params == undefined) {
              params = {};
          }

          var command = {"command": msg, "parameters": params};
          window.webkit.messageHandlers.antetypeFinishedLoadingHandler.postMessage(command);
      }
  }


  /**
      if cell's container is of the same widget we use the state, otherwise
      use the activeState. This is more complicated in the case of breakpoints. 
      Here we cannot rely on the "active-state" to be the one we need and furthermore
      the container-widget might have different breakpoint-states enabled...

      See #1024 for the discussion

  */
  function currentContainerStateIdentifier(cell, stateIdentifier) {
      const container = cell.container;
      if (container == undefined)  {
          return undefined;
      }

      if (container.widget && container.widget == cell.widget) {
          return stateIdentifier; 
      } 
     
      const state = cell.project.stateWithIdentifier(stateIdentifier);
      const containerState = cell.project.stateWithIdentifier(container.activeStateIdentifier);
      const containerBreakPointStates =  containerState.breakPointStates();

      if (state.designBreakPoint()) {
          // if the current state is a breakpoint-state find the right state in the container widget:
          let containerStateInBreakPoint = containerBreakPointStates[0]; 
          for (let i=0; i<containerBreakPointStates.length-1; i++) {
              const containerState = containerBreakPointStates[i];
              if (containerState.designBreakPoint() && containerState.designBreakPoint().breakPointMaxWidth <= state.designBreakPoint().breakPointMaxWidth) {
                  containerStateInBreakPoint = containerState; 
              } 
          }
          if (containerStateInBreakPoint) {
              return containerStateInBreakPoint.identifier;
          }
      } else if (containerState.designBreakPoint()) {
          // if the active-container state is a breakpoint state, but the current state not, we find 
          // the state in the "default"-breakpoint:
          const stateInDefaultBreakPoint =  containerBreakPointStates[containerBreakPointStates.length-1];
          return stateInDefaultBreakPoint.identifier;
      }

      return container.activeStateIdentifier;
  }

  /**
   * wrapping a stylesheet and remembering the index for the css-rules.
   *
   * only works for Antetype-style css. Various hacks for speedup. 
   */
  class GDStyleSheet {
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
          for (var i=insertedIndex+1; i<this.rulesLength; i++) {
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
                  for (let i=style.length; i--;) {
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
                      this._selectorMap.set(s, index-1);
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
          @returns {Array<CSSRule>}
      */
      get recursiveCSSRules() {
          return this._recursiveCSSRules(this._styleSheet);
      }

      /**
       * disables all pseudo-states
       */
      disablePseudoStates() {
          this.recursiveCSSRules.forEach( (rule) => {
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
          this.recursiveCSSRules.forEach( (rule) => {
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
          let cssString = "";
          // Issue #313  the CSSStyleRule has background: none, but cssTExt not. Works on Chrome 
          // as expected. Looks like a Safari bug, as a workaround we add background:none manually:
          if (rule.style.background == "none" && rule.cssText.indexOf("background: none") == -1) {
              cssString += rule.selectorText + " { " + rule.style.cssText + " background: none}\n";

              // Issue #668 a similar problem. For a pseudo state with color-background and gradient
              // for the normal-state only "background-color" in css-text leaving the background-image gradient
              // in place... 
          } else if (rule.style.backgroundImage == "initial" && rule.cssText.indexOf("background-image") == -1) {
              cssString += rule.selectorText + " { " + rule.style.cssText + " background-image: initial}\n";
          } else if (rule.style.backgroundImage.indexOf("-gradient") != -1) { // #923
              cssString += rule.selectorText + " { " + rule.style.cssText + ` background: ${rule.style.backgroundImage}}\n`;
          } else {
             cssString += rule.cssText +"\n"; 
          }

          return cssString;
      }

      cssTextOfRules(rules) {
          let cssString = "";
          for (let i=0; i<rules.length; i++) {
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

  function removeTextSpan(cell) {
      var domElement = cell.DOMElement;
      if (domElement === undefined) {
          return;
      }
      var spanElement = domElement.textSpan;
      if (spanElement == undefined) 
          return;

      domElement.removeChild(spanElement);
      domElement.textSpan = undefined;
  }




  function dimensionStyles(style, cell, state, containerState) {
      // Set vertical resizing
      verticalResizingCSS(style, cell, state, containerState);
      // Set horizontal resizing
      horizontalResizingCSS(style, cell, state, containerState);
      // Set layout policy and active layout
      layoutPolicyCodeAndActiveLayoutCSS(style, cell, state, containerState);
  }




  function verticalResizingCSS(style, cell, state, containerState) {
      // Necessary cell properties
      const cellVerticalResizing = cell.valueForKeyInStateWithIdentifier("verticalResizing", state);
      const cellMarginTop  = cell.valueForKeyInStateWithIdentifier("marginTop", state);
      const cellMarginBottom = cell.valueForKeyInStateWithIdentifier("marginBottom", state);
      const cellPaddingTop  = cell.valueForKeyInStateWithIdentifier("paddingTop", state);
      const cellPaddingBottom = cell.valueForKeyInStateWithIdentifier("paddingBottom", state);
      const cellBorderTop  = cell.valueForKeyInStateWithIdentifier("borderTopWidth", state);
      const cellBorderBottom = cell.valueForKeyInStateWithIdentifier("borderBottomWidth", state);
      const cellActiveLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", state);
      const cellHeight = cell.valueForKeyInStateWithIdentifier("height", state);
      const cellFlexHeightPercentage = cell.valueForKeyInStateWithIdentifier("flexHeightPercentage", state);
      const cellMinimumHeight = cell.valueForKeyInStateWithIdentifier("minimumHeight", state);
      const cellMaximumHeight = cell.valueForKeyInStateWithIdentifier("maximumHeight", state);

      // Necessary container cell properties
      const container = cell.container;
      const hasContainer = container !== undefined ? true : false;

      const containerLayoutPolicyCode = hasContainer ? container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState) : undefined;
      const containerUsesFlex = containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode;
      const containerUsesStacked = containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode;
      const containerPaddingTop = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingTop", containerState) : "0";
      const containerPaddingBottom = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingBottom", containerState) : "0";

      // Set vertical resizing properties
      switch(cellVerticalResizing) {
          case GDIntrinsicResizing: 
              style.height = "auto";
              if (containerUsesFlex) { 
                  if (containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                      style.flex = "0 0 auto";
                  } else { 
                      style.alignSelf = "auto"; 
                  }
              } else {
                  style.flex= "";
                  style.alignSelf = "";
              }
              break;
          case GDFlexResizing: {
              if (containerUsesFlex) {
                  if(cellActiveLayout) { 
                      style.height = "calc("+cellFlexHeightPercentage+"% - ("+containerPaddingTop+"px + "+containerPaddingBottom+"px + "+cellMarginTop+"px + "+cellMarginBottom+"px))";
                  } else {
                     style.height = "auto";
                  }

                  if (containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                      if (cellFlexHeightPercentage == 100) {
                          style.flex = "1 1 calc(" + cellFlexHeightPercentage + "% - (" + cellPaddingTop + "px + " + cellPaddingBottom + "px + " + cellMarginTop + "px + " + cellMarginBottom + "px + " + cellBorderTop + "px + " + cellBorderBottom + "px))" ;
                      } else {
                          style.flex = "0 1 calc(" + cellFlexHeightPercentage + "% - (" + cellMarginTop + "px + " + cellMarginBottom + "px))" ;
                      }
                  } else {
                      if (cellFlexHeightPercentage == 100) {
                          style.alignSelf= "stretch";
                      } else {
                          style.height = "calc(" + cellFlexHeightPercentage + "% - (" + cellMarginTop + "px + " + cellMarginBottom + "px))" ;
                      }
                  }
              } else if(containerUsesStacked) {
                  style.alignSelf = "stretch";
                  if (cellFlexHeightPercentage == 100) {
                      style.height = "auto"; 
                  } else {
                      style.height = "calc(" + cellFlexHeightPercentage + "% - (" + cellMarginTop + "px + " + cellMarginBottom + "px))" ;
                  }
              } else {
                  style.height = cellFlexHeightPercentage+ "%"; 
              }
              break;
          }
          default: {
              if (containerUsesFlex && containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                  style.flex = "0 0 " + cellHeight+ "px";
              } 
              style.height = cellHeight + "px";
              if (containerUsesFlex && containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                  style.alignSelf = "auto";
              }
          }
      }

      style.minHeight = cellMinimumHeight + "px";
      style.maxHeight = cellMaximumHeight + "px";  
  }


  function horizontalResizingCSS(style, cell, state, containerState) {
      // Necessary cell properties
      const cellHorizontalResizing = cell.valueForKeyInStateWithIdentifier("horizontalResizing", state);
      const cellMarginLeft  = cell.valueForKeyInStateWithIdentifier("marginLeft", state);
      const cellMarginRight = cell.valueForKeyInStateWithIdentifier("marginRight", state);
      const cellPaddingLeft  = cell.valueForKeyInStateWithIdentifier("paddingLeft", state);
      const cellPaddingRight = cell.valueForKeyInStateWithIdentifier("paddingRight", state);
      const cellBorderLeft  = cell.valueForKeyInStateWithIdentifier("borderLeftWidth", state);
      const cellBorderRight = cell.valueForKeyInStateWithIdentifier("borderRightWidth", state);
      const cellActiveLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", state);
      const cellWidth = cell.valueForKeyInStateWithIdentifier("width", state);
      const cellFlexWidthPercentage = cell.valueForKeyInStateWithIdentifier("flexWidthPercentage", state);
      const cellMinimumWidth = cell.valueForKeyInStateWithIdentifier("minimumWidth", state); 
      const cellMaximumWidth = cell.valueForKeyInStateWithIdentifier("maximumWidth", state);

      // Necessary container cell properties
      const container = cell.container;
      const hasContainer = container !== undefined ? true : false;

      const containerLayoutPolicyCode = hasContainer ? container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState) : undefined;
      const containerUsesFlex = containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode;
      const containerUsesStacked = containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode;
      const containerPaddingLeft = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingLeft", containerState) : "0";
      const containerPaddingRight = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingRight", containerState) : "0";

      // Set horizontal resizing properties
      switch(cellHorizontalResizing) {
          case GDIntrinsicResizing: 
              style.width = "auto"; 
              if (containerUsesFlex) {
                  if (containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      style.flex = "0 0 auto";
                  } else {
                      style.alignSelf = "auto";
                  }

              } else {
                  style.flex = "";
                  style.alignSelf = "";
              }
              break;
          case GDFlexResizing: 
              if (containerUsesFlex) {
                  if(cellActiveLayout) { 
                      style.width = "calc("+cellFlexWidthPercentage+"% - ("+containerPaddingLeft+"px + "+containerPaddingRight+"px + "+cellMarginLeft+"px + "+cellMarginRight+"px))";
                  } else {
                     style.width = "auto"; 
                  }
                  
                  if (containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      if (cellFlexWidthPercentage == 100) {
                          style.flex = "1 1 calc(" + cellFlexWidthPercentage + "% - (" + cellPaddingLeft+ "px + " + cellPaddingRight+ "px + " + cellMarginLeft+ "px + " + cellMarginRight+ "px + " + cellBorderLeft + "px + " + cellBorderRight + "px))" ;

                      } else {
                          style.flex = "0 1 calc(" + cellFlexWidthPercentage + "% - (" + cellMarginLeft+ "px + " + cellMarginRight + "px))" ;
                      }
                      
                  } else {
                      if (cellFlexWidthPercentage == 100 && cellMaximumWidth >= GDMaxSizeValue) { // #112 max-width bug
                          style.alignSelf = "stretch"; 
                      } else {
                          style.alignSelf = "auto";
                          style.width = "calc(" + cellFlexWidthPercentage + "% - (" + cellMarginLeft+ "px + " + cellMarginRight + "px))" ;
                      }
                  }
              } 
              else if (containerUsesStacked) {
                  style.alignSelf = "stretch"; 
                  if (cellFlexWidthPercentage != 100 ||  cellMaximumWidth >= GDMaxSizeValue) { // #112 max-width bug
                      style.width = "calc(" + cellFlexWidthPercentage + "% - (" + cellMarginLeft+ "px + " + cellMarginRight + "px))" ;
                  }
              } else {
                  style.width = cellFlexWidthPercentage+ "%";
              }
              break;
          default: 
          {
              if (containerUsesFlex && containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                  style.flex = "0 0 " + cellWidth + "px";
              }
              style.width = cellWidth + "px"; 
              if (containerUsesFlex && containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
                  style.alignSelf = "auto";
              }
          }
      }

      style.minWidth = cellMinimumWidth + "px";
      style.maxWidth = cellMaximumWidth + "px"; 
  }


  function layoutPolicyCodeAndActiveLayoutCSS(style, cell, state, containerState) {
      // Necessary cell properties
      const cellMarginTop  = cell.valueForKeyInStateWithIdentifier("marginTop", state);
      const cellMarginBottom = cell.valueForKeyInStateWithIdentifier("marginBottom", state);
      const cellMarginLeft  = cell.valueForKeyInStateWithIdentifier("marginLeft", state);
      const cellMarginRight = cell.valueForKeyInStateWithIdentifier("marginRight", state);
      const cellActiveLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", state);
      const cellXPosition = cell.valueForKeyInStateWithIdentifier("x", state);
      const cellYPosition = cell.valueForKeyInStateWithIdentifier("y", state);
      const cellActiveVerticalAlignment = cell.valueForKeyInStateWithIdentifier("activeVerticalAlignment", state);
      const cellActiveHorizontalAlignment = cell.valueForKeyInStateWithIdentifier("activeHorizontalAlignment", state);
      const cellVerticalResizing = cell.valueForKeyInStateWithIdentifier("verticalResizing", state);

      // Necessary container cell properties
      const container = cell.container;
      const hasContainer = container !== undefined ? true : false;
      const containerLayoutPolicyCode = hasContainer ? container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState) : undefined;
      const containerUsesStacked = containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode;
      const containerPaddingTop = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingTop", containerState) : "0";
      const containerPaddingBottom = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingBottom", containerState) : "0";
      const containerPaddingLeft = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingLeft", containerState) : "0";
      const containerPaddingRight = hasContainer ? container.valueForKeyInStateWithIdentifier("paddingRight", containerState) : "0";
      const containerVerticalAlignment = hasContainer ? container.valueForKeyInStateWithIdentifier("verticalAlignment", containerState) : undefined;
      const containerHorizontalAlignment = hasContainer ? container.valueForKeyInStateWithIdentifier("horizontalAlignment", containerState) : undefined;

      // Set layout policy code and active layout properties
      // Free Layout 
      if (containerLayoutPolicyCode == GDFixedLayoutPolicyCode && !cellActiveLayout) {
          style.position = "absolute";

          // issue #155 need to clear those two properties: 
          style.bottom = "unset";
          style.right = "unset";

          // TO DO: Fixed Position after changing container layout to fixed layout
          style.left = cellXPosition - cellMarginLeft + "px";     // #333 CSS adds the margin 
          style.top = cellYPosition - cellMarginTop + "px";
      } else if(containerLayoutPolicyCode == GDAlignmentLayoutPolicyCode) {
          style.left = "unset"; 
          style.right = "unset";
          style.top = "unset";
          style.bottom = "unset";
          const horizontalAlignment = cellActiveLayout ? cellActiveHorizontalAlignment : containerHorizontalAlignment;
          const verticalAlignment = cellActiveLayout ? cellActiveVerticalAlignment : containerVerticalAlignment;

          let justify = "";
          switch(horizontalAlignment) {
              case GDLeftAlignment: 
                  justify = "start";
                  break;
              case GDCenterAlignment: 
                  justify = "center";
                  break;
              case GDRightAlignment: 
                  justify = "end";
                  break;
          }
          
          let align = "";
          switch(verticalAlignment) {
              case GDTopAlignment: 
                  align = "start";
                  break;
              case GDCenterAlignment:
                  align = "center";
                  break;
              case GDBottomAlignment: 
                  align = "end";
                  break;
          } 

          if (cellVerticalResizing == GDFlexResizing) {
              align = "stretch";
          }

          style.placeSelf = align + " " + justify;
          style.gridColumn = "1";
          style.gridRow = "1";
          style.position = "relative";
      
      } else if (cellActiveLayout && !containerUsesStacked) {
          const fixed = cell.valueForKeyInStateWithIdentifier("fixedLayout", state);
          style.position = fixed ? "fixed" : "absolute";
          var centeringTransformations = "";

          // Check if alignment layout or active layout

          switch(cellActiveHorizontalAlignment) {
              case GDLeftAlignment: 
                  style.left = "calc(0px + "+containerPaddingLeft+"px)";
                  style.right = "unset";
                  break;
              case GDCenterAlignment: 
                  var horizontalPaddingAndMargins = ((containerPaddingLeft - cellMarginLeft - cellMarginRight - containerPaddingRight) / 2.0);
                  if(horizontalPaddingAndMargins !== undefined) {
                      style.left = "calc(50% + "+horizontalPaddingAndMargins+"px)";   
                  }
                  else {
                      style.left = "calc(50%)";
                  }
                  centeringTransformations = "translate(-50%,0%) ";
                  style.right = "unset";
                  break;
              case GDRightAlignment: 
                  style.left = "unset";
                  style.right = "calc(0px + "+containerPaddingRight+"px)";
                  break;
          }
          
          switch(cellActiveVerticalAlignment) {
              case GDTopAlignment: 
                  style.top = "calc(0px + "+containerPaddingTop+"px)";
                  style.bottom = "unset";
                  break;
              case GDCenterAlignment:
                  var verticalPaddingAndMargins = ((containerPaddingTop - cellMarginTop - cellMarginBottom - containerPaddingBottom) / 2.0);
                  if(verticalPaddingAndMargins !== undefined) {
                      style.top = "calc(50% + "+verticalPaddingAndMargins+"px)";   
                  }
                  else {
                      style.top = "calc(50%)";
                  }
                  centeringTransformations += "translate(0%,-50%) ";
                  style.bottom = "unset";
                  break;
              case GDBottomAlignment: 
                  style.top = "unset";
                  style.bottom = "calc(0px + "+containerPaddingBottom+"px)";
                  break;
          } 
          
          cssTransformPropertyHandler(style, style.transform, centeringTransformations, false);
      } else if(containerLayoutPolicyCode == GDHorizontalBoxLayoutPolicyCode || containerLayoutPolicyCode == GDVerticalBoxLayoutPolicyCode) {
          // Reset these properties
          style.left = "unset"; 
          style.right = "unset";
          style.top = "unset";
          style.bottom = "unset";
          style.position = "relative";

          // #238 if widget has active layout, but instance not we have to overwrite the tranform... 
          // will break for rotation? 
          if (cell.valueForKeyInStateWithIdentifier("rotationAngle", state) == 0) {
              style.transform = "unset";
          }
          style.justifySelf = "unset";
          style.gridColumn = "unset";
          style.gridRow = "unset";
      }
  }


  function layoutCSS(style, cell, state, containerState) {
      var containerLayoutPolicyCode;
      if (cell.container) {
          containerLayoutPolicyCode = cell.container.valueForKeyInStateWithIdentifier("layoutPolicyCode", containerState);        
      } 
      
      var layoutPolicyCode = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", state);
      if (layoutPolicyCode == GDVerticalBoxLayoutPolicyCode || layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
          if (cell.valueForKeyInStateWithIdentifier("isDisplay", state) == false) {
              style.display = "none";
          } else {
              style.display = "flex";
          }

          if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
              style.flexDirection = "row";
          } else {
              style.flexDirection = "column";
          }

          if (cell.valueForKeyInStateWithIdentifier("layoutWrap", state)) {
              style.flexWrap = "wrap";
          } else {
              style.flexWrap = "nowrap";
          }


          var justify = "center";
          var alignment = "center";
          switch(cell.valueForKeyInStateWithIdentifier("horizontalAlignment", state)) {
              case GDLeftAlignment: 
                  if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      justify = "flex-start";
                  } else {
                      alignment = "flex-start";
                  }
                  break;
              case GDCenterAlignment: 
                  if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      justify = "center";
                  } else {
                      alignment = "center";
                  }
                  break;
              case GDRightAlignment: 
                  if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      justify = "flex-end";
                  } else {
                      alignment = "flex-end";
                  }
                  break;
          }
          
          switch(cell.valueForKeyInStateWithIdentifier("verticalAlignment", state)) {
              case GDTopAlignment: 
                  if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      alignment = "flex-start";
                  } else {
                      justify = "flex-start";
                  }
                  break;
              case GDCenterAlignment: 
                  if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      alignment = "center";
                  } else {
                      justify = "center";
                  }
                  break;
              case GDBottomAlignment: 
                  if (layoutPolicyCode == GDHorizontalBoxLayoutPolicyCode) {
                      alignment = "flex-end";
                  } else {
                      justify = "flex-end";
                  }
                  break;
          }
          style.alignItems = alignment;
          style.alignContent = alignment;
          style.justifyContent = justify;
      } else if (layoutPolicyCode == GDAlignmentLayoutPolicyCode) {
          if (cell.valueForKeyInStateWithIdentifier("isDisplay", state) == false) {
              style.display = "none";
          } else {
              style.display = "grid";
          }
          style.gridTemplateRows = "100%";
          style.gridTemplateColumns = "100%";
          style.alignItems = "unset";
          style.alignContent = "unset";
          style.justifyContent = "unset";
          style.flexDirection = "unset";
          style.flexWrap = "unset";
      } else if(containerLayoutPolicyCode !== undefined && containerLayoutPolicyCode == GDFixedLayoutPolicyCode) {
          style.position = "absolute";
          style.display = "flex";
          style.gridTemplateColumns = "unset";
          style.gridTemplateRows = "unset";
      }
  }


  function displayCSS(style, cell, state) {
      var contentClipped = cell.valueForKeyInStateWithIdentifier("isContentClipped", state); 
      var scrollable = cell.valueForKeyInStateWithIdentifier("scrollable", state); 
      var nonScrollingOverflow = contentClipped ? "hidden" : "visible";

      if (scrollable == GDNoScrolling) {
          style.overflow =  nonScrollingOverflow;
      } else { 
          switch (scrollable) {
              case GDVerticalScrolling: style.overflowY = "scroll"; style.overflowX = "hidden"; break;
              case GDHorizontalScrolling: style.overflowX = "scroll"; style.overflowY = "hidden"; break;
              case GDAutoScrolling: style.overflow = "auto"; break;
          }
      }


      var zIndex = cell.valueForKeyInStateWithIdentifier("drawingIndex", state);
      style.zIndex = zIndex == 0 ? "auto" : zIndex;

      var blendMode = cell.valueForKeyInStateWithIdentifier("blendMode", state);
      var blendModeString = "normal";

      switch (blendMode) {
          case GDBlendModeNormal: blendModeString = "normal"; break;
          case GDBlendModeMultiply: blendModeString = "multiply"; break;
          case GDBlendModeScreen: blendModeString = "screen"; break;
          case GDBlendModeOverlay: blendModeString = "overlay"; break;
          case GDBlendModeDarken: blendModeString = "darken"; break;
          case GDBlendModeLighten: blendModeString = "lighten"; break;
          case GDBlendModeColorDodge: blendModeString = "color-dodge"; break;
          case GDBlendModeColorBurn: blendModeString = "color-burn"; break;
          case GDBlendModeHardLight: blendModeString = "hard-light"; break;
          case GDBlendModeSoftLight: blendModeString = "soft-light"; break;
          case GDBlendModeDifference: blendModeString = "difference"; break;
          case GDBlendModeExclusion: blendModeString = "exclusion"; break;
          case GDBlendModeHue: blendModeString = "hue"; break;
          case GDBlendModeSaturation: blendModeString = "saturation"; break;
          case GDBlendModeColor: blendModeString = "color"; break;
          case GDBlendModeLuminosity: blendModeString = "luminosity"; break;
          default: blendModeString = "unset";
      }

      style.mixBlendMode = blendModeString;


      // Old triangle cell
      if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
          var clipPath = "polygon(0 100%, 100% 100%, 50% 0)"; 

          switch(cell.valueForKeyInStateWithIdentifier("rotationAngle", state)) {
              case 0: clipPath = "polygon(0 100%, 100% 100%, 50% 0)"; break;
              case 45: clipPath = "polygon(0 0, 100% 0, 100% 100%)"; break;
              case 90: clipPath = "polygon(0 0, 100% 50%, 0 100%)"; break;
              case 135: clipPath = "polygon(100% 0, 100% 100%, 0 100%)"; break;
              case 180: clipPath = "polygon(0 0, 100% 0, 50% 100%)"; break;
              case 225: clipPath = "polygon(0 0, 100% 100%, 0 100%)"; break;
              case 270: clipPath = "polygon(0 50%, 100% 0, 100% 100%)"; break;
              case 315: clipPath = "polygon(0 0, 100% 0, 0 100%)"; break;
              default: clipPath = "polygon(0 100%, 100% 100%, 50% 0)"; break;
          }

          style.clipPath = clipPath; 
          style.webkitClipPath = clipPath; 
      }

      // new triangle cell
      // if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
      //     createSVGTriangle(style, cell, state);
      // }
  }

  function marginCSS(style, cell, state) {
      var left = cell.valueForKeyInStateWithIdentifier("marginLeft", state);
      var right = cell.valueForKeyInStateWithIdentifier("marginRight", state);
      var top  = cell.valueForKeyInStateWithIdentifier("marginTop", state);
      var bottom = cell.valueForKeyInStateWithIdentifier("marginBottom", state);

      if (left == right && right == top && top == bottom) {
          style.margin = left + "px";
          return;
      }

      style.margin = top + "px " + right + "px " + bottom + "px " + left + "px";
  }

  function paddingCSS(style, cell, state) {
      // older files can contain negative paddings, use 0 instead (if not, 
      // padding is completely ignored)
      let left = cell.valueForKeyInStateWithIdentifier("paddingLeft", state);
      if (left < 0) left = 0;

      let right = cell.valueForKeyInStateWithIdentifier("paddingRight", state);
      if (right < 0) right = 0;
      let top  = cell.valueForKeyInStateWithIdentifier("paddingTop", state);
      if (top < 0) top = 0;

      let bottom = cell.valueForKeyInStateWithIdentifier("paddingBottom", state);
      if (bottom < 0) bottom = 0;



      if (left == right && right == top && top == bottom) {
          style.padding = left + "px";
          return;
      }

      style.padding = top + "px " + right + "px " + bottom + "px " + left + "px";   
  }

  function borderCSS(style, cell, state) {
      if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
          style.border= "0px solid black";
          return;
      }

      if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDVectorCellType) {
          // Set CSS border invisible
          style.border= "0px solid black";
          // Set vector stroke color and width
          vectorStrokeCSS(style, cell, state);
          return;
      }

      var leftWidth = cell.valueForKeyInStateWithIdentifier("borderLeftWidth", state);
      var rightWidth = cell.valueForKeyInStateWithIdentifier("borderRightWidth", state);
      var topWidth = cell.valueForKeyInStateWithIdentifier("borderTopWidth", state);
      var bottomWidth = cell.valueForKeyInStateWithIdentifier("borderBottomWidth", state);

      if (leftWidth == rightWidth && rightWidth == topWidth && topWidth == bottomWidth && bottomWidth == 0) {
          style.border= "0px solid black";
          return;
      }

      var leftColor = cell.valueForKeyInStateWithIdentifier("borderLeftColor", state).referenceValue;
      var rightColor = cell.valueForKeyInStateWithIdentifier("borderRightColor", state).referenceValue;
      var bottomColor = cell.valueForKeyInStateWithIdentifier("borderBottomColor", state).referenceValue;
      var topColor = cell.valueForKeyInStateWithIdentifier("borderTopColor", state).referenceValue;


      function borderType(cell,key, state) {
          switch (cell.valueForKeyInStateWithIdentifier(key, state)) {
              case GDBorderTypeSolid: return  "solid"; 
              case GDBorderTypeDashed: return  "dashed"; 
              case GDBorderTypeDotted: return  "dotted"; 
          }
      }

      var leftStyle = borderType(cell,"borderLeftType", state);
      var rightStyle = borderType(cell,"borderRightType", state);
      var topStyle = borderType(cell,"borderTopType", state);
      var bottomStyle = borderType(cell,"borderBottomType", state);


      // Issue #88 only use the top-values
      if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDCircleCellType) {
          style.border = topWidth + "px " +  topStyle + " " + topColor;
          return;
      }


      
      var widthMatches = leftWidth == rightWidth && rightWidth == bottomWidth && bottomWidth == topWidth;
      var stylesMatches = leftStyle == rightStyle && rightStyle == bottomStyle && bottomStyle == topStyle;
      var colorsMatches = leftColor == rightColor && rightColor == bottomColor && bottomColor == topColor;
      if (widthMatches && stylesMatches && colorsMatches) {
          style.border = leftWidth + "px " + leftStyle + " " + leftColor;
          return;
      }

      style.borderWidth = topWidth + "px " + rightWidth + "px " + bottomWidth + "px " + leftWidth + "px";
      style.borderColor = topColor + " " + rightColor + " " + bottomColor + " " + leftColor;
      style.borderStyle = topStyle + " " + rightStyle + " " + bottomStyle + " " + leftStyle;
  }

  function borderRadiusCSS(style, cell, state) {
      if (cell.valueForKeyInStateWithIdentifier("cellType", state) == GDCircleCellType) {
          style.borderRadius = "50%";
          return;
      }
      var topLeft = cell.valueForKeyInStateWithIdentifier("cornerRadiusTopLeft", state);
      var topRight = cell.valueForKeyInStateWithIdentifier("cornerRadiusTopRight", state);
      var bottomLeft = cell.valueForKeyInStateWithIdentifier("cornerRadiusBottomLeft", state);
      var bottomRight = cell.valueForKeyInStateWithIdentifier("cornerRadiusBottomRight", state);

      if (topLeft == topRight && topRight == bottomLeft && bottomLeft == bottomRight) {
          if (topLeft == 0) {
              style.borderRadius = "unset";
              return;
          }

          style.borderRadius = topLeft + "px"; 
          return;
      }

      style.borderRadius = topLeft + "px " + topRight + "px " + bottomRight + "px " + bottomLeft + "px";

  }

  function backgroundCSS(style, cell, state) {

      var type = cell.valueForKeyInStateWithIdentifier("backgroundPainterType", state);

      // if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDTriangleCellType) {
      //     style.background = "none";
      //     return;
      // }

      // Vector Cell
      if(cell.valueForKeyInStateWithIdentifier("cellType", state) == GDVectorCellType) {
          // Set CSS background to none
          style.background = "none";
          // Fill Vector
          vectorFillCSS(style, cell, state);
          return;
      }

      if (type == GDNoPainterType) {
          style.background = "none";
          return;
      }

      if (type == GDColorPainterType) {
          style.background = cell.valueForKeyInStateWithIdentifier("backgroundColor", state).referenceValue;
          return;
      }

      if (type == GDImagePainterType) {
          backgroundImageCSS(style, cell, state);
          return;
      }

      if (type == GDGradientPainterType) {
          backgroundGradientCSS(style, cell, state);
      }
  }

  function backgroundImageCSS(style, cell, state) {
      style.backgroundColor = "unset";
      const horizontalAlignment = cell.valueForKeyInStateWithIdentifier("backgroundImageHorizontalAlignment", state);
      let alignment = "";
      switch (horizontalAlignment) {
          case GDLeftAlignment: alignment = "left"; break;
          case GDCenterAlignment: alignment = "center"; break;
          case GDRightAlignment: alignment = "right"; break;
      }

      const verticalAlignment = cell.valueForKeyInStateWithIdentifier("backgroundImageVerticalAlignment", state);
      switch (verticalAlignment) {
          case GDTopAlignment: alignment += " top"; break;
          case GDCenterAlignment: alignment += " center"; break;
          case GDBottomAlignment: alignment += " bottom"; break;
      }

      style.backgroundPosition = alignment;

      const horizontalOperation = cell.valueForKeyInStateWithIdentifier("backgroundImageHorizontalOperation", state);
      const verticalOperation = cell.valueForKeyInStateWithIdentifier("backgroundImageVerticalOperation", state);

      if (horizontalOperation == GDTileImageOperation && verticalOperation == GDTileImageOperation) {
          style.backgroundRepeat = "repeat";
      } else if (horizontalOperation == GDTileImageOperation) {
          style.backgroundRepeat = "repeat-x";
      } else if (verticalOperation == GDTileImageOperation) {
          style.backgroundRepeat = "repeat-y";
      } else {
          style.backgroundRepeat = "no-repeat";
      }

      
      const r = cell.valueForKeyInStateWithIdentifier("backgroundImageResource", state);
      if (r == null) {
          return;
      }

      style.backgroundImage = 'url("/images/' + r.fileName + '")'; 

      if (window.projectJSON != undefined) { // FIXME: different url-generation for exported viewer
          style.backgroundImage = 'url("static/images/' + r.fileName + '")'; 
      }

      let backgroundSize = "";

      const proportionalScaling = cell.valueForKeyInStateWithIdentifier("backgroundImageProportionalScale", state);
      if (proportionalScaling && horizontalOperation == GDStretchImageOperation && verticalOperation == GDStretchImageOperation) {
          backgroundSize = proportionalScaling == GDBackgroundSizeContain ? "contain" : "cover";
      } else {
          switch (horizontalOperation) {
              case GDStretchImageOperation: 
                  backgroundSize =  "100%"; break;
              case GDOriginalSizeImageOperation: 
                  backgroundSize = r.width + "px"; break;
          }

          switch (verticalOperation) {
              case GDStretchImageOperation:
                  backgroundSize += " 100%"; break;
              case GDOriginalSizeImageOperation: 
                  backgroundSize += " " + r.height+ "px"; break;
          }
      }

      style.backgroundSize = backgroundSize;
  }


  function backgroundGradientCSS(style, cell, state) {
      var gradient = cell.valueForKeyInStateWithIdentifier("backgroundGradient", state);
      if (gradient == null) 
          return;
      var angle = cell.valueForKeyInStateWithIdentifier("backgroundGradientAngle", state);

      var stopStrings = [];

      for (var i=0; i< gradient.colorStops.length; i++) {
          var stop = gradient.colorStops[i];
          var s = "rgba(" + Math.round(stop.r*255.0) + "," + Math.round(stop.g*255) + "," + Math.round(stop.b*255) + "," + stop.a + ") " + Math.round(stop.p*100)+ "%";

          stopStrings.push(s);
      }

      var stopString = stopStrings.join(",");
      var isRadial = cell.valueForKeyInStateWithIdentifier("backgroundGradientIsRadial", state);
      if (isRadial) {
          style.background = "radial-gradient(" + stopString + ")";
      } else {
          style.background = "linear-gradient(" + (angle+180)%360 + "deg, " + stopString + ")";
      }
  }

  function fontCSS(style, cell, state) {
      var textColor = cell.valueForKeyInStateWithIdentifier("textColor", state);
      var textFont = cell.valueForKeyInStateWithIdentifier("textFont", state);
      var lineHeightMultiply = cell.valueForKeyInStateWithIdentifier("textLineHeightMultiply", state); 
      var textLineHeight = cell.valueForKeyInStateWithIdentifier("textLineHeight", state);
      var textWordWrap = cell.valueForKeyInStateWithIdentifier("textWordWrap", state);

      if (textWordWrap) {
          style.whiteSpace = "normal"; 
      }
      else {
          style.whiteSpace = "nowrap"; 
      }
           
      style.color = textColor.referenceValue;
      style.fontFamily = '"' + textFont.fontName + '", "' + textFont.displayName + '", "' + textFont.familyName + '"';
      if (textFont.fallback && textFont.fallback.length > 1) {
          style.fontFamily += ", " + textFont.fallback;       // add fallback
      }


      style.fontSize = textFont.size + "px";

      if (lineHeightMultiply) {
          if (textLineHeight > 1) {
              style.lineHeight = textLineHeight;
          }
          else {
              style.lineHeight = "normal";
          }
          
      } else {
          if (textLineHeight > 0) {
              style.lineHeight = textLineHeight + "px";
          }
      }
  }

  function textShadowCSS(style, cell, state) {
      if (!cell.valueForKeyInStateWithIdentifier("textShadow", state)) {
          style.textShadow = "none";
          return;
      }


      const textShadowAngle = cell.valueForKeyInStateWithIdentifier("textShadowAngle", state);
      const textShadowBlur = cell.valueForKeyInStateWithIdentifier("textShadowBlur", state);
      const textShadowOffset = cell.valueForKeyInStateWithIdentifier("textShadowOffset", state);
      let textShadowColor = cell.valueForKeyInStateWithIdentifier("textShadowColor", state);
      


     const horizontalOffset =  Math.round(Math.sin(textShadowAngle * Math.PI / 180.0) * textShadowOffset);
     const verticalOffset = Math.round(Math.cos(textShadowAngle * Math.PI / 180.0) * textShadowOffset * (-1.0));

     const textShadowCSS = horizontalOffset + "px " + verticalOffset + "px " + textShadowBlur + "px " +  textShadowColor.referenceValue;
     style.textShadow = textShadowCSS;

  }


  function miscCSS(style, cell, state) {
      var opacity = cell.valueForKeyInStateWithIdentifier("opacity", state);
      if (opacity === undefined || opacity === null) {
          style.opacity = "unset";
      } else { 
          style.opacity = opacity;
      }

      var isDisplay = cell.valueForKeyInStateWithIdentifier("isDisplay", state); 
      var isVisible = cell.valueForKeyInStateWithIdentifier("isVisible", state);

      var visibility = GDVisibilityVisible; // cell.valueForKeyInStateWithIdentifier("visibility", state);
      if (!isDisplay) {
          visibility = GDVisibilityCollapsed;
      } else if (!isVisible) {
          visibility = GDVisibilityHidden;
      }

      let display = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", state) == GDAlignmentLayoutPolicyCode ? "grid" : "flex";
      
      // Old variant. Sets only the current element to hidden/visible. Ignores child elements. 
      switch(visibility) {
          case GDVisibilityHidden: style.visibility = "hidden"; style.display = display; break;
          case GDVisibilityCollapsed: style.display = "none"; style.visibility = "inherit"; break;
          default: style.visibility = "inherit"; style.display = display;
      }

      var rotation = cell.valueForKeyInStateWithIdentifier("rotationAngle", state);
      if ((rotation != 0 || style.transform.indexOf("rotate(") != -1)  && cell.valueForKeyInStateWithIdentifier("cellType", state) != GDTriangleCellType) {
          cssTransformPropertyHandler(style, style.transform, "rotate(" + rotation + "deg)", true);
      }

      var filters = cell.valueForKeyInStateWithIdentifier("filters", state);
      if ((filters != null  ||  style.filter != "") && filters > 0) {
          style.filter = "blur(" + filters + "px)";
      } else {
          style.filter = "unset";
      }
      
      var selectable = cell.valueForKeyInStateWithIdentifier("isSelectable", state);
      style.pointerEvents = selectable ? "auto" : "none";
  }



  function shadowCSS(style, cell, state) {
      let dropShadow = cell.valueForKeyInStateWithIdentifier("dropShadow", state);
      let innerShadow = cell.valueForKeyInStateWithIdentifier("innerShadow", state);

      let dropShadowColor = cell.valueForKeyInStateWithIdentifier("dropShadowColor", state);
      let innerShadowColor = cell.valueForKeyInStateWithIdentifier("innerShadowColor", state);
      if (dropShadow == false && innerShadow == false) {
          style.boxShadow = "none";
          return;
      }

      let shadowString = "";


      if (dropShadow) {
          const dropShadowAngle = cell.valueForKeyInStateWithIdentifier("dropShadowAngle", state);
          const dropShadowBlur = cell.valueForKeyInStateWithIdentifier("dropShadowBlur", state);
          const dropShadowSize = cell.valueForKeyInStateWithIdentifier("dropShadowSize", state);
          const dropShadowOffset = cell.valueForKeyInStateWithIdentifier("dropShadowOffset", state);
          


         const horizontalOffset =  Math.round(Math.sin(dropShadowAngle * Math.PI / 180.0) * dropShadowOffset);
         const verticalOffset = Math.round(Math.cos(dropShadowAngle * Math.PI / 180.0) * dropShadowOffset * (-1.0));

         const dropShadowCSS = horizontalOffset + "px " + verticalOffset + "px " + dropShadowBlur + "px " + dropShadowSize + "px " + dropShadowColor.referenceValue;


          shadowString = dropShadowCSS;
      } 

      if (innerShadow) {
          const innerShadowAngle = cell.valueForKeyInStateWithIdentifier("innerShadowAngle", state);
          const innerShadowBlur = cell.valueForKeyInStateWithIdentifier("innerShadowBlur", state);
          const innerShadowSize = 0; // cell.valueForKeyInStateWithIdentifier("innerShadowSize", state);
          const innerShadowOffset = cell.valueForKeyInStateWithIdentifier("innerShadowOffset", state);
          


         const horizontalOffset =  Math.round(Math.sin(innerShadowAngle * Math.PI / 180.0) * innerShadowOffset);
         const verticalOffset = Math.round(Math.cos(innerShadowAngle * Math.PI / 180.0) * innerShadowOffset * (-1.0));

         const innerShadowCSS = horizontalOffset + "px " + verticalOffset + "px " + innerShadowBlur + "px " + innerShadowSize + "px " + innerShadowColor.referenceValue;

         if (shadowString.length > 0) {
             shadowString += ", ";
         }

         shadowString += "inset " + innerShadowCSS;
      } 

      style.boxShadow = shadowString;
  }

  function vectorFillCSS(style, cell, state) {
      var type = cell.valueForKeyInStateWithIdentifier("backgroundPainterType", state);

      // Get properties
      var fillColor = ""; 
      if (type == GDColorPainterType) {
          fillColor = cell.valueForKeyInStateWithIdentifier("backgroundColor", state);
      }
      const vectorContent = cell.valueForKeyInStateWithIdentifier("vectorContent", state);

      // FIX ME: Implement a better way than regex replace -> very fragile and error prone.
      // Set SVG fill color
      var svgFillRegex = /fill=\\"([^"]+)\\"/gmi;
      var svgFillOpacityRegex = /fill-opacity=\\"[0-9\.]{1,100}\\"/gmi;
      var modifiedSVGVectorContent = vectorContent;

      if (type == GDColorPainterType) {
          if(svgFillRegex.test(modifiedSVGVectorContent)) {
              modifiedSVGVectorContent = modifiedSVGVectorContent.replace(svgFillRegex, `fill=\\\"${fillColor.referenceValue}\\\"`);
          }
          else {
              modifiedSVGVectorContent = modifiedSVGVectorContent.replace(/<g /, `<g fill=\\\"${fillColor.referenceValue}\\\"`);
          }

          // fill-opacity no longer needed: since the use of css color variables, we use RGBA instead
          if(svgFillOpacityRegex.test(modifiedSVGVectorContent)) {
              modifiedSVGVectorContent = modifiedSVGVectorContent.replace(svgFillOpacityRegex, ``);
          }
      }
      else { 
          // set fill color to none
          if(svgFillRegex.test(modifiedSVGVectorContent)) {
              modifiedSVGVectorContent = modifiedSVGVectorContent.replace(svgFillRegex, `fill=\\\"none\\\"`);
          }
          else {
              modifiedSVGVectorContent = modifiedSVGVectorContent.replace(/<g /, `<g fill=\\\"none\\\" `);
          }
      }
      
      // Set JSON fill color
      var modifiedJSONVectorContent = modifiedSVGVectorContent;
      var jsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi); // rgb
      var extendedJsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi); // rgba
      var jsonRegexNoColor = new RegExp(/\[\"Path\",\{/gmi);

      if (type == GDColorPainterType) {
          if(extendedJsonRegex.test(modifiedJSONVectorContent)) { // existing rgba
              modifiedJSONVectorContent = modifiedJSONVectorContent.replace(extendedJsonRegex, `\"fillColor\":[${fillColor.colorValue.red},${fillColor.colorValue.green},${fillColor.colorValue.blue},${fillColor.colorValue.alpha}]`);
          }
          else if(jsonRegex.test(modifiedJSONVectorContent)) { // existing rgb
              modifiedJSONVectorContent = modifiedJSONVectorContent.replace(jsonRegex, `\"fillColor\":[${fillColor.colorValue.red},${fillColor.colorValue.green},${fillColor.colorValue.blue},${fillColor.colorValue.alpha}]`);
          }
          else { // no existing fill color
              modifiedJSONVectorContent = modifiedJSONVectorContent.replace(jsonRegexNoColor, `[\"Path\",{\"fillColor\":[${fillColor.colorValue.red},${fillColor.colorValue.green},${fillColor.colorValue.blue},${fillColor.colorValue.alpha}],`);
          }
      }
      else {
          if(extendedJsonRegex.test(modifiedJSONVectorContent)) { // existing rgba
              // colon added to the end of the regex. It must be removed with the expression.
              // Otherwise there will be two colons behind each other resulting in an parse error.
              extendedJsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\],/gmi);
              modifiedJSONVectorContent = modifiedJSONVectorContent.replace(extendedJsonRegex, ``);
          }
          else if(jsonRegex.test(modifiedJSONVectorContent)) { // existing rgb
              // colon added to the end of the regex. It must be removed with the expression.
              // Otherwise there will be two colons behind each other resulting in an parse error.
              jsonRegex = new RegExp(/"fillColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\],/gmi);
              modifiedJSONVectorContent = modifiedJSONVectorContent.replace(jsonRegex, ``);
          }
      }

      // Update vector content
      if(typeof cell.setValueForKeyInStateWithIdentifier !== "undefined") {
          cell.setValueForKeyInStateWithIdentifier(modifiedJSONVectorContent, "vectorContent", state);
      }
  }

  function vectorStrokeCSS(style, cell, state) {
      // Get properties
      const strokeWidth = cell.valueForKeyInStateWithIdentifier("borderTopWidth", state);
      const strokeColor = cell.valueForKeyInStateWithIdentifier("borderTopColor", state);
      const vectorContent = cell.valueForKeyInStateWithIdentifier("vectorContent", state);

      // FIX ME: Implement a better way than regex replace -> very fragile and error prone.
      // Set SVG stroke color
      var svgStrokeRegex = /stroke=\\"([^"]+)\\"/gmi;
      var modifiedSVGVectorContent = vectorContent.replace(svgStrokeRegex, `stroke=\\\"${strokeColor.referenceValue}\\\"`);

      // stroke-opacity no longer needed: since the use of css color variables, we use RGBA instead
      const strokeOpacityRegex = /stroke-opacity=\\"[0-9\.]{1,100}\\"/;
      if(strokeOpacityRegex.test(modifiedSVGVectorContent)) {
          modifiedSVGVectorContent = modifiedSVGVectorContent.replace(strokeOpacityRegex, ``);   
      }

      // Set SVG stroke width
      modifiedSVGVectorContent = modifiedSVGVectorContent.replace(/stroke-width=\\"[0-9\.]{1,3}\\"/gmi, `stroke-width=\\\"${strokeWidth}\\\"`);

      // Set JSON stroke color
      var modifiedJSONVectorContent = modifiedSVGVectorContent;
      const strokeColorRegex = new RegExp(/"strokeColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi);
      const strokeColorWithOpacityRegex = new RegExp(/"strokeColor":\[[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100},[0-9\.]{1,100}\]/gmi);
      const noStrokeColorRegex = new RegExp(/\[\"Path\",\{/gmi);
      if(strokeColorWithOpacityRegex.test(modifiedJSONVectorContent)) {
          modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeColorWithOpacityRegex, `\"strokeColor\":[${strokeColor.colorValue.red},${strokeColor.colorValue.green},${strokeColor.colorValue.blue},${strokeColor.colorValue.alpha}]`);
      }
      else if(strokeColorRegex.test(modifiedJSONVectorContent)) {
          modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeColorRegex, `\"strokeColor\":[${strokeColor.colorValue.red},${strokeColor.colorValue.green},${strokeColor.colorValue.blue},${strokeColor.colorValue.alpha}]`);
      }
      else {
          modifiedJSONVectorContent = modifiedJSONVectorContent.replace(noStrokeColorRegex, `[\"Path\",{\"strokeColor\":[${strokeColor.colorValue.red},${strokeColor.colorValue.green},${strokeColor.colorValue.blue},${strokeColor.colorValue.alpha}],`);
      }

      // Set JSON stroke width
      var strokeWidthRegex = new RegExp(/"strokeWidth":[0-9\.]{1,3}/gmi); 
      if(strokeWidthRegex.test(modifiedJSONVectorContent)) {
          modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeWidthRegex, `\"strokeWidth\":${strokeWidth}`);
      }
      else {
          strokeWidthRegex = new RegExp(/\[\"Path\",\{/gmi);
          modifiedJSONVectorContent = modifiedJSONVectorContent.replace(strokeWidthRegex, `[\"Path\",{\"strokeWidth\":${strokeWidth},`);
      }

      // Update vector content
      if(typeof cell.setValueForKeyInStateWithIdentifier !== "undefined") {
          cell.setValueForKeyInStateWithIdentifier(modifiedJSONVectorContent, "vectorContent", state);
      }
  }




  function customCSS(style, cell, state) {
      let cssText = cell.valueForKeyInStateWithIdentifier("customCSS", state);
      if (!cssText || cssText.length == 0)  {
          return;
      }

      
      let properties = cssText.split(";");
      properties.forEach( p => {
          let colonIndex = p.indexOf(":");
          if (colonIndex > 0) {
              style.setProperty(p.slice(0,colonIndex).trim(), p.slice(colonIndex+1).trim());
          }
      });
  }


  function PropertyGroup(keys, updateFunction) {
      this._keys = keys;
      this.updateFunction = updateFunction;
  }

  PropertyGroup.prototype.hasProperty = function(cell, state) {
      return this._keys.find(function(k) {
          return cell.ownValueForKeyInStateWithIdentifier(k, state) !== undefined
      });
  };

  PropertyGroup.prototype.shouldUse = function(key, cell, state) {
      if (this._keys.indexOf(key) === -1) {
          return false;
      }

      return this.hasProperty(cell, state);
  };

  function AlwaysPropertyGroup(keys, updateFunction) {
      this._keys = keys;
      this.updateFunction = updateFunction;
  }

  AlwaysPropertyGroup.prototype.hasProperty = function(cell, state) {
      return true; 
  };

  AlwaysPropertyGroup.prototype.shouldUse = function(key, cell, state) {
      return this.hasProperty(cell, state);
  };

  var dimensionKeys = ["x", "y", "layoutPolicyCode", "activeLayout", "fixedLayout", "horizontalResizing", "flexWidthPercentage", "borderLeftWidth", "borderRightWidth", "width", 
  "verticalResizing", "flexHeightPercentage", "borderTopWidth", "borderBottomWidth", "height", 
  "minimumWidth", "minimumHeight", "maximumHeight", "maximumWidth", "activeVerticalAlignment", "activeHorizontalAlignment", "textWordWrap", 
  "marginLeft", "marginRight", "marginTop", "marginBottom"];

  var dimensionProperties = new PropertyGroup(dimensionKeys, dimensionStyles);

  var borderKeys = ["borderLeftWidth", "borderTopWidth", "borderBottomWidth", "borderRightWidth", 
                  "borderTopColor", "borderBottomColor", "borderLeftColor", "borderRightColor",
                  "borderTopType", "borderBottomType", "borderLeftType", "borderRightType"];
  var borderProperties = new PropertyGroup(borderKeys, borderCSS);

  var layoutKeys = ["layoutPolicyCode", "verticalAlignment", "horizontalAlignment", "layoutWrap", "isDisplay"];
  var layoutProperties = new PropertyGroup(layoutKeys, layoutCSS);


  var displayKeys = ["cellType", "drawingIndex", "isContentClipped", "scrollable", "rotationAngle", "blendMode"];
  var displayProperties = new PropertyGroup(displayKeys, displayCSS);

  var marginKeys = ["marginLeft", "marginRight", "marginTop", "marginBottom"];
  var marginProperties = new PropertyGroup(marginKeys, marginCSS);

  var paddingKeys = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"];
  var paddingProperties = new PropertyGroup(paddingKeys, paddingCSS);

  var borderRadiusKeys = ["cellType", "cornerRadiusTopLeft", "cornerRadiusBottomLeft", "cornerRadiusTopRight", "cornerRadiusBottomRight"];
  var borderRadiusProperties = new PropertyGroup(borderRadiusKeys, borderRadiusCSS);

  var backgroundKeys = [ "backgroundPainterType","backgroundColor", "backgroundGradient",	"backgroundGradientAngle", "backgroundGradientIsRadial","backgroundImageResource", "backgroundImageHorizontalAlignment", "backgroundImageVerticalAlignment"	, "backgroundImageHorizontalOperation", "backgroundImageVerticalOperation", "backgroundImageProportionalScale"];	
  var backgroundProperties = new PropertyGroup(backgroundKeys, backgroundCSS);

  var textKeys = ["textFont", "textColor", "textString", "textLineHeight", "textLineHeightMultiply", "isEditableText", "textHorizontalAlignment", "textVerticalAlignment", "textWordWrap"];
  var textProperties = new PropertyGroup(textKeys, fontCSS);

  const textShadowKeys = ["textShadow", "textShadowOffset", "textShadowAngle", "textShadowBlur", "textShadowColor"];
  const textShadowProperties = new PropertyGroup(textShadowKeys, textShadowCSS);


  var miscKeys = ["visibility", "opacity", "isDisplay", "isVisible", "rotationAngle", "filters", "isSelectable" ];
  var miscProperties = new AlwaysPropertyGroup(miscKeys, miscCSS);

  var shadowKeys = ["dropShadow", "dropShadowColor", "dropShadowAngle", "dropShadowSize", "dropShadowBlur", "dropShadowOffset", "dropShadowBlur", "innerShadowOffset", "innerShadowBlur", "innerShadowColor", "innerShadow", "innerShadowAngle"];
  var shadowProperties = new PropertyGroup(shadowKeys, shadowCSS);

  var customKeys = ["customCSS"];
  var customProperties = new AlwaysPropertyGroup(customKeys, customCSS); // Always: my overwrite AT-styles




  function cssClassNameDefinition(definitionIdentifier) {
      return "D" + gdStringHash(definitionIdentifier); 
  }

  function cssClassName(definitionIdentifier, stateIdentifier, project) {
      var definitionName = cssClassNameDefinition(definitionIdentifier); 
      var state = project.stateWithIdentifier(stateIdentifier);
      var stateName = state.cssSelector();
      return definitionName + stateName;
  }

  function cssSelector(definitionIdentifier, stateIdentifier, project) {
      var state = project.stateWithIdentifier(stateIdentifier);
      var definition = project.definitionWithIdentifier(definitionIdentifier);
      var stateName = state.cssSelector();

      var rootDefinition = definition.rootNode();
      var selector = "." + cssClassNameDefinition(rootDefinition.identifier) + stateName;
      if (rootDefinition != definition) {
          selector += " ." + cssClassNameDefinition(definitionIdentifier);
      }
      return selector;
  }

  /**
   * the css-selector for the given cell in state
   * @param {GDWidgetInstanceCell} cell 
   * @param {GDState} state 
   * @param {GDProject} project 
   * @returns {string}
   */
  function cssSelectorInstance(cell, state, project) {
      var id = cell.objectID;
      if (cell.isBasicCell) {
          return "#" + id;
      }


      var rootCell = cell.rootInstanceCell;
      var rootDefinitionId = rootCell.definitionIdentifier;

      if (cell != rootCell) { // .widgetRootDef[_:]state #instanceId
          var selector = "";
          selector += "." + cssClassName(rootDefinitionId, state.identifier, project) + " "; 
          selector += "." + id;
          return selector;
      } 


      // for root-instance cell, we can't use the above notation instead:
      // .instanceId[_:]state    

      return "."  + id +  state.cssSelector();
  }

  // the class name of the cell 
  function cssClassNameForCell(cell, project) {
      let className = "";
      if (cell.isRootInstanceCell) {
          if (!cell.activeState.isPseudoState) {
              className = cssClassName(cell.definitionIdentifier, cell.activeStateIdentifier, project);
              // special case: for root instance cell append the "instance-class"
              if (!cell.isBasicCell) {
                  className += " " + cell.objectID + cell.activeState.cssSelector();
              }
          } else {
              // don't append pseudo-state to the className
              className = cssClassNameDefinition(cell.definitionIdentifier);
              if (!cell.isBasicCell) {
                  className += " " + cell.objectID ;
              }
          }
      } else {
          className = cssClassNameDefinition(cell.definitionIdentifier) + " " + cell.objectID;
      }

      return className;
  }


  function GDCSSTransition(animationDuration, animationCurve, animationDelay) {
      var curves = ["ease-in-out", "ease-in", "ease-out", "linear", "cubic-bezier(0.5, 1.8, 1, 1)"];
      return "all " + animationDuration + "s " + curves[animationCurve] + " " + animationDelay + "s";    
  }


  function cssTransformPropertyHandler(style, existingTransformations, newTransformations, isRotation) {
      var translateRegex = /(translate\([-%,0-9\s]*\))/g;
      var rotateRegex = /(rotate\([-0-9deg\s]*\))/g;
      var existingTranslateTransformations = [];
      var existingRotateTransformations = [];
      var newTranslateTransformations = [];
      var newRotateTransformations = [];
      
      // Extract existing and new transformations
      var match;
      while((match = translateRegex.exec(existingTransformations))) {
          existingTranslateTransformations.push(match[0]);
      }
      
      while((match = rotateRegex.exec(existingTransformations))) {
          existingRotateTransformations.push(match[0]);
      }
      
      while((match = translateRegex.exec(newTransformations))) {
          newTranslateTransformations.push(match[0]);
      }
      
      while((match = rotateRegex.exec(newTransformations))) {
          newRotateTransformations.push(match[0]);
      }
      
      // Assemble new transform property
      style.transform = "";
      if(newTranslateTransformations.length > 0) {
          for(let i = 0; i < newTranslateTransformations.length; i++) {
              style.transform += newTranslateTransformations[i];
              style.transform += " ";
          }
      }
      else if(isRotation == true) {
          for(let i = 0; i < existingTranslateTransformations.length; i++) {
              style.transform += existingTranslateTransformations[i];
              style.transform += " ";
          }
      }
      
      if(newRotateTransformations.length > 0) {
          for(let i = 0; i < newRotateTransformations.length; i++) {
              style.transform += newRotateTransformations[i];
              style.transform += " ";
          }
      }
      else if(isRotation == false) {
          for(let i = 0; i < existingRotateTransformations.length; i++) {
              style.transform += existingRotateTransformations[i];
              style.transform += " ";
          }
      }
  }




  /**
   * public api for the css-generation stuff. Currently only moved all calls
   * to the various xxxxProperties-calls from viewer.js to encapsulate 
   * the css generation.
   */
  class GDCSSGenerator {
      updateStyles(style, figure, stateIdentifier, containerStateIdentifier) {
          displayProperties.updateFunction(style, figure, stateIdentifier);
          marginProperties.updateFunction(style, figure, stateIdentifier);
          paddingProperties.updateFunction(style, figure, stateIdentifier);
          borderProperties.updateFunction(style, figure, stateIdentifier);
          borderRadiusProperties.updateFunction(style, figure, stateIdentifier);
          backgroundProperties.updateFunction(style, figure, stateIdentifier);
          textProperties.updateFunction(style, figure, stateIdentifier);
          textShadowProperties.updateFunction(style, figure, stateIdentifier);
          miscProperties.updateFunction(style, figure, stateIdentifier);
          shadowProperties.updateFunction(style, figure, stateIdentifier);
          layoutProperties.updateFunction(style,figure, stateIdentifier, containerStateIdentifier);
          dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
          customProperties.updateFunction(style, figure, stateIdentifier);
      }

      populateCellPropertiesInState(style, cell, stateIdentifier, containerStateIdentifier) {
          if (cell.container || dimensionProperties.hasProperty(cell, stateIdentifier)) {
              dimensionProperties.updateFunction(style, cell, stateIdentifier, containerStateIdentifier);
          }
          if (layoutProperties.hasProperty(cell, stateIdentifier)) {
              layoutProperties.updateFunction(style, cell, stateIdentifier, containerStateIdentifier);
          }
          if (displayProperties.hasProperty(cell,stateIdentifier)) {
              displayProperties.updateFunction(style, cell, stateIdentifier);
          }
          
          if (marginProperties.hasProperty(cell, stateIdentifier)) {
              marginProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (paddingProperties.hasProperty(cell,stateIdentifier)) {
              paddingProperties.updateFunction(style, cell, stateIdentifier);
          }
          if (borderProperties.hasProperty(cell, stateIdentifier)) {
              borderProperties.updateFunction(style, cell, stateIdentifier);
          }
          if (borderRadiusProperties.hasProperty(cell,stateIdentifier)) {
              borderRadiusProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (backgroundProperties.hasProperty(cell,stateIdentifier)) {
              backgroundProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (textProperties.hasProperty(cell, stateIdentifier)) {
              textProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (textShadowProperties.hasProperty(cell, stateIdentifier)) {
              textShadowProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (miscProperties.hasProperty(cell, stateIdentifier)) {
              miscProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (shadowProperties.hasProperty(cell, stateIdentifier)) {
              shadowProperties.updateFunction(style, cell, stateIdentifier);
          }

          if (customProperties.hasProperty(cell, stateIdentifier)) {
              customProperties.updateFunction(style, cell, stateIdentifier);
          }
      }

      updateStyleProperty(style, figure, key, stateIdentifier, containerStateIdentifier) {
          if (displayProperties.shouldUse(key, figure, stateIdentifier)) {
              displayProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (marginProperties.shouldUse(key,figure, stateIdentifier)) {
              marginProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (paddingProperties.shouldUse(key,figure, stateIdentifier)) {
              paddingProperties.updateFunction(style, figure, stateIdentifier);
          }
          
          if (borderProperties.shouldUse(key, figure, stateIdentifier)) {
              borderProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (borderRadiusProperties.shouldUse(key, figure, stateIdentifier)) {
              borderRadiusProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (backgroundProperties.shouldUse(key, figure, stateIdentifier)) {
              backgroundProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (textProperties.shouldUse(key, figure, stateIdentifier)) {
              textProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (textShadowProperties.shouldUse(key, figure, stateIdentifier)) {
              textShadowProperties.updateFunction(style, figure, stateIdentifier);
          }

          if (miscProperties.shouldUse(key, figure, stateIdentifier)) {
              miscProperties.updateFunction(style, figure, stateIdentifier);
          } 

          if (shadowProperties.shouldUse(key, figure, stateIdentifier)) {
              shadowProperties.updateFunction(style, figure, stateIdentifier);
          } 
          if (layoutProperties.shouldUse(key, figure, stateIdentifier)) {
              layoutProperties.updateFunction(style,figure, stateIdentifier, containerStateIdentifier);
          }
          
          if (dimensionProperties.shouldUse(key, figure, stateIdentifier)) {
              dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
          }
          
          // for some special cases we have to adjust the children too:
          if (figure.orderedComponents) {
              const cellUsesStackedAlignment = figure.valueForKeyInStateWithIdentifier("layoutPolicyCode", stateIdentifier) == GDAlignmentLayoutPolicyCode;            const stackedChildrenNeedUpdate = (key == "verticalAlignment" || key == "horizontalAlignment") && cellUsesStackedAlignment;
              if (key == "layoutPolicyCode" || stackedChildrenNeedUpdate) {
                  this.updateLayoutCells(figure.orderedComponents, stateIdentifier);
              }
          }
          
          this.updateLayoutCells(this.detectCellsThatNeedAnUpdate(key, figure), stateIdentifier);  

          if (customProperties.shouldUse(key, figure, stateIdentifier)) {
              customProperties.updateFunction(style, figure, stateIdentifier);
          }
      }
      
      
      detectCellsThatNeedAnUpdate(key, figure) {
          let cellsNeedUpdate = [];

          const isPaddingKey = key == "paddingTop" || key == "paddingLeft" || key == "paddingRight" || key == "paddingBottom";

          if (isPaddingKey && figure.orderedComponents) {
              figure.orderedComponents.forEach( (c) => { 
                  if (c.valueForKeyInStateWithIdentifier("activeLayout", c.activeStateIdentifier)) {
                      cellsNeedUpdate.push(c);
                  }
              });
          }
          
      
          return cellsNeedUpdate;
      }
      
      // always the same: this and the executeFinalWidgetLayoutPass do more are similar 
      // and both feel weired, not sure what to do about it. 

      updateLayoutCells(cells, containerStateIdentifier) {
          cells.forEach( figure => {
              if (!figure.objectID) { // generating widgetstyles
                  return;
              }

              const state = figure.activeState;
              const stateIdentifier = state.identifier;
              const style = figure.cssStyleForStateIdentifier(stateIdentifier);
          
              layoutProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
              dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);

          });
      }
      


      /**
       *  Normally our CSS-generation is divided into widget- and instance-css. 
       *  But unfortunately sometimes we need to know the container to generate
       *  the right css. For root-instance-cells the container is not known on 
       *  creation, only when the instance is inserted in the screen. (or a state
       *  change). 
       *
       *  FIXME: 
       *      *   currently this method is called on numerous places after changing
       *          the hierarchy, can we make it automatic? 
       *      *   Calling the styling-stuff here directly looks wrong, either make 
       *          it explicit in the css-generation ... 
       *      *   tests are missing
       *
       */
      executeFinalWidgetLayoutPass(figure) {
          // #385 speed up of this pass. Use iterator and call properties-methods directly. 
          // would be even faster to just call the stuff needed, but this is only possible
          // if we cleanup the styling.js-mess. 
          const iterator = document.createNodeIterator(figure.DOMElement, NodeFilter.SHOW_ELEMENT, e => {
              let figure = e.figure;
              if (figure == undefined) return false;
              return figure.isRootInstanceCell;
          });

          let element = null;
          while ((element = iterator.nextNode())) {
              let figure = element.figure;
              const containerState = currentContainerStateIdentifier(figure,figure.activeStateIdentifier);

              // #1079 we need to adjust the active and all pseudo-states:
              figure.widget.states.forEach( state => {
                  if (state.isPseudoState || state == figure.activeState) {
                      const stateIdentifier = state.identifier;
                      let style = figure.cssStyleForStateIdentifier(stateIdentifier);

                      dimensionProperties.updateFunction(style, figure, stateIdentifier, containerState);
                      layoutProperties.updateFunction(style, figure, stateIdentifier, containerState);

                      // #596 it might be that the above calls overwrite the css in the widget-css...
                      if (figure.valueForKeyInStateWithIdentifier("customCSS", stateIdentifier)) {
                          customProperties.updateFunction(style, figure, stateIdentifier);
                      }
                  }
              });
          }
      }

      updateDimensionProperties(style, figure, stateIdentifier, containerStateIdentifier) {
          dimensionProperties.updateFunction(style, figure, stateIdentifier, containerStateIdentifier);
      }

      hasTextProperty(cell, stateIdentifier) {
          return textProperties.hasProperty(cell, stateIdentifier);
      }

      propertyAffectsText(key, figure, stateIdentifier) {
          return textProperties.shouldUse(key, figure, stateIdentifier);
      }


      textSpanStyling(cell) {
          const span = cell.DOMElement.textSpan;
          const activeStateId = cell.activeStateIdentifier;

          const h = cell.valueForKeyInStateWithIdentifier("textHorizontalAlignment", activeStateId);
          const v = cell.valueForKeyInStateWithIdentifier("textVerticalAlignment", activeStateId);

          function alignmentClass(horizontalAlignment, verticalAlignment) {
              var horizontalMapping = ["l", "c", "r"];
              var verticalMapping = ["t", "c", "b"]; 
              return "aa" + verticalMapping[verticalAlignment] + horizontalMapping[horizontalAlignment];
          }
      
          const alignment = alignmentClass(h, v);
          span.className = "text " + alignment;
      }

      isBackgroundProperty(key) {
          return backgroundProperties._keys.indexOf(key) != -1;
      }

      populateScreenBackgroundPropertiesInState(style, cell, stateIdentifier) {
          if (backgroundProperties.hasProperty(cell,stateIdentifier)) {
              backgroundProperties.updateFunction(style, cell, stateIdentifier);
          }
      }

      updateScreenBackgroundProperty(style, figure, key, stateIdentifier) {
          if (backgroundProperties.shouldUse(key, figure, stateIdentifier)) {
              backgroundProperties.updateFunction(style, figure, stateIdentifier);
          }
      }

  }

  class GDDropTarget {
      constructor(container, bounds, index) {
          this._container = container;
          this._globalBounds = bounds;
          this._index = index || 0;
      }

      isEqual(d) {
          if (!d) return false;
          
          return this.container == d.container && GDEqualRects(this._globalBounds, d._globalBounds);
      }

      get container() {
          return this._container;
      }

      distanceToPoint(x,y) {
          if (x >= this._globalBounds.left && x <= this._globalBounds.left + this._globalBounds.width 
              && y >= this._globalBounds.top && y <= this._globalBounds.top + this._globalBounds.height ) {
              return 0;
          }

          function midX(r) {return (r.left + r.width)/2}
          function midY(r) {return (r.top + r.height)/2}

          return Math.sqrt((midX(this._globalBounds)-x)*(midX(this._globalBounds)-x) + (midY(this._globalBounds)-y)*(midY(this._globalBounds)-y));
      }

      resizetoFreeSpace() {

      }

      get index() {
          return this._index;
      }

      set index(i) {
          this._index = i;
      }

      isTargetForPoint(x,y) {
          const r = this._globalBounds;
          return x >= r.left && x <= r.left + r.width && y >= r.top && y <= r.top + r.height;
      }
  }

  class GDLayoutPolicy {
      static fromCode(layoutPolicCode) {
          switch(layoutPolicCode) {
              case GDFixedLayoutPolicyCode: return new GDFixedLayoutPolicy();
              case GDAlignmentLayoutPolicyCode: return new GDAlignmentLayoutPolicy();
              case GDVerticalBoxLayoutPolicyCode: return new GDVerticalBoxLayoutPolicy();
              case GDHorizontalBoxLayoutPolicyCode: return new GDHorizontalBoxLayoutPolicy();
          }        
      }

      dropTargetsForCellExcludingPassengers(cell, passengers, continous) {
          return [new GDDropTarget(cell, globalBoundsOfElement(cell.DOMElement))];
      }
  }

  class GDVerticalBoxLayoutPolicy extends GDLayoutPolicy {
      dropTargetsForCellExcludingPassengers(cell, passengers, continous) {
          if (cell.orderedComponents.length == 0) {
              return super.dropTargetsForCellExcludingPassengers(cell, passengers, continous);
          }

          const dropTargets = [];
          const firstChild = cell.orderedComponents[0];
          let b = globalBoundsOfElement(firstChild.DOMElement);




          return dropTargets;
      }
  }


  class GDHorizontalBoxLayoutPolicy extends GDLayoutPolicy {

  }

  class GDAlignmentLayoutPolicy extends GDLayoutPolicy {

  }

  class GDFixedLayoutPolicy extends GDLayoutPolicy {

  }

  /* eslint-disable no-prototype-builtins */

   


  /*
      counterparts of the Antetype-objects. Minimal implementation. 

  */

  function gdStringHash(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
          hash  = ((hash << 5) - hash) + str.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
      }
      return hash;
  }

  function gdValue(v, project) {
      if (typeof v === "number") return v;
      if (typeof v === "string") return v;
      if (typeof v === "boolean") return v;

      if (typeof v == "object") {
          if (v && v.NSColorValue) {
              return CPColor.fromJSON(v);
          }

          if (v && v.CTGradient) {
              return new CTGradient(v);
          }

          if (v && v.GDFont) {
              return GDFont.fromJSON(v.GDFont);
          }

          if (v && v.GDImageResource) {
              const identifier = v.GDImageResource.identifier;
              return project.resources[identifier];
          }

          if (v && v.GDUIColor) {
              const identifier = v.GDUIColor.identifier;
              return project.colorWithIdentifier(identifier);
          }
      }   
      return v;
  }

  /**
   * objects corresponding to their Antetype counterparts. Are transferred from antetype to 
   * the browser(s). Must call GDModelObject.register to allow serializiation. In Antetype you can 
   * get the JSONDictionary etc (defined in GDManagedObject).
   */
  class GDModelObject {
      /**
       * 
       * @param {Object} dictionary with the values (from Antetype.app)
       * @param {GDProject} project the project 
       */
      constructor(dictionary, project) {
          this._objectID = dictionary["objectId"] || "id" + Math.floor(Math.random() * 1000);
          this._project = project;
      }

      static register(klass) {
          if (this.klasses === undefined)
              this.klasses = {};

          this.klasses[klass.name] = klass;
      }

      /**
       * only for testing: creates a new instance. 
       *
       * Normally all model-objects are directly created with their constructor
       * which uses the json and and the project as parameter. To make is easier for
       * testing we try to 
       * @param {GDProject} project - the project for the given object.
       */
      static createInstance(project) {
          const className = this.name;
          const klass = this.klasses[className];
          const dictionary = {};
          return new klass(dictionary, project);
      }

      static fromJSONObjectInProject(dictionary, project) {
          var className = dictionary.className;
          var klass  = this.klasses[className];
          if (klass === undefined) {
              throw "Need implementation of " + className + " either not registered, or not written";
          }
          var o = new klass(dictionary,project);
          Object.seal(o);
          return o;
      }

      /**
       * @returns {string} the unique object id of this object
       */
      get objectID() {
          return this._objectID;
      }

      /**
       * @returns {GDProject}
       */
      get project() {
          return this._project;
      }

      decodeArray(json, project) {
          if (json === undefined) {
              return [];
          }
          var result = [];
          for (var i=0; i<json.length; i++) {
              var b = json[i];
              var object = GDModelObject.fromJSONObjectInProject(b, project);
              result.push(object);
          }
          return result;
      }
  }



  /**
      An abstract class which defines a cell with components. This class defines the structure
      (hierarchy), but has no styling, widget. See {@link GDWidgetInstanceCell} for a cell with
      styling and {@link GDWidgetInstanceRootCell} for the top-level cell of a widget (or a 
      basic cell)
      @extends GDModelObject
  */
  class GDCompositeFigure extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this._name = dictionary.name;
          this._orderedComponents = []; 
          this._container = undefined;
          this._DOMElement = null;

          if (dictionary.orderedComponents) {
              for (var i=0; i<dictionary.orderedComponents.length; i++) {
                  var cellDictionary = dictionary.orderedComponents[i];
                  var cell = GDModelObject.fromJSONObjectInProject(cellDictionary, project);
                  this.addComponent(cell);
              } 
          }
      }

      /**
          the HTML-Element which is used to display this cell. Use `figure` for the 
          reverse direction. 

          @returns {HTMLElement}
      */
      get DOMElement() {
          return this._DOMElement;
      }

      /**
       * @private
       * @param {HTMLElement} s
       */
      set DOMElement(s) {
          this._DOMElement = s;
      }

      /**
          the container of this cell
          @returns {GDCompositeFigure}
      */
      get container() {
          return this._container;
      }

      set container(c) {
          this._container = c;
      }

      /**
          the Antetype name (visible in the Screen inspector)
          @returns {string}
      */
      get name() {
          return this._name;
      }

      /**
       * the index in its container
       * @returns {number}
       */
      get index() {
          return this.container.orderedComponents.indexOf(this);
      }

      /**
          children of this cell 
          @returns {Array<GDCompositeFigure>}
      */
      get orderedComponents() {
          return this._orderedComponents;
      }


      /**
          the active state of this cell 
          @returns {GDState}
      */
      get activeState() {
          return this._container.activeState;
      }

      /**
          the identifier of the active-state
          @returns {string}
      */
      get activeStateIdentifier() {
          return this._container.activeStateIdentifier;
      }

      /**
       * adds a cell
       * @param {GDCompositeFigure} cell 
       */
      addComponent(cell) {
          this._orderedComponents.push(cell);
          cell.container = this;
      }

      /**
       * inserts the component at index
       * @param {GDCompositeFigure} component 
       * @param {number} index 
       */
      insertComponent(component, index) {
          this._orderedComponents.splice(index,0,component);
          component.container = this;
      }

      /**
       * removes the component at index
       * @param {number} index 
       */
      removeComponentAtIndex(index) {
          this.orderedComponents.splice(index,1);
      }

      /**
       * removes the child c
       * @param {GDCompositeFigure} c 
       */
      removeComponent(c) {
          const index = this.orderedComponents.indexOf(c);
          this.removeComponentAtIndex(index);
      }

      /**
          the top-level cell (in this widget) of this cell. If called on a basic-cell
          returns the cell itself. 
          @returns {GDWidgetInstanceRootCell}
      */
      get rootInstanceCell() {
          return this._container.rootInstanceCell;
      }

      /**
          am I a root-instance-cell (top-level cell of widget instance)?
          @returns {boolean}
      */
      get isRootInstanceCell() {
          return this.rootInstanceCell == this;
      }

      /**
          returns true for "basic cells" (not widget-instance-cells)
          @returns {boolean}
      */
      get isBasicCell() {
          return false;
      }

      /**
          returns true if the cell is a screen
          @returns {boolean}
      */
      get isScreen() {
          return false;
      }

      /**
          siblings of this cell
          @returns {Array<GDCompositeFigure>}
      */
      get siblings() {
          if (!this._container) {
              return [];
          }

          var r = [];
          for (var i=0; i < this._container.orderedComponents.length; i++) {
              var s = this._container.orderedComponents[i];
              if (s != this) {
                  r.push(s);
              }
          }
          return r;
      }

      /**
          the screen of this cell
          @returns {GDScreen}
      */
      get screen() {
          return this.container.screen;
      }

      /**
       * true if this is a parent (up to the screen) of cell
       * @param {GDCompositeFigure} cell 
       * @returns {boolean}
       */
      isDescendentOf(cell) {
          let container = this.container;
          while( container ) 
              if (container == cell)
                  return true;
              else 
                  container = container.container;

          return false;
      }

      /**
       * all parents (up to the sceen)
       * @returns {Array<GDCompositeFigure>}
       */
      get parents() {
          let parents = [];
          let c = this.container;
          while( c ) {
              parents.push(c);
              c = c.container;
          }
          return parents;
      }

  }

  GDModelObject.register(GDCompositeFigure);


  /**
      Objects of this class represent an inner cell of an widget. The top-level 
      cell of a widget is of class {@link GDWidgetInstanceRootCell}

      @extends {GDCompositeFigure}
  */
  class GDWidgetInstanceCell extends GDCompositeFigure {
      constructor(dictionary, project) {
          super(dictionary, project);

          this._definitionIdentifier = dictionary["definition"];
          this._statesPropertiesDictionary = dictionary["styleProperties"] || {};

          this._eventHandlers = {};
          if (dictionary.eventHandlers) {
              for (let i=0; i<dictionary.eventHandlers.length; i++) {
                  let edict = dictionary.eventHandlers[i];
                  let eventHandler = GDModelObject.fromJSONObjectInProject(edict, project);
                  let existingHandlers = this._eventHandlers[eventHandler.eventType];
                  if (existingHandlers === undefined) {
                      this._eventHandlers[eventHandler.eventType] = [eventHandler];
                  } else {
                     existingHandlers.push(eventHandler);
                  }
              }
          }
          
          this._dataBindings = [];
          this._cssStyles = {};
          this.definition.addInstance(this);
      }


      /**
       * convenience we have some API where we use the identifier
       * @returns {String} the identifier of the definition
       */
      get definitionIdentifier() {
          return this._definitionIdentifier; 
      }

      /**
          if a property value is either overwritten or an individual property the value 
          is stored in the cell. Return null if the property is not defined in the cell
          (overwritten or individual)

          @param {String} key - name of the property
          @param {String} stateIdentifier - identifier of the state
          @returns {Object}
      */
      ownValueForKeyInStateWithIdentifier(key, stateIdentifier) {
          var propertiesInState = this._statesPropertiesDictionary[stateIdentifier];
          if (propertiesInState !== undefined) {
              var value = propertiesInState[key];
              if (value !== undefined) 
                  return gdValue(value, this._project);
           }
          return undefined;
      }

      /**
          the corresponding definition of this cell.
          @return {GDWidgetCellDefinition}
      */
      get definition() {
          if (this._definition == undefined) {
              this._definition = this._project.definitionWithIdentifier(this._definitionIdentifier);
          }

          return this._definition;
      }



      /**
          Used to get a value for a given property-name and cell. This method returns
          the value, no matter if it is defined in the cell itself (overwritten or
          individual. 

          @param {String} key - the name of the property
          @param {String} stateIdentifier - the identifier of the state used. 
          @return {Object} the value of this property in the given state
      */
      valueForKeyInStateWithIdentifier(key, stateIdentifier) {
          var ownValue = this.ownValueForKeyInStateWithIdentifier(key, stateIdentifier);
          if (ownValue !== undefined)
              return ownValue;

          return this._project.currentLookAndFeel.valueForKey(key, this._definitionIdentifier, stateIdentifier);
      }

      /**
       * Get the value of the given property in the state. Experimental: need a better
       * way instead of the dreaded valueForKeyInStateWithIdentifier
       * 
       * @param {String} key the name of the property 
       * @param {GDState} state the state (optional, if not given use the activeState) 
       * @returns {Object} the value of the property
       */
      getProperty(key, state) {
          if (!state) state = this.activeState;
          let stateIdentifier = state.identifier;
          return this.valueForKeyInStateWithIdentifier(key, stateIdentifier);
      }

      /**
       * Set the value of the given property in the state. Experimental: need a better
       * way instead of the dreaded setValueForKeyInStateWithIdentifier
       * 
       * @param {String} key the name of the property
       * @param {Any} value the value
       * @param {GDState} state the state (optional, if not given use the activeState) 
       */
      setProperty(key, value, state) {
          if (!state) state = this.activeState;
          let stateIdentifier = state.identifier;
          this.setValueForKeyInStateWithIdentifier(value, key, stateIdentifier);
      }

      vectorJSONInStateWithIdentifier(stateIdentifier) {
          let vectorContent = this.valueForKeyInStateWithIdentifier("vectorContent", stateIdentifier);
          if (vectorContent != null && vectorContent != "") {
              let vectorJSON = JSON.parse(vectorContent);
              if(vectorJSON.hasOwnProperty('json')) {
                  return vectorJSON;
              }
              else {
                  return "{}";
              }
          }
          else {
              return "{}";
          }

      }

      svgInStateWithIdentifier(stateIdentifier) {
          let vectorContent = this.valueForKeyInStateWithIdentifier("vectorContent", stateIdentifier);
          if (vectorContent != null && vectorContent != "") {
              let parsedJson = JSON.parse(vectorContent);
              if(parsedJson.hasOwnProperty('svg')) {
                  return parsedJson["svg"];
              }
              else {
                  return "<svg></svg>";
              }
          }
          else {
              return "<svg></svg>";
          }
      }

      lastCanvasSizeInStateWithIdentifier(stateIdentifier) {
          let vectorContent = this.valueForKeyInStateWithIdentifier("vectorContent", stateIdentifier);
          if (vectorContent != null && vectorContent != "") {
              let parsedJson = JSON.parse(vectorContent);
              if(parsedJson.hasOwnProperty('lastCanvasWidth') && parsedJson.hasOwnProperty('lastCanvasHeight')) {
                  let lastCanvasWidth = parsedJson["lastCanvasWidth"];
                  let lastCanvasHeight = parsedJson["lastCanvasHeight"];
                  
                  return [lastCanvasWidth, lastCanvasHeight];
              }
              else {
                  return [0, 0];
              }
          }
          else {
              return [0, 0];
          }
      }


      /**
          sets the value inside this cell. This method does not update the visual representation. 
          Use {@link AntetypeWeb#cellSetProperty} to change the value and update the display

          @param value {Object} the value of the property
          @param key {String} name of the property (see documentation)
          @param stateIdentifier {String} the identifier of the state {@link GDState}.
      */
      setValueForKeyInStateWithIdentifier(value, key, stateIdentifier) {
          if (this._statesPropertiesDictionary == undefined) 
              this._statesPropertiesDictionary = {};

          var statesDictionary = this._statesPropertiesDictionary[stateIdentifier];
          if (statesDictionary == undefined) {
              statesDictionary = {};
              this._statesPropertiesDictionary[stateIdentifier] = statesDictionary;
          }

          statesDictionary[key] = value;
      }

      /**
       * calls f(e) with all eventHandlers
       * @param {Function} f 
       */
      eventHandlersDo(f) {
          Object.values(this._eventHandlers).forEach(e => e.forEach(f));
      }

      /**
       * @returns {Map<string, GDEventHandler>}
       */
      get eventHandlers() {
          return this._eventHandlers;
      }

      setEventHandlers(a) {
          // Get active repeat handlers
          let activeRepeatEventHandlers = [];
          const oldRepeatEventHandlers = this._eventHandlers[GDIdleEventType];
          if (oldRepeatEventHandlers && oldRepeatEventHandlers.length > 0) {
              for (let i=0; i<oldRepeatEventHandlers.length; i++) {
                  const eventHandler = oldRepeatEventHandlers[i];
                  if(eventHandler.intervalID != null) {
                      activeRepeatEventHandlers.push(eventHandler.objectID);
                      eventHandler.stopRepeat();
                  }
              }
          }

          this.eventHandlersDo(e => e.removeOldListeners());
          this._eventHandlers = {};
          for (let i=0; i<a.length; i++) {
              const eventHandler = a[i];
              let existingHandlers = this._eventHandlers[eventHandler.eventType];
              if (existingHandlers === undefined) {
                  this._eventHandlers[eventHandler.eventType] = [eventHandler];
              } else {
                 existingHandlers.push(eventHandler);
              }

              // Restart active repeat handlers
              if((activeRepeatEventHandlers.indexOf(eventHandler.objectID) > -1)) {
                  eventHandler.startRepeat();
              }
          }
      }

      updateEventListeners(at) {
          this.eventHandlersDo(e => e.updateEventListeners(at, this));
      }

      /**
       * true if this cell has actions for the given event type
       * @param {string} eventType 
       * @returns {boolean}
       */
      hasActionsOfEventType(eventType) {
          const eventHandlers = this._eventHandlers[eventType];
          if (eventHandlers === undefined)
              return false;

          // if an action is defined on a subcell of a widget, it will not execute
          // need to investigate how this happens, anyway. But for now like the 
          // normal Antetype, look only for basicCell and root cells.
          if (this.isBasicCell || this.isRootInstanceCell)  {
              for (let i=0; i<eventHandlers.length; i++) {
                  let eventHandler = eventHandlers[i];
                  const actionSets = eventHandler.orderedActionSets;
                  if (actionSets.length > 0) {
                      return true;
                  }
              }
          }
          return false;
      }

      /**
       * inserts a css-rule for the given state in the screens stylesheet
       * @param {GDState} state 
       * @returns {CSSRule}
       */
      insertCSSRuleForState(state) {
          const selector = cssSelectorInstance(this, state, this._project);

          const screen = this.screen;
          const styleSheet = state.cssStyleSheetOfScreen(screen); 

          let index = styleSheet.rulesLength;
          if (state.type != GDState.GDCustomStateType) {
              let existingStates = this.widget.states.filter( s => this._cssStyles[s.identifier] != undefined );
              existingStates.push(state);
              if (existingStates.length > 1) {
                  existingStates.sort(GDState.sortFunction);
                  const stateIndex = existingStates.indexOf(state);
                  if (stateIndex == 0) {
                      const  existingState= existingStates[1];
                      const r = this._cssStyles[existingState.identifier].parentRule;
                      const existingIndex = existingState.cssStyleSheetOfScreen(screen).indexOfSelector(r.selectorText);
                      if (existingIndex != undefined) {
                          index = existingIndex;
                      }
                  } else {
                      const existingState = existingStates[stateIndex-1];
                      const r = this._cssStyles[existingState.identifier].parentRule;
                      const existingIndex = existingState.cssStyleSheetOfScreen(screen).indexOfSelector(r.selectorText);
                      if (existingIndex != undefined) {
                          index = existingIndex+1;
                      }
                  }
              }
          }


          const cssRule = styleSheet.insertSelector(selector, index);
          const style = cssRule.style; 
          return style;
      }


      cssStyleForStateIdentifier(stateIdentifier) {
          const cssStyle = this._cssStyles[stateIdentifier]; 
          if (cssStyle == undefined) {
              const state = this._project.stateWithIdentifier(stateIdentifier);
              const selector = cssSelectorInstance(this, state, this._project);

              const styleSheet = state.cssStyleSheetOfScreen(this.screen); 
              const existingRule = styleSheet.existingRuleForSelector(selector);

              if (existingRule != undefined) {
                  this._cssStyles[stateIdentifier] = existingRule.style;
              } else {
                  const style = this.insertCSSRuleForState(state);
                  this._cssStyles[stateIdentifier] = style;
              }
          }
          return this._cssStyles[stateIdentifier];
      }

      /*
          called for the "prerendered" cells of the first screen of the exported WebViewer.
          Needed to build the relationship between JavaScript-Objects and HTML Elements etc. 
      */
      connectObjects(at) {
          var DOMElement = document.getElementById(this.objectID);
          DOMElement.figure = this;
          this.DOMElement = DOMElement;

          // connect span, hacky...
          for (let i=0; i<DOMElement.childNodes.length; i++) {
              var child = DOMElement.childNodes[i];
              if (child.tagName == "SPAN") {
                  var span = child;
                  DOMElement.textSpan = span;
                  span.figure = this;
                  span = child;
                  
                  if (span.hasChildNodes()) {
                      span.contentSpan = span.childNodes[0];
                  }
                  break;
              }
          }

          if (this.valueForKeyInStateWithIdentifier("isEditableText", this.activeStateIdentifier)) {
              at.updateText(this);    // Issue #203 make sure editable works on current screen
          }

          var states = this.widget.states;
          for (let i=0; i<states.length; i++) {
              var state = states[i];
              var selector = cssSelectorInstance(this, state, this._project);
              var styleSheet = state.cssStyleSheetOfScreen(this.screen); 
              //var styleSheet = state.cssStyleSheet(this._project.currentLookAndFeel); 


              var existingRule = styleSheet.existingRuleForSelector(selector);
              if (existingRule != null) {
                  this._cssStyles[state.identifier] = existingRule.style;
              }
          }

      }

     deleteCSSForState(state) {
         var styleSheet = state.cssStyleSheetOfScreen(this.screen);
         var selector = cssSelectorInstance(this, state, this._project);
         styleSheet.deleteSelector(selector);
         delete this._cssStyles[state.identifier];
      }

      cleanupStyles() {
          this.orderedComponents.forEach(function(c) {c.cleanupStyles();});
          this.widget.states.forEach((state)  => { this.deleteCSSForState(state); });
      }

      /**
          the widget of this cell.  
          @returns {GDWidget}
      */
      get widget() {
          return this.rootInstanceCell.definition.widget;
      }

      /**
          returns true if this cell is a basic cell. 
      */
      get isBasicCell() {
          return this.widget.type ==  GDWidget.GDNormalCellWidgetType;
      }

      addComponentsToArray(a) {
          a.push(this);
          for (var i=0; i<this.orderedComponents.length; i++) {
              var child = this.orderedComponents[i];
              child.addComponentsToArray(a);
          }
      }

      /**
          an array of itself an all children (recursively)
      */
      get deepOrderedComponents() {
          var result = [];
          this.addComponentsToArray(result);
          return result;
      }

      activeLayoutPolicy() {
          const code = this.valueForKeyInStateWithIdentifier("layoutPolicyCode", this.activeStateIdentifier);
          return GDLayoutPolicy.fromCode(code);
      }

      dropTargetsExcludingPassengers(passengers) {
          return this.activeLayoutPolicy().dropTargetsForCellExcludingPassengers(this, passengers, false);
      }

      continousDropTargetsExcludingPassengers(passengers) {
          return this.activeLayoutPolicy().dropTargetsForCellExcludingPassengers(this, passengers, true);
      }
  }


  GDModelObject.register(GDWidgetInstanceCell);

  /**
      Objects of this class define the top-level cell of a widget, 
      or a basic cell. 

      @extends {GDWidgetInstanceCell}
  */
  class GDWidgetInstanceRootCell extends GDWidgetInstanceCell {
      constructor(dictionary, project) {
          super(dictionary, project);
          this._activeStateIdentifier = dictionary.activeState;
          this._activeState = undefined;
      }


      /**
          the active state {@link GDState} of this cell. 
          @returns {GDState}
      */
      get activeState() {
          if (this._activeState === undefined) 
              this._activeState = this._project.stateWithIdentifier(this._activeStateIdentifier);
          return this._activeState;
      }

      /**
       * @param {GDState} state
       */
      set activeState(state) {
          this._activeState = state;
          this._activeStateIdentifier = state.identifier;
      }

      /**
          the identifier (String} of the active state. 
          @returns {string}
      */
      get activeStateIdentifier() {
          return this._activeStateIdentifier;
      }

      set activeStateIdentifier(identifier) {
          this._activeState = undefined;
          this._activeStateIdentifier = identifier;
      }

      get rootInstanceCell() {
          return this;
      }

      /**
          all cells within this cell belonging to the same widget
          @returns {Array<GDWidgetInstanceCell>}
      */
      get widgetComponents() {
          var widget = this.widget;

          return this.deepOrderedComponents.filter(function(c) {
              return !c.isBasicCell && c.widget == widget;
          });
      }

      connectObjects(at) {
          super.connectObjects(at);
          this.updateEventListeners(at);

  /*        if (this.widget.states.find( s => s.type == GDState.GDFocusStateType)) {
              this.DOMElement.tabIndex = 0;
          } */
      }
  }


  GDModelObject.register(GDWidgetInstanceRootCell);


  /**
      I represent a screen. 

      The styles for cells on this screen are stored in the _cssStyleSheet (normal) or
      _breakPointStyleSheet (styles in breakpoint-states). 

      @extends {GDWidgetInstanceRootCell}
  */
  class GDScreen extends GDWidgetInstanceRootCell {
      constructor(dictionary, project) {
          super(dictionary, project);
          this._cssStyleSheet = null;
          this._breakPointStyleSheet = null;
          this._mediaRules = new Map();
      }

      get isScreen() {
          return true;
      }


      get screen() {
          return this;
      }

      valueForKeyInStateWithIdentifier(key, stateIdentifier) {
          // issue23: we will have to see if we continue of storing the bounds in the GDScreen-object
          // and pretend the screen uses flex-resizing...
          if (key == "verticalResizing") {
              return GDFlexResizing;
          }

          if (key == "horizontalResizing") {
              return GDFlexResizing;
          }

          if (key == "isContentClipped") {
              return true;
          }

          return super.valueForKeyInStateWithIdentifier(key, stateIdentifier);
      }

      /**
       * inserts the two stylesheets into the head and inserts the 
       * media-rules into the breakpoint-stylesheet.
       *
       * odering is: 
       * 1. Widget styles
       * 2. Screen Styles
       * 3. Widget Breakpoint Styles
       * 4. Screen Breakpoint Styles
       */
      createStyleSheets() {
          const lookAndFeel = this._project.currentLookAndFeel;

          const styleSheetElement = document.createElement("style");
          styleSheetElement.id = "CurrentScreenStyles";
          const breakpointStyleNode = lookAndFeel.breakPointStyleSheet.ownerNode;
          document.head.insertBefore(styleSheetElement, breakpointStyleNode) ;
          this._cssStyleSheet = new GDStyleSheet(styleSheetElement.sheet);

          const breakpointStyleElement = document.createElement("style");
          breakpointStyleElement.id = "CurrentScreenBreakpointStyles";
          document.head.appendChild(breakpointStyleElement);
          this._breakPointStyleSheet = new GDStyleSheet(breakpointStyleElement.sheet);

          this._project.designBreakPoints.forEach( b => this.insertBreakPoint(b) );
      }
      

      insertBreakPoint(b) {
          if (this.mediaRuleForBreakpoint(b)) {
              return;
          }

          this._mediaRules.set(b,new GDStyleSheet(this._breakPointStyleSheet.appendSelector(b.mediaText)));
      }

      insertStyleSheets() {
          this._cssStyleSheet.disabled = false;
          this._breakPointStyleSheet.disabled = false;
      }

      connectObjects(at) {
          const screenCSSLink = document.getElementById("CurrentScreenStyles");
          if (screenCSSLink) {
              this._cssStyleSheet = new GDStyleSheet(screenCSSLink.sheet);
              this._cssStyleSheet.fillSelectorMap();
          }

          const screenBreakPointCSSLink = document.getElementById("CurrentScreenBreakpointStyles");
          if (screenBreakPointCSSLink) {
              this._breakPointStyleSheet = new GDStyleSheet(screenBreakPointCSSLink.sheet);
              this._breakPointStyleSheet.fillSelectorMap();

              for (let i=0; i<this._breakPointStyleSheet.cssRules.length; i++) {
                  let mediaRule = this._breakPointStyleSheet.cssRules[i];
                  let mediaText = mediaRule.media.mediaText;
                  let breakPoint = this._project.designBreakPoints.find( 
                      b => mediaText.indexOf(`${b.breakPointMaxWidth}px`) != -1 );
                  this._mediaRules.set(breakPoint, new GDStyleSheet(mediaRule));
              }
          }

          if (screenCSSLink == null || screenBreakPointCSSLink == null) {
              this.createStyleSheets();
          }
          super.connectObjects(at);
      }

      updateDesignBreakPoint(breakPoint) {
          let breakPointStyleSheet = this.mediaRuleForBreakpoint(breakPoint);
          breakPointStyleSheet.media.mediaText = `(max-width: ${breakPoint.breakPointMaxWidth}px)`;
      }

      deleteDesignBreakPoint(breakPoint) {
          this._breakPointStyleSheet.deleteSelector(breakPoint.mediaText);
          this._mediaRules.delete(breakPoint);
      }

      mediaRuleForBreakpoint(breakpoint) {
          return this._mediaRules.get(breakpoint);
      }

      cleanupStyles() {
          if (this._cssStyleSheet) {
              this._cssStyleSheet.disabled = true;
          }

          if (this._breakPointStyleSheet) {
              this._breakPointStyleSheet.disabled = true;
          }
      }

      removeStyleSheets() {
          if (this.cssStyleSheet) {
              this.cssStyleSheet.remove();
          }
          if (this.breakPointStyleSheet) {
              this._breakPointStyleSheet.remove();
          }
      }

      get cssStyleSheet() {
          return this._cssStyleSheet;
      }

      get breakPointStyleSheet() {
          return this._breakPointStyleSheet;
      }

      enablePseudoStates() {
          this.cssStyleSheet.enablePseudoStates();
          for (let mediaRule of this._mediaRules.values()) {
              mediaRule.enablePseudoStates();
          }
      }

      disablePseudoStates() {
          this.cssStyleSheet.disablePseudoStates();
          for (let mediaRule of this._mediaRules.values()) {
              mediaRule.disablePseudoStates();
          }
      }

      get htmlCSSStyle() {
          let rule = this.cssStyleSheet.existingRuleForSelector("html");
          if (rule == undefined) {
              rule = this.cssStyleSheet.appendSelector("html");
          }
          return rule.style;
      }
  }
  GDModelObject.register(GDScreen);


  /**
      a resource in the prototype 

      see {@link GDImageResource}
      @extends {GDModelObject}
  */
  class GDResource extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.fileName = dictionary["fileName"];
          this.identifier = dictionary["identifier"];
      }
  }
  GDModelObject.register(GDResource);

  /**
      an image used the prototype. 
      @extends {GDResource}
  */
  class GDImageResource extends GDResource {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.width = dictionary["width"];
          this.height = dictionary["height"];
      }
  }
  GDModelObject.register(GDImageResource);


  /**
      The library contains the widgets and Resources of a project. 
      @extends {GDModelObject}
  */
  class GDLibrary extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project); 

          var resourcesJSON = dictionary["resources"];
          this.resources = {};
          if (resourcesJSON) {
              for (var i=0; i<resourcesJSON.length; i++) {
                  var resourceJSON = resourcesJSON[i];
                  var resource = GDModelObject.fromJSONObjectInProject(resourceJSON, project);
                  this.resources[resource.identifier] = resource;
              }
          }
          this.widgets = this.decodeArray(dictionary["widgets"], project);
          this.colors = this.decodeArray(dictionary["colors"], project);
          Object.seal(this);
      }

      static createInstance(project) {
          let library = super.createInstance(project);
          const screenWidget = GDWidget.createInstance(project);
          screenWidget.type = GDWidget.GDScreenWidgetType;
          screenWidget._hierarchy = GDScreenDefinition.createInstance(project);
          screenWidget._hierarchy._widget = screenWidget;
          library.addWidget(screenWidget);


          const basicCellWidget = GDWidget.createInstance(project);
          basicCellWidget.type = GDWidget.GDNormalCellWidgetType;
          basicCellWidget._hierarchy = GDWidgetRootCellDefinition.createInstance(project);
          basicCellWidget._hierarchy._widget = basicCellWidget; 
          library.addWidget(basicCellWidget);

          return library;
      }

      /**
       * adds the widget
       * @param {GDWidget} widget 
       */
      addWidget(widget) {
          const existingWidget = this.widgetWithIdentifier(widget.identifier);
          if (existingWidget) {
              this.removeWidget(existingWidget);
          }
          this.widgets.push(widget);
      }

      /**
       * removes the widget
       * @param {GDWidget} widget 
       */
      removeWidget(widget) {
          const index = this.widgets.indexOf(widget);
          this.widgets.splice(index,1);
      }

      /**
       * @returns {GDWidget|undefined} the widget with the identifier, or undefined
       * @param {string} identifier 
       */
      widgetWithIdentifier(identifier) {
          for (var i=0; i<this.widgets.length; i++) {
              var widget = this.widgets[i];
              if (widget.identifier == identifier) {
                  return widget;
              }
          }
          return undefined;
      }

      /**
       * the widget of the screens
       * @returns {GDWidget}
       */
      get screenWidget() {
          return this.widgets.find( w => w.type == GDWidget.GDScreenWidgetType);
      }

      /**
       * @returns {GDWidget} the widget of the basic cell
       */
      get basicCellWidget() {
          return this.widgets.find( w => w.type == GDWidget.GDNormalCellWidgetType);
      }

      /**
       * adds the resource
       * @param {GDResource} r 
       */
      addResource(r) {
          this.resources[r.identifier] = r;
      }

      /**
       * removes the resource
       * @param {GDResource} r 
       */
      removeResource(r) {
          delete this.resources[r.identifier];
      }
  }
  GDModelObject.register(GDLibrary);




  /**
      I represent the definition of a prototype. That is I own all the screens, 
      widgets etc. Counterpart of the same class in Antetype. 
  */
  class GDProject extends GDModelObject {
      constructor(dictionary) {
          super(dictionary, null); 
          this._states = {};
          this._definitions = {};

          this.designBreakPoints = this.decodeArray(dictionary["designBreakPoints"], this);
          if (dictionary["projectLibrary"]) {
              this.library = GDModelObject.fromJSONObjectInProject(dictionary["projectLibrary"], this);
          } else {
              this.library = GDLibrary.createInstance(this);
          }

          if (dictionary["currentLookAndFeel"]) {
              this._currentLookAndFeel = new GDLookAndFeel(dictionary["currentLookAndFeel"], this);
          } else {
              this._currentLookAndFeel = GDLookAndFeel.createInstance(this);
          }
          this.sortDesignBreakPoints();
          this.at = null;
          this._orderedScreens = [];
          Object.seal(this);
      }

      /**
       * @returns {Array<GDDesignBreakPoint>} the design breakpoints ordered from smalles to largest
       */
      sortDesignBreakPoints() {
          this.designBreakPoints.sort(function(a,b) { 
              return b.breakPointMaxWidth - a.breakPointMaxWidth });
      }

      /**
       * register the given state
       * @param {GDState} state 
       */
      registerState(state) {
          this._states[state.identifier] = state;
      }


      /**
          an Array of the sceens in this project {@link GDScreen}
          @returns {Array<GDScreen>}
      */
      get orderedScreens() {
          return this._orderedScreens;
      }

      /**
       * adds the screen
       * @param {GDScreen} s 
       */
      addScreen(s) {
          this._orderedScreens.push(s);
      }

      /**
       * 
       * @param {Array<GDState>} states 
       */
      deleteStates(states) {
          for (var i=0; i<states.length; i++) {
              var state = states[i];
              this.currentLookAndFeel.deleteState(state);

              var widget = state.widget;
              widget.deleteState(state);
              
              delete this._states[state.identifier];
          }
      }

      /**
       * registers the definition. 
       * @param {GDWidgetCellDefinition} definition 
       */
      registerDefinition(definition) {
          this._definitions[definition.identifier] = definition;
      }

      /**
       * returns the state with the given identifier. Throws if no state is found!
       * @param {string} identifier 
       * @returns {GDState}
       */
      stateWithIdentifier(identifier) {
          var state = this._states[identifier];
          if (state === undefined) {
              throw new Error("no state found for " + identifier);
          }
          return state;
      }

      /**
       * returns the definioiton with the identifier, throws if none is registered!
       * @param {string} identifier 
       * @returns {GDWidgetCellDefinition}
       */
      definitionWithIdentifier(identifier) {
          var definition = this._definitions[identifier];
          if (definition === undefined) {
              throw new Error("no definition found for " + identifier);
          }
          return definition;
      }

      /**
       * @returns {GDUIColor|undefined} the color with the identifier
       * @param {string} identifier 
       */
      colorWithIdentifier(identifier) {
          return this.currentLookAndFeel.colorWithIdentifier(identifier);
      }

      /**
       * updates the value of the color
       * @param {GDUIColor} color 
       * @param {CPColor} colorValue 
       */
      updateColor(color, colorValue) {
          this.currentLookAndFeel.updateColor(color, colorValue);
      }

      /**
       * adds the widget
       * @param {GDWidget} widget 
       */
      addWidget(widget) {
          this.library.addWidget(widget);
      }

      /**
       * removes the widget
       * @param {GDWidget} widget 
       */
      removeWidget(widget) {
          this.library.removeWidget(widget);
      }

      /**
       * @returns {GDWidget|undefined} the widget with this identifier
       * @param {string} identifier 
       */
      widgetWithIdentifier(identifier) {
          return this.library.widgetWithIdentifier(identifier);
      }


      /**
       * @returns {GDDesignBreakPoint|undefined} the breakpoint with the given name 
       * @param {string} name 
       */
      designBreakPointWithName(name) {
          return this.designBreakPoints.find(function(breakPoint) {
              return breakPoint.breakPointName == name;
          });
      }

      /**
       * @returns {GDDesignBreakPoint|undefined} breakpoint with object-id
       * @param {string} objectID 
       */
      designBreakPointWithObjectID(objectID) {
          return this.designBreakPoints.find(function(breakPoint) {
              return breakPoint.objectID== objectID;
          });
      }

      /**
       * updates the breakpoint 
       * @param {GDDesignBreakPoint} b the breakpoint
       * @param {string} name the new name
       * @param {number} width the new width
       */
      updateDesignBreakPoint(b, name, width) {
          var oldName = b.breakPointName;
          if (oldName != name) {
              for (var stateId in this._states) {
                  var state = this._states[stateId];
                  if (state.designBreakPointName == oldName) {
                      state.designBreakPointName = name;
                  }
              }

              b.breakPointName = name;
          }
          b.breakPointMaxWidth = width;
          this.sortDesignBreakPoints();

          //TODO: sort media-queries: 
  //        var i = this.designBreakPoints.indexOf(b);

          
          
      }

      /**
       * adds the breakpoint
       * @param {GDDesignBreakPoint} b 
       */
      addDesignBreakPoint(b) {
          this.designBreakPoints.push(b);
          this.sortDesignBreakPoints();
          var i = this.designBreakPoints.indexOf(b);
          b.insertIntoStyleSheet(this.currentLookAndFeel.breakPointStyleSheet, i);
      }

      /**
       * deletes the breakpoint
       * @param {GDDesignBreakPoint} b 
       */
      deleteDesignBreakPoint(b) {
          b.deleteFromStyleSheet();
          var i = this.designBreakPoints.indexOf(b);
          this.designBreakPoints.splice(i,1);
      }

      /**
          the resources (images) of this project {@link GDResource}
          @returns {Array<GDResource>}
      */
      get resources() {
          return this.library.resources;
      }

      /**
       * adds the resource
       * @param {GDResource} r 
       */
      addResource(r) {
          this.library.addResource(r);
      }

      /**
       * 
       * @param {GDResource} r 
       */
      removeResource(r) {
          this.library.removeResource(r);
      }

      /**
          all widgets in this prototype {@link GDWidget}
          @returns {Array<GDWidget>}
      */
      get widgets() {
          return this.library.widgets;
      }


      /**
          the look&feel (style-definitions) of this prototype 
          @returns {GDLookAndFeel}
      */
      get currentLookAndFeel() {
          return this._currentLookAndFeel;
      }

      connectObjects() {
          this.designBreakPoints.forEach(b => b.connectObjects(this.currentLookAndFeel.breakPointStyleSheet));
      }

      /**
       * @returns {GDWidgetInstanceRootCell} a new basic cell
       */
      createBasicCell() {
          return this.library.basicCellWidget.createInstance();
      }

      /**
       * a basic cell with the given bounds
       * 
       * @param {number} x 
       * @param {number} y 
       * @param {number} w 
       * @param {number} h 
       * @returns {GDWidgetInstanceRootCell}
       */
      createBasicCellWithBounds(x,y,w,h) {
          const cell = this.createBasicCell();
          cell.setValueForKeyInStateWithIdentifier(x,"x",cell.activeStateIdentifier);
          cell.setValueForKeyInStateWithIdentifier(y,"y",cell.activeStateIdentifier);
          cell.setValueForKeyInStateWithIdentifier(w,"width",cell.activeStateIdentifier);
          cell.setValueForKeyInStateWithIdentifier(h,"height",cell.activeStateIdentifier);
          return cell;
      }
      
  }
  GDModelObject.register(GDProject);

  /**
   * I represent an Antetype breakpoint
   * 
   * @extends {GDModelObject}
   */
  class GDDesignBreakPoint extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project); 
          this.breakPointName = dictionary["breakPointName"];
          this._breakPointMaxWidth = dictionary["breakPointMaxWidth"];
          this.mediaRule = null; // DOM-CSSMediaRule
          this._styleSheet = null;
          Object.seal(this);
      }

      /**
       * @returns {number} the max-width
       */
      get breakPointMaxWidth() {
          return this._breakPointMaxWidth;
      }

      /**
       * sets the breakoints max-width
       * @param {number} w
       */
      set breakPointMaxWidth(w) {
          this._breakPointMaxWidth = w;
          this.mediaRule.media.mediaText = `(max-width: ${w}px)`;
      }

      /**
       * @returns {string} the selector of the media quuery
       */
      get mediaText() {
          var max = this.breakPointMaxWidth;
          return "@media (max-width: " + max + "px)";
      }

      /**
       * @returns {string} the mediaquery 
       */
      get mediaQuery() {
          return this.mediaText + " {}";
      }


      /**
       * inserts the media rule in the stylesheet at index
       * @param {GDStyleSheet} styleSheet 
       * @param {number} index 
       */
      insertIntoStyleSheet(styleSheet, index) {
          this._styleSheet = styleSheet;
          this.mediaRule = new GDStyleSheet(styleSheet.insertSelector(this.mediaText, index));
      }

      /**
       * removes the media rule from the stylesheet
       */
      deleteFromStyleSheet() {
          this._styleSheet.deleteSelector(this.mediaText);
          this.mediaRule = undefined;
      }

      connectObjects(styleSheet) {
          this._styleSheet = styleSheet;

          for (let i=0; i<this._styleSheet.cssRules.length; i++) {
              let mediaRule = this._styleSheet.cssRules[i];
              let mediaText = mediaRule.media.mediaText;
              if (mediaText.indexOf(`${this.breakPointMaxWidth}px`) != -1) {
                  this.mediaRule = new GDStyleSheet(mediaRule);
                  this.mediaRule.fillSelectorMap();
                  break;
              }
          } 

          if (this.mediaRule == undefined)  {
              this.insertIntoStyleSheet(styleSheet, styleSheet.rulesLength);
          }
      }
  }

  GDModelObject.register(GDDesignBreakPoint);


  /**
      An instance cell can have multiple States. This class represents a 
      state and is the counterpart to its Antetype class with the same name. 
      @extends {GDModelObject}
  */
  class GDState extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);

          this._name = dictionary.name;
          this._type = dictionary.type;
          this._identifier = dictionary.identifier;
          this._designBreakPointName = dictionary.designBreakPointName;
          this._animationDuration = dictionary.animationDuration;
          this._animate = dictionary.animate;
          this._animationCurve = dictionary.animationCurve;
          this.widget = null;
          project.registerState(this);
          Object.seal(this);
      }

      static createInstance(project) {
          let state = super.createInstance(project);
          state._identifier = Math.floor(Math.random() * 1000);
          project.registerState(state);
          return state;
      }


      /**
          @returns {string} the identifier of this state. 
      */
      get identifier() {
           return this._identifier; 
      }
       

      _inRunMode() {
          //FIXME (for tests):
          if (this._project.at == undefined)
              return true;
          return this._project.at.currentTool.isRunTool();
      }

      /**
          pseudo state is a state like mouse-over or pressed which is handled
          automatically by the browser. 
      */
      get isPseudoState() {
          return this._inRunMode() && this.cssSelector().indexOf(":") != -1;
      }

      /**
          the type of this state. (GDState.GDNormalStateType, GDState.GDMouseOverStateType, 
          GDState.GDPressedStateType, GDState.GDFocusStateType, GDState.GDCustomStateType)
      */
      get type() {
          return this._type;
      }

      /**
          @returns {string} the name of this state
      */
      get name() {
          return this._name;
      }

      /**
       * @returns {string} the css-selector of this state
       */
      cssSelector() {
          var separator = this._inRunMode() ? ":" : "_";
          switch(this._type) {
              case GDState.GDNormalStateType: return ""; 
              case GDState.GDMouseOverStateType: return separator + "hover"; 
              case GDState.GDPressedStateType: return separator + "active"; 
              case GDState.GDFocusStateType: return separator + "focus-within"; 
          }

          // for breakpoint-states use the default state
          let stateForSelector = this.defaultState;
          if (stateForSelector == undefined)
              stateForSelector = this;
          return "_S" + stateForSelector.objectID;
      }

      static sortFunction(a,b) {
          if (a.type == GDState.GDNormalStateType) {
              return -1;
          }

          if (b.type == GDState.GDNormalStateType) {
              return 1;
          }

          if (a.type == GDState.GDMouseOverStateType) { 
              return -1;
          }

          if (b.type == GDState.GDMouseOverStateType) {
              return 1;
          }


          return 0;
      }

      /**
       * @returns {string|undefined} the name of its breakpoint (if it has one)
       */
      get designBreakPointName() {
          return this._designBreakPointName;
      }

      /**
       * @param {string} n the new breakpoint name
       */
      set designBreakPointName(n) {
          this._designBreakPointName = n;
      }

      /**
       * @returns {GDDesignBreakPoint|null} the breakpoint (if any)
       */
      designBreakPoint() {
          if (this._designBreakPointName == undefined) {
              return null;
          }
          return this._project.designBreakPointWithName(this._designBreakPointName);
      }

      /*
       * return this state in all breakpoints (including default one, where 
       * designBreakPointName is null. Ordered ascending (smallest breakpoint > default one).
       * @returns {Array<GDState>}    this state in all breakpoints
       */
      breakPointStates() {
          var name = this._name;
          var type = this._type;
          var breakPointStates = this.widget.states.filter(function(b) {
              return b._name == name && b._type == type;
          });

          return breakPointStates.sort(function(a,b) {
              var ab = a.designBreakPoint();
              var bb = b.designBreakPoint();

              if (ab == null)
                  return 1;

              if (bb == null) 
                  return -1;

              return ab.breakPointMaxWidth - bb.breakPointMaxWidth;
          });
      }

      /**
       * @returns {GDState} this state in the default breakpoint
       */
      get defaultState() {
          if (this.designBreakPointName == undefined)  {
              return this;
          }

          return this.widget.states.find(b => {
             return b.name == this.name && b.type == this.type && b.designBreakPointName == null;
          });
      }

      /**
       * @returns {boolean} if this state is defined in breakpoints
       */
      hasBreakPoints() {
          return this.breakPointStates().length > 1;
      }

      /**
       * The CSS stylesheet (can be a CSSMEdiaRule). 
       */
      cssStyleSheet(lookAndFeel) {
          if (!this.hasBreakPoints() || this._designBreakPointName == null) {
              return lookAndFeel.cssStyleSheet;
          }

          const myBreakPoint = this.designBreakPoint();
          
          if (myBreakPoint) {
              return myBreakPoint.mediaRule;
          }

          return lookAndFeel.deletedBreakPointStyleSheet;
      }

      /**
       * a GDStyleSheet for the state in on the screen.
       * @returns {GDStyleSheet}
       */
      cssStyleSheetOfScreen(screen) {
          if (!this.hasBreakPoints() || this._designBreakPointName == null) {
              return screen.cssStyleSheet;
          }

          const myBreakPoint = this.designBreakPoint();
          if (myBreakPoint) {
              return screen.mediaRuleForBreakpoint(myBreakPoint); // FIXME breakpoints 
          }

          return this._project.currentLookAndFeel.deletedBreakPointStyleSheet;
      }




      /**
          @return {string} the css-transiton for (automatic state-animation)
      */
      get cssTransition() {
          if (!this._animate)
              return "";
          return GDCSSTransition(this._animationDuration, this._animationCurve, 0);
      }

      setAutoAnimation(animate, duration, curve) {
          this._animate = animate;
          this._animationDuration = duration;
          this._animationCurve = curve;
          this._project.currentLookAndFeel.updateStateTransition(this);
      }
  }

  GDState.GDUndefinedStateType = -1;
  GDState.GDNormalStateType = 0;
  GDState.GDMouseOverStateType = 1;
  GDState.GDDisabledStateType = 2;
  GDState.GDPressedStateType = 3;
  GDState.GDFocusStateType = 4;
  GDState.GDCustomStateType = 100;

  GDModelObject.register(GDState);


  const GDNoPainterType = 0;

  const GDRectangleCellType = 0,
      GDCircleCellType = 1, 
      GDTriangleCellType = 2,
      GDVectorCellType = 3;

  	
  const GDLeftAlignment	= 0,
      GDCenterAlignment = 1,
  	GDRightAlignment = 2,
  	GDTopAlignment = 0,
  	GDBottomAlignment = 2,

  	GDFixResizing = 0,	
  	GDFlexResizing = 1,
  	GDIntrinsicResizing = 2,

  	GDFixedLayoutPolicyCode = 0,
  	GDAlignmentLayoutPolicyCode = 1, 
  	GDHorizontalBoxLayoutPolicyCode = 2,
  	GDVerticalBoxLayoutPolicyCode = 3,
  	GDVisibilityHidden = 0,
  	GDVisibilityVisible = 1,
  	GDVisibilityCollapsed = 2,
  	
      GDBorderTypeSolid = 0,
      GDBorderTypeDotted = 1,
      GDBorderTypeDashed = 2,
      GDColorPainterType = 1, 
      GDImagePainterType = 2,
      GDGradientPainterType = 3,

      GDStretchImageOperation = 0,
      GDOriginalSizeImageOperation  = 1, 
      GDTileImageOperation = 2,

      GDNoScrolling = 0,
      GDVerticalScrolling = 1,
      GDHorizontalScrolling = 2,
      GDAutoScrolling = 3,

      GDBlendModeNormal = 0,
      GDBlendModeMultiply = 1,
      GDBlendModeScreen = 2,
      GDBlendModeOverlay = 3,
      GDBlendModeDarken = 4,
      GDBlendModeLighten = 5,
      GDBlendModeColorDodge = 6,
      GDBlendModeColorBurn = 7,
      GDBlendModeHardLight = 8,
      GDBlendModeSoftLight = 9,
      GDBlendModeDifference = 10,
      GDBlendModeExclusion = 11,
      GDBlendModeHue = 12,
      GDBlendModeSaturation = 13,
      GDBlendModeColor = 14,
      GDBlendModeLuminosity = 15,

      GDBackgroundSizeNonProportional = 0,
      GDBackgroundSizeContain = 1,
      GDMouseEnterEventType = "GDMouseEnterEventType",
      GDMouseLeaveEventType = "GDMouseLeaveEventType",
      GDMouseDownEventType = "GDMouseDownEventType",
      GDMouseUpEventType = "GDMouseUpEventType",
      GDMouseClickEventType = "GDMouseClickEventType",
      GDDoubleClickEventType = "GDDoubleClickEventType",
      GDRightMouseClickEventType = "GDRightMouseClickEventType",

      GDScrollEventType = "GDScrollEventType",

      GDTouchEnterEventType = "GDTouchEnterEventType",
      GDTouchLeaveEventType = "GDTouchLeaveEventType",
      GDTouchMoveEventType = "GDTouchMoveEventType",
      GDTouchStartEventType = "GDTouchStartEventType",
      GDTouchEndEventType = "GDTouchEndEventType",

      GDKeyDownEventType = "GDKeyDownEventType",
      GDKeyUpEventType = "GDKeyUpEventType",

      GDIdleEventType = "GDIdleEventType",
      GDLoadEventType = "GDLoadEventType",
      GDUnloadEventType = "GDUnloadEventType",

      GDFocusEventType = "GDFocusEventType",
      GDFocusOutEventType = "GDFocusOutEventType",

      GDDidBecomeVisibleEventType = "GDDidBecomeVisibleEventType",
      GDDidBecomeInvisibleEventType = "GDDidBecomeInvisibleEventType",


      GDMaxSizeValue = 1000000;


  /**
      A look&feel stores the widget properties and manages the stylesheets used in the 
      prototype. 
      @extends {GDModelObject}
  */
  class GDLookAndFeel extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.properties = dictionary["lookNodes"] || {};
          this.colors = this.decodeArray(dictionary["colors"], project);
          this._cssStyleSheet = null;
          this._breakPointStyleSheet = null;
          this._styleSheetForDeletedBreakpoints = null;
          this._rootRule = null;          ///< :root {} for css variables

          // we can't use gdValue here, since we are in the process of building 
          // the project, therefor do it by hand: 
          if (dictionary["defaultColor"]) {
              const defaultColorIdentifier = dictionary["defaultColor"].GDUIColor.identifier;
              this.defaultColor = this.colorWithIdentifier(defaultColorIdentifier);
          } else {
              this.defaultColor = new GDUIColor({name: "Default", 
                  identifier: "DefaultColorIdentifier",
                  colorValue: {"NSColorValue":"1,1,1,1"}});
              this.colors.push(this.defaultColor);
          }
          this._defaultValues = undefined;
          Object.seal(this);
      }

      /**
       * @returns {any} the default value for the property named key 
       * @param {string} key 
       */
      defaultValueForKey(key) {

              if (this._defaultValues === undefined) {
                  this._defaultValues = {
          x: 									0,
          y: 									0,
          width: 								100, 
          height: 							100, 
          rotationAngle:						0,
          cellType:							GDRectangleCellType,  
          flexHeightPercentage:				100,
          flexWidthPercentage:				100,
          isMovable:							true,
          isSelectable:						true,
          isVisible:							true,
          isDisplay: 							true,
          isContentClipped:					true,
          isDropTarget:						true,
          isNestable:                         true,
          scrollable:                         0,
          maximumHeight:						GDMaxSizeValue, //Number.MAX_VALUE,
          minimumHeight:						3,
          maximumWidth:						GDMaxSizeValue, //Number.MAX_VALUE,
          minimumWidth:						3,
          verticalResizing:					GDFixResizing,
          horizontalResizing:					GDFixResizing,
          cornerRadiusBottomLeft:				0,
          cornerRadiusBottomRight:			0,
          cornerRadiusTopLeft:				0,
          cornerRadiusTopRight:				0,
          horizontalAlignment:				GDLeftAlignment,
          verticalAlignment:					GDLeftAlignment,
          marginBottom:						0,
          marginLeft:							0,
          marginRight:						0,
          marginTop:							0,
          paddingBottom:						0,
          paddingLeft:						0,
          paddingRight:						0,
          paddingTop:							0,
          opacity:							1,

          borderBottomWidth:					1,
          borderLeftWidth:					1,
          borderRightWidth:					1,
          borderTopWidth:						1,
          
          borderBottomType:					GDBorderTypeSolid,
          borderLeftType:					    GDBorderTypeSolid,
          borderRightType:					GDBorderTypeSolid,
          borderTopType:						GDBorderTypeSolid,

          borderBottomColor:					this.defaultColor,
          borderLeftColor:					this.defaultColor,
          borderRightColor:					this.defaultColor,
          borderTopColor:						this.defaultColor,

          layoutPolicyCode:					GDAlignmentLayoutPolicyCode,
          layoutWrap:                         false,

          backgroundPainterType:				GDNoPainterType,

          backgroundColor:					this.defaultColor,
          backgroundGradient:					CTGradient.unifiedDarkGradient(),
          backgroundGradientAngle:			0,
          backgroundGradientIsRadial:			false,

          backgroundImageResource:			null,
          backgroundImageHorizontalAlignment:	GDCenterAlignment,
          backgroundImageVerticalAlignment:	GDCenterAlignment,
          backgroundImageHorizontalOperation:	GDStretchImageOperation,
          backgroundImageVerticalOperation:	GDStretchImageOperation,
          backgroundImageProportionalScale:	GDBackgroundSizeNonProportional,

          dropShadow:							false,
          dropShadowAngle:					180,
          dropShadowSize:						0,
          dropShadowOffset:					2,
          dropShadowBlur:						2,
          dropShadowColor:					this.defaultColor,

          textRichText:						false,
          textString:				            null,
          textFont:							new GDFont({familyName:"Helvetica", displayName: "Helvetica", fontName: "Helvetica", size:12}),
          textColor:							this.defaultColor,
          textHorizontalAlignment:			GDCenterAlignment,
          textVerticalAlignment:				GDCenterAlignment,
          textAntialias:						true,
          textWordWrap:						true,
          textTraits:							0,
          textLineHeight:						1,
          textLineHeightMultiply:             true,
          isEditableText:                     false,

          textShadow:							false,
          textShadowOffset:					2,
          textShadowAngle:					180,
          textShadowBlur:						1,
          textShadowColor:					this.defaultColor,
          
          
          activeLayout:						false,
          activeHorizontalAlignment:			GDLeftAlignment,
          activeVerticalAlignment:			GDTopAlignment,
          
          isDrawingReverted:                  false,
          isDrawingAboveAll:                  false,
          drawingIndex:                       0,

          innerShadow:						false,
          innerShadowOffset:					5,
          innerShadowAngle:					315,
          innerShadowBlur:					5,
          innerShadowColor:					this.defaultColor,
          
          borderGradient:                     false,
          borderGradientFill:                 null, //FIXME [CTGradient unifiedDarkGradient],
          borderGradientIsRadial:             false,
          borderGradientAngle:                0.0, 
          filters:                            null,

          vectorContent:                      `{"json":"{}", "svg":"<svg></svg>", "lastCanvasWidth":0, "lastCanvasHeight":0}`,
                      customCSS:              null
      };
                  }
             return this._defaultValues[key]; 
          }

      /**
       * @returns {any|undefined} the value for the definition with definitionIdentifier in the state with identifer (or undefined)
       * @param {string} key 
       * @param {string} definitionIdentifier 
       * @param {string} stateIdentifier 
       */
      ownValueForKey(key, definitionIdentifier, stateIdentifier) {
          var propertiesForDefinition = this.properties[definitionIdentifier]; 
          if (propertiesForDefinition) {
              var stateProperties = propertiesForDefinition[stateIdentifier];
              if (stateProperties) {
                  var value = stateProperties[key];
                  if (value !== undefined)
                      return gdValue(value, this.project);
              }
          }
          return undefined;
      }

      /**
          The defined value of the property. Use valueForKeyInStateWithIdentifier on the cell 
          {@link GDWidgetInstanceCell} to get the instance value.

          @param key {String} the name of the property 
          @param definitionIdentifier {String} the identifier of the definition
          @param stateIdentifier {String} the identifier of the state
      */
      valueForKey(key, definitionIdentifier, stateIdentifier) {
          var ownValue = this.ownValueForKey(key, definitionIdentifier, stateIdentifier);
          if (ownValue !== undefined) {
              return ownValue;
          }
          return this.defaultValueForKey(key);
      }

      /**
       * @returns {GDStyleSheet} the stylesheet for the non-breakpoint-style-rules
       */
      get cssStyleSheet() {
          return this._cssStyleSheet;
      }

      /**
       * @returns {GDStyleSheet} the stylesheet for breakpoint-styles 
       */
      get breakPointStyleSheet() {
          return this._breakPointStyleSheet;
      }

      /**
       * inserts a css rule for the definition with definitionIdentifier in state
       * with stateIdentifier
       * @param {string} definitionIdentifier 
       * @param {string} stateIdentifier 
       */
      insertCSSRule(definitionIdentifier, stateIdentifier) {
          const state = this.project.stateWithIdentifier(stateIdentifier);


          let index = this.cssStyleSheet.rulesLength;
          if (state.type != GDState.GDCustomStateType) {
              const lookNode = this.properties[definitionIdentifier];
              const project = this.project;
              let existingStates = Object.keys(lookNode).map(stateId => 
                  project.stateWithIdentifier(stateId));

              const definition = this.project.definitionWithIdentifier(definitionIdentifier);
              existingStates = existingStates.filter(s => 
                  s == state || this.cssRuleForSelector(s, definition) != undefined);


              if (existingStates.length >  1) {
                  existingStates.sort(GDState.sortFunction);
                  const stateIndex = existingStates.indexOf(state);

                  if (stateIndex == 0) {
                      const  existingState= existingStates[1];
                      const r = this.cssRuleForSelector(existingState, definition);
                      const existingIndex = existingState.cssStyleSheet(this).indexOfSelector(r.selectorText);
                      if (existingIndex != undefined) {
                          index = existingIndex;
                      }
                  } else {
                      const existingState = existingStates[stateIndex-1];
                      const r = this.cssRuleForSelector(existingState, definition);
                      const existingIndex = existingState.cssStyleSheet(this).indexOfSelector(r.selectorText);
                      if (existingIndex != undefined) {
                          index = existingIndex+1;
                      }
                  }
              }
          }

          let identifierDefaultState = stateIdentifier;
          const defaultState = state.defaultState;
          if (defaultState != undefined) {
              identifierDefaultState = defaultState.identifier;
          }
          const selector = cssSelector(definitionIdentifier, identifierDefaultState, this.project);
          const styleSheet = state.cssStyleSheet(this);
          if (index > styleSheet.rulesLength) {
              index = styleSheet.rulesLength;
          }
          const cssRule = styleSheet.insertSelector(selector, index);
          return cssRule;
      }

      /**
       * sets the value for the property for definition in state. This also 
       * updates the CSS. 
       * 
       * Maybe we should use the same thing like in {@link GDWidgetInstanceCell#setValueForKeyInStateWithIdentifier}
       * to only store the value und add a similar method to AntetypeWeb#cellSetProperty which also updates
       * the CSS.
       * 
       * @param {any} value 
       * @param {string} key 
       * @param {string} definitionIdentifier 
       * @param {string} stateIdentifier 
       */
      setValueForKey(value, key, definitionIdentifier, stateIdentifier) {
          var propertiesForDefinition = this.properties[definitionIdentifier];
          if (propertiesForDefinition == undefined) {
              propertiesForDefinition = {};
              this.properties[definitionIdentifier] = propertiesForDefinition;
          }

          var stateProperties = propertiesForDefinition[stateIdentifier];
          if (stateProperties == undefined) {
              stateProperties = {};
              propertiesForDefinition[stateIdentifier] = stateProperties;
          }

          stateProperties[key] = value;
          const definition = this.project.definitionWithIdentifier(definitionIdentifier);
          const state = this.project.stateWithIdentifier(stateIdentifier);
          var cssRule = this.cssRuleForSelector(state, definition);
          if (cssRule === undefined) {
              cssRule = this.insertCSSRule(definitionIdentifier, stateIdentifier);
          }

          var lookAndFeel = this;
          const name = definition.name;
          // FIXME: 
          var adaptor = { valueForKeyInStateWithIdentifier: function(key, state) {
                              return lookAndFeel.valueForKey(key, definitionIdentifier, state);
                          }, ownValueForKeyInStateWithIdentifier: function(key, state) {
                              return lookAndFeel.ownValueForKey(key, definitionIdentifier, state);
                          }, name: name,
                      project: lookAndFeel.project } ;

          Antetype.updateStyleProperty(cssRule.style, adaptor, key, stateIdentifier);
      }

      updateLookNode(definitionIdentifier, lookNode, at) {
          this.properties[definitionIdentifier] = lookNode;
          this.populateCSSForLookNode(lookNode, definitionIdentifier, at);
      }

      addStateLookNode(definitionIdentifier, stateIdentifier, lookNodeData, at) {
          let existingLookNode = this.properties[definitionIdentifier];
          if (existingLookNode == undefined) {
              existingLookNode = {};
              this.properties[definitionIdentifier] = existingLookNode;
          }

          existingLookNode[stateIdentifier] = lookNodeData;

          this.populateCSSForLookNodeInState(existingLookNode, definitionIdentifier, stateIdentifier, at);
      }


      hasLookNodeForDefinition(definitionIdentifier) {
          return this.properties[definitionIdentifier] !== undefined;
      }

      buildDefaultCSS(cssStyleSheet, at) {
          var i = cssStyleSheet.insertRule("cell { }", cssStyleSheet.cssRules.length);
          var rule = cssStyleSheet.cssRules[i];
          var defaultValues = this._defaultValues;
          for (var key in this._defaultValues) {
              // eslint-disable-next-line no-unused-vars
              var adaptor = { valueForKeyInStateWithIdentifier: function(key, state) {
                  return defaultValues[key];
              // eslint-disable-next-line no-unused-vars
              }, ownValueForKeyInStateWithIdentifier: function( key, state) {
                  return defaultValues[key];
              }};

              at.updateStyleProperty(rule.style, adaptor, key, null);
          }
      }

      cssStyleSheetToString(cssStyleSheet) {
          if (cssStyleSheet == undefined) 
              return "";
          return cssStyleSheet.cssText;
      }

      styleSheetsString() {
          return this.cssStyleSheetToString(this.cssStyleSheet) +
              "\n\n/* BreakPoints */\n" +
              this.cssStyleSheetToString(this.breakPointStyleSheet);
      }

      populateCSSForLookNodeInState(lookNode, definitionIdentifier, stateIdentifier, at) {
          const definition = at.project.definitionWithIdentifier(definitionIdentifier);
          const containerDefinition = definition.container;

          const stateProperties = lookNode[stateIdentifier];
          const state = this.project.stateWithIdentifier(stateIdentifier);

          let cssRule = this.cssRuleForSelector(state, definition); 
          if (cssRule == undefined) {
              cssRule = this.insertCSSRule(definitionIdentifier, stateIdentifier);
          } else {
              // Issue #398 make sure existing style properties are removed first: 
              let style = cssRule.style;
              if (style != undefined) {               // not need for @media rules
                  for (let i=style.length; i--;) {
                      let name = style[i];
                      style.removeProperty(name);
                  }
              }
          }

          const lookAndFeel = this;
          
          for (let key in stateProperties) {
              let containerAdaptor = undefined;
              if (containerDefinition) {
                  containerAdaptor = {
                              valueForKeyInStateWithIdentifier: function(key, state) {
                                  return lookAndFeel.valueForKey(key, containerDefinition.identifier, state);
                              }, ownValueForKeyInStateWithIdentifier: function(key, state) {
                                  return lookAndFeel.ownValueForKey(key, containerDefinition.identifier, state);
                              }, container: undefined,
                              activeStateIdentifier: stateIdentifier, name: containerDefinition.name, project: this.project
                  };
              }


              // FIXME: 
              const adaptor = { valueForKeyInStateWithIdentifier: function(key, state) {
                                  return lookAndFeel.valueForKey(key, definitionIdentifier, state);
                              }, ownValueForKeyInStateWithIdentifier: function(key, state) {
                                  return lookAndFeel.ownValueForKey(key, definitionIdentifier, state);
                              }, container: containerAdaptor, name: definition.name, project: this.project } ;

              at.updateStyleProperty(cssRule.style, adaptor, key, stateIdentifier);
          }

          const transition = state.cssTransition;
          if (state._inRunMode()) {
              cssRule.style.transition = transition;
          }

      }

      populateCSSForLookNode(lookNode, definitionIdentifier, at) {
          for (let stateIdentifier in lookNode) {
              this.populateCSSForLookNodeInState(lookNode,definitionIdentifier, stateIdentifier, at);
          }
      }

      addMediaRules() {
          var breakPoints = this.project.designBreakPoints;
          if (breakPoints.length == 0)
              return;

          var styleSheet = this.breakPointStyleSheet;

          breakPoints.forEach(function(breakPoint) {
              breakPoint.insertIntoStyleSheet(styleSheet, styleSheet.rulesLength);
          });
      }

      addColors() {
          this._rootRule = this._cssStyleSheet.insertSelector(":root", this._cssStyleSheet.rulesLength);
          this.colors.forEach( c => c.defineInStyle(this._rootRule.style) );
      }

      updateColor(color, colorValue) {
          color.colorValue = colorValue;
          color.defineInStyle(this._rootRule.style);
      }

      addColor(c) {
          this.colors.push(c);
          c.defineInStyle(this._rootRule.style);
      }

      deleteColor(c) {
          const i = this.colors.indexOf(c);
          if (i == -1)
              return;
          
          this.colors.splice(i,1);

          // do we have to change the object which use this one? 
          // like in AT? 
      }

      colorWithIdentifier(identifier) {
          return this.colors.find( c => c.objectID == identifier);
      }


      /*
       * It is possible to delete a breakpoint, but the states stay in the project. 
       * states referencing deleted breakpoints are added to this (disabled) stylesheet.
       * (See http://gitlab.eszone.ergosign.de/ergosign/ergosign-antetype/issues/117)
       */
      get deletedBreakPointStyleSheet() {
          if (this._styleSheetForDeletedBreakpoints == null) {
              let styleSheetElement = document.createElement("style");
              document.head.appendChild(styleSheetElement);
              let styleSheet = styleSheetElement.sheet;
              styleSheet.disabled = true;
              this._styleSheetForDeletedBreakpoints = new GDStyleSheet(styleSheet);
          }
          return this._styleSheetForDeletedBreakpoints;
      }


      populateCSS(cssStyleSheet, breakPointStyleSheet, at) {
          this._cssStyleSheet = new GDStyleSheet(cssStyleSheet);
          this._breakPointStyleSheet = new GDStyleSheet(breakPointStyleSheet);
          this.addMediaRules();
          this.addColors();

          for (var definitionIdentifier in this.properties) {
              var lookNode = this.properties[definitionIdentifier];
              this.populateCSSForLookNode(lookNode, definitionIdentifier, at);
          }
      }

      connectObjects() {
          let link = document.getElementById("LookAndFeelStyles");


          let styleSheet = link.sheet; 
          let canModifyExistingRules = false;

          try {
              canModifyExistingRules = styleSheet.cssRules != null;
          } catch (e) {
              // Chrome throws while accessing, Issue #146

          }

          // FIXME: looks like Chrome (tested in 80.0.3987.100) does allow
          // iterating the CSS-styles. Since we currently transfer all css
          // in one (l&f, breakpoints, screen, screen breakpoints...) we 
          // add <style> for the various parts. I guess we should use separate
          // styles from the beginning? 
          if (!canModifyExistingRules) {
              // chrome, if loaded locally cannot access the stylesheet-rules via JavaScript. In this case add new
              // stylesheets: 

              const styleSheetElement = document.createElement("style");
              styleSheetElement.id = "LookAndFeelStyles";
              document.head.appendChild(styleSheetElement);
              this._cssStyleSheet = new GDStyleSheet(styleSheetElement.sheet);

              const breakPointStyleSheetElement = document.createElement("style");
              breakPointStyleSheetElement.id = "LookAndFeelBreakpointStyles";
              document.head.appendChild(breakPointStyleSheetElement);
              this._breakPointStyleSheet = new GDStyleSheet(breakPointStyleSheetElement.sheet);

              this.addColors();
              return;
          }
          this._cssStyleSheet = new GDStyleSheet(styleSheet);
          this._cssStyleSheet.fillSelectorMap();

          let linkBreakPoints = document.getElementById("LookAndFeelBreakpointStyles");
          this._breakPointStyleSheet = new GDStyleSheet(linkBreakPoints.sheet);
          this._breakPointStyleSheet.fillSelectorMap();
          this._rootRule = this._cssStyleSheet.existingRuleForSelector(":root");
      }


      cssRuleForSelector(state, definition) {
          let styleSheet = state.cssStyleSheet(this);
          let selector = cssSelector(definition.identifier, state.identifier, this.project);
          return styleSheet.existingRuleForSelector(selector);
      }


      enablePseudoStates() {
          this.cssStyleSheet.enablePseudoStates();
          this.project.designBreakPoints.forEach( b => b.mediaRule.enablePseudoStates() );

          // #267 enable state-animations too:
          this.project.widgets.forEach( w => {
              w.states.forEach( s => {
                  if (s.cssTransition != "") {
                      this.updateStateTransitionToValue(s, s.cssTransition);
                  }
              });
          });

      }

      disablePseudoStates() {
          this.cssStyleSheet.disablePseudoStates();
          this.project.designBreakPoints.forEach( b => b.mediaRule.disablePseudoStates() );

          // #267 disable state animations if switched from in-place presentation-mode
          // in edit mode: 
          this.project.widgets.forEach( w => {
              w.states.forEach( s => {
                  if (s.cssTransition != "") {
                      this.updateStateTransitionToValue(s, "none");
                  }
              });
          });
      }

      deleteState(state) {
          var definitions = state.widget.widgetComponents;
          var styleSheet = state.cssStyleSheet(this);
          for (var i=0; i<definitions.length; i++) {
              var definition = definitions[i];
              var lookNode = this.properties[definition.identifier];
              delete lookNode[state.identifier];
              var cssRule = this.cssRuleForSelector(state, definition);
              var index = styleSheet.indexOfSelector(cssRule.selectorText);
              if (index != undefined) {
                  styleSheet.deleteSelector(cssRule.selectorText);
              }
          }
      }

      updateStateTransition(state) {
          if (!state._inRunMode()) {
              return;
          }
          this.updateStateTransitionToValue(state, state.cssTransition);
      }

      updateStateTransitionToValue(state, cssTransition) {
          const definitions = state.widget.hierarchy.deepOrderedComponents;
          for (let i=0; i<definitions.length; i++) {
              const definition = definitions[i];
              let cssRule = this.cssRuleForSelector(state,  definition);
              if (cssRule != undefined) {
                  cssRule.style.transition = cssTransition;
              }
          }
      }
  }

  GDModelObject.register(GDLookAndFeel);


  /**
      I represent an Antetype Widget. 
  */
  class GDWidget extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);

          this._name = dictionary["name"];
          if (dictionary["hierarchy"]) {
              this._hierarchy = GDModelObject.fromJSONObjectInProject(dictionary["hierarchy"], project);
              this.hierarchy.setWidget(this);
          } else {
              this._hierarchy = null;

          }
          this._states = this.decodeArray(dictionary["states"], project);
          var self = this;
          this.states.forEach(function(s) {s.widget = self; });
          this.type = dictionary["type"];
          this.identifier = dictionary["identifier"];
          Object.seal(this);
      }

      static createInstance(project) {
          let widget = super.createInstance(project);
          let normalState = GDState.createInstance(project);
          normalState._type = GDState.GDNormalStateType;
          widget.addState(normalState);
          widget.type = GDWidget.GDUserWidgetType;
          widget.identifier = Math.floor(Math.random() * 1000);
          return widget;
      }

      /**
          name of this widget
      */
      get name() {
          return this._name;
      }

      /**
          @returns {GDWidgetRootCellDefinition} hierarchy  of the widget cells. 
      */
      get hierarchy() {
          return this._hierarchy;
      }

      /** 
          @returns {GDState[]} the states of this widget. 
      */
      get states() {
          return this._states;
      }


      /**
       * the normal state (always available)
       */
      get normalState() {
          return this.states.find( state => state.type == GDState.GDNormalStateType);
      }

      addState(s) {
          this.states.push(s);
          s.widget = this;
      }

      deleteState(s) {
          this.widgetComponents.forEach( d => {
              d.instances.forEach( i =>  i.deleteCSSForState(s));
              }
          );
          var i = this.states.indexOf(s);
          this.states.splice(i,1);
      }

      /**
          @returns {GDWidgetInstanceRootCell[]} all instances of this widget
      */
      get instances() {
          return this.hierarchy.instances;
      }

      /**
       * For Actions using states, we often need states similar to a given one. 
       * For example siblings of a cell might return widget instances of different
       * widgets, to change all to a state named 'foo' you can ask the widget if 
       * it contains such a state
       * @param {GDState} state 
       * @returns {GDState|undefined} the corresponding state
       */
      stateMatchingState(state) {
          if (state.widget === this)
              return state;

          return this.states.find((s) => s.name === state.name && s.type === state.type);
      }

      get widgetComponents() {
          return this.hierarchy.deepOrderedComponentsSelect( d => !d.isEmbeddedDefinition );
      }

      createInstance() {
          let instance = this.hierarchy.buildInstance();
          instance.activeState = this.normalState;
          return instance;
      }
  }
  GDWidget.GDUserWidgetType = 0;          // a user defined widget 
  GDWidget.GDNormalCellWidgetType = 1;    // a special widget used internally (basic cell) 
  GDWidget.GDScreenWidgetType = 2;        // used for the screen
  GDWidget.GDStandardWidgetType = 3;      // a widget delivered by antetype (currently only for pre-web-preview files)


  GDModelObject.register(GDWidget);


  /**
      Defines a cell inside a widget. Each widget {@link GDWidget} has a hierarchy 
      of its cells. 
  */
  class GDWidgetCellDefinition extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this._identifier = dictionary["identifier"];
          this._name = dictionary["name"];
          this.individualContent = dictionary["individualContent"];
          this.orderedComponents = [];
          this.container = null;
          if (dictionary["orderedComponents"]) {
              for (var i=0; i<dictionary["orderedComponents"].length; i++) {
                  var childJSON = dictionary["orderedComponents"][i];
                  var child = GDModelObject.fromJSONObjectInProject(childJSON, project);
                  child.container = this;
                  this.orderedComponents.push(child);
              }
          }
          this._instances = [];
          project.registerDefinition(this);
      }

      static createInstance(project) {
          let d = super.createInstance(project);
          d._identifier =  "d" + Math.floor(Math.random() * 1000);
          return d;
      }

      /**
          the name of this cell definition. 
      */
      get name() {
          return this._name;
      }

      /** 
          the identifier (String) of this cell. 
      */
      get identifier() {
          return this._identifier;
      }

      rootNode() {
          return this.container.rootNode();
      }

      addComponentsToArray(a, callback) {
          if (!callback(this))
              return;
          a.push(this);
          for (var i=0; i<this.orderedComponents.length; i++) {
              var child = this.orderedComponents[i];
              child.addComponentsToArray(a, callback);
          }
      }

      deepOrderedComponentsSelect(callback) {
          var result = [];
          this.addComponentsToArray(result, callback);
          return result;
      }

      get deepOrderedComponents() {
          var result = [];
          this.addComponentsToArray(result, () => true);
          return result;
      }

      get isEmbeddedDefinition() {
          return false;
      }

      get instances() {
          return this._instances;
      }

      addInstance(i) {
          this._instances.push(i);
      }

      removeInstance(i) {
          var index = this._instances.indexOf(i);
          if (index !== -1) {
              this._instances.splice(index,1);
          }
      }

      emptyInstanceCell() {
          return GDWidgetInstanceCell.createInstance(this._project);

      }

      buildInstanceCell() {
          const cell = this.emptyInstanceCell();
          cell._definition = this;
          cell._name = this.name;
          cell._definitionIdentifier = this.identifier;
          return cell;
      }

      buildInstance() {
          const cell = this.buildInstanceCell();
          this.orderedComponents.forEach( c => {
              const childInstanceCell = c.buildInstance();
              cell.addComponent(childInstanceCell);
          });

          return cell;
      }

      addComponent(d) {
          this.orderedComponents.push(d);
      }
  } 
  GDModelObject.register(GDWidgetCellDefinition);

  /**
      Defines the top-level cell of a widget. 

      See {@link GDWidget} and {@link GDWidgetInstanceRootCell} for the corresponding 
      object on instance side. 
  */
  class GDWidgetRootCellDefinition extends GDWidgetCellDefinition {
      constructor(dictionary, project) {
          super(dictionary, project);
          this._widget = null;
      }

      rootNode() {
          return this;
      }

      setWidget(w) {
          this._widget = w;
      }

      get widget() {
          return this._widget;
      }

      emptyInstanceCell() {
          return GDWidgetInstanceRootCell.createInstance(this._project);
      }
  }
  GDModelObject.register(GDWidgetRootCellDefinition);

  class GDEmbeddedWidgetDefinition extends GDWidgetCellDefinition {
      get isEmbeddedDefinition() {
          return true;
      }
  }
  GDModelObject.register(GDEmbeddedWidgetDefinition);


  class GDScreenDefinition extends GDWidgetRootCellDefinition {
      emptyInstanceCell() {
          return GDScreen.createInstance(this._project);
      }

  }
  GDModelObject.register(GDScreenDefinition);

  /**
   * handles an event of its eventType. Contains ActionSets for the actions. 
   */
  class GDEventHandler extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.eventType = dictionary["eventType"];
          this.orderedActionSets = [];
          var actionSets = dictionary["orderedActionSets"] || [];
          this._parameter = dictionary["parameter"];
          for (var i=0; i<actionSets.length; i++) {
              var d = actionSets[i];
              var actionSet = GDModelObject.fromJSONObjectInProject(d, project);
              this.addActionSet(actionSet);
          }
          this.intervalID = null;
          this._eventListeners = [];
          this._observedDOMElements = [];
          this._runTool = null;
      }

      /**
       * starts the ActionSet at the given index
       * @param {int} index 
       * @param {Event} e 
       */
      startExecutingActionSetAtIndex(index,e) {
          let lastActionSet = null;
          let startImmediately = [];
          for (let i=index; i<this.orderedActionSets.length; i++) {
              const actionSet = this.orderedActionSets[i];
              if (lastActionSet == null || !actionSet.afterPrevious) {
                  startImmediately.push(actionSet);
              }
              
              if (lastActionSet != null && actionSet.afterPrevious) {
                  lastActionSet.whenFinishedExecuteActionSet(actionSet);
                  break;
              }
              lastActionSet = actionSet;
          }

          startImmediately.forEach( a => a.execute(e) );
      }

      executeActionSet(actionSet, e) {
          const i = this.orderedActionSets.indexOf(actionSet);
          if (i != -1) {
              this.startExecutingActionSetAtIndex(i,e);
          }
      }

      addActionSet(actionSet) {
          actionSet.eventHandler = this;
          this.orderedActionSets.push(actionSet);
      }

      execute(e) {
          this.startExecutingActionSetAtIndex(0,e); 
      }

      get parameter() {
          return this._parameter;
      }

      get intervalID() {
          return this._intervalID
      }

      set intervalID(intervalID) {
          this._intervalID = intervalID;
      }

      get hasActions() {
          if (this.orderedActionSets.length == 0)
              return false;

          return this.orderedActionSets.some((actionSet) => actionSet.orderedActions.length > 0);
      }

      removeOldListeners() {
          this._eventListeners.forEach(e => e.target.removeEventListener(e.type, e.fn) );
          this._eventListeners = [];


          this._observedDOMElements.forEach( c  => this._runTool.unobserveIntersection(c, this) );
          this._observedDOMElements = [];
      }

      startRepeat() {
          // #397 don't start repeat if it is already running:
          if (this.intervalID == null) {
              this.execute(); // #425 execute immediately 
              this.intervalID = window.setInterval(() => this.execute(), this.parameter*1000);
          }
      }

      cleanup() {
          this.stopRepeat();
          this.orderedActionSets.forEach( a => a.cleanup() );
      }

      stopRepeat() {
          window.clearInterval(this.intervalID); 
          this.intervalID = null;
      }

      toggleRepeat() {
          if (this.intervalID) {
              this.stopRepeat();
          } else {
              this.startRepeat();
          }
      }

      /**
       * adds an event-listener for the given type. Automatically calls the right
       * event-handler
       * 
       * @param {AntetypeWeb} at antetype
       * @param {HTMLElement} DOMElement 
       * @param {String} type the event type
       */
      addEventListener(at, DOMElement, type) {
          const fn = e => at.currentTool.executeEventHandler(this,e);
          DOMElement.addEventListener(type, fn);
          this._eventListeners.push({"type": type, "target": DOMElement, "fn": fn});
      }

      /**
          events which are not bubbling up are handled here. see {@link AntetypeWeb#addEventListeners}
          for the other events

          @param {AntetypeWeb} at 
          @param {GDWidgetInstanceCell} cell
      */
      updateEventListeners(at, cell) {
          if (cell.DOMElement === undefined) {
              return;
          }

          this.removeOldListeners();

          if (this.eventType === GDMouseEnterEventType) {
              this.addEventListener(at, cell.DOMElement, "mouseenter");
          }

          if (this.eventType === GDMouseLeaveEventType) {
              this.addEventListener(at, cell.DOMElement, "mouseleave");
          }

          if (this.eventType === GDFocusEventType) {
              this.addEventListener(at, cell.DOMElement, "focusin");
          }

          if (this.eventType === GDFocusOutEventType) {
              this.addEventListener(at, cell.DOMElement, "focusout");
          }

          if (this.eventType === GDScrollEventType) {
              let target = cell.DOMElement;

              if (cell.isScreen) {        // need to handle scroll-events differently for the screen
                  target = window;
              }
              if (this.parameter) {
                  // if parameter is set it contains a dictionary with the
                  // comparison. We only execute the actionSets if the condition
                  // is met
                  const axis = this.parameter["axis"];
                  const comparator = this.parameter["comparator"];
                  const value = this.parameter["value"];

                  const fn = e => {
                      let target = e.target;
                      if (cell.isScreen) {        // see below, we body does not use the normal scrolling
                          target = e.target.scrollingElement;
                      }
                      const actualValue = axis == "scrollLeft" ? target.scrollLeft : target.scrollTop;
                      let shouldExecute = false;
                      switch (comparator) {
                          case "<": shouldExecute = actualValue < value; break;
                          case "=": shouldExecute = actualValue == value; break;
                          case ">": shouldExecute = actualValue > value; break;
                      }
                      
                      if (shouldExecute) {
                          at.currentTool.executeEventHandler(this,e);
                      }
                  };
                  target.addEventListener("scroll", fn);
                  this._eventListeners.push({"type": "scroll", "target": target, "fn": fn});
              } else {
                  this.addEventListener(at, target, "scroll");
              }
          }

          if (this.eventType == GDDidBecomeVisibleEventType
              || this.eventType == GDDidBecomeInvisibleEventType) {
              
              const callback = entry => {
                  if (entry.isIntersecting 
                          && this.eventType == GDDidBecomeVisibleEventType) {
                          at.currentTool.executeEventHandler(this,{});
                  } else if (!entry.isIntersecting && this.eventType == GDDidBecomeInvisibleEventType) {
                      at.currentTool.executeEventHandler(this,{});
                  }

              };
              if (this._runTool == null) {
                  this._runTool = at.runTool;
              }
              this._runTool.observeIntersection(cell.DOMElement, this, callback);
              this._observedDOMElements.push(cell.DOMElement);
          } 
          
      }

  }
  GDModelObject.register(GDEventHandler);



  /**
      an ActionSet (currently called Action group in the GUI). Knows its targetCells
      and its Actions
  */
  class GDActionSet extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.orderedActions = [];
          var actions = dictionary["orderedActions"] || [];
          for (let i=0; i<actions.length; i++) {
              var a = actions[i];
              var action = GDModelObject.fromJSONObjectInProject(a, project);
              this.addAction(action);
          }

          this.orderedElementIDs = [];
          var elementIDsJSON = dictionary["orderedElements"] || [];
          for (let i=0; i<elementIDsJSON.length; i++) {
              var elementID = elementIDsJSON[i];
              this.orderedElementIDs.push(elementID);
          }

          this._timeoutIDs = new Set();

          this.afterPrevious = dictionary["afterPrevious"];

          this._finishedActions = 0;
          this._nextActionSet = null;
          this.eventHandler = null;
      }


      cleanup() {
          for (let timeoutID of this._timeoutIDs) {
              window.clearTimeout(timeoutID);
          }
          this._timeoutIDs = new Set();
          this.orderedActions.forEach( a => a.cleanup() );
      }

      executeAction(a,e) {
          const i = this.orderedActions.indexOf(a);
          if (i != -1) {
              this.startExecutingActionAtIndex(i,e);
          }
      }

      addAction(action) {
          this.orderedActions.push(action);
          action.actionSet = this;
      }

      /**
          need to be called after finishing an action. Needed to start the next action-set 
          if "start after previous" is used. 

          @param {GDAction} a the action
          @param {Event} e the DOM-Event
      */
      actionFinished(a,e) {
          this._finishedActions++; 
          if (this._finishedActions == this.orderedActions.length) {
              if (this._nextActionSet) {
                  this.eventHandler.executeActionSet(this._nextActionSet, e);
              }
          }
      }

      whenFinishedExecuteActionSet(actionSet) {
          this._nextActionSet = actionSet;
      }

      /**
          starts the action at index start. Continues executing the actions, until 
          a action with afterPrevious is encountered

          @param {int} start the start-index
          @param {Event} e the DOM-Event
      */
      startExecutingActionAtIndex(start,e) {
          let lastAction = null;
          let startActionsImmediately = [];
          for (let i=start; i<this.orderedActions.length; i++) {
              const a = this.orderedActions[i];
              if (lastAction == null || !a.afterPrevious) {
                  if (a.delay == 0 || (a.animate && !a.needsTimeoutForDelay)) {
                      // for actions with animation we use animation-delay (or transition-delay),
                      // of if no delay is set start immediately
                      startActionsImmediately.push(a);
                  } else if (a.delay > 0) { 
                      // if a delay without animation is used we use a time-out

                      const timeoutID = window.setTimeout((action) => {
                          action.execute(e);
                      }, a.delay*1000, a); 
                      this._timeoutIDs.add(timeoutID); 
                  }
                 
              }

              if (a.afterPrevious && lastAction != null) {
                  lastAction.whenFinishedPlay(a);
                  break;
              }

              lastAction = a;
          }
          startActionsImmediately.forEach( a => a.execute(e) );
      }

      /**
          called with e = event. Executes all actions in this set. If an action has a delay
          the timeoutID is stored in _timeoutIDs to cancel the action if the screen is changed
          beforehand. (#81)

          @param {Event} e
      */
      execute(e) {
          this._finishedActions = 0;
          this.startExecutingActionAtIndex(0,e);
      }

      orderedElements() {
          var result = [];
          for (var i=0; i<this.orderedElementIDs.length; i++) {
              var nextID = this.orderedElementIDs[i];
              var domElement = document.getElementById(nextID);
              if (domElement && domElement.figure) {
                  result.push(domElement.figure);
              }
          }
          return result;
      }

  }
  GDModelObject.register(GDActionSet);


  const GDActionSpecifierThisElement_Code = 0,
      GDActionSpecifierAllWidgetsOfSameType_Code = 1,
      GDActionSpecifierChildrenOfThisElement_Code = 2,
      GDActionSpecifierChildrenFromSameWidget_Code = 3,
      GDActionSpecifierSiblingsOfThisElement_Code = 4,
      GDActionSpecifierSiblingsWithSameWidgetType_Code = 5,
      GDActionSpecifierAllChildren_Code = 6,
      GDActionSpecifierParent_Code = 7,
      GDActionSpecifierAllParents_Code = 8;












  /**
   * a Action, superclass of all actions. 
   */
  class GDAction extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.specifier = dictionary["specifier"];
          this.animationDuration = dictionary["animationDuration"] || 0;
          this.animationCurve = dictionary["animationCurve"] || 0 ;
          this.delay = dictionary["delay"] || 0;
          this.animate = dictionary["animate"] || false;
          this.afterPrevious = dictionary["afterPrevious"];
          this.actionSet = null;
          this._nextAction = null;
          this._nextActionTimeout = null;
      }

      /**
       * @returns {String} the CSS transition string for its duration, curve and delay
       */
      cssTransition() {
          if (!this.animate)
              return "";
          return GDCSSTransition(this.animationDuration, this.animationCurve, this.delay);
      }

      cleanup() {
          if (this._nextActionTimeout != null) {
              window.clearTimeout(this._nextActionTimeout);
              this._nextActionTimeout = null;
          }

      }

      /**
       * normally we use animation-delay (or transition-delay) for animation with
       * delay, or a timeOut if no animation is set. If the action insists on having a
       * delay return true and we use a timeOut. (Currently only used for GDGotoScreenAction, 
       * maybe we find a better way..)
       */ 
      get needsTimeoutForDelay() {
          return false;
      }

      /*
       * this method is called to execute the action. 
       *
       * @param {Event} e  normally DOM-event or an empty object for our "pseudo"-events
       */
      // eslint-disable-next-line no-unused-vars
      execute(e) {
          console.log("Missing execute for " + this);
      }

      /**
       * target-Figures for this action. Uses specifier and its ActionSet to compute. 
       *
       * @return {Array<GDWidgetInstanceCell>} the target cells (Antetype-cells)
       */
      get targetFigures() {
          function targetsForElements(code, elements) {
              function widgetForElements(elements) {
                  var widgets = new Set();
                  for (var i=0;i<elements.length; i++) {
                      var element = elements[i];
                      widgets.add(element.widget);
                  }

                  return widgets;
              }


              switch (code) {
                  case GDActionSpecifierThisElement_Code: return elements; 
                  case GDActionSpecifierChildrenOfThisElement_Code: {
                      let r = [];
                      for (let i=0; i<elements.length; i++) {
                          let e = elements[i];
                          r = r.concat(e.orderedComponents);
                      }
                      return r; 
                  }
                  case GDActionSpecifierSiblingsOfThisElement_Code: {
                      let r = [];
                      for (let i=0; i<elements.length; i++) {
                          let e = elements[i];
                          r = r.concat(e.siblings);
                      }
                      return r; 
                  }
                  case GDActionSpecifierParent_Code: {
                      let r = [];
                      for (let i=0; i<elements.length; i++) {
                          let e = elements[i];
                          r = r.concat(e.container);
                      }
                      return r; 
                  }

                  case GDActionSpecifierAllWidgetsOfSameType_Code: {
                          const widgets = widgetForElements(elements);
                          if (elements.length == 0) {
                              return [];
                          }
                          const screen = elements[0].screen;
                          return screen.deepOrderedComponents.filter( c => c.isRootInstanceCell && widgets.has(c.widget) );
                      }

                  case GDActionSpecifierChildrenFromSameWidget_Code: {
                      let r = [];
                      for (let i=0; i<elements.length; i++) {
                          const e = elements[i];
                          const widget = e.widget;
                          
                          r = r.concat(e.orderedComponents.filter(function(child) { return child.widget == widget; }));
                      }
                      return r; 
                  }
                  case GDActionSpecifierSiblingsWithSameWidgetType_Code: {
                      let r = [];
                      for (let i=0; i<elements.length; i++) {
                          const e = elements[i];
                          const widget = e.widget;
                          r = r.concat(e.siblings.filter(function(child) { return child.widget == widget; }));
                      }
                      return r;
                  }
                  case GDActionSpecifierAllChildren_Code: {
                      let r = [];
                      for (let i=0; i<elements.length; i++) {
                          const e = elements[i];
                          
                          const allCells = e.deepOrderedComponents;
                          if (allCells.length > 0) {
                              allCells.splice(0,1);  // deepOrderedComponents contains the object itself ...
                              r = r.concat(allCells);
                          }
                      }

                      return r; 
                  }
                  case GDActionSpecifierAllParents_Code: {
                      let r = [];
                      elements.forEach(e => r = r.concat(e.parents));
                      return r;
                  }
                  default: 
                      console.log("missing targetForElement, specifier: " + code);
              }
              return [];
          }

          return targetsForElements(this.specifier, this.actionSet.orderedElements());
      }

      whenFinishedPlay(a) {
          this._nextAction = a;
      }


      actionFinished(e) {
          this.actionSet.actionFinished(this,e);
          if (this._nextAction) {
              this.actionSet.executeAction(this._nextAction, e);
          }
      }

      

      /**
       *  called after executing the action. If the action uses animation a
       *  timeout is added to call the next action after the animation time. 
       *  see handleNextActionOnEvent to use an event-listener (tranisitonend or
       *  animationend). 
       *
       * @param {Event} e the browser event
       */
      handleNextActionWithTimeout(e) {
          if (this.animate && this.animationDuration > 0) {

              if (this.targetFigures.length > 0) {
                  const firstTargetFigure = this.targetFigures[0];
                  if (firstTargetFigure.DOMElement) {
                      // #662 transitionend is called multiple times for state-change-actions
                      // executing the next action too early. For now using a timeout, other
                      // possibility would be to listen to transitionstart and -end and look
                      // at propertyName until all transitions started are finished. 
                          this._nextActionTimeout = window.setTimeout(() => {
                              this._nextActionTimeout = null;
                              this.actionFinished(e);
                          }, this.animationDuration*1000);
                  }
              }
          } else {
              this.actionFinished(e);
          }
      }

      /**
       * add an event-listener on the eventType, after the event happend execute the
       * next actions. 
       *
       * @param {String} eventType ('transitionend', 'animationend' ...)
       * @param {Event} e the browser event
       */
      handleNextActionOnEvent(eventType, e) {
          if (this.animate && this.animationDuration > 0) {

              if (this.targetFigures.length > 0) {
                  const firstTargetFigure = this.targetFigures[0];
                  if (firstTargetFigure.DOMElement) {
                      const handleAnimationEnd = () => {
                              firstTargetFigure.DOMElement.removeEventListener(eventType, handleAnimationEnd);
                              this.actionFinished(e);
                      }; 
                      firstTargetFigure.DOMElement.addEventListener(eventType, handleAnimationEnd);
                  }
              }
          } else {
              this.actionFinished(e);
          }
      }
  }
  GDModelObject.register(GDAction);



  /**
   * Actiom which toggles between two states
   */
  class GDToggleStateAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.firstStateIdentifier = dictionary["firstState"];
          this.secondStateIdentifier = dictionary["secondState"];
      }

      execute(e) {
          this.targetFigures.forEach((target) => {
              let nextStateIdentifier = this.secondStateIdentifier;
              let nextState = this._project.stateWithIdentifier(nextStateIdentifier);
              let nextStateOfTarget = target.widget.stateMatchingState(nextState);

              if (target.activeState == nextStateOfTarget) {
                  nextState = this._project.stateWithIdentifier(this.firstStateIdentifier);
                  nextStateOfTarget = target.widget.stateMatchingState(nextState);
              }

              if (nextStateOfTarget) {
                  Antetype.changeStateOfCell(target, nextStateOfTarget, this.cssTransition());
              }
          });
          this.handleNextActionWithTimeout(e);
      }

      get needsTimeoutForDelay() {
          return true;
      }
  }
  GDModelObject.register(GDToggleStateAction);


  /**
   * Changes the proeprty "key" to the value "value" (honors animation, if set)
   */
  class GDPropertyChangeAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.key = dictionary["key"];
          this.value = dictionary["value"];
      }


      execute(e) {
          this.targetFigures.forEach( (figure) => {
              figure.DOMElement.style.transition = this.cssTransition();
              
              Antetype.cellSetProperty(figure, this.key, this.value);

          });
          this.handleNextActionOnEvent("transitionend",e);
      }

      // #583 in bread&butter this does not work with transion-delay. But should? 
      get needsTimeoutForDelay() {
          return true;
      }
  }

  GDModelObject.register(GDPropertyChangeAction);


  /**
   * Changes to another state
   */
  class GDChangeStateAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project); 
          this.stateIdentifier = dictionary["state"];
      }

      execute(e) {
          const state = this._project.stateWithIdentifier(this.stateIdentifier);
          this.targetFigures.forEach((target) => {
              const targetState = target.widget.stateMatchingState(state);
              if (targetState) {
                  Antetype.changeStateOfCell(target, targetState, this.cssTransition());
              }
          });
          this.handleNextActionWithTimeout(e);
      }

      get needsTimeoutForDelay() {
          return true;
      }
  }
  GDModelObject.register(GDChangeStateAction);

  /**
   * hides its targetCells
   */
  class GDHideAction extends GDAction {
      execute(e) {
          this.targetFigures.forEach( (figure) => {
              figure.DOMElement.style.display = "none";
          });
          this.actionFinished(e);
      }
      
      get needsTimeoutForDelay() {
          return true;
      }
  }
  GDModelObject.register(GDHideAction);

  /**
   * shows the targetCells
   */
  class GDShowAction extends GDAction {
      execute(e) {
          this.targetFigures.forEach( (figure) => {
              figure.DOMElement.style.display = "flex";
          });
          this.actionFinished(e);
      }

      get needsTimeoutForDelay() {
          return true;
      }
  }
  GDModelObject.register(GDShowAction);

  /**
   * go to the given screen. 
   */
  class GDGotoScreenAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.screenID = dictionary["screenID"];
          this.transition = dictionary["transition"];
      }

      get needsTimeoutForDelay() {
          return true;
      }

      execute(e) {
          const inViewer = Antetype.project.orderedScreens.length > 0;

          if (inViewer) {
              const screen = Antetype.project.orderedScreens.find( s => s.objectID == this.screenID);
              if (this.animate) {
                  Antetype.gotoScreenWithTransition(screen, this.transition, this.animationDuration);
              } else {
                  Antetype.gotoScreen(screen);
              }
          } else {
              if (this.animate) {
                  Antetype.send(`executeGotoScreenAction/${this.screenID}/${this.transition}/${this.animationDuration}`);
              } else {
                  Antetype.gotoScreenWithIDEditMode(this.screenID);
              }
          }
          this.actionFinished(e);
      }
  }
  GDModelObject.register(GDGotoScreenAction);
  GDGotoScreenAction.GDScreenTransitionFade = 1;
  GDGotoScreenAction.GDScreenTransitionFadeOut = 2;
  GDGotoScreenAction.GDScreenTransitionScale = 8;
  GDGotoScreenAction.GDScreenTransitionScaleOut = 9;
  GDGotoScreenAction.GDScreenTransitionPushToLeft = 10;
  GDGotoScreenAction.GDScreenTransitionPushToRight = 11;
  GDGotoScreenAction.GDScreenTransitionPushToBottom = 12;
  GDGotoScreenAction.GDScreenTransitionPushToTop = 13;
  GDGotoScreenAction.GDScreenTransitionMoveFromLeft = 20;
  GDGotoScreenAction.GDScreenTransitionMoveFromRight = 21;
  GDGotoScreenAction.GDScreenTransitionMoveFromBottom = 22;
  GDGotoScreenAction.GDScreenTransitionMoveFromTop = 23;
  GDGotoScreenAction.GDScreenTransitionMoveToLeft= 30;
  GDGotoScreenAction.GDScreenTransitionMoveToRight = 31;
  GDGotoScreenAction.GDScreenTransitionMoveToBottom = 32;
  GDGotoScreenAction.GDScreenTransitionMoveToTop = 33;



  /**
      a script action. Executes the source. We build a function with four
      parameters: at (Antetype), targetCells, event and the action itself
      and call it.
  */
  class GDScriptAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.type = dictionary["type"];
          this.source = dictionary["source"];
      }

      execute(e) {
          if (this.type != "JavaScript")
              return;

          const fn = new Function(`let at = arguments[0];let targetCells=arguments[1];let event=arguments[2]; let action=arguments[3];\n${this.source}`); 
                  
          let targetCells = this.targetFigures;

          const globalBoundsMissing = window.globalBoundsOfElement == undefined;
          // workaround for https://discourse.ergosign.de/t/resize-script-broken-dev-only/232
          // add globalBoundsOfElement to global object;
          //
          // Not sure what to do. Leave it, or use something like import * from 'utils.js' as ATUtil ...

          if (globalBoundsMissing) {
              window.globalBoundsOfElement = globalBoundsOfElement;
          }

          try {
              fn(Antetype,targetCells,e, this);
          } catch (e) {
              console.log("Exception in script-action: " + e);
          }

          
          this.actionFinished(e);
      }
  }
  GDModelObject.register(GDScriptAction);

  /**
      start/stop/repeat idle-actions
  */
  class GDPlayerAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.action = dictionary["action"];
      }

      execute(e) {
          let eventHandlers = [];
          this.targetFigures.forEach(f => {
              const idleActions = f.eventHandlers[GDIdleEventType];
              if (idleActions) {
                  eventHandlers.push(idleActions);
              }
          });

          const at = Antetype; 

          switch(this.action) {
              case GDPlayerAction.GDStartPlayerAction: 
                  at.currentTool.startEventHandlers(eventHandlers);
                  break;

              case GDPlayerAction.GDStopPlayerAction:
                  at.currentTool.stopEventHandlers(eventHandlers);

                  break;

              case GDPlayerAction.GDTogglePlayerAction:
                  at.currentTool.toggleEventHandlers(eventHandlers);
                  break;
          }
          this.actionFinished(e);

      }

  }

  GDPlayerAction.GDStartPlayerAction = 0;
  GDPlayerAction.GDStopPlayerAction = 1;
  GDPlayerAction.GDTogglePlayerAction = 2;
  GDPlayerAction.GDRewindPlayerAction = 3;

  GDModelObject.register(GDPlayerAction);


  /**
      starts a animate.css-animation. Needs animate.css
  */
  class GDEffectAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.effectName= dictionary["effectName"];
          this.iterationCount = dictionary["iterationCount"];
      }

      execute(e) {
          this.targetFigures.forEach( f=> {
              let domElement = f.DOMElement;
              let originalClass = cssClassNameForCell(f, this._project); 

              if (this.delay) {
                  domElement.style.animationDelay = this.delay + "s";
              } else {
                  domElement.style.animationDelay = "unset";
              }
              domElement.style.animationDuration = this.animationDuration + "s";
              domElement.style.animationIterationCount = this.iterationCount < 0 ? "infinite" : this.iterationCount;

          domElement.className = originalClass + " "+ this.effectName+ " animated";
          });
          this.handleNextActionOnEvent("animationend", e);
      }

      actionFinished(e) {
          // #585 effect only works once vs. cell is visible after …Out…-Effect
          // leave the classname for Out/In-effects, but remove it for others
          // to allow the effect more than once. 
          //
          // see animate.css-names
          if (this.effectName.indexOf("Out") == -1 && this.effectName.indexOf("In") == -1) {
              this.targetFigures.forEach( f=> {
                  let originalClass = cssClassNameForCell(f, this._project); 
                  f.DOMElement.className = originalClass;
              });
          }
              
          // in case another effect action follows, start next action after changing
          // CSS.
          super.actionFinished(e);
      }

  }
  GDModelObject.register(GDEffectAction);


  /**
      move in other element
  */
  class GDMoveInOtherElementAction extends GDAction {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.moveTarget = dictionary["moveTarget"];
      }


      moveTo(cell, target, duration) {
          let cellDOMElement = cell.DOMElement;
          let targetDOMElement = target.DOMElement;

          let startRect = cellDOMElement.getBoundingClientRect();
          let targetRect = targetDOMElement.getBoundingClientRect();

          let copiedCell = cellDOMElement.cloneNode(true);
          cellDOMElement.style.visibility = "hidden";
          copiedCell.style.position = "absolute";
          copiedCell.style.top = startRect.top + "px";
          copiedCell.style.left = startRect.left + "px";
          document.body.appendChild(copiedCell);

          let start = performance.now();

          function timing(timeFraction) {
              return timeFraction;
          }

          let deltaX = targetRect.left - startRect.left;
          let deltaY = targetRect.top - startRect.top;

          function draw(progress) {
              copiedCell.style.left= startRect.left + deltaX*progress + "px";
              copiedCell.style.top= startRect.top + deltaY*progress + "px";
          }

          function animate(time) {
                // timeFraction goes from 0 to 1
              let timeFraction = (time - start) / duration;
              if (timeFraction > 1) timeFraction = 1;

              // calculate the current animation state
              let progress = timing(timeFraction);

              draw(progress); // draw it

              if (timeFraction < 1) {
                  requestAnimationFrame(animate);
              } else {
                  targetDOMElement.appendChild(copiedCell);
                  copiedCell.style.position = "flex";
                  copiedCell.style.top = "unset";
                  copiedCell.style.left ="unset";

              }
          }

          window.requestAnimationFrame( animate ); 
      }

      // eslint-disable-next-line no-unused-vars
      execute(e) {
          let target = document.getElementById(this.moveTarget).figure;
          if (target == undefined) {
              return;
          }

          this.targetFigures.forEach(f => this.moveTo(f, target, this.animationDuration*1000));
      }
  }
  GDModelObject.register(GDMoveInOtherElementAction);

  /**
   * a color
   * @extends {GDModelObject}
   */
  class GDUIColor extends GDModelObject {
      constructor(dictionary, project) {
          super(dictionary, project);
          this.name = dictionary["name"];
          this.identifier = dictionary["identifier"];
          this.colorValue = CPColor.fromJSON(dictionary["colorValue"]);
      }

      /**
       * @returns {string} the name of the corresponding css-variable
       */
      get variableName() {
          if (this.identifier == "DefaultColorIdentifier") 
              return this.identifier;

          return this.objectID;
      }

      /**
       * defined a css-variable with my value
       * @param {CSSStyleDeclaration} style 
       */
      defineInStyle(style) {
          style.setProperty(`--${this.variableName}`, this.colorValue.toString());
      }

      /**
       * @returns {string} a css-variable reference 
       */
      get referenceValue() {
          return `var(--${this.variableName})`;
      }

      rgbStringWithAlpha(alpha) {
          return this.colorValue.rgbStringWithAlpha(alpha);
      }

      /**
       * @returns {boolean} true if overwritten
       */
      get isOverwritten() {
          return false;
      }
  }
  GDModelObject.register(GDUIColor);

  /**
   * a overwritten color
   * @extends {GDUIColor}
   */
  class GDOverwrittenUIColor extends GDUIColor {
      get isOverwritten() {
          return true;
      }
  }
  GDModelObject.register(GDOverwrittenUIColor);




  class GDDataBinding extends GDModelObject {

  }
  GDModelObject.register(GDDataBinding);




  /* non-antetype objects: */



  function CPColor(d) {
      var rgbaString = d["NSColorValue"];
      var rgba = rgbaString.split(",");
      this.red = rgba[0];
      this.green = rgba[1];
      this.blue = rgba[2];
      this.alpha = rgba[3];
      Object.freeze(this);    // #312 don'T change colors. 
  }

  CPColor.cachedColors = new WeakMap();
  CPColor.fromJSON = function(v) {
      if (CPColor.cachedColors.has(v)) {
          return CPColor.cachedColors.get(v);
      }

      var c = new CPColor(v);
      CPColor.cachedColors.set(c, v);
      return c;
  };



  CPColor.prototype.hexString = function() {
      function colorPart(n) {
          var s = Number(Math.round(n*255)).toString(16);
          if (s.length == 1)
              s = "0" + s;

          return s;
      }
      var result = "#" + colorPart(this.red) + colorPart(this.green) + colorPart(this.blue);

      return result;
  };

  CPColor.prototype.rgbaString = function() {
      return "rgba(" + Math.round(this.red*255) + "," + Math.round(this.green*255) + "," + Math.round(this.blue*255) + "," + this.alpha + ")";
  };

  CPColor.prototype.rgbStringWithAlpha = function(alpha) {
      return "rgba(" + Math.round(this.red*255) + "," + Math.round(this.green*255) + "," + Math.round(this.blue*255) + "," + alpha + ")";
  };



  CPColor.prototype.toString= function() {
      if (this.alpha == 1.0)
          return this.hexString();

      return this.rgbaString();
  };

  var whiteColor = new CPColor({NSColorValue: "1,1,1,1"});
  var blackColor = new CPColor({NSColorValue: "0,0,0,1"});
  CPColor.whiteColor = function() { return whiteColor; };
  CPColor.blackColor = function() { return blackColor; };




  function CTGradient(jsonDict) {
      var gradientDict = jsonDict["CTGradient"];
      var count = gradientDict["count"];
      this.colorStops = [];
      var i=0;
      while (i<count*5) {
          var stop = {r:gradientDict.colorStops[i++], g:gradientDict.colorStops[i++], b:gradientDict.colorStops[i++], a:gradientDict.colorStops[i++], p:gradientDict.colorStops[i++]};
          this.colorStops.push(stop);
      }
  }

  CTGradient.unifiedDarkGradient = function() {
      var json = {"CTGradient" :     {
          "colorStops":         [
              "0.68",
              "0.68",
              "0.68",
              1,
              0,
              "0.83",
              "0.83",
              "0.83",
              1,
              1
          ],
          "count": 2
          }
      };

      return new CTGradient(json);
  };



  function GDFont(json) {
      this.familyName = json["familyName"];
      this.displayName= json["displayName"] || "Helvetica";
      this.fontName = json["fontName"]; 
      this.isBold = json["isBold"] || false;
      this.isItalic = json["isItalic"] || false;
      this.fallback = json["fallback"] || "";
      this.size = json["size"];
      this.fontCSS = json["fontCSS"];
  }


  GDFont.cache = new WeakMap();
  GDFont.fromJSON = function(v) {
      if (GDFont.cache.has(v)) {
          return GDFont.cache.get(v);
      }

      var c = new GDFont(v);
      GDFont.cache.set(c, v);
      return c;
  };

  class GDLiveLayouterModeSelector {
      constructor() {
          this.containerSelectDelay = 1000;
          this.highlightTargetDelay = 500;
          this.blinkingDuration = 300;
          this.useContainerSelectDelay = true;
      }
      get isRunning() {
          return this._startTime != undefined;
      }

      startWithPoint(x, y) {
          this._startX = x;
          this._startY = y;
          this._startTime = Date.now();
      }

      shouldSelectForPointWithDelay(x, y, delay) {
          if (!this.isRunning) {
              this.startWithPoint(x, y);
              return false;
          }

          if (!this.sameLocation(x, y)) {
              delete this._startTime;
              return false;
          }

          return (Date.now() - this._startTime) > delay;
      }

      shouldSelectForPoint(x, y) {
          if (!this.useContainerSelectDelay) {
              return true;
          }
          return this.shouldSelectForPointWithDelay(x, y, this.containerSelectDelay);
      }

      shouldHighlightForPoint(x, y) {
          return this.shouldSelectForPointWithDelay(x, y, this.highlightTargetDelay);
      }

      shouldBlinkForPoint(x, y) {
          return this.shouldSelectForPointWithDelay(x, y, Math.max(0, this.containerSelectDelay - this.blinkingDuration));
      }

      reset() {
          delete this._startTime;
          this.useContainerSelectDelay = true;
      }

      sameLocation(x, y) {
          return x == this._startX && y == this._startY;
      }
  }

  //@ts-check

  class GDActiveContainerStrategy {
      constructor(liveLayouter) {
          this._liveLayouter = liveLayouter;
      }

      selectTarget(aDropTarget) {
          
      }

      updatePassengerElements(draggingInfo) {

      }

      removePassengerElements() {

      }

      alreadyInsertedInContainer(targetElement) {
          let containers = new Set();

          this._liveLayouter.passengerElements.forEach(e => containers.add(e.parentNode));
          if (containers.size != 1) {
              return false;
          }

          let containerArray = Array.from(containers);

          return containerArray[0] == targetElement;
      }

      get insertedCells() {
          return [];
      }

      cleanup () {}

      get continousDropTargets() {
          return false;
      }

      get draggingInfo() {
          return this._liveLayouter.draggingInfo;
      }
  }

  class GDActiveFixedLayoutContainerStrategy extends GDActiveContainerStrategy {
      constructor(liveLayouter) {
          super(liveLayouter);
          this._lastX = null;
          this._lastY = null;
      }

      removePassengerElements() {
          this._liveLayouter.passengers.forEach(p => {
              if (p.DOMElement) {
                  p.DOMElement.remove();
              }

              if (p.container) {
                  p.container.removeComponent(p);
              }
          });
      }

      updatePassengerElements() {

      }


      selectTarget(aDropTarget) {
          this._liveLayouter.passengers.forEach(p => {
              if (!p.container) {
                  aDropTarget.container.addComponent(p);
                  let element = this._liveLayouter._at.buildDOMForCell(p);
                  aDropTarget.container.DOMElement.appendChild(element);
      
              }
              
          });
          /*
          NSPoint localImageLocation = [self.workingAreaView convertPoint:[self.draggingInfo draggedImageLocation] fromView:nil];

          NSAffineTransform* globalToLocalTransform = [self.activeDropTarget.container affineTransform];
          [globalToLocalTransform appendTransform:[self.activeDropTarget.container absoluteAffineTransform]];
          [globalToLocalTransform invert];
          localImageLocation = [globalToLocalTransform transformPoint:localImageLocation];
      
          NSSize draggedImageSize = [[self.draggingInfo draggedImage] size];
          CGFloat scaleFactor = [self scaleFactor];
          localImageLocation.y -= draggedImageSize.height / scaleFactor;
      
          [self insertPassengerRenderObjectsAtPoint:localImageLocation inContainer:self.activeDropTarget.container atIndex:self.activeDropTarget.index];
      
          [[self.workingAreaView guideCoordinator] prepareWithSelections:self.passengerRenderObjects];
          _cellBoundsChange = [GDCellBoundsChange cellBoundsChangeWithScreenChangeManager:self.screenChangeManager cells:self.passengerRenderObjects];
          _absoluteDelta = NSMakePoint(0, 0);
          _lastAlignedPoint = [self.workingAreaView convertPoint:[self.draggingInfo draggedImageLocation] fromView:nil];
          
          // Issue #136 take scrolling into account. Still buggy, but better than before
          CGFloat scrollDeltaLeft = 0;
          CGFloat scrollDeltaTop = 0;
          GDCellRenderObject* container = self.activeDropTarget.container;
          while (container) {
              scrollDeltaLeft += container.scrollLeft;
              scrollDeltaTop += container.scrollTop;
              container = container.container;
          }
          
          
          _lastAlignedPoint.x = _lastAlignedPoint.x - scrollDeltaLeft; // self.activeDropTarget.container.scrollLeft;
          _lastAlignedPoint.y = _lastAlignedPoint.y - scrollDeltaTop; // self.activeDropTarget.container.scrollTop;
          GDEvent* event = [GDEvent eventWithCocoaEvent:[NSApp currentEvent] inView:self.workingAreaView];
          [GDToolTip showDragTooltipForRenderObjects:self.passengerRenderObjects event:event];
  */    
      }
  }

  class GDActiveBoxLayoutContainerStrategy extends GDActiveContainerStrategy {
      constructor(liveLayouter) {
          super(liveLayouter);
          const alreadyInserted = this.alreadyInsertedInContainer(liveLayouter.activeDropTarget.container.DOMElement);
          if (!alreadyInserted) {
              this._liveLayouter.removePassengerElements();
          }
      }

      selectTargetAlreadyInserted(aDropTarget) {
          this._liveLayouter.removePassengerElements();

      }   

      selectTargetNotInserted(aDropTarget) {

      }

      selectTarget(aDropTarget) {
          const alreadyInserted = this.alreadyInsertedInContainer(aDropTarget.container.DOMElement);
          if (alreadyInserted) {
              this.selectTargetAlreadyInserted(aDropTarget);
          } else {
              this.selectTargetNotInserted(aDropTarget);
          }
      }
  }

  class GDActiveAlignmentContainerStrategy extends GDActiveContainerStrategy {

  }


  class GDContainerTargetFinder {
      constructor(liveLayouter) {
          this._liveLayouter = liveLayouter;  
      }

      containersWithDropTargetAtPoint(containers, x, y)  {
          let result = [];
          containers.forEach( container => {
              let dropTargets = this._liveLayouter.dropTargetsOfContainer(container);
              dropTargets.forEach( dropTarget => {
                  if (dropTarget.isTargetForPoint(x,y)) {
                      result.push(container);
                  }
              });
          });
          return result;
      }

      filterContainers(containers) {
          return containers;
      }

      weightedContainersAtPoint(x,y) {
          const allAtPoint = document.elementsFromPoint(x,y);
          let result = allAtPoint.filter( c => {
              if (!c.figure) {    // only Antetype-cells
                  return false;
              }
              for (let i=0; i<this._liveLayouter.passengers.length; i++) {
                  const p = this._liveLayouter.passengers[i];
                  if (p == c.figure || c.figure.isDescendentOf(p))
                      return false;
              }
              return true;
          });

          result = result.map( e => e.figure);

          if (this._liveLayouter.activeDropTarget) {
              result = this.containersWithDropTargetAtPoint(result, x, y);
          }

          result = this.filterContainers(result);
          this._cursorX = x;
          this._cursorY = y;
          return result;
      }

      nearestDropTarget(dropTargets,x,y) {
          let nearestDistance = Number.MAX_VALUE;
          let nearestDropTarget = null;

          dropTargets.forEach( dropTarget => {
              const nextDistance = dropTarget.distanceToPoint(x,y);
              if (nextDistance < nearestDistance) {
                  nearestDistance = nextDistance;
                  nearestDropTarget = dropTarget;
              }
          });

          return nearestDropTarget;

      }

  }

  class GDLiveLayouter {
      constructor(at) {
          this._at = at;

          this._showsOriginalRenderObjects = false;
          this._activeDropTarget = null;
          this._moveMode = false;
          this._passengers = [];
          this._passengerElements = [];
          this._originalElements = null;
          this._targetFinder = new GDContainerTargetFinder(this);
          this._activeContainerStrategy = null;
          this._selectionTimer = new GDLiveLayouterModeSelector();
      }

      get activeDropTarget() {
          return this._activeDropTarget;
      }

      set activeDropTarget(aTarget) {
          if (this.activeDropTarget == aTarget) {
              return;
          }

          this.invalidateActiveDropTargetsInView();

          const containerChanged = !this.activeDropTarget || (aTarget.container != this._activeDropTarget.container);

          this._activeDropTarget = aTarget;
          this.invalidateActiveDropTargetsInView();

          if (containerChanged) {
              if (this._activeContainerStrategy) {
                  this._activeContainerStrategy.cleanup();
              }
              const layoutPolicyCode = aTarget.container.valueForKeyInStateWithIdentifier("layoutPolicyCode", aTarget.container.activeStateIdentifier);
              switch (layoutPolicyCode) {
                  case GDFixedLayoutPolicyCode: 
                      this._activeContainerStrategy = new GDActiveFixedLayoutContainerStrategy(this); 
                      break;
                  case GDHorizontalBoxLayoutPolicyCode:
                  case GDVerticalBoxLayoutPolicyCode:
                      this._activeContainerStrategy = new GDActiveBoxLayoutContainerStrategy(this); 
                      break;
                  case GDAlignmentLayoutPolicyCode: 
                      this._activeContainerStrategy = new GDActiveAlignmentContainerStrategy(this);
                      break;

                  default:
                      this._activeContainerStrategy = new GDActiveContainerStrategy(this);
              }
          }
      }

      set containerSelectDelay(d) {
          this._selectionTimer.containerSelectDelay = d;
      }

      get containerSelectDelay() {
          return this._selectionTimer.containerSelectDelay;
      }

      set highlightTargetDelay(d) {
          this._selectionTimer.highlightTargetDelay = d;
      }

      get highlightTargetDelay() {
          return this._selectionTimer.highlightTargetDelay;
      }

      set blinkingDuration(d) {
          this._selectionTimer.blinkingDuration = d;
      }

      get blinkingDuration() {
          return this._selectionTimer.blinkingDuration;
      }

      get searchMode() {
          return this._selectionTimer.isRunning;
      }

      get showsOriginalRenderObjects() {
          return this._showsOriginalRenderObjects;
      }

      get moveMode() {
          return this._moveMode;
      }

      get passengers() {
          return this._passengers;
      }

      get draggingInfo() {
          return this._draggingInfo;
      }

      invalidateActiveDropTargetsInView() {}

      bestContainerAtPoint(x,y) {
          const possibleContainers = this._targetFinder.weightedContainersAtPoint(x,y);
          if (possibleContainers.length == 0) {
              return null;
          }

          return possibleContainers[0];
      }

      liveLayoutCells() {
          let ignored = this._passengers;
          if (!this._passengers) {
              ignored = [];
          }
          if (this._activeContainerStrategy) {
              ignored = ignored.concat(this._activeContainerStrategy.insertedCells);
          }
          return ignored;
      }

      dropTargetsOfContainerContinous(container, continous) {
          const ignored = this.liveLayoutCells();
          if (continous) {
              return container.dropTargetsExcludingPassengers(ignored);
          } else {
              return container.continousDropTargetsExcludingPassengers(ignored);
          }
      }

      dropTargetsOfContainer(container) {
          return this.dropTargetsOfContainerContinous(container, false);
      }

      highlightContainer(container) {
          if (!container || this.activeDropTarget.container == container) {
              this._at.setPossibleTargetRect(0,0,0,0);
          } else {
              let b = globalBoundsOfElement(container.DOMElement);
              this._at.setPossibleTargetRect(b.left, b.top, b.width, b.height);
          }
      }

      selectTarget(bestTarget) {
          if (bestTarget.isEqual(this._activeDropTarget)) {
              return;
          }


          if (!bestTarget) {
              return;
          }

          this.highlightContainer(null);
          this.activeDropTarget = bestTarget;

      //    [[self.workingAreaView guideCoordinator] clearAlignmentGuidesForView:self.workingAreaView];

          this._activeContainerStrategy.selectTarget(bestTarget);
          this._activeDropTarget.insertedRenderObjects = this._passengerElements;
          this._activeDropTarget.resizetoFreeSpace();

      }


      selectBestTargetForPoint(x,y) {
          const bestContainer = this.bestContainerAtPoint(x,y);
          if (!bestContainer) {
              return;
          }

          const dropTargets = this.dropTargetsOfContainer(bestContainer);
          let nearestDropTarget = this._targetFinder.nearestDropTarget(dropTargets,x,y);
          this.selectTarget(nearestDropTarget);
      }

      buildPassengerElements(passengers) {
          this._passengers = passengers;
          this._passengerElements = [];
          this._passengersAreNestable = true;
          let passengersAlreadyInserted = false;
          this._passengers.forEach( p => {
              if (p.container) {
                  passengersAlreadyInserted = true;
              }

              if (!p.valueForKeyInStateWithIdentifier("isNestable", p.activeStateIdentifier)) {
                  this._passengersAreNestable = false;
              }

              let passengerElement = p.DOMElement;
              if (!passengerElement) {
                  // passengerElement = this._at.buildDOMForCell(p);
                  // does not work, since css-building needs a screen
                  // not sure what to do currently only a unstyled cell:
                  passengerElement = document.createElement("cell");
                  passengerElement.figure = p; 
                  p.DOMElement = passengerElement; 
              }

              this._passengerElements.push(passengerElement);
          });

          const sortFunction = (obj1, obj2) => {
              if (obj1.figure.index == obj2.figure.index) {
                  return 0;
              }

              if (obj1.figure.index < obj2.figure.index) {
                  return -1;
              }

              return 1;
          };
          this._passengerElements.sort(sortFunction);

          return passengersAlreadyInserted;
      }

      selectExistingTarget() {
          const p = this._passengers[0];
          let container = p.container;

          let dropTargets = this.dropTargetsOfContainer(container);

          if (dropTargets.length == 1) {
              this.selectTarget(dropTargets[0]);
          } else  {
              for (let i=0; i<dropTargets.length; i++) {
                  const target = dropTargets[i];
                  if (target.index == p.index) {
                      this.selectTarget(target);
                      break;
                  }
              }
          }
  }


      setPassengers(passengers, draggingInfo) {
          this._draggingInfo = draggingInfo;
          const passengersAlreadyInserted = this.buildPassengerElements(passengers);

          if (passengersAlreadyInserted) {
              this.selectExistingTarget();
          }
          this._originalElements = null;
      
          this._passengers = passengers;
          this._isBlinking = false;
          
      }

      updatePassengerElements() {
          this._activeContainerStrategy.updatePassengerElements(this._draggingInfo);
      }

      removePassengerElements() {
          this._activeContainerStrategy.removePassengerElements();
      }

      get passengerElements() {
          return this._passengerElements;
      }

      insertOriginalElements() {
          if (this.showsOriginalElements) {
              return;
          }

          let renderObjects = [];
          this._passengers.forEach( passenger => {
              const container = passenger.container;

              if (this.activeDropTarget && container == this.activeDropTarget.container) {
                  if (passenger.index <= this.activeDropTarget.index) {
                      this.activeDropTarget.index += 1;
                  }
              }

              // mmmhm we can only build the elements if it is part of the screem
              if (!container) {
                  if (this.activeDropTarget) {
                      this.activeDropTarget.container.insertComponent(passenger, this.activeDropTarget.index);
                  }
              }

              if (passenger.container && passenger.container.DOMElement) {
                  let containerElement = passenger.container.DOMElement;
                  
                  let element = this._at.buildDOMForCell(passenger);

                  if (passenger.index == container.orderedComponents.length-1) {
                      containerElement.appendChild(element);
                  } else {
                      const referenceNode = containerElement.childNodes[passenger.index+1];
                      containerElement.insertBefore(element, referenceNode);
                  }
                  renderObjects.push(element);

              }

          });
          this._originalElements = renderObjects;

          // [[self.workingAreaView guideCoordinator] clearAlignmentGuidesForView:self.workingAreaView];
          // [[self.workingAreaView guideCoordinator] prepareWithSelections:_passengerRenderObjects];
      }

      removeOriginalElements() {
          if (!this.showsOriginalElements) {
              return;
          }

          this._originalElements.forEach( element => {
              element.remove();
              
          });
          this._originalElements = null;

  /*

      [_screenChangeManager doWorkUsingBlock:^{
          for (GDRenderObject* renderObject in _originalRenderObjects) {
              GDCellRenderObject* containerRenderObject = [renderObject container];
              if ([containerRenderObject isEqual: self.activeDropTarget.container]) {
                  if (renderObject.index < self.activeDropTarget.index)
                      self.activeDropTarget.index -= 1;
              }

              [containerRenderObject removeComponentAtIndex:[renderObject index]];
          }
      }];

      _originalRenderObjects = nil; */

      // [[self.workingAreaView guideCoordinator] clearAlignmentGuidesForView:self.workingAreaView];
      // [[self.workingAreaView guideCoordinator] prepareWithSelections:_passengerRenderObjects];



      }

      get showsOriginalElements() {
          return this._originalElements != null;
      }

      get isBlinking() {
          return this._isBlinking;
      }

      stopBlinking() {
          this._isBlinking = false;
      }

      blinkContainer() {
          this._isBlinking = true;
          this._at.blinkPossibleTargetRect();

      }

      startHighlightingAtPoint(x,y) {
          if (!this._selectionTimer.isRunning) {
              const sameCursorLocation = this._selectionTimer.sameLocation(x,y);
              if (!sameCursorLocation) {
                  this.stopBlinking();
                  this.highlightContainer(null);
                  this._selectionTimer.startWithPoint(x,y);
              }
          }
      
          if (this._selectionTimer.shouldHighlightForPoint(x,y)) {
              const bestContainer = this.bestContainerAtPoint(x,y); 
              this.highlightContainer(bestContainer);
      
              this._selectionTimer.useContainerSelectDelay = true;
          }
      
          if (this._selectionTimer.shouldBlinkForPoint(x,y)) {
              this.blinkContainer();
          }
      
          if (this._selectionTimer.shouldSelectForPoint(x,y)) {
              this.stopBlinking();
              this.selectBestTargetForPoint(x,y);
              this._selectionTimer.reset();
          }    
      }

      activeDropTargetsAtPoint(x,y) {
          const activeContainer = this._activeDropTarget.container;
          const allDropTargets = this.dropTargetsOfContainerContinous(activeContainer, this._activeContainerStrategy.continousDropTargets);
          return allDropTargets.filter( dropTarget => dropTarget.isTargetForPoint(x,y));
      }

      containerDropTargetAtPoint(x,y) {
          const targets = this.activeDropTargetsAtPoint(x,y);
          if (targets.length == 0) {
              return null;
          }

          return targets[0];
      }


      doLiveLayout() {
          const x = this._draggingInfo.pageX;
          const y = this._draggingInfo.pageY;

          if (this.activeDropTarget == null) {
              this.selectBestTargetForPoint(x, y);
              return;
          }

          this.updatePassengerElements();
      
          if (this.moveMode || !this._passengersAreNestable)
              return;
      
          this.startHighlightingAtPoint(x,y);
      
          const newContainerDropTarget = this.containerDropTargetAtPoint(x,y);
          if (newContainerDropTarget) {
              this.selectTarget(newContainerDropTarget);
          }
      }

      layoutForDraggingInfo(draggingInfo) {
          this._draggingInfo = draggingInfo;
          this.doLiveLayout();
          this._draggingInfo = null;
      
      }
  }

  /**
   * sends the dragging-events from the browser to Antetype. (like with the tools)
   */
  class GDDragHandler {
      constructor(at) {
          this._at = at;
          this._started = false;
      }


      cocoaOperationToWeb(o) {
          switch (o) {
              case GDDragHandler.NSDragOperationNone: return "none";
              case GDDragHandler.NSDragOperationCopy: return "copy";
              case GDDragHandler.NSDragOperationLink: return "link";
              case GDDragHandler.NSDragOperationMove: return "move";
          }

          return "";
      }

      dragEnter(e) {
          if (this._started) {
              return;
          }
          if (window.workingAreaView) {
              e.preventDefault();
              var cocoaOperation = window.workingAreaView.webDragEnter(transferEvent(e));
              e.dataTransfer.effectAllowed = this.cocoaOperationToWeb(cocoaOperation);
              this._started = true;
          }
      }

      dragLeave() {
      }

      dragExit() {
      }

      dragOver(e) {
          if (window.workingAreaView) {
              e.preventDefault();
              var cocoaOperation = window.workingAreaView.webDragOver(transferEvent(e));
              e.dataTransfer.effectAllowed = this.cocoaOperationToWeb(cocoaOperation);
          }
      }

      drop(e) {
          if (window.workingAreaView) {
              e.preventDefault();
              var cocoaOperation = window.workingAreaView.webDrop(transferEvent(e));
              e.dataTransfer.dropEffect = this.cocoaOperationToWeb(cocoaOperation);
              this._started = false;
          }
      }

      possibleDragOperations(e) {
          return GDDragHandler.NSDragOperationEvery;    // for now ...
      }
  }

  GDDragHandler.NSDragOperationNone = 0;
  GDDragHandler.NSDragOperationCopy = 1;
  GDDragHandler.NSDragOperationLink = 2;
  GDDragHandler.NSDragOperationGeneric = 4;
  GDDragHandler.NSDragOperationPrivate = 8;
  GDDragHandler.NSDragOperationMove = 16;
  GDDragHandler.NSDragOperationDelete = 32;
  GDDragHandler.NSDragOperationEvery  = -1; //NSUIntegerMax, 


  class GDCellDragHandler extends GDDragHandler {
      constructor(at) {
          super(at);
          this._liveLayouter = new GDLiveLayouter(at);
      }
      possibleDragOperations(e) {
          for (let i=0; i<e.dataTransfer.types.length; i++) {
              const type = e.dataTransfer.types[i];
              if (type == GDCellDragType) {
                  return GDDragHandler.NSDragOperationEvery;
              }

          }
          return GDDragHandler.NSDragOperationNone;    
      }

      dragEnter(e) {
          // let data = e.dataTransfer.getData(GDCellDragType);
          // let figure = document.getElementById(data).figure;

          // due to security we can not access the data (only on drop),
          // for now store the cells in the tool ... 
          let draggedFigures = this._at.currentTool.draggedFigures;
          this._liveLayouter.setPassengers(draggedFigures, e);
          return GDDragHandler.NSDragOperationMove;
      }

      dragOver(e) {
          this._liveLayouter.layoutForDraggingInfo(e);
          return GDDragHandler.NSDragOperationMove;
      }
  }

  class GDRubberbandDragHandler extends GDDragHandler {
      possibleDragOperations(e) {

          // for old WebView:
          for (let i=0; i<e.dataTransfer.types.length; i++) {
              const type = e.dataTransfer.types[i];
              if (type == GDRubberbandPassengerPBoardType) {
                  return GDDragHandler.NSDragOperationLink;
              }
          }

          // for WKWebView:
          if (e.dataTransfer.types.length == 1 && e.dataTransfer.types[0] == "text/uri-list") {
              return GDDragHandler.NSDragOperationLink;
          }

          return GDDragHandler.NSDragOperationNone;  
      }

      showHilighter() {
          if (this._highlighter) return;
          this._highlighter = document.createElement("div");
          this._highlighter.className = "rubberbandrect";
          document.body.appendChild(this._highlighter);
      }

      removeHighlighter() {
          if (!this._highlighter) return;
          this._highlighter.remove();
          delete this._highlighter;
      }

      dragEnter(e) {
          e.preventDefault();
          const allFigures = this.elementsFromPoint(e.pageX, e.pageY);
          if (allFigures.length > 0) {
              const f = allFigures[0];
              let b = globalBoundsOfElement(f);
              this.showHilighter();
              sizeHighlightCell(this._highlighter, b);
          } else {
              this.removeHighlighter();
          }

      }

      elementsFromPoint(x,y) {
          const allElements = document.elementsFromPoint(x,y);
          let allFigures = allElements.filter( e => e.figure != undefined && !e.figure.isScreen );
          return allFigures;
      }

      dragLeave() {
          // at least webkit has the order: dragenter → dragleave → dragover
          // we cannot remove the hihlighter on leave, because we would remove the new one
          // or should we store the target? 
          this._removeTimout = window.setTimeout(() => { this.removeHighlighter(); }, 10);
      }

      dragOver(e) {
          e.preventDefault();
          window.clearTimeout(this._removeTimout);    // see above in dragLeave
      }

      drop(e) {
          const allFigures = this.elementsFromPoint(e.pageX, e.pageY);
          if (allFigures.length > 0) {
             const f = allFigures[0];
             this._at.send("/rubberBandSelectFigureWithID/" + f.figure.objectID);
          }
          this.removeHighlighter(); 
      }



  }

  const GDCellDragType = "application/cellid";
  const GDRubberbandPassengerPBoardType = "com.antetype.GDRubberbandPassenger";

  class GDAlignmentLine {
      constructor(startX, startY, endX, endY) {
          this.startX = startX;
          this.startY = startY;
          this.endX = endX;
          this.endY = endY;
      }

      domElement() {
          var e = document.createElement("div");
          var horizontal = this.startY == this.endY;
      
          e.style.position = "absolute";
          e.style.pointerEvents = "none";
          e.style.top = this.startY + "px";
          e.style.left = this.startX + "px";
          if (horizontal) {
              e.style.borderTop = "1px dotted red"; //this.color.toString();
              e.style.width = this.endX - this.startX + "px";
              e.style.height = "2px";
          } else {
              e.style.borderLeft= "1px dotted red"; // + this.color.toString();
              e.style.height= this.endY - this.startY + "px";
              e.style.width = "2px";
          }
          return e;
      
      }
  }

  const GDAlignmentGuideTopSide = 0,
      GDAlignmentGuideRightSide = 1,
      GDAlignmentGuideBottomSide = 2;

  const GDAlignmentGuideZeroPriority = 0;



  class GDAlignmentGuide {
      constructor(coordinator, cell, position, side) {
          this.guideCoordinator = coordinator;
          this.cell = cell;
          this.position = position;
          this.side = side;
      }

      get isHorizontal() {
          return false;
      }

      get isVertical() {
          return false;
      }

      get priority() {
          return GDAlignmentGuideZeroPriority; // mmhmm like in Objective-C with subclass for everything or parameter?
      }

      alignmentLineTo(otherAlignmentGuide) {
          return undefined;
      }

      isAlignedTo(otherAlignmentGuide) {
          return this.position == otherAlignmentGuide.position;
      }

      distanceTo(otherAlignmentGuide) {
          return this.position - otherAlignmentGuide.position;
      }

      canSnapTo(otherAlignmentGuide) {
          return Object.getPrototypeOf(otherAlignmentGuide) == Object.getPrototypeOf(this);
      }
  }


  class GDVerticalAlignmentGuide extends GDAlignmentGuide {
      get isVertical() {
          return true;
      }

      alignmentLineTo(otherAlignmentGuide) {
          if (this.cell.container == otherAlignmentGuide.cell) {
              const containerBounds = this.guideCoordinator.cachedBoundsForCell(otherAlignmentGuide.cell);
              return new GDAlignmentLine(containerBounds.left, containerBounds.top, containerBounds.left, containerBounds.top + containerBounds.height);
          }

          let startCell = this.cell;
          let endCell = otherAlignmentGuide.cell;

          const startBounds = this.guideCoordinator.cachedBoundsForCell(startCell);
          const endBounds = this.guideCoordinator.cachedBoundsForCell(endCell);

          if (startBounds.left > endBounds.left) {
              return new GDAlignmentLine(endBounds.left, otherAlignmentGuide.position, startBounds.left + startBounds.width, otherAlignmentGuide.position );
          } 

          return new GDAlignmentLine(startBounds.left, this.position,  endBounds.left + endBounds.width, this.position);
      }

  }

  class GDVerticalEdgeAlignmentGuide extends GDVerticalAlignmentGuide {

  }

  class GDHandle {
      constructor(owner, path) {
          this.owner = owner;
          this.path = path;

          this._snapPointDeltaX = 0;
          this._snapPointDeltaY = 0;
      }

      get cursor() {
          switch (this.path) {
              case "topLeft": 
              case "bottomRight": return "nwse-resize"; 
              case "topCenter": 
              case "bottomCenter": return "ns-resize"; 
              case "rightCenter": 
              case "leftCenter": return "ew-resize"; 
              case "bottomLeft":
              case "topRight": return "nesw-resize"; 
          }
      
          return "pointer";    
      }

      positionElement() {
          const handleElement = this.DOMElement;

          const ownerRect = globalBoundsOfElement(this.owner.DOMElement); //handle.owner.getBoundingClientRect(); 

          let p = {};
          
          const keyPath = this.path;
          const delta = 3; 
      
          switch (keyPath) {
              case "topLeft": p = {x: ownerRect.left - delta, y: ownerRect.top - delta}; break;
              case "topCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top - delta}; break;
              case "topRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top - delta}; break;
              case "rightCenter": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break;
              case "bottomRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height - delta}; break;
              case "bottomCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top + ownerRect.height - delta} ; break;
              case "bottomLeft": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height - delta}; break;
              case "leftCenter": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break; 
          }
      
          handleElement.style.left = p.x + "px";
          handleElement.style.top = p.y + "px";
      
      }

      remove() {
          if (this.DOMElement && this.DOMElement.parentElement) {
              this.DOMElement.parentElement.removeChild(this.DOMElement);
          }
      }

      createElement() {
          const handleElement = document.createElement("div");
          handleElement.className = "handle";
          handleElement.handle = this;
          handleElement.style.cursor = this.cursor;
          this.DOMElement = handleElement;
          this.positionElement();
          return handleElement;
      }

      dragged(tool, x, y) {}

      startDragAtPoint(tool, x,y) {
          [this._snapPointDeltaX, this._snapPointDeltaY] = this.calculateStartDifference(tool, x, y);
      }

      calculateStartDifference(tool, x,y) {
          return [x,y];
      }
  }


  class GDTopCenterHandle extends GDHandle {
      calculateStartDifference(tool,x,y) {
          let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
          return [0, y-ownerBounds.top];
      }
      
      dragged(tool, x, y) {
          y -= this._snapPointDeltaY;
          y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideTopSide);

          const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
          const centered = containerHasFreeLayout && tool.centered;

          let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
          let dy =  y - ownerBounds.top;
          let height = this.owner.getProperty("height");
          height -= dy;

          if (centered) {
              height -= dy;
          }

          ownerBounds.height = height;
          if (height <= this.owner.getProperty("minimumHeight")) {
              return;
          }
          tool.at.cellSetProperty(this.owner, "height", height);

          
          const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing;
          if (constrained) {
              const newWidth = (tool.originalBounds.width/tool.originalBounds.height)* height;
              const oldWidth = this.owner.getProperty("width");
              tool.at.cellSetProperty(this.owner, "width", newWidth);

              if (containerHasFreeLayout) {
                  const newX = this.owner.getProperty("x") + (oldWidth - newWidth) / 2;
                  tool.at.cellSetProperty(this.owner, "x", newX);
              }
          }

          if (containerHasFreeLayout) {
              let y =  this.owner.getProperty("y");   
              y += dy;
              ownerBounds.top += dy;
              tool.at.cellSetProperty(this.owner, "y", y);
          }

          // update cached bounds
          tool.guideCoordinator.cacheBoundsForCell(this.owner,ownerBounds);
      }
  }


  class GDBottomCenterHandle extends GDHandle {
      calculateStartDifference(tool,x,y) {
          let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
          return [0, y-(ownerBounds.top + ownerBounds.height)];
      }

      dragged(tool, x, y) {
          y -= this._snapPointDeltaY;
          y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideBottomSide);


          const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
          const centered = containerHasFreeLayout && tool.centered;

          let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

          if (y < ownerBounds.top) return; 

          let dy =  y - (ownerBounds.top + ownerBounds.height);
          let height = this.owner.getProperty("height");
          height += dy;

          if (centered) {
              height += dy;
          }

          if (height <= this.owner.getProperty("minimumHeight")) {
              return;
          }

          ownerBounds.height = height;

          tool.at.cellSetProperty(this.owner, "height", height);

          
          const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing;
          if (constrained) {
              const newWidth = (tool.originalBounds.width/tool.originalBounds.height)* height;
              const oldWidth = this.owner.getProperty("width");
              tool.at.cellSetProperty(this.owner, "width", newWidth);

              if (containerHasFreeLayout) {
                  const newX = this.owner.getProperty("x") + (oldWidth - newWidth) / 2;
                  tool.at.cellSetProperty(this.owner, "x", newX);
              }
          }

          if (containerHasFreeLayout && centered) {
              let y =  this.owner.getProperty("y");   
              y -= dy;
              ownerBounds.top -= dy;
              tool.at.cellSetProperty(this.owner, "y", y);
          }

          // update cached bounds
          tool.guideCoordinator.cacheBoundsForCell(this.owner,ownerBounds);
      }
  }


  class GDBottomRightHandle extends GDHandle {
      calculateStartDifference(tool,x,y) {
          let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);
          return [x-(ownerBounds.left + ownerBounds.width), y-(ownerBounds.top + ownerBounds.height)];
      }

      dragged(tool, x, y) {
          y -= this._snapPointDeltaY;
          y = tool.guideCoordinator.snapVertical(y, GDAlignmentGuideBottomSide);
          x -= this._snapPointDeltaX;
          x = tool.guideCoordinator.snapHorizontal(x, GDAlignmentGuideRightSide);

          const containerHasFreeLayout = this.owner.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode;
          const centered = containerHasFreeLayout && tool.centered;
          const constrained = tool.constrained && this.owner.getProperty("horizontalResizing") == GDFixResizing && this.owner.getProperty("verticalResizing") == GDFixResizing;

          let ownerBounds = tool.guideCoordinator.cachedBoundsForCell(this.owner);

          let height = this.owner.getProperty("height");
          let width = this.owner.getProperty("width");
          let dy =  y - (ownerBounds.top + ownerBounds.height);
          let dx =  x - (ownerBounds.left + ownerBounds.width);

          if (constrained) {
              const useY =  Math.abs(dy) < Math.abs(dx);
              if (useY) {
                  height += dy;
                  width = (tool.originalBounds.width/tool.originalBounds.height)* height;           
              } else {
                  width += dx;
                  height = (tool.originalBounds.height/tool.originalBounds.width)*width;                
              }
          } else {
              height += dy;
              width += dx;

              if (centered) {
                  height += dy;
                  width += dx;
              }
          }

          if (height <= this.owner.getProperty("minimumHeight")) {
              return;
          }
          ownerBounds.height = height;

          if (width <= this.owner.getProperty("minimumWidth")) {
              return;
          }
          ownerBounds.width = width;

          tool.at.cellSetProperty(this.owner, "height", height);
          tool.at.cellSetProperty(this.owner, "width", width);
          

          if (centered && !constrained) {
              let y =  this.owner.getProperty("y");   
              y -= dy;
              ownerBounds.top -= dy;
              tool.at.cellSetProperty(this.owner, "y", y);

              let x =  this.owner.getProperty("x");   
              x -= dx;
              ownerBounds.left -= dx;
              tool.at.cellSetProperty(this.owner, "x", x);
          }

          // update cached bounds
          tool.guideCoordinator.cacheBoundsForCell(this.owner,ownerBounds);
      }
  }

  /**
   * returns the handles for the given cell. 
   * 
   * takes the container and resizing-modes into acccount
   * 
   * @param {GDWidgetInstanceCell} cell 
   */
  function handlesForCell(cell) {
      const horizontalResizing = cell.getProperty("horizontalResizing");
      const verticalResizing = cell.getProperty("verticalResizing");

      if (horizontalResizing != GDFixResizing && verticalResizing != GDFixResizing) {
          return [];
      }

      const handles = [];

      if (cell.container.getProperty("layoutPolicyCode") == GDFixedLayoutPolicyCode) {
          if (verticalResizing == GDFixResizing) {
              handles.push(new GDTopCenterHandle(cell, "topCenter"));
              handles.push(new GDBottomCenterHandle(cell, "bottomCenter"));
          }

          if (horizontalResizing == GDFixResizing) {
              handles.push(new GDBottomRightHandle(cell, "bottomRight"));
          }
      }


      return handles;

  }

  /**
      Used for Screen-transitions (see GDGotoScreenAction). This one is used in the
      exported WebViewer, GDEditModeScreenAnimator is used in LivePreview/In-Place-Presentation-Mode.

      Normally, <body> contains the current screen. In case of a screen-transition 
      we move the content of the body (old screen) into a div, the new screen in 
      another div, animate both (or one, depending on the transition) and when 
      the animation finishes we delete the old-screen-div and move the contents of 
      the new screen-div into the body
  */
  class GDScreenAnimator {
      constructor(at, transition, duration) {
          this.at = at;
          this.transition = transition;
          this.duration = duration;
      }


      /**
          Converts between out transition constant (@link GDGotoScreenAction} and
          CSS-animation-classes.

          @return {Array} [oldScreenAnimation, newScreenAnimation]
      */
      convertTransitionToAnimationClasses() {
          let oldScreenAnimation = "";
          let newScreenAnimation = "";
          let oldOnTop = false;

          switch (this.transition) {
              case GDGotoScreenAction.GDScreenTransitionFade:
                  oldScreenAnimation = "fadeOut";
                  newScreenAnimation = "fadeIn";
                  break;

              case GDGotoScreenAction.GDScreenTransitionFadeOut:
                  oldScreenAnimation = "fadeOut";
  //                newScreenAnimation = "fadeIn";
                  oldOnTop = true;
                  break;

              case GDGotoScreenAction.GDScreenTransitionScale: 
                  newScreenAnimation = "zoomIn";
                  break;

              case GDGotoScreenAction.GDScreenTransitionScaleOut: 
                  oldScreenAnimation = "zoomOut";
                  oldOnTop = true;
                  break;

              // for Safari 12 we have to animate a margin, therefor use margin-animation
              // works in Technology Preview ... 
              case GDGotoScreenAction.GDScreenTransitionPushToLeft: 
                  //newScreenAnimation = "slideInRight";
                  newScreenAnimation = "marginInRight";
                  oldScreenAnimation = "slideOutLeft";
                  break;
              case GDGotoScreenAction.GDScreenTransitionPushToRight: 
                  //newScreenAnimation = "slideInLeft";
                  newScreenAnimation = "marginInLeft";
                  oldScreenAnimation = "slideOutRight";
                  break;
              case GDGotoScreenAction.GDScreenTransitionPushToTop: 
                  //newScreenAnimation = "slideInUp";
                  newScreenAnimation = "marginInUp";
                  oldScreenAnimation = "slideOutUp";
                  break;
              case GDGotoScreenAction.GDScreenTransitionPushToBottom: 
                  //newScreenAnimation = "slideInDown";
                  newScreenAnimation = "marginInDown";
                  oldScreenAnimation = "slideOutDown";
                  break;

              case GDGotoScreenAction.GDScreenTransitionMoveFromLeft: 
                  //newScreenAnimation = "slideInLeft";
                  newScreenAnimation = "marginInLeft";
                  break; 
              case GDGotoScreenAction.GDScreenTransitionMoveFromRight: 
                  //newScreenAnimation = "slideInRight";
                  newScreenAnimation = "marginInRight";
                  break; 
              case GDGotoScreenAction.GDScreenTransitionMoveFromBottom: 
                  //newScreenAnimation = "slideInUp";
                  newScreenAnimation = "marginInUp";
                  break; 
              case GDGotoScreenAction.GDScreenTransitionMoveFromTop: 
                  //newScreenAnimation = "slideInDown";
                  newScreenAnimation = "marginInDown";
                  break; 

              case GDGotoScreenAction.GDScreenTransitionMoveToLeft: 
                  oldScreenAnimation = "slideOutLeft";
                  oldOnTop = true;
                  break; 
              case GDGotoScreenAction.GDScreenTransitionMoveToRight: 
                  oldScreenAnimation = "slideOutRight";
                  oldOnTop = true;
                  break; 
              case GDGotoScreenAction.GDScreenTransitionMoveToBottom: 
                  oldScreenAnimation = "slideOutDown";
                  oldOnTop = true;
                  break; 
              case GDGotoScreenAction.GDScreenTransitionMoveToTop: 
                  oldScreenAnimation = "slideOutUp";
                  oldOnTop = true;
                  break; 


              default:
                  // if we have a transition which is not knowm
                  oldScreenAnimation = "fadeOut";
                  newScreenAnimation = "fadeIn";

          }

          return [oldScreenAnimation, newScreenAnimation, oldOnTop];
      }

      moveChildren(sourceElement, targetElement) {
          let children = [];
          for (let i=0; i<sourceElement.children.length; i++) {
              let child = sourceElement.children[i];
              children.push(child);
          }

          children.forEach( c=> targetElement.appendChild(c));
      }

      createNewScreenContainer(screenDOMElement) {
          let newScreenContainer = document.createElement("div");
          newScreenContainer.className = screenDOMElement.className + " NewScreenContainer";
          newScreenContainer.innerHTML = screenDOMElement.innerHTML;
          newScreenContainer.style.animationDuration =this.duration + "s";
          return newScreenContainer;
      }

      animateScreenTransition(screen) {
          const at = this.at;
          const oldScreen = at.currentScreen;

          // new screen goes into this container .... 
          let newScreenContainer = this.createNewScreenContainer(screen.DOMElement);
          screen.insertStyleSheets();
          let [oldScreenAnimation, newScreenAnimation, oldOnTop] = this.convertTransitionToAnimationClasses();

          if (newScreenAnimation != "") {
              newScreenContainer.classList.add(newScreenAnimation, "animated");
          }

          let oldClassNames = document.body.className;
          
          // container for the oldscreen (not all transition needs this, but so far we use it for all, 
          const oldScreenContainer = document.createElement("div");
          oldScreenContainer.style.animationDuration = `${this.duration} s`;
          oldScreenContainer.className = `${oldClassNames} NewScreenContainer ${oldScreenAnimation} animated`; 

          if (oldOnTop) {
              oldScreenContainer.style.zIndex = 1;
          }

          // #645 cleanup effects to not show them twice:
          document.querySelectorAll(".animated").forEach( e => {
              if (e.figure) {
                  e.className = cssClassNameForCell(e.figure, at.project); 
              }
          });

          this.moveChildren(document.body, oldScreenContainer);


          document.body.appendChild(oldScreenContainer);

          const endAnimationListener = () => {
              // when the animation is finished we need to remove the animation-containers ... 
              newScreenContainer.remove();
              at.screenElement.parentNode.replaceChild(screen.DOMElement, at.screenElement);
              at.screenElement = screen.DOMElement;
              at.currentScreen = screen;
              at.executeFinalWidgetLayoutPass(screen);
              this.moveChildren(oldScreenContainer, oldScreen.DOMElement);

              // since we cache the body-Elements we have to remove the oldScreenContainer-Div afterwards
              oldScreenContainer.remove();
              at.dispatchEvent({type: 'loadscreen', defaultPrevented: false});

          };
          if (newScreenAnimation != "") {
              newScreenContainer.addEventListener("animationend", endAnimationListener);
          } else if (oldScreenAnimation != "") {
              oldScreenContainer.addEventListener("animationend", endAnimationListener);
          }
          document.body.appendChild(newScreenContainer);
      }

      /**
       * selects the given screen with the transition/duration given in the constructor.
       *
       * @param {GDScreen} screen
       */
      gotoScreenWithTransition(screen) {
          let at = this.at;
          at.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});

          if (screen.DOMElement == undefined) {
              screen.createStyleSheets();
              screen.DOMElement = at.buildDOMForCell(screen);
          }

          this.animateScreenTransition(screen);

      }

  }


  /**
      screen-transition in in-place presentation mode and live preview. (internally)
  */
  class GDEditModeScreenAnimator extends GDScreenAnimator {
      gotoScreenWithID(i) {
          let at = this.at;
          at.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});

          const cachedScreen = at.cachedScreenWithObjectID(i);
          if (cachedScreen) {
              this.animateScreenTransition(cachedScreen);
          } else {
              let request = new XMLHttpRequest();
              request.open("GET", "/proxy/fetchobject?document=" + at.serverDocumentName + "&entity=GDFigure&id="+i);
              request.onreadystatechange = () => {
                  if (request.readyState == XMLHttpRequest.DONE && request.status === 200) {
                      const json = JSON.parse(request.response);
                      let screen = GDModelObject.fromJSONObjectInProject(json, at.project);
                      screen.createStyleSheets();
                      at._cachedScreens.set(i, screen);

                      screen.DOMElement  = at.buildDOMForCell(screen);
                      this.animateScreenTransition(screen);
                  }
              };
              request.send();
          }
      }
  }

  class PaperCanvas {

      static hitOptions() {
          return {
              handles: true,
              segments: true,
              stroke: true,
              fill: true,
              curves: true,
              tolerance: 5
          };
      }

      constructor(htmlCanvas, savedState) {
          // Initialize PaperScope
          this._paperInstance = new paper.PaperScope();
          // Setup html canvas for PaperScope
          this._paperInstance.setup(htmlCanvas);
          // Size of the handles
          this._paperInstance.settings.handleSize = 6;
          this._paperInstance.tool = new this._paperInstance.Tool();

          this._selectedPath = null;
          this._dragItem = {item:null, type:null, bezierCurveMirrored:true};

          this._paperInstance.tool.onMouseDown = (event) => {
              // Determine drag target
              this.determineDragTarget(event.tool._scope, this._dragItem, event.point);
          };

          this._paperInstance.tool.onMouseDrag = (event) => {
              // Drag target if available    
              this.dragTarget(event.tool._scope, this._dragItem, event.point, event.delta);
          };

          this._paperInstance.tool.onMouseUp = (event) => {
              this.drawPath(event.tool._scope, event.point);
          };

          this._paperInstance.tool.onKeyUp = (event) => {
              if(event.key == 'backspace') {
                  // Remove selected segment
                  this.removeSegment();
              }

              if(event.key == 'enter') {
                  // Deselect path
                  this.resetSelectedPath(); 
              }

              if(event.key == 'c') {
                  // Close/open path toggle
                  this.closePath();
              }

              if(event.key == 'x') {
                  // Close/open path toggle
                  this.convertSegmentToCurve(event);
              }
          };

          this.cssStrokeColorRef = null;
          this.cssFillColorRef = null;

          // Import Project if available
          this.restoreSavedState(this._paperInstance, savedState);
      }

      drawPath(paperInstance, point) {
          const hitResult = paperInstance.project.hitTest(point, PaperCanvas.hitOptions());

          // Draw path
          if(hitResult == null) {
              if(this._selectedPath != null) {
                  if(this.isFirstPathSegmentSelected()) {
                      this.reversePath();
                  }

                  if(this.isFirstPathSegmentSelected() || this.isLastPathSegmentSelected()) {
                      // Extend the selected path with another point and draw a line to this point
                      this.addSegment(this._selectedPath, point);
                  }
              }
              else {
                  // Check for an already existing path
                  this._selectedPath = this.searchExistingPath(paperInstance);

                  // Create a new one
                  if(this._selectedPath == null) {
                      this.createPath(paperInstance, point);
                  }
              }
          }
          else {
              if(this._selectedPath == null) {
                  this._selectedPath = hitResult.item;
              }
              else if (hitResult.type == 'stroke') {
                  // Insert segment
                  this.insertSegment(this._selectedPath, hitResult.location.index, point);
              }
              else if (hitResult.type == 'segment') {
                  this._dragItem.item = null;
                  this._dragItem.type = null;

                  if(hitResult.segment.selected == true) {
                      // HitResult segment and previously selected segment are the same. Deselect it.
                      hitResult.segment.selected = false;
                  }
                  else {
                      // Deselect all previous selections
                      this.deselectPathSegments();
                      hitResult.segment.selected = true;
                  }
              }
          }
      
          this.redrawView(paperInstance);
          this.selectPath(this._selectedPath, true);

          if (window.workingAreaView) {
              window.workingAreaView.currentTool().webViewVectorCommit();
          }
      }

      toggleSegmentBezierCurveEnabled(segment) {
          if(segment.handleIn.x != 0.0 ||
              segment.handleIn.y != 0.0 ||
              segment.handleOut.x != 0.0 ||
              segment.handleOut.y != 0.0) {
              segment.handleIn = null;
              segment.handleOut = null;
          }
          else {
              segment.smooth();
              const roundedX = Math.round(segment.handleIn.x * 10) / 10;
              const roundedY = Math.round(segment.handleIn.y * 10) / 10;
              segment.handleIn.x = roundedX;
              segment.handleIn.y = roundedY;
              segment.handleOut.x = -roundedX;
              segment.handleOut.y = -roundedY;
          }
      }

      determineDragTarget(paperInstance, dragItem, point) {
          const hitResult = paperInstance.project.hitTest(point, PaperCanvas.hitOptions());
              
          if (hitResult != null) {
              switch(hitResult.type) {
                  case 'segment':
                      dragItem.item = hitResult.segment.point;
                      break;
                  case 'handle-in':
                      dragItem.item = hitResult.segment.handleIn;
                      break;
                  case 'handle-out':
                      dragItem.item = hitResult.segment.handleOut;
                      break;
                  case 'fill':
                      dragItem.item = hitResult.item;
                      break;
                  default:
                      dragItem.item = null;
              }

              dragItem.type = hitResult.type;
          }
      }

      dragTarget(paperInstance, dragItem, point, delta) {
          // Drag target if available    
          const roundedX = Math.round(delta.x * 10) / 10;
          const roundedY = Math.round(delta.y * 10) / 10;

          if (dragItem.type == 'segment') {
              dragItem.item.x += roundedX;
              dragItem.item.y += roundedY;
          }
          else if(dragItem.type == 'handle-in') {
              // Disconnected Handles
              dragItem.item.x += roundedX;
              dragItem.item.y += roundedY;

              // Mirrored Handles
              if(dragItem.bezierCurveMirrored == true) {
                  dragItem.item._owner._handleOut.x -= roundedX;
                  dragItem.item._owner._handleOut.y -= roundedY;
              }   
          }
          else if(dragItem.type == 'handle-out') {
              // Disconnected Handles
              dragItem.item.x += roundedX;
              dragItem.item.y += roundedY;

              // Mirrored Handles
              if(dragItem.bezierCurveMirrored == true) {
                  dragItem.item._owner._handleIn.x -= roundedX;
                  dragItem.item._owner._handleIn.y -= roundedY;
              }
          }
          else if(dragItem.type == 'fill') {
              dragItem.item.position.x += roundedX;
              dragItem.item.position.y += roundedY;
          }

          this.redrawView(paperInstance);
      }

      createPath(paperInstance, point) {
              // Create a Paper.js path
              this._selectedPath = new paperInstance.Path();
              // Set start point
              const start = point;
              // Give the stroke a color
              this._selectedPath.strokeColor = this.convertCSSColorRefToRGBA("var(--DefaultColorIdentifier)");
              this.cssStrokeColorRef = "--DefaultColorIdentifier";
              // Move to start and draw a line from there
              this._selectedPath.moveTo(start);
              // Deselect previous segment
              this.deselectPathSegments();
              // Select segment
              this._selectedPath.firstSegment.selected = true;
      }

      searchExistingPath(paperInstance) {
          if(paperInstance.project != null) { 
              if(paperInstance.project._children != null) {
                  if(paperInstance.project._children.length > 0) { 
                      if(paperInstance.project._children[0]._children.length > 0) {
                          return paperInstance.project._children[0]._children[0];
                      }
                  }
              }
          }
      }

      addSegment(path, point) {
          path.lineTo(point);
          this.deselectPathSegments();
          path.segments[path.segments.length-1].selected = true;
      }

      insertSegment(path, locationIndex, point) {
          if (path != null) {
              path.insert(locationIndex + 1, point);
              this.deselectPathSegments();
              path.segments[locationIndex + 1].selected = true;
          }
      }

      removeSegment() {
          const segment = this.getSelectedSegment();
          if(segment != null && segment.path != null) {
              segment.path.removeSegment(segment.index);
          }
      }

      selectPath(path, selected) {
          if (path != null) {
              path.selected = selected;
          }
      }

      getPath() {
          if(this._paperInstance.project._children.length > 0) { // Layer
              if(this._paperInstance.project._children[0]._children.length > 0) { // Path
                  // There must be a better way for deselecting existing segment selections
                  return this._paperInstance.project._children[0]._children[0];
              }
          }

          return null;
      }

      closePath() {
          const path = this.getPath();
          path.closed = !path.closed;
      }

      convertSegmentToCurve(event) {
          // double click toggle (TO DO)
          // const hitResult = this._paperInstance.project.hitTest(event.point, PaperCanvas.hitOptions());
          // if(hitResult != null) {
          //     if (hitResult.type == 'segment') {
          //         if(hitResult.segment.selected == true) {
          //             // Determine drag target
          //             this.toggleSegmentBezierCurveEnabled(hitResult.segment);
          //         }
          //     }
          // }

          const segment = this.getSelectedSegment();
          if(segment != null) {
              this.toggleSegmentBezierCurveEnabled(segment);
          }
      }

      deselectPathSegments() {
          const path = this.getPath();
          if(path != null) {
              for(var i = 0; i < path.segments.length; i++) {
                  path.segments[i].selected = false;
              }
          }
      }

      reversePath() {
          const path = this.getPath();
          if(path != null) {
              path.reverse();
          }
      }

      isFirstPathSegmentSelected() {
          const path = this.getPath();
          if(path != null) {
              if(path.segments.length > 0) {
                  if(path.segments[0].selected) {
                      return true;
                  }
              }
          }
          return false;
      }

      isLastPathSegmentSelected() {
          const path = this.getPath();
          if(path != null) {
              if(path.segments.length > 0) {
                  if(path.segments[path.segments.length-1].selected) {
                      return true;
                  }
              }
          }
          return false;
      }

      getSelectedSegment() {
          const path = this.getPath();
          if(path != null) {
              for(var i = 0; i < path.segments.length; i++) {
                  if(path.segments[i].selected == true) {
                      return path.segments[i];
                  }
              }
          }

          return null;
      }

      resetSelectedPath() {
          if (this._selectedPath != null) {
              this.selectPath(this._selectedPath, false);
              this._selectedPath = null;
          }
      }

      redrawView(paperInstance) {
          if(paperInstance.view != null) {
              paperInstance.view.draw();
          }
      }

      resizePaperCanvas(paperInstance, lastCanvasWidth, lastCanvasHeight, scaleProportionally) {
          if (scaleProportionally) {
              let newHorizontalScaleFactor = (1.0/lastCanvasWidth) * paperInstance.view.viewSize.width;
              let newVerticalScaleFactor = (1.0/lastCanvasHeight) * paperInstance.view.viewSize.height;

              for (var i = 0; i < paperInstance.project._children.length; i++) {
                  for (var k = 0; k < paperInstance.project._children[i]._children.length; k++) {
                      const item = paperInstance.project._children[i]._children[k];
                      item.scale(newHorizontalScaleFactor, newVerticalScaleFactor, new paperInstance.Point(0,0));
                  }
              }
          }
      }

      restoreSavedState(paperInstance, savedState) {
          if(savedState != "") {
              paperInstance.project.clear();
              
              let vectorJSON = this.updateFillAndStrokeColor(savedState);
              
              paperInstance.project.importJSON(vectorJSON);
              if(paperInstance.project.activeLayer.children.length > 0) {
                  this._selectedPath = paperInstance.project.activeLayer.children[0];
              }
          }
      }

      updateFillAndStrokeColor(savedState) {
          var vectorJSON = savedState["json"];
          let vectorSVG = savedState["svg"];
          
          // Retrieve SVG stroke-color (CSS color variable) from SVG represenation, get the value and pass it into the json represenation
          // Paper.js can't handle css color variables out of the box.
          var strokeColorRef = vectorSVG.match(/stroke=\"var\(--[^\)]+\)/gmi);
          if(strokeColorRef !== null) {
              strokeColorRef = strokeColorRef.toString().replace("stroke=\"var(", "");
              strokeColorRef = strokeColorRef.toString().replace(")", "");
              // Convert CSS color ref to RGBA color array with float values
              let strokeColorRGBAArray = this.convertCSSColorRefToRGBA(strokeColorRef);
              // Override in paper.js project json (it's always the same hierarchy)
              vectorJSON[0][1]["children"][0][1]["strokeColor"] = strokeColorRGBAArray;
              // Save for later (commit / abort edit)
              this.cssStrokeColorRef = strokeColorRef;
          }        
          
          // Retrieve SVG fill-color (CSS color variable) from SVG represenation, get the value and pass it into the json represenation
          // Paper.js can't handle css color variables out of the box.
          var fillColorRef = vectorSVG.match(/fill=\"var\(--[^\)]+\)/gmi);
          if(fillColorRef !== null) {
              fillColorRef = fillColorRef.toString().replace("fill=\"var(", "");
              fillColorRef = fillColorRef.toString().replace(")", "");
              // Convert CSS color ref to RGBA color array with float values
              let fillColorRGBAArray = this.convertCSSColorRefToRGBA(fillColorRef);
              // Override in paper.js project json (it's always the same hierarchy)
              vectorJSON[0][1]["children"][0][1]["fillColor"] = fillColorRGBAArray;
              // Save for later (commit / abort edit)
              this.cssFillColorRef = fillColorRef;
          }

          return vectorJSON;
      }

      saveState() {
          const json = this._paperInstance.project.exportJSON();
          const modifiedSVG = this.modifySVG(this._paperInstance.project.exportSVG());
          const xmlSerializer = new XMLSerializer();
          var svgString = xmlSerializer.serializeToString(modifiedSVG);
          svgString = svgString.replace(/"/g, '\\\"'); // Double escaping is required to put SVG inside JSON
          const jsonContainer = `{"json":${json}, "svg":"${svgString}", "lastCanvasWidth":"${this._paperInstance.project.view.viewSize.width}", "lastCanvasHeight":"${this._paperInstance.project.view.viewSize.height}"}`;

          return jsonContainer;
      }

      modifySVG(svg) {
          // Attributes needed for proper scaling
          svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`);
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
          // Don't constrain to original aspect ratio
          svg.setAttribute("preserveAspectRatio", "none");

          const paths = svg.getElementsByTagName("path");
          for (var i = 0; i < paths.length; i++) {   
              let path = paths[i];
              // Prevents stroke width distortion when scaled
              path.setAttribute("vector-effect", "non-scaling-stroke");
          }   

          const g = svg.getElementsByTagName("g");
          for (var i = 0; i < g.length; i++) {   
              let group = g[i];
              // Set CSS color refs
              if(this.cssStrokeColorRef != null) {
                  group.setAttribute("stroke", "var("+this.cssStrokeColorRef+")");
              }

              if(this.cssFillColorRef != null) {
                  group.setAttribute("fill", "var("+this.cssFillColorRef+")");
              }

              // We use RGBA 
              group.removeAttribute("stroke-opacity");
              group.removeAttribute("fill-opacity");
          }      

          return svg;
      }

      convertCSSColorRefToRGBA(colorRef) {
          var computedCSSColor = getComputedStyle(document.documentElement).getPropertyValue(colorRef);
              // Convert hexValue to RGBA
              if(computedCSSColor.match(/#/gmi)) {
                  computedCSSColor = this.convertHexValueToRGBA(computedCSSColor);
              }
              computedCSSColor = computedCSSColor.replace("rgba(", "");
              computedCSSColor = computedCSSColor.replace(")", "");
              var rgbaColorArray = computedCSSColor.split(',').map(function(number) {
                  if(number > 1.0) {
                      number = number / 255.0;
                  }
                  return parseFloat(number);
              });

          return rgbaColorArray;
      }

      convertHexValueToRGBA(hexValue){
          var rgbaColor;
          if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexValue)){
              rgbaColor= hexValue.substring(1).split('');
              if(rgbaColor.length== 3){
                  rgbaColor = [rgbaColor[0], rgbaColor[0], rgbaColor[1], rgbaColor[1], rgbaColor[2], rgbaColor[2]];
              }
              rgbaColor = '0x' + rgbaColor.join('');
              return 'rgba('+[(rgbaColor>>16)&255, (rgbaColor>>8)&255, rgbaColor&255].join(',')+',1)';
          }
          throw new Error('Bad HexValue');
      }
  }

  class GDGuideCoordinator {
      constructor() {
          this._possibleAlignmentGuides = [];
          this._guideCreators = new Set();
          this._activeAlignmentGuides = [];
          this._selections = [];
          this._boundsCache = new Map();
      }

      static get snappingTolerance() {
          return 5;
      }

      cachedBoundsForCell(cell) {
          let b =  this._boundsCache.get(cell);
          if (!b) {
              b = globalBoundsOfElement(cell.DOMElement);
              this._boundsCache.set(cell, b);    
          }
          return b;
      }

      cacheBoundsForCell(cell, bounds) {
          this._boundsCache.set(cell, bounds);
      }

      prepareWithSelections(selections) {
          this._selections = selections;
          this._possibleAlignmentGuides = [];
          let alignmentCandidates = [];

          if (selections.length == 0)
              return;

          const f = selections[0];
          alignmentCandidates = alignmentCandidates.concat(f.siblings);
          
          this._guideCreators.forEach( creator => {
              const containerGuides = creator.guidesForContainer(f.container);
              this._possibleAlignmentGuides = this._possibleAlignmentGuides.concat(containerGuides);

              alignmentCandidates.forEach( candidate => {
                  if (selections.indexOf(candidate) == -1)
                      this._possibleAlignmentGuides = this._possibleAlignmentGuides.concat(creator.guidesForCell(candidate));
              });
          });
      }

      selectionGuides() {
          if (this._selections.length == 0)  {
              return [];
          }

          let selectionGuides = [];

          this._guideCreators.forEach( guideCreator => {
              if (this._selections.length == 1) {
                  selectionGuides = selectionGuides.concat( guideCreator.guidesForCell(this._selections[0]));
              } else {
                  selectionGuides = selectionGuides.concat( guideCreator.guidesForSelections(this._selections));
              }
          });
          return selectionGuides;
      }

      updateDisplayedSmartGuidesForView(view) {
          this._activeAlignmentGuides = [];
          let selectionGuides = this.selectionGuides();

          const selectionHorizontalGuides = selectionGuides.filter( g => g.isHorizontal );
          const possibleHorizontalGuides = this._possibleAlignmentGuides.filter( g => g.isHorizontal );

          let horizontalLines = [];
          let maximumHorizontalPriority = GDAlignmentGuideZeroPriority;
          selectionHorizontalGuides.forEach( nextSelectionGuide => {
              possibleHorizontalGuides.forEach( nextPossibleAlignmentGuide => {
                  if (nextPossibleAlignmentGuide.isAlignedTo(nextSelectionGuide)) {
                      let currentPriority = Math.max(nextPossibleAlignmentGuide.priority, nextSelectionGuide.priority);
                      if (currentPriority > maximumHorizontalPriority) {
                          horizontalLines = [];
                          horizontalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                          maximumHorizontalPriority = currentPriority;
                      } else if (currentPriority == maximumHorizontalPriority) {
                          horizontalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                      }
                  } 
              });
          });
           
          const selectionVerticalGuides = selectionGuides.filter( g => g.isVertical );
          const possibleVerticalGuides = this._possibleAlignmentGuides.filter( g => g.isVertical );

          let verticalLines = [];
          let maximumVerticalPriority = GDAlignmentGuideZeroPriority;
          selectionVerticalGuides.forEach( nextSelectionGuide => {
              possibleVerticalGuides.forEach( nextPossibleAlignmentGuide => {
                  if (nextPossibleAlignmentGuide.isAlignedTo(nextSelectionGuide)) {
                      let currentPriority = Math.max(nextPossibleAlignmentGuide.priority, nextSelectionGuide.priority);
                      if (currentPriority > maximumVerticalPriority) {
                          verticalLines = [];
                          verticalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                          maximumVerticalPriority = currentPriority;
                      } else if (currentPriority == maximumVerticalPriority) {
                          verticalLines.push( nextSelectionGuide.alignmentLineTo(nextPossibleAlignmentGuide));
                      }
                  } 
              });
          });

          let lines = horizontalLines.concat(verticalLines);
          view.updateGuideLines(lines);

      }

      clearLinesForView(view) {
          view.updateGuideLines([]);
      }

      addGuideCreator(guideCreator) {
          this._guideCreators.add(guideCreator);
          guideCreator.guideCoordinator = this;
      }

      nearestDistance(selectionGuides, possibleGuides, delta) {
          let nearestDistance = Number.MAX_VALUE;
          possibleGuides.forEach( possibleGuide => {
              selectionGuides.forEach( selectionGuide => {
                  if (possibleGuide.canSnapTo(selectionGuide)) {
                      const distance = possibleGuide.distanceTo(selectionGuide);
                      if (Math.abs( distance - delta) < Math.abs(nearestDistance)) {
                          nearestDistance = distance;
                      }
                  }
              });
          });

          return nearestDistance;
      }

      snapDelta(dx, dy) {
          const selectionGuides = this.selectionGuides();
          const verticalSelectionGuides = selectionGuides.filter( g => g.isVertical );
          const possibleVerticalGuides = this.possibleAlignmentGuides.filter( g => g.isVertical );

          const nearestVerticalDistance = this.nearestDistance(verticalSelectionGuides, possibleVerticalGuides, dy);
          if (Math.abs(nearestVerticalDistance - dy) < GDGuideCoordinator.snappingTolerance) {
              dy = nearestVerticalDistance;
          }

          const horizontalSelectionGuides = selectionGuides.filter( g => g.isHorizontal );
          const possibleHorizontalGuides = this.possibleAlignmentGuides.filter( g => g.isHorizontal );

          const nearestHorizontalDistance = this.nearestDistance(horizontalSelectionGuides, possibleHorizontalGuides, dx);
          if (Math.abs(nearestHorizontalDistance - dx) < GDGuideCoordinator.snappingTolerance) {
              dx = nearestHorizontalDistance;
          }

          this._selections.forEach( c => {
              const b = this._boundsCache.get(c);
              if (b) {
                  b.top += dy;
                  b.left += dx;
                  this._boundsCache.set(c,b);
              }
          });

          return [dx,dy];
      }

      nearestAlignmentGuidePair(selectionGuides, possibleGuides) {
          let nearestDistance = Number.MAX_VALUE;
          let nearestGuide, selectionGuide;

          possibleGuides.forEach( nextPossibleGuide => {
              selectionGuides.forEach( nextSelectionGuide => {
                  if (nextPossibleGuide.canSnapTo(nextSelectionGuide)) {
                      const distance = nextPossibleGuide.distanceTo(nextSelectionGuide);
                      if (Math.abs(distance) < Math.abs(nearestDistance)) {
                          nearestDistance = distance;
                          nearestGuide = nextPossibleGuide;
                          selectionGuide = nextSelectionGuide;
                      }
                  }
              });
          });

          return [nearestGuide, selectionGuide];
      }

      snapVertical(pos,side) {
          const selectionGuides = this.selectionGuides().filter( g => g.isVertical && g.side == side);
          const possibleGuides = this.possibleAlignmentGuides.filter( g => g.isVertical );

          let [nearestGuide, selectionGuide] = this.nearestAlignmentGuidePair(selectionGuides, possibleGuides);
          if (!nearestGuide || !selectionGuide) {
              return pos;
          }

          if (Math.abs(nearestGuide.position - pos) < GDGuideCoordinator.snappingTolerance)  {
              return nearestGuide.position;
          }

          return pos;
      }

      snapHorizontal(pos,side) {
          const selectionGuides = this.selectionGuides().filter( g => g.isHoriztontal && g.side == side);
          const possibleGuides = this.possibleAlignmentGuides.filter( g => g.isHoriztontal );

          let [nearestGuide, selectionGuide] = this.nearestAlignmentGuidePair(selectionGuides, possibleGuides);
          if (!nearestGuide || !selectionGuide) {
              return pos;
          }

          if (Math.abs(nearestGuide.position - pos) < GDGuideCoordinator.snappingTolerance)  {
              return nearestGuide.position;
          }

          return pos;
      }


      get possibleAlignmentGuides() {
          return this._possibleAlignmentGuides;
      }
  }

  class GDGuideCreator {
      constructor() {
          this.guideCoordinator = undefined;
      }

      guidesForCell(cell) {
          return [];
      }

      guidesForContainer(container) {
          return [];
      }

      guidesForSelections(selections) {
          return [];
      }

      createMultipleCellObject(selections) {
          let minX, minY, maxX, maxY;
          selections.forEach( c => {
              let b = this.guideCoordinator.cachedBoundsForCell(c);
              if (b.top < minY || !minY) minY = b.top;
              if (b.left < minX || !minX) minX = b.left;
              if (b.top + b.height > maxY || !maxY) maxY = b.top + b.height;
              if (b.left + b.width > maxX || !maxX) maxX = b.left + b.width;
          });

          const bounds = {top:minY, left: minX, width: maxX - minX, height: maxY - minY};

          let o = {
              cell: selections[0]
          };

          this.guideCoordinator.cacheBoundsForCell(o,bounds);
          return o;
      }
  }


  class GDEdgeGuideCreator extends GDGuideCreator {
      guidesForContainer(container) {
          const bounds = this.guideCoordinator.cachedBoundsForCell(container);
          return [
              new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.top, GDAlignmentGuideTopSide),
              new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, container, bounds.top + bounds.height, GDAlignmentGuideBottomSide)
          ];
      }
      guidesForCell(cell) {
          const bounds = this.guideCoordinator.cachedBoundsForCell(cell);
          return [
              new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.top, GDAlignmentGuideTopSide),
              new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, cell, bounds.top + bounds.height, GDAlignmentGuideBottomSide)
          ];
      }

      guidesForSelections(selections) {
          let o = this.createMultipleCellObject(selections);
          let bounds = this.guideCoordinator.cachedBoundsForCell(o);
          return [
              new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.top, GDAlignmentGuideTopSide),
              new GDVerticalEdgeAlignmentGuide(this.guideCoordinator, o, bounds.top + bounds.height, GDAlignmentGuideBottomSide)
          ];
      }
  }

  /**
   * Wrapper around intersection observer-API, used for Visible/Invisible in 
   * viewport events
   */
  class GDCellIntersectionObserver {
      constructor() {
          this._observedCellCallbacks = new Map();
          let callback = (entries, observer) => {
              entries.forEach( entry => {
                  this.executeCallBackForEntry(entry);
              });
          };

          this._intersectionObserver = new IntersectionObserver(callback);
      }

      executeCallBackForEntry(entry) {
          let callbacks = this._observedCellCallbacks.get(entry.target);
          if (callbacks != undefined) {
              callbacks.forEach( item => item.callback(entry) );
          }
      }

      /**
       * calls fn(InterSectionObserverEntry) if something changed
       *
       * @param {HTMLElement} domElement
       * @param {GDEventHandler} eventHandler
       * @param {Function} fn
       */
      observeIntersection(domElement, eventHandler, fn) {
          let existingCallbacks = this._observedCellCallbacks.get(domElement);  
          const observeEntry = {callback: fn, eventHandler: eventHandler};
          if (existingCallbacks == undefined) { 
              this._intersectionObserver.observe(domElement);
              this._observedCellCallbacks.set(domElement, [observeEntry]);
          } else {
              existingCallbacks.push(observeEntry);
          }
      }

      /**
       * remove callbacks for the given Element and event handler
       *
       * @param {HTMLElement} domElement
       * @param {GDEventHandler} eventHandler
       */
      unobserveIntersection(domElement, eventHandler) {
          let existingCallbacks = this._observedCellCallbacks.get(domElement);  
          if (existingCallbacks == undefined) {
              return;
          }

          const i = existingCallbacks.findIndex( e => e.eventHandler == eventHandler);
          if (i == -1)  {
              return; 
          }

          existingCallbacks.splice(i,1);
          if (existingCallbacks.length == 0) {
              this._intersectionObserver.unobserve(domElement);
              this._observedCellCallbacks.delete(domElement);
          }
      }

  }

  /**
      counterpart of the Tool in Antetype. Most of the events are transferred
      to the Antetype-classes. 
  */
  class GDTool {
      constructor(at) {
          this.at = at;
      }

      mouseDown(e) {
          
          if (window.workingAreaView)  {
              var d = transferEvent(e);
              window.workingAreaView.currentTool().webMouseDown(d);
          }
      }

      mouseUp(e) {
          if (window.workingAreaView)  {
              var d = transferEvent(e);
              window.workingAreaView.currentTool().webMouseUp(d);
          }
      }

      mouseDoubleClick(e) {
          if (window.workingAreaView) {
              var d = transferEvent(e);
              d["clickCount"] = 2;
              window.workingAreaView.currentTool().webMouseUp(d);
          }
      }

      mouseDragged(e) {
          if (window.workingAreaView) {
              var d = transferEvent(e);
              window.workingAreaView.currentTool().webMouseDragged(d);
          } 
      }
      mouseMove(e) {}
      mouseClick(e) {}

      mouseEnter(e) {}

      contextMenu(e) {
      }

      keyDown(e) {}

      keyUp(e) { } 
      keyPress(e) {} 

      scroll(e) { }

      touchStart(e) {}
      tochEnd(e) {}
      touchEnter(e) {}
      touchLeave(e) {}
      touchMove(e) {}

      activate() {}
      deactivate() {}
      isRunTool() {
          return false;
      }

      screenWillChange() {}       // called before screen-change
      screenDidChange(newScreen) {} // called after screen-change
      executeEventHandler(eventHandler, event) {}
  }

  class GDSelectionTool extends GDTool {
      transferKeyEvent(e) {
          var keyIdentifier = e.keyIdentifier;
          if (keyIdentifier == "U+0009") 
              keyIdentifier = "Tab";
          if (keyIdentifier == "U+0008") 
              keyIdentifier = "Backspace";


          if (keyIdentifier == "Tab") {
              e.preventDefault();
          }

          if (e.metaKey && (keyIdentifier == "Up" || keyIdentifier == "Down")) {
              e.preventDefault();
          }

          var d = transferEvent(e);
          d.keyCode = e.keyCode;
          d.key = keyIdentifier;
          return d;
      }

      keyUp(e) {
          var d = this.transferKeyEvent(e);
          if (window.workingAreaView)
              window.workingAreaView.currentTool().webKeyUp(d);
      }

      keyDown(e) {
          var d = this.transferKeyEvent(e);
          if (window.workingAreaView) {
              window.workingAreaView.currentTool().webKeyDown(d);
              
              // Antetype Shortcut Previous/Next Screen
              if (e.altKey && e.metaKey && (e.key == "ArrowLeft" || e.key == "ArrowRight")) {
                  return;
              }
              // for keys handled by Antetype don't use the browser behavior. See #133
              else if (e.key == "Enter" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp") {
                 e.preventDefault();
              }
          }
      }
  }

  /**
   * this tool does not transfer everything to Objective-C-side, but handles
   * all for itself. 
   *
   * Work in progress (enable in Develop-Menu)
   */
  class GDNativeSelectionTool extends GDTool {
      constructor(at) {
          super(at);
          this._selectOnMouseUp = false;
      }
      figureToSelectForFigure(f) {
          let parents = f.parents;
          let rootCellParents = parents.filter( p => p.isRootInstanceCell && !p.isScreen && !p.isBasicCell);

          if (rootCellParents.length == 0) return f;

          let rootCellToSelect = rootCellParents[0];
          const widgetIsAlreadySelected = this.at.selectedObjects.filter( c => rootCellToSelect.deepOrderedComponents.indexOf(c) != -1).length > 0;

          if (widgetIsAlreadySelected) return f;

          return rootCellToSelect;
      }

      selectOnMouseUp(f) {
          for (let cell of this.at.selectedObjects) {
              if (!cell.isScreen) {
                  if (cell.deepOrderedComponents.indexOf(f) != -1) {
                      return true;
                  }
              }
          }
          return false;
      }

      selectFigureForEvent(cell, e) {
          const toggleSelectiom = e.shiftKey || e.metaKey;

          if (toggleSelectiom) {
              const index = this.at.selectedFigures.indexOf(cell);
              const cellIsSelected = index != -1;
              const newSelection = this.at.selectedFigures.slice();

              if (cellIsSelected) {
                  newSelection.splice(index,1);
              } else {
                  newSelection.push(cell);
              }
              this.at.selectFigures(newSelection);

              const idStrings = this.at.selectedFigures.map( c => c.objectID).join();
              this.at.send("select/" + idStrings);
          } else {
              this.at.selectFigures([cell]);
              this.at.send("select/" + cell.objectID);    
          }
      }

      mouseDragged(e) {
          // only for now:
          if (!targetIDFromEventTarget(e.target)) return;

          let dragTool = new GDNativeFigureDragTool(this.at, e);
          this.at.setCurrentTool(dragTool);
          dragTool.mouseDragged(e);
          
      }

      mouseDown(e) {
          if (e.target && e.target.handle) {
              let handleDragTool = new GDNativeHandleDragTool(this.at,e);
              this.at.setCurrentTool(handleDragTool);
              //handleDragTool.mouseDragged(e);
              return;
          }

          this._selectOnMouseUp = false;
          let targetId = targetIDFromEventTarget(e.target);
          if (targetId) {
              let element = document.getElementById(targetId);
              let cell = element.figure;

              cell = this.figureToSelectForFigure(cell);

              this._selectOnMouseUp = this.selectOnMouseUp(cell);
              if (!this._selectOnMouseUp) {
                  this.selectFigureForEvent(cell, e);
              }
          } else if (e.target == this.at.screenElement) {
              this.at.send("select/" + document.body.id);
              let selectionRectTool = new GDNativeSelectionRectTool(this.at, e);
              this.at.setCurrentTool(selectionRectTool);
          }
       }

      mouseUp(e) {
          if (this._selectOnMouseUp) {
              let targetId = targetIDFromEventTarget(e.target);
              if (targetId) {
                  let element = document.getElementById(targetId);
                  let cell = element.figure;
      
                  cell = this.figureToSelectForFigure(cell);
                  this.selectFigureForEvent(cell,e);
              }
          }
      }

      handleTab(e) {
          const selection = this.at.selectedFigures;
          if (selection.length == 0) {
              return;
          }

          let selectedCell = selection[selection.length-1];
          let container = selectedCell.container;

          let visibleCells = container.orderedComponents.filter( c => c.getProperty("isDisplay") && c.getProperty("isVisible"));
          if (visibleCells.length == 0) {
              return;
          }

          e.preventDefault();

          let index = visibleCells.indexOf(selectedCell);
          if (index == -1) {
              index = 0;
          }

          let nextCell = null;

          if (e.shiftKey) {
              if (index > 0 && index < visibleCells.length) {
                  nextCell = visibleCells[index-1];
              } 
              if (nextCell == null) {
                  nextCell = visibleCells[visibleCells.length-1];
              }
          } else {
              if (index < visibleCells.length - 1) {
                  nextCell = visibleCells[index+1];
              }
              if (nextCell == null) {
                  nextCell = visibleCells[0];
              }
          }

          this.at.selectFigures([nextCell]);
          this.at.send("select/" + nextCell.objectID);    
      }

      handleArrowDown() {
          const selection = this.at.selectedObjects;
          if (selection.length == 0)
              return;

          const selectedCell = selection[selection.length-1];
          let visibleCells = selectedCell.orderedComponents.filter( c => c.getProperty("isDisplay") && c.getProperty("isVisible"));
          if (visibleCells.length == 0) {
              return;
          }

          const nextCell = visibleCells[0];
          this.at.selectFigures([nextCell]);
          this.at.send("select/" + nextCell.objectID);    
      }

      handleArrowUp() {
          const selection = this.at.selectedFigures;
          if (selection.length == 0)
              return;

          const selectedCell = selection[selection.length-1];
          const container = selectedCell.container;

          if (!container) 
              return;

          this.at.selectFigures([container]);
          this.at.send("select/" + container.objectID);    
      }

      keyDown(e) {
          if (e.key == "Delete" || e.key == "Backspace") {
              this.at.send("/deleteSelection");
              e.preventDefault();
          } else if (e.key == "Tab") {
              this.handleTab(e);
          } else if (e.key == "ArrowDown" && e.metaKey) {
              this.handleArrowDown();
              e.preventDefault();
          } else if (e.key == "ArrowUp" && e.metaKey) {
              this.handleArrowUp();
              e.preventDefault();
          } else if (e.key == "xEnter") { // later ...
              if (this.at.selectedFigures.length > 0) {
                  const cell = this.at.selectedFigures[0];
                  const textContent = cell.getProperty("textString");
                  if (textContent && textContent.length > 0) {
                      this.at.editTextOfFigure(cell);
                  }
              }
          }
      }
  }

  class GDNativeHandleDragTool extends GDTool {
      constructor(at, event) {
          super(at);
          this.guideCoordinator = new GDGuideCoordinator();
          this.guideCoordinator.addGuideCreator( new GDEdgeGuideCreator());
          this.guideCoordinator.prepareWithSelections(this.at.selectedObjects);

          this.handle = event.target.handle;
          this.handle.startDragAtPoint(this, scaleUsingZoomFactor(event.clientX), scaleUsingZoomFactor(event.clientY));
          this.originalBounds = this.boundsOfCell(this.handle.owner);

      }

      deactivate() {
          super.deactivate();
          this.guideCoordinator.clearLinesForView(this.at);
      }

      boundsOfCell(cell) {
          return {
              x:  cell.valueForKeyInStateWithIdentifier("x",cell.activeStateIdentifier),
              y: cell.valueForKeyInStateWithIdentifier("y",cell.activeStateIdentifier),
              width: cell.valueForKeyInStateWithIdentifier("width",cell.activeStateIdentifier),
              height: cell.valueForKeyInStateWithIdentifier("height",cell.activeStateIdentifier)
          };
      }

      mouseDragged(e) {
          this.handle.dragged(this, scaleUsingZoomFactor(e.clientX), scaleUsingZoomFactor(e.clientY));
          this.constrained = e.shiftKey;
          this.centered = e.altKey;
          this.guideCoordinator.updateDisplayedSmartGuidesForView(this.at);
      }

      mouseUp(e) {
          const cell = this.handle.owner;
          const newBounds = this.boundsOfCell(cell);
          let changes = {};
          if (newBounds.x != this.originalBounds.x) changes.x = newBounds.x;
          if (newBounds.y != this.originalBounds.y) changes.y = newBounds.y;
          if (newBounds.width != this.originalBounds.width) changes.width = newBounds.width;
          if (newBounds.height != this.originalBounds.height) changes.height = newBounds.height;

          let changesString = JSON.stringify(changes);
          this.at.send("setBounds/" + changesString);

          this.at.restoreSelectionTool();
      }
  }

  // Compensate for using the CSS-zoom-property if the drawing board is zoomed.
  function scaleUsingZoomFactor(n) {
      if (document.body.style.zoom) {
          return n / document.body.style.zoom
      }
      return n;
  }

  /**
   * Tool for dragging cells in free-layout. This is part of #1050 (using only native
   * JavaScript for event handling)
   */
  class GDNativeFigureDragTool extends GDTool {
      constructor(at, event) {
          super(at);
          this.guideCoordinator = new GDGuideCoordinator();
          this.guideCoordinator.addGuideCreator( new GDEdgeGuideCreator());
          this.guideCoordinator.prepareWithSelections(this.at.selectedObjects);

          let draggedCell = this.at.selectedObjects[0];
          this.oldX = draggedCell.valueForKeyInStateWithIdentifier("x", draggedCell.activeStateIdentifier);
          this.oldY = draggedCell.valueForKeyInStateWithIdentifier("y", draggedCell.activeStateIdentifier);

          this.lastX = scaleUsingZoomFactor(event.clientX);
          this.lastY = scaleUsingZoomFactor(event.clientY);
      }

      activate() {
          this.at.hideHandlesTemporarily();
      }

      deactivate() {
          this.at.showHandlesTemporarily();
          this.guideCoordinator.clearLinesForView(this.at);
      }


      mouseDragged(e) {
          this.guideCoordinator.updateDisplayedSmartGuidesForView(this.at);

          // not sure why, but Event.movementX/Y behaves strange in the WebView, looks like it is somehow scaled ....
          // therefor we calculate it here: 
          let movementX = scaleUsingZoomFactor(e.clientX) - this.lastX;
          let movementY = scaleUsingZoomFactor(e.clientY) - this.lastY;
          this.lastX = scaleUsingZoomFactor(e.clientX);
          this.lastY = scaleUsingZoomFactor(e.clientY);

          let [dx, dy] = this.guideCoordinator.snapDelta(movementX, movementY);
          this.at.selectedObjects.forEach(c => {
              let x = c.valueForKeyInStateWithIdentifier("x", c.activeStateIdentifier);
              let y = c.valueForKeyInStateWithIdentifier("y", c.activeStateIdentifier);

              x += dx;
              y += dy;

              this.at.cellSetPropertyInState(c,"x",x, c.activeState);
              this.at.cellSetPropertyInState(c,"y",y, c.activeState);
          });
      }

      mouseUp(e) {
          let draggedCell = this.at.selectedObjects[0];
          let currentX = draggedCell.valueForKeyInStateWithIdentifier("x", draggedCell.activeStateIdentifier);
          let currentY = draggedCell.valueForKeyInStateWithIdentifier("y", draggedCell.activeStateIdentifier);


          let deltaX = currentX - this.oldX;
          let deltaY = currentY - this.oldY;

          this.at.send(`moveFigures/{"x":${deltaX}, "y":${deltaY}}`);

          this.at.restoreSelectionTool();
      }
  }


  class GDFigureDragTool extends GDTool {
      activate() {
          this.at.hideHandlesTemporarily();
      }

      deactivate() {
          this.at.showHandlesTemporarily();
      }
  }

  class GDHandleDragTool extends GDTool {
      activate() {
          this.at.hideHandlesTemporarily();
      }

      deactivate() {
          this.at.showHandlesTemporarily();
      }
  }


  class GDTextTool extends GDTool {

      // issue 11, little hack to get at least new-lines.
      // We add span inside the normal text span for editing
      // afterwards we change the <div> to <br> ....
      editTextOfFigure(f) {
          var span = this.at.assureTextSpan(f);
          var editSpan = span.contentSpan;
          editSpan.contentEditable = true;
          editSpan.style.webkitUserSelect = "text";
          editSpan.style.minWidth = "1px";    // to see the textcursor
          editSpan.style.pointerEvents= "auto";
          editSpan.focus();
          this.editSpan = editSpan;
          this.textFigure = f;
          
          // Issue #120 plain text paste:
          this.pasteHandler = function(e) {
                  // cancel paste
                  e.preventDefault();
                  
                  //  get text representation of clipboard
                  var text = e.clipboardData.getData("text/plain");
                  
                  // insert text manually
                  document.execCommand("insertHTML", false, text);
          };

          editSpan.addEventListener("paste", this.pasteHandler);
          if (editSpan.innerText.length > 0)
              document.execCommand("selectAll", true, null);
      }

      commitTextInAntetype() {
          if (window.workingAreaView) {

              // workaround for #469: The browser moves the span so that the cursor 
              // is visible. This sometimes changes the layout, we hide and show the 
              // cell which forces a relayout. Not ideal, but seems to work. 

              const element = this.textFigure.DOMElement;
              const oldDisplay = element.style.display;
              element.style.display = "none";
              window.workingAreaView.currentTool().webViewTextCommit();

              // even hackier: the second issue on #469 only works with a small timeout
              // This is likely to break ... 
              window.setTimeout(() => element.style.display = oldDisplay, 1);
          }
      }

      mouseDown(e) {
          if (e.target != this.editSpan) {
              super.mouseDown(e);
              e.preventDefault();
              return;
          }
      }

      keyDown(e) {
          // enter or cmd-return:
          if (e.keyIdentifier == "Enter" && (e.metaKey  || e.keyLocation == KeyboardEvent.DOM_KEY_LOCATION_NUMPAD)) {
              this.commitTextInAntetype();
              e.preventDefault();
          }

          if (e.keyCode == 9) { // tab
              this.commitTextInAntetype();
              e.preventDefault();
          }

          if (e.key == "Escape" || e.key == "Cancel") {
              if (window.workingAreaView) {
                  window.workingAreaView.currentTool().webViewTextAbort();
                  e.preventDefault();
              }
          }

          // Issue #526 undo while editing text (works on 10.14.2, but bypasses the Antetype-undo-stack)
          // needs testing on 10.13 ... 
          if (e.metaKey && e.key == "z") {
              if (e.shiftKey) {
                  document.execCommand("redo");
              } else {
                  document.execCommand("undo");
              }
              e.preventDefault();
          }

      }

      /**
       * returns the edited text (replacing div's with <br> (since we currently use contentEditable 
       * for editing on the canvas. 
       */
      get currentEditText() {
          return stringFromContentEditable(this.editSpan);
      }

      set currentEditText(s) {
          this.editSpan.innerHTML = s;
      }

      abortEdit() {
          if (this.editSpan) {
              this.editSpan.blur();
              this.editSpan.contentEditable = false;
              this.editSpan.style.webkitUserSelect = "none";
              this.editSpan.style.minWidth = "";
              this.editSpan.removeEventListener("paste", this.pasteHandler);
          }
          this.textFigure = undefined;
          this.editSpan = undefined;
      }

      deactivate() {
          this.abortEdit();
      }


  }


  class GDVectorTool extends GDTool {

      editVectorOfFigure(f) {
          this.at.replaceSVGWithCanvas(f.DOMElement);
          this.atPaperCanvas = new PaperCanvas(f.DOMElement.firstChild, f.vectorJSONInStateWithIdentifier(f.activeStateIdentifier));
          const lastCanvasSize = f.lastCanvasSizeInStateWithIdentifier(f.activeStateIdentifier);
          this.atPaperCanvas.resizePaperCanvas(this.atPaperCanvas._paperInstance, lastCanvasSize[0], lastCanvasSize[1], true);
          this.paperCanvasContainer = f.DOMElement;
          this.paperCanvasCell = f;
      }

      updateVectorCellContent() {
          this.atPaperCanvas.restoreSavedState(this.atPaperCanvas._paperInstance, this.paperCanvasCell.vectorJSONInStateWithIdentifier(this.paperCanvasCell.activeStateIdentifier));
          const lastCanvasSize = this.paperCanvasCell.lastCanvasSizeInStateWithIdentifier(this.paperCanvasCell.activeStateIdentifier);
          this.atPaperCanvas.resizePaperCanvas(this.atPaperCanvas._paperInstance, lastCanvasSize[0], lastCanvasSize[1], true);
      }

      commitVector() {
          if (window.workingAreaView) {
              window.workingAreaView.currentTool().webViewVectorCommit();
          }
      }

      commitVectorInAntetype() {
          if (window.workingAreaView) {
              window.workingAreaView.currentTool().webViewVectorCommitAndAbortEdit();
          }
      }

      mouseDown(e) {
          if (e.target.nodeName.toLowerCase() != "canvas" && e.target.className != "handle") {
              window.workingAreaView.currentTool().webViewVectorCommitAndAbortEdit();
              super.mouseDown(e);
              e.preventDefault();
              return;
          }
      }

      keyDown(e) {
          // enter or cmd-return:
          if (e.keyIdentifier == "Enter") {
              this.commitVectorInAntetype();
              e.preventDefault();
          }

          // Abort editing
          if (e.key == "Escape" || e.key == "Cancel") {
              if (window.workingAreaView) {
                  window.workingAreaView.currentTool().webViewVectorAbort();
                  e.preventDefault();
              }
          }

          // Key C = Close path (toggle)
          if (e.keyIdentifier == "U+0043") {
              if (window.workingAreaView) {
                  e.preventDefault();
                  return;
              }
          }

          // Key X = Convert to curve (toggle)
          if (e.keyIdentifier == "U+0058") {
              e.preventDefault();
              return;
          }
      }

      get currentEditVector() {
          return this.atPaperCanvas.saveState();
      }

      set currentEditVector(s) { }

      abortEdit() {
          if(this.atPaperCanvas != null) {
              const svg = this.atPaperCanvas.modifySVG(this.atPaperCanvas._paperInstance.project.exportSVG());
              this.at.replaceCanvasOrSVGWithSVG(this.paperCanvasContainer, svg);
              this.atPaperCanvas = null;   
          }
      }

      deactivate() {
          this.abortEdit();
      }
  }

  /**
   * the tool used while the prototype is running. Handles the whole interaction-stuff. 
   * This is the only tool in LivePreview and WebViewer, in Antetype itself
   * \see GDInplaceRunTool
   */
  class GDRunTool extends GDTool {
      constructor(at) {
          super(at);
          this._unloadEventHandlers= [];
          this._highlightRects = [];
          this._intersectionObserver = null;
      }

      handleEvents(domElement, type, event) {
          if (domElement == null)  {
              return false;
          }

          if (domElement.figure == undefined && domElement.parentNode) {
              return this.handleEvents(domElement.parentNode, type, event);
          }
          let cell = domElement.figure;
          if (cell != undefined) {
              cell = cell.rootInstanceCell;
          }
          if (cell == undefined || !cell.eventHandlers[type]) {
              return this.handleEvents(domElement.parentNode, type, event);
          }

          let eventHandlers = cell.eventHandlers[type];
          if (eventHandlers) {
              let handled = false;
              eventHandlers.forEach(e => {
                  if (e.hasActions) {
                      e.execute(event);
                      handled = true;
                  }
              });

              return handled;
          }

          return false;
      }

      mouseClick(e) {
          this.handleEvents(e.target, GDMouseClickEventType,e);
      }

      mouseDown(e) {
          this.handleEvents(e.target, GDMouseDownEventType,e);
      }

      mouseUp(e) {
          this.handleEvents(e.target, GDMouseUpEventType,e);
      }

      mouseDoubleClick(e) {
          this.handleEvents(e.target, GDDoubleClickEventType,e);
      }


      touchStart(e) {
          this.handleEvents(e.target, GDTouchStartEventType,e);
      }
      
      touchEnd(e) {
          this.handleEvents(e.target, GDTouchEndEventType,e);
      }

      touchEnter(e) {
          this.handleEvents(e.target, GDTouchEnterEventType,e);
      }

      touchLeave(e) {
          this.handleEvents(e.target, GDTouchLeaveEventType,e);
      }

      touchMove(e) {
          this.handleEvents(e.target, GDTouchMoveEventType,e);
      }

      scroll(e) {
          this.handleEvents(e.target, GDScrollEventType,e);
      }

      contextMenu(e) {
          var handledClick = this.handleEvents(e.target, GDRightMouseClickEventType,e);
          if (handledClick) {
              e.preventDefault();
          }
      }

      shouldHighlightDOMElement(d) {
          const style = window.getComputedStyle(d);
          if (style.visibility == "hidden") {
              return false;
          }
          
          let parent = d.parentElement;
          while (parent) {
              const parentStyle = window.getComputedStyle(parent);
              if (parentStyle.display == "none") {
                  return false;
              }

              parent = parent.parentElement;
          }

          return true;
      }

      addHighlightCell(domElement) {
          var r = globalBoundsOfElement(domElement); 
          var highlight = document.createElement("div");
          highlight.className = "GDClickable";
          sizeHighlightCell(highlight, r);
          document.body.appendChild(highlight);
          this._highlightRects.push(highlight);
      }

      keyDown(e) {
          if (e.key === "Alt") {
              var actionCells = this.domElementsWithEventHandler(GDMouseClickEventType);
              actionCells.forEach((d) => {
                  if (this.shouldHighlightDOMElement(d)) {
                      this.addHighlightCell(d);
                  }
              });
          }
          this.handleKeyEventsOfType(GDKeyDownEventType,e);
      }

      keyUp(e) {
          if (e.key === "Alt") {
              for (var i=0; i<this._highlightRects.length; i++) {
                  var h = this._highlightRects[i];
                  if(h.parentElement != null) {
                      h.parentElement.removeChild(h);
                  }
              }
              this._highlightRects = [];
          }
          this.handleKeyEventsOfType(GDKeyUpEventType,e);
      }

      handleKeyEventsOfType(keyEventType, e) {
          const actionCells = this.domElementsWithEventHandler(keyEventType);
          actionCells.forEach((domElement) => {
              const figure = domElement.figure;
              if (figure) {
                  const eventHandlers = figure.eventHandlers[keyEventType];
                  eventHandlers.forEach(eventHandler => {
                      if (eventHandler.parameter == e.key) {
                          eventHandler.execute(e);
                          e.preventDefault();
                      }
                  });
              }
          });
      }

      keyPress() {
      }
     
      mouseDragged() { }

      domElementsWithEventHandler(eventType) {
          const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, function(e) {
              return e.figure && e.figure.hasActionsOfEventType(eventType) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          });

          let domElement = null;
          let result = [];
          while ((domElement = iterator.nextNode()) != null) {
              result.push(domElement);
          }
          return result;
      }

      activate() {
          var clickCells = this.domElementsWithEventHandler(GDMouseClickEventType);
          for (var i=0; i<clickCells.length; i++) {
              var domElement = clickCells[i];
              domElement.style.cursor = "pointer";
          }

      }

      changePseudoStates(screen) {
          if (screen) {
              screen.deepOrderedComponents.forEach(c => {
                  if (c.isRootInstanceCell && c.activeState.isPseudoState) {
                      let normalState = c.widget.states.find(s => s.type == GDState.GDNormalStateType);
                      this.at.changeStateOfCell(c, normalState, "");
                  }
              });
          }
      }

      removePointerCursors() {
          const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, 
                  e => e.nodeName.toLowerCase() === "cell" && e.figure && Object.keys(e.figure.eventHandlers).length > 0);

          let domElement = null;
          while ((domElement = iterator.nextNode()) != null) {
              const figure = domElement.figure;
              if (figure.hasActionsOfEventType(GDMouseClickEventType)) {
                  domElement.style.cursor = "";
              }
          }
      }

      cleanupActions() {
          const iterator = document.createNodeIterator(this.at.screenElement, NodeFilter.SHOW_ELEMENT, 
                  e =>  e.figure && e.figure.eventHandlers && Object.keys(e.figure.eventHandlers).length > 0);

          let domElement = null;
          while ((domElement = iterator.nextNode()) != null) {
              const figure = domElement.figure;

              figure.eventHandlersDo(e => e.cleanup());
          }
      }

      deactivate() {
          this.cleanupActions();
          this.removePointerCursors();
      }

      isRunTool() {
          return true;
      }
      
      unloadEventHandlers() {
          const domElements = this.domElementsWithEventHandler(GDUnloadEventType);
          let result = [];
          domElements.forEach(domElement => {
              let eventHandlers = domElement.figure.eventHandlers[GDUnloadEventType];
              eventHandlers.forEach(e => result.push(e));
          });
          return result;
      }

      screenWillChange() {
          this._unloadEventHandlers.forEach((eventHandler) => {
              eventHandler.execute();
          });
          this.cleanupActions();
      }

      screenDidChange(newScreen) {
          // #662 if a goto-screen action was executed make sure we let the actions finish
          // before we execute the load-actions. Not quiet sure if this is the right 
          // place for this. 
          window.setTimeout( () => {
              this._unloadEventHandlers = this.unloadEventHandlers(newScreen);
              const domElementsWithLoadEventHandlers = this.domElementsWithEventHandler(GDLoadEventType);
              domElementsWithLoadEventHandlers.forEach((domElement) => {
                  this.handleEvents(domElement, GDLoadEventType);
              });
          },0);

      }

      executeEventHandler(eventHandler, event) {
          eventHandler.execute(event);
      }

      startEventHandlers(eventHandlers) {
          eventHandlers.forEach((eventHandler) => {
              eventHandler.forEach((e) => {
                  e.startRepeat();
              });
          });
      }

      stopEventHandlers(eventHandlers) {
          eventHandlers.forEach((eventHandler) => {
              eventHandler.forEach((e) => {
                  e.stopRepeat();
              });
          });
      }

      toggleEventHandlers(eventHandlers) {
          eventHandlers.forEach((eventHandler) => {
              eventHandler.forEach((e) => {
                  e.toggleRepeat();
              });
          });
      }


      /* intersection -observer */
      observeIntersection(domElement, eventHandler, fn) {
          if (this._intersectionObserver == null) {
              this._intersectionObserver = new GDCellIntersectionObserver();
          } 
          this._intersectionObserver.observeIntersection(domElement, eventHandler, fn);

      }


      unobserveIntersection(domElement, eventHandler) {
          if (this._intersectionObserver == null) {
              return;
          }
          this._intersectionObserver.unobserveIntersection(domElement, eventHandler);
      }
  }

  /**
   * the run tool inside Antetype (In place presentation mode).
   */
  class GDInplaceRunTool extends GDRunTool {

      constructor(at) {
          super(at);
          this._visitedScreens = new Set();
      }

      activate() {
          super.activate();

          // in-place-presentation mode. Run-Tool is either switched while entering 
          // ipp, or after switching to Selection-mode and and back (d/r). Make sure
          // the pseudostates are correctly set, and disable active pseudo-states:

          this.at.enablePseudoStates();

          let screen = this.at.currentScreen;
          this.changePseudoStates(screen);
      }

      deactivate() {
          super.deactivate();
          this.at.disablePseudoStates();
      }

      screenDidChange(newScreen) {
          super.screenDidChange(newScreen);

          if (!this._visitedScreens.has(newScreen)) {
              this.changePseudoStates(newScreen);
              this._visitedScreens.add(newScreen);
          }
      }

      startPresentationMode() {
          this._visitedScreens = new Set();
      }

      stopPresentationMode() {
          this.at.disablePseudoStates();
          this._visitedScreens.forEach(s => this.at.deleteCachedScreenWithObjectID(s.objectID));
      }

  }



  class GDSelectionRectTool extends GDTool {

      activate() {
          var r = document.createElement("div");
          r.className = "selectionRect";
          this.selectionRect = r;
          document.body.appendChild(this.selectionRect);
      }

      deactivate() {
          if (this.selectionRect.parentNode != null) {
              if(document.body.contains(this.selectionRect)) {
                  document.body.removeChild(this.selectionRect);
              }
          }
      }

      mouseDragged(e) {
          GDTool.prototype.mouseDragged.call(this, e);
          if (window.workingAreaView) {
              var r = window.workingAreaView.currentTool().currentBounds();
              this.selectionRect.style.top  = r.y + "px";
              this.selectionRect.style.left= r.x + "px";
              this.selectionRect.style.width = r.width + "px";
              this.selectionRect.style.height= r.height + "px";
          }
      }
  }

  class GDNativeSelectionRectTool extends GDTool {
      constructor(at, event) {
          super(at);
          var r = document.createElement("div");
          r.className = "selectionRect";
          this.selectionRect = r;
          document.body.appendChild(this.selectionRect);
          this.startX = event.clientX;
          this.startY = event.clientY;
      }

      activate() {
          var r = document.createElement("div");
          r.className = "selectionRect";
          this.selectionRect = r;
          document.body.appendChild(this.selectionRect);

          let container = this.at.currentScreen;
          this.bounds = container.orderedComponents.map( cell => { return {'cell': cell, 'bounds': globalBoundsOfElement(cell.DOMElement)}});
      }

      deactivate() {
          if (this.selectionRect.parentNode != null) {
              if(document.body.contains(this.selectionRect)) {
                  document.body.removeChild(this.selectionRect);
              }
          }
      }

      mouseDragged(e) {
          const y = Math.min(this.startY, e.clientY) + window.scrollY;
          const x = Math.min(this.startX, e.clientX) + window.scrollX;
          const width = this.startX < e.clientX ? e.clientX - this.startX : this.startX - e.clientX;
          const height = this.startY < e.clientY ? e.clientY - this.startY : this.startY - e.clientY;

          this.selectionRect.style.top = y + "px";
          this.selectionRect.style.left = x + "px";
          this.selectionRect.style.width = width + "px";
          this.selectionRect.style.height = height + "px";

          const selectionBounds = {top: y, left: x, width: width, height: height};
          let intersection = [];
          this.bounds.forEach( b => {
              let cell = b.cell;
              let bounds = b.bounds;

              if (intersectsBounds(bounds, selectionBounds)) {
                  intersection.push(cell.objectID);
              }
          });

          this.at.send("select/" + intersection);

          
      }

      mouseUp(e) {
          this.at.restoreSelectionTool();
      }
  }

  function positionHandle(handle) {
      var ownerRect = globalBoundsOfElement(handle.owner); //handle.owner.getBoundingClientRect(); 

      var p = {};
      
      var keyPath = handle.atHandle.keyPath();
      var delta = 3; 

      switch (keyPath) {
          case "topLeft": p = {x: ownerRect.left - delta, y: ownerRect.top - delta}; break;
          case "topCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top - delta}; break;
          case "topRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top - delta}; break;
          case "rightCenter": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break;
          case "bottomRight": p = {x: ownerRect.left + ownerRect.width - delta, y: ownerRect.top + ownerRect.height - delta}; break;
          case "bottomCenter": p = {x: ownerRect.left + ownerRect.width / 2 - delta, y: ownerRect.top + ownerRect.height - delta} ; break;
          case "bottomLeft": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height - delta}; break;
          case "leftCenter": p = {x: ownerRect.left - delta, y: ownerRect.top + ownerRect.height / 2 - delta}; break; 
      }

      handle.style.left = p.x + "px";
      handle.style.top = p.y + "px";
  }

  function handleCursor(keyPath) {
      switch (keyPath) {
          case "topLeft": 
          case "bottomRight": return "nwse-resize"; 
          case "topCenter": 
          case "bottomCenter": return "ns-resize"; 
          case "rightCenter": 
          case "leftCenter": return "ew-resize"; 
          case "bottomLeft":
          case "topRight": return "nesw-resize"; 
      }

      return "pointer";
  }



  // mmmhm, this one updates the position of the highlight-divs, will have to see
  // if there is a better way (5% CPU for Antetype doing nothing o_O ) 
  function selectionUpdater() {
      if (window.Antetype == undefined) 
          return;
      Antetype._highlightDivs.forEach(function(highlight) {
          var rect = globalBoundsOfElement(highlight.figure.DOMElement);
          sizeHighlightCell(highlight, rect);
      });

      if (Antetype.handles) {
          Antetype.handles.forEach( h => h.positionElement() );
      }
      Antetype.handleElements.forEach(function(handle) {
          positionHandle(handle);
      });

      if (Antetype._highlightDivs.length > 0) {
          window.requestAnimationFrame(selectionUpdater);
      }
  }
  /**
   * @type {AntetypeWeb}
   */
  let Antetype = null;

  /**
   * top-level object for the whole in-browser antetype. 
   */
  class AntetypeWeb {
      /**
       * builds a new AntetypeWeb-object
       * @param {HTMLElement} screenElement the element which will be used for rendering the screen, optional if not used: `<body>` is used
       */
      constructor(screenElement) {
          this.commands = [];
          this.converters = {};
          this.screenElement = screenElement; 
          if (!this.screenElement) {
              this.screenElement = document.createElement("div");
              document.body.appendChild(this.screenElement);
          }
          this.selectionTool = new GDSelectionTool(this);

          if (this.runsInAntetype)
              this.runTool = new GDInplaceRunTool(this);
          else 
              this.runTool = new GDRunTool(this);

          this.textTool = new GDTextTool(this);
          this.vectorTool = new GDVectorTool(this);
          this.figureDragTool = new GDFigureDragTool(this);
          this.handleDragTool = new GDHandleDragTool(this);
          this.selectionRectTool = new GDSelectionRectTool(this);
          this.setCurrentTool(this.runsInAntetype ? this.selectionTool : this.runTool );
          this._nativeMouseSelection = false;
          this._highlightDivs = [];
          this._selectedObjects = [];         // like GDSelectionController selectedObjects
          this.handleElements = []; 
          this.handles = [];
          this.guides = [];

          this._listeners = {};
          this.addEventListeners();

          this.addFundamentalCommands();

          this._project = null; 
          this._currentScreen = null;

          // called on screenchange: 
          this.onScreenChange = null;

          // debugging: 
          this.commandsLog = [];
          this.recordCommands = false;

          this._currentDragHandler = null;
          this._dragHandlers = [new GDRubberbandDragHandler(this), new GDDragHandler(this) ];

          this._showHandles = true;
          this.placeHolder = null;

          this._targetRectDiv = null;
          this._possibleTargetRect = null;

          this._asyncCommandExecuting = false;
          this._asyncCommandQueue = [];
          this._asyncTimoutID = null;

          this._fontStyleSheet = null;
          this._usedFonts = {};

          this.highlightColor = null;

          this._cssGenerator = new GDCSSGenerator();

          this._cachedScreens = new Map();

          Object.seal(this);
      }

      /**
          the current visible Screen 
          @returns {GDScreen}
      */
      get currentScreen() {
          return this._currentScreen;
      }

      /**
       * sets the current screen
       * @param {GDScreen} s the new screen
       */
      set currentScreen(s) {
          this._currentScreen = s;
          if (this.onScreenChange != null)
              this.onScreenChange();
      }

      /**
          the project of this prototype. {@link GDProject}
          @returns {GDProject}
      */
      get project() {
          return this._project;
      }

      set project(p) {
          this._project = p;
      }

      get nativeMouseSelection() {
          return this._nativeMouseSelection;
      }

      set nativeMouseSelection(useNative) {
          this._nativeMouseSelection = useNative;
          const usesSelectionTool = this.currentTool == this.selectionTool;
          if (useNative) {
              this.selectionTool = new GDNativeSelectionTool(this);
              this._dragHandlers.unshift(new GDCellDragHandler(this));
          } else {
              this.selectionTool = new GDSelectionTool(this);
          }
          if (usesSelectionTool) {
              this.currentTool = this.selectionTool;
          }
      }

      updateScreenBounds(bounds) {
          if (window.parent && window.parent.updateScreenBounds) {
              window.parent.updateScreenBounds(bounds);
          }
      }

      get serverDocumentName() {
          return location.href.split("/")[3]; //FIXME
      }

      loadProjectFromJSON(json) {
          this._project = new GDProject(json, null);
          this.project.at = this;
          this.buildStyleSheet(); 
      }

      changeScreenFromJSON(json) {
          const screen = GDModelObject.fromJSONObjectInProject(json, this.project);
          this.currentScreen = screen;
          this.rebuildRenderObjects(screen);
      }

      /**
       *  Normally our CSS-generation is divided into widget- and instance-css. 
       *  But unfortunately sometimes we need to know the container to generate
       *  the right css. For root-instance-cells the container is not known on 
       *  creation, only when the instance is inserted in the screen. (or a state
       *  change). 
       *
       *  FIXME: 
       *      *   currently this method is called on numerous places after changing
       *          the hierarchy, can we make it automatic? 
       *      *   tests are missing
       *
       */
      executeFinalWidgetLayoutPass(figure) {
          const containerState = currentContainerStateIdentifier(figure, figure.activeStateIdentifier);
          this._cssGenerator.executeFinalWidgetLayoutPass(figure, containerState);
      }

      updateTriangleCell(figure, stateIdentifier) {
          if(figure.valueForKeyInStateWithIdentifier("cellType", stateIdentifier) == GDTriangleCellType) {
              // trigger display properties method
              if (stateIdentifier != undefined) {
                  var state = this.project.stateWithIdentifier(stateIdentifier);
                 this.cellSetPropertyInState(figure, "rotationAngle", figure.valueForKeyInStateWithIdentifier("rotationAngle", stateIdentifier), state);
              } else {
                  this.cellSetProperty(figure, "rotationAngle", figure.valueForKeyInStateWithIdentifier("rotationAngle", stateIdentifier));
              }
          }
      }

      updateVectorCell(cell) {
          if(cell.firstChild.nodeName.toLowerCase() == 'svg') {
              const svg = cell.figure.svgInStateWithIdentifier(cell.figure.activeStateIdentifier);
              const xmlParser = new DOMParser();
              const svgObject = xmlParser.parseFromString(svg, "text/xml");
              this.replaceCanvasOrSVGWithSVG(cell, svgObject.rootElement);
          }
          else if(cell.firstChild.nodeName.toLowerCase() == 'canvas') {
              this.vectorTool.updateVectorCellContent();
          }
      }

      addFundamentalCommands() {
          this.registerCommand("macro", function(json, at) {
              var commands = json["commands"];
              for (var i=0; i<commands.length; i++) {
                  var c = commands[i];
                  at.runCommand(c);
              }
          });

          // for testing, synchronous variant of "loadProject"
          this.registerCommand("loadProjectSynchronous", function(json, at) {
              at.loadProjectFromJSON(json);
          });


          
          this.registerCommand("loadProject", function(json, at) {
              let request = new XMLHttpRequest();
              request.open("GET", "/proxy/object-with-id?document="+ at.serverDocumentName + "&id=" + json);
              request.onreadystatechange = function () {
                    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                          let json = JSON.parse(request.response);
                          at.loadProjectFromJSON(json);
                          at.asyncCommandExecuting = false;
                     }
              };
              at.asyncCommandExecuting = true;
              request.send();
          });

          this.registerCommand("loadLibrary", function(json, at) {
              at._currentLookAndFeel = new GDLookAndFeel(json["lookAndFeel"], at.project);
              at.buildStyleSheet(); 
              var resourcesJSON = json["resources"];
              var resources = {};
              for (var i=0; i<resourcesJSON.length; i++) {
                  var resourceJSON = resourcesJSON[i];
                  var resource = GDModelObject.fromJSONObjectInProject(resourceJSON, at.project);
                  resources[resource.identifier] = resource;
              }
              at.project.resources = resources;
          });
      }  

      buildStyleSheet() {
          const defaultStyleSheetElement = document.createElement("style");
          document.head.appendChild(defaultStyleSheetElement);
          const defaultStyleSheet = defaultStyleSheetElement.sheet;

          const breakPointStyleSheetElement = document.createElement("style");
          document.head.appendChild(breakPointStyleSheetElement);
          const breakPointStyleSheet = breakPointStyleSheetElement.sheet;

          const fontStyleSheetElement = document.createElement("style");
          document.head.appendChild(fontStyleSheetElement);
          this._fontStyleSheet = fontStyleSheetElement.sheet;

          const lookAndFeel = this.project.currentLookAndFeel;
          lookAndFeel.populateCSS(defaultStyleSheet, breakPointStyleSheet, this);
      }


      addUsedFont(font) {
          if (this._usedFonts[font.fontName] != undefined)
              return;

          if (font.fontCSS != undefined && font.fontCSS != "") {
              this._fontStyleSheet.insertRule(font.fontCSS,0);
          }
          this._usedFonts[font.fontName] = font;
      }


      /**
          here we add "Global" eventListeners which mainly forward to the current tool. 
          For Interaction we have to handle some events differently (which don't bubble, 
          up). Those are added in GDEventHandler.updateEventListeners

          {@link GDEventHandler#updateEventListeners}
      */
      addEventListeners() {
          var at = this;
          
          at._mouseDown = false; 
          var container = document;
          container.addEventListener("click", function(e) {
              at.currentTool.mouseClick(e);
          }, false);
          container.addEventListener("dblclick", function(e) {
              at.currentTool.mouseDoubleClick(e);
          }, false);
          container.addEventListener("mousedown", function(e) {
              if (e.button == 0) { // right click to show web inspector in at, FIXME, we need to handle those too
                  at._mouseDown = true;
              }
              at.currentTool.mouseDown(e);
          }, false);
          container.addEventListener("mouseup", function(e) {
              at._mouseDown = false;
              at.currentTool.mouseUp(e);
          }, false);
          container.addEventListener("mousemove", function(e) {
              if (at._mouseDown) {
                  at.currentTool.mouseDragged(e);
              } else {
                  at.currentTool.mouseMove(e);
              }
          }, false);


          container.addEventListener("contextmenu", function(e) {
              at.currentTool.contextMenu(e);
          }, false);
          window.addEventListener("keydown", function(e) {
              at.currentTool.keyDown(e);
              e.stopImmediatePropagation();
          }, false);
          window.addEventListener("keypress", function(e) {
              at.currentTool.keyPress(e);
          }, false);

          window.addEventListener("keyup", function(e) {
              at.currentTool.keyUp(e);
              e.stopImmediatePropagation();
          }, false);


          // drag-and-drop. Unfortunately the API looks similar to the AppKit-API, but as always
          // the devil is in the details. 
          document.addEventListener("dragenter", function(e) {
              if (!at._currentDragHandler) {
                  at._currentDragHandler = at._dragHandlers.find( d => d.possibleDragOperations(e) != GDDragHandler.NSDragOperationNone);
              }
              if (at._currentDragHandler) {
                  at._currentDragHandler.dragEnter(e);
              }
              at.log("dragenter: " + JSON.stringify(e));
          }, false);
          document.addEventListener("dragover", function(e) {
              if (at._currentDragHandler) {
                  at._currentDragHandler.dragOver(e); 
              }
              at.log("dragover: " + JSON.stringify(e));
          }, false);

          document.addEventListener("dragleave", function(e) {
              if (at._currentDragHandler) {
                  at._currentDragHandler.dragLeave(e); 
              }
              at.log("dragleave: " + JSON.stringify(e));
          }, false);


          document.addEventListener("dragexit", function(e) {
              if (at._currentDragHandler) {
                  at._currentDragHandler.dragExit(e); 
              }
              at.log("dragexit: " + JSON.stringify(e));
          }, false);

          document.addEventListener("drop", function(e) {
              if (at._currentDragHandler) {
                  at._currentDragHandler.drop(e);
                  at._currentDragHandler = null;
              }
              at.log("drop: " + JSON.stringify(e));
          }, false);

          container.addEventListener("touchstart", e => at.currentTool.touchStart(e)); 
          container.addEventListener("touchend", e => at.currentTool.touchEnd(e)); 
          container.addEventListener("touchenter", e => at.currentTool.touchEnter(e)); 
          container.addEventListener("touchleave", e => at.currentTool.touchLeave(e)); 
          container.addEventListener("touchmove", e => at.currentTool.touchMove(e)); 

          this.addEventListener("loadscreen", () => this.currentTool.screenDidChange(this.currentScreen) );
          this.addEventListener("unloadscreen", () => this.currentTool.screenWillChange() );
      }

      /**
          if the prototype is running inside Antetype (true)  or in the browser (false)
      */
      get runsInAntetype() {
          return window.navigator.userAgent.indexOf("Antetype") != -1;
      }


      getElementById(webID) {
          let e = document.getElementById(webID);
          if (e) return e;

          for (let [ , screen] of this._cachedScreens) {
              let e = screen.DOMElement.querySelector(`#${webID}`);

              if (e) return e;
          }

          return null;
      }

      get screenElement() {
          return this._screenElement;
      }

      set screenElement(c) {
          this._screenElement = c;
      }

      /**
          go to the next screen in the protoype. (jumps to the first if, the current screen is the last screen)

           Currently only usable in the exported WebViewer
      */
      gotoNextScreen() {
          var index = this.project.orderedScreens.indexOf(this.currentScreen);
          index++;
          if (index >= this.project.orderedScreens.length) {
              index = 0;
          }

          this.gotoScreen(this.project.orderedScreens[index]);
      }

      /**
          go to the previous screen in the protoype. (jumps to the last one, 
           if the current screen is the first screen)

           Currently only usable in the exported WebViewer
      */
      gotoPreviousScreen() {
          var index = this.project.orderedScreens.indexOf(this.currentScreen);
          index--;
          if (index < 0) {
              index = this.project.orderedScreens.length-1;
          }

          this.gotoScreen(this.project.orderedScreens[index]);
      }

      /**
          display the screen with the given index. 
      */
      gotoScreenWithIndex(i) {
          var screen = this.project.orderedScreens[i];
          this.gotoScreen(screen);
      }

      /**
          Displays the given Screen 's'. 
          @param {GDScreen} s
      */
      gotoScreen(s) {
          this.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});
          if (s.DOMElement == undefined) {
              s.createStyleSheets();
              s.DOMElement = this.buildDOMForCell(s);
          } 

          // mmmhmm, sometimes the spinner is visible, before showing the screen
          // remove it:
          const loaderContainer = s.DOMElement.querySelector("#loader-container");
          if (loaderContainer) {
              loaderContainer.remove();
          }

          if (this.screenElement.parentNode) {
              s.insertStyleSheets();
              this.screenElement.parentNode.replaceChild(s.DOMElement, this.screenElement);
          }
          this.screenElement = s.DOMElement;
          this.currentScreen = s;
          this.executeFinalWidgetLayoutPass(s);
          this.dispatchEvent({type: 'loadscreen', defaultPrevented: false});
      }


      /**
          like gotoScreen, but using a transition. 

          @param {GDScreen} screen
          @param {int} transition
          @param {float} duration (in seconds)
      */
      gotoScreenWithTransition(screen, transition, duration) {
          const animator = new GDScreenAnimator(this, transition, duration);
          animator.gotoScreenWithTransition(screen);
      }

      gotoScreenWithIDEditMode(i) {
          this.send("gotoScreenWithID/" + i);
      }

      gotoScreenWithIDEditModeWithTransition(i, transition, duration) {
          const animator = new GDEditModeScreenAnimator(this, transition, duration);
          animator.gotoScreenWithID(i);
      }
      get screenNames() {
          return this.project.orderedScreens.map(function(s) { return s.name; });
      }

      get currentScreenIndex() {
          return this.project.orderedScreens.indexOf(this.currentScreen);
      }

      setCurrentTool(newTool) {
          // Start RunTool/SelectionTool Toggle
          if(this.currentTool != undefined) {
              if(this.handleElements == undefined) {
                  this.handleElements = [];
              }

              if(this._highlightDivs == undefined) {
                  this._highlightDivs= [];
              }
          
              if (newTool.isRunTool()) {
                  this.hideHandles();
                  this.selectFigures([]);
              } else if(this.currentTool.isRunTool() && !newTool.isRunTool()) {
                  this.showHandles();
              }
          }
          // End RunTool/SelectionTool Toggle

          if (newTool == this.currentTool)  {
              return;
          }

          if (this.currentTool)  {
              this.currentTool.deactivate();
          }

          this.currentTool = newTool;
          newTool.activate();
      }

      registerCommand(name, f) {
         this.commands[name] = f;
      }

      /**
          true if async-commands are in the queue. 
      */
      get asyncCommandExecuting() {
          return this._asyncCommandExecuting;
      }

      /**
          starts or ends async command-processing. If true commands executed with runCommand are 
          stored in a queue and executed after calling asyncCommandExecuting = false. 
      */
      set asyncCommandExecuting(asyncFlag) {
          this._asyncCommandExecuting = asyncFlag;
          if (asyncFlag) {
              if (this._asyncTimoutID == null) {
                  this._asyncTimoutID = window.setTimeout(() => { 
                      const loaderDiv = document.createElement("div");
                      loaderDiv.id = 'loader-container';
                      loaderDiv.className = 'loader-container';
                      loaderDiv.innerHTML = '<div class="loader"><img src="static/spinner.svg">  </div> ';
                      document.body.appendChild(loaderDiv);

                      window.clearTimeout(this._asyncTimoutID);
                      this._asyncTimoutID = null;
                  }, 500);
              }
          } else {
              const loaderContainer = document.getElementById("loader-container");
              if (loaderContainer) {
                  loaderContainer.remove();
              }
              var count = 0;
              for(var i = 0; i < this._asyncCommandQueue.length; i++) {
                  const json = this._asyncCommandQueue[i];
                  this._runCommand(json);
                  count++;
                  if(this._asyncCommandExecuting) {
                      break;
                  }
              }
              this._asyncCommandQueue.splice(0, count);
              count = 0;

              if (this._asyncTimoutID) {
                  window.clearTimeout(this._asyncTimoutID);
                  this._asyncTimoutID = null;
              }
          }     
      }

      /**
          runs a command send from Antetype. Commands are registered using registerCommand
      */
      runCommand(json) {
          if (!this.asyncCommandExecuting) {
              this._runCommand(json);
              return;
          }

          this._asyncCommandQueue.push(json);
      }
      
      _runCommand(json) {
          var name = json["command"];
          var f = this.commands[name];
          if (f === undefined)  {
              throw "no command '" + name + "' defined!";
          }
          var parameters = json["parameters"];
          this.log("command: " + name);

          if (this.recordCommands) {
              this.commandsLog.push(json);
          }
          f(parameters, this);
      }

      editTextOfFigure(f) {
          if (f.isScreen) {
              return;
          }
          this.setCurrentTool(this.textTool);
          this.textTool.editTextOfFigure(f);
      }

      editVectorOfFigure(f) {
          if (f.isScreen) {
              return;
          }
          this.setCurrentTool(this.vectorTool);
          this.vectorTool.editVectorOfFigure(f);
      }

      restoreSelectionTool() {
          this.setCurrentTool(this.selectionTool);
      }

      startDrag(e) {
          this.setCurrentTool(this.figureDragTool);
          this.currentTool.startDrag(e);
      }

      hideHandlesTemporarily() {
          this._highlightDivs.forEach(h => h.style.display = "none");
          this.handleElements.forEach(h => h.style.display = "none");
      }

      showHandlesTemporarily() {
          this._highlightDivs.forEach(h => h.style.display = "block");
          this.handleElements.forEach(h => h.style.display = "block");
      }


      showHandles() {
          this._showHandles = true;
          this.updateHandles();
          this.updateHighlightDivs();
      }

      hideHandles() {
          this._showHandles = false;
          for (var i=0; i<this.handleElements.length; i++) {
              var h = this.handleElements[i];
              h.parentElement.removeChild(h);
          }
          this.handleElements = [];

          this._highlightDivs.forEach(function(h) {h.style.display = "none";});
      }

      handleFromATHandle(atHandle) {
          var handle = document.createElement("div");
          handle.className = "handle";
          handle.atHandle = atHandle;
          var owner = this.getElementById(atHandle.ownerWebID());
          handle.owner = owner;
          handle.style.cursor = handleCursor(atHandle.keyPath());
          positionHandle(handle);
          return handle;
      }

      updateHandles() {
          if (this.nativeMouseSelection) return;
          for (let i=0; i<this.handleElements.length; i++) {
              var h = this.handleElements[i];
              if(h.parentElement != null) {
                  h.parentElement.removeChild(h);
              }

          }
          this.handleElements = [];

          if (!this._showHandles) {
              return;
          }
          if (window.workingAreaView) {
              if (this.selectedObjects.length > 1) 
                  return;

              var atHandles = window.workingAreaView.screenChangeManager().handles();
              for (let i=0; i<atHandles.length; i++) {
                  var atHandle = atHandles[i];
                  if (atHandle.isActive()) {
                      var handle = this.handleFromATHandle(atHandle);
                      document.body.appendChild(handle);
                      this.handleElements.push(handle);
                       
                  }
              }
          }
      }

      updateHighlightDivs() {
          if(this._highlightDivs != undefined) {
              for (let i=0; i<this._highlightDivs.length; i++) {
                  let h = this._highlightDivs[i];
                  if(h.parentElement != null) {
                      h.parentElement.removeChild(h);
                  }
              }
          }

          this._highlightDivs = [];

          if (!this._showHandles) {
              return;
          }

          
          if (!this.runsInAntetype) {  // only in AT
              return;
          }

          for (let i=0; i<this._selectedObjects.length; i++) {
              const figure = this._selectedObjects[i];
              if (figure.isScreen) {
                  return;
              }

              const r = globalBoundsOfElement(figure.DOMElement); 
              const highlight = document.createElement("div");
              highlight.className = "highlightrect";
              if(this.highlightColor !== null) { // Always null on High Sierra and earlier (uses css highlight color instead)
                  highlight.style.borderColor = this.highlightColor.toString();
              }
              sizeHighlightCell(highlight, r);
              highlight.figure = figure;
              document.body.appendChild(highlight);
              this._highlightDivs.push(highlight);
          }

          if (this._highlightDivs.length > 0) 
              window.requestAnimationFrame(selectionUpdater);
      }

      handlesForSelectiion() {
          if (!this.nativeMouseSelection) {
              return [];
          }

          if (this.selectedFigures.length != 1) {
              return [];
          }
          const cell = this.selectedFigures[0];

          return handlesForCell(cell);
      }

      selectFigures(figures) {
          this.handles.forEach( h => h.remove() );
          this._selectedObjects = figures;
          if (this.currentTool.isRunTool()) {
              return;
          }
          this.updateHighlightDivs();

          this.handles = this.handlesForSelectiion();
          this.handles.forEach( h => {
              let element = h.createElement();
              this.screenElement.appendChild(element);
              //document.body.appendChild(element);
              h.positionElement();
          }); 
      }

      updateGuideLines(lines) {
          for (let i=0; i<this.guides.length; i++) {
              var h = this.guides[i];
              h.parentElement.removeChild(h);
          }
          this.guides= [];

          for (let i=0; i<lines.length; i++) {
              var line = lines[i];
              var element = line.domElement();
              document.body.appendChild(element);
              this.guides.push(element);
          }
          
      }

      get selectedObjects() {
          return this._selectedObjects;
      }

      get selectedFigures() {
          return this.selectedObjects.filter( o => !o.isScreen);
      }

      send(o) {
          if (this.runsInAntetype && window.serverDocument != undefined) {
              var path = "/handler/0/" + o;
              window.serverDocument.handleCommandPath(path);
          }
      }


      log(message) {
          console.log(message);

      /*    if (this.runsInAntetype && window.webViewController != undefined) {
              window.webViewController.log(message);
          }     */
      }

      // live-layout, placeholders:
      removePlaceholder() {
          if (this.placeHolder) {
              var oldPlaceHolder = this.placeHolder;
              oldPlaceHolder.style.width = "0px";
              oldPlaceHolder.style.height = "0px";
              oldPlaceHolder.addEventListener("transitionend", function() {
                  if (oldPlaceHolder.parentElement) {
                      oldPlaceHolder.parentElement.removeChild(oldPlaceHolder);
                  }
              });
         }
      }


      insertPlaceholder(containerID, index, startSize, endSize) {
          if (this.placeHolder) {
              var oldContainer = this.placeHolder.parentElement;
              var newContainer = document.getElementById(containerID);
              if (oldContainer == newContainer) {
                  if (this.placeHolder.index < index) {
                      index = index +1;
                  }
              }
          }
          this.removePlaceholder();
          

          var container = this.getElementById(containerID);

          var p = document.createElement("div");
          p.style.width = startSize.width + "px"; 
          p.style.height = startSize.height + "px";
          p.style.display= "flex";
          p.style.flex = "0 0 auto";

          if (index >= container.childNodes.length) {
              container.appendChild(p);
          } else {
              container.insertBefore(p, container.childNodes[index]); 
          }
          p.style.transition = "all 0.2s linear";
          window.setTimeout(function() {
              p.style.width = endSize.width + "px";
              p.style.height = endSize.height + "px";
          }, 1);

          this.placeHolder = p;
          this.placeHolder.index = index;
      }

      setPossibleTargetRect(x,y,w,h) {
          if (this._targetRectDiv == null) {
              this._targetRectDiv = document.createElement("div");
              this._targetRectDiv.className = "highlightrect";
              document.body.appendChild(this._targetRectDiv);

          }
          var r = {"top": y, "left": x, "width": w, "height": h};
          this._possibleTargetRect = r;
          sizeHighlightCell(this._targetRectDiv,r);
      }

      get possibleTargetRect() {
          return this._possibleTargetRect;
      }

      blinkPossibleTargetRect() {
          // TODO blink
      }
      

      moveFigures(figures, container, index) {
          figures.forEach( f => {
              f.container.removeComponent(f);
              f.DOMElement.parentElement.removeChild(f.DOMElement);

              container.insertComponent(f, index);
              const insertAtEnd = container.orderedComponents.length == 0 || index >= container.orderedComponents.length-1;
              if (insertAtEnd) {
                  container.DOMElement.appendChild(f.DOMElement);
              } else {
                  const nextSibling = container.orderedComponents[index+1];
                  const n = nextSibling.DOMElement;
                  container.DOMElement.insertBefore(f.DOMElement, n);
              }

              // #351 make sure styles are updated after move. Do we need more? 
              let figureStyle = f.cssStyleForStateIdentifier(f.activeStateIdentifier);
              const containerState = currentContainerStateIdentifier(f,f.activeStateIdentifier);
              this._cssGenerator.updateDimensionProperties(figureStyle, f, f.activeStateIdentifier, containerState);

          });
      }

      assureTextSpan(cell) {
          var domElement = cell.DOMElement;
          if (domElement.textSpan != undefined) {
              return domElement.textSpan;
          }

          var span = document.createElement("span");
          if (domElement.hasChildNodes()) {
              domElement.insertBefore(span, domElement.childNodes[0]);
          } else {
              domElement.appendChild(span);
          }
          domElement.textSpan = span;
          span.figure = cell;

          var textContentSpan = document.createElement("span");
          span.appendChild(textContentSpan);
          span.contentSpan = textContentSpan;

          this._cssGenerator.textSpanStyling(cell);


          return span;
      }


      updateText(cell) {
          var activeStateId = cell.activeStateIdentifier;
          var text = cell.valueForKeyInStateWithIdentifier("textString", activeStateId);
          var isEditable = cell.valueForKeyInStateWithIdentifier("isEditableText", activeStateId);
          if ((text == undefined || text.length == 0) && !isEditable) {
              removeTextSpan(cell);
              return;
          }
          
          var span = this.assureTextSpan(cell);
          if (this.currentTool.isRunTool()) {
              span.contentSpan.contentEditable = isEditable ? true : false;
              if (isEditable) {
                  span.contentSpan.style.webkitUserSelect = "text";
                  span.contentSpan.style.minWidth = "1px";
                  span.contentSpan.style.cursor = "text";
                  span.contentSpan.style.width = "100%";
                  span.contentSpan.style.pointerEvents= "auto";
              }
          }
          span.contentSpan.innerHTML = text;
          this._cssGenerator.textSpanStyling(cell);
      }

      updateEmbedHTML(cell) {
          const html = cell.valueForKeyInStateWithIdentifier("embedHTML", cell.activeStateIdentifier);
          if (html != null) {
              if (cell.DOMElement.textSpan == undefined && cell.orderedComponents.length == 0) {
                  cell.DOMElement.innerHTML= html;
              }
          }
      }


      /**
          Antetype uses a rather complex mapping from Widget/Cell/State to CSS class names. 
          If you don't have the Antetype-Cell-Object (often after cloning HTML Elements) but 
          want to change the state, you can use this method to return the proper className. 
          In all other circumstances use {@link changeStateOfCell} which makes sure the 
          Antetype-Objects and DOM-Objects are in sync. 

          @param {GDWidgetInstanceRootCell} cell the cell to use
          @param {GDState} state
          @returns {String} the class name
      */
      cssClassNameForRootCellInState(cell, state) {
          let className = cssClassName(cell.definitionIdentifier, state.identifier, this.project);
          className += " " + cell.objectID + state.cssSelector(); 
          return className;
      }


      /**
         Change the active state of the cell. 
         @param {GDWidgetInstanceCell} cell - The cell 
         @param {GDState} state - The new State
         @param {string} cssTransition - The transition used
      */
      changeStateOfCell(cell, state, cssTransition) {
          cell = cell.rootInstanceCell;
          if (cell.isBasicCell) {
              return;
          }

          if (state.isPseudoState) {
              return;
          }

          if (cell.activeStateIdentifier == state.identifier) {
              return;
          }

          cell.activeStateIdentifier = state.identifier;
          const DOMElement = cell.DOMElement;

          if (DOMElement == undefined) {
              // Issue #160 if not rendered yet don't try to change the missing DOM-elements
              return;
          }
          cell.widgetComponents.forEach((c) => {
              c.DOMElement.style.transition = cssTransition;
              this.updateText(c);
              this.updateEmbedHTML(c);
          });

          DOMElement.className = this.cssClassNameForRootCellInState(cell, state);

          // #1024, in Christinas file a state-change does not work if the active-state
          // is not the state of the breakpoint. The only difference between building
          // (where it works) and state-changing is building the cell-properties. 
          // therefor we rebuild all styles for the child-cells. 
          // This is slow, but currently I do not find a better way. (Only for documents
          // with breakpoints)
          if (this.project.designBreakPoints.length > 0) {
              cell.deepOrderedComponents.forEach( c => this.cellProperties( c.DOMElement, c) );
          } else {
              this.executeFinalWidgetLayoutPass(cell);  
          }
      }


      populateCellPropertiesInState(style, cell, stateId) {
          const containerState = currentContainerStateIdentifier(cell, stateId);
          this._cssGenerator.populateCellPropertiesInState(style, cell, stateId, containerState);

          if (this._cssGenerator.hasTextProperty(cell, stateId)) {
              this.addUsedFont(cell.valueForKeyInStateWithIdentifier("textFont", stateId));
          }
      }


      /**
       * build the instance-style-rules for the given cell. 
       *
       * (Since #752 we build styles for each state, regardless of it has overwritten
       * properties or not. Maybe we should check for :active? or does it even matter
       * performance wise?)
       *
       * @param domElement {HTMLElement} the DOM for the cell
       * @param cell {GDWidgetInstanceCell} the AT-cell 
       */
      cellProperties(domElement, cell) {
          for (let i=0; i<cell.widget.states.length; i++) {
              const state = cell.widget.states[i];
              const stateId = state.identifier; 
              const style = cell.cssStyleForStateIdentifier(stateId);
              this.populateCellPropertiesInState(style, cell, stateId); 
          }

          if (this.currentTool.isRunTool()) {
              if (cell.hasActionsOfEventType(GDMouseClickEventType)) {
                  domElement.style.cursor = "pointer";
              }
          }

          // #730 we need to set the background attributes to the html-style:
          if (cell.isScreen) {
              let htmlStyle = cell.htmlCSSStyle;
              this._cssGenerator.populateScreenBackgroundPropertiesInState(htmlStyle, cell, cell.activeStateIdentifier);
          }
      }


      /**
          sets the value for the given property in cell and active state 
          This also updates the HTML/CSS. 
          @param figure {GDWidgetInstanceCell} the cell
          @param key {String} the property name (see documentation)
          @param value {Object} the value of the property
          @param state {GDState} the state, if omitted use active state
      */
      cellSetProperty(figure, key, value, state) {
          if (state == undefined) state = figure.activeState;
          this.cellSetPropertyInState(figure, key, value, state);
      }

      /**
          sets the value for the given property in cell and state. 
          This also updates the HTML/CSS. 
          @param figure {GDWidgetInstanceCell} the cell
          @param key {String} the property name (see documentation)
          @param value {Object} the value of the property
          @param state {GDState} the state
      */
      cellSetPropertyInState(figure, key, value, state) {
          const stateIdentifier = state.identifier;
          figure.setValueForKeyInStateWithIdentifier(value, key,stateIdentifier );
          const style = figure.cssStyleForStateIdentifier(stateIdentifier);
          
          if (style != undefined) { 
              // mmhm, should we throw or should we go? 
              this.updateStyleProperty(style, figure, key, stateIdentifier);
          }

          // #730 we need to set the background attributes to the html-style:
          if (figure.isScreen && this._cssGenerator.isBackgroundProperty(key)) {
              const htmlStyle = figure.htmlCSSStyle;
              this._cssGenerator.updateScreenBackgroundProperty(htmlStyle, figure, key, stateIdentifier);
          }
      }

      
      /**
       * Inserts the given cell in the container at position "index". Also handles the DOM/CSS-generation.
       * 
       * @param {GDWidgetInstenceCell} container 
       * @param {GDWidgetInstanceCell} cell 
       * @param {Number} index 
       */
      cellInsertComponent(container, cell, index) {
          const insertAtEnd = index >= container.orderedComponents.length;
          container.insertComponent(cell, index);
          cell.container = container;
          const containerNode = container.DOMElement;
          const newCellNode = this.buildDOMForCell(cell);
          if (insertAtEnd) {
              containerNode.appendChild(newCellNode);
          } else {
              const nextSibling = container.orderedComponents[index+1];
              const n = nextSibling.DOMElement;
              containerNode.insertBefore(newCellNode, n);
          }
      
          this.cellProperties(newCellNode, cell); // why do we need this the second time here?
          this.executeFinalWidgetLayoutPass(cell);
      }

      // called while building the css for the widgets. (GDLookAndFeel>>populateCSSForLookNode)
      // speedup instead of calling updateStyleProperty for all property names. 
      updateStyles(style, figure, state) {
          const containerState = currentContainerStateIdentifier(figure, state);
          this._cssGenerator.updateStyles(style, figure, state, containerState);
          this.addUsedFont(figure.valueForKeyInStateWithIdentifier("textFont", state));
      }

      updateStyleProperty(style, figure, key, state) {
          const containerState = currentContainerStateIdentifier(figure, state);
          this._cssGenerator.updateStyleProperty(style, figure, key, state, containerState);

          if (this._cssGenerator.propertyAffectsText(key, figure, state)) {
              var cellIsCell = figure.name !== undefined; //FIXME
              if (cellIsCell && state == figure.activeStateIdentifier)
                  this.updateText(figure);
              this.addUsedFont(figure.valueForKeyInStateWithIdentifier("textFont", state));
          }
      }

      createScreenElement() {
          if (this.screenElement == document.body) 
              return document.createElement("body");

          return document.createElement("div");
      }

      domElementFromCell(cell) {
          const newCellNode = cell.isScreen ? this.createScreenElement() : document.createElement("cell");
          newCellNode.figure = cell;
          cell.DOMElement = newCellNode;

          newCellNode.id = cell.objectID;

          newCellNode.className = cssClassNameForCell(cell, this.project);


          this.updateText(cell);

          const cellType = cell.valueForKeyInStateWithIdentifier("cellType", cell.activeStateIdentifier);

          if(cellType == GDVectorCellType) {
              const svgContent = cell.svgInStateWithIdentifier(cell.activeStateIdentifier);
              newCellNode.innerHTML = svgContent;
          }

          cell.updateEventListeners(this);

          return newCellNode;
      }

      buildDOMForCell(cell) {
          var domElement = this.domElementFromCell(cell);
          this.cellProperties(domElement, cell);
          
          // Vector cells need an additional pass because properties like backgroundColor are set after the first path
          var cellType = cell.valueForKeyInStateWithIdentifier("cellType", cell.activeStateIdentifier);
          if(cellType == GDVectorCellType) {
              domElement = this.domElementFromCell(cell);
          }

          let embedHTML = cell.valueForKeyInStateWithIdentifier("embedHTML", cell.activeStateIdentifier);
          if (embedHTML != null) {
              if (domElement.textSpan == undefined) {
                  domElement.innerHTML = embedHTML;
              }
          }

          for (var i=0; i<cell.orderedComponents.length; i++) {
              var c = cell.orderedComponents[i];
              var childDom = this.buildDOMForCell(c);
              domElement.appendChild(childDom);
          }

          return domElement;
      }


      rebuildRenderObjects(screen) {
          this.dispatchEvent({type: 'unloadscreen', defaultPrevented: false});
          this.currentScreen.cleanupStyles();     // #606 remove old styles ... 
         
          this.updateScreenBounds({width:screen.getProperty("width"), height: screen.getProperty("height")});
          screen.createStyleSheets();
          const newScreenDOMElement = this.buildDOMForCell(screen);
          
          if (this.screenElement.parentNode) {
              this.screenElement.parentElement.replaceChild(newScreenDOMElement, this.screenElement);
          }
          this.currentScreen = screen;
          this.screenElement = newScreenDOMElement;
          // This step is necessary for the correct widget layout within a container 
          this.executeFinalWidgetLayoutPass(newScreenDOMElement.figure);
          this.dispatchEvent({type: 'loadscreen', defaultPrevented: false});

          this._cachedScreens.set(screen.objectID, screen);
          this.send("restoreSelectionAfterReload");   
      }

      cachedScreenWithObjectID(objectID) {
          return this._cachedScreens.get(objectID);
      }

      deleteCachedScreenWithObjectID(objectID) {
          this._cachedScreens.delete(objectID);
      }

      replaceSVGWithCanvas(domElement) {
          if(domElement.firstChild.nodeName.toLowerCase() == 'svg') {
              var canvas = document.createElement('canvas');
              canvas.style.width = "100%";
              canvas.style.height = "100%";
              canvas.style.cursor = "crosshair";
              domElement.replaceChild(canvas, domElement.firstChild);
          }
      }
      
      replaceCanvasOrSVGWithSVG(domElement, savedStateSVG) {
          if(domElement.firstChild.nodeName.toLowerCase() == 'canvas' || domElement.firstChild.nodeName.toLowerCase() == 'svg') {
              domElement.replaceChild(savedStateSVG, domElement.firstChild);
          }
      }

      enablePseudoStates() {
          this.project.currentLookAndFeel.enablePseudoStates();
          this.currentScreen.enablePseudoStates();
          for (let [ , screen] of this._cachedScreens) {
              screen.enablePseudoStates();
          }
      }

      disablePseudoStates() {
          this.currentScreen.disablePseudoStates();
          this.project.currentLookAndFeel.disablePseudoStates();
          for (let [ , screen] of this._cachedScreens) {
              screen.disablePseudoStates();
          }
      }

      updateStateAnimation(states, animate, duration, curve) {
          for (var i=0; i<states.length; i++) {
              var state = states[i];
              state.setAutoAnimation(animate, duration, curve);
          }
      }


      // project is set, html and css in the browser, now connect the pieces:
      connectObjects() {
          this.project.currentLookAndFeel.connectObjects();
          this.project.connectObjects();

          this.currentScreen.deepOrderedComponents.forEach(cell =>  cell.connectObjects(this));
          this.currentTool.activate(); // the generated elements don't se the cursor to pointer. Without cursor:pointer iOS Safari does not fire events... 


          // not really necessary, but does not harm either ... 
          const fontStyleElement = document.createElement("style");
          document.head.appendChild(fontStyleElement);
          this._fontStyleSheet = fontStyleElement.sheet;

      }

      // hacky di hack: If we are in edit-mode change all manually selected pseudo states
      // to normal, and back after export. 
      get exportHTMLString() {
          let result = "";
          let changedElements = [];

          const  iterator = document.createNodeIterator(this.screenElement, NodeFilter.SHOW_ELEMENT, function(e) { 
                      if(e.className.includes === undefined) {
                          return false
                      } else {
                          return e.figure !== undefined && e.className.includes("_") || e.className.includes("animated");
                      }
                  });
          let e = null;
          while ((e = iterator.nextNode()) != null) {
              let c = e.className;
              c = c.replace("_hover", "");
              c = c.replace("_active", "");
              c = c.replace("_focus-within", "");
              if (c.includes("animated")) {       // if we used the IPP in Antetype an GDEffectAction might
                                                  // leave its animation className intact. If this is the 
                                                  // the case the animation will start immediately for the
                                                  // first screen. #557
                  c = cssClassNameForCell(e.figure, this.project);
              }
              e.className = c;
              changedElements.push(e);
          }


          // remove handles and selection rects: 
          for (let i=0; i<this.handleElements.length; i++) {
              const h = this.handleElements[i];
              h.parentElement.removeChild(h);
          }
          this.handleElements = [];

          for (let i=0; i<this._highlightDivs.length; i++) {
              const h = this._highlightDivs[i];
              h.parentElement.removeChild(h);
          }
          result = this.screenElement.outerHTML;

          for (let i=0; i<changedElements.length; i++) {
              const domElement = changedElements[i];
              const rootCell = domElement.figure.rootInstanceCell;
              this.changeStateOfCell(rootCell, rootCell.activeState, "");
          }

          // show handles and selection rects again:
          this.updateHandles();
          this._highlightDivs.forEach(function(s) { document.body.appendChild(s); });

          return result;

      }

      get styleSheetString() {
          var result = "";
          var changeCSS = !this.currentTool.isRunTool();
          if (changeCSS) {
              this.enablePseudoStates();
          }
          
          result = this.project.currentLookAndFeel.cssStyleSheet.cssText 
          + '\n\n' + this.currentScreen.cssStyleSheet.cssText 
          + '\n\n' + this.project.currentLookAndFeel.breakPointStyleSheet.cssText
          + '\n\n' + this.currentScreen.breakPointStyleSheet.cssText; 

          if (changeCSS) {
              this.disablePseudoStates();
          }
          return result;
      }

      exportStyleSheetString(styleSheet) {
          var result = "";
          var changeCSS = !this.currentTool.isRunTool();
          if (changeCSS) {
              this.enablePseudoStates();
          }
          
          result = styleSheet.cssText;

          if (changeCSS) {
              this.disablePseudoStates();
          }
          return result;
      }

      updateDesignBreakPoint(breakPoint, name, width) {
          this.project.updateDesignBreakPoint(breakPoint, name, width);
          this.currentScreen.updateDesignBreakPoint(breakPoint);
          for (let [ , screen] of this._cachedScreens) {
              screen.updateDesignBreakPoint(breakPoint);
          }
      }

      addDesignBreakPoint(breakPoint) {
          this.project.addDesignBreakPoint(breakPoint);
          this.currentScreen.insertBreakPoint(breakPoint);
          for (let [ , screen] of this._cachedScreens) {
              screen.insertBreakPoint(breakPoint);
          }
      }

      deleteDesignBreakPoint(breakPoint) {
          this.currentScreen.deleteDesignBreakPoint(breakPoint);
          for (let [ , screen] of this._cachedScreens) {
              screen.deleteDesignBreakPoint(breakPoint);
          }
          this.project.deleteDesignBreakPoint(breakPoint);
      }

      get fontStyleSheetString() {
          let s = "";
          for (let f in this._usedFonts) {
              let fontCSS = this._usedFonts[f].fontCSS;
              if (fontCSS) {
                  s += this._usedFonts[f].fontCSS + "\n";
              }
          }
          return s;
      }

      /**
          EventTarget-API. callback wird aufgerufen, wenn das event aufgetreten ist. 
          Derzeit definiert sind: `loadscreen` (wird aufgerufen, wenn ein neuer 
          Screen geladen ist) und `unloadscreen` (wird aufgerufen, wenn der alte 
          screen noch aktiv ist, aber gleich ein neuer geladen wird). 

          @param {String} type - loadscreen oder unloadscreen 
          @param {Function} callback - wird aufgerufen, wenn das Event eingetreten ist
      */
      addEventListener(type, callback) {
          if (!(type in this._listeners)) {
              this._listeners[type] = [];
          }
          this._listeners[type].push(callback);
      }

      /**
          löscht den callback für das event "type"
          @param type {String} type of event
          @param callback {Function} callback für das Event
      */
      removeEventListener(type, callback) {
          if (!(type in this._listeners)) {
              return;
          }
          var stack = this._listeners[type];
          for (var i = 0, l = stack.length; i < l; i++) {
              if (stack[i] === callback){
                  stack.splice(i, 1);
                  return;
              }
          }
      }

      dispatchEvent(event) {
          if (!(event.type in this._listeners)) {
              return true;
          }
          var stack = this._listeners[event.type].slice();

          for (var i = 0, l = stack.length; i < l; i++) {
              stack[i].call(this, event);
          }
          return !event.defaultPrevented;
      }
  }


  /**
      USed in the exported web viewer. Once we finish #69 not sure if we need this one...
  */
  class AntetypeWebViewer extends AntetypeWeb {
      addUsedFont() {
          // do nothing, since we already have the fonts. 
      }

  }

  function initializeAntetypeViewer() {
      Antetype = new AntetypeWebViewer(document.body);
      window.Antetype = Antetype;
  }

  // WKWebView-fake-object
  // currently we use WebView but we want to switch to WKWebView, furthermore debugging
  // is broken in the WebView since 10.15.4. Therefor we make ist possible to use WKWebView
  // using a compile-time-switch. Since the Cocoa <-> JavaScript-communication is quiet 
  // different we add here some fake-objects to mimique the old one: 
  if (window.navigator.userAgent.indexOf("Antetype") != -1 && window.webkit && window.serverDocument == undefined) {

      if (window && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.serverDocument) {
          window.serverDocument = {
              handleCommandPath: (s) => {
                  window.webkit.messageHandlers.serverDocument.postMessage({"command": "handleCommandPath", "parameters": s});
              }
          };
      } else if (window.parent && window.parent.webkit && window.parent.webkit.messageHandlers && window.parent.webkit.messageHandlers.serverDocument) {
          window.serverDocument = {
              handleCommandPath: (s) => {
                  window.parent.webkit.messageHandlers.serverDocument.postMessage({"command": "handleCommandPath", "parameters": s});
              }
          };
      }


  //    window.workingAreaView = { }
      //    window.webViewController = {}
  }

  /*
   * This file contains the JavaScripts for the web-inspector used in the web-viewer.
   * See viewer_index_spec.js for the JavaScript of the web-inspector of the main frame
   */





  function getOrCreateDiv(identifier) {
      let existing = document.getElementById(identifier);
      if (existing)
          return existing;

      let element = document.createElement("div");
      element.id = identifier;
      document.body.appendChild(element);
      return element;
  }

  /**
   * given an rgba(...)-value, return the correspinding #-hex notation
   * for the color. If opacity == 0: return 'transparent'.
   */
  function rgb2hex(rgba) {
      let sep = rgba.indexOf(",") > -1 ? "," : " ";
      rgba = rgba.substr(rgba.indexOf("(") + 1).split(")")[0].split(sep);

      let r = (+rgba[0]).toString(16),
          g = (+rgba[1]).toString(16),
          b = (+rgba[2]).toString(16),
          a = rgba[3] * 255;

      if (r.length == 1) {
          r = "0" + r;
      }
      if (g.length == 1) {
          g = "0" + g;
      }
      if (b.length == 1) {
          b = "0" + b;
      }

      // rgb exception
      if (isNaN(a)) {
          a = "";
      } else {
          if (a == 0) {
              return "transparent";
          }
          a = Math.round(a).toString(16); // " " + a + "%";
          if (a.length == 1) {
              a = "0" + a;
          }
      }

      return "#" + r + g + b + a;
  }

  /**
   *  I am the tool used for Spec-inspector. When the user opens the Spec-inspector in the
   *  Web Viewer a spec-tool becomes the current tool and listens to the mouse-events to select
   *  cells (and show their properties).
   *
   *  See viewer_index_spec.js for the JavaScript of the main-frame (displaying the spec inspector).
   */
  class GDSpecTool extends GDTool {
      constructor(at) {
          super(at);

          this._mouseOverHighlight = null;
          this._selectedElementHighlight = null;
          this._selectedElement = null;
          this._updateMarkerID = null;
          this._mouseOverElement = null;



          // hide mouse-over if the mouse leaves the browser window
          this._mouseLeaveListener = () => this._mouseOverHighlight.style.display = "none";

      }

      stateHandledByBrowser(state) {
          return state.type == GDState.GDMouseOverStateType
          || state.type == GDState.GDPressedStateType
          || state.type == GDState.GDFocusStateType;
      }

      activatePseudoStates(screen) {
          let cellsWithActivePseudoState = screen.deepOrderedComponents.filter(c => c.isRootInstanceCell && this.stateHandledByBrowser(c.activeState));
          cellsWithActivePseudoState.forEach(c => c.DOMElement.className = this.at.cssClassNameForRootCellInState(c, c.activeState));
      }

      deactivatePseudoStates(screen) {
          let cellsWithActivePseudoState = screen.deepOrderedComponents.filter(c => c.isRootInstanceCell && this.stateHandledByBrowser(c.activeState));
          cellsWithActivePseudoState.forEach(c => {
              let normalState = c.widget.normalState;
              c.DOMElement.className = this.at.cssClassNameForRootCellInState(c, normalState);
          });
      }

      addMeasureElements() {
          // Tims measures;
          if (!document.getElementById("measure-horiz")) {
              let measureHor = document.createElement("div");
              measureHor.id = "measure-hor";
              measureHor.innerHTML = '<div id = "measure-hor-number"> xxx</div><div id="measure-hor-line"></div>';
              document.body.appendChild(measureHor);

              let measureHor2 = document.createElement("div");
              measureHor2.id = "measure-hor2";
              measureHor2.innerHTML = '<div id = "measure-hor2-number"> xxx</div><div id="measure-hor2-line"></div>';
              document.body.appendChild(measureHor2);

              let measureVert = document.createElement("div");
              measureVert.id = "measure-vert";
              measureVert.innerHTML = '<div id = "measure-vert-number"> xxx</div><div id="measure-vert-line"></div>';
              document.body.appendChild(measureVert);

              let measureVert2 = document.createElement("div");
              measureVert2.id = "measure-vert2";
              measureVert2.innerHTML = '<div id = "measure-vert2-number"> xxx</div><div id="measure-vert2-line"></div>';
              document.body.appendChild(measureVert2);
          }
      }

      removeMeasureElements() {
          window.cancelAnimationFrame(this._updateMarkerID);
          document.getElementById("measure-hor").remove();
          document.getElementById("measure-hor2").remove();
          document.getElementById("measure-vert").remove();
          document.getElementById("measure-vert2").remove();

          const guidesVertical = document.getElementById("guides-vertical");
          if (guidesVertical)
              guidesVertical.remove();

          const guidesHorizontal = document.getElementById("guides-horziontal");
          if (guidesHorizontal)
              guidesHorizontal.remove();

      }


      activate() {
          this.addMeasureElements();
          this.at.disablePseudoStates();
          this.activatePseudoStates(this.at.currentScreen);
          this._mouseOverHighlight = getOrCreateDiv("high");
          this._selectedElementHighlight = getOrCreateDiv("high2");
          document.body.addEventListener("mouseleave", this._mouseLeaveListener);
          if (this._selectedElement == null) {
              this.selectElement(document.body);
          }


      }

      deactivate() {
          if (this._mouseOverHighlight) {
              this._mouseOverHighlight.remove();
          }

          if (this._selectedElementHighlight) {
              this._selectedElementHighlight.remove();
          }
          document.body.removeEventListener("mouseleave", this._mouseLeaveListener);
          this._selectedElement = null;
          this.at.enablePseudoStates();
          this.deactivatePseudoStates(this.at.currentScreen);
          this.removeMeasureElements();
      }

      screenWillChange() {
          this.deactivatePseudoStates(this.at.currentScreen);
          this.removeMeasureElements();
      }

      screenDidChange(newScreen) {
          this.activatePseudoStates(newScreen);
          this.addMeasureElements();
      }

      targetFromEventTarget(target) {
          if (!target) {
              return null;
          }

          function isATElement(target) {
              return (target.nodeName.toLowerCase() == "cell" || target.nodeName.toLowerCase() == "body") && target.figure;
          }

          if (isATElement(target)) {
              return target;
          }

          let targetElement = target.parentElement;
          while (targetElement != null && !isATElement(targetElement)) {
              targetElement = targetElement.parentElement;
          }

          return targetElement;
      }



      mouseMove(e) {
          let element = this.targetFromEventTarget(e.target);

          if (element == null) {
              return;
          }

          this._mouseOverElement = element;

          this.showMeasures(element);
      }

      showMeasures(element) {
          let bounds = globalBoundsOfElement(element);
          this._mouseOverHighlight = getOrCreateDiv("high");
          this._mouseOverHighlight.style.top = bounds.top + "px";
          this._mouseOverHighlight.style.left = bounds.left + "px";
          this._mouseOverHighlight.style.width = bounds.width + "px";
          this._mouseOverHighlight.style.height = bounds.height + "px";
          this._mouseOverHighlight.style.display = "block";
          let selected = globalBoundsOfElement(this._selectedElementHighlight);



          let selectedLeft = selected.left;
          let selectedWidth = selected.width;
          let selectedTop = selected.top;
          let selectedHeight = selected.height;
          let mouseOverLeft = bounds.left;
          let mouseOverWidth = bounds.width;
          let mouseOverTop = bounds.top;
          let mouseOverHeight = bounds.height;


          let measureHor = document.getElementById("measure-hor");
          let measureHorBounds = globalBoundsOfElement(measureHor);
          let measureHor2 = document.getElementById("measure-hor2");
          let measureHor2Bounds = globalBoundsOfElement(measureHor2);
          let measureVert = document.getElementById("measure-vert");
          let measureVertBounds = globalBoundsOfElement(measureVert);
          let measureVert2 = document.getElementById("measure-vert2");
          let measureVert2Bounds = globalBoundsOfElement(measureVert2);
          let measureHorHeight = measureHorBounds.height;
          let measureHor2Height = measureHor2Bounds.height;
          let measureVertWidth = measureVertBounds.width;
          let measureVert2Width = measureVert2Bounds.width;
          let measureVertNumber = document.getElementById("measure-vert-number");
          let measureVert2Number = document.getElementById("measure-vert2-number");
          let measureHorNumber = document.getElementById("measure-hor-number");
          let measureHor2Number = document.getElementById("measure-hor2-number");

          let selectedStyles = getComputedStyle(this._selectedElement);
          let selectedLeftBorder = parseInt(selectedStyles.borderLeftWidth);
          let selectedRightBorder = parseInt(selectedStyles.borderRightWidth);
          let selectedTopBorder = parseInt(selectedStyles.borderRightWidth);
          let selectedBottomBorder = parseInt(selectedStyles.borderBottomWidth);

          let mouseOverStyles = getComputedStyle(element);
          let mouseOverLeftBorder = parseInt(mouseOverStyles.borderLeftWidth);
          let mouseOverRightBorder = parseInt(mouseOverStyles.borderRightWidth);
          let mouseOverTopBorder = parseInt(mouseOverStyles.borderRightWidth);
          let mouseOverBottomBorder = parseInt(mouseOverStyles.borderBottomWidth);

          // let selectedBorderHor = selectedLeftBorder + selectedRightBorder;
          // let selectedBorderVert = selectedTopBorder + selectedBottomBorder;

          //Measures Horizontal
          if (mouseOverLeft - (selectedLeft + selectedWidth) > 0) {
              // Mouse over element is to the right of the selected element
              measureHor.style.display = "flex";
              measureHor2.style.display = "none";
              measureHor.style.left = (selectedLeft + selectedWidth) + "px";
              measureHor.style.width = (mouseOverLeft - (selectedLeft + selectedWidth)) + "px";
              measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
              let measureNumber = document.getElementById("measure-hor-number");
              measureNumber.innerHTML = Math.round((mouseOverLeft - (selectedLeft + selectedWidth)));
              measureVert.style.display = "none";
              measureVert2.style.display = "none";




              // if (Number.isNaN(borderHorSelected) == false)  {
              //   console.log(styles);
              // }
          }
          else if (mouseOverLeft <= selectedLeft && (mouseOverLeft + mouseOverWidth) >= (selectedLeft + selectedWidth)) {
              // Mouse over element is bigger:  left is smaller and  right is larger than the selected element
              measureHor.style.display = "flex";
              measureHor.style.left = mouseOverLeft + "px";
              measureHor.style.width = (selectedLeft - mouseOverLeft) + "px";
              measureHor.style.top = selectedTop + (selectedHeight / 2) - measureHorHeight + "px";
              let measureNumber = document.getElementById("measure-hor-number");
              measureNumber.innerHTML = Math.round((selectedLeft - mouseOverLeft - mouseOverLeftBorder));
              measureHor2.style.display = "flex";
              measureHor2.style.left = (selectedLeft + selectedWidth) + "px";
              measureHor2.style.width = ((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)) + "px";
              measureHor2.style.top = selectedTop + (selectedHeight / 2) - measureHor2Height + "px";
              let measureNumber2 = document.getElementById("measure-hor2-number");
              measureNumber2.innerHTML = Math.round(((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)  - mouseOverRightBorder));
              // if (selectedLeft > mouseOverLeft) {
              //   measureHor.style.display = "none";
              //   measureHor2.style.display = "none";
              // }
          }
          else if (selectedLeft <= mouseOverLeft && (mouseOverLeft + mouseOverWidth) <= (selectedLeft + selectedWidth)) {
              // Mouse over element is smaller: left is bigger and right is smaller than the selected element
              measureHor.style.display = "flex";
              measureHor.style.left = selectedLeft + "px";
              measureHor.style.width = (mouseOverLeft - selectedLeft) + "px";
              measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
              let measureNumber = document.getElementById("measure-hor-number");
              measureNumber.innerHTML = Math.round((mouseOverLeft - selectedLeft - selectedLeftBorder));
              measureHor2.style.display = "flex";
              measureHor2.style.left = (mouseOverLeft + mouseOverWidth) + "px";
              measureHor2.style.width = ((selectedLeft + selectedWidth) - (mouseOverLeft + mouseOverWidth)) + "px";
              measureHor2.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHor2Height + "px";
              let measureNumber2 = document.getElementById("measure-hor2-number");
              measureNumber2.innerHTML = Math.round(((selectedLeft + selectedWidth) - (mouseOverLeft + mouseOverWidth)) - selectedRightBorder);
              // if (selectedLeft <= mouseOverLeft) {
              //   measureHor.style.display = "none";
              //   measureHor2.style.display = "none";
              // }
          }
          else if (selectedLeft <= mouseOverLeft && (mouseOverLeft + mouseOverWidth) >= (selectedLeft + selectedWidth)) {
              // left and right egde of mouse over is bigger
              measureHor.style.display = "none";
              // measureHor.style.left = selectedLeft + "px";
              // measureHor.style.width = (mouseOverLeft - selectedLeft) + "px";
              // measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
              //
              // let measureNumber = document.getElementById("measure-hor-number");
              // measureNumber.innerHTML = Math.round(mouseOverLeft - selectedLeft);
              measureHor2.style.display = "none";
              // measureHor2.style.left = (selectedLeft + selectedWidth) + "px";
              // measureHor2.style.width = ((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)) + "px";
              // measureHor2.style.top = mouseOverTop - measureHorHeight - 5  + "px";
              //
              // let measureNumber2 = document.getElementById("measure-hor2-number");
              // measureNumber2.innerHTML = Math.round(((mouseOverLeft + mouseOverWidth) - (selectedLeft + selectedWidth)));
          }
          else if (selectedLeft >= mouseOverLeft && (mouseOverLeft + mouseOverWidth) <= (selectedLeft + selectedWidth) && (mouseOverLeft + mouseOverWidth) >= selectedLeft) {
              // left and right egde of mouse over is smaller
              measureHor.style.display = "none";
              // measureHor.style.left = mouseOverLeft + mouseOverWidth + "px";
              // measureHor.style.width = ((selectedLeft + selectedWidth) - (mouseOverLeft + mouseOverWidth)) + "px";
              // measureHor.style.top =  mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
              //
              // let measureNumber = document.getElementById("measure-hor-number");
              // measureNumber.innerHTML = Math.round((mouseOverLeft + mouseOverWidth) - selectedLeft);
              measureHor2.style.display = "none";
              // measureHor2.style.left = mouseOverLeft + "px";
              // measureHor2.style.width = selectedLeft - mouseOverLeft + "px";
              // measureHor2.style.top = mouseOverTop - measureHorHeight - 5  + "px";
              //
              // let measureNumber2 = document.getElementById("measure-hor2-number");
              // measureNumber2.innerHTML = Math.round(selectedLeft - mouseOverLeft);
          }
          else {
              // Mouse over element is to the left of the selected element
              measureHor.style.display = "flex";
              measureHor2.style.display = "none";
              measureHor.style.left = (mouseOverLeft + mouseOverWidth) + "px";
              measureHor.style.width = (selectedLeft - (mouseOverLeft + mouseOverWidth)) + "px";
              measureHor.style.top = mouseOverTop + (mouseOverHeight / 2) - measureHorHeight + "px";
              let measureNumber = document.getElementById("measure-hor-number");
              measureNumber.innerHTML = Math.round((selectedLeft - (mouseOverLeft + mouseOverWidth)));
          }
          // Horizontal is 0
          if (selectedLeft == mouseOverLeft) {
              measureHor.style.display = "none";
          }
          if (selectedLeft + selectedWidth == mouseOverLeft + mouseOverWidth) {
              measureHor2.style.display = "none";
          }
          //Vertical Measures
          if (mouseOverTop - (selectedTop + selectedHeight) > 0) {
              // Mouse over element is below the selected element
              measureVert.style.display = "flex";
              measureVert2.style.display = "none";
              measureVert.style.top = (selectedTop + selectedHeight) + "px";
              measureVert.style.height = (mouseOverTop - (selectedTop + selectedHeight)) + "px";
              measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
              let measureVertNumber = document.getElementById("measure-vert-number");
              measureVertNumber.innerHTML = Math.round((mouseOverTop - (selectedTop + selectedHeight)));
              // measureHor.style.display = "none"
              // measureHor2.style.display = "none"
          }
          else if (mouseOverTop <= selectedTop && (mouseOverTop + mouseOverHeight) >= (selectedTop + selectedHeight)) {
              // Mouse over element is bigger: starts at top of and ends below the selected element
              measureVert.style.display = "flex";
              measureVert.style.top = mouseOverTop + "px";
              measureVert.style.height = (selectedTop - mouseOverTop) + "px";
              measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
              let measureVertNumber = document.getElementById("measure-vert-number");
              measureVertNumber.innerHTML = Math.round((selectedTop - mouseOverTop  - mouseOverTopBorder));
              measureVert2.style.display = "flex";
              measureVert2.style.top = (selectedTop + selectedHeight) + "px";
              measureVert2.style.height = ((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight)) + "px";
              measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
              let measureVertNumber2 = document.getElementById("measure-vert2-number");
              measureVertNumber2.innerHTML = Math.round(((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight) - mouseOverBottomBorder));
          }
          else if (selectedTop <= mouseOverTop && (mouseOverTop + mouseOverHeight) <= (selectedTop + selectedHeight)) {
              // Mouse over element is smaller: top and bottom are smaller than the selected element
              measureVert.style.display = "flex";
              measureVert.style.top = selectedTop + "px";
              measureVert.style.height = (mouseOverTop - selectedTop) + "px";
              measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
              let measureVertNumber = document.getElementById("measure-vert-number");
              measureVertNumber.innerHTML = Math.round(mouseOverTop - selectedTop - selectedTopBorder );
              measureVert2.style.display = "flex";
              measureVert2.style.top = (mouseOverTop + mouseOverHeight) + "px";
              measureVert2.style.height = ((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight)) + "px";
              measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
              let measureVertNumber2 = document.getElementById("measure-vert2-number");
            //  console.log(selectedBorderVert);
              measureVertNumber2.innerHTML = Math.round(((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight) - selectedBottomBorder ));

          }
          else if (mouseOverTop >= selectedTop && (mouseOverTop + mouseOverHeight) >= (selectedTop + selectedHeight)) {
              // top and bottom of mouse over is bigger
              measureVert.style.display = "flex";
              measureVert.style.top = selectedTop + "px";
              measureVert.style.height = (mouseOverTop - selectedTop) + "px";
              measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
              let measureVertNumber = document.getElementById("measure-vert-number");
              measureVertNumber.innerHTML = Math.round(mouseOverTop - selectedTop);
              measureVert2.style.display = "flex";
              measureVert2.style.top = (selectedTop + selectedHeight) + "px";
              measureVert2.style.height = ((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight)) + "px";
              measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
              let measureVertNumber2 = document.getElementById("measure-vert2-number");
              measureVertNumber2.innerHTML = Math.round(((mouseOverTop + mouseOverHeight) - (selectedTop + selectedHeight)));
          }
          else if (mouseOverTop <= selectedTop && (mouseOverTop + mouseOverHeight) <= (selectedTop + selectedHeight) && (mouseOverTop + mouseOverHeight) >= selectedTop) {
              // top and bottom of selected is bigger
              measureVert.style.display = "none";
              // measureVert.style.top = mouseOverTop + "px";
              // measureVert.style.height = (selectedTop - mouseOverTop) + "px";
              // measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
              //
              // let measureVertNumber = document.getElementById("measure-vert-number");
              // measureVertNumber.innerHTML = Math.round(selectedTop - mouseOverTop);
              measureVert2.style.display = "none";
              // measureVert2.style.top = (mouseOverTop + mouseOverHeight) + "px";
              // measureVert2.style.height = ((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight)) + "px";
              // measureVert2.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVert2Width + "px";
              //
              // let measureVertNumber2 = document.getElementById("measure-vert2-number");
              // measureVertNumber2.innerHTML = Math.round(((selectedTop + selectedHeight) - (mouseOverTop + mouseOverHeight)));
          }
          else {
              // Mouse over element is above the selected element
              measureVert.style.display = "flex";
              measureVert2.style.display = "none";
              measureVert.style.top = (mouseOverTop + mouseOverHeight) + "px";
              measureVert.style.height = (selectedTop - (mouseOverTop + mouseOverHeight)) + "px";
              measureVert.style.left = mouseOverLeft + (mouseOverWidth / 2) - measureVertWidth + "px";
              let measureVertNumber = document.getElementById("measure-vert-number");
              measureVertNumber.innerHTML = Math.round((selectedTop - (mouseOverTop + mouseOverHeight)));
          }
          // Vertical is 0
          if (selectedTop == mouseOverTop) {
              measureVert.style.display = "none";
          }
          if ((selectedTop + selectedHeight) == (mouseOverTop + mouseOverHeight)) {
              measureVert2.style.display = "none";
          }
          // Offset measure numbers if narrow
          let measureHorWidth = measureHor.style.width;
          let measureHorWidthNumber = parseInt(measureHorWidth, 10);
          if (measureHorWidthNumber < 15) {
              measureHorNumber.className = "numberOffsetLeft";
          }
          else {
              measureHorNumber.className = "numberOffsetLeftNo";
          }
          let measureHor2Width = measureHor2.style.width;
          let measureHor2WidthNumber = parseInt(measureHor2Width, 10);
          if (measureHor2WidthNumber < 15) {
              measureHor2Number.className = "numberOffsetRight";
          }
          else {
              measureHor2Number.className = "numberOffsetRightNo";
          }
          let measureVertHeight = measureVert.style.height;
          let measureVertHeightNumber = parseInt(measureVertHeight, 10);
          if (measureVertHeightNumber < 15) {
              measureVertNumber.className = "numberOffsetTop";
          }
          else {
              measureVertNumber.className = "numberOffsetTopNo";
          }
          let measureVert2Height = measureVert2.style.height;
          let measureVert2HeightNumber = parseInt(measureVert2Height, 10);
          if (measureVert2HeightNumber < 15) {
              measureVert2Number.className = "numberOffsetBottom";
          }
          else {
              measureVert2Number.className = "numberOffsetLeftBottomNo";
          }
      }

      mouseClick(e) {
          let element = this.targetFromEventTarget(e.target);
          if (element == null) {
              return;
          }

          this.selectElement(element);



      }


      keyDown(e) {
          if (e.metaKey || e.ctrlKey) {
              if (e.key == "ArrowUp") {
                  this.selectContainer();
                  e.preventDefault();
              }
              if (e.key == "ArrowDown") {
                  this.selectFirstChild();
                  e.preventDefault();
              }

              if (e.key == "ArrowLeft") {
                  this.selectPreviousSibling();
                  e.preventDefault();
              }

              if (e.key == "ArrowRight") {
                  this.selectNextSibling();
                  e.preventDefault();
              }
          }

      }

      /**
       * selects the given element (HTMLElement but part of Antetype).
       * Shows the selection rect and sends the properties to the spec-inspector
       */

      selectElement(element) {
          window.cancelAnimationFrame(this._updateMarkerID);
          this._selectedElement = element;



          let lastBounds;

          // handler for requestAnimationFrame to update the markers if the user scolls
          // or resizes the window:
          let updateMarkers = () => {
              let bounds = globalBoundsOfElement(element);


              if (!lastBounds || bounds.height != lastBounds.height || bounds.left != lastBounds.left || bounds.top != lastBounds.top || bounds.width != lastBounds.width) {
                  lastBounds = bounds;
                  this._selectedElementHighlight = getOrCreateDiv("high2");
                  this._selectedElementHighlight.style.top = bounds.top + "px";
                  this._selectedElementHighlight.style.left = bounds.left + "px";
                  this._selectedElementHighlight.style.width = bounds.width + "px";
                  this._selectedElementHighlight.style.height = bounds.height + "px";
                  this._selectedElementHighlight.style.display = "block";







                  this.sendStylesToInspector(element);

                  let selected = globalBoundsOfElement(this._selectedElementHighlight);
                  let selectedLeft = selected.left;
                  let selectedWidth = selected.width;
                  let selectedTop = selected.top;
                  let selectedHeight = selected.height;

                  let guidesVertical = getOrCreateDiv("guides-vertical");
                  let guidesHorizontal = getOrCreateDiv("guides-horziontal");

                  guidesVertical.style.left = selectedLeft + "px";
                  guidesVertical.style.width = selectedWidth + "px";
                  guidesVertical.style.height = document.body.scrollHeight + "px";


                  guidesHorizontal.style.top = selectedTop + "px";
                  guidesHorizontal.style.height = selectedHeight + "px";
                  guidesHorizontal.style.width = document.body.scrollWidth + "px";

                  if (this._mouseOverElement)
                      this.showMeasures(this._mouseOverElement);

              }
              this._updateMarkerID = window.requestAnimationFrame(updateMarkers);
          };

          this._updateMarkerID = window.requestAnimationFrame(updateMarkers);


          // hide measures if selection changes

          this.hideMeasures();

      }

      hideMeasures() {
          let measureHor = document.getElementById("measure-hor");
          measureHor.style.display = "none";

          let measureHor2 = document.getElementById("measure-hor2");
          measureHor2.style.display = "none";

          let measureVert = document.getElementById("measure-vert");
          measureVert.style.display = "none";

          let measureVert2 = document.getElementById("measure-vert2");
          measureVert2.style.display = "none";
      }

      /**
       * returns a an object with the various properties displayed in the
       * Spec-inspector. We have to use sendMessage() between the viewer-frame
       * and the outer frame displaying the toolbar (to run it locally in chrome).
       *
       * see
       *
       * @param {HTMLElement} element
       * @returns {Object} transferObject
       */
      getStylesFromElement(element) {
          const elestyle = getComputedStyle(element);
          let fontFamily = elestyle.fontFamily;
          //        fontFamily = fontFamily.split(',')[0];

          // Firefox has a slightly different way, it looks like it does
          // not supply the combined properties, so we have to do it:
          let flexStyle = elestyle.flex;
          if (flexStyle == "") {
              flexStyle = elestyle.flexGrow + " " + elestyle.flexShrink + " " + elestyle.flexBasis;
          }


          function encodeColor(cssValue, element, key) {
              const figure = element.figure;
              if (figure == undefined || cssValue == "transparent") {
                  return { colorValue: "transparent" };
              }
              const color = figure.valueForKeyInStateWithIdentifier(key, figure.activeStateIdentifier);
              const hexValue = rgb2hex(color.colorValue.rgbaString());
              const cpColorEncoded = {};
              Object.assign(cpColorEncoded, color.colorValue);
              return { name: color.name, colorValue: hexValue, cpColor: cpColorEncoded };
          }

          function roundDimension(dimensionString) {
              let x = parseFloat(dimensionString);
              return Math.round(x) + "px";
          }

          // Properties directly from the browser:
          const transferObject = {
              fontColor: encodeColor(elestyle.color, element, "textColor"),
              backgroundColor: encodeColor(elestyle.backgroundColor, element, "backgroundColor"),
              backgroundImage: elestyle.backgroundImage,

              marginTop: elestyle.marginTop,
              marginBottom: elestyle.marginBottom,
              marginLeft: elestyle.marginLeft,
              marginRight: elestyle.marginRight,

              paddingTop: elestyle.paddingTop,
              paddingBottom: elestyle.paddingBottom,
              paddingLeft: elestyle.paddingLeft,
              paddingRight: elestyle.paddingRight,


              borderTopLeftRadius: elestyle.borderTopLeftRadius,
              borderTopRightRadius: elestyle.borderTopRightRadius,
              borderBottomRightRadius: elestyle.borderBottomRightRadius,
              borderBottomLeftRadius: elestyle.borderBottomLeftRadius,

              width: roundDimension(elestyle.width),
              height: roundDimension(elestyle.height),
              fontFamily: fontFamily,
              fontSize: elestyle.fontSize,
              flex: flexStyle,
              shadow: elestyle.boxShadow,
              opacity: elestyle.opacity,

              borderBottomWidth: elestyle.borderBottomWidth,
              borderBottomStyle: elestyle.borderBottomStyle,
              borderBottomColor: encodeColor(elestyle.borderBottomColorm, element, "borderBottomColor"),

              borderTopWidth: elestyle.borderTopWidth,
              borderTopStyle: elestyle.borderTopStyle,
              borderTopColor: encodeColor(elestyle.borderTopColor, element, "borderTopColor"),

              borderLeftWidth: elestyle.borderLeftWidth,
              borderLeftStyle: elestyle.borderLeftStyle,
              borderLeftColor: encodeColor(elestyle.borderLeftColor, element, "borderLeftColor"),

              borderRightWidth: elestyle.borderRightWidth,
              borderRightStyle: elestyle.borderRightStyle,
              borderRightColor: encodeColor(elestyle.borderRightColor, element, "borderRightColor")
          };


          // if we have a Antetype cell, use it too:
          let cell = element.figure;
          if (cell) {
              const hor = cell.valueForKeyInStateWithIdentifier("horizontalResizing", cell.activeStateIdentifier);
              const ver = cell.valueForKeyInStateWithIdentifier("verticalResizing", cell.activeStateIdentifier);
              const cl = cell.valueForKeyInStateWithIdentifier("layoutPolicyCode", cell.activeStateIdentifier);

              if (hor == GDFlexResizing) {
                  transferObject.horV = "Stretch";
              } else if (hor == GDFixResizing) {
                  transferObject.horV = "Manual";
              } else {
                  transferObject.horV = "Shrink";
              }


              if (ver == GDFlexResizing) {
                  transferObject.verV = "Stretch";
              } else if (ver == GDFixResizing) {
                  transferObject.verV = "Manual";
              } else {
                  transferObject.verV = "Shrink";
              }

              if (cl == GDFixedLayoutPolicyCode) {
                  transferObject.clV = "Free";
              } else if (cl == GDAlignmentLayoutPolicyCode) {
                  transferObject.clV = "Stacked";
              } else if (cl == GDHorizontalBoxLayoutPolicyCode) {
                  transferObject.clV = "Horizontal Flow";
              } else {
                  transferObject.clV = "Vertical Flow";
              }

              const textString = cell.valueForKeyInStateWithIdentifier("textString", cell.activeStateIdentifier);

              transferObject.hasText = textString != undefined && textString.length > 0;
              transferObject.textString = textString;


              const activeLayout = cell.valueForKeyInStateWithIdentifier("activeLayout", cell.activeStateIdentifier);


              if (!activeLayout) {
                  transferObject.activeLayout = "none";
              } else {
                  const verticalAlignment = cell.valueForKeyInStateWithIdentifier("activeVerticalAlignment", cell.activeStateIdentifier);
                  const horizontalAlignment = cell.valueForKeyInStateWithIdentifier("activeHorizontalAlignment", cell.activeStateIdentifier);
                  let verticalAlignmentString = "";

                  switch (verticalAlignment) {
                      case GDTopAlignment: verticalAlignmentString = "top";
                          break;
                      case GDCenterAlignment: verticalAlignmentString = "center";
                          break;
                      case GDBottomAlignment: verticalAlignmentString = "bottom";
                          break;
                  }

                  let horizontalAlignmentString = "";

                  switch (horizontalAlignment) {
                      case GDLeftAlignment: horizontalAlignmentString = "left";
                          break;
                      case GDCenterAlignment: horizontalAlignmentString = "center";
                          break;
                      case GDRightAlignment: horizontalAlignmentString = "right";
                          break;
                  }

                  transferObject.activeLayout = `${verticalAlignmentString}/${horizontalAlignmentString}`;


              }

              // add shadows:
              const state = cell.activeStateIdentifier;
              if (cell.valueForKeyInStateWithIdentifier("dropShadow", state)) {
                  const color = encodeColor("", element, "dropShadowColor");

                  transferObject.dropShadow = {
                      color: color,
                      angle: cell.valueForKeyInStateWithIdentifier("dropShadowAngle", state),
                      blur: cell.valueForKeyInStateWithIdentifier("dropShadowBlur", state),
                      size: cell.valueForKeyInStateWithIdentifier("dropShadowSize", state),
                      offset: cell.valueForKeyInStateWithIdentifier("dropShadowOffset", state)
                  };
              }


              if (cell.valueForKeyInStateWithIdentifier("innerShadow", state)) {
                  const color = encodeColor("", element, "innerShadowColor");

                  transferObject.innerShadow = {
                      color: color,
                      angle: cell.valueForKeyInStateWithIdentifier("innerShadowAngle", state),
                      blur: cell.valueForKeyInStateWithIdentifier("innerShadowBlur", state),
                      offset: cell.valueForKeyInStateWithIdentifier("innerShadowOffset", state)
                  };


              }

              // min/max
              let minimumWidth = cell.valueForKeyInStateWithIdentifier("minimumWidth", state);
              if (hor != GDFixResizing && minimumWidth > 3) {
                  transferObject.minimumWidth = minimumWidth + "px";
              }

              let minimumHeight = cell.valueForKeyInStateWithIdentifier("minimumHeight", state);
              if (ver != GDFixResizing && minimumHeight > 3) {
                  transferObject.minimumHeight = minimumHeight + "px";
              }

              let maximumWidth = cell.valueForKeyInStateWithIdentifier("maximumWidth", state);
              if (hor != GDFixResizing && maximumWidth != GDMaxSizeValue) {
                  transferObject.maximumWidth = maximumWidth + "px";
              }

              let maximumHeight = cell.valueForKeyInStateWithIdentifier("maximumHeight", state);
              if (ver != GDFixResizing && maximumHeight != GDMaxSizeValue) {
                  transferObject.maximumHeight = maximumHeight + "px";
              }

              let customCSS = cell.valueForKeyInStateWithIdentifier("customCSS", state);
              if (customCSS) {
                  transferObject.customCSS = customCSS;
              }

              let backgroundPainterType = cell.valueForKeyInStateWithIdentifier("backgroundPainterType", state);
              transferObject.backgroundPainterType = backgroundPainterType;

          }

          return transferObject;
      }



      /**
       * get the computed css-styles/properties of the element and send it to
       * the inspector (in the parentFrame).
       *
       * @param {HTMLElement} element
       */
      sendStylesToInspector(element) {
          const transferObject = this.getStylesFromElement(element);

          if (window.parent) {
              const command = {
                  command: "updateSpecInspector",
                  parameters: transferObject
              };
              window.parent.postMessage(command, "*");
          }
      }

      selectContainer() {
          if (this._selectedElement == null) {
              return;
          }

          let parent = this._selectedElement.parentElement;

          let antetypeParentElement = this.targetFromEventTarget(parent);
          if (antetypeParentElement == null) {
              return;
          }

          this.selectElement(antetypeParentElement);
      }

      selectFirstChild() {
          if (this._selectedElement == null) {
              return;
          }

          let selectedFigure = this._selectedElement.figure;
          if (!selectedFigure) {
              return;
          }

          if (selectedFigure.orderedComponents.length == 0) {
              return;
          }

          let firstChildFigure = selectedFigure.orderedComponents[0];

          this.selectElement(firstChildFigure.DOMElement);
      }

      selectPreviousSibling() {
          if (this._selectedElement == null) {
              return;
          }

          let selectedFigure = this._selectedElement.figure;
          if (!selectedFigure) {
              return;
          }

          let container = selectedFigure.container;
          if (!container) {
              return;
          }

          let index = container.orderedComponents.indexOf(selectedFigure);
          if (index == 0) {
              let lastChild = container.orderedComponents[container.orderedComponents.length - 1];
              this.selectElement(lastChild.DOMElement);
              return;
          }

          let previousSibling = container.orderedComponents[index - 1];

          this.selectElement(previousSibling.DOMElement);
      }

      selectNextSibling() {
          if (this._selectedElement == null) {
              return;
          }

          let selectedFigure = this._selectedElement.figure;
          if (!selectedFigure) {
              return;
          }

          let container = selectedFigure.container;
          if (!container) {
              return;
          }

          let index = container.orderedComponents.indexOf(selectedFigure);
          if (index == container.orderedComponents.length - 1) {
              this.selectElement(container.orderedComponents[0].DOMElement);
              return;
          }

          let nextSibling = container.orderedComponents[index + 1];

          this.selectElement(nextSibling.DOMElement);
      }

  }

  gdPostViewerMessage('startLoadProject');

  // communication between the main frame an the iframe of the real viewer
  // needs postMessage, direct JavaScript-Access is not possible if the
  // prototype is opened from the filesystem:
  window.addEventListener("message", function(e) {
      switch (e.data.command) {
          case  "gotoNextScreen": Antetype.gotoNextScreen(); break;
          case  "gotoPreviousScreen": Antetype.gotoPreviousScreen(); break;
          case "gotoScreenWithIndex": {
              let index = e.data.parameters;
              let screen = Antetype.project.orderedScreens[index];
              Antetype.gotoScreen(screen);
          }
          break;  
          case "gotoScreenWithID":  {
              let identifier = e.data.parameters;
              let screen = Antetype.project.orderedScreens.find( s => s.objectID == identifier);
              if (screen) {
                  Antetype.gotoScreen(screen);
              }
          }
          break;
          case "showInteractions":
              Antetype.currentTool.keyDown({key: "Alt"});
              break;

          case "hideInteractions":
              Antetype.currentTool.keyUp({key: "Alt"});
              break;

      }

  });

  /**
   * Extract the size information from an antetype screen
   * @param {Object} currentScreen this should be an antetype screen
   */
  function extractScreenSizeInformation(currentScreen) {
    return {
      width: currentScreen.valueForKeyInStateWithIdentifier('width', currentScreen.activeStateIdentifier),
      maxWidth: currentScreen.valueForKeyInStateWithIdentifier('maximumWidth', currentScreen.activeStateIdentifier),
      minWidth: currentScreen.valueForKeyInStateWithIdentifier('minimumWidth', currentScreen.activeStateIdentifier),
      height: currentScreen.valueForKeyInStateWithIdentifier('height', currentScreen.activeStateIdentifier),
      maxHeight: currentScreen.valueForKeyInStateWithIdentifier('maximumHeight', currentScreen.activeStateIdentifier),
      minHeight: currentScreen.valueForKeyInStateWithIdentifier('minimumHeight', currentScreen.activeStateIdentifier)
    }
  }

  // send the command-object to the parent frame
  function sendToParentWindow(command) {
      window.parent.postMessage(command, "*");
  }

  window.addEventListener("load", function() {
      // create the Antetype-object. window.projectJSON already contains the data of the project (minus the screens)
      // window.screenJSON contains an array of the serialized screens

      initializeAntetypeViewer();
      let antetype = Antetype;

      antetype.project = new GDProject(projectJSON,null);
      antetype.project.at = antetype;
      for (var i=0;i<screenJSON.length; i++) {
          var s = GDModelObject.fromJSONObjectInProject(screenJSON[i], antetype.project);
          antetype.project.addScreen(s);
      }

      // send the screen names and prototype tile to the parent frame (to build the screen-menu)
      sendToParentWindow({command: "buildScreens", parameters: Antetype.project.orderedScreens.map(s => s.name)});

      displayName = displayName.replace(".atype", "");
      sendToParentWindow({command: "setTitle", parameters: displayName});
      document.title = displayName;

      // select the right screen
      antetype.currentScreen = antetype.project.orderedScreens[currentScreenIndex];

      // makes sure the prerendered screen has all the JavaScript-relationships set:
      antetype.connectObjects();


      // if the screen is changed make sure the parent-frame (or iOS-viewer) get the current screen index
      var screenChangeFunction = function() {
          gdPostViewerMessage("didChangeScreen", {"currentScreenIndex": antetype.currentScreenIndex});
          sendToParentWindow({command: "selectScreenWithIndex", parameters: {"index": antetype.currentScreenIndex, "objectID": antetype.currentScreen.objectID}});
          sendToParentWindow({command: "updateIFrame", parameters: extractScreenSizeInformation(antetype.currentScreen)});
      };

      antetype.onScreenChange = screenChangeFunction;
      screenChangeFunction();


      var finishParams = { screenNames: antetype.screenNames, currentScreenIndex: antetype.currentScreenIndex };
      gdPostViewerMessage('finishLoadProject', finishParams);


      // "t" toggles the toolbar:
      window.addEventListener("keypress", function(e) {
          if (e.key === "t") {
              sendToParentWindow({command: "toggleToolbar"});
          }
      });

      // execute load actions for first screen:
      antetype.currentTool.screenDidChange(antetype.currentScreen);

  });



  // just like the normal tools, but for specification
  let specTool = null;


  // since we have to cross frames (and have to work without web server) we send
  // messages between the frames. This are the messages which are called by the main frame.
  window.addEventListener("message", e => {
      if (specTool == null) {
          specTool = new GDSpecTool(Antetype);
      }
      switch (e.data.command) {
          case "enableSpecTool": Antetype.setCurrentTool(specTool);
              break;

          case "disableSpecTool": Antetype.setCurrentTool(Antetype.runTool);
              break;

          case "selectParent": specTool.selectContainer();
              break;

          case "selectFirstChild": specTool.selectFirstChild();
              break;

          case "selectPreviousSibling": specTool.selectPreviousSibling();
              break;

          case "selectNextSibling": specTool.selectNextSibling();
              break;

      }

  });

}());
