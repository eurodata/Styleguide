/* eslint-disable no-prototype-builtins */
import { GDStyleSheet } from "./GDStyleSheet.js";
import { cssSelectorInstance, GDCSSTransition, cssSelector, cssClassNameForCell } from "./styling.js";
import { Antetype } from './viewer.js';
import { globalBoundsOfElement } from "./utils.js";
import { GDLayoutPolicy } from "./layout-policy.js";

 


/*
    counterparts of the Antetype-objects. Minimal implementation. 

*/

export function gdStringHash(str) {
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
export class GDModelObject {
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
export class GDCompositeFigure extends GDModelObject {
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
export class GDWidgetInstanceCell extends GDCompositeFigure {
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
        this.orderedComponents.forEach(function(c) {c.cleanupStyles()});
        this.widget.states.forEach((state)  => { this.deleteCSSForState(state); });
    }

    /**
        the widget of this cell.  {@link GDWidget}
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
export class GDWidgetInstanceRootCell extends GDWidgetInstanceCell {
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
export class GDScreen extends GDWidgetInstanceRootCell {
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
export class GDResource extends GDModelObject {
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
export class GDImageResource extends GDResource {
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
export class GDLibrary extends GDModelObject {
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
export class GDProject extends GDModelObject {
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
export class GDDesignBreakPoint extends GDModelObject {
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
export class GDState extends GDModelObject {
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
     * @returns {Array<GDState>}
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


export const GDNoPainterType = 0;

export const GDRectangleCellType = 0,
    GDCircleCellType = 1, 
    GDTriangleCellType = 2,
    GDVectorCellType = 3;

	
export const GDLeftAlignment	= 0,
    GDCenterAlignment = 1,
	GDRightAlignment = 2,
	GDJustifiedAlignment = 3,

	GDTopAlignment = 0,
	GDBottomAlignment = 2,

	GDFixResizing = 0,	
	GDFlexResizing = 1,
	GDIntrinsicResizing = 2,

	GDFixedLayoutPolicyCode = 0,
	GDAlignmentLayoutPolicyCode = 1, 
	GDHorizontalBoxLayoutPolicyCode = 2,
	GDVerticalBoxLayoutPolicyCode = 3,
	GDTableLayoutPolicyCode = 4,

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
    GDBackgroundSizeCover = 2,

    GDMouseEnterEventType = "GDMouseEnterEventType",
    GDMouseLeaveEventType = "GDMouseLeaveEventType",
    GDMouseDownEventType = "GDMouseDownEventType",
    GDMouseUpEventType = "GDMouseUpEventType",
    GDMouseClickEventType = "GDMouseClickEventType",
    GDDoubleClickEventType = "GDDoubleClickEventType",
    GDRotateEventType = "GDRotateEventType",
    GDRightMouseDownEventType = "GDRightMouseDownEventType",
    GDRightMouseUpEventType = "GDRightMouseUpEventType",
    GDRightMouseClickEventType = "GDRightMouseClickEventType",

    GDScrollEventType = "GDScrollEventType",

    GDTouchEnterEventType = "GDTouchEnterEventType",
    GDTouchLeaveEventType = "GDTouchLeaveEventType",
    GDTouchDownEventType = "GDTouchDownEventType",
    GDTouchMoveEventType = "GDTouchMoveEventType",
    GDTouchStartEventType = "GDTouchStartEventType",
    GDTouchEndEventType = "GDTouchEndEventType",

    GDKeyPressEventType = "GDKeyPressEventType",
    GDKeyDownEventType = "GDKeyDownEventType",
    GDKeyUpEventType = "GDKeyUpEventType",

    GDIdleEventType = "GDIdleEventType",
    GDLoadEventType = "GDLoadEventType",
    GDUnloadEventType = "GDUnloadEventType",

    GDFocusEventType = "GDFocusEventType",
    GDFocusOutEventType = "GDFocusOutEventType",

    GDStopPropagationEventType = "GDStopPropagationEventType",

    GDDidBecomeVisibleEventType = "GDDidBecomeVisibleEventType",
    GDDidBecomeInvisibleEventType = "GDDidBecomeInvisibleEventType",


    GDMaxSizeValue = 1000000;


/**
    A look&feel stores the widget properties and manages the stylesheets used in the 
    prototype. 
    @extends {GDModelObject}
*/
export class GDLookAndFeel extends GDModelObject {
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
export class GDWidget extends GDModelObject {
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
        hierarchy {@link GDWidgetCellDefinition} of the widget cells. 
    */
    get hierarchy() {
        return this._hierarchy;
    }

    /**
        the states {@link GDState} of this widget. 
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
        return all instances {@link GDWidgetInstanceRootCell} of this widget
    */
    get instances() {
        return this.hierarchy.instances;
    }

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
export class GDWidgetCellDefinition extends GDModelObject {
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
export class GDWidgetRootCellDefinition extends GDWidgetCellDefinition {
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

export class GDEmbeddedWidgetDefinition extends GDWidgetCellDefinition {
    get isEmbeddedDefinition() {
        return true;
    }
}
GDModelObject.register(GDEmbeddedWidgetDefinition);


export class GDScreenDefinition extends GDWidgetRootCellDefinition {
    emptyInstanceCell() {
        return GDScreen.createInstance(this._project);
    }

}
GDModelObject.register(GDScreenDefinition);


export class GDEventHandler extends GDModelObject {
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

    addEventListener(at, DOMElement, type) {
        const fn = e => at.currentTool.executeEventHandler(this,e);
        DOMElement.addEventListener(type, fn);
        this._eventListeners.push({"type": type, "target": DOMElement, "fn": fn});
    }

    /**
        events which are not bubbling up are handled here. see {@link AntetypeWeb#addEventListeners}
        for the other events
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

            }
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
    an ActionSet (currently called Action group in the GUI). 
*/
export class GDActionSet extends GDModelObject {
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
export class GDAction extends GDModelObject {
    constructor(dictionary, project) {
        super(dictionary, project);
        this.specifier = dictionary["specifier"];
        this.animationDuration = dictionary["animationDuration"] || 0;
        this.animationCurve = dictionary["animationCurve"] || 0 ;
        this.delay = dictionary["delay"] || 0;
        this.animate = dictionary["animate"] || false;
        this.afterPrevious = dictionary["afterPrevious"];
        this.actionSet = null
        this._nextAction = null;
        this._nextActionTimeout = null;
    }

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
     * @return {Array} the target cells (Antetype-cells)
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
            this.actionSet.executeAction(this._nextAction, e)
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
export class GDToggleStateAction extends GDAction {
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
export class GDPropertyChangeAction extends GDAction {
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



export class GDChangeStateAction extends GDAction {
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


export class GDHideAction extends GDAction {
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


export class GDShowAction extends GDAction {
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


export class GDGotoScreenAction extends GDAction {
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
export class GDScriptAction extends GDAction {
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
export class GDPlayerAction extends GDAction {
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
export class GDEffectAction extends GDAction {
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

        domElement.className = originalClass + " "+ this.effectName+ " animated"
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
export class GDMoveInOtherElementAction extends GDAction {
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
export class GDUIColor extends GDModelObject {
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
export class GDOverwrittenUIColor extends GDUIColor {
    get isOverwritten() {
        return true;
    }
}
GDModelObject.register(GDOverwrittenUIColor);




export class GDDataBinding extends GDModelObject {

}
GDModelObject.register(GDDataBinding);




/* non-antetype objects: */



export function CPColor(d) {
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
}



CPColor.prototype.hexString = function() {
    function colorPart(n) {
        var s = Number(Math.round(n*255)).toString(16);
        if (s.length == 1)
            s = "0" + s;

        return s;
    }
    var result = "#" + colorPart(this.red) + colorPart(this.green) + colorPart(this.blue);

    return result;
}

CPColor.prototype.rgbaString = function() {
    return "rgba(" + Math.round(this.red*255) + "," + Math.round(this.green*255) + "," + Math.round(this.blue*255) + "," + this.alpha + ")";
}

CPColor.prototype.rgbStringWithAlpha = function(alpha) {
    return "rgba(" + Math.round(this.red*255) + "," + Math.round(this.green*255) + "," + Math.round(this.blue*255) + "," + alpha + ")";
}



CPColor.prototype.toString= function() {
    if (this.alpha == 1.0)
        return this.hexString();

    return this.rgbaString();
}

var whiteColor = new CPColor({NSColorValue: "1,1,1,1"});
var blackColor = new CPColor({NSColorValue: "0,0,0,1"});
CPColor.whiteColor = function() { return whiteColor; }
CPColor.blackColor = function() { return blackColor; }




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
}



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
}



