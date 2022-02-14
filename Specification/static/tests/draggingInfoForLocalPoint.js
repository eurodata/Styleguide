import { globalBoundsOfElement } from '../modules/utils.js';

export function draggingInfoForLocalPoint(at, x, y) {
    let bounds = globalBoundsOfElement(at.screenElement);
    return { pageX: bounds.left + x, pageY: bounds.top + y };
}
export function draggingInfoForCenterOfFigure(at, figure) {
    let bounds = globalBoundsOfElement(figure.DOMElement);
    return { pageX: bounds.left + bounds.width / 2, pageY: bounds.top + bounds.height / 2 };
}
