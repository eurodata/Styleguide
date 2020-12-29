export class GDLiveLayouterModeSelector {
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
