/* AI manager module */

import { AI_CONFIG } from './config.js';

export class AIService {
  constructor() {
    this.apiEndpoint = AI_CONFIG.ENDPOINT;
    this.apiKey = AI_CONFIG.API_KEY;
  }

  async getAIResponse(userMessage) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.MODEL,
          messages: [
            { 
              role: "system", 
              content: "You are a D&D DM. Describe actions and include attack rolls in parentheses like (Attack: 14)." // Make a better prompt, this sucks
            },
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      return null;
    }
  }
}