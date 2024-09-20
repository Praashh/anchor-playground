import { Input } from "./input"

export const renderArgs = (
    args: any[],
    onChange: (name: string, value: any) => void
) => {
    const renderInput = (arg: any) => {
        switch (arg.type) {
            case "u8":
            case "u16":
            case "u32":
            case "u64":
            case "i8":
            case "i16":
            case "i32":
            case "i64":
                return (
                    <Input
                        type="number"
                        placeholder={`Enter ${arg.type}`}
                        onChange={(e) =>
                            onChange(arg.name, parseInt(e.target.value))
                        }
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
                    <select
                        onChange={(e) =>
                            onChange(arg.name, e.target.value === "true")
                        }
                        className="font-mono text-sm border rounded-md"
                    >
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
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
            // Add more cases for other types as needed
            default:
                return (
                    <Input
                        type="text"
                        placeholder={`Enter ${arg.type}`}
                        onChange={(e) => onChange(arg.name, e.target.value)}
                        className="font-mono text-sm"
                    />
                )
        }
    }

    return (
        <ul className="space-y-4">
            {args.map((arg, index) => (
                <li key={index} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <span className="font-mono">{arg.name}</span>
                        <span className="text-sm text-muted-foreground">
                            ({arg.type})
                        </span>
                    </div>
                    {renderInput(arg)}
                </li>
            ))}
        </ul>
    )
}
