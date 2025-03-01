import {ethers} from 'ethers';
const ABI = {
    "abi": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "projectImageurl",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "link",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "projectAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "voter",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "projectId",
            "type": "uint256"
          }
        ],
        "name": "upVoted",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_projectImageurl",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_link",
            "type": "string"
          }
        ],
        "name": "addProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllProjects",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "link",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "projectImageurl",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "upvotes",
                "type": "uint256"
              }
            ],
            "internalType": "struct Web3JungleContract.Project[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "hasVoted",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "projects",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "link",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "projectImageurl",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "upvotes",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "projectsCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_projectId",
            "type": "uint256"
          }
        ],
        "name": "upVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
}

const CONTRACT_ADDRESS:string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! ;
const contractInit = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS,ABI.abi, signer);
    return contract;
}



export async function addProject(name:String, imageUrl:String, Description:String, link:String){
    const contract = await contractInit();
    const tx = await contract.addProject(name, imageUrl, Description, link);
    await tx.wait();

    contract.once("projectAdded", (id, name, projectImageurl, description, link, owner) => {
        console.log("Project added:", { id, name, projectImageurl, description, link, owner });
      });

    return tx;
}

export async function getAllProjects(){
    const contract = await contractInit();
    const projects = await contract.getAllProjects();
    return projects;
}