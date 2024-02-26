var messageCount = 1;

function sendMessage() {
    var userInput = document.getElementById("textInput").value;
    if (userInput.trim() !== "") {
        addMessage("User", userInput);
        
        // Generate response with count
        var response = "QuranicAI: " + messageCount + "..............." + "Response from QuranicAI" + userInput;
        messageCount++;
        addMessage("System", response);
        
        // Clear the input field
        document.getElementById("textInput").value = "";

        // Scroll to the bottom of the chat
        var chatContainer = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

function addMessage(sender, message) {
    var chatContainer = document.getElementById("chatContainer");
    var messageDiv = document.createElement("div");
    var messageClass = "chat-message-" + sender.toLowerCase();
    messageDiv.className = "chat-message " + messageClass;
    var messageContent = '<div class="message-text ' + (sender === "User" ? "user-input" : "system-response") + '">' + message + '</div>';
    messageDiv.innerHTML = messageContent;
    chatContainer.appendChild(messageDiv);
}

function generateResponse(userInput) {


    return userInput;
}

// Listen for "Enter" key press in the input field
document.getElementById("textInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        sendMessage();
    }
});
