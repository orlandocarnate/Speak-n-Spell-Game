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
        switch (clip) {
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

}