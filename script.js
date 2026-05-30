let time = 100; //ゲームの制限時間を秒単位で設定

function startGame() {
  document.getElementById("titleScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  function dountimer() {
    time--;
    document.getElementById("timer").textContent = `時間: ${time}`;
    if (time === 0) {
      document.getElementById("message").textContent =
        `時間切れ！正解は${answer}でした。`;
      document.getElementById("guess").disabled = true;
      document.getElementById("checkButton").disabled = true;
      clearInterval(timer);
    }
  }
  timer = setInterval(dountimer, 1000); //1秒ごとにdountimer関数を呼び出す
}

const answer = Math.floor(Math.random() * 100) + 1;
// Math.random():0以上1未満のランダムな小数を生成
// Math.floor():小数点以下を切り捨てる
// 1を足すことで、1から100までの整数が生成される
let count = 10;
let history = [];

function checkNumber() {
  const inputValue = document.getElementById("guess").value;
  const message = document.getElementById("message");
  const guess = Number(inputValue);

  if (inputValue === "") {
    message.textContent = "数字を入力してください！";
    return;
  }

  count--;
  document.getElementById("count").textContent = `残り回数: ${count}`;
  if (count === 0) {
    message.textContent = `ゲームオーバー！正解は${answer}でした。`;
    document.getElementById("guess").disabled = true; //入力を無効にする
    document.getElementById("checkButton").disabled = true; //ボタンを無効にする
    clearInterval(timer); //タイマーを停止する
    return;
  }

  history.push(guess);
  document.getElementById("history").textContent =
    `履歴: ${history.join(", ")}`;

  if (guess === answer) {
    message.textContent = "正解！";
    document.getElementById("guess").disabled = true; //入力を無効にする
    document.getElementById("checkButton").disabled = true; //ボタンを無効にする
    clearInterval(timer); //タイマーを停止する
  } else if (guess < answer) {
    message.textContent = "もっと大きい！";
  } else {
    message.textContent = "もっと小さい！";
  }
}

document.getElementById("guess").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkNumber();
  }
});

function resetGame() {
  location.reload(); //ページをリロードしてゲームをリセット
}
