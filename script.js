// The following variables below are all the sound variables and mute/unmute fucntions 
let backgroundMusic = new Audio();
let portalEnterSound = new Audio();
let portalExitSound = new Audio();

backgroundMusic.src = "sounds/bg-music.mp3";
portalEnterSound.src = "sounds/warp-entrance.mp3";
portalExitSound.src = "sounds/warp-exit.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 1;
    }
}

function muteBackgroundMusic(){
    if (backgroundMusicStatus == 0){
        document.getElementById("mute-btn-img").setAttribute("src","ASSETS/HEADER/mute.png")
        backgroundMusic.volume = 0
        backgroundMusicStatus++
    } else {
        document.getElementById("mute-btn-img").setAttribute("src","ASSETS/HEADER/unmute.png")
        backgroundMusic.volume = 0.1
        backgroundMusicStatus--
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic)
//END HERE



// The following lines of codes are for the start animation (click to start)
document.addEventListener('click', () => {
    const portal = document.getElementById('portal');
    const burst = document.getElementById('portal-burst');

    void burst.offsetWidth;
    
    burst.classList.add('expand');
    portal.classList.add('show');

    setTimeout(() => {
    portalEnterSound.play();
    document.getElementById('start-title').style.opacity = '0';
    document.getElementById('start-header').style.opacity = '0';
    document.getElementById('bottom-ct').style.bottom = '-80px';
    document.getElementById('top-ct').style.top = '-80px';
    }, 0);

    setTimeout(() => {
        portal.classList.add('zoom');
    }, 600);

    setTimeout(() => {
        portalExitSound.play();
        document.getElementById('background-img').style.opacity = '0';
        document.getElementById('bottom-ct').style.bottom = '-480px';
        document.getElementById('top-ct').style.top = '-480px';
        portal.classList.add('shrink');
    }, 1900);

    setTimeout(() => {
        document.getElementById('background-img').style.opacity = '0';
    }, 2600);

    setTimeout(() => {
        hideStartScreen();
  
        changeDisplay();
        burst.classList.remove('expand');
        portal.classList.remove('show', 'zoom', 'shrink');
    }, 2600);
}, { once: true });
//END HERE



// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board

function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);

}
//END HERE

// The following lines of codes hides all the header and gameboard elements, and shows the end message
function endGame(){
    const portal = document.getElementById('portal2');
    
    portal.classList.add('show');

   
    document.getElementById("game-board").style.display = "none"
    document.getElementById("header").style.display = "none"
    clearInterval(backgroundMusicInterval)
    backgroundMusic.volume = 0
    if (scoreCounter >= 10){
        document.getElementById("pass-end-screen").style.display = "flex"

        const scrambled = "UVVBTlRVTQ=="; 
        const secretCode = atob(scrambled);

        const secretMessage = document.getElementById("secret-message");
        if (secretMessage) {
            secretMessage.innerHTML = "SECRET MESSAGE: <b>" 
                + secretCode + "</b>.";
        }

    } else {
        document.getElementById("fail-end-screen").style.display = "flex"
    }
}

// FAIL SCREEN PORTAL RESET
document.addEventListener("DOMContentLoaded", () => {
    const resetPortal = document.getElementById("portal-reset");
    if (resetPortal) {
        resetPortal.addEventListener("click", () => {
            location.reload();
        });
    }
});
// END HERE

// QUESTION BANK
let questionBank = [
    [
        ["ITEMS/announcements.png", "Course Selector", true],
        ["ITEMS/course-selector.png", "Announcements", true],
        ["ITEMS/grades.png", "Grades", false],
        "Which of the following icons is not available on the BigSky homepage?"
    ],
    [
        ["ITEMS/studentenrollrec.png", "Student Enrollment Record", false],
        ["ITEMS/worktodo.png", "Work To Do", true],
        ["ITEMS/chatwbeni.png", "Chat with Beni", true],
        "Which of the following items can not be found on BigSky?"
    ],
    [
        ["ITEMS/schedule.png", "Schedule", true],
        ["ITEMS/section.png", "Section", false],
        ["ITEMS/noprofessor.png", "Name of Professor", true],
        "Which of the following items is included in the My Courses widget?"
    ],
    [
        ["ITEMS/unexcused.png", "Unexcused (U)", true],
        ["ITEMS/excused.png", "Excused (E)", false],
        ["ITEMS/loa.png", "Leave of Absence (LOA)", true],
        "Which of the following items is part of the Attendance Status?"
    ],
    [
        ["ITEMS/bestar.png", "BeStar", true],
        ["ITEMS/canvas.png", "Canvas", true],
        ["ITEMS/bspapp.png", "The Brightspace Pulse App", false],
        "Which of the following apps/websites can you use to access your course deliverables?"
    ],
    [
        ["ITEMS/sections.png", "Section", true],
        ["ITEMS/sched.png", "Schedule", true],
        ["ITEMS/dropbox.png", "Dropbox", false],
        "Which of the following is not included in a Student Enrollment Form?"
    ],
    [
        ["ITEMS/akic.png", "AKIC (I)", true],
        ["ITEMS/atrium.png", "The Atrium (R)", true],
        ["ITEMS/henrysy.png", "Henry Sy Building (HS)", false],
        "Which of the following is not part of the Benilde campuses?"
    ],
    [
        ["ITEMS/green.png", "Green Legend", true],
        ["ITEMS/blue.png", "Blue Legend", false],
        ["ITEMS/red.png", "Red Legend", true],
        "Which of the following course legends indicates that a course has been completed?"
    ],
    [
        ["ITEMS/bestar.png", "BeStar", true],
        ["ITEMS/bigsky.png", "BigSky", true],
        ["ITEMS/beni.png", "BENI", false],
        "Which of the following icons is not a Benilde Academic Website?"
    ],
    [
        ["ITEMS/dashboard.png", "Dashboard Icons", true],
        ["ITEMS/course.png", "Course Icon", false],
        ["ITEMS/evalrecords.png", "Evaluation Records", true],
        "Which of the following icons is not included in BeSTAR?"
    ],
]

const choiceImageA = document.getElementById("choice-img-one")
const choiceImageB = document.getElementById("choice-img-two")
const choiceImageC = document.getElementById("choice-img-three")

let choiceTextA = document.getElementById("choice-text-one")
let choiceTextB = document.getElementById("choice-text-two")
let choiceTextC = document.getElementById("choice-text-three")

let clusterPrompt = document.getElementById("cluster-prompt")

let scoreDisplay = document.getElementById("score")

let scoreCounter = 0
let roundIndex = 0

function startGame() {
    hideStartScreen()
}

function changeDisplay() {
    choiceImageA.setAttribute("src", questionBank[roundIndex][0][0])
    choiceTextA.innerHTML = questionBank[roundIndex][0][1]
    choiceImageB.setAttribute("src", questionBank[roundIndex][1][0])
    choiceTextB.innerHTML = questionBank[roundIndex][1][1]
    choiceImageC.setAttribute("src", questionBank[roundIndex][2][0])
    choiceTextC.innerHTML = questionBank[roundIndex][2][1]
    clusterPrompt.innerHTML = questionBank[roundIndex][3]
    scoreDisplay.innerHTML = "SCORE: " + scoreCounter
}

function selectChoiceA() {
    if (questionBank[roundIndex][0][2] === false) {
        // ✅ correct
        scoreCounter++;
        roundIndex++;
        if (roundIndex === questionBank.length) {
            endGame(); // game finished, check pass/fail
        } else {
            changeDisplay();
        }
    } else {
        // ❌ wrong → immediate fail
        endGame();
    }
}

function selectChoiceB() {
    if (questionBank[roundIndex][1][2] === false) {
        scoreCounter++;
        roundIndex++;
        if (roundIndex === questionBank.length) {
            endGame();
        } else {
            changeDisplay();
        }
    } else {
        endGame();
    }
}

function selectChoiceC() {
    if (questionBank[roundIndex][2][2] === false) {
        scoreCounter++;
        roundIndex++;
        if (roundIndex === questionBank.length) {
            endGame();
        } else {
            changeDisplay();
        }
    } else {
        endGame();
    }
}

document.getElementById("choice-btn-one").addEventListener("click",selectChoiceA)
document.getElementById("choice-btn-two").addEventListener("click",selectChoiceB)
document.getElementById("choice-btn-three").addEventListener("click",selectChoiceC)