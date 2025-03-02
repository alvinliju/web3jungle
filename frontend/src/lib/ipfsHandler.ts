
import { PinataSDK } from "pinata-web3";
const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway:  "orange-giant-rhinoceros-929.mypinata.cloud",
});

export const uploadToIPFS = async (name:string, imageUrl:string, description:string, link:string ) => {
    try{
        const result = await pinata.upload.json({
            name,
            imageUrl,
            description,
            link,
        }, {
            metadata:{
                name: `${name} Metadata`,
                keyValues:{
                    type:'web3jungle-project'
                }
            }
        })

        if (!result?.IpfsHash) {
            throw new Error("Failed to get IPFS hash from Pinata");
        }

        return result.IpfsHash;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export const getAllProjectsFromIPFS = async (cid: string) => {
    try{

       const respone = await fetch(`https://orange-giant-rhinoceros-929.mypinata.cloud/ipfs/${cid}`)


       if(!respone.ok){
        throw new Error('Failed to fetch metadata')
       }

       const metadata = await respone.json();

       console.log(metadata.name)

       return metadata;

    }catch(e){
        console.log(e)
    }
}