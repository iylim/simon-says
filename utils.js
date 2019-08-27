/**
 * Toggles the event listeners on the game board squares either on or off
 * @param {function} funcOnInput the function to call when a square is triggered by user
 * @param {boolean} [enable] whether the input should turn interactivity on or off, defaults to off
 */
export const toggleGameSquares = (funcOnInput, enable = false) => {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    if (enable) {
      square.style.cursor = 'pointer';
      square.addEventListener('click', funcOnInput);
    } else {
      square.style.cursor = '';
      square.removeEventListener('click', funcOnInput);
    }
  });
  if (enable) {
    document.body.addEventListener('keydown', funcOnInput);
  } else {
    document.body.removeEventListener('keydown', funcOnInput);
  }
};

/**
 * Toggles whether the play button is enabled (active/interactable) or not
 * @param {boolean} [enabled] whether the button should be enabled or disabled, defaults to false
 */
export const togglePlayButton = (enabled = false) => {
  document.getElementById('play-button').disabled = !enabled;
};

/**
 * Sets inline CSS styles of an element then removes them after a delay time, creating a
 * simple animation effect.
 * @param {HTMLElement} element the actual element to animate
 * @param {Object} properties the dictionary of css properties to be set
 * @param {number} display_time the amount of time in ms for the effects to remain
 */
export const animateElement = (element, properties, display_time) => {
  Object.keys(properties).forEach(prop => {
    element.style.setProperty(prop, properties[prop]);
  });
  setTimeout(() => {
    Object.keys(properties).forEach(prop => {
      element.style.setProperty(prop, '');
    });
  }, display_time);
};

/**
 * Activates all of the visual and audible elements to indicate a square has been selected
 * @param {HTMLElement} square the actual square element to modify
 * @param {number} display_time the amount of time in ms for the effects to remain, defaults to 500
 */
export const activateGameSquare = (square, display_time = 500) => {
  const sound = new Audio(`./audio/${square.id}.wav`);
  sound.currentTime = 0.2;
  sound.play();
  const properties = {
    '--opacity': 1,
    border: '3px solid darkslategrey',
    'font-size': '28px',
  };
  animateElement(square, properties, display_time);
  setTimeout(() => {
    sound.pause();
  }, display_time);
};

/**
 * Takes in a score, checks the current saved high score in localstorage, and
 * if the new score is higher sets the stored high score to be the new score.
 * After setting, displays the high score on the page.
 *
 * If no new score is provided, will just display the currently saved high score on the page.
 * @param {number} [new_score] the potential new high score
 */
export const setHighScore = new_score => {
  let high_score = parseInt(localStorage.getItem('high_score'), 10);
  if (!high_score) {
    high_score = 0;
    localStorage.setItem('high_score', high_score);
  }
  if (!new_score) {
    document.getElementById('high-score-num').innerText = high_score || 0;
  }
  if (new_score > high_score) {
    localStorage.setItem('high_score', new_score);
    document.getElementById('high-score-num').innerText = new_score;
    const high_score_text = document.getElementById('high-score');
    const properties = {
      'font-size': '30px',
      margin: '0px',
      color: 'red',
      'font-weight': 'bolder',
    };
    animateElement(high_score_text, properties, 1000);
  }
};

/**
 * Updates the displayed score
 * @param {number} new_score the new score to be displays
 */
export const setDisplayScore = new_score => {
  document.getElementById('curr-score-num').innerText = new_score;
};

/**
 * A pure function that generates a randomized array sequence of the given length
 * from the given options.
 *
 * If the optional `prev_seq` parameter is included, just adds random new element(s) to
 * the end of the sequence until it's the given length, otherwise creates an entirely
 * new randomized sequence of the given length
 *
 * @param {Array<T>} options the elements to choose from for the sequence
 * @param {number} seq_length the length of the sequence to generate
 * @param {Array<T>} [prev_seq] [optional] the previous sequence to be used as the start of the new sequence
 * @returns {Array<T>} generated sequence array
 */
export const generateSequence = (options, seq_length, prev_seq) => {
  // TODO: what if the prev_seq is longer than desired sequence length
  const new_seq = prev_seq ? [...prev_seq] : [];
  while (new_seq.length < seq_length) {
    new_seq.push(options[Math.floor(Math.random() * options.length)]);
  }
  return new_seq;
};
