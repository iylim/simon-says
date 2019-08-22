<<<<<<< HEAD
import GameMaster from "./GameMaster.js";

const GM = new GameMaster();

const play_button = document.getElementById("play-button");
play_button.addEventListener("click", GM.startGame);
=======
import GameMaster from './GameMaster.js';
import { setHighScore } from './utils.js';

const GM = new GameMaster();

const play_button = document.getElementById('play-button');
play_button.addEventListener('click', GM.startGame);

setHighScore();
>>>>>>> 31cb6e0ee74ebf2240ee1b7fbb63e7d42a0bb663

/* 
-Press button to start game
  -disable play button
-AI displays sequence
  -starts at n-long sequence
  -disable board for user input while AI sequence is displayed?
-user inputs sequence
  -if incorrect, game ends
  -if correct
      -score updates
      -increase sequence length
      -starts over with new sequence length
         - need to decide if new sequence is newly completely random, or same sequence but with an extra, random element at the end
- when game over
  -change play button to say play again and reenable
  -disable board
  -check if score is a new high score and update the high score if it is
*/
