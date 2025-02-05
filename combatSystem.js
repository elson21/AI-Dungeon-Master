/* Combat system module */

export class CombatSystem {
    static resolveAttack(attackValue, character) {
      const results = {
        success: false,
        damage: 0,
        message: ''
      };
  
      if (attackValue > character.ac) {
        results.success = true;
        results.damage = attackValue - character.ac;
        results.message = `Attack hits! (${attackValue} vs AC ${character.ac})`;
      } else {
        results.message = `Attack misses! (${attackValue} vs AC ${character.ac})`;
      }
  
      return results;
    }
  
    static parseAttackValue(message) {
      const attackRegex = /\(Attack:\s*(\d+)\)/i;
      const match = message.match(attackRegex);
      return match ? parseInt(match[1]) : null;
    }
  
    static generateCombatMessage(results) {
      const element = document.createElement('div');
      element.classList.add('combat-message', results.success ? 'damage' : 'defense');
      element.textContent = results.message;
      return element;
    }
  }