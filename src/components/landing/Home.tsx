import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { idlJson } from "../../../idl"
import { Sidebar } from "../ui/side-bar"
import { renderAccounts } from "../ui/render-accounts"
import { renderArgs } from "../ui/render-args"
import { Button } from "../ui/button"
import { useState } from "react"
import { PublicKey } from "@solana/web3.js"
import {
    IdlField,
    IdlInstruction,
    IdlInstructionAccount,
} from "@/lib/idl-types"

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col w-[100%] items-center justify-center">
            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden md:flex w-[300px] flex-col">
                    <ScrollArea className="flex-1">
                        <Sidebar />
                    </ScrollArea>
                </aside>
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-3xl space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">
                                {idlJson.name}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Version: {idlJson.version}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">
                                Instructions
                            </h2>
                            {idlJson.instructions.map((instruction, index) => (
                                <InstructionComponent
                                    index={index}
                                    instruction={
                                        instruction as unknown as IdlInstruction
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function InstructionComponent({
    index,
    instruction,
}: {
    index: number
    instruction: IdlInstruction
}) {
    const initial_acc_meta: Record<number, ExtendedAccountMeta> = {}
    const initial_args: Record<number, IdlField> = {}
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
        }
    })
    instruction.args.forEach((arg, index) => {
        initial_args[index] = {
            name: arg.name,
            type: arg.type,
            docs: arg.docs,
        }
    })
    const [accounts, setAccounts] =
        useState<Record<number, ExtendedAccountMeta>>(initial_acc_meta)
    const handleAccountChange = (index: number, pubkey: PublicKey) => {
        setAccounts((prev) => ({
            ...prev,
            [index]: { ...prev[index], address: pubkey.toBase58() },
        }))
    }

    const handleArgChange = (name: string, input: any) => {
        // serialize input to instruction data
    }

    const onSubmit = () => {
        // console.log(accounts)
    }

    return (
        <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold mb-2">{instruction.name}</h3>
            <Tabs defaultValue="accounts" className="w-full">
                <TabsList>
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
            <Button className="mt-3" onClick={() => onSubmit()}>
                Build Instruction
            </Button>
        </div>
    )
}
export type AccMeta = {
    isMut?: boolean
    isSigner?: boolean
}

export type ExtendedAccountMeta = IdlInstructionAccount
