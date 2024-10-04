import React, { useState, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface DynamicInputsProps {
  initialInputs?: string[];
}

const DynamicInputs: React.FC<DynamicInputsProps> = ({ initialInputs = [''] }) => {
  const [inputs, setInputs] = useState<string[]>(initialInputs);

  const addInput = (): void => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index: number, value: string): void => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className="space-y-2">
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            placeholder="Enter Secret Key"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
          />
          {index === inputs.length - 1 && (
            <Button onClick={addInput} variant="outline" size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;