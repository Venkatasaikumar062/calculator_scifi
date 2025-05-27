
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pi } from 'lucide-react';

interface CalculatorButtonsProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onFunction: (func: string) => void;
  onMemory: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onDot: () => void;
  onBackspace: () => void;
}

const CalculatorButtons = ({
  onNumber,
  onOperator,
  onFunction,
  onMemory,
  onEquals,
  onClear,
  onDot,
  onBackspace
}: CalculatorButtonsProps) => {
  const buttonClass = "h-14 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95";
  const numberButtonClass = `${buttonClass} bg-gray-700/50 hover:bg-gray-600/70 text-white border border-gray-600/50`;
  const operatorButtonClass = `${buttonClass} bg-blue-600/70 hover:bg-blue-500/80 text-white border border-blue-500/50`;
  const functionButtonClass = `${buttonClass} bg-purple-600/70 hover:bg-purple-500/80 text-white border border-purple-500/50`;
  const specialButtonClass = `${buttonClass} bg-orange-600/70 hover:bg-orange-500/80 text-white border border-orange-500/50`;

  return (
    <div className="grid grid-cols-6 gap-3">
      {/* Row 1 - Memory and Clear */}
      <Button className={functionButtonClass} onClick={() => onMemory('MC')}>
        MC
      </Button>
      <Button className={functionButtonClass} onClick={() => onMemory('MR')}>
        MR
      </Button>
      <Button className={functionButtonClass} onClick={() => onMemory('M+')}>
        M+
      </Button>
      <Button className={functionButtonClass} onClick={() => onMemory('M-')}>
        M-
      </Button>
      <Button className={specialButtonClass} onClick={onClear}>
        AC
      </Button>
      <Button className={specialButtonClass} onClick={onBackspace}>
        <ArrowLeft className="w-5 h-5" />
      </Button>

      {/* Row 2 - Scientific Functions */}
      <Button className={functionButtonClass} onClick={() => onFunction('sin')}>
        sin
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('cos')}>
        cos
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('tan')}>
        tan
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('log')}>
        log
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('ln')}>
        ln
      </Button>
      <Button className={operatorButtonClass} onClick={() => onOperator('^')}>
        x^y
      </Button>

      {/* Row 3 - More Functions */}
      <Button className={functionButtonClass} onClick={() => onFunction('√')}>
        √
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('!')}>
        x!
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('π')}>
        <Pi className="w-5 h-5" />
      </Button>
      <Button className={functionButtonClass} onClick={() => onFunction('e')}>
        e
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('(')}>
        (
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber(')')}>
        )
      </Button>

      {/* Row 4 - Numbers and Operators */}
      <Button className={numberButtonClass} onClick={() => onNumber('7')}>
        7
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('8')}>
        8
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('9')}>
        9
      </Button>
      <Button className={operatorButtonClass} onClick={() => onOperator('÷')}>
        ÷
      </Button>
      <Button className={operatorButtonClass} onClick={() => onOperator('×')}>
        ×
      </Button>
      <Button className={operatorButtonClass} onClick={() => onOperator('-')}>
        -
      </Button>

      {/* Row 5 */}
      <Button className={numberButtonClass} onClick={() => onNumber('4')}>
        4
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('5')}>
        5
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('6')}>
        6
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('1')}>
        1
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('2')}>
        2
      </Button>
      <Button className={numberButtonClass} onClick={() => onNumber('3')}>
        3
      </Button>

      {/* Row 6 */}
      <Button className={numberButtonClass} onClick={() => onNumber('0')} colSpan={2}>
        0
      </Button>
      <Button className={numberButtonClass} onClick={onDot}>
        .
      </Button>
      <Button className={operatorButtonClass} onClick={() => onOperator('+')}>
        +
      </Button>
      <Button 
        className={`${buttonClass} bg-green-600/70 hover:bg-green-500/80 text-white border border-green-500/50 col-span-2`} 
        onClick={onEquals}
      >
        =
      </Button>
    </div>
  );
};

export default CalculatorButtons;
