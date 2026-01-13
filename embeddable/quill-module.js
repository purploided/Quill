const Quill = (() => { // unga bunga quill module
    console.log("%cPowered by Quill", "color:rgb(255, 255, 255); font-weight: bold; font-size:20px; font-family:Comic Sans MS; text-shadow: 2px 2px 0 #222, 4px 4px 0 #888;");
    // Typing test variables
    let startTime; // Start time of typing test
    let typingStarted = false; // Flag to check if typing has started
    let typingHasEnded = false; // Flag to check if typing has ended
    
    // Elements
    let userInputElement;
    let typingText;
    let wpmElement;
    let updateInterval;
    let accuracyElement;

    // Cooldown variables
    let cooldownEnabled = false;
    let cooldownTime;

    // Text randomiser variables
    let lengthRemember = 11;
    let lengthModifier = 3; // Default length modifier for random text generation
    let SpeedReference = [
        //
    ];

    // Ace Enabled
    let aceEnabled;

    // Debug
    let debug_ = false;

    // Highlight colors
    let highlightColorG; // Green for correct words
    let highlightColorR; // Red for incorrect words

    // Spelling bee variable
    let spellingBeeEnabled = false;
    const words = [
        "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "ximenia", "yuzu", "zucchini", // FRUITS
        "I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves", "this", "that", "these", "those", "who", "whom", "which", "what", "whose", "whoever", "whatever", "whichever", "whomever", // PRONOUNS
        "run", "walk", "jump", "skip", "hop", "crawl", "swim", "dive", "fly", "soar", "glide", "float", "drift", "sail", "drive", "ride", "cycle", "skate", "ski", "climb", "hike", "camp", "fish", "hunt", "shoot", // VERBS
        "happy", "sad", "angry", "mad", "glad", "joyful", "merry", "cheerful", "carefree", "careful", "cautious", "brave", "bold", "fearless", "daring", "courageous", "timid", "shy", "nervous", "anxious", "worried", "afraid", "scared", "frightened", "terrified", "panicked", "calm", "relaxed", "peaceful", "serene", "tranquil", "quiet", "still", "restful", "sleepy", "tired", "exhausted", "weary", "fatigued", "drained", "spent", "lazy", "idle", "sluggish", "lethargic", "drowsy", "sleepy", "dozy", "snoozy", // ADJECTIVES
        "the", "a", "an", "and", "but", "or", "for", "nor", "so", "yet", "after", "although", "as", "because", "before", "even", "if", "once", "since", "though", "unless", "until", "when", "where", "while", "both", "either", "neither", "not only", "whether", "as if", "as long as", "as soon as", "in order that", "so that" // CONJUNCTIONS
    ];

    // SpeedReference randomiser

    function textRandomiser(ln, lnmodifier) {
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i - 1));
            [words[i], words[j]] = [words[j], words[i]];
        }
        
        // Generate a random length for the text
        const randomLength = Math.floor(Math.random() * ln) + lnmodifier; // Random length between 0 and ln + lengthModifier
        const randomText = words.slice(0, randomLength).join(" ");

        lengthModifier = lnmodifier;
        lengthRemember = randomLength;
        SpeedReference = randomText;

        if (debug_ == true) {
            console.log(
                `%c[Quill]:%c Randomly Generated Text:   %c"%c${SpeedReference}%c"`,
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;",
                "font-family: Comic Sans MS;",
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;",
                "color: #fff; background: #222; font-family: monospace; padding: 2px 6px; border-radius: 4px;",
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;"
            );
            console.log(
                "%c[Quill]:%c Average Generation Length: %c" + lengthRemember,
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;",
                "font-family: Comic Sans MS;",
                "color: #fff; background: #222; font-family: Comic Sans MS; padding: 2px 6px; border-radius: 4px;"
            );
            console.log(
                "%c[Quill]:%c Length Modifier: %c" + lengthModifier,
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;",
                "font-family: Comic Sans MS;",
                "color: #fff; background: #222; font-family: Comic Sans MS; padding: 2px 6px; border-radius: 4px;"
            );
        }

        return randomText;
    }

    function start(uie, tt, wpmE, aceElement) { // made this a switch statement -- 22/06/2025 --
        switch (spellingBeeEnabled) {
            case true:
            spellingBee(true);

            userInputElement = document.getElementById(uie);
            typingText = document.getElementById(tt);
            wpmElement = document.getElementById(wpmE);
            accuracyElement = document.getElementById(aceElement);

            typingText.textContent = SpeedReference;

            userInputElement.addEventListener('input', onTyping);
            userInputElement.addEventListener('keydown', onKeyPress);
            break;
            default:

            userInputElement = document.getElementById(uie);
            typingText = document.getElementById(tt);
            wpmElement = document.getElementById(wpmE);
            accuracyElement = document.getElementById(aceElement);

            typingText.textContent = SpeedReference;

            userInputElement.addEventListener('input', onTyping);
            userInputElement.addEventListener('keydown', onKeyPress);
            break;
        }

        if (aceElement) {
            aceEnabled = true;
        }
    }
    
    function reset() {
        console.clear();
        console.warn("%c[Quill]:%c Resetting typing test...", "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");
        console.clear();
        console.log("%cPowered by Quill", "color:rgb(255, 255, 255); font-weight: bold; font-size:20px; font-family:Comic Sans MS; text-shadow: 2px 2px 0 #222, 4px 4px 0 #888;");
        switch (spellingBeeEnabled) {
            case true:
                spellingBee(true);
                userInputElement.value = '';
                typingText.textContent = SpeedReference;
                startTime = null;
                typingStarted = false;
                wpmElement.textContent = 'WPM: 0';
                accuracyElement.textContent = 'Accuracy: 0%';
                break;
            default:
                textRandomiser(lengthRemember, lengthModifier);
                userInputElement.value = '';
                typingText.textContent = SpeedReference;
                startTime = null;
                typingStarted = false;
                wpmElement.textContent = 'WPM: 0';
                accuracyElement.textContent = 'Accuracy: 0%';
                break;
        }
    }
    
    function onTyping() {
        if (!typingStarted) {
            startTime = new Date().getTime();
            typingStarted = true;
        }
        highlightText();  

        clearInterval(updateInterval); 
        
        updateInterval = setInterval(() => { 
            if (Quill.getWPM) {
                const wpm = Quill.getWPM();
                document.getElementById('wpm').textContent = `WPM: ${wpm}`;
            }
        }, 10);  
    }

    function onKeyPress(event) {
        if (event.key === 'Enter' && typingStarted) {
            typingHasEnded = true;
            setTimeout(() => {
                typingHasEnded = false;
                reset();
            }, 3000);
            stop();
        }
        else if (event.key === 'Escape' && !event.repeat) {
            setTimeout(() => {
            reset();
            }, 300);
        }
    }


    function stop() {
        let wpm = getWPM();
        let accuracyInt = accuracy();
        leaderstats();
        wpmElement.textContent = `WPM: ${wpm}`;
        typingText.textContent = getAdvice(wpm);
        accuracyElement.textContent = `Accuracy: ${accuracyInt}`;
        userInputElement.value = '';

        typingStarted = false;
        clearInterval(updateInterval);
    }
    
    function getWPM() {
        if (typingStarted) {
            const endTime = new Date().getTime();
            const userInput = userInputElement.value;
            const timeTaken = (endTime - startTime) / 1000; // time in seconds
            const wordsPerMinute = (userInput.split(' ').length / timeTaken) * 60;
            return wordsPerMinute.toFixed(0);
        }
        return 0;
    }
    
    function getAdvice(wpm) {
        if (wpm <= 50) {
            return "Advice: Practice daily with touch typing exercises, focusing on accuracy over speed to build muscle memory and gradually increase your WPM.";
        } else if (wpm > 50 && wpm <= 70) {
            return "Advice: Refine your typing rhythm with intermediate drills, focusing on consistent speed and tackling tricky key combinations to boost your accuracy.";
        } else if (wpm > 70 && wpm <= 90) {
            return "Advice: Challenge yourself with advanced typing tests, focusing on speed and accuracy to push your limits and reach your full potential.";
        } else {
            return "Advice: Congratulations! You are a typing master. Keep up the good work and continue to improve your typing skills.";
        }
    }
    
    function highlightText(hcG, hcR) {
        const userInput = userInputElement.value;
        const SpeedWords = typingText.textContent.split(' ');
        const userWords = userInput.split(' ');
    
        let highlightedText = '';
        for (let i = 0; i < SpeedWords.length; i++) {
            if (userWords[i] && userWords[i].toLowerCase() === SpeedWords[i].toLowerCase()) {
                highlightedText += `<span style="color: ${highlightColorG}">${SpeedWords[i]}</span> `;
            } else {
                highlightedText += `<span style="color: ${highlightColorR}">${SpeedWords[i]}</span> `;
            }
        }

        if (hcG && hcR) {
            highlightColorG = hcG;
            highlightColorR = hcR;
        }
    
        typingText.innerHTML = highlightedText;
        return highlightedText;
    }

    function debug(){
        debug_ = true;
        setInterval(() => {
            console.log(`%c[Quill]:%c WPM: ${getWPM()}`, "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");

            if (typingStarted) {
                console.log("%c[Quill]:%c Typing test has started.", "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");
            } else {
                console.log("%c[Quill]:%c Typing test has not started yet.", "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");
            }
        }, 1000);

        console.log(`%c[Quill]:%c Start time: ${startTime}`, "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");
        console.log(`%c[Quill]:%c WPM: ${getWPM()}`, "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");
        console.log(`%c[Quill]:%c ${getAdvice(getWPM())}`, "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;", "font-family: Comic Sans MS;");

    }

    function wpmHider() {
        setInterval(() => {
            if (typingStarted) {
                // Optionally update live values here if needed
            }
        }, 10);

        if (aceEnabled == true) {
            setInterval(() => {
                if (typingStarted) {
                    // Optionally update accuracy live here if needed
                }
            }, 10);
        }
        // Ensure elements are always visible
        if (wpmElement) wpmElement.style.display = "block";
        if (accuracyElement) accuracyElement.style.display = "block";
    }

    /*
        gonna add an accuracy calculator because i hate my life

        -- 18/11/2024 --

---------------------------------------------------------------------------

        overhauling this... because i hate my life

        -- 22/06/2025 --
    */

    // Combined accuracy and ace functionality
    function accuracy(defineAccuracyElement) {
        if (defineAccuracyElement) {
            accuracyElement = document.getElementById(defineAccuracyElement);
            setInterval(() => {
                if (typingStarted) {
                    accuracyElement.textContent = `Accuracy: ${accuracy()}`;
                }
            }, 10);
            return;
        }

        const userInput = userInputElement.value;
        const SpeedWords = typingText.textContent.split(' ');
        const userWords = userInput.split(' ');

        let correctWords = 0;
        let incorrectWords = 0;

        if (typingStarted) {
            for (let i = 0; i < SpeedWords.length; i++) {
                if (userWords[i] && userWords[i].toLowerCase() === SpeedWords[i].toLowerCase()) {
                    correctWords++;
                } else {
                    incorrectWords++;
                }
            }
         
            let acc = (correctWords / (correctWords + incorrectWords)) * 900;
            acc = Math.min(acc, 100);

            return `${acc.toFixed(0)}%`;
        }
        return "0%";
    }
    
    // Local Best WPM and Accuracy
    function leaderstats() {
        let currentWpm = getWPM();
        let currentAcc = accuracy();

        let leaderstatsLocalStorage = localStorage.getItem("leaderstats");
        let leaderstatsParsed = leaderstatsLocalStorage ? JSON.parse(leaderstatsLocalStorage) : { wpm: 0, acc: 0 };

        if (currentWpm > leaderstatsParsed.wpm || currentAcc > leaderstatsParsed.acc) {
            leaderstatsParsed.wpm = currentWpm;
            leaderstatsParsed.acc = currentAcc;
        }
        else if (currentAcc > leaderstatsParsed.acc) {
            leaderstatsParsed.acc = currentAcc;
        }
        else if (currentWpm > leaderstatsParsed.wpm) {
            leaderstatsParsed.wpm = currentWpm;
        }

        localStorage.setItem("leaderstats", JSON.stringify(leaderstatsParsed));

        if (debug_ == true) {
            console.log(
                "%c[Quill]:%c Best WPM: %c" + leaderstatsParsed.wpm,
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;",
                "font-family: Comic Sans MS;",
                "color: #fff; background: #222; font-family: Comic Sans MS; padding: 2px 6px; border-radius: 4px;"
            );
            console.log(
                "%c[Quill]:%c Best Accuracy: %c" + leaderstatsParsed.acc + "%",
                "color: #00bfff; font-weight: bold; font-family: Comic Sans MS;",
                "font-family: Comic Sans MS;",
                "color: #fff; background: #222; font-family: Comic Sans MS; padding: 2px 6px; border-radius: 4px;"
            );
    }

        return leaderstatsParsed;
    }

    // making a spelling bee function, seeing how quick you type a word

    function spellingBee(enabled) {
        spellingBeeEnabled = true;

        // Select a random word from the array
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];

        console.log(randomWord);
        SpeedReference = randomWord;

        return randomWord;
    }

    // Export the functions
    return {
        start,
        reset,
        getWPM,
        getAdvice,
        debug,
        textRandomiser,
        highlightText,
        wpmHider,
        accuracy,
        leaderstats,
        spellingBee
    };
})();