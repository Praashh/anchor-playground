import { idlJson } from "../../../idl/index";
import { Button } from "./button";
import { Separator } from "./separator";

export const Sidebar = ({ className }: any) => (
    <div className={className}>
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Instructions
            </h2>
            <div className="space-y-1">
                {idlJson.instructions.map((instruction, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start font-normal"
                    >
                        {instruction.name}
                    </Button>
                ))}
            </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Accounts
            </h2>
            <div className="space-y-1">
                {idlJson.accounts.map((account, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start font-normal"
                    >
                        {account.name}
                    </Button>
                ))}
            </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Types
            </h2>
            <div className="space-y-1">
                {idlJson.types.map((type, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start font-normal"
                    >
                        {type.name}
                    </Button>
                ))}
            </div>
        </div>
    </div>
)
