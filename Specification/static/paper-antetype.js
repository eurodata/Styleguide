"use strict"; 

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
            this._selectedPath.strokeColor = 'black';
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
            paperInstance.project.importJSON(savedState);
            
            if(paperInstance.project.activeLayer.children.length > 0) {
                this._selectedPath = paperInstance.project.activeLayer.children[0];
            }
        }
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

        return svg;
    }
}
