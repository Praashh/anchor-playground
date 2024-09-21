import { IdlField } from "@/lib/idl-types"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "./input"
import { BN } from "@coral-xyz/anchor"

export const renderArgs = (
    args: Record<number, IdlField>,
    onChange: (name: string, value: any) => void
) => {
    return (
        <ul className="space-y-4">
            {Object.entries(args).map(([index, arg]) => (
                <li key={index} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <span className="font-mono">{arg.name}</span>
                    </div>
                    {renderInput(arg, onChange)}
                </li>
            ))}
        </ul>
    )
}

const renderInput = (
    arg: IdlField,
    onChange: (name: string, value: any) => void
) => {
    switch (typeof arg.type === "string" ? arg.type : "") {
        case "u8":
        case "u16":
        case "u32":
            return (
                <Input
                    type="number"
                    placeholder={`Enter ${arg.type}`}
                    onChange={(e) => {
                        const value = parseInt(e.target.value)
                        if (value < 0) return
                        onChange(arg.name, value)
                    }}
                    className="font-mono text-sm"
                />
            )
        case "u64":
        case "u128":
        case "u256":
            return (
                <Input
                    type="text"
                    placeholder={`Enter ${arg.type}`}
                    onChange={(e) => {
                        const value = new BN(e.target.value)
                        if (value.isNeg()) return
                        onChange(arg.name, value)
                    }}
                    className="font-mono text-sm"
                />
            )
        case "i8":
        case "i16":
        case "i32":
        case "i64":
            return (
                <Input
                    type="number"
                    placeholder={`Enter ${arg.type}`}
                    onChange={(e) => {
                        const value = parseInt(e.target.value)
                        onChange(arg.name, value)
                    }}
                    className="font-mono text-sm"
                />
            )
        case "i128":
        case "i256":
            return (
                <Input
                    type="text"
                    placeholder={`Enter ${arg.type}`}
                    onChange={(e) => {
                        const value = new BN(e.target.value)
                        onChange(arg.name, value)
                    }}
                    className="font-mono text-sm"
                />
            )
        case "f32":
        case "f64":
            return (
                <Input
                    type="number"
                    step="any"
                    placeholder={`Enter ${arg.type}`}
                    onChange={(e) =>
                        onChange(arg.name, parseFloat(e.target.value))
                    }
                    className="font-mono text-sm"
                />
            )
        case "bool":
            return (
                <Select
                    onValueChange={(value) => {
                        onChange(arg.name, value === "true")
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="boolean" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                </Select>
            )
        case "string":
            return (
                <Input
                    type="text"
                    placeholder="Enter string"
                    onChange={(e) => onChange(arg.name, e.target.value)}
                    className="font-mono text-sm"
                />
            )
        case "pubkey":
            return (
                <Input
                    type="text"
                    placeholder="Enter pubkey"
                    onChange={(e) => onChange(arg.name, e.target.value)}
                    className="font-mono text-sm"
                />
            )
        default:
            // Handle complex types (option, vec, array, defined, generic)
            return renderComplexType(arg, onChange)
    }
}

const renderComplexType = (
    arg: IdlField,
    onChange: (name: string, value: any) => void
) => {
    const { type } = arg

    // Handle optional values (option: IdlType)
    // @ts-ignore
    if ("option" in type) {
        return (
            <Input
                type="text"
                placeholder={`Optional ${type.option}`}
                onChange={(e) => {
                    const value = e.target.value || undefined // Allow undefined for optional
                    onChange(arg.name, value)
                }}
                className="font-mono text-sm"
            />
        )
    }

    // Handle vectors (vec: IdlType)
    // @ts-ignore
    if ("vec" in type) {
        return (
            <Input
                type="text"
                placeholder={`Enter array of ${type.vec}`}
                onChange={(e) => {
                    try {
                        const value = e.target.value.split(",").map((v) => {
                            if (
                                [
                                    "u8",
                                    "i8",
                                    "u16",
                                    "i16",
                                    "u32",
                                    "i32",
                                    // @ts-ignore
                                ].includes(type.vec)
                            ) {
                                return parseInt(v.trim())
                            }
                            if (
                                ["u64", "u128", "i64", "i128"].includes(
                                    // @ts-ignore
                                    type.vec
                                )
                            ) {
                                return new BN(v.trim())
                            }
                            return v.trim()
                        })
                        onChange(arg.name, value)
                    } catch {
                        onChange(arg.name, [])
                    }
                }}
                className="font-mono text-sm"
            />
        )
    }

    // Handle arrays (array: [IdlType, IdlArrayLen])
    // @ts-ignore
    if ("array" in type) {
        const [arrayType, len] = type.array
        return (
            <Input
                type="text"
                placeholder={`Enter array of ${arrayType} with length ${len}`}
                onChange={(e) => {
                    try {
                        const value = e.target.value.split(",").map((v) => {
                            if (
                                [
                                    "u8",
                                    "i8",
                                    "u16",
                                    "i16",
                                    "u32",
                                    "i32",
                                    // @ts-ignore
                                ].includes(arrayType)
                            ) {
                                return parseInt(v.trim())
                            }
                            if (
                                ["u64", "u128", "i64", "i128"].includes(
                                    // @ts-ignore
                                    arrayType
                                )
                            ) {
                                return new BN(v.trim())
                            }
                            return v.trim()
                        })
                        if (value.length === len) {
                            onChange(arg.name, value)
                        } else {
                            throw new Error("Invalid length")
                        }
                    } catch {
                        onChange(arg.name, [])
                    }
                }}
                className="font-mono text-sm"
            />
        )
    }

    // Handle generics (generic: string or defined types)
    // @ts-ignore
    if ("defined" in type || "generic" in type) {
        return (
            <Input
                type="text"
                placeholder={`Enter custom type`}
                onChange={(e) => onChange(arg.name, e.target.value)}
                className="font-mono text-sm"
            />
        )
    }

    return null // Fallback if type is not handled
}
