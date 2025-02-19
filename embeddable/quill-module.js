const Quill = (() => { // unga bunga quill module
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
    let SpeedReference = [
        //
    ];

    // Ace Enabled
    let aceEnabled;

    // Highlight colors
    let highlightColorG = "green";
    let highlightColorR = "red";

    // Time limit variables
    let timeLimitEnabled = false;
    let timeLimitTime;

    // Spelling bee variable
    let spellingBeeEnabled = false;

    // Random words for typing
    const RandomWordsForTyping = [
        "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "ximenia", "yuzu", "zucchini",
        "I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves", "this", "that", "these", "those", "who", "whom", "which", "what", "whose", "whoever", "whatever", "whichever", "whomever",
        "run", "walk", "jump", "skip", "hop", "crawl", "swim", "dive", "fly", "soar", "glide", "float", "drift", "sail", "drive", "ride", "cycle", "skate", "ski", "climb", "hike", "camp", "fish", "hunt", "shoot",
        "happy", "sad", "angry", "mad", "glad", "joyful", "merry", "cheerful", "carefree", "careful", "cautious", "brave", "bold", "fearless", "daring", "courageous", "timid", "shy", "nervous", "anxious", "worried", "afraid", "scared", "frightened", "terrified", "panicked", "calm", "relaxed", "peaceful", "serene", "tranquil", "quiet", "still", "restful", "sleepy", "tired", "exhausted", "weary", "fatigued", "drained", "spent", "lazy", "idle", "sluggish", "lethargic", "drowsy", "sleepy", "dozy", "snoozy",
        "the", "a", "an", "and", "but", "or", "for", "nor", "so", "yet", "after", "although", "as", "because", "before", "even", "if", "once", "since", "though", "unless", "until", "when", "where", "while", "both", "either", "neither", "not only", "whether", "as if", "as long as", "as soon as", "in order that", "so that"
    ];

    // SpeedReference randomiser

    function textRandomiser(ln) {
        // Shuffle the array using Fisher-Yates algorithm for better randomness
        for (let i = RandomWordsForTyping.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i - 1));
            [RandomWordsForTyping[i], RandomWordsForTyping[j]] = [RandomWordsForTyping[j], RandomWordsForTyping[i]];
        }

        // Generate a random length for the text
        const randomLength = Math.floor(Math.random() * ln) + 10;
        const randomText = RandomWordsForTyping.slice(0, randomLength).join(" ");

        console.log(randomText);
        SpeedReference = randomText;
        // Remember length set by end user
        lengthRemember = randomLength;
        console.log(lengthRemember);

        return randomText;
    }

    /*
        why must coding be so deathly deathing deathly difficult

        github copilot and stackoverflow are my best friends

        i am so tired of coding

        i am so tired of coding

        i am so tired of coding

        i am so tired of coding

        anyway, let's do some coding :D

        -- 03/11/2024 --
    */

    function start(uie, tt, wpmE, aceElement) {
        if (spellingBeeEnabled == true) {
            spellingBee(true);
            timeLimit(timeLimitEnabled, timeLimitTime);
            
            // Initialize DOM elements
            userInputElement = document.getElementById(uie);
            typingText = document.getElementById(tt);
            wpmElement = document.getElementById(wpmE);
            accuracyElement = document.getElementById(aceElement);
            
            // Initialize the typing test with random text
            typingText.textContent = SpeedReference;
            
            // Setup event listeners for the input field
            userInputElement.addEventListener('input', onTyping);
            userInputElement.addEventListener('keydown', onKeyPress);
    
            // if ace is defined, enable it
            if (aceElement) {
                aceEnabled = true;
            }
        }
        else {
            textRandomiser(lengthRemember);
            timeLimit(timeLimitEnabled, timeLimitTime);
            
            // Initialize DOM elements
            userInputElement = document.getElementById(uie);
            typingText = document.getElementById(tt);
            wpmElement = document.getElementById(wpmE);
            accuracyElement = document.getElementById(aceElement);
            
            // Initialize the typing test with random text
            typingText.textContent = SpeedReference;
            
            // Setup event listeners for the input field
            userInputElement.addEventListener('input', onTyping);
            userInputElement.addEventListener('keydown', onKeyPress);
    
            // if ace is defined, enable it
            if (aceElement) {
                aceEnabled = true;
            }
        }
    }
    
    function reset() {
        if (spellingBeeEnabled == true) {
            spellingBee(true);
            // Reset the typing test
            userInputElement.value = '';
            typingText.textContent = SpeedReference;
            startTime = null;
            typingStarted = false;
            wpmElement.textContent = 'WPM: 0';
            accuracyElement.textContent = 'Accuracy: 0%';
        }
        else {
            textRandomiser(lengthRemember);
            // Reset the typing test
            userInputElement.value = '';
            typingText.textContent = SpeedReference;
            startTime = null;
            typingStarted = false;
            wpmElement.textContent = 'WPM: 0';
            accuracyElement.textContent = 'Accuracy: 0%';
        }
    }
    
    function onTyping() {
        // Start the timer on first input
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
        // Handle key press events for 'Enter' and 'Escape'
        if (event.key === 'Enter' && typingStarted) {
            typingHasEnded = true;
            setTimeout(() => {
                typingHasEnded = false;
            }, 1);
            stop();
            timedReset(cooldownEnabled, cooldownTime); 
        }
        else if (event.key === 'Escape' && !event.repeat) {
            setTimeout(() => {
            reset();
            }, 300);
        }
    }

    function timedReset(enabled, cooldown) {
        if (!enabled) {
            cooldownEnabled = false;
            cooldownTime;
            return;
        }
        setInterval(() => {
            if (enabled && typingHasEnded) {
                cooldownEnabled = true;
                cooldownTime = cooldown;

                setTimeout(() => {
                reset();
                }, cooldown);
            }
        }, 1);
    }

    function stop() {
        let wpm = getWPM();
        let accuracy = getAccuracy();
        let leaderboard = leaderstats();
        // Display the typing speed and advice
        wpmElement.textContent = `WPM: ${wpm}`;
        typingText.textContent = getAdvice(wpm);
        accuracyElement.textContent = `Accuracy: ${accuracy}%`;
        userInputElement.value = '';

        // Pause the wpm update, instead of setting it to 0

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
            return "Advice: Refine your typing rhythm with intermediate drills, focusing on consistent speed and tackling tricky key combinations to boost your accuracy and flow.";
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
    }

    function debug(){
        setInterval(() => {
            console.log("WPM: " + getWPM());

            if (typingStarted) {
                console.log("Typing test has started.");
            } else {
                console.log("Typing test has not started yet.");
            }
        }, 1000);

        console.log("Start time: " + startTime);
        console.log("WPM: " + getWPM());
        console.log("Advice: " + getAdvice(getWPM()));

    }

    /*
        what should i add here to make it more customisable

        -- 09/11/2024 --

        i'll add a time limit for typing, itll be togglable and customisable
    */

    function timeLimit(enabled, time) {
        setInterval(() => {
            if (enabled && typingStarted) {
                setTimeout(() => {
                    stop();
                }, time);
            }
        }, 1000);
    }

    /*
        adding presets

        -- 15/11/2024 --
    */

    function preset(number) {
        switch (number) {
            case 1: // time limit and timed reset
                timedReset(true, 2000); // reset finish after 2 seconds
                timeLimit(true, 30000); // typing time limit of 30 seconds
                break;
            case 2: // dark red and dark blue highlight colors
                highlightText("darkred", "darkblue");
                break;
            case 3: // random text length of 20 words
                textRandomiser(20);
                break;
            case 4: // all presets
                timedReset(true, 2000);
                timeLimit(true, 30000);
                highlightText("darkred", "darkblue");
                textRandomiser(20);
                break;
        }
    }

    function highlightPreset(name) {
        switch (name) {
            case "default":
                highlightText("green", "red");
                break;
            case "samurai":
                highlightText("darkred", "gold");
                break;
            case "patriot":
                highlightText("darkblue", "darkred");
                break;
            case "monochrome":
                highlightText("darkgrey", "grey");
                break;
            case "christmas":
                highlightText("lightgreen", "red");
                break;
        }
    }

    // WPM hider until finished typing

    function wpmHider() {
        // SetInterval

        setInterval(() => {
            if (!typingStarted) {
                wpmElement.style.display = "block";
            } else {
                wpmElement.style.display = "none";
            }
        }, 10);

        if (aceEnabled == true) {
            setInterval(() => {
                if (!typingStarted) {
                    accuracyElement.style.display = "block";
                } else {
                    accuracyElement.style.display = "none";
                }
            }, 10);
        }
    }

    /*
        gonna add an accuracy calculator because i hate my life

        -- 18/11/2024 --
    */

    function getAccuracy() {
        const userInput = userInputElement.value;
        const SpeedWords = typingText.textContent.split(' ');
        const userWords = userInput.split(' ');

        // Calculate accuracy

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
         
            let accuracy = (correctWords / (correctWords + incorrectWords)) * 900;
            accuracy = Math.min(accuracy, 100);

            return accuracy.toFixed(0);
        }
    }

    // Ace
    function ace(defineAccuracyElement) {
        accuracyElement = document.getElementById(defineAccuracyElement);
        setInterval(() => {
            if (typingStarted) {
                accuracyElement.textContent = `Accuracy: ${getAccuracy()}%`;
            }
        }, 10);
        return;
    }
    
    // Local Best WPM and Accuracy
    function leaderstats() {
        let currentWpm = getWPM();
        let currentAcc = getAccuracy();

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

        console.log("Best WPM: " + leaderstatsParsed.wpm);
        console.log("Best Accuracy: " + leaderstatsParsed.acc);

        return leaderstatsParsed;
    }



    /*
                                    *#############+++++%#*+++*@::....*........:.....:.:-...=##*#*:................................::....:.....:.:.:::...:::-:--:-:---::--------=---===++:
                                    #%%%@@%%@%@@@@@@#@@@@@#%##@@*=@%-*...---*.+%#@#++##**%%##@@##*---=:====+=====+==+====+++*==++==-==++++#***==#*+**#++=+***=*-*+#++*%%#++*#%#%+#*%%#+*-
                                    @@@@@@@@@@@@@@@@@@@%@@####@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%##+-==========+=+==-+==+=+**-*+=++***=++=+=*+*=+-+-=-=-+#+%*=+%@*##*%**+=#%**+*#*##%#**%%+
                                    *#%#%%####%%%#@%@@@@@@#%##@##*%@@@@@@@@%@@@@@@@@@@@@@@@@#@#@+=-===-==+==+:=+-==*=+*===+++--+=====++-+++*+-++-+*#+*=+#+++=***##+#*+%%##+%##**%*##*#%+=
                                    *%%%%#%%%###%%@@@@@%@@%%##@%%#%#@@%@@@@@@@@@@@@@@@@@@@##%%%@==-==-=---*+-++-+++=+-=*+++=+%#===+*+*+*+*+++=+#+=+=+***+=**#**+*==+%#*#*#%****%@*#**###-
                                    %%@%%%@@@@@@@%@%@@@@@@@%#%@@##%#%%**%@@@@@@@@@#@@@@@-@@@#%%%+=-====+++-:*+++-===*##+-#*++==*+-*+-=*==+-=-+++#*-=*#***#++-+***#%*#++#*=##%%**%#####@++
                                    #@@@@@@%%@%@@@@@@@@@*-@@%%#@##@@@@@@@@@@@@@@@::-:::@@@@@@@@@==+-+==+=+=+====+*=+===+=*==*=+++++**+*++%%##**+==+*=++#+*#####*#**#*#*#*%#%%###*###*###-
                                    #@@@%@@@@@@%@%@@%@@@..+#@%#@#%@:....:-::==..@%%@=*......-=+#==++-+=+====**=+*=++++**=**+*+=+==*=**++=::--#+*=+%#*++#=*+++++*=*+@++#%#=**%**#@*#%###*=
                                    %@@@@@@@@@@@@@@@@@@@::++%@#@@#@:==-::#=##%..@.=*%#:.+=*++**#===+==*==*+++=+=+++*===+*====+-#*+**%=++%+%%==++=+*-+*=+%#+*+@*+%%@@@@%%@%%#*#+%##%%##%%+
                                    %@@@@@@@@@%@%@@%@@@#=---@@#%@@%-+*:+:=.##%.:@%%*#+:.+=+++*##=*=++++++++++++*+++*++%+++#**#=-=+-=:=*+%=+=+*=+#*+#*==+*=+**@#@@%:.:::--:=%%**#****####=
                                    =@@@@@@@@@@@@@@%@@@+*+=.+@%%@@+:**:#=*###@:.%*#*#*-.++=++*%*++==+**+*#+**=++*+**+#*=*%=++++#++##+#***=*%=#*=***=%#*@%@%%=%@+.:.---=---+:.**%##*##%%#=
                                    +%@@@@@@@%@@@@@@@@@#-:..=@@#@@::@@:--#-##%..@##*=++.=#+*+*%++++*=+++==+++++++++=#**+*+*#+#*+*+***##+*#*#*%##@*+%+*+%+-#%@#:::::--=*=++#%*#*+*#%#=***+
                                    *#*+*##+**++###@@#@@**%@@@%#@@..:@@.##:##@..@##@#+#.-*++*##=++==++++#*++*+**#*#*#+%*=##+#=##*+=+===#*=#*=+++==*++*####%@:.---:+=*#*+##*%*@##+*#*###%=
                                    -#####%%##%@@@#*%@@@@:*@%##@@@:.:#@.:=*+*#..@#*@##+..#++=%#**++*+**+****=***++##:.%%+++=-++*#===#**%+*=*+*#+**+*%#++#%%.:--=+*#*+=+*%@@%*#%#%@@%#%%%+
                                    *@@%%#@*%*%@@@@%@@@@@+=@@%%#%@@@@@@@@@%%@@@=++=*:=#::%*#*%#++*+*+***********#%%.=*@**#*+*%*##@%**#*=*+*+@%@%%##@%**%@%:.-:-=**+**##%@%@##**##++*##**+
                                    +#%%@@##%%@@@@@#@@*++@@@@@@%@#+#%%@@@@@@@@@@@@@@@@@*#::-*@#+*******=*##-##+#@:==@%##***+#**#=+##%*+##*#+:=-==**+*++%%..::==#+**+*%@%%%#+*##+*%*@%##*-
                                    %@@@@@@@@@@@@#@%#*#**+*+=-+=+*#*++=-----=++++#%%@@@@@#-#*-%****###**#*%-%#%%:#=*%%+*++*####%#+**+*####*+#%@%##**%%#@=.:++++***#%%%%%%###%%##%%%+%#%@+
                                    -+===+-+-==++***##*#%*###*%%+*=++++=**+++++===+++++*-+::*%-#%%@#+%+=#*%:%+=.::+%%@#*%###***##*%#%#****##@**%**%%**##.:+#*#***%%@%%%%*+=*#+*+*=++#*%+-
                                    +@@@@@@%##%**##*+++**=-=+=+++++=#===+*+**#+*****=-+#%%=:.=@:@:=.@%=@:+@-%+**+++#%%%#*#**+*****+%+#***#%*+*#****%+%@=.:++****%%#%%@%+#*##%*###@@%#%%#+
                                    :+=*#=+=+=+=+++++%++=+-*==**##%#+%%#*+*#+=-==+=***##+-.-*.@.::-:#:#=:::@..=#+%%*###*####%#%%**%*#*#@%:+******###**@.:+####*%%%%#%%+**#%@=#*#%%+#%%##=
                                    :#+==*%++****+%#%%%%##-%#*#++*+===+==-===-=++*+==-=+:%#:..@-@%:.::@%@@%@#:::-*=%%%%#*#%#%%##%*@*#@=%#%+%*%**##%##@@.-+*#-*%%%#%%#+**%##%+%%%%%##=+%#+
                                    =%%%%%%%%%#+=#*=-==:#%++++==----*--=*+++***+++%*+##@-.@@@@*.:*:.:*%@%*+%@@@@@:.--*+##%%@@@%%%@#+%#*%%#%%##%#%#*#%@:.=#*-:%*##%##*%%%+#++#@%%**@#@*%++
                                    :*=====--=+%#==*+=++=-=++++***+**+++++++=======+=+*=.#*:+%@:::.:*@@-.*@@#+%@@@@*+%%#*@@@%@@%@*##%#%#**#*##*%%#+#@*.:++-:%##*#*##*****#@%@#-*#%*###***
                                    :++#+=++++=++***+*+*##*++=++==++====::-::+==-==-:==:-#@@@@@:.:.:..:@@@@@@@@@@@*.*%*#@@%%%@%@@%@*%#*###%##%%#%#@@@..*+--%#+##%%##*#%#%+#%%**@@#+#%%%#-
                                    :***###**#*+*==+*+*--=+++*****++=--**-*@%#@@@@=*%@:..:+*#:....:::::..+@:%@@#:..@@@@#@@%@@%@%@%##%%%#%#**###+#%@*.:-+=+%=.-%####*##@=####*#%*%##%#*%##
                                    :*==+=+**+**#***#+#%***=:.:....:+=**###**+-+*@@@#@@@%%-....++=..:++:...:.:-+@@@@%%@@%@@@@%%%%@%#%%%##%%%%@%%%@%.:=%*#:..=@%%%%##*++*%+##%++##@#*%#%*+
                                    :###*===::=:::........:::::::#@@@%=-*+%*=#@@=#*+%.@@-.::::@@@@@@@@@@=-..:...#@@@@#:%@@%%@@%%@%#@##%#%#%##*%#@@..++-:..:%@%%%%######@%#@%*%@#*+#@*#*#-
                                    .:-:==-=:++=+-+=+##++-=:::-+%@@@+***@%#-##+#**+@+.@@.:---..@@@@@@@#:::***+#@@@@@@@@*#@%%@@@@@@%%%%@@#%#%@##@@::-**=:.-%@@@@@@@@@@@+#+@+*#+%@%#%%%*@#=
                                    :-#-*++*+-::--=-:.::::::=#%#**#@*=#@%%@=*%%+:=#+.+=-.-:-:=::%@@%++=#**-:::=+@##*##%*@@@@@@@@@@@##%%####%%@#@+.+#*:.:#@@@@#-:..::#@@#*%%%@#*#@*@##%#@+
                                    .:.::.:.:::=:=---:::-*=%@=*+%@#*#+#@#=+@+=%%+#%@@+-..:.:.#@@*@%*%%#*+*####=.-+**++@%@@%@@@%%%@@@@@%@@@@@@@@@:#%+:-%%##:.::=+-+*+-:-@#@%@+##*@####*#*+
                                    #@@@@@@@@:....::-=@**-+@#=*##@+-%+*#*+-@#-+#+--*#=*:--#%#*=+*@%***#%#%%%%*##%**+%%@%%@%@@%@%%%@%%@@@@.........::..::::.-----:::::-::@##*#%*@*####%%#+
                                    %@@@@@@@@@@@@@@#*+#=-*%#**%@@#+##*#%*@+=@%#%#%@@#+.=-*#%@##@@%@%%%**#****#*=*%@%##*++@@@@@@@@@@@@@....:--::-:::----:::::::::::::.:..:%@##@##%%%%%##*+
                                    %@@@@@@%%@@@#:-=+++==%@*+@@@%#=*@#+::@*#+++%#=@:.@.:++==**%##*##%@@@@%%####%#=-#%%#*+@@@@@@@%@@@@...::-:-----::---::--:::::::-::::::-@#%%*%#%%%%%%%*+
                                    @@@@@@%@@@@-:-+-=++-==+*%#@+-+@@@-*#@**+##-%%+.@*@::=++=-=+*##%#%#######%****@%#-**#**@@@@@@%%@@..::====--=-++=+===++===----:::::::::@*%%####%#*##%%+
                                    :#@@@@@@@@:::=+---+++%*=%*@:%@@%=-##*%%@=%%%:#@%@:.:-=+*+=-=+**+*##***+*+###***%#%###*@@@@@@@@@@..:----:----:::--:-:::-:--:::::::::::%%%%##@%%#%%#@#+
                                    ::.:-+*%@:...:=-++=+-+%@%%-*@#@:+@@%%#++****#+@+*.:::--+++*+==++-==+++#**###*****##*++++%@@@%%@@..**+----==+*******#*++-+---::----==*#%*###%#%#%%%%%+
                                    :#++%@%=#.::::*===*+#@+*%##@%@@***#=:%-#%#-@:#*@=.::--===+++###**#################**+*+%@@@@@@@@@=%#@@@@%%@%%#%#%%##%%%%#*#*######*##*%%%##%%####%#%+
                                    :--%#=-=+.:-::=-+==+*+#*%=#@#%:-@##%#**##+#%=%#@=::::-::=+=+***##*****#*#*#*****##+***#@@@@@@@@@..:=+=++**#*#**+**###@@##+**#%%%%%%%**%%##%%%%%%%###+
                                    :+++::::-:--:==-++=*==%###@@*#-%*#--+*#*+%@#-#*@.::::---=+==++**+##*****#******++*+*++=+@@@@@@@....+%@%@@@@@@@@@@@@@@*::-:++**%%%#*#**%@%*%#%%%%%#%%+
                                    -#--:--:--:::--==+=+***+-%#**+##%*@#*%@*@%%**#@%:.:-:--:---=+****##*+*#*#**#*#%***+++**#@@@@@@..:::::::::.....::.......::--:==+*%##*++%%%#@#####%%@@#
                                    :::::-:=*+=====--++=*+*%*%+==:@@#**%%%#=#-+#+%@@-.-------==+=*****+***#*#***++**+++++=+#*@@@@@.:::::.::::::::::..::::==+--:=:.:::-*#*+#%%#%##@%%##%**
                                    .:::--:===*::=---*==*=-==@#%*:@#%*#%#=#%#*#@#%@*:::-:--::-==++****#**#********#****+***#*#@@@@.-+=+==+====-:---:--:--:::--:::-:.:.-++%@####@%*#@%%%+=
                                    .---=-*=-=####*+:+=+*++#%*=%#*%=*%-@#+-#*#%#**@*::--::::---=++***+***+*+*****+*++=++***++--#@@%:#@%#%%##%%@@@%@%%*#*+=--::.:.::---===@%#%%@##%%%@%%@*
                                    .=--=--=#%@#***=:-=--++##+@#@@@#:%=***#*=#*#+%@=.::-:---=--=-++****++*+*******+**+***+===-::.*@@.#@%##*#####*#####***+****%#%%###*##@@%@%@@#%#*#%@#%%
                                    .=-=+%@@@@@@@@#*=--=++#==+:%+=:@-+==+=+*@**%%@@%.:-------=:---+=*+#******#***+++++**+++==--::::=..=+#%##*********###%%%#%########+#*@%%%%*%%@%@%@%@#*
                                    .#@@@@@-....:=%@#=-*-==+%%+==*@*=@%+*=*%###%@@@..:-:---=--=---==+*+**+***++*+*+=++*++++=+==:::::--::==+*#**#####+#******%#####*#*+##@@@%+%#%%##%#%%%*
                                    #@@@..:--#+++===:=::-==-=**+==*+#*-=*%+#*#@@@@@.:-:--==--:---:::-=++*++****+++++#*#+++++===----:.#%#%%%%%%%%@%@%@%##**#**+####*#*+@@@%@#%@%#%%%%%@###
                                    @#:-==+=*-=-:.:--*+--+-=*+=*+@*+%*=*=++#@%@@@@.::-:-=----=---=::--+=+*+++**++++***+++++=-===--::::*%#**++**+*+******###%#####*#*+%@@@@@@%%#%%%%%%@%%#
                                    ::-:=*=+%+++##**==-:-=+=%@@@%+#::-=::-*#@@@@@*.:::--====-=-==-==-=-+=++*=++++++***++*++++++==-:-::.:+*#*++++++++**************#+=@@@@@@@@#%%%%%%%%%#+
                                    :###=*++=--=-::-.+%@%+-:-.#-==#=*-::-:==@@@@%..:-::--:============-+++++=**+*+#*+**+++++==+==:::::.::.-#%#%@%%@%%++*******#*#*+=@@@@@@@@@@%%%@%%%*%@#
                                    .==+=*--+##+-++#=:-.:::--=+=*:*=##-:::---*#%@.:---=-======-=-======+==+++++==*****+++*+++**=:--:::-:@@#+*+**#*%#%@%***#****#**+%@@@@%@@@@@@#%%@@@@@@*
                                    :++++-==+**=-=+=*-:-*@*-.:*=##+=*==@+.=:-::*@=.:----=======--===++======+++*****+++**=++**#:::::---...*@@##****+++#**********+*@@@@@@@@@@@@%#%##%####
                                    :+=++%*=---:+*:-++==-+*@@*=+-*:..-=-@@@#+*#%@@::====+=====++++====+++++++++*+*+****##***#-=:::-:::-:-.:.-%@@@%@%%########*+==#@@@@@@@@@@@@@@%##@@@%@#
                                    .++-=:=#*+*+--==#+%=::::-::::.-+@@%+#:--@@%+##=:-=======++=-+++*+++++*++**++*****###**##+:--=::::-:.::::...:.:-+##%*#+==-+#@@@@@@@@@@@@@%%@@@@%#%#@%*
                                    :+***@**+-:**@%+-::=+*++*#*=::=+%+-:----:%@@@%.::--=:=--=+=====-==++++++***#*##%##**+*%#+:=+-:--------=---::-:=:::--+**%%@@@@@@@@@@@@@@%%@@@@@@%@@@@#
                                    .===-=++=+%%+--*+=**+%+-:::-#*+*:-::=++-----@..:=+++++*++=+++=+++=-==++++**#%%%%%%##*#%#+:+--=:-::=--::::=+--==-===+++#%@@@@@@@@%@@@@@@@%@@@%@%%%%%%#
                                    .**%*+**#%=--:=**=+=:-=%@@##=:=:-+%#@=-=%++@=.::::--++++++*++**##%%###%@@@@@%%@@@%%%###*#=*:=------.=---+:*-=*-++=**#%@@@@@@@@@%%%@@@@@@@@@@@@%@%%%%#
                                    :#*+++=++++*##**=-=*+#%#+++::::=--.:==..::.=-:---:--:--=**%@@@@####@%#*#%%@%@@@@@@%%@##*#*+=----:-====-====+=+=***%@@@@@@@%@%%%%@@@%%@@%@@@@@@@@%%@%#
                                    :++==#+++==++**+-:%@--::=-*-%*@-=+%+=@+:*%@%=.:::-:::-:::::::+@@@@%%#%%#%%%@@@@@@@@@%%%**#*+=+--=-=:==+=-+-+-#%%@@@@@@@%%@%@@@@@@@%%%@%%%@@@@@@@@#%%#
                                    :*%@@#+#++**---:*%#=+*===-**#+=+=---+:=#*::=*-:---:-------:-:::=@@%@%%%@#@@@@@%%%@@@@@%@@@###**+==--==::==#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%@%%@@@@%#
                                    :#+=-=++=+=++=++#:+#*@@@*=---++++=+-::::+*::*#::-------------::::#@@@@@@@@@@%@%@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@%%%@@%%@@%@@@@%%@@@@@@@@@%@@@@@%@%#
                                    :++**++-=+*+%%%*#+*+-::-=:+=---:::.:::=-*%@#==+:--------------:::.=@@@@%@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@%@@@%%@%@@@%@@%@@@@@%@%@@@@@@@%%@@@@%@@%
                                    -*%*#%%@###+==-=##=:=-+===-::-:=-#%@@@%*-:-#*+=+-----:::--:--:---:.*@@@@@@%%@%#@@%%%%%@%%@@%@@@@@%@@@@@@@@@@@@%@%@@%@@#%@@@@@@%@@%@@@@@@@@@@%@@%@%@@#
                                    +###+*+*++=**#*++%@##+==-=-**@%%+=-:--=:--=-+#=:+*--------=---==-:..=@@@%%@@#%%@%@@%@@%@@@@%@@@@%@@@@@@@@@@@@@@@@%@%%@@@@@@@@@%%@@@@@@@%%@%@@@@@@%@@%
                                    :+*++*+++++++**=+++-*%%%#@#@@#::=-+=*=++-==::=%%+:*+---=--:===--==-:.-@@@@@@@%##%%#%%@%@@@@@@@@@@%%@@@%@@@@@@@@@@@@@@@%@@%@@@@@@@@@%@%%%@@@@%@@%%@@@%
                                    :***#****===*+#@@%##=+==*@%*=+#*%#*+++=++#+*+==.**=-+-::------=--=--:.-%@@@@@@@@@@@@@@@@@#:+%@@@@@@@@@%%%@@%@@@@@@@@%@@@%@@%@@%%%@@@@@@@@@@%@@%%@%@@%
                                    :+==+=**#@%@@++==--====+==-#==++#@%*+#*+++*#+#=+++-***--------=-=-==--.:=%++*+@@@+#=++==:=+%%#++@@@@@@@@%@@@@@@@@@@@@@@@@@@%@@@@@%%%%%%@@@%@%@%@@@@@#
                                    =@@@@@%%===#**#****=@@*=+*++++*++-:*-===+=++==-=+#***@%+--------=====+--.-:=.:::++--:::==+:%+#+*+##@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@%@@@%@%
                                    -*++=%%==*#***+*+*%**#+**#==#+*+=#+=++=*==+*-====+++==+##=-=-=======--:==##=*+**+%@@#%%##@**-=-=:--==*@%%@%%%@@%@%%@@@@@%@@@@@@@@@@@@@@@@@%%@@@@@@@@%
                                    =##*+#@@@@*+****#++*++*++++**=+*++++++===*===+=-++=-+==-#%:-----=====---:--==-:::::=*%*:=+*----**#+==-=*%@@@@%@@@@@@%@@@%@@@@@@@@@@%@@@@@@@@@@@@@@@@%
                                    -+*%@@#**+*###******%*++*****#+=++=+++*+==*++++++=+==++++@--===-======-=--:+#-%@*==-++*=::::+**++===%==-:=*#@@%%%%@@%@@%%@@@@%@@@@@@@@@%@@@@@@@@@@@@%
                                    :-=-::-:::-::::::::::::::::::::::...::::...:..:..:..:::..:...................=*::....:--+==::................:+****#####%##%##%%%%%%%%%%%%%%%%%%%%%%#
    */

                     /*
                                    

                            :-::::-:::-::--:::-:--::-----------------------------==------=---------=----=---=-==-=--=-------=---
                            ---:-:---------:---::-:::--:-------------------------=-----------=-----:-------=-==--==-----===----=
                            ---------------------:-::---------:-------------------------=---:---:--:----------------------=--=-=
                            --------------------------------:---------------------------::--:----:---=-::-:---:-:----------=----
                            --:----==--------------------:--------------===-----=----:--::::::::-:-:-::--::::-::::-:-=---=----=-
                            ------------=-------------------:----------=+-=+++---=--=-::-:-::-::::--:-:::--:::::::::------=----=
                            ------+==++---------------------------:---====---=+*+-=---::::::--::-:--:-:::-::-::-::-------==----=
                            ----=-::+*++*--:-------=-------------------=+=--*-=-+**+:-:---:----:--::---:---:-----:---------=--=-
                            ----=::----+*++--=---------------------==---====+======+**---------::--:-:-:----::-:-:--:::-------=-
                            ----=-:--=---+*+----------------=-==#**=========-===+***=+*---=--:---:---:-------------::::-------==
                            ---------==--=-**+-----=--=-===***===-===-=--=====--==-=+*+++=+=----=---------=------::::::---------
                            -:------==------**++-==+=+****+----------------==--=----=-=*++*#**++==--=--=---------:::::::=----===
                            ::----:----====--**++=++**===--=--=--=-=---=------=---=-----+******+==*+*+=-=--------:::::::------=-
                            :::::::::-:-======**++*+===-=---=--=--=-===--=---=---=--=-----*+*+++======++==------::::::::=-=----=
                            ::::::-:------=++++++++++=====--====--===-=----==---==---------++***++=+=-===+=----:::::::::+--=----
                            ::------::--=+==++==:==#+====-====--==-==--------=----------=---*=+**=-=+=====+---::::::::::+---:---
                            :::--:---=+++*=======+++**=-======--======------------=----:----=*++*+=-=-+++=+-=-::::::::::==-=----
                            --=--=++===+==------+=+=+++**+-==-=========-=------------=-------+++++*+=---==-=-:::::::::::--------
                            --=++----+*==-=----===+===++++*+-==========-------=-=------------+=#+==*+=---=--::::::::::::-----=--
                            =++-----*+=====----==-=+=-==+=++*+=-----=----==--=-=-------------===+===#+=--=-=:::::::::::+==-=-=--
                            =+:----=*=====-----=+-==-=-===+=+*+-=#@@@@%#==-==-====-=--------=====-===*=++**::::::::::::-==+=--=-
                            +=----*+==--==--====+-==+-=++=--+*+%%%@@%*=@%=-==--=-====--------=-==+=-=+=+==-::::::::::::==++****-
                            +---++==-======-=-==-+--=:-+=+---*+%%@@@@%%%%#=-==-==-=-=---=---=-===++=+*-==+::::::::::::-*+++++***
                            +=--*=-=========:--=:-=--=+++++*++#%#%%#*##%%#==+==-====-==--=========*+=====:::::::::::::+=*+=+=++*
                            *++++--===--====--=--:==--==-=----*+#%%###%%++===========-============+*=-===:::::::::::::=====+====
                            #*+++-=--======-:------+--=++==---+=##+*#*==========-==============--=+*====:::::::::::::======++--=
                            =**+==-=-====--::-----:---=+---------+===-==-=============-----------==*===-:::::::::::::=-===++==++
                            --*=*==--===----=-:---=--===--------===+================--------------+*==-::::::::::::::====+**++*+
                            =-#+=======-----:::----:==+=-:-------====================----=-===----*==-::::::::::::::====+*****++
                            -+*========-----------:==-+-----=-=--==============--==----=---=-=--=++-=-::::::::::::::==-=+***+*++
                            -#*=======-==--=::-::::-=++-=-----:-----===========--=---------=----+*---::::::::::::::=-===***++*++
                            -#*======---==---------==++=-----------=-=======-==------------=---=*=-=-::::::::::::::====++++*+===
                            =*+=======-=---=------=+++++==------:---==---=--=----------:-=+--++=**--::::::::::::::-==-+++++=====
                            =++-==-=----==-=---:--=*++**++==:--===-==----==-----=---::--=====*+*+#=-::::::::::::::---++=+======+
                            *++:===--=--==--=-----+*++*+*+++=--=--==------------=-:---====+=++*++*#::::::::::::::-===+==========
                            *+=====-----=--=-:---+*++++*#***++=====---=--------:=--==+=++*++++*+++-:::::::::::::-===+=======++=+
                            ++====-+=-==-----:---+*+++++++*+***+++--==-=-==-==--:====+==+++=++*++*:-++=:::::::::=+=-==-=====++=+
                            *+++-==+==-=-----::--*++++==++++++*+*++++++++=+++====++=---===++=**++:-=**+-:.-++==-=-==-==-=======+
                            -=+===-----=--------+*=+*++-===+==+++==+=+=++++++====-==-===---==**+*:=+*+=-:=+=-=---=----==-=======
                            =-++======------===*+===*+++==+==+=+====++==+=====----=----=--==+***@@%#*=-*+++=----:------=========
                            =-=+++--=--=-==+**++=+==+*++=====+=+===++========-==-==---+--===***#@%%%%%%*#*+++----------====--=+=
                            =--==++*==+++***+*+=--===++=+++==+++========+**##*====-=-----===***@@%%%%%@*++*+===----------====##*
                            ------=+=-====**#++-==-==+*=+++====++****++++=======+=++=-=--===**@@%%%%%%%=+*###*+*+=-=--===+*#+*++
                            ----------===+**+=+======+++=++++***+++=+=--==---=-===-=-===++****@%%%%%%%###**+++++++***#*###**#*++
                            --------=====**+=========+**=+=+++=======--=--==-------=:-=*=+***#######%%###*#*******=++*#*#*++=---
                            --==----===-**#:=====+==++++=+==-====-==---=========-=---=-+=*++++++==+++++++***********++**++==----
                            --=---=====+*#+======+======+-=--====-=-======+==-=====---=++++=+===========+++*******#*#*+==-------
                            ---=-====-=+*+===+=====:=-=========-===========--=========+*++==+============+++**********===-------
                            -=-=======+*====++===========-===========================+*++++====+==+=-=====+*=*********+-----:---
                            ==========++++++======-===========================+======+*+=+=====+===+=======#-=********+=--------
                            ========-+**+============+=====+========================+++==++=++===+=++===-=+*=====+****+==-------
                            ========++*++=========+==+======+===================+===+*++=======+=+=+=======++-=--=========-====-
                            =======+*++++++===============+===================+====++*++++=================+*=-=-=====-+===-=+==
                            =======+**+++====+==============+==================+*++****++==+++===+=====+=+++=--==-==-==-=====+=+
                            =======+**++++===+=================+===========++**+******+==+==+=+========++=+*=-------=-===--+++++

                            */ 

    // making a spelling bee function, seeing how quick you type a word

    function spellingBee(enabled) {
        if (enabled == true) {
            spellingBeeEnabled = true;

            // Select a random word from the array
            const randomIndex = Math.floor(Math.random() * RandomWordsForTyping.length);
            const randomWord = RandomWordsForTyping[randomIndex];

            console.log(randomWord);
            SpeedReference = randomWord;

            return randomWord;
        }
        else {
            spellingBeeEnabled = false;
            return;
        }
    }

    // Export the functions
    return {
        start,
        reset,
        getWPM,
        getAdvice,
        debug,
        timedReset,
        textRandomiser,
        highlightText,
        timeLimit,
        preset,
        highlightPreset,
        wpmHider,
        getAccuracy,
        ace,
        leaderstats,
        spellingBee
    };
})();
