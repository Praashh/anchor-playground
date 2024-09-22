import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface OutputProps {
  instructionData: any; // Replace 'any' with your actual instruction data type
  onTest: () => Promise<any>; // Function to test the instruction
}

export const Output: React.FC<OutputProps> = ({ instructionData, onTest }) => {
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('instruction');

  const handleTest = async () => {
    setIsLoading(true);
    try {
      const result = await onTest();
      setOutput(JSON.stringify(result, null, 2));
      setActiveTab('output');
    } catch (error) {
        // @ts-ignore
      setOutput(`Error: ${error.message}`);
      setActiveTab('output');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6 p-2 h-[60vh]">
      <CardHeader>
        <CardTitle className='text-lg md:text-2xl text-center'>IDL Test Output</CardTitle>
      </CardHeader>
            <div className='h-96 border '>

            </div>
            <Button className='w-full mt-5' onClick={handleTest}>Test</Button>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default Output;