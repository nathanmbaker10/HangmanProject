function setUpVars() {
    easyWords = ["angry", "beautiful", "brave", "careful", "careless", "clever", "crazy", "cute", "dangerous", "exciting", "famous", "friendly",
        "happy", "interesting", "lucky", "old", "dpoor", "popular", "rich", "sad"];
    mediumWords = ["jazz", "buzz", "jazzed", "fizz", "fizzed", "joke", "jokes", "jokingly", "funny", "word", "sad", "interesting"];
    hardWords = ["awkward", "bagpipes", "banjo", "bungler", "croquet", "crypt", "dwarves",
        "fervid", "fishhook", "fjord", "gazebo", "gypsy", "haiku", "haphazard", "hyphen", "ivory", "jazzy", "jiffy", "jinx"];

    currentWord = '';
    wordArray =[];
    outputGuess = document.getElementById("guess");
    guessArray =[];
    selectBox = document.getElementById("selectBox");
    incorrectGuesses = 0;

}


function startGame(level) {
    incorrectGuesses = 0;
    guessArray = [];
    document.getElementById("guesses").innerHTML = '';
    document.getElementById("image").innerHTML = "<image src=\"img/Hangman-0.png\">";
    wordArray = [];
    document.getElementById("guessButton").disabled = false;
    switch (level){
        case "easy":
            currentWord = easyWords[Math.floor(Math.random() * easyWords.length)];
            document.getElementById("easy").disabled = true;
            document.getElementById("medium").disabled = false;
            document.getElementById("hard").disabled = false;
            break;
        case "medium":
            currentWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
            document.getElementById("easy").disabled = false;
            document.getElementById("medium").disabled = true;
            document.getElementById("hard").disabled = false;
            break;
        case "hard":
            currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];
            document.getElementById("easy").disabled = false;
            document.getElementById("medium").disabled = false;
            document.getElementById("hard").disabled = true;
            break;
    }
    console.log(currentWord);
    for(var i = 0; i < currentWord.length; i++){
        wordArray.push("_ ");
    }
    var guessAsString = wordArray.join().replace(/,/g, '');
    outputGuess.innerHTML = guessAsString;
}




function makeGuess() {
    var letterGuess = selectBox.value;
    selectBox.removeChild(selectBox.options[selectBox.selectedIndex]);
    guessArray.push(letterGuess);
    var guesses = guessArray.join();
    document.getElementById("guesses").innerHTML = guesses;
    var guessedCorrectly = false;
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] == letterGuess) {
            wordArray[i] = letterGuess.fontcolor("green");
            guessedCorrectly = true;
        }
    }
    if (!guessedCorrectly) {
        incorrectGuesses++;
    }
    document.getElementById("image").innerHTML = "<image src='img/Hangman-" + incorrectGuesses + ".png'>";
    console.log(incorrectGuesses);

    var guessAsString = wordArray.join().replace(/,/g, '');
    outputGuess.innerHTML = guessAsString;
    if (testForWin()) {
        document.getElementById("win").innerHTML = "Congrats! You won.".fontcolor("green");
        document.getElementById("guessButton").disabled = true;
    } else if (incorrectGuesses == 6){
        document.getElementById("win").innerHTML = "Unfortunately you lost".fontcolor("red");
        document.getElementById("guessButton").disabled = true;
    }else {
        document.getElementById("win").innerHTML = "Keep Going".fontcolor("blue");
    }
}



function testForWin() {
    for(var i = 0; i < wordArray.length; i++){
        if(wordArray[i] == "_ "){
            return false;
        }
    }
    return true;
}