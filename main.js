// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!! 
// 랜덤번호가 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다

let computerNum = 0
let playBtn = document.getElementById("playBtn");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("result-area");
let resetBtn = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let gameImg = document.getElementById("game-image");
let historyText = document.getElementById("history-text");
let bingoText = document.getElementById("bingo");
let chances = 3;
let gameOver = false;
let history =[];

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    bingoText.textContent = `정답 : ${computerNum}`
    console.log("정답", computerNum);
}

function play(){
    let userValue =userInput.value;

    
    
    if(userValue<1 || userValue>100){
      resultArea.textContent="1과 100사이 숫자를 입력해주세요."
      return;
    }

    if(history.includes(userValue)){
      resultArea.textContent="이미 입력한 숫자입니다 다른 숫자를 입력해 주세요"
      return
    }

    chances--;
    chanceArea.textContent = `남은 기회는 : ${chances}회`;
    console.log("chace", chances); 

    if(userValue < computerNum){
       resultArea.textContent = "UP!!" 
       gameImg.src = "images/up.gif"
    }else if(userValue > computerNum){
       resultArea.textContent = "DOWN!!!"
       gameImg.src = "images/down.gif"
    }else if(userValue == computerNum){
       resultArea.textContent = "정답입니다!"
       gameImg.src = "images/bingo.gif"
       gameOver=true
       playBtn.disabled = true;
      return;
    }

    history.push(userValue)
    historyText.textContent = `지금까지 입력한 숫자:${history}`;

    if(chances === 0){
      resultArea.textContent ="Game Over";
      gameImg.src = "images/gameOver.gif"
      gameOver=true
    }
    if (gameOver==true){
      playBtn.disabled = true;
    }
}

function reset(){
   // user input 창이 깨끗하게 정리되고
   userInput.value = ""
   // 새로운 번호가 생성되고
   pickRandomNum()

   resultArea.textContent = "과연 결과는?!"
   chances = 3;
   chanceArea.textContent = `남은 기회는 : ${chances}`;
   gameImg.src = "images/게임준비.gif"
   history = [];
   historyText.textContent = `지금까지 입력한 숫자:${history}`;
   gameOver=false;
   playBtn.disabled = false;
}

pickRandomNum()
playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""});