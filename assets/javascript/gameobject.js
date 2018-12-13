// GAME OBJECT FILE

// GLOBAL VARIABLES
var keyPress = "";
var winCount = 0;
var loseCount = 0;
var guessCount = 0;
var randomWord = "";
var fillInTheBlank = ""
// var randomWordSplit = [];
var alreadyGuessedArray = [];
var charExists = false;
var playInProgress = false;

// sound variables
var soundPlay = document.createElement('audio');

// ELEMENT VARIABLES
var feedbackID = document.getElementById("feedback");
var winsID = document.getElementById("wins");
var lossesID = document.getElementById("losses");
var guessCountID = document.getElementById("guessCount");
var fillInTheBlankID = document.getElementById("fillInTheBlank");
var alreadyGuessedID = document.getElementById("alreadyGuessed");

// word list array
var wordList = 
    ['html', 'css', 'alphabet', 'prestige', 'javascript',
    'jquery', 'bootstrap', 'flexbox', 'coding', 'developer',
    'programmer'];

// WORD GAME OBJECT
var wordGame = {
    // Pick random word from wordList
    randomize: function() {
        // reset already guessed letters
        alreadyGuessedArray = [];
        alreadyGuessedID.textContent = "NONE";

        // pick a random word from the wordList
        randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log("random word: " + randomWord);

        // assign randomWord length to guessCount
        guessCount = randomWord.length;
        guessCountID.textContent = guessCount;

        // create a variable with underlines and spaces.
        fillInTheBlank = '';
        for (i=0; i<guessCount; i++) {
            fillInTheBlank += '_';
        }
        fillInTheBlank = fillInTheBlank.split('').join(' ');

        console.log("Word array: " + fillInTheBlank);
        fillInTheBlankID.textContent = fillInTheBlank;
    },

    // Play a sound
    playSound: function(melody) {
        switch (melody) {
            case "melody":
                randomNum = Math.floor(Math.random() * 4 + 1);
                soundFile = "assets/sounds/MELODY-" + randomNum + ".wav";
                console.log(soundFile);
                break;
            case "win":
                soundFile = "assets/sounds/YOU-WIN.wav";
                break;
            case "lose":
                soundFile = "assets/sounds/I-WIN.wav";
                break;
            default:
                break;
        }
        soundPlay.src = soundFile;
        soundPlay.play();
    },

    // Play Letter Sound function
    playLetter: function(letter) {
        var letterSound = "assets/sounds/Alphabet/" + letter.toUpperCase() + ".wav";
        console.log(letterSound);
        soundPlay.src = letterSound;
        soundPlay.play();
    },

    // start game picks a new word but keeps score.
    playGame: function() {
        // call method within the object
        this.playSound("melody");
        var guessCount = 0;
        var randomWord = "";
        playInProgress = true;
        this.randomize();

    },

    // reset game and score
    resetGame: function() {
        this.playSound("melody");
        winCount = 0;
        loseCount = 0;
        guessCount = 0;
        randomWord = "";
        wordArray = [];
        guessArray = [];
        playInProgress = true;
        this.randomize();
    },

    // PUSH char to array function
    pushAlreadyGuessed: function(letter) {
        console.log("You chose: " + letter);
        alreadyGuessedArray.push(letter);
        alreadyGuessedID.textContent = alreadyGuessedArray;
    },

    // validate keypress
    validateKey: function(k) {
        if ((k.keyCode >= 65 && k.keyCode <= 90) || (k.keyCode >= 97 && k.keyCode <= 122)) {
            return true;
        }
        else {
            return false;
        }
    },

    // does pressed key match any letter in the random word?
    findMatch: function(userkey) {
        // run a for loop to compare each letter and set charExists to True
        for (i=0; i < randomWord.length; i++) {
            if (userkey === randomWord.charAt(i)) {
                blankArray = fillInTheBlank.split(' ');
                blankArray[i] = userkey;
                revealedLetters = blankArray.join('');
                fillInTheBlank = blankArray.join(' ');
                fillInTheBlankID.textContent = fillInTheBlank;
                charExists = true;

                // Player WINS if joinedBlank is equal to wordArray
                console.log(joinedBlank, randomWord);
                if (revealedLetters === randomWord) {
                    feedbackID.textContent = "YOU WIN - PLAY AGAIN?";
                    playSound("win");
                    winCount++;
                    winsID.textContent = winCount;
                    playInProgress = false;

                } else {
                    // play letter sound
                    playLetter(userKey);
                }
            }
        }
            
        // if no match then reduce # of guesses by 1
        if (!charExists) {
            guessCount--;
            guessCountID.textContent = guessCount;
            if (guessCount === 0) {
            feedbackID.textContent = "YOU LOSE - PRESS PLAY TO PLAY AGAIN";
            playSound("lose");
            loseCount++;
            lossesID.textContent = loseCount;
            playInProgress = false;
            } 
            else {
            // play letter sound
            playLetter(userKey);
            }
        }

        // reset charExists to FALSE
        if (charExists) {
            charExists = false;
        }
    },
}

// Event Listener for Play button
document.getElementById("playButton").addEventListener("click", function(){
    wordGame.playGame();
});

// Event Listener for Reset button
document.getElementById("resetButton").addEventListener("click", function(){
    wordGame.resetGame();
});

// Get Player Input from Document
document.onkeypress = function(event) {
    userKey = event.key.toLowerCase();
    console.log(event.keyCode);

    // if gameplay is in progress run the game
    if (playInProgress) {

        // continue of keypress is a valid letter
        if (wordGame.validateKey(userKey)) {
            wordGame.pushAlreadyGuessed(userKey);
            wordGame.findMatch(userKey);
        }
    }
}

