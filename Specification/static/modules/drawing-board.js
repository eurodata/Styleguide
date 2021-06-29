window.addEventListener("load", (e) => {
  let iframe = document.getElementById("screenframe");
  iframe.src = document.location.pathname.replace(
    "drawing-board",
    "index_in_at"
  );

  var screen = iframe;
  var drawingBoard = document.body;

  var gestureStartScale = 0;
  var oldScale = 1;
  var scale = 1;
  var posX = 0;
  var posY = 0;
  var boundingX;
  var boundingY;
  var minZoom = 0.1;
  var maxZoom = 5;
  var boundingPadding = 200;

  let posGestureStart = { x: 0, y: 0 };
  let screenSizeGestureStart = { x: 0, y: 0 };
  let screenPosGestureStart = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 };
  let pointerRelative = { x: 0, y: 0 };

  //Eventlistener Screen
  iframe.onload = function () {
    iframe.contentDocument.addEventListener("wheel", onPan);
    iframe.contentDocument.addEventListener("gesturestart", onGestureStart);
    iframe.contentDocument.addEventListener("gesturechange", onGestureChange);
    iframe.contentDocument.addEventListener("gestureend", onGestureEnd);
    iframe.contentDocument.addEventListener("keydown", onKeyDown);
  };

  //Eventlistener Drawing Board
  window.addEventListener("wheel", onPan);
  window.addEventListener("gesturestart", onGestureStart);
  window.addEventListener("gesturechange", onGestureChange);
  window.addEventListener("gestureend", onGestureEnd);
  window.addEventListener("keydown", onKeyDown);

  //render()
  updateBoundingBox();

  function render() {
    window.requestAnimationFrame(() => {
      var val = `translate(${posX}px, ${posY}px) scale(${scale})`;
      screen.style.transform = val;
    });
    updateBoundingBox();
  }

  function onPan(e) {
    /* chrome
        if (e.ctrlKey) {
            e.preventDefault();
            scale -= e.deltaY * 0.01;
        } 
        */
    //pan with 2 fingers while holding cmd
    if (e.metaKey) {
      e.preventDefault();

      let deltaX = e.deltaX;
      let deltaY = e.deltaY;

      if (screen.contentDocument.body.style.zoom) {
        deltaX /= screen.contentDocument.body.style.zoom;
        deltaY /= screen.contentDocument.body.style.zoom;
      }

      var newPosX = posX - deltaX * 2;
      var newPosY = posY - deltaY * 2;

      var finalPosX = newPosX;
      var finalPosY = newPosY;

      //check if posX is inside bounding box
      if (newPosX > -boundingX && newPosX < boundingX) {
        finalPosX = newPosX;
      }
      //set posX to min max values if out of bouds
      else if (newPosX < -boundingX) finalPosX = -boundingX;
      else if (newPosX > boundingX) finalPosX = boundingX;

      //check if posY is inside bounding box
      if (newPosY > -boundingY && newPosY < boundingY) {
        finalPosY = newPosY;
      }
      //set posY to min max values if out of bouds
      else if (newPosY < -boundingY) finalPosY = -boundingY;
      else if (newPosY > boundingY) finalPosY = boundingY;

      //set final position
      posX = finalPosX;
      posY = finalPosY;
      updateBoundingBox();

      /*console.log("posX: " + posX);
            console.log("posY: " + posY);
            */
    }

    render();
  }

  function onGestureStart(e) {
    e.preventDefault();

    if(scale >= 1){
      toScaleReposition();
    }
    gestureStartScale = scale;

    /*
    posGestureStart.x = posX;
    posGestureStart.y = posY;
    screenSizeGestureStart.x = screen.getBoundingClientRect().width;
    screenSizeGestureStart.y = screen.getBoundingClientRect().height;
    screenPosGestureStart.x = screen.getBoundingClientRect().left;
    screenPosGestureStart.y = screen.getBoundingClientRect().top;

    // Get the mouse position relative to screen origin.
    pointer.x = e.pageX - screenPosGestureStart.x;
    pointer.y = e.pageY - screenPosGestureStart.y;

    // Calculate mouse coordinates relative to screen.
    pointerRelative.x = pointer.x / screenSizeGestureStart.x;
    pointerRelative.y = pointer.y / screenSizeGestureStart.y;
    */
  }

  function onGestureChange(e) {
      e.preventDefault();

      var newScale = gestureStartScale * e.scale;
      var finalScale;
    
      //check for min&max zoom
      if (newScale < maxZoom && newScale > minZoom) {
          finalScale = newScale;
          /*
          // Get the current screen width...
          let width = e.scale * screenSizeGestureStart.x;
          let height = e.scale * screenSizeGestureStart.y;
      
          // and calculate delta compared to gesture start.
          let deltaX = width - screenSizeGestureStart.x;
          let deltaY = height - screenSizeGestureStart.y;
      
          // Move the screen by necessary amount of screen size delta.
          // The screen size delta is subtracted by 0.5 because the screen is zoomed from center.
          posX = posGestureStart.x - deltaX * (pointerRelative.x - 0.5);
          posY = posGestureStart.y - deltaY * (pointerRelative.y - 0.5);
          */
          
      }
      //set to min max scale
      else if (newScale > maxZoom) finalScale = maxZoom;
      else if (newScale < minZoom) finalScale = minZoom;

      scale = finalScale;
      render();
  }

  function onGestureEnd(e) {
    e.preventDefault();

    console.log("Scale: " + scale);
    //scale = scale.toFixed(2);
    //console.log("Scale toFixed(): " + scale);
    console.log("Zoom: " + scale * 100 + "%");

    render();
    if(scale >= 1){
      toZoomReposition();
    }
    updateBoundingBox();
  }

  //shortcuts
  function onKeyDown(e) {
    // zoom in with +
    if (e.metaKey && e.keyCode === 187) {
      e.preventDefault();
      if (oldScale < maxZoom) {
        if(scale >= 1){
          oldScale += 0.1;
          scale = oldScale;
          render();
          toZoom();
        } else{
          scale += 0.1;
          render();
        }
      }
    }
    // zoom out with -
    if (e.metaKey && e.keyCode === 189) {
      e.preventDefault();
      if (oldScale > minZoom) {
        if(scale >= 1){
          oldScale -= 0.1;
          scale = oldScale;
          render(); 
          toZoom();
        } else{
          scale -= 0.1;
          render();
        }
      }
    }
    // 100% with cmd + 0
    if (e.metaKey && e.keyCode === 48) {
      e.preventDefault();
      scale = 1;
      posX = 0;
      posY = 0;
      render();
      toZoom();
    }
    // FitToWindow with cmd + 9
    if (e.metaKey && e.keyCode === 57) {
      e.preventDefault();
      fitToWindow();
      render();
      toZoom();
    }
    updateBoundingBox();
  }

  function updateBoundingBox() {
      let screenWidth = screen.getBoundingClientRect().width;
      let screenHeight = screen.getBoundingClientRect().height;

      let drawingBoardWidth = drawingBoard.getBoundingClientRect().width;
      let drawingBoardHeight = drawingBoard.getBoundingClientRect().height;

    //get width & height, calculate bounding box
    if (screenWidth > drawingBoardWidth) {
      boundingX = Math.abs((screenWidth - drawingBoardWidth) / 2);
      boundingX += drawingBoardWidth - boundingPadding;
    } else
      boundingX = Math.abs((drawingBoardWidth - screenWidth) / 2) + screenWidth - boundingPadding;
    if (screenHeight > drawingBoardHeight) {
      boundingY = Math.abs((screenHeight - drawingBoardHeight) / 2);
      boundingY += drawingBoardHeight - boundingPadding;
    } else boundingY = Math.abs((drawingBoardHeight - screenHeight) / 2) + screenHeight - boundingPadding;

  }

  function fitToWindow() {
    posX = 0;
    posY = 0;
    //check width vs height
    if (
      getSize(screen).width > getSize(screen).height &&
      getSize(screen).width != getSize(drawingBoard).width
    ) {
      oldScale *= (getSize(drawingBoard).width - 64) / getSize(screen).width;
    }

    if (
      getSize(screen).height > getSize(screen).width &&
      getSize(screen).height != getSize(drawingBoard).height
    ) {
      oldScale *= (getSize(drawingBoard).height - 64) / getSize(screen).height;
    }
    scale = oldScale;
    render();
    console.log("Fit to Window  " + scale*100 + "%");

    updateBoundingBox();


  }

  function getSize(element) {
    return {
      width: element.getBoundingClientRect().width,
      height: element.getBoundingClientRect().height,
    };
  }
  
  function toZoomReposition(){
    //change from scale to zoom
    screen.contentDocument.body.style.zoom = scale;
    drawingBoard.style.zoom = scale;

    //calculate new position
    posX = posX * (1/scale);
    posY = posY * (1/scale);

    //adjust boundingPadding
    boundingPadding *= (1/scale);

    oldScale = scale;
    scale = 1;
    render();
  }

  function toScaleReposition(){
    screen.contentDocument.body.style.zoom = "1";
    drawingBoard.style.zoom = "1";
    scale = oldScale;

    //calculate new position
    posX = posX * scale;
    posY = posY * scale;

    //adjust boundingPadding
    boundingPadding *= scale;

    render();
  }

  function toZoom(){
    //change from scale to zoom
    screen.contentDocument.body.style.zoom = scale;
    drawingBoard.style.zoom = scale;
    

    oldScale = scale;
    scale = 1;
    
    render();

  }
});

// called from the screen-frame to adjust the size of the screen.
window.updateScreenBounds = function(bounds) {
  const rootStyle = document.styleSheets[0].cssRules[0].style;
  let width = bounds.width;
  let height = bounds.height;

  rootStyle.setProperty("--screenHeight", height + "px");
  rootStyle.setProperty("--screenWidth", width + "px");
}