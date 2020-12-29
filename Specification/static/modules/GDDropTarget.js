import { GDEqualRects } from './utils.js';

export class GDDropTarget {
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
