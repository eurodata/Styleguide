/* 
from cowboy websocket-example. Only place where jquery is used, need to remove all this stuff someday :) 

*/


      var websocket;
      
      function websocket_init() {
          var name = window.location.pathname.split("/")[1];
          var host = window.location.host;
          var wsURL = "ws://" +  host + "/websocket/" + name;

          websocket = new WebSocket(wsURL);
          websocket.onopen = function(evt) { onOpen(evt) }; 
          websocket.onclose = function(evt) { onClose(evt) }; 
          websocket.onmessage = function(evt) { onMessage(evt) }; 
          websocket.onerror = function(evt) { onError(evt) }; 
/*          $('#server').val("ws://" +  host + "/websocket/" + name);
         if(!("WebSocket" in window)){  
              $('#status').append('<p><span style="color: red;">websockets are not supported </span></p>');
              $("#navigation").hide();  
          } else {
              $('#status').append('<p><span style="color: green;">websockets are supported </span></p>'); */
//              connect();
/*          };
              $("#connected").hide(); 	
              $("#content").hide(); 	
*/

      };

/*      function connect()
      {
          var wsHost = $("#server").val()
          if (wsHost == undefined)
                return;
          
          websocket = new WebSocket(wsHost);
          showScreen('<b>Connecting to: ' +  wsHost + '</b>'); 
          websocket.onopen = function(evt) { onOpen(evt) }; 
          websocket.onclose = function(evt) { onClose(evt) }; 
          websocket.onmessage = function(evt) { onMessage(evt) }; 
          websocket.onerror = function(evt) { onError(evt) }; 
      };  
      
      function disconnect() {
          websocket.close();
      }; 

      function toggle_connection(){
          if(websocket.readyState == websocket.OPEN){
              disconnect();
          } else {
              connect();
          };
      };
*/
 /*     function sendTxt() {
          if(websocket.readyState == websocket.OPEN){
              txt = $("#send_txt").val();
              websocket.send(txt);
              showScreen('sending: ' + txt); 
          } else {
               showScreen('websocket is not connected'); 
          };
      }; */

      function onOpen(evt) { 
 /*         showScreen('<span style="color: green;">CONNECTED </span>'); 
          $("#connected").fadeIn('slow');
          $("#content").fadeIn('slow'); */
      };  

      function onClose(evt) { 
//          showScreen('<span style="color: red;">DISCONNECTED </span>');
      };  

      function onMessage(evt) { 
           var data = evt.data;
           if (data === undefined || data.length == 0)
                return;
          try {
              var json = JSON.parse(evt.data);

              Antetype.runCommand(json);

          } catch( e) {
            document.getElementById("debug").style.visibility = "visible";
            showScreen('<span style:"color:red;">error: ' + e + '</span>');
          }
      };  

      function onError(evt) {
          showScreen('<span style="color: red;">ERROR: ' + evt.data+ '</span>');
      };

      function showScreen(txt) { 
          console.log("websocket: " + txt);
//          $('#output').prepend('<p>' + txt + '</p>');
      };

/*      function clearScreen() 
      { 
          $('#output').html("");
      }; */
