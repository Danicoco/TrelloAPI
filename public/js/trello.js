$(function() {
  
    const getKeyTokenCardId = function() {
      // If this project is for production, then you want to pass the keys from the backend.
      const key = "61c1e52e7161836b81ac45cc009eb1e9";
      const token = "963ec2aaf150a493646d2c49f67c12e60352e1f5780bdb3d7782ae15952f0242";
      const cardId = "IRyfCNVU";
      return [key, token, cardId];
    }
    
    const createRequest = function(cardId) {
      var request = new XMLHttpRequest();
      request.responseType = "json";
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          return window.location = "/accept";
        }
      }
      request.open("POST", `https://api.trello.com/1/cards/${cardId}/attachments/`);
      return request;
    }
    
    const createAndSendForm = function(file) {
      let [key, token, cardId] = getKeyTokenCardId();
      var formData = new FormData();
      formData.append("key", key);
      formData.append("token", token);
      formData.append("file", file);
      formData.append("mimeType", "image/png"); //This is optional and can be removed
      formData.append("name", "My PDF File");  
      var request = createRequest(cardId);
      request.send(formData);
    };
    
   
    
    // Get file from client and send to trello
    $('form').submit(function(event) {
      event.preventDefault();
      const myFiles = document.getElementById("file").files;
      if (myFiles.length < 1) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "https://cdn.glitch.com/197efd31-5cb6-44b4-adbc-ea2d53c2ed59%2Ftumblr_lgqwsbEa891qfjmnk.gif?1494271717009", true);
        oReq.responseType = "blob";
        oReq.onload = function(oEvent) {
          // Once we've successfully received the default image, send it to Trello!
          createAndSendForm(new Blob([oReq.response], {type: "image/gif"}));
        };
        oReq.send();
      } else {
        createAndSendForm(myFiles[0]);
      }
    });
    
  });
  