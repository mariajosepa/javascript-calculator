keypad = document.querySelector(".calculator-btns");
calcScreen = document.querySelector("#calculator-screen");
let currentNumber = "";

const numberDictionary = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };



keypad.addEventListener("click", function(event) {
  var target = event.target;
  if (target.id in numberDictionary) {
    currentNumber += numberDictionary[target.id].toString();
    calcScreen.textContent = currentNumber;

  }
  else if (target.id === "ac"){
    currentNumber = "";
    calcScreen.textContent = "";
  }
});
