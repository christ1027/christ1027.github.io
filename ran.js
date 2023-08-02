const displayValue = document.getElementById("display-value");
const randomBtn = document.getElementById("random-btn");

// 預留空陣列存放值
const values = [];

// 將隨機值加入陣列
values.push("Value 1");
values.push("Value 2");
values.push("Value 3");
// ...

// 隨機顯示陣列中的值
function showRandomValue() {
  const randomIndex = Math.floor(Math.random() * values.length);
  displayValue.textContent = values[randomIndex];
}

let intervalId;

randomBtn.addEventListener("click", function () {
  // 清除之前的間隔計時器
  clearInterval(intervalId);

  // 每0.5秒隨機顯示一個值
  intervalId = setInterval(showRandomValue, 500);

  // 5秒後停止隨機顯示
  setTimeout(function () {
    clearInterval(intervalId);
  }, 5000);
});