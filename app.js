/* Main program */

import { CharacterManager } from './characterManager.js';
import { CombatSystem } from './combatSystem.js';
import { ViewManager } from './viewManager.js';
import { AIService } from './aiService.js';

export class GameApp {
  constructor() {
    this.characterManager = new CharacterManager();
    this.aiService = new AIService();
    
    setTimeout(() => {
      this.initializeEventListeners();
      this.characterManager.initializeCharacter();
    }, 50);
  }

  initializeEventListeners() {
    document.getElementById('send-button').addEventListener('click', () => this.handleUserInput());
    document.getElementById('input-box').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleUserInput();
    });
  }

  async handleUserInput() {
    const inputBox = document.getElementById('input-box');
    const userMessage = inputBox.value.trim();
    
    if (!userMessage) return;

    ViewManager.appendMessage('You', userMessage);
    ViewManager.clearInput();

    try {
      const response = await this.aiService.getAIResponse(userMessage);
      
      if (!response) {
        ViewManager.appendMessage('AI Dungeon Master', 'Failed to get AI response');
        return;
      }

      const aiMessage = response.choices[0].message.content;
      const attackValue = CombatSystem.parseAttackValue(aiMessage);

      if (attackValue) {
        const currentCharacter = this.characterManager.character;
        const combatResult = CombatSystem.resolveAttack(attackValue, currentCharacter);
        
        ViewManager.addCombatFeedback(CombatSystem.generateCombatMessage(combatResult));
        
        if (combatResult.success) {
          this.characterManager.updateCharacter({
            currentHP: Math.max(0, currentCharacter.currentHP - combatResult.damage)
          });
        }
        
        const cleanMessage = aiMessage.replace(/\(Attack:\s*\d+\)/i, '').trim();
        ViewManager.appendMessage('AI Dungeon Master', cleanMessage);
      } else {
        ViewManager.appendMessage('AI Dungeon Master', aiMessage);
      }
    } catch (error) {
      ViewManager.appendMessage('AI Dungeon Master', 'Error processing request');
      console.error('Application Error:', error);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new GameApp();
});