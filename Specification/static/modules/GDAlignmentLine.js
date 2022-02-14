export class GDAlignmentLine {
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
            e.style.borderTop = "1px solid #ed0c4f"; 
            const width = (this.endX - this.startX);
            e.style.width = `calc(${width}px*var(--current-zoom))`;
            e.style.height = "2px";
            e.style.transform = "scale(calc(1/var(--current-zoom)))";
            e.style.transformOrigin = "left top";
        } else {
            e.style.borderLeft= "1px solid #ed0c4f"; 
            const height = (this.endY - this.startY);
            e.style.height= `calc(${height}px*var(--current-zoom))`;
            e.style.width = "2px";
            e.style.transform = "scale(calc(1/var(--current-zoom)))"
            e.style.transformOrigin = "left top";
        }
        return e;
    
    }
}