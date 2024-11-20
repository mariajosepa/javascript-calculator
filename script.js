keypad = document.querySelector(".calculator-btns");
calcScreen = document.querySelector("#calculator-screen");
let currentNumber = "";
let lastOperator = "";
let opCount = 0;
let mem = null;

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
    nine: 9,
    point: ".",
  };
//we need to know if we have a number in memory, and if so, we need to perform the operation with the stored number in mind
const memSave = () => {

  if (mem === null){
    mem = parseFloat(currentNumber);
  }else{
    mem = operation(lastOperator,mem,parseFloat(currentNumber));
  }
}

const formatAnswer = (ans) => {

  const absAns = Math.abs(ans); // Get the absolute value for checks

  // Determine when to use exponential notation
  if (absAns >= 1e14 || (absAns > 0 && absAns < 1e-14)) {
    // Use exponential notation with up to 10 digits for mantissa
    ans = ans.toExponential(9);
  } 
  // Ensure the result doesn't exceed 15 characters
  if (ans.toString().length > 14) {
    ans = ans.toString().slice(0, 14);
  }

  return ans.toString();
};

const operation = (op,num1,num2) => {
  let ans = null;
  switch (op) {
    case "addition":
      ans = num1 + num2;
      break;
    case "minus":
      ans = num1 - num2;
      break;
    case "multiply":
      ans = num1 * num2;
      break;
    case "divide":
      ans = num1 / num2;
      break;
  }
  return ans;
}
const operator = (op) => {

  opCount += 1;

  if (currentNumber !== ""){
    memSave();
    currentNumber="";
    console.log(mem);
  }
   // we display what is in memory after consecutive operations
   if (opCount > 1){
    calcScreen.textContent = formatAnswer(mem);
  }

  lastOperator = op;
}
const clear = () => {
  currentNumber = "";
  lastOperator = "";
  opCount = 0;
  calcScreen.textContent = "0";
  mem = null;
}
const equals = () => {
  if (currentNumber !== ""){
    memSave();
  }
  //debemos formatear la respuesta
  calcScreen.textContent = formatAnswer(mem);
  currentNumber = "";
  lastOperator = "";
  opCount = 0;
  
}
const typeChar = (char) => {

  if (currentNumber.length < 14){

    if (char === "point"){
      if (!currentNumber.includes(".")){

        if (currentNumber === ""){
          currentNumber += "0";
        }
        currentNumber += numberDictionary[char].toString();
      }
    }else{
      currentNumber += numberDictionary[char].toString();
    }

    calcScreen.textContent = currentNumber;
  }
}

const deleteChar = () => {

  if (currentNumber.length === 1){
    currentNumber = "";
    calcScreen.textContent = "0";
  }

  else if (currentNumber !== ""){
    currentNumber = currentNumber.slice(0,-1);
    calcScreen.textContent = currentNumber;
  }
  
}

keypad.addEventListener("click", function(event) {
  var target = event.target;

  if (target.id in numberDictionary) {
    typeChar(target.id);
  }
  else if (target.id === "ac"){
    clear();
  }
  else if(target.classList.contains("operator")){
    operator(target.id);
  }
  else if(target.id === "equals"){
    equals();
  }
  else if(target.id === "delete"){
    deleteChar();
  }
});
