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
    minus: "-",
  }
//we need to know if we have a number in memory, and if so, we need to perform the operation with the stored number in mind
const memSave = () => {

  if (!isNaN(parseFloat(currentNumber)))
  {
    if (mem === null){
      mem = parseFloat(currentNumber);

    }else if(lastOperator !== ""){
  
      if (lastOperator === "divide" && currentNumber === "0")
        {
          mem = "bruh";
        }
      else
        {
          mem = operation(lastOperator,mem,parseFloat(currentNumber));
        }
    }
  }
  
}
const formatAnswer = (ans) => {

  const absAns = Math.abs(ans); // Get the absolute value for checks

  // Determine when to use exponential notation
  if (absAns >= 1e14 || (absAns > 0 && absAns < 1e-14)) {
    // Use exponential notation with up to 10 digits for mantissa
    ans = ans.toExponential(10);
  }

  if (ans.toString().length > 10){

    if (ans.toString().includes("e")){
      let [int,decimal] = ans.toString().split(".");
      let [middle,exp] = decimal.split("e");
      let remainingLength = 10 - int.length - exp.length - 2;
      middle = middle.slice(0,remainingLength);
      ans = int + "." + middle + "e" + exp;
    }
    else if (ans.toString().includes(".")){
      
      let [int,decimal] = ans.toString().split(".");
      let remainingLength = 10 - int.length - 1;
      decimal = decimal.slice(0,remainingLength);
      ans = int + "." + decimal;
    }
  }
  return ans.toString();
  
}
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
  }
   // we display what is in memory after consecutive operations
   if (opCount > 1){
    if (mem !== null){
      calcScreen.textContent = formatAnswer(mem);
      }
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
  
  memSave();

  if (mem === "bruh"){
    calcScreen.textContent = "bruh"
  }else{
    if (mem !== null){
      calcScreen.textContent = formatAnswer(mem);
    }
  }
  currentNumber = "";
  lastOperator = "";
  opCount = 0;  
}
const typeChar = (char) => {

  if (currentNumber.length < 10){

    if (char === "point"){
      if (!currentNumber.includes(".")){

        if (currentNumber === "")
          {
            currentNumber += "0";
          }
        currentNumber += numberDictionary[char].toString();
        calcScreen.textContent = currentNumber;
      }
    }else if(char === "minus"){
      
      if (!currentNumber.includes("-") && currentNumber === "")
        {
          currentNumber += numberDictionary[char].toString();
          calcScreen.textContent = currentNumber;
      }else{
        calcScreen.textContent = currentNumber;
        operator(char);
      }
    }
    else
      {
        currentNumber += numberDictionary[char].toString();
        calcScreen.textContent = currentNumber;
      }
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
const percentage = () => {
  if (currentNumber !== ""){
    currentNumber = (parseFloat(currentNumber)/100).toString();
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
    console.log("entering operator case");
    operator(target.id);
  }
  else if(target.id === "equals"){
    equals();
  }
  else if(target.id === "delete"){
    deleteChar();
  }
  else if(target.id === "percent"){
    percentage();
  }
})
