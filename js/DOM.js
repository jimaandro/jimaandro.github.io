import Player from './Player.js';

const domUpdates = {

  getPlayerNames() {
    let players = [];
    for (let i = 1; i <= numPlayers; i++) {
      players.push(this.getPlayer(i));
    }
    return players;
  },

  getPlayer(playerNumber) {
    const playerName = $(`.player${playerNumber}-name`).val();
    const defaultName = `Player ${playerNumber}`;

    if (playerName) {
      $(`.player${playerNumber}-ba`).text(`${$('.player${playerNumber}-name').val()}: $`);
      return new Player(playerName);
    } else {
      return new Player(defaultName);
    }
  },

  clearInputs() {
    for (let i = 1; i <= numPlayers; i++) {
      $('.player${i}-name').val('');
    }
  },

  goToGameScreen() {
    $('.home-screen').css('display', 'none');
    $('.popup-cover').css('display', 'none');
  },

  displayNames(playerArray, index) {
    const numPlayers = playerArray.length;
    $('.game-winner').text(playerArray[index].name);
    $('.winning-score').text(playerArray[index].wallet);
  
    const onDeckIndex = (index + 1) % numPlayers;
    const inTheHoleIndex = (index - 1 + numPlayers) % numPlayers;
  
    $('.on-deck-name').text(playerArray[onDeckIndex].name);
    $('.on-deck-score').text(playerArray[onDeckIndex].wallet);
  
    $('.in-the-hole-name').text(playerArray[inTheHoleIndex].name);
    $('.in-the-hole-score').text(playerArray[inTheHoleIndex].wallet);
  },

  displayWinner(winner, score) {
    $('.game-winner').text(`${winner} WINS!!`);
    $('.winning-score').text(score);
  },

  goToHomeScreen() {
    $('.home-screen').css('display', 'flex');
    $('.popup-cover').css('display', 'unset');
  },

  displayWheel() {
    $('.popup-cover').css('display', 'unset');
    $('.wheel').toggleClass('slide-in');
  },

  spinWheel() {
    $('.vowel-error').css('display', 'none');
    $('.wheel-circle').toggleClass('wheel-spin');
  },

  hideWheel() {
    $('.popup-cover').css('display', 'none');
    $('.wheel').toggleClass('slide-in');
    $('.wheel-circle').toggleClass('wheel-spin');
  },

  populatePuzzleSquares(puzzle) {
    let letterBoxArray = Array.from($('.letter-content'));
    let revealSound = new Audio('./audio/reveal.mp3');
    revealSound.play();
    puzzle.forEach((letter, i) => {
      if (letter === '-' || letter === '&' || letter === '\'') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } else if (letter !== ' ') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).css('opacity', 0);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } else if (letter === ' ') {
        $(letterBoxArray[i]).text(' ');
        $(letterBoxArray[i]).parent().css('background', '#1c7455')
      }
    });
  },

  showBonusLetters(length) {
    let letterBoxArray = Array.from($('.letter-content'));
    for (let i = 0; i < 7; i++) {
      let rand = Math.floor(Math.random() * length);
      $(letterBoxArray[rand]).css('opacity', 1);
    }
  },

  newRoundKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('disabled')) {
        $(letter).removeClass('disabled');
      } else if ($(letter).hasClass('vowel-disabled')) {
        $(letter).removeClass('vowel-disabled');
      }
    });
    this.resetVowels();
  },

  resetPuzzleSquares() {
    let letterBoxArray = Array.from($('.letter-content'));
    letterBoxArray.forEach(box => {
      $(box).text('');
      $(box).parent().css('background', '#1c7455')
    })
  },

  disableGuessedLetter(event) {
    if ($(event.target).hasClass('keyboard-letters')) {
      $(event.target).addClass('disabled')
    }
  },

  revealCorrectLetters(box) {
    $(box).css('opacity', 1);
  },

  resetVowels() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('vowel')) {
        $(letter).removeClass('vowel-disabled');
        $(letter).removeClass('active-vowel');
        $(letter).addClass('temp-disabled');
      }
    });
  },

  resetKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if (!['Α', 'Ε', 'Η', 'Ι', 'Ο', 'Υ', 'Ω'].includes($(letter).text())) {
        $(letter).removeClass('vowel');
      }
    });
  },

  newPlayerTurn(array, index) {
    const numPlayers = array.length;
    $('.game-winner').text(array[index].name);
    $('.winning-score').text(array[index].wallet);
  
    const onDeckIndex = (index + 1) % numPlayers;
    const inTheHoleIndex = (index - 1 + numPlayers) % numPlayers;
  
    $('.on-deck-name').text(array[onDeckIndex].name);
    $('.on-deck-score').text(array[onDeckIndex].wallet);
  
    $('.in-the-hole-name').text(array[inTheHoleIndex].name);
    $('.in-the-hole-score').text(array[inTheHoleIndex].wallet);
  },

  highlightVowels() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('vowel') &&
       !$(letter).hasClass('vowel-disabled')) {
        $(letter).toggleClass('active-vowel');
      } else {
        if (!$(letter).hasClass('disabled')) {
          $(letter).addClass('temp-disabled');
        }
      }
    });
  },

  disableGuessedVowel(event) {
    if ($(event.target).hasClass('vowel')) {
      $(event.target).toggleClass('vowel-disabled');
    }
  },

  updateWallet(player) {
    $('.winning-score').text(player.wallet);
  },

  updateCurrentSpin(value) {
    $('.spin-number').text(value)
  },

  yellCurrentSpin(value) {
    if (value) {
      $('.yell-box').text(value);
    }
    $('.yell-box').toggleClass('yell-active');
  },

  updateCategory(puzzle) {
    $('.hint-value').text(puzzle.currentPuzzle.category)
  },

  displayWheelValues(wheel) {
    for (var i = 0; i < 6; i++) {
      $(`.mark${i + 1}`).text(wheel.spinValues[i])
    }
  },

  enableLetters() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('temp-disabled')) {
        $(letter).toggleClass('temp-disabled');
      }
    });
  },

  disableKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if (!$(letter).hasClass('vowel')) {
        $(letter).toggleClass('temp-disabled');
      }
    })
  },

  displaySolvePopup() {
    $('.solve-popup').css('display', 'flex');
    $('.solve-input').focus();
  },

  hideSolvePopup() {
    $('.solve-popup').css('display', 'none');
  },

  updateBankAccts(winner, i) {
    $(`.player${i + 1}-ba-num`).text(winner.bankAcct);
  },

  clearBankAccts() {
    for (let i = 1; i <= numPlayers; i++) {
      $(`.player${i}-ba-num`).text('0');
      $(`.player${i}-ba`).text(`P${i}: $`);
    }
  },

  displayBonusIntro(winner, score) {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');
    $('.name-of-bonus-player').text(winner);
    $('.winner-money-pre-bonus').text(score);
  },

  startBonusRound() {
    $('.popup-cover').css('display', 'none');
    $('.bonus-round-intro').css('display', 'none');
    $('header').html(
      `<h1 class="bonus-round-header">BONUS RoUND</h1>
      <h2 class="bonus-instructions">Choose 1 vowel and 3 consonants</h2>`)
    $('header').css('display', 'block');
    $('.bank-accts').css('bottom', '35px');
  },

  resetGameDisplay() {
    $('.spin-number').text('--');
    $('.bonus-round-intro').css('display', 'none');
    $('.popup-cover').css('display', 'none');
    $('header').css('display', 'unset');
    $('header').html(
      `<header>
        <div class="on-deck">
          <h2 class="on-deck-name">player 2</h2>
          <h2 class="on-deck-score">2,000</h2>
        </div>
        <div class="at-bat">
          <h2 class="game-winner">player 1</h2>
          <h2 class="winning-score">2,000</h2>
          <button class="spin-button top-buttons">SPIN</button>
          <button class="solve-button top-buttons">SOLVE</button>
          <button class="vowel-button top-buttons">VOWEL</button>
        </div>
        <div class="in-the-hole">
          <h2 class="in-the-hole-name">player 3</h2>
          <h2 class="in-the-hole-score">2,000</h2>
        </div>
      </header>`);
  },

  resetOnQuit() {
    $('.vowel-error').css('display', 'none');
    $('.solve-popup').css('display', 'none');
    $('.solve-input').val('');
    $('.spin-number').text('--');
  }

}

export default domUpdates;
