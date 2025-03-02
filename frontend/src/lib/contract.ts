
import {ethers} from 'ethers';
import { getAllProjectsFromIPFS } from './ipfsHandler';

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
          "name": "metadataHash",
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
          "name": "_metadataHash",
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
              "name": "metadataHash",
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
          "internalType": "struct Web3Jungle.Project[]",
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
          "name": "metadataHash",
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

const CONTRACT_ADDRESS:string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

const contractInit = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS,ABI.abi, signer);
    return contract;
}



export async function addProject(metadataHash:string){
    const contract = await contractInit();
    const tx = await contract.addProject(metadataHash);
    await tx.wait();
    contract.once("projectAdded", (id:string, metadataHash:string, owner:string) => {
        console.log("Project added:", { id, metadataHash, owner });
      });

    return tx;
}

export async function upVote(id:number){
  const contract = await contractInit();
  const tx = await contract.upVote(id);
  await tx.wait();
  contract.once("Voted", (address:string, id:string)=>{
    console.log("Voted", address, id)
  })
  return tx;
}

export async function getAllProjects(){
    const contract = await contractInit();
    const projects = await contract.getAllProjects();

    // 
    const formattedProjects = projects.map((projects:any)=>({
      id:Number(projects.id),
      metadataHash: projects.metadataHash,
      owner: projects.owner,
      upvotes: Number(projects.upvotes)
    }))

    const enrichedProjects = await Promise.all (
      formattedProjects.map(async (project:any) => {
        try{
          const metadata = await getAllProjectsFromIPFS(project.metadataHash)
          return {
            ...project,
            metadata,
          }
        }catch(e){
          console.log(e)
        }
      })
      
    )

    console.log([...enrichedProjects])
    return ([...enrichedProjects])
}