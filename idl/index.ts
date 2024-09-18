export const idlJson = {
    "version": "0.1.0",
    "name": "Escrow",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "data",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "MyAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "data",
                        "type": "u64"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "MyCustomError",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "InvalidInput"
                    }
                ]
            }
        }
    ]
}