import  { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "../ui/side-bar";
import { renderAccounts } from "../ui/render-accounts";
import { renderArgs } from "../ui/render-args";
import { idlJson } from "../../../idl";
import { PublicKey } from "@solana/web3.js";
import {
  IdlField,
  IdlInstruction,
  IdlInstructionAccount,
} from "@/lib/idl-types";
import Output from "./Output";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background p-4">
      <aside className="hidden md:flex w-64 border-r">
        <ScrollArea className="flex-grow">
          <Sidebar />
        </ScrollArea>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">{idlJson.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Version: {idlJson.version}
              </p>
            </CardContent>
          </Card>
          <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
          <div className="space-y-6">
            {idlJson.instructions.map((instruction, index) => (
              <InstructionComponent
                key={index}
                index={index}
                instruction={instruction as unknown as IdlInstruction}
              />
            ))}
          </div>
        </div>
      </main>
      <aside className="hidden md:flex w-96 border-l">
        <ScrollArea className="flex-grow">
          <Output instructionData={"accounts"} onTest={async () => {
    // Implement your testing logic here
    // This should return a promise that resolves with the test result
    // or rejects with an error
  }
}/>
        </ScrollArea>
      </aside>
    </div>
  );
}

function InstructionComponent({
  index,
  instruction,
}: {
  index: number;
  instruction: IdlInstruction;
}) {
  const initial_acc_meta: Record<number, ExtendedAccountMeta> = {};
  const initial_args: Record<number, IdlField> = {};

  instruction.accounts.forEach((acc, index) => {
    initial_acc_meta[index] = {
      name: acc.name,
      address: acc.address,
      docs: acc.docs,
      optional: acc.optional,
      pda: acc.pda,
      relations: acc.relations,
      signer: (acc as AccMeta).isSigner ? true : false,
      writable: (acc as AccMeta).isMut ? true : false,
    };
  });

  instruction.args.forEach((arg, index) => {
    initial_args[index] = {
      name: arg.name,
      type: arg.type,
      docs: arg.docs,
    };
  });

  const [accounts, setAccounts] = useState<Record<number, ExtendedAccountMeta>>(
    initial_acc_meta
  );

  const handleAccountChange = (index: number, pubkey: PublicKey) => {
    setAccounts((prev) => ({
      ...prev,
      [index]: { ...prev[index], address: pubkey.toBase58() },
    }));
  };

  const handleArgChange = (name: string, input: any) => {
    // serialize input to instruction data
  };

  const onSubmit = () => {
    // console.log(accounts)
  };

  return (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{instruction.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="args">Arguments</TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            {renderAccounts(accounts, handleAccountChange)}
          </TabsContent>
          <TabsContent value="args">
            {renderArgs(initial_args, handleArgChange)}
          </TabsContent>
        </Tabs>
        <Button className="mt-4" onClick={() => onSubmit()}>
          Build Instruction
        </Button>
      </CardContent>
    </Card>
  );
}

export type AccMeta = {
  isMut?: boolean;
  isSigner?: boolean;
};

export type ExtendedAccountMeta = IdlInstructionAccount;