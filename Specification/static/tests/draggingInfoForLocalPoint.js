import { globalBoundsOfElement } from '../modules/utils.js';

export function draggingInfoForLocalPoint(test, x, y) {
    let bounds = globalBoundsOfElement(test.at.screenElement);
    return { pageX: bounds.left + x, pageY: bounds.top + y };
}
export function draggingInfoForCenterOfFigure(test, figure) {
    let bounds = globalBoundsOfElement(figure.DOMElement);
    return { pageX: bounds.left + bounds.width / 2, pageY: bounds.top + bounds.height / 2 };
}
