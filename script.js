const questions = [
    "ド","レ","ミ","ファ","ソ","ラ","シ",
    "♯ド","♯レ","♯ファ","♯ソ","♯ラ",
    "♭レ","♭ミ","♭ソ","♭ラ","♭シ"
];

const problem = document.getElementById("problem");
const sound = document.getElementById("sound");
const timer = document.getElementById("timer");
const start = document.getElementById("start");

const keys = document.querySelectorAll(".white, .black");

let answer = 0;
let timeLeft = 30;
let currentQuestion = "";

function nextQuestion() {
    currentQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    problem.textContent = currentQuestion + "を押してください";
}

function countDown() {
    timer.textContent = "残り時間：" + timeLeft + "秒";

    if (timeLeft <= 0) {

        problem.textContent = "🎮 ゲーム終了！";
        sound.textContent = "🏆 点数：" + answer;

        keys.forEach(key => key.disabled = true);

        return;
    }

    timeLeft--;

    setTimeout(countDown,1000);
}

start.onclick = function(){

    answer = 0;
    timeLeft = 30;

    start.style.display = "none";

    keys.forEach(key => key.disabled = false);

    nextQuestion();

    countDown();

}

keys.forEach(key=>{

    key.disabled = true;

    key.onclick = function(){

        const notes = key.dataset.note.split(",");

        if(notes.length==2){

            sound.textContent =
            "その音は " +
            notes[0] +
            "（" +
            notes[1] +
            "）です";

        }else{

            sound.textContent =
            "その音は " +
            notes[0] +
            "です";

        }

        key.classList.add("active");

        setTimeout(()=>{
            key.classList.remove("active");
        },150);

        if(notes.includes(currentQuestion)){

            answer++;

            sound.textContent="正解✨";

            setTimeout(()=>{
                sound.textContent="";
            },500);

            nextQuestion();

        }

    }

});
