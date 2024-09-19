import { Transaction, TransactionInstruction } from "@solana/web3.js"
export function build_tx(ixs: Array<TransactionInstruction>) {
    const tx = new Transaction()
    tx.add(...ixs)
}

export function create_ix() {
    // const ix = new TransactionInstruction();
}
