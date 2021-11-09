const BlankArt = {
  network: "rinkeby",
  address: "0x56b80d8b9938E56dF87a703118550DbEDF685665",
  abi: [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_foundationAddress",
          "type": "address",
          "internalType": "address payable"
        },
        {
          "name": "_maxTokenSupply",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "baseURI",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "name": "Approval",
      "type": "event",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "name": "ApprovalForAll",
      "type": "event",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "operator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "name": "BaseTokenUriUpdated",
      "type": "event",
      "inputs": [
        {
          "name": "baseTokenURI",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "anonymous": false
    },
    {
      "name": "FoundationAddressUpdated",
      "type": "event",
      "inputs": [
        {
          "name": "foundationAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "MemberAdded",
      "type": "event",
      "inputs": [
        {
          "name": "member",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "MemberRevoked",
      "type": "event",
      "inputs": [
        {
          "name": "member",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "Minted",
      "type": "event",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "member",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "tokenURI",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "anonymous": false
    },
    {
      "name": "TokenUriLocked",
      "type": "event",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "name": "Transfer",
      "type": "event",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "name": "active",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "addBaseURI",
      "type": "function",
      "inputs": [
        {
          "name": "baseURI",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "approve",
      "type": "function",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "availableToWithdraw",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "balanceOf",
      "type": "function",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "foundationAddress",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "foundationSalePercentage",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getApproved",
      "type": "function",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getChainID",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "isApprovedForAll",
      "type": "function",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "isMember",
      "type": "function",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "lockTokenURI",
      "type": "function",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "maxTokenSupply",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "memberMaxMintCount",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint8",
          "internalType": "uint8"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "mint",
      "type": "function",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "name": "mintPrice",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "name",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "ownerOf",
      "type": "function",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "publicMint",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "redeemVoucher",
      "type": "function",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "voucher",
          "type": "tuple",
          "components": [
            {
              "name": "redeemerAddress",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "expiration",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "minPrice",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "tokenCount",
              "type": "uint16",
              "internalType": "uint16"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ],
          "internalType": "struct BlankArt.BlankNFTVoucher"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "name": "safeTransferFrom",
      "type": "function",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "safeTransferFrom",
      "type": "function",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "setApprovalForAll",
      "type": "function",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "supportsInterface",
      "type": "function",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "symbol",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "toggleActivation",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "togglePublicMint",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "tokenIndex",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "tokenURI",
      "type": "function",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "tokenURILocked",
      "type": "function",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "transferFrom",
      "type": "function",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "updateFoundationAddress",
      "type": "function",
      "inputs": [
        {
          "name": "newFoundationAddress",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "updateMaxMintCount",
      "type": "function",
      "inputs": [
        {
          "name": "_maxMint",
          "type": "uint8",
          "internalType": "uint8"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "updateMintPrice",
      "type": "function",
      "inputs": [
        {
          "name": "price",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "withdraw",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ]
};

export default BlankArt;