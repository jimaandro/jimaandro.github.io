import data from './data.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Round from './Round.js';

class BonusRound extends Round {
  constructor(puzzleBank, bonusWheel) {
    super(puzzleBank);
    this.bonusWheel = data.bonusWheel;
    this.keyBoardClickCount = 0;
    this.didWinBonus = null;
    this.bonusWheelValue = null;
    this.bonusPlayer = null;
  }

  generateBonusWheel() {
    let wheelVals = [];
    for (var i = 0; i < 6; i++) {
      wheelVals.push(data.bonusWheel[i]);
    }
    return new Wheel(wheelVals);
  }

  generateBonusPuzzle(lastPuzzle) {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    if (this.puzzleBank[randomIndex] === lastPuzzle) {
      this.generateBonusPuzzle(lastPuzzle);
    } else {
      return new Puzzle(this.puzzleBank[randomIndex]);
    }
  }

  postBonusResult() {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');
    if (this.didWinBonus) {
      $('.win-message').text(` WINS THE BONUS!`);
      var winnings = this.bonusPlayer.bankAcct + this.bonusWheelValue;
    } else {
      $('.win-message').text(` MISSED THE BONUS!`);
      var winnings = this.bonusPlayer.bankAcct;
    }
    $('.winner-money-pre-bonus').text(winnings)
    $('.start-bonus-round').remove();
    $('.bonus-round-intro').append('<button class="new-game">NEW GAME</button>')
  }
}

export default BonusRound;
