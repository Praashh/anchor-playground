export const renderArgs = (args: any[]) => (
    <ul className="space-y-2">
        {args.map((arg, index) => (
            <li key={index} className="flex items-center space-x-2">
                <span className="font-mono">{arg.name}</span>
                <span className="text-sm text-muted-foreground">({arg.type})</span>
            </li>
        ))}
    </ul>
)