const BlankArt = {
  network: "homestead",
  address: "0x9ef14cC7C558a70FBB6480CE58042feebAA1972E",
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
          "name": "_signer",
          "type": "address",
          "internalType": "address"
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
        },
        {
          "name": "_royaltyBPS",
          "type": "uint16",
          "internalType": "uint16"
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
      "name": "BlankRoyaltySet",
      "type": "event",
      "inputs": [
        {
          "name": "recipient",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "bps",
          "type": "uint16",
          "indexed": false,
          "internalType": "uint16"
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
      "name": "Initialized",
      "type": "event",
      "inputs": [
        {
          "name": "controller",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "signer",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "baseURI",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "mintPrice",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "maxTokenSupply",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "active",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        },
        {
          "name": "publicMint",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
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
      "name": "OwnershipTransferred",
      "type": "event",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "PermanentURI",
      "type": "event",
      "inputs": [
        {
          "name": "_value",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "_id",
          "type": "uint256",
          "indexed": true,
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
      "name": "VoucherSignersUpdated",
      "type": "event",
      "inputs": [
        {
          "name": "foundationAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "active",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
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
      "name": "addVoucherSigner",
      "type": "function",
      "inputs": [
        {
          "name": "newVoucherSigner",
          "type": "address",
          "internalType": "address"
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
      "name": "blankRoyalty",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "bps",
          "type": "uint24",
          "internalType": "uint24"
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
      "name": "owner",
      "type": "function",
      "inputs": [],
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
      "name": "removeVoucherSigner",
      "type": "function",
      "inputs": [
        {
          "name": "oldVoucherSigner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "renounceOwnership",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "royaltyInfo",
      "type": "function",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "salePrice",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "receiver",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "royaltyAmount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
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
      "name": "setDefaultRoyalty",
      "type": "function",
      "inputs": [
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "bps",
          "type": "uint16",
          "internalType": "uint16"
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
      "name": "transferOwnership",
      "type": "function",
      "inputs": [
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
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