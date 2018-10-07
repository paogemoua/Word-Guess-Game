//VARIABLES
var words = ["gremlin","Davy Jones","Chupacabra","manticore","banshee","poltergeist","Nessie","revenant",
"the Jersey devil","Headless Horseman","zombie","Yeti","drop bear","mummy","orc","kraken","golem","werewolf","Godzilla",
"Cerberus","siren","succubus","incubus","cyclops","Sasquatch","Nandi bear","rakshasa","basilisk","changeling","Frankenstein",
"vampire","snallygaster","Dracula","windigo","penanggalan","ogbanje","Glawackus"]

//var EasywordBank = ["gremlin";"Davy Jones";"Chupacabra";"manticore";"banshee";"poltergeist";"Nessie";"revenant";
//"the Jersey devil";"Headless Horseman";"zombie";"Yeti";"drop bear";"mummy";"orc";"kraken";"golem";"werewolf";"Godzilla";
//"Cerberus";"siren";"succubus";"incubus";"cyclops";"Sasquatch";"Nandi bear";"rakshasa";"basilisk";"changeling";"Frankenstein";
//"vampire";"snallygaster";"Dracula";"windigo";"penanggalan";"ogbanje";"Glawackus"]

//var HardwordBank = ["Adze","Grootslang","Inkanyamba","Ammit","Dybbuk","Aswang","Manananggal","Penanggalan",
//"Monogolian Death Worm","Diao Si Gui","Tsuchinoko","Kamaitachi","Teke Teke","Gashadokuro","Jikininki","Pontianak",
//"Ittan-Momen","Ningen","Ghoul","Preta","Draugr","Banshee","Dullahan","Nuckelavee","Redcap","Kelpie","Gargoyle","Black Annis",
//"Black Dog","Minotaur","Typhon","Arachne","Cerberus","Lou Carcolh","Nalusa Falaya","Wendigo","Dover Demon","Jersey Devil",
//"Dagwanoenyent","Yee Naaldlooshiit","La Ciguapa","Chupacabra","Yara-Ma-Yha-Who","Drop Bear","Bunyip"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 14;
var correctGuesses = 0;


var currentwordh3 = document.getElementById("currentword")
console.log(currentwordh3)

// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//__________________________________________________________
//GAME FUNCTIONS
//__________________________________________________________
//Player selects level desired - PENDING

//GAME START FUNCTION
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    console.log(currentwordh3)

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}

//__________________________________________________________
//AUDIO FUNCTION - PENDING
//__________________________________________________________

//variables for audio function - PENDING

//__________________________________________________________
//IMAGE FUNCTION - PENDING
//__________________________________________________________

//__________________________________________________________
//DESCRIPTION FUNCTION - PENDING
//__________________________________________________________

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 14;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i].toLowerCase() === letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i].toLowerCase() === letter) {
                blanksAndCorrect[i] = letter;
                correctGuesses++;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (correctGuesses === randomWord.length) {
        wins++;
        //aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;
        console.log("wins: " + wins)

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").setAttribute("src", "./assets/images/try-again.png")
        document.getElementById("losstracker").innerHTML = " " + losses;
        console.log("losses: " + losses)
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = event.key.toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}