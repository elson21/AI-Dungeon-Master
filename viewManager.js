/* Manages the display of messages and stuff */

export class ViewManager {
    static appendMessage(sender, message, className = '') {
      const output = document.getElementById('output');
      const messageElement = document.createElement('p');
      messageElement.textContent = `${sender}: ${message}`;
      if (className) messageElement.classList.add(className);
      output.appendChild(messageElement);
      output.scrollTop = output.scrollHeight;
    }
  
    static addCombatFeedback(element) {
      const output = document.getElementById('output');
      output.appendChild(element);
      output.scrollTop = output.scrollHeight;
    }
  
    static clearInput() {
      document.getElementById('input-box').value = '';
    }
  }