
import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CalculatorDisplay from '@/components/CalculatorDisplay';
import CalculatorButtons from '@/components/CalculatorButtons';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let result = 0;

      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          if (inputValue === 0) {
            toast({
              title: "Error",
              description: "Division by zero is not allowed",
              variant: "destructive"
            });
          }
          break;
        case '^':
          result = Math.pow(currentValue, inputValue);
          break;
        default:
          return;
      }

      const calculation = `${currentValue} ${operator} ${inputValue} = ${result}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
      
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (operator && previousValue !== null) {
      performOperation('=');
      setOperator(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  };

  const performFunction = (func: string) => {
    const inputValue = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sin':
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case '√':
        result = Math.sqrt(inputValue);
        break;
      case '!':
        result = factorial(Math.floor(inputValue));
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    const calculation = `${func}(${inputValue}) = ${result}`;
    setHistory(prev => [calculation, ...prev.slice(0, 9)]);
    
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const handleMemory = (operation: string) => {
    const inputValue = parseFloat(display);
    
    switch (operation) {
      case 'MC':
        setMemory(0);
        toast({ title: "Memory cleared" });
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + inputValue);
        toast({ title: "Added to memory" });
        break;
      case 'M-':
        setMemory(memory - inputValue);
        toast({ title: "Subtracted from memory" });
        break;
    }
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <Calculator className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white animate-pulse">Loading SciCalc...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center py-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-white mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SciCalc
            </h1>
          </div>
          <p className="text-xl text-gray-300">Your Smart Scientific Calculator</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl animate-scale-in">
              <CalculatorDisplay 
                display={display} 
                operator={operator}
                memory={memory}
              />
              <CalculatorButtons
                onNumber={inputNumber}
                onOperator={performOperation}
                onFunction={performFunction}
                onMemory={handleMemory}
                onEquals={calculate}
                onClear={clear}
                onDot={inputDot}
                onBackspace={backspace}
              />
            </Card>
          </div>

          {/* History Panel */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">History</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setHistory([])}
                  className="text-white hover:bg-white/20"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-400 text-sm">No calculations yet</p>
                ) : (
                  history.map((calc, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-200 p-2 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      {calc}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Basic arithmetic operations</li>
                <li>• Trigonometric functions</li>
                <li>• Logarithmic functions</li>
                <li>• Memory operations</li>
                <li>• Calculation history</li>
                <li>• Responsive design</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 mt-12 animate-fade-in">
          <p className="text-gray-400">
            Built with ❤️ using Lovable | Modern Scientific Calculator
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
