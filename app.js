
// Get references to the DOM elements to display output, 
// user input, and send messages
const output = document.getElementById('output');
const inputBox = document.getElementById('input-box');
const sendButton = document.getElementById('send-button');

// Function to append messages to the chat output
// 'sender' is the the user or te AI, depending on who sent the message
function appendMessage(sender, message) {
  const messageElement = document.createElement('p');   // Creates new paragraph for messages
  messageElement.textContent = `${sender}: ${message}`; // Make the content of the paragraph
  output.appendChild(messageElement); 
  output.scrollTop = output.scrollHeight; 
}

// Handles sending messages and getting responses
async function sendMessage(userMessage) {
  appendMessage('You', userMessage);

  try {
    // Send a POST request to the API
    const response = await fetch(AI_API_ENDPOINT, {
      method: 'POST', // A POST request is a method to send data from a client to a server
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, 
      },
      body: JSON.stringify({
        model: "OlMo", // AI Model (OlMo doesn't seem to be working, we should find something else)
        messages: [
          { role: "system", content: "You are a Dungeon Master in a text-based RPG. Guide the player through an epic adventure." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    // Check response
    // If all is good, the AI starts talking
    if (response.ok) {
      const data = await response.json();
      const aiMessage = data.choices[0].message.content;
      appendMessage('AI Dungeon Master', aiMessage);
    } else {
      // If something is wrong, this message pops (only message I've seen so far...)
      appendMessage('AI Dungeon Master', 'Oops! Something went wrong. Please try again later.');
    }
  } catch (error) {
    // Handle errors
    appendMessage('AI Dungeon Master', 'Error connecting to AI service. Please check your connection.');
  }
}

// An event listener, waits for input
sendButton.addEventListener('click', () => {
  const userMessage = inputBox.value.trim();  // Takes user message and removes all whitespaxce
  if (userMessage) {  // Check if there is a message after removing all the whitespace
    sendMessage(userMessage);
    inputBox.value = '';  // Clears the input
  }
});

// Another event listener, but this time waits for the 'Enter' key
inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click(); // If 'Enter' is pressed, triggers a click event (look above)
  }
});
