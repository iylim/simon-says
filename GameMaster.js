import {
  enableGameSquares,
  disableGameSquares,
  enableStartButton,
  disableStartButton,
  activateGameSquare,
  setHighScore,
} from './utils.js';

const BASE_LENGTH = 2;

class GameMaster {
  constructor(seq_length) {
    this.setBoardElements();
    this.resetGame(seq_length);
  }

  resetGame = seq_length => {
    this.curr_score = 0;
    this.seq_length = seq_length || BASE_LENGTH;
    this.user_turn = false;
    this.user_sequence = [];
    this.sequence = this.generateSequence(this.seq_length);
  };

  setBoardElements = () => {
    const squares = document.querySelectorAll('.square');
    this.board = {};
    squares.forEach(square => {
      this.board[square.id] = square;
    });
  };

  runAITurn = () => {
    this.user_turn = false;
    disableGameSquares();
    const delay_time = 500;
    this.sequence.forEach((square, index) => {
      setTimeout(() => {
        activateGameSquare(square);
      }, delay_time * index);
    });
    setTimeout(() => {
      enableGameSquares(this.userInput);
      this.user_turn = true;
    }, delay_time * this.sequence.length);
  };

  generateSequence = (seq_length, prev_seq) => {
    const new_seq = prev_seq || [];
    const options = Object.keys(this.board);
    while (new_seq.length < seq_length) {
      new_seq.push(options[Math.floor(Math.random() * options.length)]);
    }
    return new_seq;
  };

  incrementSeqLength = (incr = 1) => {
    this.seq_length += incr;
  };

  userInput = event => {
    if (!this.user_turn) return;
    // NOTE: idk if event.target works for a keyboard event? we'll see
    const square = event.target;
    activateGameSquare(square);
    // NOTE: potentially need to disable input while activating current?
    this.user_sequence.push(square.id);
    this.checkSequence();
  };

  checkSequence = () => {
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
        return;
      }
    }
    // if we have gotten to this point, everything in the user sequence is correct so far
    // so now it's just time to check if they have the full sequence
    if (this.user_sequence.length === this.sequence.length) {
      this.isWin();
    }
  };

  isWin = () => {
    alert('Correct Sequence!');
    this.curr_score += 1;
    this.incrementSeqLength();
    this.nextRound();
  };

  gameOver = () => {
    document.getElementById('play-button').innerText = 'Play Again';
    disableGameSquares();
    setHighScore(this.curr_score);
    alert('Game Over!');
    // TODO: maybe display correct sequence?
    enableStartButton();
  };

  nextRound = () => {
    alert('Get ready!');
    setTimeout(() => {
      this.runAITurn();
    }, 1000);
  };

  startGame = () => {
    this.resetGame();
    disableStartButton();
    this.nextRound();
  };
}

export default GameMaster;
