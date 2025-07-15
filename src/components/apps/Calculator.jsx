import { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        setResult(eval(input).toString());
      } catch {
        setResult('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-64 bg-white bg-opacity-10 backdrop-blur rounded-xl shadow-lg border border-white border-opacity-20 p-4">
        <div className="mb-2 text-right text-white text-lg min-h-[2.5rem] break-all">{input || '0'}</div>
        <div className="mb-4 text-right text-blue-300 text-xl min-h-[2.5rem]">{result}</div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              className="bg-white bg-opacity-20 hover:bg-blue-400 hover:bg-opacity-30 text-white font-semibold py-2 rounded transition-all text-lg"
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
