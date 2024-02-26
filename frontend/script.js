var isWaitingForResponse = false;

async function sendMessage() {
    var userInput = document.getElementById("textInput").value;
    if (!isWaitingForResponse && userInput.trim() !== "") {
        // Disable the input field
        document.getElementById("textInput").disabled = true;

        addMessage("User", userInput);

        // Send user input to the Quranic endpoint
        try {
            isWaitingForResponse = true;

            const response = await fetch('https://quranic-87a346228b3c.herokuapp.com/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: userInput
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from the server');
            }

            const responseData = await response.json();

            // Log the response to console
            console.log('Response received from server:', responseData);

            // Display the response in the chat
            if (responseData && responseData.bot) {
                addMessage("System", "QuranicAI: " + responseData.bot);

                // Clear the input field after displaying the response
                document.getElementById("textInput").value = "";
            } else {
                // Handle empty or null response
                addMessage("System", "Sorry! Empty or invalid response received.");
            }

        } catch (error) {
            // Handle errors
            addMessage("System", "Sorry! Failed to get response. Please try again.");
            console.error('Error:', error);
        }

        // Enable the input field after displaying the response
        document.getElementById("textInput").disabled = false;

        // Scroll to the bottom of the chat
        var chatContainer = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Reset the flag
        isWaitingForResponse = false;
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

// Listen for "Enter" key press in the input field
document.getElementById("textInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        sendMessage();
    }
});
