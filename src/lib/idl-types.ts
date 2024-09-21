// IDL specification Semantic Version
export const IDL_SPEC: string = process.env.CARGO_PKG_VERSION || ""

export interface Idl {
    address: string
    metadata: IdlMetadata
    docs?: string[]
    instructions: IdlInstruction[]
    accounts?: IdlAccount[]
    events?: IdlEvent[]
    errors?: IdlErrorCode[]
    types?: IdlTypeDef[]
    constants?: IdlConst[]
}

export interface IdlMetadata {
    name: string
    version: string
    spec: string
    description?: string
    repository?: string
    dependencies?: IdlDependency[]
    contact?: string
    deployments?: IdlDeployments
}

export interface IdlDependency {
    name: string
    version: string
}

export interface IdlDeployments {
    mainnet?: string
    testnet?: string
    devnet?: string
    localnet?: string
}

export interface IdlInstruction {
    name: string
    docs?: string[]
    discriminator: IdlDiscriminator
    accounts: IdlInstructionAccountItem[]
    args: IdlField[]
    returns?: IdlType
}

export type IdlInstructionAccountItem = IdlInstructionAccount

export interface IdlInstructionAccount {
    name: string
    docs?: string[]
    writable?: boolean
    signer?: boolean
    optional?: boolean
    address?: string
    pda?: IdlPda
    relations?: string[]
}

export interface IdlInstructionAccounts {
    name: string
    accounts: IdlInstructionAccountItem[]
}

export interface IdlPda {
    seeds: IdlSeed[]
    program?: IdlSeed
}

export type IdlSeed =
    | { kind: "const"; value: number[] }
    | { kind: "arg"; path: string }
    | { kind: "account"; path: string; account?: string }

export interface IdlAccount {
    name: string
    discriminator: IdlDiscriminator
}

export interface IdlEvent {
    name: string
    discriminator: IdlDiscriminator
}

export interface IdlConst {
    name: string
    docs?: string[]
    type: IdlType
    value: string
}

export interface IdlErrorCode {
    code: number
    name: string
    msg?: string
}

export interface IdlField {
    name: string
    docs?: string[]
    type: IdlType
}

export interface IdlTypeDef {
    name: string
    docs?: string[]
    serialization?: IdlSerialization
    repr?: IdlRepr
    generics?: IdlTypeDefGeneric[]
    type: IdlTypeDefTy
}

export type IdlSerialization =
    | "borsh"
    | "bytemuck"
    | "bytemuck_unsafe"
    | { custom: string }

export type IdlRepr =
    | { kind: "rust"; packed?: boolean; align?: number }
    | { kind: "c"; packed?: boolean; align?: number }
    | { kind: "transparent" }

export type IdlTypeDefGeneric =
    | { kind: "type"; name: string }
    | { kind: "const"; name: string; type: string }

export type IdlTypeDefTy =
    | { kind: "struct"; fields?: IdlDefinedFields }
    | { kind: "enum"; variants: IdlEnumVariant[] }
    | { kind: "type"; alias: IdlType }

export interface IdlEnumVariant {
    name: string
    fields?: IdlDefinedFields
}

export type IdlDefinedFields = IdlField[] | IdlType[]

export type IdlArrayLen = string | number

export type IdlGenericArg =
    | { kind: "type"; type: IdlType }
    | { kind: "const"; value: string }

export type IdlType =
    | "bool"
    | "u8"
    | "i8"
    | "u16"
    | "i16"
    | "u32"
    | "i32"
    | "f32"
    | "u64"
    | "i64"
    | "f64"
    | "u128"
    | "i128"
    | "u256"
    | "i256"
    | "bytes"
    | "string"
    | "pubkey"
    | { option: IdlType }
    | { vec: IdlType }
    | { array: [IdlType, IdlArrayLen] }
    | { defined: { name: string; generics?: IdlGenericArg[] } }
    | { generic: string }

export type IdlDiscriminator = number[]

// Helper function to parse IdlType from string
export function parseIdlType(s: string): IdlType {
    s = s.replace(/\s/g, "")

    switch (s) {
        case "bool":
            return "bool"
        case "u8":
            return "u8"
        case "i8":
            return "i8"
        case "u16":
            return "u16"
        case "i16":
            return "i16"
        case "u32":
            return "u32"
        case "i32":
            return "i32"
        case "f32":
            return "f32"
        case "u64":
            return "u64"
        case "i64":
            return "i64"
        case "f64":
            return "f64"
        case "u128":
            return "u128"
        case "i128":
            return "i128"
        case "u256":
            return "u256"
        case "i256":
            return "i256"
        case "Vec<u8>":
            return "bytes"
        case "String":
        case "&str":
        case "&'staticstr":
            return "string"
        case "Pubkey":
            return "pubkey"
    }

    if (s.startsWith("Option<")) {
        const inner = s.slice(7, -1)
        return { option: parseIdlType(inner) }
    }

    if (s.startsWith("Vec<")) {
        const inner = s.slice(4, -1)
        return { vec: parseIdlType(inner) }
    }

    if (s.startsWith("[")) {
        const parseArray = (inner: string): IdlType => {
            if (inner.endsWith("]")) {
                return parseArray(inner.slice(1, -1))
            } else {
                const [rawType, rawLength] = inner.split(";")
                const type = parseIdlType(rawType)
                const length: IdlArrayLen = isNaN(
                    Number(rawLength.replace("_", ""))
                )
                    ? rawLength
                    : Number(rawLength.replace("_", ""))
                return { array: [type, length] }
            }
        }
        return parseArray(s.slice(1, -1))
    }

    // Defined type
    const genericIndex = s.indexOf("<")
    if (genericIndex !== -1) {
        const name = s.slice(0, genericIndex)
        const genericsStr = s.slice(genericIndex + 1, -1)
        const generics = genericsStr.split(",").map((g) => {
            const trimmed = g.trim()
            if (
                ["true", "false"].includes(trimmed) ||
                !isNaN(Number(trimmed)) ||
                trimmed.length === 1
            ) {
                return { kind: "const" as const, value: trimmed }
            } else {
                return { kind: "type" as const, type: parseIdlType(trimmed) }
            }
        })
        return { defined: { name, generics } }
    }

    return { defined: { name: s } }
}
