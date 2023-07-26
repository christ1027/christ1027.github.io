const APIkey ="57b9b3e14e8345a5bac3094e42c17f99"
const ReqID ="4ffcac1c-b2fc-48ba-bd6d-b69d9942995a"
const projectName="Robot_0726"
const deploymentName="0726"
const APIurl = "https://christine.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview"

function sendMessage(event) {
  if (event.keyCode === 13) {
    var userInput = document.getElementById("userInput");
    var message = userInput.value;

    // Clear the input field
    userInput.value = "";

    // Display user message
    displayMessage("user", message);

    // Send message to the chatbot
    sendMessageToBot(message);
  }
}

function sendMessageToBot(message) {
  // Create a new XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("POST", APIurl);
  xhr.setRequestHeader("Ocp-Apim-Subscription-Key", APIkey);
  xhr.setRequestHeader("Apim-Request-Id", ReqID);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // console.log(response)
      var topIntent = response.result.prediction.topIntent;
      var reply
      switch (topIntent) {
    case '個人簡歷':
        reply = "你好，我是一位人工智能助手，有什麼可以幫您的？";
        break;
    case '企業合作商案':
        reply = "我們提供單次及長期商案合作項目。";
        break;
    case '個人專長或專業領域':
        reply = "我擅長語言、專案管理、攝影及影片剪輯等。";
        break;
    case '個人成就或獎項':
        reply = "個人成就請參考LinkedIn。";
        break;
    case '專案作品':
        reply = "我有許多專案作品，包括網站設計、人工智能專案等。如果您對特定的領域或作品感興趣，請告訴我，我可以提供相關資訊。";
        break;
    case '聯絡方式':
        reply = "我的聯絡方式請參考網站最下方。";
        break;
    case '部落格或個人文章':
        reply = "我們有自己的部落格和寫作平台，我們在那裡分享各種專業內容、技術教學和行業趨勢等。我們的文章主要探討與我們的專業領域相關的主題。如果您對特定的部落格或文章有興趣，請告訴我們，我們可以提供相關連結和資訊。";
        break;
    default:
        reply = "很抱歉，我無法理解您的請求。請再說一次或提供更多細節，我會盡力為您提供幫助。";
        break;
}


      // Display bot response
      displayMessage("bot", reply);
    }
  };

  // Set up the request payload
  var payload = JSON.stringify({
    "kind": "Conversation",
    "analysisInput": {
      "conversationItem": {
        "id": "1",
        "text": message,
        "modality": "text",
        "participantId": "user1"
      }
    },
    "parameters": {
      "projectName": projectName,
      "verbose": true,
      "deploymentName": deploymentName,
      "stringIndexType": "TextElement_V8"
    }
  });

  // Send the request
  xhr.send(payload);
}

function displayMessage(sender, message) {
  var chatbox = document.getElementById("chatbox");
  var newMessageContainer = document.createElement("div");
  var newMessage = document.createElement("p");
  newMessage.classList.add("chat-message");
  newMessage.classList.add(sender);
  newMessage.innerText = message;

  // Set the message style based on the sender
  if (sender === "user") {
    newMessageContainer.classList.add("user-message-container");
    newMessageContainer.appendChild(newMessage);
  } else if (sender === "bot") {
    newMessageContainer.classList.add("bot-message-container");
    var botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.appendChild(newMessage);
    newMessageContainer.appendChild(botMessage);
  }

  chatbox.appendChild(newMessageContainer);

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight;
}