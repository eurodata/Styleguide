import { websocket_init } from './communication.js';
import { initializeAntetype, Antetype } from './viewer.js'
import { gdPostViewerMessage } from './utils.js';
import { GDProject, GDModelObject } from './model.js';
import { addCommands } from './commands.js';

function init() {
    //mmhmmm for testing: 
    if (document.getElementById("TestScreen")) {
        initializeAntetype(document.getElementById("TestScreen"));
    } else {
        initializeAntetype(document.body);
    }
    
    addCommands(Antetype);

    
    if (Antetype.runsInAntetype) {
         Antetype.send("hello");
    } else {
        gdPostViewerMessage('startLoadProject');
        websocket_init();
        if (window.websocket)  {
            let spinnerTimout = window.setTimeout( () => {
                    document.body.innerHTML += '<div id="viewer_loader" class="loader-container-live-preview" >  <div class="loader"><img src="static/spinner.svg">  </div>  </div> ';
                    window.clearTimeout(spinnerTimout);
                    spinnerTimout = null;
            }, 500);
    
            let loadProjectRequest = new XMLHttpRequest();
            loadProjectRequest.open("GET", "/proxy/project.json?document="+ Antetype.serverDocumentName);
            loadProjectRequest.responseType = "json";
            loadProjectRequest.onreadystatechange = function () {
                  if(loadProjectRequest.readyState === XMLHttpRequest.DONE && loadProjectRequest.status === 200) {
                        let json = loadProjectRequest.response; // JSON.parse(loadProjectRequest.response);
                        Antetype.project = new GDProject(json, null);
                        Antetype.project.at = Antetype;
    
    
    
                        let loadScreenRequest = new XMLHttpRequest();
                        loadScreenRequest.open("GET", "/proxy/fetchobject?document=" + Antetype.serverDocumentName + "&entity=GDFigure&id="+document.body.id);
                        loadScreenRequest.responseType = "json";
                        loadScreenRequest.onreadystatechange = function () {
                              if (loadScreenRequest.readyState === XMLHttpRequest.DONE && loadScreenRequest.status === 200) {
                                    let json = loadScreenRequest.response;// JSON.parse(loadScreenRequest.response);
                                    let screen = GDModelObject.fromJSONObjectInProject(json, Antetype.project);
                                    Antetype.currentScreen = screen;
                                    Antetype.connectObjects();
                                    Antetype.currentTool.screenDidChange(Antetype.currentScreen);
    
                                    if (spinnerTimout) {
                                        window.clearTimeout(spinnerTimout);
                                        spinnerTimout = null;
                                    }
    
                                    let spinnerContainer = document.getElementById("viewer_loader");
                                    if (spinnerContainer) {
                                        spinnerContainer.parentNode.removeChild(spinnerContainer);
                                    }
    
                               }
                        };
                        loadScreenRequest.send();
                   }
            };
            loadProjectRequest.send();
    
    
    
    
        }
    }
    
    }
    
    
    
    window.addEventListener("load", init, false);
    