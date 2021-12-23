import React, { useState, useContext } from "react";
import { HistoryContext } from "../../context/HistoryContext";
import "./Calculator.css";

import SimpleAccordion from "../SimpleAccordion/SimpleAccordion";
import Display from "../Display/Display";
import Buttons from "../Buttons/Buttons";

function Calculator() {
  const { addToHistory } = useContext(HistoryContext);
  const [numbersDisplay, setNumbersDisplay] = useState("");
  const [numberDisplay2, setNumberDisplay2] = useState("");
  const [operatorClick, setOperatorClick] = useState("");
  const [result, setResult] = useState("");

  const [operator, setOperator] = useState(false);
  const [operator2, setOperator2] = useState(true);
  const [primaryClick, setPrimaryClick] = useState(false);
  const [primaryCalculate, setPrimaryCalculate] = useState(false);

  const keyEnabledArray = Array(222).fill(true);
  document.onkeydown = function (e) {
    if (keyEnabledArray[e.key]) {
      keyEnabledArray[e.key] = false;
    }
  };

  document.onkeyup = function (e) {
    keyEnabledArray[e.key] = true;
    handleCalculation(e.key);
  };

  const [calculate, setCalculate] = useState({
    primaryNum: "",
    operator: "",
    secondNum: "",
    finalNum: "",
  });

  const getValues = (num) => {
    if (operator === false) {
      if (primaryCalculate) {
        clearNumbers(num, true);
        setPrimaryCalculate(false);
      }
      if (num === ".") {
        calculate.primaryNum += num;
        setNumbersDisplay(numbersDisplay + num);
        calculate.finalNum = "";
      } else if (num === "backspace" || num === "Backspace") {
        setCalculate({
          primaryNum: calculate.primaryNum.slice(0, -1),
          operator: "",
          secondNum: "",
        });
        setNumbersDisplay(numbersDisplay);
      } else {
        calculate.primaryNum += num;
        setNumbersDisplay(numbersDisplay + num);
        calculate.finalNum = "";
      }
    } else {
      if (num === ".") {
        calculate.secondNum += num;
        setNumberDisplay2(numberDisplay2 + num);
      } else if (num === "backspace") {
        setCalculate({
          primaryNum: calculate.primaryNum,
          operator: calculate.operator,
          secondNum: calculate.secondNum.slice(0, -1),
        });
      } else {
        calculate.secondNum += num;
        setNumberDisplay2(numberDisplay2 + num);
      }
    }
  };

  const getOperator = (num) => {
    calculate["operator"] = num;
    setOperatorClick(num);
    setOperator(true);
    setOperator2(false);

    if (primaryClick) {
      setCalculate({
        primaryNum: calculate.finalNum,
        operator: calculate.operator,
        secondNum: "",
      });
      setNumbersDisplay(calculate.finalNum);
      setNumberDisplay2("");
    }

    setPrimaryClick(true);
  };

  const handleOperators = (num) => {
    const operators = {
      "+": (num1, num2) => parseFloat(num1) + parseFloat(num2),
      "-": (num1, num2) => parseFloat(num1) - parseFloat(num2),
      "/": (num1, num2) => parseFloat(num1) / parseFloat(num2),
      "%": (num1, num2) => parseFloat(num1) % parseFloat(num2),
      "*": (num1, num2) => parseFloat(num1) * parseFloat(num2),
    };

    let result = operators[calculate["operator"]](
      calculate.primaryNum,
      calculate.secondNum
    );

    calculate.finalNum = result;
    setResult(result);
    setOperator2(true);
    setOperator(false);
    setPrimaryCalculate(true);

    addToHistory(
      `${calculate.primaryNum}${calculate.operator}${calculate.secondNum} = ${calculate.finalNum}`
    );
  };

  const clearNumbers = (num, isCalculate) => {
    if (isCalculate) {
      setCalculate({
        primaryNum: num,
        operator: calculate.operator,
        secondNum: "",
      });

      setPrimaryClick(false);
      setResult("");
      setNumbersDisplay("");
      setNumberDisplay2("");
      setOperatorClick("");
    } else {
      setCalculate({
        primaryNum: "",
        operator: calculate.operator,
        secondNum: "",
      });

      setPrimaryClick(false);
      setResult("");
      setNumbersDisplay("");
      setNumberDisplay2("");
      setOperatorClick("");
    }
  };

  const handleError = () => {
    setResult("Error");
  };

  const handleCalculation = (num) => {
    if (!isNaN(num) || num === "." || num === "backspace") {
      getValues(num);
    } else if (
      (num === "+" ||
        num === "-" ||
        num === "/" ||
        num === "*" ||
        num === "%") & operator2
    ) {
      getOperator(num);
    } else if (num === "C") {
      clearNumbers();
    } else if (num === "=" || num === "Enter") {
      if (calculate.secondNum !== "") {
        handleOperators(num);
      } else {
        handleError();
      }
    }
  };

  return (
    <>
      <section className="history-tool">
        <SimpleAccordion />
      </section>

      <main className="calculator">
        <Display
          result={result}
          number1={calculate.primaryNum}
          number2={calculate.secondNum}
          operator={operatorClick}
        />
        <Buttons handleCalculation={handleCalculation} />
      </main>
    </>
  );
}

export default Calculator;