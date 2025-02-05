/* Caracter manager module */

import { DEFAULT_CHARACTER } from './defaultCharacter.js'; // Updated import

export class CharacterManager {
  constructor() {
    this.character = { 
      ac: DEFAULT_CHARACTER.ac,
      maxHP: DEFAULT_CHARACTER.maxHP,
      currentHP: DEFAULT_CHARACTER.currentHP,
      status: DEFAULT_CHARACTER.status
    };
    
    this.acElement = document.getElementById('character-ac');
    this.hpElement = document.getElementById('character-hp');
    this.statusElement = document.getElementById('character-status');
  }

  initializeCharacter() {
    this.updateDisplay();
  }

  updateCharacter(updates) {
    this.character = { ...this.character, ...updates };
    this.updateDisplay();
  }

  updateDisplay() {
    this.acElement.textContent = this.character.ac;
    this.hpElement.textContent = `${this.character.currentHP}/${this.character.maxHP}`;
    this.statusElement.textContent = this.character.status;
    this.#updateStatusColor();
  }

  #updateStatusColor() {
    const hpPercentage = (this.character.currentHP / this.character.maxHP) * 100;
    this.statusElement.className = hpPercentage <= 25 ? 'critical' : 
                                  hpPercentage <= 75 ? 'wounded' : '';
  }
}