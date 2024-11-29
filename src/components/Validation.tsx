import { useRef, useState } from "react";

interface IProps {
  numbers: number[];
}

const checkNumber = (trueValue: number, inputValue: number) => {
  return trueValue.toFixed(0) === inputValue.toFixed(0);
};

export const Validation = ({ numbers }: IProps) => {
  const numberRefs = useRef<HTMLInputElement[]>([]);
  const checkAnswersRef = useRef<HTMLButtonElement>(null);
  const [validatedNumbers, setValidatedNumbers] = useState<boolean[]>([]);

  const checkAnswers = () => {
    if (numberRefs.current.length !== numbers.length) {
      throw new Error(
        "Number of input fields does not match the number of numbers"
      );
    }
    if (numberRefs.current.some((el) => !el)) {
      throw new Error("Not all input refs are defined");
    }

    const newValidatedNumbers = numbers.map((number, index) => {
      const input = parseInt(numberRefs.current[index].value);
      return checkNumber(number, input);
    });

    // onValidation(newValidatedNumbers.every((val) => val));
    setValidatedNumbers(newValidatedNumbers);
  };

  const [allNumbersHaveInput, setAllNumbersHaveInput] = useState(false);

  const checkInputs = () => {
    if (numberRefs.current.length !== numbers.length) {
      throw new Error(
        "Number of input fields does not match the number of numbers"
      );
    }
    if (numberRefs.current.some((el) => !el)) {
      throw new Error("Not all input refs are defined");
    }

    const allNumbersHaveInput = numberRefs.current.every((el) => el.value);
    setAllNumbersHaveInput(allNumbersHaveInput);
  };

  const getInputClass = (index: number) => {
    if (validatedNumbers[index] === undefined) {
      return undefined;
    }
    return validatedNumbers[index] ? "correct" : "wrong";
  };

  return (
    <div className="validation">
      <div className="numbers-input">
        {numbers.map((_, index) => (
          <input
            key={index}
            className={getInputClass(index)}
            ref={(el) => {
              if (!el) {
                return;
              }
              numberRefs.current[index] = el;
            }}
            type="number"
            min={0}
            max={100}
            onChange={(e) => {
              if (e.target.valueAsNumber > 9 || e.target.value.length > 1) {
                if (index + 1 < numbers.length) {
                  numberRefs.current[index + 1].focus();
                } else {
                  checkAnswersRef.current?.focus();
                }
              }
              checkInputs();
            }}
          />
        ))}
      </div>
      <button
        ref={checkAnswersRef}
        disabled={!allNumbersHaveInput}
        onClick={checkAnswers}
      >
        Check answer
      </button>
    </div>
  );
};
