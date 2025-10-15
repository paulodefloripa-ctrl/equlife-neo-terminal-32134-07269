import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  const handleNumber = (num: string) => {
    setDisplay((prev) => prev === '0' ? num : prev + num);
  };

  const handleOperation = (op: string) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result = 0;
      
      switch (operation) {
        case '+': result = previousValue + current; break;
        case '-': result = previousValue - current; break;
        case '*': result = previousValue * current; break;
        case '/': result = previousValue / current; break;
      }
      
      setDisplay(String(result));
      setOperation(null);
      setPreviousValue(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation(null);
    setPreviousValue(null);
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle className="text-primary">🧮 Calculadora</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-card p-4 rounded border border-border">
            <div className="text-right text-2xl font-mono">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {buttons.flat().map((btn) => (
              <Button
                key={btn}
                variant="outline"
                onClick={() => {
                  if (btn === '=') handleEquals();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
                  else handleNumber(btn);
                }}
                className="h-12 font-mono"
              >
                {btn}
              </Button>
            ))}
          </div>

          <Button onClick={handleClear} variant="destructive" className="w-full">
            Clear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
