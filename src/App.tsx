import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const remainingNumbers = numbers.length - currentNumberIndex - 1;
  const inputRef = useRef<HTMLInputElement>(null);
  const [validation, setValidation] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const n = 10;

  return (
    <div className="outer-wrapper">
      <button
        className="mb-1"
        onClick={() => {
          setCurrentNumberIndex(0);
          setValidation(null);
          setTesting(false);
          const newNumbers: number[] = [];
          for (let i = 0; i < n; i++) {
            newNumbers.push(generateRandomNumber(newNumbers, 0, 100));
          }
          setNumbers(newNumbers);
        }}
      >
        Generate new random numbers
      </button>
      {!testing && (
        <div className="number-to-remember-wrapper">
          <span className="font-large">
            {numbers[currentNumberIndex]?.toFixed(0)}
          </span>
          {remainingNumbers > 0 ? (
            <button
              className="mb-1"
              onClick={() => {
                if (currentNumberIndex < numbers.length - 1) {
                  setCurrentNumberIndex(currentNumberIndex + 1);
                }
              }}
            >
              Next
            </button>
          ) : (
            remainingNumbers === 0 && (
              <button
                onClick={() => {
                  setTesting(true);
                }}
              >
                Start testing
              </button>
            )
          )}
          {remainingNumbers !== -1 && `Remaining numbers: ${remainingNumbers}`}
        </div>
      )}
      {testing && (
        <div className="validation">
          {validation ? (
            validation
          ) : (
            <>
              <input ref={inputRef} />
              <button
                onClick={() => {
                  if (!inputRef.current) {
                    throw new Error("Input ref is not defined");
                  }
                  const inputValues = inputRef.current.value
                    .split(" ")
                    .map(Number);
                  let correct = true;
                  for (let i = 0; i < numbers.length; i++) {
                    if (numbers[i].toFixed(0) !== inputValues[i].toFixed(0)) {
                      correct = false;
                      break;
                    }
                  }
                  if (correct) {
                    setValidation("Correct 🎉");
                  } else {
                    setValidation("Incorrect!");
                  }
                }}
              >
                Check answer
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const generateRandomNumber = (
  prevNumbers: number[],
  from: number,
  to: number
): number => {
  const newNumber = Math.random() * (to - from) + from;
  if (prevNumbers.includes(newNumber)) {
    return generateRandomNumber(prevNumbers, from, to);
  }
  return newNumber;
};

export default App;

