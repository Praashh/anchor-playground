import { Link } from "react-router-dom";
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { ModeToggle } from "../ui/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sidebar } from "../ui/side-bar";


const MainNav: React.FC = () => {
    return (
        <nav className="shadow-md dark:shadow-[#100f0f] dark:shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to={"/"} className="dark:text-white font-bold text-xl text-black">
                            Anchor Playground
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <ModeToggle />
                        <WalletModalProvider>
                            <div className="flex justify-between gap-2">
                            <WalletMultiButton style={{ 
                                background: 'transparent', 
                                border: '1px solid #6e6c69',  
                                }} 
                            />
                            </div>
                        </WalletModalProvider>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <header className="px-4 lg:px-6 h-14 flex items-center">

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <nav className="flex flex-col flex-1">
                                        <div className=" items-center gap-6">
                                            <WalletModalProvider>
                                                <div className="flex justify-between flex-col gap-2">
                                                <WalletMultiButton style={{ 
                                                    background: 'transparent', 
                                                    border: '1px solid #6e6c69',  
                                                    }} 
                                                />
                                                </div>
                                            </WalletModalProvider>
                                        </div>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;
