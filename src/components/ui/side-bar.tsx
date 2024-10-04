import { idlJson } from "../../../idl/index";
import { AccordionWrapper } from "./AccordionWrapper";
import { Button } from "./button";
import { Separator } from "./separator";

export const Sidebar = ({ className }: any) => (
    <div className={className}>
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Instructions
            </h2>
            <div className="ml-3">
                {idlJson.instructions.map((instruction, index) => (
                    <div
                        key={index}
                        className="w-full justify-start font-normal"
                    >
                        <AccordionWrapper title={instruction.name} description={["test1", 'test2', "test3"]}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Accounts
            </h2>
            <div className="ml-3">
                {idlJson.accounts.map((account, index) => (
                    <div
                        key={index}
                        className="w-full justify-start font-normal"
                    >
                        <AccordionWrapper title={account.name} description={["test1", 'test2', "test3"]}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Types
            </h2>
            <div className="ml-3">
                {idlJson.types.map((type, index) => (
                    <div
                        key={index}
                        className="w-full justify-start font-normal"
                    >
                        <AccordionWrapper title={type.name} description={["test1", 'test2', "test3"]}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
