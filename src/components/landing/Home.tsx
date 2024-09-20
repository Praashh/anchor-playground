import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { idlJson } from "../../../idl"
import { renderCodeExample } from "../ui/render-code-example"
import { Sidebar } from "../ui/side-bar"
import { renderAccounts } from "../ui/render-accounts"
import { renderArgs } from "../ui/render-args"
import { Button } from "../ui/button"

export default function Home() {
    const handleAccountChange = (index: number, value: string) => {}

    const handleArgChange = (name: string, value: any) => {}

    const onSubmit = () => {}
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
                                <div key={index} className="mb-8">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {instruction.name}
                                    </h3>
                                    <Tabs
                                        defaultValue="accounts"
                                        className="w-full"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="accounts">
                                                Accounts
                                            </TabsTrigger>
                                            <TabsTrigger value="args">
                                                Arguments
                                            </TabsTrigger>
                                            <TabsTrigger value="example">
                                                Example
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="accounts">
                                            {renderAccounts(
                                                instruction.accounts,
                                                handleAccountChange
                                            )}
                                        </TabsContent>
                                        <TabsContent value="args">
                                            {renderArgs(
                                                instruction.args,
                                                handleArgChange
                                            )}
                                        </TabsContent>
                                        <TabsContent value="example">
                                            {renderCodeExample(instruction)}
                                        </TabsContent>
                                    </Tabs>
                                    <Button className="mt-3">
                                        Build Instruction
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
