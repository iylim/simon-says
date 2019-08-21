/**
 * Toggles the event listeners on the game board squares either on or off
 * @param {function} funcOnInput the function to call when a square is triggered by user
 * @param {boolean} [enable] whether the input should turn interactivity on or off, defaults to off
 */
export const toggleGameSquares = (funcOnInput, enable = false) => {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    const toggleEL = enable ? square.addEventListener : square.removeEventListener;
    toggleEL('click', funcOnInput);
    toggleEL('keydown', event => {
      if (event.code === `Key${square.id.toUpperCase()}`) {
        funcOnInput();
      }
    });
  });
};

/**
 * Toggles whether the play button is enabled (active/interactable) or not
 * @param {boolean} [enabled] whether the button should be enabled or disabled, defaults to false
 */
export const togglePlayButton = (enabled = false) => {
  document.getElementById('play-button').disabled = !enabled;
};

/**
 * Activates all of the visual and audible elements to indicate a square has been selected
 * @param {HTMLElement} square the actual square element to modify
 * @param {number} display_time the amount of time in ms for the effects to remain, defaults to 500
 */
export const activateGameSquare = (square, display_time = 500) => {
  // TODO: all of this
  // TODO: figure out a way to get the correct sound in
  console.log(square, display_time);
};

/**
 * Takes in a score, checks the current saved high score in localstorage, and
 * if the new score is higher sets the stored high score to be the new score
 * @param {number} new_score the potential new high score
 */
export const setHighScore = new_score => {
  // TODO:
  console.log(new_score);
};
