import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { idlJson } from "../../../idl"
import { ModeToggle } from "../ui/mode-toggle"
import { renderCodeExample } from "../ui/render-code-example"
import { Sidebar } from "../ui/side-bar"
import { renderAccounts } from "../ui/render-accounts"
import { renderArgs } from "../ui/render-args"

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col w-[100%] items-center justify-center">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <ModeToggle />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col flex-1">
                            <Sidebar className="px-2 py-6" />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="ml-auto flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle Theme"
                    >
                    </Button>
                </div>
            </header>
            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden md:flex w-[300px] flex-col">
                    <ScrollArea className="flex-1">
                        <Sidebar />
                    </ScrollArea>
                </aside>
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-3xl space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{idlJson.name}</h1>
                            <p className="text-xl text-muted-foreground">Version: {idlJson.version}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                            {idlJson.instructions.map((instruction, index) => (
                                <div key={index} className="mb-8">
                                    <h3 className="text-xl font-semibold mb-2">{instruction.name}</h3>
                                    <Tabs defaultValue="accounts" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="accounts">Accounts</TabsTrigger>
                                            <TabsTrigger value="args">Arguments</TabsTrigger>
                                            <TabsTrigger value="example">Example</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="accounts">
                                            {renderAccounts(instruction.accounts)}
                                        </TabsContent>
                                        <TabsContent value="args">
                                            {renderArgs(instruction.args)}
                                        </TabsContent>
                                        <TabsContent value="example">
                                            {renderCodeExample(instruction)}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}