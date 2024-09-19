import { Input } from "./input"

export const renderAccounts = (
    accounts: any[],
    onChange: (index: number, value: string) => void
) => {
    return (
        <ul className="space-y-4">
            {accounts.map((account, index) => (
                <li key={index} className="flex flex-col space-y-2">
                    <div className="flex items-start space-x-2">
                        <span
                            className={`px-2 py-1 text-xs rounded-md ${account.isMut ? "bg-yellow-200 dark:bg-yellow-800" : "bg-green-200 dark:bg-green-800"}`}
                        >
                            {account.isMut ? "mutable" : "immutable"}
                        </span>
                        <span className="font-mono">{account.name}</span>
                        {account.isSigner && (
                            <span className="px-2 py-1 text-xs bg-blue-200 dark:bg-blue-800 rounded-md">
                                signer
                            </span>
                        )}
                    </div>
                    <Input
                        type="text"
                        placeholder="Enter public key"
                        onChange={(e) => onChange(index, e.target.value)}
                        className="font-mono text-sm"
                    ></Input>
                </li>
            ))}
        </ul>
    )
}
