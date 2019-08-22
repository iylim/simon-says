<<<<<<< HEAD
import GameMaster from './GameMaster.js';
import { setHighScore } from './utils.js';

const GM = new GameMaster();

const play_button = document.getElementById('play-button');
play_button.addEventListener('click', GM.startGame);

setHighScore();
=======
import GameMaster from "./GameMaster.js";

const GM = new GameMaster();

const play_button = document.getElementById("play-button");
play_button.addEventListener("click", GM.startGame);
>>>>>>> 453c2c98c2262229b0c7c54bd564f4e61860a9b1

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
