export const renderAccounts = (accounts: any[]) => (
    <ul className="space-y-2">
        {accounts.map((account, index) => (
            <li key={index} className="flex items-start space-x-2">
                <span className={`px-2 py-1 text-xs rounded-md ${account.isMut ? 'bg-yellow-200 dark:bg-yellow-800' : 'bg-green-200 dark:bg-green-800'}`}>
                    {account.isMut ? 'mutable' : 'immutable'}
                </span>
                <span className="font-mono">{account.name}</span>
                {account.isSigner && (
                    <span className="px-2 py-1 text-xs bg-blue-200 dark:bg-blue-800 rounded-md">signer</span>
                )}
            </li>
        ))}
    </ul>
)