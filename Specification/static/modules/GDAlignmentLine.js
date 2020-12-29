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