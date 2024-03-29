import {
  toggleGameSquares,
  togglePlayButton,
  activateGameSquare,
  setHighScore,
  setDisplayScore,
  generateSequence,
} from './utils.js';

const BASE_LENGTH = 2;

class GameMaster {
  /**
   * Creates a GameMaster class object to manage game variables and state.
   *
   * Sets the starting sequence length, sets the board elements, and creates
   * variables for the following properties:
   * - current score
   * - sequence length
   * - starting length
   * - user turn
   * - user sequence
   * - correct sequence
   * - set of board squares
   *
   * @param {number} [seq_length] the starting length for the sequence, defaults to 2
   */
  constructor(seq_length) {
    this.setStartLength(seq_length);
    this.setBoardElements();
    this.resetGame();
  }

  /**
   * Sets the starting sequence length to use when starting/resetting the game.
   * @param {number} [seq_length] the length to set, defaults to BASE_LENGTH = 2
   */
  setStartLength = seq_length => {
    this.start_length = seq_length || BASE_LENGTH;
  };

  /**
   * Uses the `utils.js` generate sequence function to generate a new game sequence.
   *
   * Sets the game sequence variable, and generates based on the sequence length and board keys
   */
  generateSequence = () => {
    this.sequence = generateSequence(Object.keys(this.board), this.seq_length);
  };

  /**
   * Resets most of the game variables to their base/starting values:
   * - current score = 0
   * - sequence length = start length
   * - user turn = false
   * - user sequence = empty
   * - sequence = newly generated sequence
   */
  resetGame = () => {
    this.curr_score = 0;
    setDisplayScore(0);
    this.seq_length = this.start_length;
    this.running_turn = false;
    this.user_turn = false;
    this.user_sequence = [];
    this.sequence = this.generateSequence();
  };

  /**
   * Gets the board square elements from the DOM and stores them in a dictionary object
   * for later use, keyed by element id.
   *
   * @example
   *  this.board = {
   *    'r': <HTMLDivElement>
   *  }
   */
  setBoardElements = () => {
    const squares = document.querySelectorAll('.square');
    this.board = {};
    squares.forEach(square => {
      this.board[square.id] = square;
    });
  };

  /**
   * Runs the AI's turn. Turns off user input, displays its sequence one at a time,
   * then reenables user input.
   */
  runAITurn = () => {
    if (this.running_turn) return;
    // since there's the timeout async stuff this is minor 'thread' protection
    this.running_turn = true;
    this.user_turn = false;
    toggleGameSquares(this.userInput, false);
    this.delay_time = 650;
    this.space_time = 200;
    this.sequence.forEach((square_id, index) => {
      setTimeout(() => {
        activateGameSquare(this.board[square_id], this.delay_time);
      }, (this.delay_time + this.space_time) * index);
    });
    setTimeout(() => {
      toggleGameSquares(this.userInput, true);
      this.user_turn = true;
      this.running_turn = false;
    }, (this.delay_time + this.space_time) * this.sequence.length);
  };

  /**
   * Increments the current sequence length by the given increment.
   * @param {number} [incr] the amount to increment by, defaults to 1
   */
  incrementSeqLength = (incr = 1) => {
    this.seq_length += incr;
  };

  /**
   * Handles user input events by triggering the visual effect, adding to the stored user
   * sequence, and checking the status of that sequence
   * @param {Event} event the triggering input event
   */
  userInput = event => {
    if (this.running_turn) return;
    if (!this.user_turn) return;
    if (event.type === 'keydown') {
      if (!Object.keys(this.board).includes(event.key)) return;
    }
    const square = event.type === 'keydown' ? this.board[event.key] : event.target;
    toggleGameSquares(this.userInput, false);
    activateGameSquare(square, this.delay_time * 0.5);
    setTimeout(() => {
      this.user_sequence.push(square.id);
      const keep_running = this.checkSequenceToContinue();
      if (keep_running) {
        toggleGameSquares(this.userInput, true);
      }
    }, this.delay_time);
  };

  /**
   * Goes through the entire user sequence and checks against the correct sequence looking
   * for a win or lose condition.
   * - Does nothing if user sequence is correct so far but not the entire sequence
   * - Triggers a game over if there is an incorrect input
   * - Triggers a win if the input is entirely correct and covers the whole sequence
   *
   * @returns {boolean} `true` if game should keep running, `false` if win or game over
   */
  checkSequenceToContinue = () => {
    /* 
      NOTE: this is kinda inefficient because it checks the whole sequence every time
      Could probably be improved by JUST checking the last/most recent element and assuming this runs every step
      Current way is a little 'safer' though in case it doesn't get run
    */
    // look backwards through the user sequence
    for (let index = this.user_sequence.length - 1; index >= 0; index--) {
      // check if the element is correct
      if (this.user_sequence[index] !== this.sequence[index]) {
        // if even one element is wrong, it's game over
        this.gameOver();
        return false;
      }
    }
    // if we have gotten to this point, everything in the user sequence is correct so far
    // so now it's just time to check if they have the full sequence
    if (this.user_sequence.length === this.sequence.length) {
      this.isWin();
      return false;
    }
    return true;
  };

  /**
   * Sends an alert to indicate the win, increments the score, increments the sequence
   * length, and triggers the next round
   */
  isWin = () => {
    const sound = new Audio('./audio/success.wav');
    sound.currentTime = 0;
    sound.play();
    this.curr_score += 1;
    setDisplayScore(this.curr_score);
    this.incrementSeqLength();
    this.nextRound();
  };

  /**
   * Sends an alert to indicate the game over, turns off the board input, potentially sets
   * the high score, and changes the play button to say 'Play Again' and reactivates it
   */
  gameOver = () => {
    const sound = new Audio('./audio/buzzer.wav');
    sound.currentTime = 0;
    sound.play();
    document.getElementById('play-button').innerText = 'Play Again';
    toggleGameSquares(this.userInput, false);
    setTimeout(() => {
      setHighScore(this.curr_score);
    }, 1500);
    // TODO: maybe display correct sequence?
    togglePlayButton(true);
  };

  /**
   * Sends an alert to get ready, clears the user sequence, generates a new sequence, then
   * runs the AI turn
   */
  nextRound = () => {
    this.user_sequence = [];
    this.generateSequence();
    setTimeout(() => {
      this.runAITurn();
    }, 1000);
  };

  /**
   * Starts the game by calling the game reset, disabling the play button, and triggering
   * the next round to start
   */
  startGame = () => {
    this.resetGame();
    togglePlayButton(false);
    this.nextRound();
  };
}

export default GameMaster;
