import { PublicKey } from "@solana/web3.js"
import { ExtendedAccountMeta } from "../landing/Home"
import { Input } from "./input"

export const renderAccounts = (
    accounts: Record<number, ExtendedAccountMeta>,
    onChange: (index: number, value: PublicKey) => void
) => {
    return (
        <ul className="space-y-4">
            {Object.entries(accounts).map(([index, account]) => (
                <li key={index} className="flex flex-col space-y-2">
                    <div className="flex items-start space-x-2">
                        <span
                            className={`px-2 py-1 text-xs rounded-md ${account.writable ? "bg-yellow-200 dark:bg-yellow-800" : "bg-green-200 dark:bg-green-800"}`}
                        >
                            {account.writable ? "mutable" : "immutable"}
                        </span>
                        <span className="font-mono">{account.name}</span>
                        {account.signer && (
                            <span className="px-2 py-1 text-xs bg-blue-200 dark:bg-blue-800 rounded-md">
                                signer
                            </span>
                        )}
                    </div>
                    <Input
                        type="text"
                        placeholder="Enter public key"
                        onChange={(e) => {
                            try {
                                const pubkey = new PublicKey(e.target.value)
                                if (!pubkey) {
                                    return
                                }
                                onChange(Number(index), pubkey)
                            } catch (err) {
                                console.log("INvalid address")
                            }
                        }}
                        className="font-mono text-sm"
                    ></Input>
                </li>
            ))}
        </ul>
    )
}
