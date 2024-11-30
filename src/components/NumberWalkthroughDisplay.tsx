import { useState } from "react";

interface IProps {
  numbersToRemember: number[];
  onStartTesting: () => void;
}
export const NumberWalkthroughDisplay = ({
  numbersToRemember,
  onStartTesting,
}: IProps) => {
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const remainingNumbers = numbersToRemember.length - currentNumberIndex - 1;
  return (
    <div className="number-to-remember-wrapper">
      <span className="font-large">
        {numbersToRemember[currentNumberIndex]}
      </span>
      {remainingNumbers > 0 ? (
        <button
          className="mb-1"
          onClick={() => {
            if (currentNumberIndex < numbersToRemember.length - 1) {
              setCurrentNumberIndex(currentNumberIndex + 1);
            }
          }}
        >
          Next
        </button>
      ) : (
        remainingNumbers === 0 && (
          <button onClick={onStartTesting}>Start testing</button>
        )
      )}
      {remainingNumbers !== -1 && `Remaining numbers: ${remainingNumbers}`}
    </div>
  );
};
