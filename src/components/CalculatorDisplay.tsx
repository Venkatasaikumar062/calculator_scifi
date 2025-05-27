
import React from 'react';
import { Card } from '@/components/ui/card';

interface CalculatorDisplayProps {
  display: string;
  operator: string | null;
  memory: number;
}

const CalculatorDisplay = ({ display, operator, memory }: CalculatorDisplayProps) => {
  return (
    <Card className="p-6 mb-6 bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
      <div className="text-right">
        {/* Memory indicator */}
        <div className="h-4 mb-2">
          {memory !== 0 && (
            <span className="text-xs text-blue-400 animate-pulse">M</span>
          )}
        </div>
        
        {/* Operation indicator */}
        <div className="h-6 mb-2">
          {operator && (
            <span className="text-sm text-gray-400">
              {operator}
            </span>
          )}
        </div>
        
        {/* Main display */}
        <div className="text-4xl md:text-5xl font-mono text-white font-light tracking-wider break-all min-h-[3rem] flex items-center justify-end">
          <span className="animate-fade-in">
            {display}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CalculatorDisplay;
