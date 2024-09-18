import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

export const renderCodeExample = (instruction: { name: any; accounts: any; args: any }) => {
    const code = `
// Example usage of ${instruction.name}
await program.methods
.${instruction.name}(${instruction.args.map((arg: { name: any }) => arg.name).join(', ')})
.accounts({
${instruction.accounts.map((acc: { name: any }) => `${acc.name}: <${acc.name}-public-key>`).join(',\n    ')}
})
.rpc();
`
    return (
        <SyntaxHighlighter
            language="javascript"
            customStyle={{
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
            }}
        >
            {code.trim()}
        </SyntaxHighlighter>
    )
}