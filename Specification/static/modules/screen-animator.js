import { GDGotoScreenAction, GDModelObject } from './model.js';
import { cssClassNameForCell } from './styling.js';


/**
    Used for Screen-transitions (see GDGotoScreenAction). This one is used in the
    exported WebViewer, GDEditModeScreenAnimator is used in LivePreview/In-Place-Presentation-Mode.

    Normally, <body> contains the current screen. In case of a screen-transition 
    we move the content of the body (old screen) into a div, the new screen in 
    another div, animate both (or one, depending on the transition) and when 
    the animation finishes we delete the old-screen-div and move the contents of 
    the new screen-div into the body
*/
export class GDScreenAnimator {
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
                e.className = cssClassNameForCell(e.figure, at.project) 
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

        }
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
export class GDEditModeScreenAnimator extends GDScreenAnimator {
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
            }
            request.send();
        }
    }
}
