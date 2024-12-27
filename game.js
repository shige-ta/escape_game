/** @format */

// ゲームステータス変数
let stage = 0;
const maxStages = 10;

// ストーリーと選択肢データ
const settings = ["暗い部屋", "研究室", "地下室", "監獄", "図書館"];
const problems = [
  "暗号ロック",
  "隠された鍵",
  "パズル装置",
  "警報システム",
  "隠し扉",
];
const actions = [
  "鍵を探す",
  "暗号を解く",
  "道具を使う",
  "ボタンを押す",
  "ヒントを探す",
];
const outcomes = [
  "扉が開いた",
  "罠が作動した",
  "隠し部屋に入った",
  "助けを呼ぶ声が聞こえた",
  "床が崩れた",
];

// 選択肢プール
const choicesPool = [
  "PCを操作する",
  "壁を調べる",
  "床を調べる",
  "アイテムを拾う",
  "暗号を入力する",
  "扉を叩く",
  "隠しスイッチを探す",
  "天井を確認する",
  "引き出しを開ける",
  "絵を外す",
  "鍵を試す",
  "ライトを点ける",
];

// ストーリー生成
function generateStory() {
  const setting = settings[Math.floor(Math.random() * settings.length)];
  const problem = problems[Math.floor(Math.random() * problems.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

  return {
    intro: `あなたは${setting}で目を覚ました。何も思い出せない。`,
    challenge: `${problem}が目の前にある。突破する方法を考えなければならない。`,
    decision: `${action}ことで突破できるかもしれない。`,
    result: `${outcome}。次のステージへ進め！`,
  };
}

// ランダム選択肢生成
function generateChoices() {
  let shuffled = choicesPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4); // ランダムに4つ選択
}

// ステージ表示
function showStage() {
  if (stage >= maxStages) {
    document.getElementById("message").innerText = "おめでとう！脱出成功！";
    replayGame();
    return;
  }

  const story = generateStory();
  document.getElementById("story").innerHTML = `
    <p>${story.intro}</p>
    <p>${story.challenge}</p>
    <p>${story.decision}</p>
  `;

  const choices = generateChoices(); // 選択肢生成
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  document.getElementById("message").innerText = ""; // メッセージをリセット

  const correctIndex = Math.floor(Math.random() * 4); // 正解のインデックスをランダムに選択

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice;

    // ボタンのクリック処理
    button.onclick = () =>
      resolveStage(
        index === correctIndex,
        button,
        choicesDiv.children,
        correctIndex
      );
    choicesDiv.appendChild(button);
  });
}

// ステージ結果判定
function resolveStage(success, clickedButton, buttons, correctIndex) {
  const message = document.getElementById("message");
  if (success) {
    // 成功した場合：正解ボタンの色を変更
    buttons[correctIndex].classList.add("correct");
    message.innerText = "成功！次のステージへ進みます！";

    setTimeout(() => {
      stage++;
      showStage();
    }, 1000); // 1秒後に次のステージへ
  } else {
    // 失敗した場合：ページ上にメッセージ表示
    message.innerText = "失敗！もう一度試してください！";
  }
}

// リプレイ機能
function replayGame() {
  if (confirm("もう一度プレイしますか？")) {
    stage = 0;
    showStage();
  } else {
    document.getElementById("message").innerText =
      "プレイありがとうございました！";
  }
}

// 初期化
window.onload = showStage;
