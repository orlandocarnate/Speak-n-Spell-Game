# Word-Guess-Game

My version of the Word Guess Game or Hangman is based on an old Speak N Spell electronic game.

I used specialized webfonts from Google and Fontlibrary.com.

## The following is the pseudocode for the game:

* Declare Variables
* Create wordList Array with random words.
* Create a random word function where a random index number is uses to pick a word in the wordList array.
* Break down the random word into separate letters using `.split('')`
* We create another array with underlines. THe number of underlines is determined by the length of the random word.

* The player will press a key and the script will validate if it's a valid letter that was chosen before continuing.
* If a letter was chosen, we will see if that letter is in the random word array.
* If the letter is in the array, we will unhide it.
* If incorrect, decrement the number of guesses.
* If the number of guesses reaches 0, alert the player that they have lost and restart the game.

## Game Object
I will move the functions into an Object file. Any values or functions will be called using dot notation.

Create Game Object
