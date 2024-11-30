import { useState } from "react";
import "./App.css";
import { NumberWalkthroughDisplay, Validation } from "./components";

function App() {
  const [numbersToRemember, setNumbersToRemember] = useState<number[]>([]);
  const [testing, setTesting] = useState(false);
  const [validation, setValidation] = useState<boolean | null>(null);

  const n = 10;

  return (
    <>
      <div className="outer-wrapper">
        <button
          className="mb-1"
          onClick={() => {
            setValidation(null);
            setTesting(false);
            const newNumbers: number[] = [];
            for (let i = 0; i < n; i++) {
              newNumbers.push(generateRandomNumber(newNumbers, 0, 100));
            }
            setNumbersToRemember(newNumbers);
          }}
        >
          Generate new random numbers
        </button>
        {!testing && validation === null && (
          <NumberWalkthroughDisplay
            numbersToRemember={numbersToRemember}
            onStartTesting={() => {
              setTesting(true);
            }}
          />
        )}
        {testing && <Validation numbers={numbersToRemember} />}
        {/* For now this is not used */}
        {validation !== null && (
          <div className="validation">
            {validation ? "Correct 🎉" : "Incorrect!"}
          </div>
        )}
      </div>
      <div className="attributions">
        <a href="https://www.vecteezy.com/free-vector/lottery-machine">
          Lottery Machine Vectors by Vecteezy
        </a>
      </div>
    </>
  );
}

const generateRandomNumber = (
  prevNumbers: number[],
  from: number,
  to: number
): number => {
  const newNumber = Math.trunc(Math.random() * (to - from) + from);
  if (prevNumbers.includes(newNumber)) {
    return generateRandomNumber(prevNumbers, from, to);
  }
  return newNumber;
};

export default App;
